'use client';

import React, { ReactNode } from 'react';

interface NoteMarkdownProps {
  content: string;
  theme?: 'light' | 'dark';
}

function renderInline(value: string, isDark: boolean): ReactNode[] {
  const pattern = /(`[^`\n]+`|\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_|\[[^\]\n]+\]\([^\s)]+\))/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > cursor) nodes.push(value.slice(cursor, match.index));
    const token = match[0];
    const key = `${match.index}-${token}`;

    if (token.startsWith('`')) {
      nodes.push(
        <code key={key} className={`rounded px-1 py-0.5 font-mono text-[11px] ${isDark ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-indigo-700'}`}>
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('**') || token.startsWith('__')) {
      nodes.push(<strong key={key} className="font-extrabold">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('[')) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = link?.[2] || '';
      nodes.push(
        /^(https?:\/\/|mailto:)/i.test(href) ? (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-400 underline underline-offset-2">
            {link?.[1]}
          </a>
        ) : <React.Fragment key={key}>{link?.[1] || token}</React.Fragment>
      );
    } else {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }
    cursor = match.index + token.length;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return nodes;
}

export default function NoteMarkdown({ content, theme = 'dark' }: NoteMarkdownProps) {
  const isDark = theme === 'dark';
  const output: ReactNode[] = [];
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const consumedTableLines = new Set<number>();
  let inCodeBlock = false;
  let codeLanguage = '';
  let codeLines: string[] = [];

  const appendCodeBlock = (key: string) => {
    output.push(
      <pre key={key} className={`my-2 overflow-x-auto whitespace-pre-wrap rounded-lg p-2.5 text-[11px] leading-relaxed ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
        {codeLanguage && <span className="mb-1 block text-[9px] uppercase text-slate-500">{codeLanguage}</span>}
        <code>{codeLines.join('\n')}</code>
      </pre>
    );
    codeLines = [];
    codeLanguage = '';
  };

  const parseTableCells = (line: string) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());

  const isTableSeparator = (line: string) => {
    const cells = parseTableCells(line);
    return cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
  };

  lines.forEach((line, index) => {
    if (consumedTableLines.has(index)) return;

    const fence = line.match(/^```([\w-]*)\s*$/);
    if (fence) {
      if (inCodeBlock) appendCodeBlock(`code-${index}`);
      else codeLanguage = fence[1];
      inCodeBlock = !inCodeBlock;
      return;
    }
    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    // GitHub-Flavored Markdown table: header row + separator row + body rows.
    if (line.includes('|') && lines[index + 1] && isTableSeparator(lines[index + 1])) {
      const headers = parseTableCells(line);
      const rows: string[][] = [];
      consumedTableLines.add(index + 1);

      let rowIndex = index + 2;
      while (rowIndex < lines.length && lines[rowIndex].trim() && lines[rowIndex].includes('|')) {
        rows.push(parseTableCells(lines[rowIndex]));
        consumedTableLines.add(rowIndex);
        rowIndex++;
      }

      output.push(
        <div key={`table-${index}`} className="my-2 max-w-full overflow-x-auto rounded-xl border border-slate-700/70">
          <table className="w-full min-w-max border-collapse text-left text-[11px]">
            <thead className={isDark ? 'bg-slate-950 text-indigo-300' : 'bg-slate-100 text-indigo-700'}>
              <tr>
                {headers.map((header, cellIndex) => (
                  <th key={cellIndex} className="border-b border-slate-700/70 px-3 py-2 font-extrabold">
                    {renderInline(header, isDark)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={isDark ? 'bg-slate-900/50' : 'bg-white'}>
              {rows.map((row, rowNumber) => (
                <tr key={rowNumber} className={isDark ? 'border-b border-slate-800 last:border-0' : 'border-b border-slate-200 last:border-0'}>
                  {headers.map((_, cellIndex) => (
                    <td key={cellIndex} className="max-w-64 whitespace-normal px-3 py-2 align-top">
                      {renderInline(row[cellIndex] || '', isDark)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      return;
    }

    if (!line.trim()) {
      output.push(<div key={index} className="h-1.5" />);
      return;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    const unordered = line.match(/^\s*[-*+]\s+(.+)$/);
    const ordered = line.match(/^\s*(\d+)\.\s+(.+)$/);
    const quote = line.match(/^\s*>\s?(.*)$/);

    if (heading) {
      output.push(<div key={index} className="mt-2 font-extrabold text-indigo-400">{renderInline(heading[2], isDark)}</div>);
    } else if (unordered || ordered) {
      output.push(
        <div key={index} className="flex items-start gap-2 pl-1">
          <span className="shrink-0 font-bold text-indigo-400">{ordered ? `${ordered[1]}.` : '•'}</span>
          <span>{renderInline((unordered?.[1] || ordered?.[2]) as string, isDark)}</span>
        </div>
      );
    } else if (quote) {
      output.push(<blockquote key={index} className="border-l-2 border-indigo-400 pl-2 italic text-slate-400">{renderInline(quote[1], isDark)}</blockquote>);
    } else {
      output.push(<p key={index}>{renderInline(line, isDark)}</p>);
    }
  });

  if (inCodeBlock && codeLines.length) appendCodeBlock('code-unclosed');

  return <div className="space-y-1 break-words text-xs font-medium leading-relaxed">{output}</div>;
}
