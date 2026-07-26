import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ domainId: string }> }
) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }
    const bankId = authUser.activeQuestionBankId;
    if (!bankId) {
      return NextResponse.json({ error: 'Chưa chọn ngân hàng câu hỏi' }, { status: 400 });
    }
    const { domainId } = await params;
    const domain = await prisma.domain.findFirst({
      where: { id: domainId, questionBankId: bankId },
      select: { id: true },
    });
    if (!domain) {
      return NextResponse.json({ error: 'Không tìm thấy Domain' }, { status: 404 });
    }

    const sessions = await prisma.practiceSession.findMany({
      where: {
        userId: authUser.userId,
        questionBankId: bankId,
        mode: 'DOMAIN',
        sourceId: domainId,
      },
      select: { id: true },
    });
    const sessionIds = sessions.map((session) => session.id);
    if (sessionIds.length > 0) {
      await prisma.$transaction([
        prisma.practiceAnswer.deleteMany({ where: { sessionId: { in: sessionIds } } }),
        prisma.practiceSession.updateMany({
          where: { id: { in: sessionIds } },
          data: { isCompleted: false },
        }),
      ]);
    }

    return NextResponse.json({
      ok: true,
      resetSessions: sessionIds.length,
      message: 'Đã reset tiến độ luyện tập Domain. Lịch sử SRS tổng thể vẫn được giữ lại.',
    });
  } catch (error) {
    console.error('Reset domain practice error:', error);
    return NextResponse.json({ error: 'Lỗi reset tiến độ Domain' }, { status: 500 });
  }
}
