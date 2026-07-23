import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    const userId = authUser.userId;

    // Ensure activeBankId is never undefined (Prisma ignores undefined in where filter)
    let activeBankId = authUser.activeQuestionBankId;
    if (!activeBankId) {
      const defaultBank = await prisma.questionBank.findFirst({ where: { status: 'PUBLISHED' } });
      activeBankId = defaultBank?.id || 'aws-saa-c03-v1';
    }

    const domains = await prisma.domain.findMany({
      where: {
        questionBankId: activeBankId,
      },
      include: {
        questions: {
          select: {
            id: true,
            progresses: {
              where: { userId },
            },
          },
        },
      },
      orderBy: { code: 'asc' },
    });

    const domainStats = domains.map((d) => {
      const totalQuestions = d.questions.length;
      let answeredCount = 0;
      let correctCount = 0;

      d.questions.forEach((q) => {
        if (q.progresses.length > 0) {
          answeredCount++;
          if (q.progresses[0].lastAnswerCorrect) {
            correctCount++;
          }
        }
      });

      const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
      const completion = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

      return {
        id: d.id,
        code: d.code,
        name: d.name,
        weightPercentage: d.weightPercentage,
        totalQuestions,
        answeredCount,
        correctCount,
        accuracy,
        completion,
        isWeak: answeredCount > 3 && accuracy < 70,
      };
    });

    const weakDomains = domainStats.filter((d) => d.isWeak);

    return NextResponse.json({
      domains: domainStats,
      weakDomains,
    });
  } catch (error) {
    console.error('Progress domains error:', error);
    return NextResponse.json({ error: 'Lỗi tải tiến độ domain' }, { status: 500 });
  }
}
