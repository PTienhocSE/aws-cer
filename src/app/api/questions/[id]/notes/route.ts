import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;
    const { id: questionId } = await params;
    const body = await req.json();
    const { content } = body;

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { questionBankId: true },
    });

    if (!question) {
      return NextResponse.json({ error: 'Câu hỏi không tồn tại' }, { status: 404 });
    }

    const note = await prisma.questionNote.upsert({
      where: { userId_questionId: { userId, questionId } },
      create: {
        userId,
        questionId,
        questionBankId: question.questionBankId,
        content: content || '',
      },
      update: {
        content: content || '',
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ note, message: 'Đã lưu ghi chú thành công' });
  } catch (error) {
    console.error('Save note error:', error);
    return NextResponse.json({ error: 'Lỗi lưu ghi chú' }, { status: 500 });
  }
}
