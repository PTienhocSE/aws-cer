import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { calculateSuperMemo2 } from '@/lib/spaced-repetition';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return NextResponse.json(
        { error: 'Vui lòng đăng nhập tài khoản để nạp tiến độ học tập!' },
        { status: 401 }
      );
    }

    const userId = authUser.userId;
    const body = await req.json();

    // Nhận mảng bản ghi từ body (hỗ trợ cả { data: [...] }, { records: [...] }, hoặc array trực tiếp)
    let records: any[] = [];
    if (Array.isArray(body)) {
      records = body;
    } else if (body && typeof body === 'object') {
      if (Array.isArray(body.data)) {
        records = body.data;
      } else if (Array.isArray(body.records)) {
        records = body.records;
      } else {
        records = Object.values(body);
      }
    }

    if (!records || records.length === 0) {
      return NextResponse.json(
        { error: 'Dữ liệu metadata rỗng hoặc không đúng định dạng.' },
        { status: 400 }
      );
    }

    // Lọc và chuẩn hóa dữ liệu
    const validRecords: Array<{
      sessionId: string;
      questionId: string;
      isCorrect: boolean;
      selectedOptionIds: string[];
      correctOptionIds: string[];
      answeredAt: Date;
    }> = [];

    for (const r of records) {
      const qId = r.questionId || r.id;
      if (!qId || typeof qId !== 'string') continue;

      let answeredAtDate = new Date();
      if (r.answeredAt) {
        const parsed = new Date(r.answeredAt);
        if (!isNaN(parsed.getTime())) {
          answeredAtDate = parsed;
        }
      }

      validRecords.push({
        sessionId: String(r.sessionId || 'company-offline-session'),
        questionId: String(qId),
        isCorrect: Boolean(r.isCorrect),
        selectedOptionIds: Array.isArray(r.selectedOptionIds) ? r.selectedOptionIds : [],
        correctOptionIds: Array.isArray(r.correctOptionIds) ? r.correctOptionIds : [],
        answeredAt: answeredAtDate,
      });
    }

    if (validRecords.length === 0) {
      return NextResponse.json(
        { error: 'Không tìm thấy câu hỏi hợp lệ trong metadata.' },
        { status: 400 }
      );
    }

    // Lấy thông tin các câu hỏi trong DB để xác định questionBankId
    const uniqueQIds = Array.from(new Set(validRecords.map((r) => r.questionId)));
    const questionsInDb = await prisma.question.findMany({
      where: { id: { in: uniqueQIds } },
      select: { id: true, questionBankId: true },
    });

    const questionMap = new Map(questionsInDb.map((q) => [q.id, q]));

    // Nhóm các bản ghi theo sessionId để tạo hoặc liên kết PracticeSession
    const sessionGroups = new Map<string, typeof validRecords>();
    for (const r of validRecords) {
      if (!questionMap.has(r.questionId)) continue; // Bỏ qua câu hỏi không có trong DB
      const group = sessionGroups.get(r.sessionId) || [];
      group.push(r);
      sessionGroups.set(r.sessionId, group);
    }

    let totalImported = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let sessionsCreated = 0;
    const enrolledBankIds = new Set<string>();

    // Xử lý từng session
    for (const [rawSessionId, items] of sessionGroups.entries()) {
      if (items.length === 0) continue;

      const firstQuestion = questionMap.get(items[0].questionId);
      const questionBankId = firstQuestion?.questionBankId || authUser.activeQuestionBankId;
      if (!questionBankId) continue;

      enrolledBankIds.add(questionBankId);

      const sessionDate = items[0].answeredAt;
      const formattedDate = sessionDate.toLocaleDateString('vi-VN');
      const sessionQIds = items.map((it) => it.questionId);

      // Kiểm tra xem user đã có session này chưa
      let targetSession = await prisma.practiceSession.findFirst({
        where: { id: rawSessionId, userId },
      });

      if (!targetSession) {
        // Tạo phiên mới cho user
        try {
          targetSession = await prisma.practiceSession.create({
            data: {
              userId,
              questionBankId,
              title: `Phiên luyện tập từ máy công ty (${formattedDate})`,
              mode: 'OFFLINE_IMPORT',
              sourceType: 'ALL',
              questionIds: JSON.stringify(sessionQIds),
              isCompleted: true,
              createdAt: sessionDate,
              updatedAt: new Date(),
            },
          });
          sessionsCreated++;
        } catch {
          // Fallback nếu có lỗi tạo session
          targetSession = await prisma.practiceSession.create({
            data: {
              userId,
              questionBankId,
              title: `Phiên đồng bộ (${formattedDate})`,
              mode: 'OFFLINE_IMPORT',
              sourceType: 'ALL',
              questionIds: JSON.stringify(sessionQIds),
              isCompleted: true,
            },
          });
          sessionsCreated++;
        }
      }

      // Xử lý từng câu hỏi trong session:
      // "cứ cho làm trên cty có trùng câu thì cứ kệ, vẫn tính câu đấy đã làm"
      for (const item of items) {
        totalImported++;
        if (item.isCorrect) totalCorrect++;
        else totalIncorrect++;

        // 1. Tạo PracticeAnswer (nếu câu đó chưa có trong session này thì thêm mới)
        await prisma.practiceAnswer.create({
          data: {
            sessionId: targetSession.id,
            questionId: item.questionId,
            selectedOptionIds: JSON.stringify(item.selectedOptionIds),
            isCorrect: item.isCorrect,
            confidenceLevel: 3,
            createdAt: item.answeredAt,
          },
        });

        // 2. Cập nhật UserQuestionProgress (SRS):
        // Dù câu này đã làm bao nhiêu lần trước đây, VẪN TÍNH câu đấy đã làm
        const existingProgress = await prisma.userQuestionProgress.findUnique({
          where: { userId_questionId: { userId, questionId: item.questionId } },
        });

        const attempts = (existingProgress?.attempts || 0) + 1;
        const correctAttempts = (existingProgress?.correctAttempts || 0) + (item.isCorrect ? 1 : 0);
        const incorrectAttempts = (existingProgress?.incorrectAttempts || 0) + (item.isCorrect ? 0 : 1);

        const sm2 = calculateSuperMemo2({
          quality: item.isCorrect ? 4 : 1,
          easinessFactor: existingProgress?.easinessFactor || 2.5,
          intervalDays: existingProgress?.intervalDays || 0,
          repetitions: correctAttempts,
        });

        await prisma.userQuestionProgress.upsert({
          where: { userId_questionId: { userId, questionId: item.questionId } },
          create: {
            userId,
            questionId: item.questionId,
            questionBankId,
            attempts: 1,
            correctAttempts: item.isCorrect ? 1 : 0,
            incorrectAttempts: item.isCorrect ? 0 : 1,
            lastAnswerCorrect: item.isCorrect,
            confidenceLevel: 3,
            masteryStatus: sm2.masteryStatus,
            easinessFactor: sm2.easinessFactor,
            intervalDays: sm2.intervalDays,
            nextReviewAt: sm2.nextReviewAt,
            lastReviewedAt: item.answeredAt,
          },
          update: {
            attempts,
            correctAttempts,
            incorrectAttempts,
            lastAnswerCorrect: item.isCorrect,
            confidenceLevel: 3,
            masteryStatus: sm2.masteryStatus,
            easinessFactor: sm2.easinessFactor,
            intervalDays: sm2.intervalDays,
            nextReviewAt: sm2.nextReviewAt,
            lastReviewedAt: item.answeredAt,
          },
        });

        // 3. Cập nhật DailyStudyActivity cho ngày làm bài
        const activityDateStr = item.answeredAt.toISOString().split('T')[0];
        await prisma.dailyStudyActivity.upsert({
          where: {
            userId_questionBankId_activityDate: {
              userId,
              questionBankId,
              activityDate: activityDateStr,
            },
          },
          create: {
            userId,
            questionBankId,
            activityDate: activityDateStr,
            answeredQuestions: 1,
            correctAnswers: item.isCorrect ? 1 : 0,
            incorrectAnswers: item.isCorrect ? 0 : 1,
            practiceSessionsCompleted: 1,
          },
          update: {
            answeredQuestions: { increment: 1 },
            correctAnswers: { increment: item.isCorrect ? 1 : 0 },
            incorrectAnswers: { increment: item.isCorrect ? 0 : 1 },
          },
        });
      }
    }

    // Đảm bảo user có enrollment vào các QuestionBank tương ứng
    for (const bankId of enrolledBankIds) {
      await prisma.userQuestionBankEnrollment.upsert({
        where: { userId_questionBankId: { userId, questionBankId: bankId } },
        create: {
          userId,
          questionBankId: bankId,
          status: 'ACTIVE',
          lastStudiedAt: new Date(),
        },
        update: {
          lastStudiedAt: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      totalImported,
      totalCorrect,
      totalIncorrect,
      sessionsCreated,
      message: `Đã nạp thành công ${totalImported} câu hỏi (${totalCorrect} câu đúng, ${totalIncorrect} câu sai) vào tài khoản của bạn!`,
    });
  } catch (error) {
    console.error('Import metadata error:', error);
    return NextResponse.json(
      { error: 'Lỗi trong quá trình nạp metadata vào tài khoản.' },
      { status: 500 }
    );
  }
}
