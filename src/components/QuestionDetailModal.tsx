'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bookmark, X, Highlighter, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import HighlightableText from '@/components/HighlightableText';
import MarkdownExplanation from '@/components/MarkdownExplanation';

interface QuestionDetailModalProps {
  questionId: string | null;
  onClose: () => void;
}

export default function QuestionDetailModal({ questionId, onClose }: QuestionDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: detailData, isLoading: isDetailLoading } = useQuery({
    queryKey: ['questionDetail', questionId],
    queryFn: async () => {
      if (!questionId) return null;
      const res = await fetch(`/api/questions/${questionId}`);
      if (!res.ok) throw new Error('Fetch question detail failed');
      return res.json();
    },
    enabled: !!questionId,
  });

  const toggleBookmarkMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/questions/${id}/bookmark`, { method: 'POST' });
      if (!res.ok) throw new Error('Toggle bookmark failed');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['questionDetail', questionId] });
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['highlights'] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success(data.isBookmarked ? 'Đã đánh dấu câu hỏi!' : 'Đã bỏ đánh dấu.');
    },
  });

  if (!mounted || !questionId) return null;

  const selectedQuestion = detailData?.question;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed top-0 left-0 right-0 bottom-0 inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto m-0 animate-in fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col my-auto"
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/90 gap-2">
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="text-xs font-extrabold px-3 py-1 bg-amber-500 text-slate-950 rounded-lg whitespace-nowrap shrink-0">
              Câu #{selectedQuestion?.rawId || 'Chi tiết'}
            </span>
            {selectedQuestion && (
              <span className="text-xs font-extrabold px-2.5 py-1 bg-slate-200 text-slate-800 rounded-lg whitespace-nowrap shrink-0 truncate max-w-[200px] sm:max-w-none">
                {selectedQuestion.domainName}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            {selectedQuestion && (
              <button
                onClick={() => toggleBookmarkMutation.mutate(selectedQuestion.id)}
                className={`p-2 rounded-xl border transition ${
                  selectedQuestion.isBookmarked
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'
                }`}
                title="Đánh dấu câu hỏi"
              >
                <Bookmark className={`w-4 h-4 ${selectedQuestion.isBookmarked ? 'fill-amber-500' : ''}`} />
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200/80 rounded-xl transition"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {isDetailLoading || !selectedQuestion ? (
            <div className="py-12 text-center text-slate-400 text-sm font-semibold">
              Đang tải chi tiết câu hỏi...
            </div>
          ) : (
            <div className="space-y-6">
              {/* Question Text with Interactive Highlightable Text */}
              <div className="space-y-2">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center">
                  <Highlighter className="w-3.5 h-3.5 mr-1 text-pink-500" /> Tô màu Highlight (Bôi đen từ khóa để tô màu):
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl">
                  <HighlightableText
                    questionId={selectedQuestion.id}
                    text={selectedQuestion.questionText}
                    highlights={selectedQuestion.highlights}
                    onHighlightCreated={() => {
                      queryClient.invalidateQueries({ queryKey: ['questionDetail', selectedQuestion.id] });
                      queryClient.invalidateQueries({ queryKey: ['highlights'] });
                    }}
                  />
                </div>
              </div>

              {/* Options List */}
              <div className="space-y-2.5">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                  Danh sách Đáp án:
                </div>
                <div className="space-y-2">
                  {selectedQuestion.options.map((opt: any, idx: number) => {
                    const letter = String.fromCharCode(65 + idx);
                    const isCorrect = opt.isCorrect;

                    return (
                      <div
                        key={opt.id}
                        className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-medium flex items-start space-x-3 ${
                          isCorrect
                            ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 font-bold'
                            : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                            isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {letter}
                        </span>
                        <div className="flex-1">
                          <span>{opt.text}</span>
                          {isCorrect && (
                            <span className="ml-2 text-xs text-emerald-700 font-extrabold">
                              ✓ Đáp án đúng
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Explanation Rendered with Markdown Component */}
              {selectedQuestion.explanationText && (
                <div className="space-y-2">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-500" /> Giải thích chi tiết:
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <MarkdownExplanation content={selectedQuestion.explanationText} theme="light" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/90 text-right">
          <span className="text-[11px] text-slate-400 font-medium italic">
            Mẹo: Bạn có thể tô màu bôi đen từ khóa và ghi chú lưu tự động vào DB. Bấm biểu tượng ✕ góc trên để đóng.
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
