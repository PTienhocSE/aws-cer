import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';
import { shuffleAndTake, takeFromPriorityGroups } from '@/lib/practice-selection';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;
    const bankId = authUser.activeQuestionBankId;
    if (!bankId) {
      return NextResponse.json({ error: 'Chưa chọn ngân hàng câu hỏi' }, { status: 400 });
    }
    const body = await req.json();
    const { mode = 'CUSTOM', domainId, status, limit = 15 } = body;
    const safeLimit = Math.min(100, Math.max(1, Number(limit) || 15));

    if (domainId) {
      const domain = await prisma.domain.findFirst({
        where: { id: domainId, questionBankId: bankId },
        select: {
          id: true,
          name: true,
          questions: {
            select: { id: true },
            orderBy: [{ rawId: 'asc' }, { createdAt: 'asc' }],
          },
        },
      });
      if (!domain) {
        return NextResponse.json({ error: 'Domain không thuộc bộ câu hỏi đang chọn' }, { status: 404 });
      }

      const existingSession = await prisma.practiceSession.findFirst({
        where: { userId, questionBankId: bankId, mode: 'DOMAIN', sourceId: domainId },
        orderBy: { updatedAt: 'desc' },
      });
      const questionIds = domain.questions.map((question) => question.id);
      const session = existingSession
        ? await prisma.practiceSession.update({
            where: { id: existingSession.id },
            data: {
              title: `Luyện tập Domain: ${domain.name}`,
              sourceType: 'DOMAIN',
              questionIds: JSON.stringify(questionIds),
            },
          })
        : await prisma.practiceSession.create({
            data: {
              userId,
              questionBankId: bankId,
              mode: 'DOMAIN',
              sourceType: 'DOMAIN',
              sourceId: domainId,
              questionIds: JSON.stringify(questionIds),
              title: `Luyện tập Domain: ${domain.name}`,
            },
          });

      return NextResponse.json({
        sessionId: session.id,
        questionBankId: bankId,
        resumed: !!existingSession,
        totalQuestions: questionIds.length,
        message: existingSession ? 'Tiếp tục tiến độ Domain' : 'Bắt đầu luyện tập Domain',
      });
    }

    if (mode === 'SPACED_REPETITION') {
      const now = new Date();
      const [dueQuestions, newQuestions, futureQuestions] = await Promise.all([
        prisma.question.findMany({
          where: {
            questionBankId: bankId,
            progresses: { some: { userId, nextReviewAt: { lte: now } } },
          },
          select: { id: true },
        }),
        prisma.question.findMany({
          where: {
            questionBankId: bankId,
            progresses: { none: { userId } },
          },
          select: { id: true },
        }),
        prisma.question.findMany({
          where: {
            questionBankId: bankId,
            progresses: { some: { userId, nextReviewAt: { gt: now } } },
          },
          select: { id: true },
        }),
      ]);
      const questionIds = takeFromPriorityGroups(
        [
          dueQuestions.map((question) => question.id),
          newQuestions.map((question) => question.id),
          futureQuestions.map((question) => question.id),
        ],
        15
      );
      const session = await prisma.practiceSession.create({
        data: {
          userId,
          questionBankId: bankId,
          mode,
          sourceType: 'SRS',
          questionIds: JSON.stringify(questionIds),
          title: 'Spaced Repetition - 15 câu ưu tiên đến hạn',
        },
      });
      return NextResponse.json({
        sessionId: session.id,
        questionBankId: bankId,
        totalQuestions: questionIds.length,
        selection: {
          dueAvailable: dueQuestions.length,
          newAvailable: newQuestions.length,
          futureFallbackAvailable: futureQuestions.length,
        },
        message: 'Đã tạo phiên SRS ưu tiên câu đến hạn',
      });
    }

    const questionWhere: any = { questionBankId: bankId };
    if (status === 'INCORRECT') {
      questionWhere.progresses = { some: { userId, lastAnswerCorrect: false } };
    } else if (status === 'BOOKMARKED') {
      questionWhere.bookmarks = { some: { userId } };
    } else if (status === 'UNANSWERED') {
      questionWhere.progresses = { none: { userId } };
    }

    const candidates = await prisma.question.findMany({
      where: questionWhere,
      select: { id: true },
    });
    const questionIds = shuffleAndTake(
      candidates.map((question) => question.id),
      safeLimit
    );
    const sourceType = status || 'ALL';

    const session = await prisma.practiceSession.create({
      data: {
        userId,
        questionBankId: bankId,
        mode,
        sourceType,
        questionIds: JSON.stringify(questionIds),
        title: `Phiên luyện tập ${mode}`,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      questionBankId: bankId,
      totalQuestions: questionIds.length,
      message: 'Khởi tạo phiên học thành công',
    });
  } catch (error) {
    console.error('Create practice session error:', error);
    return NextResponse.json({ error: 'Lỗi tạo phiên luyện tập' }, { status: 500 });
  }
}
