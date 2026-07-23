'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Bookmark, BookOpen, CheckSquare, Filter, Play, Trash2, Search } from 'lucide-react';

export default function BookmarksPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['bookmarkedQuestions', search],
    queryFn: async () => {
      const res = await fetch(`/api/questions?status=BOOKMARKED&search=${encodeURIComponent(search)}&limit=100`);
      if (!res.ok) throw new Error('Failed to fetch bookmarks');
      return res.json();
    },
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: async (questionId: string) => {
      const res = await fetch(`/api/questions/${questionId}/bookmark`, { method: 'POST' });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarkedQuestions'] });
    },
  });

  const handleStartPracticeSelected = async (ids?: string[]) => {
    const targetIds = ids || selectedQuestionIds;
    try {
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'BOOKMARKS', status: 'BOOKMARKED', limit: targetIds.length || 20 }),
      });
      const result = await res.json();
      if (result.sessionId) {
        router.push(`/practice/${result.sessionId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleSelectAll = () => {
    if (!data?.questions) return;
    if (selectedQuestionIds.length === data.questions.length) {
      setSelectedQuestionIds([]);
    } else {
      setSelectedQuestionIds(data.questions.map((q: any) => q.id));
    }
  };

  const toggleSelectQuestion = (id: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return <div className="py-20 text-center text-slate-500 font-semibold text-sm">Đang tải danh sách câu đã bookmark...</div>;
  }

  const questions = data?.questions || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header & Launcher Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center">
            <Bookmark className="w-6 h-6 mr-2 text-amber-500 fill-amber-500" /> Các câu hỏi đã đánh dấu (Bookmarks)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tổng cộng {questions.length} câu đã được bạn bookmark trong môn học này.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedQuestionIds.length > 0 && (
            <button
              onClick={() => handleStartPracticeSelected()}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Luyện tập {selectedQuestionIds.length} câu đã chọn
            </button>
          )}

          <button
            onClick={() => handleStartPracticeSelected([])}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center"
          >
            <Play className="w-3.5 h-3.5 mr-1.5 fill-slate-950" /> Luyện tất cả Bookmark ({questions.length})
          </button>
        </div>
      </div>

      {/* Filter & Select Bar */}
      <div className="card-saas p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm từ khóa trong câu bookmark..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          />
        </div>

        {questions.length > 0 && (
          <button
            onClick={toggleSelectAll}
            className="text-xs font-extrabold text-slate-700 hover:text-slate-900"
          >
            {selectedQuestionIds.length === questions.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả câu hỏi'}
          </button>
        )}
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="card-saas p-12 text-center text-slate-500 space-y-3">
          <Bookmark className="w-10 h-10 mx-auto text-slate-300" />
          <div className="font-extrabold text-slate-700 text-sm">Chưa có câu hỏi nào được bookmark</div>
          <p className="text-xs text-slate-400">
            Trong quá trình làm bài luyện tập, bạn nhấn phím (F) hoặc biểu tượng Bookmark để lưu lại các câu cần ôn kỹ.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q: any, idx: number) => {
            const isSelected = selectedQuestionIds.includes(q.id);
            return (
              <div
                key={q.id}
                className={`card-saas p-5 space-y-3 transition-all border-2 ${
                  isSelected ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200/80'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelectQuestion(q.id)}
                      className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
                    />
                    <span className="text-xs font-extrabold px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded">
                      #{idx + 1} • {q.domainName}
                    </span>
                  </div>

                  <button
                    onClick={() => removeBookmarkMutation.mutate(q.id)}
                    className="text-xs text-slate-400 hover:text-red-600 font-extrabold flex items-center"
                    title="Bỏ bookmark"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Bỏ bookmark
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-800 leading-relaxed pl-7">{q.question}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
