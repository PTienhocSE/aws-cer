import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';
import { calculateSuperMemo2 } from '@/lib/spaced-repetition';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    const userId = authUser.userId;
    const { id: sessionId } = await params;
    const body = await req.json();
    const { questionId, selectedOptionIds, confidenceLevel = 3 } = body;

    const session = await prisma.practiceSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      return NextResponse.json({ error: 'Phiên học không tồn tại' }, { status: 404 });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { options: true },
    });

    if (!question) {
      return NextResponse.json({ error: 'Câu hỏi không tồn tại' }, { status: 404 });
    }

    // Determine correctness
    const correctOptionIds = question.options.filter((o) => o.isCorrect).map((o) => o.id);
    const isCorrect =
      selectedOptionIds.length === correctOptionIds.length &&
      selectedOptionIds.every((id: string) => correctOptionIds.includes(id));

    // Save answer
    const answer = await prisma.practiceAnswer.create({
      data: {
        sessionId,
        questionId,
        selectedOptionIds: JSON.stringify(selectedOptionIds),
        isCorrect,
        confidenceLevel,
      },
    });

    // Update or create UserQuestionProgress (SRS)
    const existingProgress = await prisma.userQuestionProgress.findUnique({
      where: { userId_questionId: { userId, questionId } },
    });

    const attempts = (existingProgress?.attempts || 0) + 1;
    const correctAttempts = (existingProgress?.correctAttempts || 0) + (isCorrect ? 1 : 0);
    const incorrectAttempts = (existingProgress?.incorrectAttempts || 0) + (isCorrect ? 0 : 1);

    const sm2 = calculateSuperMemo2({
      quality: isCorrect ? Math.min(5, confidenceLevel + 1) : 1,
      easinessFactor: existingProgress?.easinessFactor || 2.5,
      intervalDays: existingProgress?.intervalDays || 0,
      repetitions: correctAttempts,
    });

    await prisma.userQuestionProgress.upsert({
      where: { userId_questionId: { userId, questionId } },
      create: {
        userId,
        questionId,
        questionBankId: session.questionBankId,
        attempts: 1,
        correctAttempts: isCorrect ? 1 : 0,
        incorrectAttempts: isCorrect ? 0 : 1,
        lastAnswerCorrect: isCorrect,
        confidenceLevel,
        masteryStatus: sm2.masteryStatus,
        easinessFactor: sm2.easinessFactor,
        intervalDays: sm2.intervalDays,
        nextReviewAt: sm2.nextReviewAt,
        lastReviewedAt: new Date(),
      },
      update: {
        attempts,
        correctAttempts,
        incorrectAttempts,
        lastAnswerCorrect: isCorrect,
        confidenceLevel,
        masteryStatus: sm2.masteryStatus,
        easinessFactor: sm2.easinessFactor,
        intervalDays: sm2.intervalDays,
        nextReviewAt: sm2.nextReviewAt,
        lastReviewedAt: new Date(),
      },
    });

    // Record Real Daily Study Activity
    const todayStr = new Date().toISOString().split('T')[0];
    await prisma.dailyStudyActivity.upsert({
      where: {
        userId_questionBankId_activityDate: {
          userId,
          questionBankId: session.questionBankId,
          activityDate: todayStr,
        },
      },
      create: {
        userId,
        questionBankId: session.questionBankId,
        activityDate: todayStr,
        answeredQuestions: 1,
        correctAnswers: isCorrect ? 1 : 0,
        incorrectAnswers: isCorrect ? 0 : 1,
      },
      update: {
        answeredQuestions: { increment: 1 },
        correctAnswers: { increment: isCorrect ? 1 : 0 },
        incorrectAnswers: { increment: isCorrect ? 0 : 1 },
      },
    });

    return NextResponse.json({
      answerId: answer.id,
      isCorrect,
      correctOptionIds,
      explanation: question.explanationText,
      sm2,
    });
  } catch (error) {
    console.error('Submit practice answer error:', error);
    return NextResponse.json({ error: 'Lỗi ghi nhận đáp án' }, { status: 500 });
  }
}
