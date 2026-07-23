import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    const { id } = await params;

    const session = await prisma.practiceSession.findUnique({ where: { id } });
    if (!session || session.userId !== authUser.userId) {
      return NextResponse.json({ error: 'Không tìm thấy phiên luyện tập' }, { status: 404 });
    }

    // Delete all answers for this session so questions appear unanswered again
    await prisma.practiceAnswer.deleteMany({ where: { sessionId: id } });

    return NextResponse.json({ ok: true, message: 'Đã xoá toàn bộ câu trả lời. Sẵn sàng làm lại!' });
  } catch (error) {
    console.error('Reset practice session error:', error);
    return NextResponse.json({ error: 'Lỗi khi reset phiên học' }, { status: 500 });
  }
}
