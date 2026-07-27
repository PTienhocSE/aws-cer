import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    const { searchParams } = new URL(req.url);
    const docSlug = searchParams.get('docSlug');

    if (!docSlug) {
      return NextResponse.json({ error: 'docSlug is required' }, { status: 400 });
    }

    if (!authUser) {
      return NextResponse.json({ annotations: [] });
    }

    const userId = authUser.userId;

    let annotations: any[] = [];
    if (typeof (prisma as any).docAnnotation !== 'undefined') {
      annotations = await (prisma as any).docAnnotation.findMany({
        where: { userId, docSlug },
        orderBy: { createdAt: 'asc' },
      });
    } else {
      // Fallback for raw SQL query on Neon PostgreSQL
      annotations = await prisma.$queryRawUnsafe(
        `SELECT id, "userId", "docSlug", type, "selectedText", "startOffset", "endOffset", "contextBefore", "contextAfter", "noteContent", color, "createdAt" FROM "DocAnnotation" WHERE "userId" = $1 AND "docSlug" = $2 ORDER BY "createdAt" ASC`,
        userId,
        docSlug
      );
    }

    return NextResponse.json({ annotations });
  } catch (error: any) {
    console.error('Error fetching doc annotations:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Bạn cần đăng nhập để lưu ghi chú' }, { status: 401 });
    }

    const body = await req.json();
    const {
      docSlug, type, selectedText, startOffset, endOffset,
      contextBefore, contextAfter, noteContent, color,
    } = body;

    if (!docSlug || !selectedText) {
      return NextResponse.json({ error: 'docSlug and selectedText are required' }, { status: 400 });
    }

    const userId = authUser.userId;
    const id = crypto.randomUUID();
    const now = new Date();
    const annType = type || 'HIGHLIGHT';
    const annColor = color || (annType === 'NOTE' ? 'INDIGO' : 'AMBER');
    const cleanText = String(selectedText).trim();
    const cleanNote = noteContent ? String(noteContent).trim() : null;
    const cleanStartOffset = Number.isInteger(startOffset) && startOffset >= 0 ? startOffset : null;
    const cleanEndOffset =
      Number.isInteger(endOffset) && cleanStartOffset !== null && endOffset > cleanStartOffset
        ? endOffset
        : null;
    const cleanContextBefore = contextBefore ? String(contextBefore).slice(-160) : null;
    const cleanContextAfter = contextAfter ? String(contextAfter).slice(0, 160) : null;

    let annotation: any = null;

    if (typeof (prisma as any).docAnnotation !== 'undefined') {
      annotation = await (prisma as any).docAnnotation.create({
        data: {
          id,
          userId,
          docSlug,
          type: annType,
          selectedText: cleanText,
          startOffset: cleanStartOffset,
          endOffset: cleanEndOffset,
          contextBefore: cleanContextBefore,
          contextAfter: cleanContextAfter,
          noteContent: cleanNote,
          color: annColor,
        },
      });
    } else {
      // Fallback using raw SQL insert on Neon PostgreSQL
      await prisma.$executeRawUnsafe(
        `INSERT INTO "DocAnnotation" ("id", "userId", "docSlug", "type", "selectedText", "startOffset", "endOffset", "contextBefore", "contextAfter", "noteContent", "color", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        id,
        userId,
        docSlug,
        annType,
        cleanText,
        cleanStartOffset,
        cleanEndOffset,
        cleanContextBefore,
        cleanContextAfter,
        cleanNote,
        annColor,
        now,
        now
      );

      annotation = {
        id,
        userId,
        docSlug,
        type: annType,
        selectedText: cleanText,
        startOffset: cleanStartOffset,
        endOffset: cleanEndOffset,
        contextBefore: cleanContextBefore,
        contextAfter: cleanContextAfter,
        noteContent: cleanNote,
        color: annColor,
        createdAt: now.toISOString(),
      };
    }

    return NextResponse.json({ annotation });
  } catch (error: any) {
    console.error('Error saving doc annotation:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authUser = await getAuthenticatedUser(req);
    if (!authUser) {
      return NextResponse.json({ error: 'Bạn cần đăng nhập để xóa ghi chú' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 });
    }

    const userId = authUser.userId;

    if (typeof (prisma as any).docAnnotation !== 'undefined') {
      await (prisma as any).docAnnotation.deleteMany({
        where: { id, userId },
      });
    } else {
      // Fallback using raw SQL delete on Neon PostgreSQL
      await prisma.$executeRawUnsafe(
        `DELETE FROM "DocAnnotation" WHERE "id" = $1 AND "userId" = $2`,
        id,
        userId
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting doc annotation:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
