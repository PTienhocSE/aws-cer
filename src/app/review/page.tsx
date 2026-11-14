'use client';

import React, { useState, Suspense } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Play,
  Filter,
  Search,
  Sparkles,
  Target,
  ShieldAlert,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Zap,
  ArrowRight,
  HelpCircle,
  Layers,
  ArrowLeft,
  Check,
  Clock,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import HighlightableText from '@/components/HighlightableText';
import MarkdownExplanation from '@/components/MarkdownExplanation';
import QuestionNoteBox from '@/components/QuestionNoteBox';

async function fetchOverview() {
  const res = await fetch('/api/progress/overview', {
    headers: { 'x-guest-mode': '1' },
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchDomains(bankId?: string | null) {
  const url = bankId ? `/api/progress/domains?questionBankId=${encodeURIComponent(bankId)}` : '/api/progress/domains';
  const res = await fetch(url, {
    headers: { 'x-guest-mode': '1' },
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
}

async function fetchQuestions(params: {
  status: string;
  domainId?: string;
  search?: string;
  page: number;
  limit: number;
  questionBankId?: string | null;
}) {
  const sp = new URLSearchParams();
  if (params.status) sp.set('status', params.status);
  if (params.domainId) sp.set('domainId', params.domainId);
  if (params.search) sp.set('search', params.search);
  if (params.page) sp.set('page', String(params.page));
  if (params.limit) sp.set('limit', String(params.limit));
  if (params.questionBankId) sp.set('questionBankId', params.questionBankId);

  const res = await fetch(`/api/questions?${sp.toString()}`, {
    headers: { 'x-guest-mode': '1' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const urlStatus = searchParams.get('status');
  const [statusFilter, setStatusFilter] = useState<string>(urlStatus || 'ANSWERED');
  const [selectedDomainId, setSelectedDomainId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeNoteQuestionId, setActiveNoteQuestionId] = useState<string | null>(null);
  const [isStartingPractice, setIsStartingPractice] = useState<boolean>(false);

  const { data: overview } = useQuery({
    queryKey: ['progressOverview', user?.activeQuestionBankId],
    queryFn: () => fetchOverview(),
  });

  const currentBankId = overview?.activeQuestionBankId || user?.activeQuestionBankId;

  const { data: domainsData } = useQuery({
    queryKey: ['progressDomains', currentBankId],
    queryFn: () => fetchDomains(currentBankId),
    enabled: !!currentBankId,
  });

  const { data: questionsData, isLoading: questionsLoading, refetch } = useQuery({
    queryKey: ['reviewQuestions', currentBankId, statusFilter, selectedDomainId, searchQuery, page, limit],
    queryFn: () =>
      fetchQuestions({
        status: statusFilter,
        domainId: selectedDomainId || undefined,
        search: searchQuery || undefined,
        page,
        limit,
        questionBankId: currentBankId,
      }),
  });

  const stats = questionsData?.stats || {
    answered: 0,
    correct: 0,
    incorrect: 0,
    bookmarked: 0,
  };

  const accuracyRate = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    if (!questionsData?.questions) return;
    if (expandedIds.size === questionsData.questions.length) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(questionsData.questions.map((q: any) => q.id)));
    }
  };

  const handleStartPractice = async (mode: string, status?: string, limitCount: number = 15) => {
    try {
      setIsStartingPractice(true);
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-guest-mode': '1' },
        credentials: 'include',
        body: JSON.stringify({
          mode,
          status,
          domainId: selectedDomainId || undefined,
          questionBankId: currentBankId,
          limit: limitCount,
        }),
      });
      const data = await res.json();
      if (data.sessionId) {
        toast.success(`Bắt đầu phiên luyện tập ${data.totalQuestions} câu!`);
        router.push(`/practice/${data.sessionId}`);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (e) {
      console.error(e);
      toast.error('Không thể tạo phiên luyện tập');
    } finally {
      setIsStartingPractice(false);
    }
  };

  const handlePracticeSingleQuestion = async (questionId: string) => {
    try {
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-guest-mode': '1' },
        credentials: 'include',
        body: JSON.stringify({
          mode: 'CUSTOM',
          questionIds: [questionId],
          questionBankId: currentBankId,
          limit: 1,
        }),
      });
      const data = await res.json();
      if (data.sessionId) {
        router.push(`/practice/${data.sessionId}`);
      }
    } catch (e) {
      console.error(e);
      toast.error('Không thể khởi tạo câu hỏi này');
    }
  };

  const handleToggleBookmark = async (questionId: string, currentBookmarked: boolean) => {
    try {
      const res = await fetch(`/api/questions/${questionId}/bookmark`, {
        method: 'POST',
        headers: { 'x-guest-mode': '1' },
        credentials: 'include',
      });
      if (res.ok) {
        toast.success(currentBookmarked ? 'Đã bỏ bookmark' : 'Đã bookmark câu hỏi ⭐');
        refetch();
      }
    } catch {
      toast.error('Lỗi khi bookmark');
    }
  };

  const questions = questionsData?.questions || [];
  const totalQuestions = questionsData?.total || 0;
  const totalPages = questionsData?.totalPages || 1;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-amber-600">
            <RotateCcw className="w-4 h-4" />
            <span>Trung tâm Ôn tập & Phân tích</span>
            {overview?.activeCertification && (
              <span className="px-2 py-0.5 bg-slate-900 text-amber-400 rounded-md text-[10px]">
                {overview.activeCertification.code}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Xem lại câu hỏi & Luyện tập có định hướng
          </h1>
          <p className="text-xs text-slate-500 font-medium max-w-2xl">
            Lọc và xem lại toàn bộ câu hỏi đã làm, phân tích các lỗi sai, xem đáp án chuẩn cùng giải thích chi tiết, và bắt đầu phiên luyện tập củng cố ngay lập tức.
          </p>
        </div>

        {/* Practice CTA Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <Link
            href="/practice"
            className="flex-1 md:flex-none px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-xl border border-slate-200 shadow-xs flex items-center justify-center transition active:scale-95"
          >
            <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
            Lịch sử phiên
          </Link>

          {stats.incorrect > 0 && (
            <button
              onClick={() => handleStartPractice('CUSTOM', 'INCORRECT', 25)}
              disabled={isStartingPractice}
              className="flex-1 md:flex-none px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-red-500/20 flex items-center justify-center transition active:scale-95 disabled:opacity-50"
            >
              <Target className="w-4 h-4 mr-1.5" />
              Luyện lại {stats.incorrect} câu SAI
            </button>
          )}

          <button
            onClick={() => handleStartPractice('CUSTOM', statusFilter === 'ALL' ? undefined : statusFilter, 20)}
            disabled={isStartingPractice || totalQuestions === 0}
            className="flex-1 md:flex-none px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center transition active:scale-95 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 mr-1.5 fill-white" />
            Luyện tập bộ lọc hiện tại
          </button>
        </div>
      </div>

      {/* Metric Stats Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => {
            setStatusFilter('ANSWERED');
            setPage(1);
          }}
          className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer ${
            statusFilter === 'ANSWERED'
              ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-400/40'
              : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Tổng câu đã làm</span>
            <BookOpen className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{stats.answered}</span>
            <span className="text-xs text-slate-400 font-semibold">
              / {overview?.stats?.totalQuestions || 1019} câu
            </span>
          </div>
          <div className="text-[11px] font-bold text-amber-700 mt-1">
            Đạt {overview?.stats?.totalQuestions ? Math.round((stats.answered / overview.stats.totalQuestions) * 100) : 0}% ngân hàng
          </div>
        </div>

        <div
          onClick={() => {
            setStatusFilter('CORRECT');
            setPage(1);
          }}
          className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer ${
            statusFilter === 'CORRECT'
              ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-400/40'
              : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Đã làm ĐÚNG</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">{stats.correct}</span>
            <span className="text-xs text-emerald-700 font-bold">({accuracyRate}% đúng)</span>
          </div>
          <div className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            Nắm vững kiến thức
          </div>
        </div>

        <div
          onClick={() => {
            setStatusFilter('INCORRECT');
            setPage(1);
          }}
          className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer ${
            statusFilter === 'INCORRECT'
              ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-400/40'
              : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Cần sửa SAI</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-600">{stats.incorrect}</span>
            <span className="text-xs text-rose-500 font-bold">
              ({stats.answered > 0 ? 100 - accuracyRate : 0}% sai)
            </span>
          </div>
          <div className="text-[11px] font-semibold text-rose-700 mt-1 flex items-center">
            <ShieldAlert className="w-3.5 h-3.5 mr-1" />
            Tập trung ôn luyện lại
          </div>
        </div>

        <div
          onClick={() => {
            setStatusFilter('BOOKMARKED');
            setPage(1);
          }}
          className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer ${
            statusFilter === 'BOOKMARKED'
              ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/40'
              : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Đã Bookmark ⭐</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{stats.bookmarked}</span>
            <span className="text-xs text-slate-500 font-semibold">câu quan trọng</span>
          </div>
          <div className="text-[11px] font-semibold text-slate-600 mt-1">
            Các câu hỏi đã đánh dấu
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="card-saas p-4 sm:p-5 space-y-4">
        {/* Status Pill Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                setStatusFilter('ANSWERED');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                statusFilter === 'ANSWERED'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>Tất cả đã làm</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                statusFilter === 'ANSWERED' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {stats.answered}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter('INCORRECT');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                statusFilter === 'INCORRECT'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Câu làm SAI</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                statusFilter === 'INCORRECT' ? 'bg-white/20 text-white' : 'bg-rose-200 text-rose-800'
              }`}>
                {stats.incorrect}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter('CORRECT');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                statusFilter === 'CORRECT'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Câu làm ĐÚNG</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                statusFilter === 'CORRECT' ? 'bg-white/20 text-white' : 'bg-emerald-200 text-emerald-800'
              }`}>
                {stats.correct}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter('BOOKMARKED');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                statusFilter === 'BOOKMARKED'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Bookmark ⭐</span>
              <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                statusFilter === 'BOOKMARKED' ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-200 text-amber-900'
              }`}>
                {stats.bookmarked}
              </span>
            </button>

            <button
              onClick={() => {
                setStatusFilter('ALL');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                statusFilter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Toàn bộ ngân hàng
            </button>
          </div>

          <button
            onClick={expandAll}
            className="text-xs font-extrabold text-amber-700 hover:text-amber-800 flex items-center gap-1 shrink-0"
          >
            {expandedIds.size > 0 && expandedIds.size === questions.length ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" /> Thu gọn tất cả
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" /> Mở rộng tất cả đáp án
              </>
            )}
          </button>
        </div>

        {/* Domain & Search Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Domain Dropdown */}
          <div className="w-full sm:w-64 shrink-0">
            <select
              value={selectedDomainId}
              onChange={(e) => {
                setSelectedDomainId(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Tất cả 4 Domains</option>
              {domainsData?.domains?.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.code?.replace(/_/g, ' ').replace(/\s*(DUMP|UDEMY|390Q)$/i, '') || d.code} — {d.name} ({d.totalQuestions} câu)
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo từ khóa (dịch vụ AWS, câu hỏi, giải thích...)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          {/* Page Limit */}
          <div className="flex items-center gap-1.5 shrink-0 text-xs font-bold text-slate-500">
            <span>Hiển thị:</span>
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      {questionsLoading ? (
        <div className="py-24 text-center text-slate-500 font-bold text-sm">
          Đang tải danh sách câu hỏi...
        </div>
      ) : questions.length === 0 ? (
        <div className="card-saas p-16 text-center space-y-4">
          <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500 border border-amber-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900">Không tìm thấy câu hỏi nào</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {statusFilter === 'INCORRECT'
                ? 'Tuyệt vời! Bạn không có câu hỏi nào bị làm sai trong danh mục này.'
                : statusFilter === 'ANSWERED'
                ? 'Bạn chưa làm câu hỏi nào trong bộ đề này. Hãy bắt đầu luyện tập một vài câu nhé!'
                : 'Thử đổi bộ lọc Domain hoặc từ khóa tìm kiếm để xem các câu hỏi khác.'}
            </p>
          </div>
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setSelectedDomainId('');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-xs"
          >
            Xem tất cả câu hỏi
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q: any, index: number) => {
            const isExpanded = expandedIds.has(q.id);
            const userProg = q.userProgress;
            const hasAnswered = userProg && userProg.attempts > 0;
            const lastCorrect = userProg?.lastAnswerCorrect;

            const domainCodeClean = q.domainCode
              ? q.domainCode.replace(/_/g, ' ').replace(/\s*(DUMP|UDEMY|390Q)$/i, '')
              : 'DOMAIN';

            return (
              <div
                key={q.id}
                className={`card-saas p-5 sm:p-6 space-y-4 transition-all duration-200 border ${
                  hasAnswered
                    ? lastCorrect
                      ? 'border-emerald-200/90 hover:border-emerald-300'
                      : 'border-rose-200/90 hover:border-rose-300'
                    : 'border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {/* Question Header Card */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-black px-2.5 py-0.5 bg-slate-900 text-amber-400 rounded-md">
                      {domainCodeClean}
                    </span>
                    <span className="text-xs font-black text-slate-700">
                      Câu #{q.rawId ? q.rawId : (page - 1) * limit + index + 1}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 truncate max-w-xs sm:max-w-md">
                      • {q.domainName}
                    </span>
                  </div>

                  {/* Badges & Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {hasAnswered ? (
                      lastCorrect ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          Đã làm: ĐÚNG
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5 mr-1 text-rose-600" />
                          Đã làm: SAI
                        </span>
                      )
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        Chưa làm
                      </span>
                    )}

                    {userProg && userProg.attempts > 0 && (
                      <span className="text-[10px] font-bold text-slate-400 px-2 py-0.5 bg-slate-50 rounded border border-slate-100">
                        Làm {userProg.attempts} lần ({userProg.correctAttempts}✓ {userProg.incorrectAttempts}✗)
                      </span>
                    )}

                    {/* Bookmark Toggle Button */}
                    <button
                      onClick={() => handleToggleBookmark(q.id, q.isBookmarked)}
                      title={q.isBookmarked ? 'Bỏ bookmark' : 'Bookmark câu hỏi'}
                      className={`p-1.5 rounded-lg border transition ${
                        q.isBookmarked
                          ? 'bg-amber-50 border-amber-300 text-amber-600'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-300'
                      }`}
                    >
                      <Award className="w-4 h-4 fill-current" />
                    </button>

                    {/* Quick Note Toggle */}
                    <button
                      onClick={() =>
                        setActiveNoteQuestionId(activeNoteQuestionId === q.id ? null : q.id)
                      }
                      title="Ghi chú cá nhân"
                      className={`p-1.5 rounded-lg border transition ${
                        q.userNote
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-500 hover:border-indigo-300'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Body */}
                <div className="text-sm font-semibold text-slate-800 leading-relaxed pt-1">
                  <HighlightableText
                    questionId={q.id}
                    text={q.question}
                    highlights={q.highlights}
                    onHighlightCreated={refetch}
                  />
                </div>

                {/* Question Note Box (if open) */}
                {activeNoteQuestionId === q.id && (
                  <div className="pt-2">
                    <QuestionNoteBox
                      questionId={q.id}
                      initialNote={q.userNote || ''}
                      onSaved={() => {
                        refetch();
                        setActiveNoteQuestionId(null);
                      }}
                    />
                  </div>
                )}

                {/* Action Bar (Expand + Practice) */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="text-xs font-black text-amber-700 hover:text-amber-800 flex items-center gap-1.5 transition"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Thu gọn đáp án</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Xem đáp án & giải thích chi tiết</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handlePracticeSingleQuestion(q.id)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-slate-800" />
                    <span>Luyện riêng câu này</span>
                  </button>
                </div>

                {/* Expanded Details: Options + Markdown Explanation */}
                {isExpanded && (
                  <div className="pt-3 space-y-4 animate-in fade-in duration-200">
                    {/* Options List */}
                    <div className="space-y-2">
                      <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                        Lựa chọn đáp án:
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options?.map((opt: any, optIdx: number) => {
                          const letter = String.fromCharCode(65 + optIdx);
                          const isCorrect = opt.isCorrect;

                          return (
                            <div
                              key={opt.id}
                              className={`p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-start gap-3 transition ${
                                isCorrect
                                  ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-bold shadow-xs'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                  isCorrect
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {letter}
                              </span>
                              <div className="flex-1 pt-0.5 leading-relaxed">{opt.text}</div>
                              {isCorrect && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-600 text-white shrink-0 self-center">
                                  <Check className="w-3 h-3 mr-0.5" /> Đáp án đúng
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detailed Explanation */}
                    {q.explanation && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-amber-200/80 space-y-2">
                        <div className="flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-amber-800">
                          <Sparkles className="w-4 h-4 text-amber-600" />
                          <span>Giải thích chi tiết chuẩn AWS:</span>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                          <MarkdownExplanation content={q.explanation} theme="light" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs text-xs font-bold text-slate-600">
          <div>
            Trang <span className="text-slate-900 font-black">{page}</span> / {totalPages} (Tổng{' '}
            {totalQuestions} câu)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl disabled:opacity-40 transition"
            >
              Trang trước
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl disabled:opacity-40 transition"
            >
              Trang sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-500 font-bold text-sm">
          Đang chuẩn bị Trung tâm Ôn tập...
        </div>
      }
    >
      <ReviewContent />
    </Suspense>
  );
}
