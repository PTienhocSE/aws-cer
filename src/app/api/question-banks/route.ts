import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOptionalAuthUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getOptionalAuthUser(req);
    const userId = authUser?.userId || null;

    const banks = await prisma.questionBank.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        certification: true,
        domains: { select: { id: true, code: true, name: true } },
        enrollments: userId ? { where: { userId } } : false,
      },
      orderBy: { createdAt: 'asc' },
    });

    const formatted = banks.map((b) => {
      const enrollment = b.enrollments?.[0];
      return {
        id: b.id,
        name: b.name,
        slug: b.slug,
        version: b.version,
        description: b.description,
        totalQuestions: b.totalQuestions,
        domainsCount: b.domains.length,
        certification: {
          id: b.certification.id,
          code: b.certification.code,
          name: b.certification.name,
          provider: b.certification.provider,
        },
        isEnrolled: !!enrollment,
        enrollmentStatus: enrollment?.status || null,
        progressPercent: enrollment?.progressPercent || 0,
      };
    });

    return NextResponse.json({ questionBanks: formatted });
  } catch (error) {
    console.error('Question banks GET error:', error);
    return NextResponse.json({ error: 'Lỗi tải danh sách bộ câu hỏi' }, { status: 500 });
  }
}
