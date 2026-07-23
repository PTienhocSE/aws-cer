import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Bạn cần đăng nhập' }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.questionNote.findUnique({ where: { id } });

    if (!existing || existing.userId !== authUser.userId) {
      return NextResponse.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
    }

    await prisma.questionNote.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Đã xóa ghi chú' });
  } catch (error) {
    console.error('Delete note error:', error);
    return NextResponse.json({ error: 'Lỗi xóa ghi chú' }, { status: 500 });
  }
}
