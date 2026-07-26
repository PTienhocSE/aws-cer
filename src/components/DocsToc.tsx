'use client';

import { useEffect, useState } from 'react';
import { List, Bookmark, PanelRightClose, PanelRightOpen } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface DocsTocProps {
  toc: TocItem[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  theme?: 'light' | 'dark';
}

export default function DocsToc({
  toc,
  isCollapsed = false,
  onToggleCollapse,
  theme = 'light',
}: DocsTocProps) {
  const [activeId, setActiveId] = useState<string>('');
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!toc || toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    toc.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const handleScrollTo = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!toc || toc.length === 0) {
    return null;
  }

  // If collapsed view (desktop compact bar)
  if (isCollapsed) {
    return (
      <div
        onClick={onToggleCollapse}
        className={`w-12 border rounded-2xl shadow-sm py-4 px-2 flex flex-col items-center justify-between h-full cursor-pointer group transition-all ${
          isDark
            ? 'bg-[#131c2e] border-slate-800 hover:border-indigo-400'
            : 'bg-white border-slate-200/90 hover:border-indigo-400'
        }`}
        title="Mở mục lục bài đọc"
      >
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollapse?.();
            }}
            className={`p-1.5 rounded-xl transition ${
              isDark
                ? 'bg-indigo-500/20 text-indigo-300 group-hover:bg-indigo-500/30'
                : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
            }`}
          >
            <PanelRightOpen className="w-5 h-5" />
          </button>

          <div
            className={`writing-mode-vertical text-[11px] font-black uppercase tracking-widest transition py-4 ${
              isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-800'
            }`}
          >
            Mục lục bài
          </div>
        </div>

        <List className="w-4 h-4 text-indigo-500" />
      </div>
    );
  }

  return (
    <div
      className={`w-full border rounded-2xl shadow-sm p-4 space-y-3 flex flex-col h-full overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-[#131c2e] border-slate-800 text-slate-200' : 'bg-white border-slate-200/90 text-slate-800'
      }`}
    >
      <div
        className={`flex items-center justify-between border-b pb-2.5 shrink-0 ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center space-x-2">
          <List className="w-4 h-4 text-amber-500 shrink-0" />
          <span className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            Mục lục
          </span>
        </div>

        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            title="Thu gọn mục lục"
            className={`p-1 rounded-lg transition ${
              isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <PanelRightClose className="w-4 h-4" />
          </button>
        )}
      </div>

      <nav className="flex-1 min-h-0 space-y-1 overflow-y-auto no-scrollbar pr-1 text-xs">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          const levelIndent =
            item.level === 1
              ? `pl-0 font-extrabold ${isDark ? 'text-slate-100' : 'text-slate-900'}`
              : item.level === 2
              ? `pl-1.5 font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`
              : item.level === 3
              ? `pl-4 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`
              : `pl-6 font-normal ${isDark ? 'text-slate-500' : 'text-slate-500'}`;

          return (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              className={`w-full text-left py-1 px-2 rounded-lg transition-all block ${levelIndent} ${
                isActive
                  ? isDark
                    ? 'bg-amber-500/20 text-amber-300 border-l-2 border-amber-400 font-extrabold'
                    : 'bg-amber-50 text-amber-900 border-l-2 border-amber-500 font-extrabold'
                  : isDark
                  ? 'hover:bg-slate-800/60 hover:text-slate-100'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
              title={item.text}
            >
              <div className="flex items-center space-x-1 min-w-0">
                {item.level <= 2 && <Bookmark className="w-3 h-3 text-amber-500 inline shrink-0 mr-1" />}
                <span className="truncate leading-snug block">{item.text}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
