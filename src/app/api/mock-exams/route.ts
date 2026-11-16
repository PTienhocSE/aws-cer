import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';
import { shuffleAndTake } from '@/lib/practice-selection';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;

    const { searchParams } = new URL(req.url);
    const requestedBankId = searchParams.get('questionBankId');

    const isGuestOrDemo =
      authUser.role === 'GUEST' ||
      authUser.email === 'guest@aws-cert.local' ||
      authUser.email === 'guest@awscer.local' ||
      authUser.email?.includes('guest') ||
      req.headers.get('x-guest-mode') === '1' ||
      userId === 'guest-learner';

    const where: any = isGuestOrDemo
      ? { OR: [{ userId }, { userId: 'guest-learner' }] }
      : { userId };

    if (requestedBankId && requestedBankId !== 'all') {
      where.questionBankId = requestedBankId;
    }

    const attempts = await prisma.mockExamAttempt.findMany({
      where,
      orderBy: { startedAt: 'desc' },
      include: {
        questionBank: {
          select: { id: true, name: true, version: true },
        },
        answers: {
          select: { id: true, isCorrect: true, isFlagged: true, selectedOptionIds: true },
        },
      },
      take: 60,
    });

    const formatted = attempts.map((a) => {
      const totalQuestions = a.totalQuestions || a.answers.length;
      let correctCount = 0;
      let incorrectCount = 0;
      let unansweredCount = 0;

      a.answers.forEach((ans) => {
        let parsedSelected: string[] = [];
        try {
          const raw = ans.selectedOptionIds;
          parsedSelected = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
        } catch {
          parsedSelected = [];
        }

        if (parsedSelected.length === 0) {
          unansweredCount++;
        } else if (ans.isCorrect === true) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      });

      const accuracyRate = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

      return {
        id: a.id,
        questionBank: a.questionBank,
        totalQuestions,
        score: a.score,
        isPassed: a.isPassed,
        isCompleted: a.isCompleted,
        startedAt: a.startedAt,
        submittedAt: a.submittedAt,
        timeSpentSeconds: a.timeSpentSeconds,
        timeLimitMinutes: a.timeLimitMinutes,
        correctCount,
        incorrectCount,
        unansweredCount,
        accuracyRate,
      };
    });

    return NextResponse.json({ attempts: formatted });
  } catch (error) {
    console.error('Get mock exam attempts error:', error);
    return NextResponse.json({ error: 'Lỗi tải danh sách bài thi thử' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;

    const body = await req.json();
    const {
      questionBankId,
      domainId,
      totalQuestions = 65,
      timeLimitMinutes = 130,
      shuffle, // Optional boolean flag from client
    } = body;

    // Determine target bank
    let bankId = questionBankId || authUser.activeQuestionBankId;
    if (!bankId) {
      const defaultBank = await prisma.questionBank.findFirst({
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
      });
      bankId = defaultBank?.id;
    }

    if (!bankId) {
      return NextResponse.json({ error: 'Chưa chọn ngân hàng câu hỏi' }, { status: 400 });
    }

    const whereClause: any = { questionBankId: bankId };
    if (domainId) {
      whereClause.domainId = domainId;
    }

    // Always sort by rawId ascending to maintain original test question order 1..65
    const candidateQuestions = await prisma.question.findMany({
      where: whereClause,
      select: { id: true, rawId: true },
      orderBy: { rawId: 'asc' },
    });

    if (candidateQuestions.length === 0) {
      return NextResponse.json(
        { error: 'Không tìm thấy câu hỏi cho bộ đề đã chọn' },
        { status: 400 }
      );
    }

    const targetCount = Math.min(candidateQuestions.length, Number(totalQuestions) || 65);

    // Rule:
    // If shuffle is explicitly false -> DO NOT SHUFFLE (keep original order 1..65).
    // If the bank has 65 or fewer questions and shuffle is not explicitly requested true -> DO NOT SHUFFLE!
    // If bank has hundreds of questions (e.g. SAA_dump or 390-question bank) and shuffle !== false -> Shuffle and take.
    const shouldShuffle = typeof shuffle === 'boolean' ? shuffle : candidateQuestions.length > 65;

    const selectedQuestions = shouldShuffle
      ? shuffleAndTake(candidateQuestions, targetCount)
      : candidateQuestions.slice(0, targetCount);

    const examAttempt = await prisma.mockExamAttempt.create({
      data: {
        userId,
        questionBankId: bankId,
        totalQuestions: selectedQuestions.length,
        timeLimitMinutes: Number(timeLimitMinutes) || 130,
        startedAt: new Date(),
        answers: {
          create: selectedQuestions.map((q) => ({
            questionId: q.id,
            selectedOptionIds: '[]',
          })),
        },
      },
    });

    return NextResponse.json({
      examAttemptId: examAttempt.id,
      totalQuestions: selectedQuestions.length,
      shuffled: shouldShuffle,
      message: 'Khởi tạo bài thi thành công',
    });
  } catch (error) {
    console.error('Create mock exam error:', error);
    return NextResponse.json({ error: 'Lỗi tạo bài thi thử' }, { status: 500 });
  }
}
