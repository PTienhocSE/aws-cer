'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Server,
  Box,
  HardDrive,
  Database,
  Network,
  ShieldCheck,
  Layers,
  BarChart3,
  ArrowRightLeft,
  Sliders,
  Coins,
  Brain,
  Video,
  Smartphone,
  Terminal,
  Zap,
  Search,
  Check,
  Copy,
  Bookmark,
  Sparkles,
  Table as TableIcon,
  LayoutGrid,
  Download,
  Filter,
  X,
  ChevronRight,
  ChevronLeft,
  Info,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  HelpCircle,
  FileSpreadsheet,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  CHEATSHEET_CATEGORIES,
  CheatSheetCategory,
  CheatSheetItem,
} from '@/lib/cheatSheetData';

// Map category icons to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Server,
  Box,
  HardDrive,
  Database,
  Network,
  ShieldCheck,
  Layers,
  BarChart3,
  ArrowRightLeft,
  Sliders,
  Coins,
  Brain,
  Video,
  Smartphone,
  Terminal,
  Zap,
};

// Color definitions for tabs
const COLOR_CONFIG: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    activeBg: string;
    lightBg: string;
    ring: string;
  }
> = {
  amber: {
    bg: 'bg-amber-500',
    text: 'text-amber-700',
    border: 'border-amber-300',
    activeBg: 'bg-amber-500 text-white',
    lightBg: 'bg-amber-50',
    ring: 'ring-amber-500',
  },
  blue: {
    bg: 'bg-blue-600',
    text: 'text-blue-700',
    border: 'border-blue-300',
    activeBg: 'bg-blue-600 text-white',
    lightBg: 'bg-blue-50',
    ring: 'ring-blue-500',
  },
  emerald: {
    bg: 'bg-emerald-600',
    text: 'text-emerald-700',
    border: 'border-emerald-300',
    activeBg: 'bg-emerald-600 text-white',
    lightBg: 'bg-emerald-50',
    ring: 'ring-emerald-500',
  },
  indigo: {
    bg: 'bg-indigo-600',
    text: 'text-indigo-700',
    border: 'border-indigo-300',
    activeBg: 'bg-indigo-600 text-white',
    lightBg: 'bg-indigo-50',
    ring: 'ring-indigo-500',
  },
  cyan: {
    bg: 'bg-cyan-600',
    text: 'text-cyan-700',
    border: 'border-cyan-300',
    activeBg: 'bg-cyan-600 text-white',
    lightBg: 'bg-cyan-50',
    ring: 'ring-cyan-500',
  },
  rose: {
    bg: 'bg-rose-600',
    text: 'text-rose-700',
    border: 'border-rose-300',
    activeBg: 'bg-rose-600 text-white',
    lightBg: 'bg-rose-50',
    ring: 'ring-rose-500',
  },
  violet: {
    bg: 'bg-violet-600',
    text: 'text-violet-700',
    border: 'border-violet-300',
    activeBg: 'bg-violet-600 text-white',
    lightBg: 'bg-violet-50',
    ring: 'ring-violet-500',
  },
  sky: {
    bg: 'bg-sky-600',
    text: 'text-sky-700',
    border: 'border-sky-300',
    activeBg: 'bg-sky-600 text-white',
    lightBg: 'bg-sky-50',
    ring: 'ring-sky-500',
  },
  teal: {
    bg: 'bg-teal-600',
    text: 'text-teal-700',
    border: 'border-teal-300',
    activeBg: 'bg-teal-600 text-white',
    lightBg: 'bg-teal-50',
    ring: 'ring-teal-500',
  },
  orange: {
    bg: 'bg-orange-600',
    text: 'text-orange-700',
    border: 'border-orange-300',
    activeBg: 'bg-orange-600 text-white',
    lightBg: 'bg-orange-50',
    ring: 'ring-orange-500',
  },
  yellow: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-800',
    border: 'border-yellow-300',
    activeBg: 'bg-yellow-500 text-white',
    lightBg: 'bg-yellow-50',
    ring: 'ring-yellow-500',
  },
  fuchsia: {
    bg: 'bg-fuchsia-600',
    text: 'text-fuchsia-700',
    border: 'border-fuchsia-300',
    activeBg: 'bg-fuchsia-600 text-white',
    lightBg: 'bg-fuchsia-50',
    ring: 'ring-fuchsia-500',
  },
  purple: {
    bg: 'bg-purple-600',
    text: 'text-purple-700',
    border: 'border-purple-300',
    activeBg: 'bg-purple-600 text-white',
    lightBg: 'bg-purple-50',
    ring: 'ring-purple-500',
  },
  pink: {
    bg: 'bg-pink-600',
    text: 'text-pink-700',
    border: 'border-pink-300',
    activeBg: 'bg-pink-600 text-white',
    lightBg: 'bg-pink-50',
    ring: 'ring-pink-500',
  },
  slate: {
    bg: 'bg-slate-700',
    text: 'text-slate-700',
    border: 'border-slate-300',
    activeBg: 'bg-slate-800 text-white',
    lightBg: 'bg-slate-100',
    ring: 'ring-slate-500',
  },
};

export default function CheatSheetClient() {
  const [activeTab, setActiveTab] = useState<string>('compute');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [filterMode, setFilterMode] = useState<'all' | 'bookmarks' | 'quickpick'>('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Load bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('saa_cheatsheet_bookmarks');
      if (saved) {
        setBookmarkedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save bookmarks
  const toggleBookmark = (id: string, name: string) => {
    let next: string[];
    if (bookmarkedIds.includes(id)) {
      next = bookmarkedIds.filter((item) => item !== id);
      toast.success(`Đã bỏ lưu "${name}"`);
    } else {
      next = [...bookmarkedIds, id];
      toast.success(`Đã lưu "${name}" vào danh sách ôn tập ⭐`);
    }
    setBookmarkedIds(next);
    try {
      localStorage.setItem('saa_cheatsheet_bookmarks', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  // Copy item content
  const handleCopyItem = (item: CheatSheetItem) => {
    const text = `=== ${item.name} (${item.categoryTitle}) ===\n[Mục đích]: ${item.purpose}\n\n[Kịch bản đề thi]:\n${item.scenario}\n\n[Ghi chú & Mẹo SAA]:\n${item.note}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    toast.success(`Đã sao chép thông tin ${item.name}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Active category object
  const activeCategory = useMemo(() => {
    if (activeTab === 'all') return null;
    return CHEATSHEET_CATEGORIES.find((c) => c.id === activeTab) || CHEATSHEET_CATEGORIES[0];
  }, [activeTab]);

  // Filter items
  const filteredItems = useMemo(() => {
    let items: CheatSheetItem[] = [];

    if (activeTab === 'all') {
      items = CHEATSHEET_CATEGORIES.flatMap((c) => c.items);
    } else {
      const cat = CHEATSHEET_CATEGORIES.find((c) => c.id === activeTab);
      items = cat ? cat.items : [];
    }

    if (filterMode === 'bookmarks') {
      items = items.filter((item) => bookmarkedIds.includes(item.id));
    } else if (filterMode === 'quickpick') {
      items = items.filter((item) => item.isQuickPick);
    }

    if (!searchQuery.trim()) {
      return items;
    }

    const q = searchQuery.toLowerCase().trim();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.purpose.toLowerCase().includes(q) ||
        item.scenario.toLowerCase().includes(q) ||
        item.note.toLowerCase().includes(q) ||
        item.categoryTitle.toLowerCase().includes(q)
    );
  }, [activeTab, filterMode, searchQuery, bookmarkedIds]);

  // Tab scroll helpers
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      const offset = direction === 'left' ? -250 : 250;
      tabsContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Export current list to CSV
  const handleExportCSV = () => {
    const header = ['STT', 'Chuyên đề', 'Tên service', 'Dùng để làm gì', 'Dùng trong scenario nào', 'Note'];
    const rows = filteredItems.map((item, idx) => [
      String(idx + 1),
      `"${item.categoryTitle.replace(/"/g, '""')}"`,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.purpose.replace(/"/g, '""')}"`,
      `"${item.scenario.replace(/"/g, '""')}"`,
      `"${item.note.replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const catName = activeTab === 'all' ? 'all-services' : activeTab;
    link.setAttribute('download', `aws-saa-c03-cheatsheet-${catName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Đã xuất file CSV thành công!');
  };

  // Highlight search text helper
  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    const escapedQuery = query.trim().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="bg-amber-200 text-amber-950 font-bold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Render scenario blocks with distinct icons
  const renderFormattedScenario = (text: string, query: string) => {
    const lines = text.split('\n');

    return (
      <div className="space-y-1.5 text-xs leading-relaxed text-slate-700">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          if (trimmed.startsWith('Chọn khi:')) {
            const body = trimmed.replace('Chọn khi:', '').trim();
            return (
              <div key={idx} className="flex items-start gap-1.5 p-1.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-700 mr-1">Chọn khi:</span>
                  <span>{highlightMatch(body, query)}</span>
                </div>
              </div>
            );
          }

          if (trimmed.startsWith('KHÔNG chọn khi:')) {
            const body = trimmed.replace('KHÔNG chọn khi:', '').trim();
            return (
              <div key={idx} className="flex items-start gap-1.5 p-1.5 rounded-lg bg-rose-50/70 border border-rose-100 text-slate-800">
                <XCircle className="w-3.5 h-3.5 text-rose-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-rose-700 mr-1">KHÔNG chọn khi:</span>
                  <span>{highlightMatch(body, query)}</span>
                </div>
              </div>
            );
          }

          if (trimmed.startsWith('Phân biệt:')) {
            const body = trimmed.replace('Phân biệt:', '').trim();
            return (
              <div key={idx} className="flex items-start gap-1.5 p-1.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-slate-800">
                <Info className="w-3.5 h-3.5 text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-indigo-700 mr-1">Phân biệt:</span>
                  <span>{highlightMatch(body, query)}</span>
                </div>
              </div>
            );
          }

          if (trimmed.startsWith('Lưu ý:') || trimmed.startsWith('Lưu ý đề:')) {
            const body = trimmed.replace(/^(Lưu ý đề:|Lưu ý:)/, '').trim();
            return (
              <div key={idx} className="flex items-start gap-1.5 p-1.5 rounded-lg bg-amber-50/70 border border-amber-200 text-slate-800">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-amber-800 mr-1">Lưu ý:</span>
                  <span>{highlightMatch(body, query)}</span>
                </div>
              </div>
            );
          }

          return (
            <div key={idx} className="flex items-start gap-1.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              <span>{highlightMatch(trimmed, query)}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Render note bullet points with arrow pills
  const renderFormattedNote = (text: string, query: string) => {
    const lines = text.split('\n');

    return (
      <div className="space-y-1 text-xs text-slate-700 font-mono">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return null;

          // Check if line contains keyword / formula
          const isKeywordLine =
            trimmed.toLowerCase().startsWith('keyword:') ||
            trimmed.toLowerCase().startsWith('từ khóa đề:') ||
            trimmed.toLowerCase().startsWith('combo đề');

          if (isKeywordLine) {
            return (
              <div key={idx} className="inline-flex items-center gap-1.5 px-2 py-0.5 my-0.5 rounded-md bg-amber-100/80 border border-amber-200 text-amber-900 font-sans font-semibold text-[11px]">
                <Lightbulb className="w-3 h-3 text-amber-600 shrink-0" />
                <span>{highlightMatch(trimmed, query)}</span>
              </div>
            );
          }

          if (trimmed.includes('=>')) {
            const parts = trimmed.split('=>').map((p) => p.trim());
            return (
              <div key={idx} className="flex items-center flex-wrap gap-1 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                {parts.map((p, pIdx) => (
                  <React.Fragment key={pIdx}>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[11px] font-sans ${
                        pIdx === 0
                          ? 'bg-slate-100 font-bold text-slate-900 border border-slate-200'
                          : pIdx === parts.length - 1
                          ? 'bg-amber-50 text-amber-900 font-medium border border-amber-200'
                          : 'bg-slate-50 text-slate-700'
                      }`}
                    >
                      {highlightMatch(p, query)}
                    </span>
                    {pIdx < parts.length - 1 && (
                      <span className="text-slate-400 font-bold text-[10px]">➜</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            );
          }

          return (
            <div key={idx} className="flex items-start gap-1.5 py-0.5 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
              <span>{highlightMatch(trimmed, query)}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Hero Section */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-700 shadow-sm">
        <div className="max-w-[1700px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AWS Certified Solutions Architect – Associate (SAA-C03)</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <FileSpreadsheet className="w-8 h-8 text-amber-400" />
                <span>Cheat Sheet Tra Cứu Dịch Vụ SAA</span>
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Mô phỏng bảng tra cứu toàn diện <strong>244 dịch vụ AWS</strong> chia theo <strong>16 chuyên đề</strong>.
                Cung cấp mục đích cốt lõi, ma trận &quot;Chọn khi / KHÔNG chọn khi&quot; và các mẹo keyword phân biệt đáp án sát đề thi thực tế.
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-xs">
                <div className="text-2xl font-black text-amber-400">16</div>
                <div className="text-[11px] font-medium text-slate-300 uppercase tracking-wider">Chuyên đề (Tabs)</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-xs">
                <div className="text-2xl font-black text-sky-400">244</div>
                <div className="text-[11px] font-medium text-slate-300 uppercase tracking-wider">Dịch vụ & Mẹo</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-xs">
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-[11px] font-medium text-slate-300 uppercase tracking-wider">Chuẩn đề SAA</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center backdrop-blur-xs">
                <div className="text-2xl font-black text-rose-400">{bookmarkedIds.length}</div>
                <div className="text-[11px] font-medium text-slate-300 uppercase tracking-wider">Đã bookmark ⭐</div>
              </div>
            </div>
          </div>

          {/* Search & Action Controls Bar */}
          <div className="mt-8 bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên dịch vụ, scenario, keyword (VD: S3, latency, Spot)..."
                className="w-full pl-10 pr-9 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex items-center flex-wrap gap-2 w-full lg:w-auto">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  filterMode === 'all'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                <span>Tất cả</span>
              </button>

              <button
                onClick={() => setFilterMode('bookmarks')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  filterMode === 'bookmarks'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>Đã lưu ({bookmarkedIds.length})</span>
              </button>

              <button
                onClick={() => setFilterMode('quickpick')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  filterMode === 'quickpick'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-sm'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Bảng chọn nhanh SAA</span>
              </button>
            </div>

            {/* View Mode Toggle & CSV Export */}
            <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto justify-end">
              <div className="bg-slate-900 p-1 rounded-xl border border-slate-700 flex items-center">
                <button
                  onClick={() => setViewMode('table')}
                  title="Chế độ bảng chi tiết (Spreadsheet View)"
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                    viewMode === 'table' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Bảng chi tiết</span>
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  title="Chế độ thẻ bài học (Card Grid View)"
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition ${
                    viewMode === 'cards' ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Thẻ học tập</span>
                </button>
              </div>

              <button
                onClick={handleExportCSV}
                title="Xuất bảng này ra file CSV Excel"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold border border-slate-600 transition"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Xuất CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 mt-6">
        {/* Spreadsheet Tab Bar Navigation */}
        <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm p-2 mb-6">
          <div className="flex items-center">
            {/* Scroll Left Button */}
            <button
              onClick={() => scrollTabs('left')}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 mr-2 shrink-0 transition"
              aria-label="Cuộn trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Scrollable Tab List */}
            <div
              ref={tabsContainerRef}
              className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none py-1 scroll-smooth w-full"
            >
              {/* "Tất cả" Tab */}
              <button
                onClick={() => setActiveTab('all')}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  activeTab === 'all'
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FileSpreadsheet className={`w-4 h-4 ${activeTab === 'all' ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>🌐 Tất cả chuyên đề</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === 'all' ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  244
                </span>
              </button>

              {/* 16 Individual Categories Tabs */}
              {CHEATSHEET_CATEGORIES.map((cat, idx) => {
                const IconComponent = ICON_MAP[cat.icon] || Server;
                const isActive = activeTab === cat.id;
                const colors = COLOR_CONFIG[cat.color] || COLOR_CONFIG.amber;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                      isActive
                        ? `${colors.activeBg} shadow-md`
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-white' : colors.text}`} />
                    <span>
                      {idx + 1}. {cat.title}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive ? 'bg-white/30 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {cat.itemCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Button */}
            <button
              onClick={() => scrollTabs('right')}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 ml-2 shrink-0 transition"
              aria-label="Cuộn phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Description Banner (if single category active) */}
        {activeCategory && activeTab !== 'all' && (
          <div className="mb-6 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  COLOR_CONFIG[activeCategory.color]?.lightBg || 'bg-amber-50'
                } ${COLOR_CONFIG[activeCategory.color]?.border || 'border-amber-200'} border`}
              >
                {React.createElement(ICON_MAP[activeCategory.icon] || Server, {
                  className: `w-6 h-6 ${COLOR_CONFIG[activeCategory.color]?.text || 'text-amber-600'}`,
                })}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    {activeCategory.title} ({activeCategory.vietnameseTitle})
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                    {activeCategory.itemCount} dịch vụ & bảng chọn
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{activeCategory.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center text-xs font-semibold text-slate-500">
              <span>Đang hiển thị {filteredItems.length} mục</span>
            </div>
          </div>
        )}

        {/* Result Counter & Search Status */}
        {searchQuery && (
          <div className="mb-4 flex items-center justify-between px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-600" />
              <span>
                Tìm thấy <strong>{filteredItems.length}</strong> kết quả phù hợp với từ khóa &quot;<strong>{searchQuery}</strong>&quot;
              </span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-700 hover:text-amber-950 font-bold underline text-xs"
            >
              Xóa tìm kiếm
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/90 shadow-xs my-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Không tìm thấy dịch vụ phù hợp</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Thử tìm kiếm với từ khóa khác hoặc chuyển sang tab &quot;🌐 Tất cả chuyên đề&quot; để tìm trên toàn bộ 244 dịch vụ AWS.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterMode('all');
                setActiveTab('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        )}

        {/* View Mode 1: Table Spreadsheet View */}
        {viewMode === 'table' && filteredItems.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-3 px-3 w-14 text-center border-r border-slate-800">STT</th>
                    {activeTab === 'all' && (
                      <th className="py-3 px-3 w-32 border-r border-slate-800">Chuyên đề</th>
                    )}
                    <th className="py-3 px-4 w-56 border-r border-slate-800">Tên Service</th>
                    <th className="py-3 px-4 w-72 border-r border-slate-800">Dùng để làm gì</th>
                    <th className="py-3 px-5 border-r border-slate-800 min-w-[340px]">Dùng trong scenario nào (Đề thi)</th>
                    <th className="py-3 px-5 min-w-[340px]">Ghi chú & Keyword SAA</th>
                    <th className="py-3 px-2 w-20 text-center">Lưu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {filteredItems.map((item) => {
                    const isBookmarked = bookmarkedIds.includes(item.id);
                    const isQuickPick = item.isQuickPick;

                    return (
                      <tr
                        key={item.id}
                        id={item.id}
                        className={`transition hover:bg-slate-50/80 ${
                          isQuickPick
                            ? 'bg-amber-50/40 border-l-4 border-l-amber-500'
                            : isBookmarked
                            ? 'bg-amber-50/20'
                            : ''
                        }`}
                      >
                        {/* STT */}
                        <td className="py-3 px-3 text-center font-bold text-slate-500 align-top border-r border-slate-100">
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                            {item.stt}
                          </span>
                        </td>

                        {/* Category (only when viewing ALL) */}
                        {activeTab === 'all' && (
                          <td className="py-3 px-3 align-top border-r border-slate-100">
                            <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                              {item.categoryTitle}
                            </span>
                          </td>
                        )}

                        {/* Service Name */}
                        <td className="py-3 px-4 align-top border-r border-slate-100">
                          <div className="font-extrabold text-slate-900 text-xs sm:text-[13px] leading-snug">
                            {highlightMatch(item.name, searchQuery)}
                          </div>
                          {isQuickPick && (
                            <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                              <Zap className="w-2.5 h-2.5" /> Ma trận chọn nhanh
                            </span>
                          )}
                        </td>

                        {/* Purpose */}
                        <td className="py-3 px-4 align-top border-r border-slate-100 text-slate-700 leading-relaxed font-medium">
                          {highlightMatch(item.purpose, searchQuery)}
                        </td>

                        {/* Scenario */}
                        <td className="py-3 px-5 align-top border-r border-slate-100">
                          {renderFormattedScenario(item.scenario, searchQuery)}
                        </td>

                        {/* Note & Keywords */}
                        <td className="py-3 px-5 align-top">
                          {renderFormattedNote(item.note, searchQuery)}
                        </td>

                        {/* Actions (Bookmark + Copy) */}
                        <td className="py-3 px-2 text-center align-top">
                          <div className="flex flex-col items-center gap-1.5 pt-1">
                            <button
                              onClick={() => toggleBookmark(item.id, item.name)}
                              title={isBookmarked ? 'Bỏ lưu' : 'Lưu để ôn tập'}
                              className={`p-1.5 rounded-lg transition ${
                                isBookmarked
                                  ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                                  : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                              }`}
                            >
                              <Bookmark className="w-4 h-4 fill-current" />
                            </button>
                            <button
                              onClick={() => handleCopyItem(item)}
                              title="Sao chép nội dung"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                            >
                              {copiedId === item.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Mode 2: Card Grid View */}
        {viewMode === 'cards' && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const isBookmarked = bookmarkedIds.includes(item.id);
              const isQuickPick = item.isQuickPick;

              return (
                <div
                  key={item.id}
                  id={`card-${item.id}`}
                  className={`bg-white rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between ${
                    isQuickPick
                      ? 'border-amber-400 ring-2 ring-amber-400/20 shadow-sm'
                      : isBookmarked
                      ? 'border-amber-300 ring-1 ring-amber-300/40'
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-4 border-b border-slate-100">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                            #{item.stt}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                            {item.categoryTitle}
                          </span>
                          {isQuickPick && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5" /> Bảng chọn nhanh
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                          {highlightMatch(item.name, searchQuery)}
                        </h3>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => toggleBookmark(item.id, item.name)}
                          className={`p-1.5 rounded-lg transition ${
                            isBookmarked
                              ? 'bg-amber-100 text-amber-600 hover:bg-amber-200'
                              : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                          }`}
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          onClick={() => handleCopyItem(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Purpose Description */}
                    <p className="mt-2 text-xs text-slate-600 font-medium leading-relaxed">
                      {highlightMatch(item.purpose, searchQuery)}
                    </p>
                  </div>

                  {/* Card Body: Scenarios */}
                  <div className="p-4 border-b border-slate-100 bg-slate-50/40 grow">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kịch bản đề thi (Scenario)</span>
                    </div>
                    {renderFormattedScenario(item.scenario, searchQuery)}
                  </div>

                  {/* Card Footer: Notes & Formulas */}
                  <div className="p-4 bg-white rounded-b-2xl">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Ghi chú & Mẹo SAA</span>
                    </div>
                    {renderFormattedNote(item.note, searchQuery)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
