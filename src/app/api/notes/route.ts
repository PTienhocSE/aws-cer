import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Bạn cần đăng nhập' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const domainId = searchParams.get('domainId');
    const search = searchParams.get('search');

    const where: any = { userId: authUser.userId };

    if (domainId) {
      where.question = { domainId };
    }

    if (search) {
      where.OR = [
        { content: { contains: search } },
        { question: { questionText: { contains: search } } },
      ];
    }

    const notes = await prisma.questionNote.findMany({
      where,
      include: {
        question: {
          include: {
            domain: { select: { id: true, name: true, code: true } },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error('Notes GET error:', error);
    return NextResponse.json({ error: 'Lỗi tải ghi chú' }, { status: 500 });
  }
}
