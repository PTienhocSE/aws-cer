import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';
import { shuffleAndTake } from '@/lib/practice-selection';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;

    const body = await req.json();
    const {
      questionBankId,
      domainId,
      totalQuestions = 65,
      timeLimitMinutes = 130,
    } = body;

    // Determine target bank
    let bankId = questionBankId || authUser.activeQuestionBankId;
    if (!bankId) {
      const defaultBank = await prisma.questionBank.findFirst({
        where: { status: 'PUBLISHED' },
        orderBy: { createdAt: 'desc' },
      });
      bankId = defaultBank?.id;
    }

    if (!bankId) {
      return NextResponse.json({ error: 'Chưa chọn ngân hàng câu hỏi' }, { status: 400 });
    }

    const whereClause: any = { questionBankId: bankId };
    if (domainId) {
      whereClause.domainId = domainId;
    }

    const candidateQuestions = await prisma.question.findMany({
      where: whereClause,
      select: { id: true },
    });

    if (candidateQuestions.length === 0) {
      return NextResponse.json(
        { error: 'Không tìm thấy câu hỏi cho bộ đề đã chọn' },
        { status: 400 }
      );
    }

    // Shuffle and pick desired quantity
    const targetCount = Math.min(candidateQuestions.length, Number(totalQuestions) || 65);
    const selectedQuestions = shuffleAndTake(candidateQuestions, targetCount);

    const examAttempt = await prisma.mockExamAttempt.create({
      data: {
        userId,
        questionBankId: bankId,
        totalQuestions: selectedQuestions.length,
        timeLimitMinutes: Number(timeLimitMinutes) || 130,
        startedAt: new Date(),
        answers: {
          create: selectedQuestions.map((q) => ({
            questionId: q.id,
            selectedOptionIds: '[]',
          })),
        },
      },
    });

    return NextResponse.json({
      examAttemptId: examAttempt.id,
      totalQuestions: selectedQuestions.length,
      message: 'Khởi tạo bài thi thành công',
    });
  } catch (error) {
    console.error('Create mock exam error:', error);
    return NextResponse.json({ error: 'Lỗi tạo bài thi thử' }, { status: 500 });
  }
}
