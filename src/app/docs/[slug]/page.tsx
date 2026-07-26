'use client';

import { use, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import DocsSidebar from '@/components/DocsSidebar';
import DocsToc from '@/components/DocsToc';
import DocsViewer from '@/components/DocsViewer';
import { Menu, List, Loader2, AlertCircle, BookOpen } from 'lucide-react';
import Link from 'next/link';

async function fetchDoc(slug: string) {
  const res = await fetch(`/api/docs/${slug}`);
  if (!res.ok) {
    throw new Error('Failed to load document');
  }
  return res.json();
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DocDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [docsTheme, setDocsTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('aws_docs_theme');
    if (saved === 'dark' || saved === 'light') {
      setDocsTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (docsTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [docsTheme, mounted]);

  const toggleDocsTheme = () => {
    const newTheme = docsTheme === 'light' ? 'dark' : 'light';
    setDocsTheme(newTheme);
    localStorage.setItem('aws_docs_theme', newTheme);
  };

  const { data: docData, isLoading, error } = useQuery({
    queryKey: ['doc', slug],
    queryFn: () => fetchDoc(slug),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  const effectiveTheme = mounted ? docsTheme : 'light';
  const isDark = effectiveTheme === 'dark';

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-200 -mx-4 sm:-mx-6 lg:-mx-8 px-2.5 sm:px-6 lg:px-8 -my-6 py-3.5 sm:py-6 ${
        isDark ? 'bg-[#0b0f19]' : 'bg-transparent'
      }`}
    >
      {/* Mobile Header Bar for Toggles */}
      <div
        className={`lg:hidden flex items-center justify-between border rounded-xl p-2.5 mb-3 shadow-xs ${
          isDark ? 'bg-[#131c2e] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className={`flex items-center text-xs font-extrabold px-3 py-1.5 rounded-lg border transition ${
            isDark ? 'text-slate-200 bg-[#090d16] border-slate-800' : 'text-slate-700 bg-slate-50 border-slate-200'
          }`}
        >
          <Menu className="w-4 h-4 mr-1.5 text-amber-500" />
          <span>Danh mục bài</span>
        </button>

        <button
          onClick={() => setMobileTocOpen(true)}
          className={`flex items-center text-xs font-extrabold px-3 py-1.5 rounded-lg border transition ${
            isDark ? 'text-slate-200 bg-[#090d16] border-slate-800' : 'text-slate-700 bg-slate-50 border-slate-200'
          }`}
        >
          <List className="w-4 h-4 mr-1.5 text-indigo-400" />
          <span>Mục lục bài</span>
        </button>
      </div>

      {/* 3-Column Layout: Flex layout allowing middle section to expand freely */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Column: Navigation Sidebar (Desktop) */}
        <aside
          className={`hidden lg:block shrink-0 sticky top-20 h-[calc(100vh-100px)] transition-all duration-300 ${
            leftCollapsed ? 'w-12' : 'w-[270px] xl:w-[290px]'
          }`}
        >
          <DocsSidebar
            isCollapsed={leftCollapsed}
            onToggleCollapse={() => setLeftCollapsed(!leftCollapsed)}
            theme={effectiveTheme}
          />
        </aside>

        {/* Middle Column: Document Viewer (Flexible) */}
        <section className="flex-1 min-w-0">
          {isLoading ? (
            <div
              className={`border rounded-2xl p-12 text-center space-y-3 shadow-xs ${
                isDark ? 'bg-[#131c2e] border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
              <p className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Đang tải tài liệu AWS SAA-C03...
              </p>
            </div>
          ) : error || !docData ? (
            <div
              className={`border rounded-2xl p-8 text-center space-y-3 shadow-xs ${
                isDark ? 'bg-[#131c2e] border-red-900/50' : 'bg-white border-red-200'
              }`}
            >
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
              <h3 className={`text-base font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Không tìm thấy tài liệu này
              </h3>
              <p className="text-xs text-slate-500">Tài liệu bạn yêu cầu có thể đã bị di chuyển hoặc không tồn tại.</p>
              <Link
                href="/docs/01-compute-services"
                className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Về bài Compute Services
              </Link>
            </div>
          ) : (
            <DocsViewer
              title={docData.title}
              categoryTitle={docData.categoryTitle}
              html={docData.html}
              rawMarkdown={docData.rawMarkdown}
              prevDoc={docData.prevDoc}
              nextDoc={docData.nextDoc}
              theme={effectiveTheme}
              onToggleTheme={toggleDocsTheme}
              slug={slug}
            />
          )}
        </section>

        {/* Right Column: Table of Contents (Desktop) */}
        <aside
          className={`hidden lg:block shrink-0 sticky top-20 h-[calc(100vh-100px)] transition-all duration-300 ${
            rightCollapsed ? 'w-12' : 'w-[250px] xl:w-[270px]'
          }`}
        >
          {docData?.toc && (
            <DocsToc
              toc={docData.toc}
              isCollapsed={rightCollapsed}
              onToggleCollapse={() => setRightCollapsed(!rightCollapsed)}
              theme={effectiveTheme}
            />
          )}
        </aside>
      </div>

      {/* Mobile Drawer: Navigation Sidebar */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-start animate-in fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div
            className={`relative w-4/5 max-w-xs h-full p-4 shadow-2xl z-10 flex flex-col ${
              isDark ? 'bg-[#131c2e] text-slate-200' : 'bg-white text-slate-800'
            }`}
          >
            <div className={`flex justify-between items-center pb-3 mb-2 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <span className="text-sm font-black">Danh mục tài liệu</span>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                Đóng
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <DocsSidebar
                onSelectDoc={() => setMobileSidebarOpen(false)}
                theme={effectiveTheme}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer: Table of Contents */}
      {mobileTocOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setMobileTocOpen(false)}
          />
          <div
            className={`relative w-4/5 max-w-xs h-full p-4 shadow-2xl z-10 flex flex-col ${
              isDark ? 'bg-[#131c2e] text-slate-200' : 'bg-white text-slate-800'
            }`}
          >
            <div className={`flex justify-between items-center pb-3 mb-2 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <span className="text-sm font-black">Mục lục bài</span>
              <button
                onClick={() => setMobileTocOpen(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 p-1"
              >
                Đóng
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {docData?.toc && (
                <DocsToc
                  toc={docData.toc}
                  theme={effectiveTheme}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
