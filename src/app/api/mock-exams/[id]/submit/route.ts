import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;
    const { id: examAttemptId } = await params;
    const body = await req.json();
    const answers = body.answers || body.userAnswers || [];
    const timeSpentSeconds = body.timeSpentSeconds || 0;

    const attempt = await prisma.mockExamAttempt.findUnique({
      where: { id: examAttemptId },
      include: {
        answers: {
          include: {
            question: {
              include: { options: true },
            },
          },
        },
      },
    });

    if (!attempt) {
      return NextResponse.json({ error: 'Bài thi không tồn tại' }, { status: 404 });
    }

    const isGuestOrDemo =
      authUser.role === 'GUEST' ||
      authUser.email === 'guest@aws-cert.local' ||
      authUser.email === 'guest@awscer.local' ||
      authUser.email?.includes('guest') ||
      req.headers.get('x-guest-mode') === '1' ||
      attempt.userId === 'guest-learner';

    if (attempt.userId !== userId && !isGuestOrDemo) {
      return NextResponse.json({ error: 'Bài thi không tồn tại' }, { status: 404 });
    }

    let correctCount = 0;
    const answerUpdates: any[] = [];
    const progressUpserts: any[] = [];

    for (const ans of answers) {
      const dbAns = attempt.answers.find((a) => a.questionId === ans.questionId);
      if (!dbAns) continue;

      const correctOptionIds = dbAns.question.options.filter((o) => o.isCorrect).map((o) => o.id);
      const userSelected: string[] = ans.selectedOptionIds || [];

      const isCorrect =
        userSelected.length === correctOptionIds.length &&
        userSelected.every((id) => correctOptionIds.includes(id));

      if (isCorrect) correctCount++;

      answerUpdates.push(
        prisma.mockExamAnswer.update({
          where: { id: dbAns.id },
          data: {
            selectedOptionIds: JSON.stringify(userSelected),
            isFlagged: ans.isFlagged || false,
            isCorrect,
          },
        })
      );

      progressUpserts.push(
        prisma.userQuestionProgress.upsert({
          where: { userId_questionId: { userId: attempt.userId, questionId: ans.questionId } },
          create: {
            userId: attempt.userId,
            questionId: ans.questionId,
            questionBankId: attempt.questionBankId,
            attempts: 1,
            correctAttempts: isCorrect ? 1 : 0,
            incorrectAttempts: isCorrect ? 0 : 1,
            lastAnswerCorrect: isCorrect,
            masteryStatus: isCorrect ? 'LEARNING' : 'NEW',
            lastReviewedAt: new Date(),
          },
          update: {
            attempts: { increment: 1 },
            correctAttempts: { increment: isCorrect ? 1 : 0 },
            incorrectAttempts: { increment: isCorrect ? 0 : 1 },
            lastAnswerCorrect: isCorrect,
            lastReviewedAt: new Date(),
          },
        })
      );
    }

    const totalQuestions = attempt.answers.length;
    const accuracy = totalQuestions > 0 ? correctCount / totalQuestions : 0;
    const score = Math.round(100 + accuracy * 900);
    const isPassed = score >= 720;
    const todayStr = new Date().toISOString().split('T')[0];

    // Ultra-fast parallel execution:
    // 1. Update attempt
    // 2. Batch update answers in a single transaction
    // 3. Upsert daily activity
    const [updatedAttempt] = await Promise.all([
      prisma.mockExamAttempt.update({
        where: { id: examAttemptId },
        data: {
          score,
          isPassed,
          isCompleted: true,
          submittedAt: new Date(),
          timeSpentSeconds,
        },
      }),
      answerUpdates.length > 0 ? prisma.$transaction(answerUpdates) : Promise.resolve([]),
      prisma.dailyStudyActivity.upsert({
        where: {
          userId_questionBankId_activityDate: {
            userId: attempt.userId,
            questionBankId: attempt.questionBankId,
            activityDate: todayStr,
          },
        },
        create: {
          userId: attempt.userId,
          questionBankId: attempt.questionBankId,
          activityDate: todayStr,
          answeredQuestions: totalQuestions,
          correctAnswers: correctCount,
          incorrectAnswers: totalQuestions - correctCount,
          mockExamsCompleted: 1,
          studySeconds: timeSpentSeconds,
        },
        update: {
          answeredQuestions: { increment: totalQuestions },
          correctAnswers: { increment: correctCount },
          incorrectAnswers: { increment: totalQuestions - correctCount },
          mockExamsCompleted: { increment: 1 },
          studySeconds: { increment: timeSpentSeconds },
        },
      }),
    ]);

    // Background update user progress so the HTTP response returns in <300ms
    if (progressUpserts.length > 0) {
      Promise.allSettled(progressUpserts).catch((err) => {
        console.warn('Background userQuestionProgress upsert warning:', err);
      });
    }

    return NextResponse.json({
      attemptId: updatedAttempt.id,
      attempt: updatedAttempt,
      score,
      isPassed,
      correctCount,
      totalQuestions,
    });
  } catch (error) {
    console.error('Submit mock exam error:', error);
    return NextResponse.json({ error: 'Lỗi nộp bài thi thử' }, { status: 500 });
  }
}
