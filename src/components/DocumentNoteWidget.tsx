'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronUp, Eye, FileText, Minimize2, Save, X } from 'lucide-react';
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
    setIsSaving(true);
    try {
      const response = await fetch('/api/docs/page-note', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docSlug, docTitle, noteContent: content }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Không thể lưu ghi chú');
      const nextContent = data.note?.noteContent || '';
      setContent(nextContent);
      setSavedContent(nextContent);
      toast.success('Đã lưu ghi chú toàn bài!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Lỗi lưu ghi chú');
    } finally {
      setIsSaving(false);
    }
  };

  if (mode === 'bubble') {
    return (
      <button
        type="button"
        onClick={openWidget}
        className="fixed bottom-20 right-3 z-[60] flex h-14 w-14 items-center justify-center rounded-full border border-indigo-400/40 bg-indigo-600 text-white shadow-[0_12px_35px_rgba(79,70,229,0.4)] transition hover:scale-105 hover:bg-indigo-500 md:bottom-6 md:right-6"
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
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <FileText className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-400">Ghi chú tài liệu</span>
            <span className="block truncate text-xs font-bold">{docTitle}</span>
          </span>
        </button>
        <button type="button" onClick={() => setMode('expanded')} className="rounded-lg p-2 text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-400" title="Mở rộng">
          <ChevronUp className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => setMode('bubble')} className="rounded-lg p-2 text-slate-400 hover:bg-slate-500/10" title="Đóng">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <section className={`fixed bottom-20 right-2 z-[60] flex h-[min(55dvh,38rem)] w-[calc(100vw-1rem)] flex-col overflow-hidden rounded-2xl border shadow-2xl sm:h-[50vh] sm:w-[50vw] sm:min-w-[30rem] sm:max-w-[48rem] md:bottom-6 md:right-6 ${
      isDark ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-800'
    }`}>
      <header className={`flex items-center justify-between gap-3 border-b px-4 py-3 ${isDark ? 'border-slate-700 bg-slate-800/90' : 'border-slate-200 bg-slate-50'}`}>
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <BookOpen className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-400">Ghi chú toàn bài</div>
            <div className="truncate text-sm font-extrabold">{docTitle}</div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => setShowPreview((value) => !value)} className={`rounded-lg p-2 transition ${showPreview ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-indigo-500/10 hover:text-indigo-400'}`} title={showPreview ? 'Chỉnh sửa' : 'Xem trước Markdown'}>
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
            className={`h-full w-full resize-none rounded-xl border p-4 font-mono text-sm leading-relaxed outline-none transition focus:border-indigo-400 ${
              isDark ? 'border-slate-700 bg-slate-950 text-slate-100' : 'border-slate-200 bg-slate-50 text-slate-800'
            }`}
          />
        )}
      </div>

      <footer className={`flex items-center justify-between gap-3 border-t px-4 py-3 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
        <Link href="/notes?type=document" className="text-[11px] font-bold text-indigo-400 hover:underline">
          Xem trong ghi chú cá nhân →
        </Link>
        <button
          type="button"
          onClick={saveNote}
          disabled={isSaving || content === savedContent}
          className="flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save className="mr-1.5 h-4 w-4" />
          {isSaving ? 'Đang lưu...' : content === savedContent ? 'Đã lưu' : 'Lưu ghi chú'}
        </button>
      </footer>
    </section>
  );
}
