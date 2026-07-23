import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    const userId = authUser.userId;
    const { id: questionId } = await params;

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { questionBankId: true },
    });

    if (!question) {
      return NextResponse.json({ error: 'Câu hỏi không tồn tại' }, { status: 404 });
    }

    const existing = await prisma.questionBookmark.findUnique({
      where: { userId_questionId: { userId, questionId } },
    });

    if (existing) {
      await prisma.questionBookmark.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ isBookmarked: false, message: 'Đã bỏ đánh dấu' });
    } else {
      await prisma.questionBookmark.create({
        data: {
          userId,
          questionId,
          questionBankId: question.questionBankId,
        },
      });
      return NextResponse.json({ isBookmarked: true, message: 'Đã đánh dấu câu hỏi' });
    }
  } catch (error) {
    console.error('Bookmark error:', error);
    return NextResponse.json({ error: 'Lỗi bookmark câu hỏi' }, { status: 500 });
  }
}
