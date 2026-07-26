'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DOC_TREE, DocCategory } from '@/lib/docsData';
import {
  ChevronDown,
  ChevronRight,
  Search,
  FileText,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

interface DocsSidebarProps {
  onSelectDoc?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  theme?: 'light' | 'dark';
}

export default function DocsSidebar({
  onSelectDoc,
  isCollapsed = false,
  onToggleCollapse,
  theme = 'light',
}: DocsSidebarProps) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const isDark = theme === 'dark';

  // Track open state for categories. Default all open
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    intro: true,
    services: true,
    architecture: true,
    'exam-prep': true,
  });

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredTree: DocCategory[] = DOC_TREE.map((cat) => {
    if (!searchTerm.trim()) return cat;
    const filteredItems = cat.items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return { ...cat, items: filteredItems };
  }).filter((cat) => cat.items.length > 0);

  // If collapsed view (desktop compact bar)
  if (isCollapsed) {
    return (
      <div
        onClick={onToggleCollapse}
        className={`w-12 border rounded-2xl shadow-sm py-4 px-2 flex flex-col items-center justify-between h-full cursor-pointer group transition-all ${
          isDark
            ? 'bg-[#131c2e] border-slate-800 hover:border-amber-500'
            : 'bg-white border-slate-200/90 hover:border-amber-400'
        }`}
        title="Mở sơ đồ tài liệu"
      >
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCollapse?.();
            }}
            className={`p-1.5 rounded-xl transition ${
              isDark
                ? 'bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/30'
                : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'
            }`}
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>

          <div
            className={`writing-mode-vertical text-[11px] font-black uppercase tracking-widest transition py-4 ${
              isDark ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-800'
            }`}
          >
            Sơ đồ tài liệu
          </div>
        </div>

        <div
          className={`p-1.5 rounded-full text-[10px] font-extrabold ${
            isDark ? 'bg-slate-900 text-slate-300' : 'bg-slate-100 text-slate-500'
          }`}
        >
          30
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full border rounded-2xl shadow-sm p-3.5 space-y-3 flex flex-col h-full overflow-hidden transition-colors duration-200 ${
        isDark ? 'bg-[#131c2e] border-slate-800 text-slate-200' : 'bg-white border-slate-200/90 text-slate-800'
      }`}
    >
      {/* Sidebar Header & Search */}
      <div className="space-y-2 shrink-0">
        <div className="flex items-center justify-between px-1.5 pt-1">
          <span
            className={`text-xs font-black uppercase tracking-wider flex items-center ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 mr-1.5 text-amber-500" />
            Tài liệu SAA-C03
          </span>

          <div className="flex items-center space-x-1">
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
                  : 'bg-amber-100 text-amber-900 border-amber-200'
              }`}
            >
              30 Bài
            </span>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                title="Thu gọn sơ đồ tài liệu"
                className={`p-1 rounded-lg transition ml-1 ${
                  isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm tài liệu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full border rounded-xl pl-8 pr-3 py-1.5 text-xs font-medium focus:outline-none focus:border-amber-400 transition ${
              isDark
                ? 'bg-[#090d16] border-slate-800 text-slate-200 placeholder-slate-500 focus:ring-1 focus:ring-amber-500/30'
                : 'bg-slate-50 border-slate-200 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-amber-100'
            }`}
          />
        </div>
      </div>

      {/* Navigation Tree */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar space-y-2.5 pr-1 text-xs">
        {filteredTree.map((category) => {
          const isOpen = searchTerm ? true : openCategories[category.id] !== false;

          return (
            <div key={category.id} className="space-y-1">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg font-extrabold transition group ${
                  isDark ? 'text-slate-200 hover:bg-slate-800/60' : 'text-slate-800 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center space-x-1.5 font-bold">
                  <span>{category.title}</span>
                </div>
                <div className="text-slate-400 group-hover:text-slate-300 transition">
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </div>
              </button>

              {/* Category Items */}
              {isOpen && (
                <div
                  className={`pl-2 space-y-0.5 border-l ml-2 ${
                    isDark ? 'border-slate-800' : 'border-slate-200/80'
                  }`}
                >
                  {category.items.map((item) => {
                    const isActive =
                      pathname === `/docs/${item.slug}` ||
                      (pathname === '/docs' && item.slug === '01-compute-services');

                    return (
                      <Link
                        key={item.slug}
                        href={`/docs/${item.slug}`}
                        onClick={onSelectDoc}
                        className={`group relative flex items-center px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isActive
                            ? isDark
                              ? 'bg-amber-500/20 text-amber-300 font-bold border-l-4 border-amber-400'
                              : 'bg-slate-900 text-amber-400 font-bold shadow-xs border-l-4 border-amber-400'
                            : isDark
                            ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredTree.length === 0 && (
          <div className="text-center py-6 text-slate-400 text-xs font-medium">
            Không tìm thấy bài học nào phù hợp
          </div>
        )}
      </div>
    </div>
  );
}
