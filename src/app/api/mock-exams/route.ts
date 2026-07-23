import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    const userId = authUser.userId;
    const activeBankId = authUser.activeQuestionBankId;
    const body = await req.json();
    const { totalQuestions = 65, timeLimitMinutes = 130 } = body;

    const questions = await prisma.question.findMany({
      where: { questionBankId: activeBankId },
      take: totalQuestions,
    });

    if (questions.length === 0) {
      return NextResponse.json({ error: 'Không tìm thấy câu hỏi cho kỳ thi' }, { status: 400 });
    }

    const examAttempt = await prisma.mockExamAttempt.create({
      data: {
        userId,
        questionBankId: activeBankId,
        totalQuestions: questions.length,
        timeLimitMinutes,
        startedAt: new Date(),
        answers: {
          create: questions.map((q) => ({
            questionId: q.id,
            selectedOptionIds: '[]',
          })),
        },
      },
    });

    return NextResponse.json({
      examAttemptId: examAttempt.id,
      message: 'Khởi tạo bài thi thành công',
    });
  } catch (error) {
    console.error('Create mock exam error:', error);
    return NextResponse.json({ error: 'Lỗi tạo bài thi thử' }, { status: 500 });
  }
}
