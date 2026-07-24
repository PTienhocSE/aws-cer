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
import QuestionDetailModal from '@/components/QuestionDetailModal';

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

      {/* Interactive Question Detail Modal Component */}
      <QuestionDetailModal
        questionId={selectedQuestionId}
        onClose={() => setSelectedQuestionId(null)}
      />
    </div>
  );
}
