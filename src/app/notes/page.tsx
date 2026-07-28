'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { BookOpen, Edit3, FileQuestion, FileText, Save, Search, Trash2, X } from 'lucide-react';
import QuestionDetailModal from '@/components/QuestionDetailModal';
import NoteMarkdown from '@/components/NoteMarkdown';

type NoteType = 'question' | 'document';

async function fetchQuestionNotes(domainId: string, search: string) {
  const params = new URLSearchParams();
  if (domainId) params.set('domainId', domainId);
  if (search) params.set('search', search);
  const response = await fetch(`/api/notes?${params}`);
  if (!response.ok) throw new Error('Failed to fetch notes');
  return response.json();
}

async function fetchDocumentNotes(search: string) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  const response = await fetch(`/api/docs/page-note?${params}`);
  if (!response.ok) throw new Error('Failed to fetch document notes');
  return response.json();
}

async function fetchDomains() {
  const response = await fetch('/api/progress/domains');
  if (!response.ok) throw new Error('Failed to fetch domains');
  return response.json();
}

export default function NotesPage() {
  const queryClient = useQueryClient();
  const [noteType, setNoteType] = useState<NoteType>('question');
  const [domainId, setDomainId] = useState('');
  const [search, setSearch] = useState('');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('type') === 'document') {
      setNoteType('document');
    }
  }, []);

  const questionNotes = useQuery({
    queryKey: ['notes', { domainId, search }],
    queryFn: () => fetchQuestionNotes(domainId, search),
    enabled: noteType === 'question',
  });
  const documentNotes = useQuery({
    queryKey: ['document-notes', search],
    queryFn: () => fetchDocumentNotes(search),
    enabled: noteType === 'document',
  });
  const { data: domainsData } = useQuery({
    queryKey: ['domains'],
    queryFn: fetchDomains,
    enabled: noteType === 'question',
  });

  const deleteQuestionNote = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Không thể xóa ghi chú');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });
  const deleteDocumentNote = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/docs/page-note?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Không thể xóa ghi chú');
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['document-notes'] }),
  });
  const updateQuestionNote = useMutation({
    mutationFn: async ({ questionId, content }: { questionId: string; content: string }) => {
      const response = await fetch(`/api/questions/${questionId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw new Error('Không thể cập nhật ghi chú');
    },
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const activeData = noteType === 'question' ? questionNotes.data?.notes : documentNotes.data?.notes;
  const isLoading = noteType === 'question' ? questionNotes.isLoading : documentNotes.isLoading;

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Ghi chú cá nhân</h1>
        <p className="text-xs text-slate-500">Quản lý ghi chú câu hỏi và ghi chú tài liệu AWS của bạn</p>
      </div>

      <div className="card-saas flex w-full max-w-xl rounded-2xl p-1.5">
        <button
          type="button"
          onClick={() => setNoteType('question')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-extrabold transition ${
            noteType === 'question' ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <FileQuestion className="h-4 w-4" />
          Note bài tập / đề
        </button>
        <button
          type="button"
          onClick={() => setNoteType('document')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-extrabold transition ${
            noteType === 'document' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-500 hover:bg-amber-50'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Note tài liệu
        </button>
      </div>

      <div className={`card-saas grid grid-cols-1 gap-3 p-4 ${noteType === 'question' ? 'sm:grid-cols-2' : ''}`}>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={noteType === 'question' ? 'Tìm trong ghi chú hoặc câu hỏi...' : 'Tìm theo nội dung hoặc tên tài liệu...'}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        {noteType === 'question' && (
          <select
            value={domainId}
            onChange={(event) => setDomainId(event.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Tất cả Domains</option>
            {domainsData?.domains?.map((domain: any) => (
              <option key={domain.id} value={domain.id}>{domain.code}: {domain.name}</option>
            ))}
          </select>
        )}
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-sm text-slate-400">Đang tải ghi chú...</div>
      ) : !activeData?.length ? (
        <div className="card-saas p-12 text-center text-sm text-slate-500">
          {noteType === 'question'
            ? 'Chưa có ghi chú câu hỏi nào.'
            : 'Chưa có ghi chú tài liệu. Mở một bài tài liệu và dùng bong bóng ghi chú ở góc phải.'}
        </div>
      ) : noteType === 'question' ? (
        <div className="space-y-4">
          {questionNotes.data.notes.map((note: any) => (
            <article
              key={note.id}
              onClick={() => setSelectedQuestionId(note.questionId)}
              className="card-saas group cursor-pointer space-y-3 p-5 transition-all hover:border-amber-400/80 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                    {note.question.domain.name}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Cập nhật: {new Date(note.updatedAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
                <div className="flex items-center gap-1" onClick={(event) => event.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(note.id);
                      setEditingContent(note.content);
                    }}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-amber-600"
                    title="Chỉnh sửa"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteQuestionNote.mutate(note.id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:text-red-600"
                    title="Xóa ghi chú"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs font-bold text-slate-700">
                Câu hỏi: {note.question.questionText}
              </div>
              {editingId === note.id ? (
                <div className="space-y-2" onClick={(event) => event.stopPropagation()}>
                  <textarea
                    value={editingContent}
                    onChange={(event) => setEditingContent(event.target.value)}
                    rows={6}
                    className="w-full rounded-lg border border-amber-300 bg-white p-3 font-mono text-xs text-slate-900 outline-none focus:border-amber-500"
                  />
                  <div className="flex justify-end gap-2">
                    <button type="button" onClick={() => setEditingId(null)} className="flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                      <X className="mr-1 h-3.5 w-3.5" /> Hủy
                    </button>
                    <button
                      type="button"
                      onClick={() => updateQuestionNote.mutate({ questionId: note.questionId, content: editingContent })}
                      className="flex items-center rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white"
                    >
                      <Save className="mr-1 h-3.5 w-3.5" /> Lưu thay đổi
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-amber-200/50 bg-amber-50/40 p-3">
                  <NoteMarkdown content={note.content} theme="light" />
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {documentNotes.data.notes.map((note: any) => (
            <article key={note.id} className="card-saas flex min-h-56 flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <Link href={`/docs/${note.docSlug}`} className="block truncate text-sm font-extrabold text-slate-900 hover:text-amber-600 hover:underline">
                      {note.selectedText || note.docSlug}
                    </Link>
                    <div className="text-[10px] font-semibold text-slate-400">
                      Cập nhật: {new Date(note.updatedAt).toLocaleDateString('vi-VN')}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteDocumentNote.mutate(note.id)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  title="Xóa ghi chú"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="max-h-72 flex-1 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
                <NoteMarkdown content={note.noteContent || '*Không có nội dung*'} theme="light" />
              </div>
              <Link href={`/docs/${note.docSlug}`} className="text-right text-[11px] font-bold text-amber-600 hover:underline">
                Mở tài liệu tham chiếu →
              </Link>
            </article>
          ))}
        </div>
      )}

      <QuestionDetailModal questionId={selectedQuestionId} onClose={() => setSelectedQuestionId(null)} />
    </div>
  );
}
