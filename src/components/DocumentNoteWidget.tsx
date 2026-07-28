'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Check, ChevronUp, Eye, FileText, Loader2, Minimize2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import NoteMarkdown from '@/components/NoteMarkdown';

interface DocumentNoteWidgetProps {
  docSlug: string;
  docTitle: string;
  theme: 'light' | 'dark';
}

type WidgetMode = 'bubble' | 'collapsed' | 'expanded';

export default function DocumentNoteWidget({ docSlug, docTitle, theme }: DocumentNoteWidgetProps) {
  const { user } = useAuthStore();
  const isDark = theme === 'dark';
  const [mode, setMode] = useState<WidgetMode>('bubble');
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setMode('bubble');
    setContent('');
    setSavedContent('');
    if (!user) return;

    let cancelled = false;
    setIsLoading(true);
    fetch(`/api/docs/page-note?docSlug=${encodeURIComponent(docSlug)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Không thể tải ghi chú');
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        const noteContent = data.note?.noteContent || '';
        setContent(noteContent);
        setSavedContent(noteContent);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [docSlug, user]);

  const openWidget = () => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để ghi chú tài liệu');
      return;
    }
    setMode('collapsed');
  };

  const saveNote = async () => {
    const contentToSave = content;
    setIsSaving(true);
    try {
      const response = await fetch('/api/docs/page-note', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docSlug, docTitle, noteContent: contentToSave }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Không thể lưu ghi chú');
      setSavedContent(data.note?.noteContent || contentToSave);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Lỗi lưu ghi chú');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!user || isLoading || content === savedContent) return;
    const timer = window.setTimeout(() => {
      void saveNote();
    }, 900);
    return () => window.clearTimeout(timer);
  }, [content, savedContent, isLoading, user]);

  if (mode === 'bubble') {
    return (
      <button
        type="button"
        onClick={openWidget}
        className="fixed bottom-20 right-3 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-amber-300 bg-amber-500 text-slate-950 shadow-[0_12px_35px_rgba(245,158,11,0.35)] transition hover:scale-105 hover:bg-amber-400 md:bottom-6 md:right-6"
        title="Ghi chú toàn bài"
      >
        <FileText className="h-6 w-6" />
        {savedContent && <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />}
      </button>
    );
  }

  if (mode === 'collapsed') {
    return (
      <div className={`fixed bottom-20 right-2 z-[60] flex w-[calc(100vw-1rem)] items-center gap-3 rounded-2xl border px-3 py-2.5 shadow-2xl sm:w-80 md:bottom-6 md:right-6 ${
        isDark ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-800'
      }`}>
        <button type="button" onClick={() => setMode('expanded')} className="flex min-w-0 flex-1 items-center gap-2 text-left">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
            <FileText className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-500">Ghi chú tài liệu</span>
            <span className="block truncate text-xs font-bold">{docTitle}</span>
          </span>
        </button>
        <button type="button" onClick={() => setMode('expanded')} className="rounded-lg p-2 text-slate-400 hover:bg-amber-500/10 hover:text-amber-500" title="Mở rộng">
          <ChevronUp className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => setMode('bubble')} className="rounded-lg p-2 text-slate-400 hover:bg-slate-500/10" title="Đóng">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <section className={`fixed bottom-20 right-2 z-[60] flex h-[min(55dvh,38rem)] w-[calc(100vw-1rem)] flex-col overflow-hidden rounded-2xl border shadow-2xl sm:h-[50vh] sm:min-h-[20rem] sm:max-h-[calc(100dvh-3rem)] sm:w-[50vw] sm:min-w-[30rem] sm:max-w-[calc(100vw-3rem)] sm:resize md:bottom-6 md:right-6 ${
      isDark ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-800'
    }`}>
      <header className={`flex items-center justify-between gap-3 border-b px-4 py-3 ${isDark ? 'border-slate-700 bg-slate-800/90' : 'border-slate-200 bg-slate-50'}`}>
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
            <BookOpen className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-500">Ghi chú toàn bài</div>
            <div className="truncate text-sm font-extrabold">{docTitle}</div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => setShowPreview((value) => !value)} className={`rounded-lg p-2 transition ${showPreview ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:bg-amber-500/10 hover:text-amber-500'}`} title={showPreview ? 'Chỉnh sửa' : 'Xem trước Markdown'}>
            {showPreview ? <FileText className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button type="button" onClick={() => setMode('collapsed')} className="rounded-lg p-2 text-slate-400 hover:bg-slate-500/10" title="Thu gọn">
            <Minimize2 className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => setMode('bubble')} className="rounded-lg p-2 text-slate-400 hover:bg-slate-500/10" title="Đóng">
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 p-3">
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">Đang tải ghi chú...</div>
        ) : showPreview ? (
          <div className={`h-full overflow-y-auto rounded-xl border p-4 ${isDark ? 'border-slate-700 bg-slate-950/60' : 'border-slate-200 bg-slate-50'}`}>
            <NoteMarkdown content={content || '*Chưa có nội dung ghi chú.*'} theme={theme} />
          </div>
        ) : (
          <textarea
            autoFocus
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={'Ghi chú cho toàn bộ tài liệu...\n\nHỗ trợ **Markdown**, danh sách, code và bảng GFM.'}
            className={`h-full w-full resize-none rounded-xl border p-4 font-mono text-sm leading-relaxed outline-none transition focus:border-amber-400 ${
              isDark ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-slate-200 bg-slate-50 text-slate-800'
            }`}
          />
        )}
      </div>

      <footer className={`flex items-center justify-between gap-3 border-t px-4 py-3 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
        <Link href="/notes?type=document" className="text-[11px] font-bold text-amber-600 hover:underline">
          Xem trong ghi chú cá nhân →
        </Link>
        <div className={`flex items-center rounded-xl px-3 py-2 text-xs font-bold ${
          isSaving || content !== savedContent
            ? 'bg-amber-100 text-amber-700'
            : 'bg-emerald-50 text-emerald-700'
        }`}>
          {isSaving || content !== savedContent ? (
            <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" />Đang tự lưu...</>
          ) : (
            <><Check className="mr-1.5 h-4 w-4" />Đã tự lưu</>
          )}
        </div>
      </footer>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 right-1 hidden h-3 w-3 border-b-2 border-r-2 border-amber-500/70 sm:block"
      />
    </section>
  );
}
