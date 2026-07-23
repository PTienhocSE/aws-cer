'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { FileText, Trash2, Search, Edit3, Save, ExternalLink } from 'lucide-react';

async function fetchNotes({ domainId, search }: any) {
  const params = new URLSearchParams();
  if (domainId) params.append('domainId', domainId);
  if (search) params.append('search', search);

  const res = await fetch(`/api/notes?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

async function fetchDomains() {
  const res = await fetch('/api/progress/domains');
  if (!res.ok) throw new Error('Failed to fetch domains');
  return res.json();
}

export default function NotesPage() {
  const queryClient = useQueryClient();
  const [domainId, setDomainId] = useState('');
  const [search, setSearch] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['notes', { domainId, search }],
    queryFn: () => fetchNotes({ domainId, search }),
  });

  const { data: domainsData } = useQuery({
    queryKey: ['domains'],
    queryFn: fetchDomains,
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const updateNoteMutation = useMutation({
    mutationFn: async ({ questionId, content }: { questionId: string; content: string }) => {
      const res = await fetch(`/api/questions/${questionId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      return res.json();
    },
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Ghi chú cá nhân</h1>
        <p className="text-xs text-slate-500">Quản lý và tìm kiếm các ghi chú kiến thức AWS của bạn</p>
      </div>

      {/* Filter bar */}
      <div className="card-saas p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm trong ghi chú hoặc câu hỏi..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <select
          value={domainId}
          onChange={(e) => setDomainId(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="">Tất cả Domains</option>
          {domainsData?.domains?.map((d: any) => (
            <option key={d.id} value={d.id}>
              {d.code}: {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Notes List */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-sm">Đang tải ghi chú...</div>
      ) : data?.notes?.length === 0 ? (
        <div className="card-saas p-12 text-center text-slate-500 text-sm">
          Chưa có ghi chú nào. Hãy thêm ghi chú trong quá trình luyện tập! 📝
        </div>
      ) : (
        <div className="space-y-4">
          {data?.notes?.map((n: any) => (
            <div key={n.id} className="card-saas p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded">
                    {n.question.domain.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    Cập nhật: {new Date(n.updatedAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(n.id);
                      setEditingContent(n.content);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg transition"
                    title="Chỉnh sửa"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteNoteMutation.mutate(n.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition"
                    title="Xóa ghi chú"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Question snippet */}
              <p className="text-xs font-bold text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                Câu hỏi: {n.question.questionText}
              </p>

              {/* Note Content */}
              {editingId === n.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    rows={3}
                    className="w-full p-3 bg-white border border-amber-400 rounded-lg text-xs text-slate-900 focus:outline-none"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() =>
                        updateNoteMutation.mutate({
                          questionId: n.questionId,
                          content: editingContent,
                        })
                      }
                      className="px-3 py-1 bg-slate-900 text-white font-bold text-xs rounded-lg shadow"
                    >
                      Lưu thay đổi
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-800 bg-amber-50/40 p-3 rounded-lg border border-amber-200/50 font-medium">
                  {n.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
