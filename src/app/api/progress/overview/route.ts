import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOptionalAuthUser } from '@/lib/auth';
import { calculateStreak } from '@/lib/streak';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getOptionalAuthUser(req);
    if (!authUser) {
      return NextResponse.json(null);
    }

    const userId = authUser.userId;
    const bankId = authUser.activeQuestionBankId;

    if (!bankId) {
      return NextResponse.json(null);
    }

    // Fetch Active Question Bank & Certification
    const bank = await prisma.questionBank.findUnique({
      where: { id: bankId },
      include: { certification: true },
    });

    const totalQuestions = bank ? bank.totalQuestions : await prisma.question.count();

    // User progresses for active bank
    const progresses = await prisma.userQuestionProgress.findMany({
      where: { userId, questionBankId: bankId },
    });

    const totalAnswered = progresses.length;
    const correctCount = progresses.filter((p) => p.lastAnswerCorrect === true).length;
    const accuracyRate = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    const bookmarkedCount = await prisma.questionBookmark.count({
      where: { userId, questionBankId: bankId },
    });

    const notesCount = await prisma.questionNote.count({
      where: { userId, questionBankId: bankId },
    });

    // Real Study Activities & Streak Calculation
    const activities = await prisma.dailyStudyActivity.findMany({
      where: { userId },
      orderBy: { activityDate: 'desc' },
    });

    const todayStr = new Date().toISOString().split('T')[0];
    const streakResult = calculateStreak(
      activities.map((a) => ({ activityDate: a.activityDate, answeredQuestions: a.answeredQuestions })),
      todayStr
    );

    // Latest Mock Exam Result
    const latestExam = await prisma.mockExamAttempt.findFirst({
      where: { userId, questionBankId: bankId, isCompleted: true },
      orderBy: { submittedAt: 'desc' },
    });

    return NextResponse.json({
      activeQuestionBankId: bankId,
      activeCertification: bank
        ? {
            id: bank.certification.id,
            name: bank.certification.name,
            code: bank.certification.code,
            bankName: bank.name,
            version: bank.version,
          }
        : null,
      stats: {
        totalQuestions,
        totalAnswered,
        accuracyRate,
        bookmarkedCount,
        notesCount,
        streakDays: streakResult.currentStreak,
        longestStreak: streakResult.longestStreak,
        todayCompleted: streakResult.todayCompleted,
        lastMockExamScore: latestExam?.score ?? null,
        lastMockExamPassed: latestExam?.isPassed ?? null,
      },
    });
  } catch (error) {
    console.error('Progress overview GET error:', error);
    return NextResponse.json({ error: 'Lỗi tải tiến độ' }, { status: 500 });
  }
}
