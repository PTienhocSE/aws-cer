import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const { id } = await params;

    // Verify session belongs to this user
    const session = await prisma.practiceSession.findUnique({
      where: { id },
    });

    if (!session || session.userId !== authUser.userId) {
      return NextResponse.json({ error: 'Không tìm thấy phiên luyện tập' }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 15;

    // Fetch questions from the session's question bank
    const rawQuestions = await prisma.question.findMany({
      where: {
        questionBankId: session.questionBankId,
      },
      include: {
        options: true,
        domain: true,
      },
      take: limit,
      orderBy: { createdAt: 'asc' },
    });

    const questionIds = rawQuestions.map((q) => q.id);
    const userId = authUser.userId;

    // Fetch bookmarks, highlights, notes for this user in batch
    const [bookmarks, highlights, notes, existingAnswers] = await Promise.all([
      prisma.questionBookmark.findMany({
        where: { userId, questionId: { in: questionIds } },
        select: { questionId: true },
      }),
      prisma.questionHighlight.findMany({
        where: { userId, questionId: { in: questionIds } },
        select: { questionId: true, selectedText: true, color: true, id: true },
      }),
      prisma.questionNote.findMany({
        where: { userId, questionId: { in: questionIds } },
        select: { questionId: true, content: true },
      }),
      prisma.practiceAnswer.findMany({
        where: { sessionId: id, questionId: { in: questionIds } },
        select: { questionId: true, selectedOptionIds: true, isCorrect: true },
      }),
    ]);

    const bookmarkSet = new Set(bookmarks.map((b) => b.questionId));
    const highlightMap = new Map<string, typeof highlights>();
    for (const h of highlights) {
      const arr = highlightMap.get(h.questionId) || [];
      arr.push(h);
      highlightMap.set(h.questionId, arr);
    }
    const noteMap = new Map(notes.map((n) => [n.questionId, n.content]));
    const answeredMap = new Map(existingAnswers.map((a) => [a.questionId, a]));

    const questions = rawQuestions.map((q) => {
      const answered = answeredMap.get(q.id);
      return {
        id: q.id,
        content: q.questionText,
        explanation: q.explanationText,
        type: q.type === 'MULTIPLE_CHOICE' ? 'multiple_choice' : 'single_choice',
        domainName: q.domain.name,
        isBookmarked: bookmarkSet.has(q.id),
        userHighlights: highlightMap.get(q.id) || [],
        userNote: noteMap.get(q.id) || null,
        isAnswered: !!answered,
        wasCorrect: answered?.isCorrect ?? null,
        options: q.options.map((opt, idx) => ({
          id: opt.id,
          key: String.fromCharCode(65 + idx), // A, B, C, D...
          content: opt.text,
          isCorrect: answered ? opt.isCorrect : false, // Only reveal after answering
        })),
      };
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Get practice session questions error:', error);
    return NextResponse.json({ error: 'Lỗi tải câu hỏi luyện tập' }, { status: 500 });
  }
}
