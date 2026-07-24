import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;
    const { id: questionId } = await params;

    const question = await prisma.question.findUnique({
      where: { id: questionId },
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
        highlights: { where: { userId } },
        progresses: { where: { userId }, select: { masteryStatus: true, lastAnswerCorrect: true } },
      },
    });

    if (!question) {
      return NextResponse.json({ error: 'Không tìm thấy câu hỏi' }, { status: 404 });
    }

    const isBookmarked = question.bookmarks.length > 0;
    const userNote = question.notes[0]?.content || '';
    const userProgress = question.progresses[0] || null;

    return NextResponse.json({
      question: {
        id: question.id,
        rawId: question.rawId,
        questionBankId: question.questionBankId,
        domainId: question.domainId,
        domainName: question.domain.name,
        type: question.type.toLowerCase(),
        difficulty: question.difficulty,
        questionText: question.questionText,
        explanationText: question.explanationText,
        options: question.options,
        isBookmarked,
        userNote,
        highlights: question.highlights,
        userProgress,
      },
    });
  } catch (error) {
    console.error('Question GET error:', error);
    return NextResponse.json({ error: 'Lỗi server khi lấy thông tin câu hỏi' }, { status: 500 });
  }
}
