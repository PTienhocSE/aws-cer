import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';
import { getNextQuestionIndex, parseQuestionIds } from '@/lib/practice-selection';

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

    const storedQuestionIds = parseQuestionIds(session.questionIds);
    const where =
      storedQuestionIds.length > 0
        ? {
            questionBankId: session.questionBankId,
            id: { in: storedQuestionIds },
          }
        : {
            questionBankId: session.questionBankId,
            ...(session.mode === 'DOMAIN' && session.sourceId ? { domainId: session.sourceId } : {}),
          };

    const fetchedQuestions = await prisma.question.findMany({
      where,
      include: {
        options: true,
        domain: true,
      },
      ...(storedQuestionIds.length === 0 && session.mode !== 'DOMAIN' ? { take: 15 } : {}),
      orderBy: [{ rawId: 'asc' }, { createdAt: 'asc' }],
    });
    const byId = new Map(fetchedQuestions.map((question) => [question.id, question]));
    const rawQuestions =
      storedQuestionIds.length > 0
        ? storedQuestionIds.flatMap((questionId) => {
            const question = byId.get(questionId);
            return question ? [question] : [];
          })
        : fetchedQuestions;

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
        userSelectedOptionIds: answered?.selectedOptionIds ? JSON.parse(answered.selectedOptionIds) : [],
        options: q.options.map((opt, idx) => ({
          id: opt.id,
          key: String.fromCharCode(65 + idx), // A, B, C, D...
          content: opt.text,
          isCorrect: answered ? opt.isCorrect : false, // Only reveal after answering
        })),
      };
    });

    const answeredCount = questions.filter((question) => question.isAnswered).length;
    const correctCount = questions.filter((question) => question.wasCorrect === true).length;
    const nextQuestionIndex = getNextQuestionIndex(
      questions.map((question) => question.id),
      questions.filter((question) => question.isAnswered).map((question) => question.id)
    );
    return NextResponse.json({
      session: {
        id: session.id,
        mode: session.mode,
        sourceType: session.sourceType,
        sourceId: session.sourceId,
        title: session.title,
      },
      progress: {
        answeredCount,
        correctCount,
        incorrectCount: answeredCount - correctCount,
        totalQuestions: questions.length,
        nextQuestionNumber: questions.length > 0 ? nextQuestionIndex + 1 : 0,
      },
      questions,
    });
  } catch (error) {
    console.error('Get practice session questions error:', error);
    return NextResponse.json({ error: 'Lỗi tải câu hỏi luyện tập' }, { status: 500 });
  }
}
