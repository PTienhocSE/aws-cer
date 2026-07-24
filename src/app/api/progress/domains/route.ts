import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;

    // Ensure activeBankId is never undefined (Prisma ignores undefined in where filter)
    let activeBankId = authUser.activeQuestionBankId;
    if (!activeBankId) {
      const defaultBank = await prisma.questionBank.findFirst({ where: { status: 'PUBLISHED' } });
      activeBankId = defaultBank?.id || 'aws-saa-c03-v1';
    }

    const domains = await prisma.domain.findMany({
      where: { questionBankId: activeBankId },
      orderBy: { code: 'asc' },
      select: {
        id: true,
        code: true,
        name: true,
        weightPercentage: true,
        _count: {
          select: { questions: true },
        },
      },
    });

    const userProgresses = await prisma.userQuestionProgress.findMany({
      where: {
        userId,
        questionBankId: activeBankId,
      },
      select: {
        questionId: true,
        lastAnswerCorrect: true,
        question: {
          select: { domainId: true },
        },
      },
    });

    // Group progress by domainId in memory
    const domainProgressMap: Record<string, { answeredCount: number; correctCount: number }> = {};
    userProgresses.forEach((p) => {
      const dId = p.question?.domainId;
      if (!dId) return;
      if (!domainProgressMap[dId]) {
        domainProgressMap[dId] = { answeredCount: 0, correctCount: 0 };
      }
      domainProgressMap[dId].answeredCount++;
      if (p.lastAnswerCorrect) {
        domainProgressMap[dId].correctCount++;
      }
    });

    const domainStats = domains.map((d) => {
      const totalQuestions = d._count.questions;
      const prog = domainProgressMap[d.id] || { answeredCount: 0, correctCount: 0 };
      const answeredCount = prog.answeredCount;
      const correctCount = prog.correctCount;

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
