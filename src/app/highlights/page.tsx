'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Highlighter, Search, Trash2, BookOpen } from 'lucide-react';
import QuestionDetailModal from '@/components/QuestionDetailModal';

export default function HighlightsPage() {
  const queryClient = useQueryClient();
  const [selectedColor, setSelectedColor] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['userHighlights', selectedColor, search],
    queryFn: async () => {
      // Get active bank first or pass current bank ID
      const overviewRes = await fetch('/api/progress/overview');
      const overview = await overviewRes.json();
      const bankId = overview?.activeQuestionBankId || 'aws-saa-c03-v1';

      const res = await fetch(
        `/api/question-banks/${bankId}/highlights?color=${selectedColor}&search=${encodeURIComponent(search)}`
      );
      if (!res.ok) throw new Error('Failed to fetch highlights');
      return res.json();
    },
  });

  const deleteHighlightMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/highlights/${id}`, { method: 'DELETE' });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userHighlights'] });
    },
  });

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  if (isLoading) {
    return <div className="py-20 text-center text-slate-500 font-semibold text-sm">Đang tải đoạn tô màu (Highlights)...</div>;
  }

  const highlights = data?.highlights || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center">
            <Highlighter className="w-6 h-6 mr-2 text-pink-500" /> Quản lý nội dung Highlights
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tổng cộng {highlights.length} đoạn văn bản bạn đã tô màu đánh dấu trong bộ câu hỏi hiện tại.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card-saas p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm trong đoạn bôi đen..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
          />
        </div>

        <div className="flex space-x-2">
          {['', 'YELLOW', 'BLUE', 'GREEN', 'PINK'].map((col) => (
            <button
              key={col}
              onClick={() => setSelectedColor(col)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition ${
                selectedColor === col
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {col === '' ? 'Tất cả màu' : col}
            </button>
          ))}
        </div>
      </div>

      {/* Highlights List */}
      {highlights.length === 0 ? (
        <div className="card-saas p-12 text-center text-slate-500 space-y-3">
          <Highlighter className="w-10 h-10 mx-auto text-slate-300" />
          <div className="font-extrabold text-slate-700 text-sm">Chưa có đoạn text nào được bôi đen</div>
          <p className="text-xs text-slate-400">
            Trong màn hình Luyện tập, dùng chuột bôi đen bất kỳ đoạn văn bản nào để mở thanh chọn màu highlight.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {highlights.map((h: any) => {
            const colorBg =
              h.color === 'YELLOW'
                ? 'bg-yellow-100 text-yellow-950 border-yellow-300'
                : h.color === 'BLUE'
                ? 'bg-blue-100 text-blue-950 border-blue-300'
                : h.color === 'GREEN'
                ? 'bg-green-100 text-green-950 border-green-300'
                : 'bg-pink-100 text-pink-950 border-pink-300';

            return (
              <div
                key={h.id}
                onClick={() => setSelectedQuestionId(h.questionId)}
                className="card-saas p-5 space-y-3 cursor-pointer hover:border-amber-400/80 hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className={`font-extrabold px-2.5 py-0.5 rounded border ${colorBg}`}>
                    {h.color}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteHighlightMutation.mutate(h.id);
                    }}
                    className="text-slate-400 hover:text-red-600 font-extrabold flex items-center"
                    title="Xóa highlight"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" /> Xóa
                  </button>
                </div>

                <div className={`p-3 rounded-xl border font-bold text-sm leading-relaxed ${colorBg}`}>
                  "{h.selectedText}"
                </div>

                <div className="text-xs text-slate-500 border-t border-slate-100 pt-2 font-medium flex justify-between items-center">
                  <span><strong>Câu hỏi gốc:</strong> {h.question?.questionText}</span>
                  <span className="text-amber-600 font-extrabold text-[11px] group-hover:underline shrink-0 ml-2">
                    Xem chi tiết câu hỏi →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Question Detail Modal */}
      <QuestionDetailModal
        questionId={selectedQuestionId}
        onClose={() => setSelectedQuestionId(null)}
      />
    </div>
  );
}
