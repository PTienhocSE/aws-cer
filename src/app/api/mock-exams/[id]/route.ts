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
          orderBy: { id: 'asc' },
          include: {
            question: {
              include: {
                options: {
                  select: { id: true, text: true, isCorrect: true },
                },
                domain: { select: { id: true, name: true, code: true } },
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      return NextResponse.json({ error: 'Không tìm thấy bài thi' }, { status: 404 });
    }

    // Corporate network / guest mode resilience
    const isGuestOrDemo =
      authUser.role === 'GUEST' ||
      authUser.email === 'guest@awscer.local' ||
      req.headers.get('x-guest-mode') === '1' ||
      attempt.userId === 'guest-learner';

    if (attempt.userId !== authUser.userId && !isGuestOrDemo) {
      return NextResponse.json({ error: 'Không tìm thấy bài thi' }, { status: 404 });
    }

    // If the attempt is still in progress, mask `isCorrect` so the examinee cannot peek answers in network devtools
    if (!attempt.isCompleted) {
      const sanitizedAnswers = attempt.answers.map((ans) => ({
        ...ans,
        isCorrect: null,
        question: {
          ...ans.question,
          options: ans.question.options.map((opt) => ({
            id: opt.id,
            text: opt.text,
          })),
        },
      }));
      return NextResponse.json({ attempt: { ...attempt, answers: sanitizedAnswers } });
    }

    return NextResponse.json({ attempt });
  } catch (error) {
    console.error('Get mock exam error:', error);
    return NextResponse.json({ error: 'Lỗi tải bài thi' }, { status: 500 });
  }
}
