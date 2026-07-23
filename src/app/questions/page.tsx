'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  Bookmark,
  BookOpen,
  CheckCircle2,
  Filter,
  Play,
  Search,
  XCircle,
  FileText,
  Award,
  HelpCircle,
  RotateCcw,
  X,
  Highlighter,
  Sparkles,
  Eye,
} from 'lucide-react';
import QuestionNoteBox from '@/components/QuestionNoteBox';
import HighlightableText from '@/components/HighlightableText';
import MarkdownExplanation from '@/components/MarkdownExplanation';

async function fetchQuestions({ domainId, difficulty, status, search, page }: any) {
  const params = new URLSearchParams();
  if (domainId) params.append('domainId', domainId);
  if (difficulty) params.append('difficulty', difficulty);
  if (status) params.append('status', status);
  if (search) params.append('search', search);
  params.append('page', page.toString());
  params.append('limit', '10');

  const res = await fetch(`/api/questions?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

async function fetchSingleQuestion(id: string) {
  const res = await fetch(`/api/questions/${id}`);
  if (!res.ok) throw new Error('Failed to fetch question detail');
  return res.json();
}

async function fetchDomains() {
  const res = await fetch('/api/progress/domains');
  if (!res.ok) throw new Error('Failed to fetch domains');
  return res.json();
}

export default function QuestionBankPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [domainId, setDomainId] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['questions', { domainId, difficulty, status, search, page }],
    queryFn: () => fetchQuestions({ domainId, difficulty, status, search, page }),
  });

  const { data: detailData, isLoading: isDetailLoading } = useQuery({
    queryKey: ['questionDetail', selectedQuestionId],
    queryFn: () => fetchSingleQuestion(selectedQuestionId!),
    enabled: !!selectedQuestionId,
  });

  const { data: domainsData } = useQuery({
    queryKey: ['domains'],
    queryFn: fetchDomains,
  });

  const toggleBookmarkMutation = useMutation({
    mutationFn: async (questionId: string) => {
      const res = await fetch(`/api/questions/${questionId}/bookmark`, { method: 'POST' });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['questionDetail'] });
    },
  });

  const handleStartPracticeFiltered = async () => {
    try {
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domainId, difficulty, status, limit: 15 }),
      });
      const result = await res.json();
      if (result.sessionId) {
        router.push(`/practice/${result.sessionId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const selectedQuestion = detailData?.question;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Ngân hàng câu hỏi</h1>
          <p className="text-xs text-slate-500">
            Click vào câu hỏi bất kỳ để xem giải thích, tô màu highlight và lưu ghi chú cá nhân
          </p>
        </div>

        <button
          onClick={handleStartPracticeFiltered}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition flex items-center"
        >
          <Play className="w-4 h-4 mr-1.5 fill-slate-950" /> Bắt đầu luyện tập từ bộ lọc này
        </button>
      </div>

      {/* Filter & Quick Tabs Bar */}
      <div className="card-saas p-4 sm:p-5 space-y-4">
        {/* Quick Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-100">
          {[
            { key: 'ALL', label: 'Tất cả câu hỏi' },
            { key: 'UNANSWERED', label: 'Chưa làm (Chưa học)' },
            { key: 'ANSWERED', label: 'Đã làm (Đã học)' },
            { key: 'INCORRECT', label: 'Đã từng làm sai' },
            { key: 'BOOKMARKED', label: 'Đã đánh dấu' },
            { key: 'MASTERED', label: 'Đã thành thạo' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setStatus(tab.key);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${
                status === tab.key
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search & Select Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Tìm kiếm từ khóa câu hỏi..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <select
            value={domainId}
            onChange={(e) => {
              setDomainId(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Tất cả Domains</option>
            {domainsData?.domains?.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.code}: {d.name}
              </option>
            ))}
          </select>

          <select
            value={difficulty}
            onChange={(e) => {
              setDifficulty(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Tất cả độ khó</option>
            <option value="EASY">Dễ (Easy)</option>
            <option value="MEDIUM">Trung bình (Medium)</option>
            <option value="HARD">Khó (Hard)</option>
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="UNANSWERED">Chưa làm (Chưa học)</option>
            <option value="ANSWERED">Đã làm (Đã học)</option>
            <option value="INCORRECT">Đã từng làm sai</option>
            <option value="BOOKMARKED">Đã đánh dấu</option>
            <option value="MASTERED">Đã thành thạo</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      {isLoading ? (
        <div className="text-center py-12 text-slate-400 text-sm font-semibold">Đang tải danh sách câu hỏi...</div>
      ) : data?.questions?.length === 0 ? (
        <div className="text-center py-12 card-saas text-slate-500 text-sm">
          Không tìm thấy câu hỏi phù hợp với bộ lọc.
        </div>
      ) : (
        <div className="space-y-4">
          {data?.questions?.map((q: any, idx: number) => (
            <div
              key={q.id}
              onClick={() => setSelectedQuestionId(q.id)}
              className="card-saas p-5 space-y-4 cursor-pointer hover:border-amber-400/80 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md">
                    #{q.rawId || idx + 1}
                  </span>

                  {/* Learned / Unlearned Visual Status Badge */}
                  {q.userProgress ? (
                    q.userProgress.lastAnswerCorrect ? (
                      <span className="inline-flex items-center text-[11px] font-extrabold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        Đã học (Trả lời đúng)
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-[11px] font-extrabold px-2.5 py-0.5 bg-red-50 text-red-700 rounded-md border border-red-200">
                        <XCircle className="w-3.5 h-3.5 mr-1 text-red-600" />
                        Đã học (Trả lời sai)
                      </span>
                    )
                  ) : (
                    <span className="inline-flex items-center text-[11px] font-extrabold px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md border border-slate-200">
                      <HelpCircle className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      Chưa làm (Chưa học)
                    </span>
                  )}

                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-amber-50 text-amber-900 rounded-md border border-amber-200">
                    {q.domainName}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">
                    {q.difficulty}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmarkMutation.mutate(q.id);
                    }}
                    className={`p-1.5 rounded-lg transition shrink-0 ${
                      q.isBookmarked
                        ? 'text-amber-500 bg-amber-50'
                        : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
                    }`}
                    title="Đánh dấu câu hỏi"
                  >
                    <Bookmark className={`w-4 h-4 ${q.isBookmarked ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-900 leading-relaxed group-hover:text-slate-950 transition">
                {q.question}
              </p>

              <div className="space-y-1.5 pl-3 border-l-2 border-slate-200">
                {q.options.map((opt: any) => (
                  <div key={opt.id} className="text-xs text-slate-600 flex items-start space-x-2">
                    <span className="font-bold text-slate-400">•</span>
                    <span>{opt.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 flex justify-between items-center text-xs text-slate-500 border-t border-slate-100">
                <div className="flex items-center space-x-3">
                  {q.userProgress ? (
                    <span className="text-slate-600 font-medium">
                      Đã làm <strong>{q.userProgress.attempts}</strong> lần
                    </span>
                  ) : (
                    <span className="text-slate-400">Chưa có lịch sử làm bài</span>
                  )}
                  {q.userNote && (
                    <span className="text-indigo-600 font-semibold flex items-center">
                      <FileText className="w-3.5 h-3.5 mr-1" /> Có ghi chú
                    </span>
                  )}
                </div>

                <span className="text-xs font-extrabold text-amber-600 group-hover:translate-x-0.5 transition-transform flex items-center">
                  <Eye className="w-3.5 h-3.5 mr-1" /> Xem chi tiết & Ghi chú
                </span>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-between items-center pt-4">
            <span className="text-xs text-slate-500">
              Trang {data.page} / {data.totalPages} (Tổng {data.total} câu)
            </span>
            <div className="flex space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3.5 py-1.5 bg-white border border-slate-200 text-xs font-bold rounded-xl disabled:opacity-50"
              >
                Trang trước
              </button>
              <button
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3.5 py-1.5 bg-white border border-slate-200 text-xs font-bold rounded-xl disabled:opacity-50"
              >
                Trang sau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Question Detail Modal using React Portal directly into document.body */}
      {mounted && selectedQuestionId && createPortal(
        <div
          onClick={() => setSelectedQuestionId(null)}
          className="fixed top-0 left-0 right-0 bottom-0 inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto m-0"
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
                  onClick={() => setSelectedQuestionId(null)}
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

                  {/* Personal Auto-Saving Note Box */}
                  <div className="pt-2">
                    <QuestionNoteBox
                      questionId={selectedQuestion.id}
                      initialNote={selectedQuestion.userNote}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer Tip Bar */}
            <div className="px-5 py-2.5 border-t border-slate-100 bg-slate-50/90 text-center text-xs text-slate-500 font-medium">
              Mẹo: Bạn có thể tô màu bôi đen từ khóa và ghi chú lưu tự động vào DB. Bấm biểu tượng ✖ góc trên để đóng.
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
