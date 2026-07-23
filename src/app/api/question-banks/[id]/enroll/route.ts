import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    const { id: questionBankId } = await params;

    const bank = await prisma.questionBank.findUnique({ where: { id: questionBankId } });
    if (!bank) {
      return NextResponse.json({ error: 'Không tìm thấy bộ câu hỏi' }, { status: 404 });
    }

    // Create or update enrollment
    const enrollment = await prisma.userQuestionBankEnrollment.upsert({
      where: {
        userId_questionBankId: {
          userId: authUser.userId,
          questionBankId,
        },
      },
      create: {
        userId: authUser.userId,
        questionBankId,
        status: 'ACTIVE',
        enrolledAt: new Date(),
      },
      update: {
        status: 'ACTIVE',
        lastStudiedAt: new Date(),
      },
    });

    // Set as user's active question bank
    await prisma.user.update({
      where: { id: authUser.userId },
      data: { activeQuestionBankId: questionBankId },
    });

    return NextResponse.json({
      success: true,
      enrollment,
      activeQuestionBankId: questionBankId,
      message: `Đã đăng ký học thành công: ${bank.name}`,
    });
  } catch (error) {
    console.error('Enroll error:', error);
    return NextResponse.json({ error: 'Lỗi đăng ký bộ câu hỏi' }, { status: 500 });
  }
}
