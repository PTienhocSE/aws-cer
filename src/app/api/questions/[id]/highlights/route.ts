import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthUserOrDemo } from '@/lib/auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    const { id: questionId } = await params;
    const body = await req.json();
    const {
      selectedText,
      targetType = 'QUESTION',
      targetId,
      startOffset = 0,
      endOffset = 0,
      color = 'YELLOW',
      contextBefore,
      contextAfter,
    } = body;

    if (!selectedText) {
      return NextResponse.json({ error: 'Thiếu văn bản bôi đen' }, { status: 400 });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      select: { questionBankId: true },
    });

    if (!question) {
      return NextResponse.json({ error: 'Không tìm thấy câu hỏi' }, { status: 404 });
    }

    const highlight = await prisma.questionHighlight.create({
      data: {
        userId: authUser.userId,
        questionId,
        questionBankId: question.questionBankId,
        targetType,
        targetId,
        selectedText,
        startOffset,
        endOffset,
        color,
        contextBefore,
        contextAfter,
      },
    });

    return NextResponse.json({ highlight, message: 'Đã lưu highlight' });
  } catch (error) {
    console.error('Save highlight error:', error);
    return NextResponse.json({ error: 'Lỗi lưu highlight' }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getAuthUserOrDemo(req);
    const { id: questionId } = await params;

    const highlights = await prisma.questionHighlight.findMany({
      where: {
        userId: authUser.userId,
        questionId,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ highlights });
  } catch (error) {
    console.error('Get highlights error:', error);
    return NextResponse.json({ error: 'Lỗi tải highlights' }, { status: 500 });
  }
}
