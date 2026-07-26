import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;
    let activeBankId = authUser.activeQuestionBankId;

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

    const { searchParams } = new URL(req.url);
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
        { questionText: { contains: search } },
        { explanationText: { contains: search } },
      ];
    }

    if (status === 'BOOKMARKED') {
      where.bookmarks = { some: { userId } };
    } else if (status === 'INCORRECT') {
      where.progresses = { some: { userId, lastAnswerCorrect: false } };
    } else if (status === 'MASTERED') {
      where.progresses = { some: { userId, masteryStatus: 'MASTERED' } };
    } else if (status === 'UNANSWERED') {
      where.progresses = { none: { userId } };
    } else if (status === 'ANSWERED') {
      where.progresses = { some: { userId } };
    }

    const [total, questions] = await Promise.all([
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
          options: { select: { id: true, text: true, isCorrect: true } },
          domain: { select: { id: true, code: true, name: true } },
          bookmarks: { where: { userId }, select: { id: true } },
          notes: { where: { userId }, select: { content: true } },
          progresses: { where: { userId }, select: { masteryStatus: true, lastAnswerCorrect: true } },
        },
        orderBy: { createdAt: 'desc' },
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
        domainName: q.domain.name,
        type: q.type.toLowerCase(),
        difficulty: q.difficulty,
        question: q.questionText,
        options: q.options,
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
    });
  } catch (error) {
    console.error('Questions GET error:', error);
    return NextResponse.json({ error: 'Lỗi tải danh sách câu hỏi' }, { status: 500 });
  }
}
