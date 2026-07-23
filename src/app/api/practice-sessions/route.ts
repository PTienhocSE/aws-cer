import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    if (!authUser) return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    const userId = authUser.userId;
    const bankId = authUser.activeQuestionBankId;
    if (!bankId) {
      return NextResponse.json({ error: 'Chưa chọn ngân hàng câu hỏi' }, { status: 400 });
    }
    const body = await req.json();
    const { mode = 'CUSTOM', domainId, limit = 15 } = body;

    const session = await prisma.practiceSession.create({
      data: {
        userId,
        questionBankId: bankId,
        mode,
        title: `Phiên luyện tập ${mode}`,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      questionBankId: bankId,
      message: 'Khởi tạo phiên học thành công',
    });
  } catch (error) {
    console.error('Create practice session error:', error);
    return NextResponse.json({ error: 'Lỗi tạo phiên luyện tập' }, { status: 500 });
  }
}
