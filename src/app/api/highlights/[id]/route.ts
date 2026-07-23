import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    const { id } = await params;

    const existing = await prisma.questionHighlight.findUnique({ where: { id } });
    if (!existing || existing.userId !== authUser.userId) {
      return NextResponse.json({ error: 'Không tìm thấy highlight' }, { status: 404 });
    }

    await prisma.questionHighlight.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Đã xóa highlight' });
  } catch (error) {
    console.error('Delete highlight error:', error);
    return NextResponse.json({ error: 'Lỗi xóa highlight' }, { status: 500 });
  }
}
