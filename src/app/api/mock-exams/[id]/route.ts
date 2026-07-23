import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const { id } = await params;

    const attempt = await prisma.mockExamAttempt.findUnique({
      where: { id },
      include: {
        answers: {
          include: {
            question: {
              include: {
                options: {
                  select: { id: true, text: true },
                },
                domain: { select: { id: true, name: true, code: true } },
              },
            },
          },
        },
      },
    });

    if (!attempt || attempt.userId !== authUser.userId) {
      return NextResponse.json({ error: 'Không tìm thấy bài thi' }, { status: 404 });
    }

    return NextResponse.json({ attempt });
  } catch (error) {
    console.error('Get mock exam error:', error);
    return NextResponse.json({ error: 'Lỗi tải bài thi' }, { status: 500 });
  }
}
