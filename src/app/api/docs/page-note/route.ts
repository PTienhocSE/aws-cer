import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

const DOCUMENT_NOTE_TYPE = 'DOCUMENT_NOTE';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Bạn cần đăng nhập' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const docSlug = searchParams.get('docSlug');
    const search = searchParams.get('search')?.trim();

    if (docSlug) {
      const note = await prisma.docAnnotation.findFirst({
        where: { userId: authUser.userId, docSlug, type: DOCUMENT_NOTE_TYPE },
      });
      return NextResponse.json({ note });
    }

    const notes = await prisma.docAnnotation.findMany({
      where: {
        userId: authUser.userId,
        type: DOCUMENT_NOTE_TYPE,
        ...(search
          ? {
              OR: [
                { noteContent: { contains: search, mode: 'insensitive' } },
                { selectedText: { contains: search, mode: 'insensitive' } },
                { docSlug: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: { updatedAt: 'desc' },
    });
    return NextResponse.json({ notes });
  } catch (error) {
    console.error('Document note GET error:', error);
    return NextResponse.json({ error: 'Lỗi tải ghi chú tài liệu' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Bạn cần đăng nhập để lưu ghi chú' }, { status: 401 });
    }

    const body = await req.json();
    const docSlug = typeof body.docSlug === 'string' ? body.docSlug.trim() : '';
    const docTitle = typeof body.docTitle === 'string' ? body.docTitle.trim() : docSlug;
    const noteContent =
      typeof body.noteContent === 'string' ? body.noteContent.trim().slice(0, 50000) : '';

    if (!docSlug) {
      return NextResponse.json({ error: 'docSlug is required' }, { status: 400 });
    }

    const existing = await prisma.docAnnotation.findFirst({
      where: { userId: authUser.userId, docSlug, type: DOCUMENT_NOTE_TYPE },
    });

    const note = existing
      ? await prisma.docAnnotation.update({
          where: { id: existing.id },
          data: { selectedText: docTitle, noteContent },
        })
      : await prisma.docAnnotation.create({
          data: {
            userId: authUser.userId,
            docSlug,
            type: DOCUMENT_NOTE_TYPE,
            selectedText: docTitle,
            noteContent,
            color: 'INDIGO',
          },
        });

    return NextResponse.json({ note });
  } catch (error) {
    console.error('Document note PUT error:', error);
    return NextResponse.json({ error: 'Lỗi lưu ghi chú tài liệu' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Bạn cần đăng nhập' }, { status: 401 });
    }

    const id = new URL(req.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    await prisma.docAnnotation.deleteMany({
      where: { id, userId: authUser.userId, type: DOCUMENT_NOTE_TYPE },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Document note DELETE error:', error);
    return NextResponse.json({ error: 'Lỗi xóa ghi chú tài liệu' }, { status: 500 });
  }
}
