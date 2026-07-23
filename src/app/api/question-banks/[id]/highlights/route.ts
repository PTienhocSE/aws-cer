import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const { id: questionBankId } = await params;
    const { searchParams } = new URL(req.url);
    const color = searchParams.get('color');
    const search = searchParams.get('search');

    const where: any = {
      userId: authUser.userId,
      questionBankId,
    };

    if (color) where.color = color;
    if (search) {
      where.OR = [
        { selectedText: { contains: search } },
        { question: { questionText: { contains: search } } },
      ];
    }

    const highlights = await prisma.questionHighlight.findMany({
      where,
      include: {
        question: {
          include: {
            domain: { select: { id: true, name: true, code: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ highlights });
  } catch (error) {
    console.error('Get bank highlights error:', error);
    return NextResponse.json({ error: 'Lỗi tải highlights' }, { status: 500 });
  }
}
