'use client';

import React from 'react';

interface Props {
  content: string;
  /** 'dark' = trên nền slate-900 (practice page), 'light' = trên nền trắng (modal) */
  theme?: 'dark' | 'light';
}

const formatInline = (str: string, isDark: boolean) => {
  let formatted = str;
  const boldClass = isDark ? 'font-extrabold text-white' : 'font-extrabold text-slate-900';
  const emClass = isDark ? 'font-semibold text-amber-300 not-italic' : 'font-semibold text-amber-700 not-italic';
  const codeClass = isDark
    ? 'bg-slate-700 text-amber-300 font-mono text-[11px] px-1.5 py-0.5 rounded border border-slate-600'
    : 'bg-slate-100 text-slate-900 font-mono text-[11px] px-1.5 py-0.5 rounded border border-slate-200';

  // Bold: **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, `<strong class="${boldClass}">$1</strong>`);
  // Italics: *text*
  formatted = formatted.replace(/\*(.*?)\*/g, `<em class="${emClass}">$1</em>`);
  // Inline code: `code`
  formatted = formatted.replace(/`(.*?)`/g, `<code class="${codeClass}">$1</code>`);
  return formatted;
};

export default function MarkdownExplanation({ content, theme = 'dark' }: Props) {
  if (!content) return null;

  const isDark = theme === 'dark';
  const textClass = isDark ? 'text-slate-200' : 'text-slate-700';
  const bulletClass = isDark ? 'text-amber-400' : 'text-amber-600';
  const headingClass = isDark
    ? 'text-amber-300 font-extrabold text-xs uppercase tracking-wider mt-3 mb-1'
    : 'text-slate-800 font-extrabold text-xs uppercase tracking-wider mt-3 mb-1';

  // Clean the content: strip ### headings, collapse blank lines
  const cleaned = content
    .replace(/^###\s+.+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const lines = cleaned.split('\n');

  return (
    <div className="space-y-1">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-2" />;

        if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const itemContent = trimmed.replace(/^[-•]\s+/, '');
          return (
            <div key={idx} className="flex items-start space-x-2">
              <span className={`${bulletClass} font-bold mt-0.5 shrink-0`}>•</span>
              <span
                className={`text-sm ${textClass} leading-relaxed`}
                dangerouslySetInnerHTML={{ __html: formatInline(itemContent, isDark) }}
              />
            </div>
          );
        }

        return (
          <p
            key={idx}
            className={`text-sm ${textClass} leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: formatInline(trimmed, isDark) }}
          />
        );
      })}
    </div>
  );
}
