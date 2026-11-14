import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const { id } = await params;

    const session = await prisma.practiceSession.findUnique({
      where: { id },
      include: {
        answers: true,
      },
    });

    if (!session || session.userId !== authUser.userId) {
      return NextResponse.json({ error: 'Không tìm thấy phiên luyện tập' }, { status: 404 });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Get practice session error:', error);
    return NextResponse.json({ error: 'Lỗi tải thông tin phiên' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const { id } = await params;

    const session = await prisma.practiceSession.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });

    if (!session || session.userId !== authUser.userId) {
      return NextResponse.json({ error: 'Không tìm thấy phiên luyện tập' }, { status: 404 });
    }

    await prisma.practiceSession.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Đã xóa phiên luyện tập thành công' });
  } catch (error) {
    console.error('Delete practice session error:', error);
    return NextResponse.json({ error: 'Lỗi xóa phiên luyện tập' }, { status: 500 });
  }
}
