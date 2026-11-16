import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';
import { shuffleAndTake, takeFromPriorityGroups } from '@/lib/practice-selection';

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

    const sessions = await prisma.practiceSession.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        questionBank: {
          select: { id: true, name: true, version: true },
        },
        answers: {
          select: { id: true, isCorrect: true, questionId: true },
        },
      },
      take: 60,
    });

    const formatted = sessions.map((s) => {
      let totalQuestions = 0;
      try {
        const qIds = JSON.parse(s.questionIds || '[]');
        totalQuestions = Array.isArray(qIds) ? qIds.length : 0;
      } catch {
        totalQuestions = 0;
      }

      const answeredCount = s.answers.length;
      const correctCount = s.answers.filter((a) => a.isCorrect).length;
      const incorrectCount = answeredCount - correctCount;
      const isCompleted = totalQuestions > 0 && answeredCount >= totalQuestions;
      const accuracyRate = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

      return {
        id: s.id,
        title: s.title || `Phiên luyện tập ${s.mode}`,
        mode: s.mode,
        sourceType: s.sourceType,
        sourceId: s.sourceId,
        questionBank: s.questionBank,
        totalQuestions,
        answeredCount,
        correctCount,
        incorrectCount,
        isCompleted,
        accuracyRate,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      };
    });

    return NextResponse.json({ sessions: formatted });
  } catch (error) {
    console.error('Get practice sessions error:', error);
    return NextResponse.json({ error: 'Lỗi tải danh sách phiên luyện tập' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;
    const body = await req.json();
    const bankId = body.questionBankId || authUser.activeQuestionBankId;
    if (!bankId) {
      return NextResponse.json({ error: 'Chưa chọn ngân hàng câu hỏi' }, { status: 400 });
    }
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

    if (mode === 'NEXT_BATCH') {
      const excludeIds: string[] = Array.isArray(body.excludeQuestionIds) ? body.excludeQuestionIds : [];

      const unanswered = await prisma.question.findMany({
        where: {
          questionBankId: bankId,
          ...(domainId ? { domainId } : {}),
          id: { notIn: excludeIds },
          progresses: { none: { userId } },
        },
        select: { id: true },
        take: safeLimit,
        orderBy: [{ rawId: 'asc' }, { createdAt: 'asc' }],
      });

      let nextIds = unanswered.map((q) => q.id);

      if (nextIds.length < safeLimit) {
        const remainingNeeded = safeLimit - nextIds.length;
        const fallback = await prisma.question.findMany({
          where: {
            questionBankId: bankId,
            ...(domainId ? { domainId } : {}),
            id: { notIn: [...excludeIds, ...nextIds] },
          },
          select: { id: true },
          take: remainingNeeded,
          orderBy: [{ rawId: 'asc' }, { createdAt: 'asc' }],
        });
        nextIds = [...nextIds, ...fallback.map((q) => q.id)];
      }

      if (nextIds.length === 0) {
        const anyQuestions = await prisma.question.findMany({
          where: { questionBankId: bankId, ...(domainId ? { domainId } : {}) },
          select: { id: true },
          take: safeLimit,
        });
        nextIds = shuffleAndTake(
          anyQuestions.map((q) => q.id),
          safeLimit
        );
      }

      const session = await prisma.practiceSession.create({
        data: {
          userId,
          questionBankId: bankId,
          mode: 'CUSTOM',
          sourceType: 'NEXT_BATCH',
          sourceId: domainId || null,
          questionIds: JSON.stringify(nextIds),
          title: 'Luyện tập 15 câu tiếp theo',
        },
      });

      return NextResponse.json({
        sessionId: session.id,
        questionBankId: bankId,
        totalQuestions: nextIds.length,
        message: 'Đã tạo bộ 15 câu tiếp theo thành công',
      });
    }

    const questionWhere: any = { questionBankId: bankId };
    if (domainId) {
      questionWhere.domainId = domainId;
    }
    if (status === 'INCORRECT') {
      questionWhere.progresses = { some: { userId, lastAnswerCorrect: false } };
    } else if (status === 'CORRECT') {
      questionWhere.progresses = { some: { userId, lastAnswerCorrect: true } };
    } else if (status === 'ANSWERED') {
      questionWhere.progresses = { some: { userId } };
    } else if (status === 'BOOKMARKED') {
      questionWhere.bookmarks = { some: { userId } };
    } else if (status === 'UNANSWERED') {
      questionWhere.progresses = { none: { userId } };
    }

    let questionIds: string[] = [];
    if (Array.isArray(body.questionIds) && body.questionIds.length > 0) {
      questionIds = body.questionIds.slice(0, safeLimit);
    } else {
      const candidates = await prisma.question.findMany({
        where: questionWhere,
        select: { id: true },
      });
      if (candidates.length === 0) {
        return NextResponse.json(
          { error: 'Không tìm thấy câu hỏi nào phù hợp với bộ lọc này để luyện tập.' },
          { status: 404 }
        );
      }
      questionIds = shuffleAndTake(
        candidates.map((question) => question.id),
        safeLimit
      );
    }

    const sourceType = status || 'ALL';
    let sessionTitle = `Phiên luyện tập ${mode}`;
    if (status === 'INCORRECT') sessionTitle = 'Luyện tập lại các câu làm SAI';
    else if (status === 'CORRECT') sessionTitle = 'Luyện củng cố các câu làm ĐÚNG';
    else if (status === 'ANSWERED') sessionTitle = 'Luyện tập lại các câu đã làm';
    else if (status === 'BOOKMARKED') sessionTitle = 'Luyện tập các câu đã Đánh dấu (Bookmark)';

    const session = await prisma.practiceSession.create({
      data: {
        userId,
        questionBankId: bankId,
        mode,
        sourceType,
        questionIds: JSON.stringify(questionIds),
        title: sessionTitle,
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
