import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;
    const { searchParams } = new URL(req.url);

    const requestedBankId = searchParams.get('questionBankId');
    let activeBankId = requestedBankId || authUser.activeQuestionBankId;

    if (!activeBankId) {
      // Find user's first enrolled bank or any published bank
      const enrolled = await prisma.userQuestionBankEnrollment.findFirst({
        where: { userId },
        orderBy: { enrolledAt: 'desc' },
      });
      if (enrolled) {
        activeBankId = enrolled.questionBankId;
      } else {
        const defaultBank = await prisma.questionBank.findFirst({ where: { status: 'PUBLISHED' } });
        activeBankId = defaultBank?.id || null;
      }
    }

    const domainId = searchParams.get('domainId');
    const difficulty = searchParams.get('difficulty');
    const status = searchParams.get('status') || 'ALL';
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const skip = (page - 1) * limit;

    const where: any = {};
    if (activeBankId) {
      where.questionBankId = activeBankId;
    }

    if (domainId) where.domainId = domainId;
    if (difficulty) where.difficulty = difficulty;

    if (search) {
      where.OR = [
        { questionText: { contains: search, mode: 'insensitive' } },
        { explanationText: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status === 'BOOKMARKED') {
      where.bookmarks = { some: { userId } };
    } else if (status === 'INCORRECT') {
      where.progresses = { some: { userId, lastAnswerCorrect: false } };
    } else if (status === 'CORRECT') {
      where.progresses = { some: { userId, lastAnswerCorrect: true } };
    } else if (status === 'MASTERED') {
      where.progresses = { some: { userId, masteryStatus: 'MASTERED' } };
    } else if (status === 'UNANSWERED') {
      where.progresses = { none: { userId } };
    } else if (status === 'ANSWERED') {
      where.progresses = { some: { userId } };
    } else if (status === 'HAS_NOTE') {
      where.notes = { some: { userId } };
    }

    const [total, questions, statsTotalAnswered, statsCorrect, statsIncorrect, statsBookmarked] = await Promise.all([
      prisma.question.count({ where }),
      prisma.question.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          rawId: true,
          questionBankId: true,
          domainId: true,
          type: true,
          difficulty: true,
          questionText: true,
          explanationText: true,
          options: { select: { id: true, text: true, isCorrect: true } },
          domain: { select: { id: true, code: true, name: true } },
          bookmarks: { where: { userId }, select: { id: true } },
          notes: { where: { userId }, select: { content: true } },
          highlights: { where: { userId }, select: { id: true, selectedText: true, color: true } },
          progresses: {
            where: { userId },
            select: {
              masteryStatus: true,
              lastAnswerCorrect: true,
              attempts: true,
              correctAttempts: true,
              incorrectAttempts: true,
              confidenceLevel: true,
              lastReviewedAt: true,
            },
          },
        },
        orderBy: [{ rawId: 'asc' }, { createdAt: 'desc' }],
      }),
      prisma.userQuestionProgress.count({
        where: { userId, ...(activeBankId ? { questionBankId: activeBankId } : {}) },
      }),
      prisma.userQuestionProgress.count({
        where: { userId, lastAnswerCorrect: true, ...(activeBankId ? { questionBankId: activeBankId } : {}) },
      }),
      prisma.userQuestionProgress.count({
        where: { userId, lastAnswerCorrect: false, ...(activeBankId ? { questionBankId: activeBankId } : {}) },
      }),
      prisma.questionBookmark.count({
        where: { userId, ...(activeBankId ? { questionBankId: activeBankId } : {}) },
      }),
    ]);

    const formatted = questions.map((q) => {
      const isBookmarked = q.bookmarks.length > 0;
      const userNote = q.notes[0]?.content || '';
      const userProgress = q.progresses[0] || null;

      return {
        id: q.id,
        rawId: q.rawId,
        questionBankId: q.questionBankId,
        domainId: q.domainId,
        domainCode: q.domain.code,
        domainName: q.domain.name,
        type: q.type.toLowerCase(),
        difficulty: q.difficulty,
        question: q.questionText,
        explanation: q.explanationText,
        options: q.options,
        highlights: q.highlights || [],
        isBookmarked,
        userNote,
        userProgress,
      };
    });

    return NextResponse.json({
      questions: formatted,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        answered: statsTotalAnswered,
        correct: statsCorrect,
        incorrect: statsIncorrect,
        bookmarked: statsBookmarked,
      },
    });
  } catch (error) {
    console.error('Questions GET error:', error);
    return NextResponse.json({ error: 'Lỗi tải danh sách câu hỏi' }, { status: 500 });
  }
}
