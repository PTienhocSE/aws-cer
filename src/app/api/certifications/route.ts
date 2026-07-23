import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const certifications = await prisma.certification.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        _count: { select: { questionBanks: true } },
      },
    });
    return NextResponse.json({ certifications });
  } catch (error) {
    console.error('Certifications GET error:', error);
    return NextResponse.json({ error: 'Lỗi tải chứng chỉ' }, { status: 500 });
  }
}
