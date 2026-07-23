import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }

    const { name } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: authUser.userId },
      data: {
        name: name !== undefined ? name : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        activeQuestionBankId: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Cập nhật thất bại' }, { status: 500 });
  }
}
