import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';
import { calculateStreak } from '@/lib/streak';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const requestedBankId = req.nextUrl.searchParams.get('questionBankId');

    if (!authUser) {
      // Unauthenticated visitor: zero progress, no DB sync across users
      const targetBankId = requestedBankId || null;
      const bank = targetBankId
        ? await prisma.questionBank.findUnique({
            where: { id: targetBankId },
            select: {
              id: true,
              name: true,
              version: true,
              totalQuestions: true,
              certification: { select: { id: true, name: true, code: true } },
            },
          })
        : await prisma.questionBank.findFirst({
            where: { status: 'PUBLISHED' },
            select: {
              id: true,
              name: true,
              version: true,
              totalQuestions: true,
              certification: { select: { id: true, name: true, code: true } },
            },
          });

      return NextResponse.json({
        activeQuestionBankId: bank?.id || null,
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
          totalQuestions: bank?.totalQuestions || 0,
          totalAnswered: 0,
          accuracyRate: 0,
          bookmarkedCount: 0,
          notesCount: 0,
          streakDays: 0,
          longestStreak: 0,
          todayCompleted: false,
          lastMockExamScore: null,
          lastMockExamPassed: null,
        },
      });
    }

    const userId = authUser.userId;
    let bankId = requestedBankId || authUser.activeQuestionBankId;

    if (!bankId) {
      const enrolled = await prisma.userQuestionBankEnrollment.findFirst({
        where: { userId },
        orderBy: { enrolledAt: 'desc' },
      });
      if (enrolled) {
        bankId = enrolled.questionBankId;
      } else {
        const defaultBank = await prisma.questionBank.findFirst({ where: { status: 'PUBLISHED' } });
        bankId = defaultBank?.id || null;
      }
    }

    if (!bankId) {
      return NextResponse.json({
        activeQuestionBankId: null,
        activeCertification: null,
        stats: {
          totalQuestions: 0,
          totalAnswered: 0,
          accuracyRate: 0,
          bookmarkedCount: 0,
          notesCount: 0,
          streakDays: 0,
          longestStreak: 0,
          todayCompleted: false,
          lastMockExamScore: null,
          lastMockExamPassed: null,
        },
      });
    }

    // Parallelize all DB queries using Promise.all
    const [bank, progresses, bookmarkedCount, notesCount, activities, latestExam] = await Promise.all([
      prisma.questionBank.findUnique({
        where: { id: bankId },
        select: {
          id: true,
          name: true,
          version: true,
          totalQuestions: true,
          certification: {
            select: { id: true, name: true, code: true },
          },
        },
      }),
      prisma.userQuestionProgress.findMany({
        where: { userId, questionBankId: bankId },
        select: { lastAnswerCorrect: true },
      }),
      prisma.questionBookmark.count({
        where: { userId, questionBankId: bankId },
      }),
      prisma.questionNote.count({
        where: { userId, questionBankId: bankId },
      }),
      prisma.dailyStudyActivity.findMany({
        where: { userId },
        select: { activityDate: true, answeredQuestions: true },
        orderBy: { activityDate: 'desc' },
      }),
      prisma.mockExamAttempt.findFirst({
        where: { userId, questionBankId: bankId, isCompleted: true },
        select: { score: true, isPassed: true },
        orderBy: { submittedAt: 'desc' },
      }),
    ]);

    const totalQuestions = bank?.totalQuestions || 0;
    const totalAnswered = progresses.length;
    const correctCount = progresses.filter((p) => p.lastAnswerCorrect === true).length;
    const accuracyRate = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const streakResult = calculateStreak(activities, todayStr);

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
