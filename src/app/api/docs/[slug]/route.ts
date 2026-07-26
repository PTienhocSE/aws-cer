import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Marked, Tokens } from 'marked';
import { getDocBySlug } from '@/lib/docsData';

function stripMarkdown(str: string): string {
  return str
    .replace(/<[^>]*>/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .trim();
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { docItem, prevDoc, nextDoc } = getDocBySlug(slug);

    if (!docItem) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'docs', docItem.filename);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File does not exist on disk' }, { status: 404 });
    }

    const rawMarkdown = fs.readFileSync(filePath, 'utf-8');

    // Extract TOC items and assign unique IDs to headings
    const toc: { id: string; text: string; level: number }[] = [];
    let headingCounter = 0;

    const markedInstance = new Marked();
    markedInstance.use({
      renderer: {
        heading(token: Tokens.Heading) {
          const depth = token.depth;
          const rawText = token.text;
          const cleanText = stripMarkdown(rawText);
          headingCounter++;

          const slugId = cleanText
            .toLowerCase()
            .replace(/[^\w\u00C0-\u024F\u1E00-\u1EFF]+/g, '-')
            .replace(/^-+|-+$/g, '');
          const id = slugId ? `doc-h-${headingCounter}-${slugId}` : `doc-h-${headingCounter}`;

          if (depth <= 4) {
            toc.push({ id, text: cleanText, level: depth });
          }

          const inlineContent = this.parser.parseInline(token.tokens);
          return `<h${depth} id="${id}" class="doc-heading doc-h${depth}">${inlineContent}</h${depth}>`;
        },
      },
    });

    const html = await markedInstance.parse(rawMarkdown);

    return NextResponse.json({
      slug: docItem.slug,
      title: docItem.title,
      categoryTitle: docItem.categoryTitle,
      filename: docItem.filename,
      rawMarkdown,
      html,
      toc,
      prevDoc,
      nextDoc,
    });
  } catch (error: any) {
    console.error('Error serving doc:', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
