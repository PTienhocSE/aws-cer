import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

async function handleUnenroll(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const { id: questionBankId } = await params;

    const bank = await prisma.questionBank.findUnique({ where: { id: questionBankId } });
    if (!bank) {
      return NextResponse.json({ error: 'Không tìm thấy bộ câu hỏi' }, { status: 404 });
    }

    // Delete enrollment record
    await prisma.userQuestionBankEnrollment.deleteMany({
      where: {
        userId: authUser.userId,
        questionBankId,
      },
    });

    // If this bank was active, reassign activeQuestionBankId
    const user = await prisma.user.findUnique({
      where: { id: authUser.userId },
      select: { activeQuestionBankId: true },
    });

    let newActiveId = user?.activeQuestionBankId;

    if (user?.activeQuestionBankId === questionBankId) {
      const nextEnrolled = await prisma.userQuestionBankEnrollment.findFirst({
        where: { userId: authUser.userId },
        orderBy: { enrolledAt: 'desc' },
      });

      if (nextEnrolled) {
        newActiveId = nextEnrolled.questionBankId;
      } else {
        const defaultBank = await prisma.questionBank.findFirst({
          where: { status: 'PUBLISHED' },
          orderBy: { createdAt: 'desc' },
        });
        newActiveId = defaultBank?.id || null;
      }

      await prisma.user.update({
        where: { id: authUser.userId },
        data: { activeQuestionBankId: newActiveId },
      });
    }

    return NextResponse.json({
      success: true,
      activeQuestionBankId: newActiveId,
      message: `Đã hủy đăng ký thành công: ${bank.name}`,
    });
  } catch (error) {
    console.error('Unenroll error:', error);
    return NextResponse.json({ error: 'Lỗi hủy đăng ký bộ câu hỏi' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handleUnenroll(req, context);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  return handleUnenroll(req, context);
}
