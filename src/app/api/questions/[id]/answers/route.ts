import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const { id: questionId } = await params;
    const userId = authUser.userId;

    const body = await req.json();
    const { selectedOptionIds, confidenceLevel, sessionId } = body as {
      selectedOptionIds: string[];
      confidenceLevel?: number;
      sessionId?: string;
    };

    if (!selectedOptionIds || selectedOptionIds.length === 0) {
      return NextResponse.json({ error: 'Cần chọn ít nhất một đáp án' }, { status: 400 });
    }

    // Fetch the question with options
    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { options: true },
    });

    if (!question) {
      return NextResponse.json({ error: 'Không tìm thấy câu hỏi' }, { status: 404 });
    }

    const correctOptionIds = question.options
      .filter((o) => o.isCorrect)
      .map((o) => o.id);

    const isCorrect =
      correctOptionIds.length === selectedOptionIds.length &&
      correctOptionIds.every((id) => selectedOptionIds.includes(id));

    // Upsert user question progress (SRS)
    const existing = await prisma.userQuestionProgress.findUnique({
      where: { userId_questionId: { userId, questionId } },
    });

    let easinessFactor = existing?.easinessFactor ?? 2.5;
    let intervalDays = existing?.intervalDays ?? 0;
    const level = confidenceLevel ?? (isCorrect ? 3 : 1);

    // Simple SM-2 variant
    if (isCorrect && level >= 3) {
      if (intervalDays === 0) intervalDays = 1;
      else if (intervalDays === 1) intervalDays = 6;
      else intervalDays = Math.round(intervalDays * easinessFactor);
      easinessFactor = Math.max(1.3, easinessFactor + 0.1 - (5 - level) * 0.08);
    } else {
      intervalDays = 1;
      easinessFactor = Math.max(1.3, easinessFactor - 0.2);
    }

    const nextReviewAt = new Date();
    nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);

    const masteryStatus =
      intervalDays >= 21 ? 'MASTERED' : intervalDays >= 7 ? 'REVIEWING' : 'LEARNING';

    await prisma.userQuestionProgress.upsert({
      where: { userId_questionId: { userId, questionId } },
      update: {
        attempts: { increment: 1 },
        correctAttempts: isCorrect ? { increment: 1 } : undefined,
        incorrectAttempts: !isCorrect ? { increment: 1 } : undefined,
        lastAnswerCorrect: isCorrect,
        confidenceLevel: level,
        masteryStatus,
        easinessFactor,
        intervalDays,
        nextReviewAt,
        lastReviewedAt: new Date(),
      },
      create: {
        userId,
        questionId,
        questionBankId: question.questionBankId,
        attempts: 1,
        correctAttempts: isCorrect ? 1 : 0,
        incorrectAttempts: isCorrect ? 0 : 1,
        lastAnswerCorrect: isCorrect,
        confidenceLevel: level,
        masteryStatus,
        easinessFactor,
        intervalDays,
        nextReviewAt,
        lastReviewedAt: new Date(),
      },
    });

    // Record in PracticeAnswer if sessionId provided
    if (sessionId) {
      // Check session belongs to user
      const session = await prisma.practiceSession.findFirst({
        where: { id: sessionId, userId },
      });
      if (session) {
        await prisma.practiceAnswer.upsert({
          where: {
            // Composite uniqueness not defined, use findFirst + create logic
            id: (
              await prisma.practiceAnswer.findFirst({
                where: { sessionId, questionId },
                select: { id: true },
              })
            )?.id ?? 'nonexistent-id-will-create',
          },
          update: {
            selectedOptionIds: JSON.stringify(selectedOptionIds),
            isCorrect,
            confidenceLevel: level,
          },
          create: {
            sessionId,
            questionId,
            selectedOptionIds: JSON.stringify(selectedOptionIds),
            isCorrect,
            confidenceLevel: level,
          },
        });
      }
    }

    // Update daily study activity
    const today = new Date().toISOString().split('T')[0];
    await prisma.dailyStudyActivity.upsert({
      where: {
        userId_questionBankId_activityDate: {
          userId,
          questionBankId: question.questionBankId,
          activityDate: today,
        },
      },
      update: {
        answeredQuestions: { increment: 1 },
        correctAnswers: isCorrect ? { increment: 1 } : undefined,
        incorrectAnswers: !isCorrect ? { increment: 1 } : undefined,
      },
      create: {
        userId,
        questionBankId: question.questionBankId,
        activityDate: today,
        answeredQuestions: 1,
        correctAnswers: isCorrect ? 1 : 0,
        incorrectAnswers: isCorrect ? 0 : 1,
      },
    });

    return NextResponse.json({
      isCorrect,
      correctOptionIds,
      explanation: question.explanationText,
      nextReviewAt,
      intervalDays,
    });
  } catch (error) {
    console.error('Submit answer error:', error);
    return NextResponse.json({ error: 'Lỗi nộp câu trả lời' }, { status: 500 });
  }
}
