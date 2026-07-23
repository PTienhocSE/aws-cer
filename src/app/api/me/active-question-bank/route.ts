import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const body = await req.json();
    const { questionBankId } = body;

    if (!questionBankId) {
      return NextResponse.json({ error: 'Thiếu questionBankId' }, { status: 400 });
    }

    const bank = await prisma.questionBank.findUnique({ where: { id: questionBankId } });
    if (!bank) {
      return NextResponse.json({ error: 'Bộ câu hỏi không tồn tại' }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: authUser.userId },
      data: { activeQuestionBankId: questionBankId },
    });

    return NextResponse.json({ success: true, activeQuestionBankId: questionBankId });
  } catch (error) {
    console.error('Active bank update error:', error);
    return NextResponse.json({ error: 'Lỗi chuyển đổi bộ câu hỏi' }, { status: 500 });
  }
}
