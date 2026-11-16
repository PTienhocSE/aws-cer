'use client';

import React, { useState, Suspense } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  FileText,
  Filter,
  HelpCircle,
  Layers,
  Play,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trash2,
  Trophy,
  XCircle,
  Check,
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

function formatDuration(seconds: number = 0) {
  if (!seconds || seconds <= 0) return '0 giây';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remainMins = mins % 60;
    return `${hours}h ${remainMins}p`;
  }
  return `${mins}p ${secs}s`;
}

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const urlStatus = searchParams.get('status');
  const urlTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'questions' | 'practice' | 'exam'>(
    urlTab === 'practice' || urlTab === 'exam' ? urlTab : 'questions'
  );
  const [statusFilter, setStatusFilter] = useState<string>(urlStatus || 'ANSWERED');
  const [selectedDomainId, setSelectedDomainId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [activeNoteQuestionId, setActiveNoteQuestionId] = useState<string | null>(null);
  const [isStartingPractice, setIsStartingPractice] = useState<boolean>(false);
  const [localMockExams, setLocalMockExams] = useState<any[]>([]);

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
    enabled: activeTab === 'questions',
  });

  const { data: practiceSessionsData, isLoading: practiceLoading, refetch: refetchPractice } = useQuery({
    queryKey: ['reviewPracticeSessions', currentBankId],
    queryFn: async () => {
      const url = currentBankId
        ? `/api/practice-sessions?questionBankId=${encodeURIComponent(currentBankId)}`
        : '/api/practice-sessions';
      const res = await fetch(url, { headers: { 'x-guest-mode': '1' }, credentials: 'include' });
      if (!res.ok) return { sessions: [] };
      return res.json();
    },
    enabled: activeTab === 'practice',
  });

  const { data: mockExamsData, isLoading: mockExamsLoading, refetch: refetchMockExams } = useQuery({
    queryKey: ['reviewMockExams', currentBankId],
    queryFn: async () => {
      const url = currentBankId
        ? `/api/mock-exams?questionBankId=${encodeURIComponent(currentBankId)}`
        : '/api/mock-exams';
      const res = await fetch(url, { headers: { 'x-guest-mode': '1' }, credentials: 'include' });
      if (!res.ok) return { attempts: [] };
      return res.json();
    },
    enabled: activeTab === 'exam',
  });

  // Load any local mock exams saved in localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const items: any[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('aws_cer_mock_exam_result_')) {
            const raw = localStorage.getItem(key);
            if (raw) {
              const parsed = JSON.parse(raw);
              if (parsed.attempt) {
                const a = parsed.attempt;
                let correctCount = 0;
                let incorrectCount = 0;
                let unansweredCount = 0;
                (a.answers || []).forEach((ans: any) => {
                  let parsedSelected: string[] = [];
                  try {
                    const rawSel = ans.selectedOptionIds;
                    parsedSelected = typeof rawSel === 'string' ? JSON.parse(rawSel) : rawSel || [];
                  } catch {
                    parsedSelected = [];
                  }
                  if (parsedSelected.length === 0) unansweredCount++;
                  else if (ans.isCorrect) correctCount++;
                  else incorrectCount++;
                });
                const total = a.totalQuestions || (a.answers?.length || 65);
                const accuracyRate = total > 0 ? Math.round((correctCount / total) * 100) : 0;
                items.push({
                  id: a.id,
                  isLocal: true,
                  questionBank: { name: 'Đề thi thử AWS SAA-C03 (Offline / Local)', version: 'v1.0' },
                  totalQuestions: total,
                  score: a.score ?? 720,
                  isPassed: a.isPassed ?? ((a.score ?? 0) >= 720),
                  isCompleted: true,
                  startedAt: a.submittedAt || new Date().toISOString(),
                  submittedAt: a.submittedAt || new Date().toISOString(),
                  timeSpentSeconds: a.timeSpentSeconds || 0,
                  correctCount,
                  incorrectCount,
                  unansweredCount,
                  accuracyRate,
                });
              }
            }
          }
        }
        setLocalMockExams(items);
      } catch {}
    }
  }, []);

  const serverMockAttempts: any[] = mockExamsData?.attempts || [];
  const combinedMockExams = React.useMemo(() => {
    const map = new Map<string, any>();
    serverMockAttempts.forEach((a) => map.set(a.id, a));
    localMockExams.forEach((a) => {
      if (!map.has(a.id)) map.set(a.id, a);
    });
    return Array.from(map.values()).sort(
      (a, b) => new Date(b.submittedAt || b.startedAt).getTime() - new Date(a.submittedAt || a.startedAt).getTime()
    );
  }, [serverMockAttempts, localMockExams]);

  const handleDeleteMockExam = async (id: string, isLocal?: boolean) => {
    if (!window.confirm('Bạn có chắc muốn xóa lịch sử bài thi thử này?')) return;
    try {
      if (isLocal || id.startsWith('local-')) {
        localStorage.removeItem(`aws_cer_mock_exam_result_${id}`);
        setLocalMockExams((prev) => prev.filter((item) => item.id !== id));
        toast.success('Đã xóa bài thi thử');
        return;
      }
      const res = await fetch(`/api/mock-exams/${id}`, {
        method: 'DELETE',
        headers: { 'x-guest-mode': '1' },
        credentials: 'include',
      });
      if (res.ok) {
        toast.success('Đã xóa bài thi thử');
        refetchMockExams();
      } else {
        toast.error('Không thể xóa bài thi');
      }
    } catch {
      toast.error('Lỗi khi xóa bài thi');
    }
  };

  const handleDeletePracticeSession = async (sessionId: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa phiên luyện tập này?')) return;
    try {
      const res = await fetch(`/api/practice-sessions/${sessionId}`, {
        method: 'DELETE',
        headers: { 'x-guest-mode': '1' },
        credentials: 'include',
      });
      if (res.ok) {
        toast.success('Đã xóa phiên luyện tập');
        refetchPractice();
      } else {
        toast.error('Không thể xóa phiên luyện tập');
      }
    } catch {
      toast.error('Lỗi khi xóa phiên');
    }
  };

  const handleStartNewPracticeSession = async () => {
    try {
      setIsStartingPractice(true);
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-guest-mode': '1' },
        credentials: 'include',
        body: JSON.stringify({
          mode: 'CUSTOM',
          questionBankId: currentBankId,
          limit: 15,
        }),
      });
      const data = await res.json();
      if (data.sessionId) {
        toast.success(`Đã tạo phiên luyện tập mới (${data.totalQuestions} câu)!`);
        router.push(`/practice/${data.sessionId}`);
      } else {
        toast.error(data.error || 'Không thể tạo phiên mới');
      }
    } catch {
      toast.error('Lỗi khi tạo phiên mới');
    } finally {
      setIsStartingPractice(false);
    }
  };

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
        toast.success(currentBookmarked ? 'Đã bỏ bookmark' : 'Đã bookmark câu hỏi');
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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
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
            Xem lại câu hỏi &amp; Luyện tập có định hướng
          </h1>
          <p className="text-xs text-slate-500 font-medium max-w-2xl">
            Lọc và xem lại toàn bộ câu hỏi đã làm, phân tích các lỗi sai, xem đáp án chuẩn cùng giải thích chi tiết, và bắt đầu phiên luyện tập củng cố ngay lập tức.
          </p>
        </div>

        {/* Practice CTA Buttons: strictly in 1 single row, aligned to the right, never wrapping */}
        <div className="flex items-center gap-2 flex-nowrap shrink-0 lg:ml-auto overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-3.5 py-2.5 font-extrabold text-xs rounded-xl border shadow-xs flex items-center justify-center transition active:scale-95 whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
            Lịch sử phiên
          </button>

          {stats.incorrect > 0 && (
            <button
              onClick={() => handleStartPractice('CUSTOM', 'INCORRECT', 25)}
              disabled={isStartingPractice}
              className="px-3.5 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-red-500/20 flex items-center justify-center transition active:scale-95 disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Target className="w-4 h-4 mr-1.5" />
              Luyện lại {stats.incorrect} câu SAI
            </button>
          )}

          <button
            onClick={() => handleStartPractice('CUSTOM', statusFilter === 'ALL' ? undefined : statusFilter, 20)}
            disabled={isStartingPractice || totalQuestions === 0}
            className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center transition active:scale-95 disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 mr-1.5 fill-white" />
            Luyện tập bộ lọc hiện tại
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'questions'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Câu hỏi ôn tập</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
              activeTab === 'questions' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {stats.answered}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'practice'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4 text-blue-500" />
          <span>Phiên luyện tập</span>
          {(practiceSessionsData?.sessions?.length || 0) > 0 && (
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                activeTab === 'practice' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {practiceSessionsData?.sessions?.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('exam')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'exam'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <CheckSquare className="w-4 h-4 text-amber-500" />
          <span>Phiên thi thử</span>
          {combinedMockExams.length > 0 && (
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                activeTab === 'exam' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {combinedMockExams.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab: Practice Sessions */}
      {activeTab === 'practice' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Lịch sử các phiên luyện tập</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Xem lại và tiếp tục các phiên luyện tập ôn thi đã tạo.
              </p>
            </div>
            <button
              onClick={handleStartNewPracticeSession}
              disabled={isStartingPractice}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center cursor-pointer disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 fill-slate-950" />
              Tạo phiên luyện tập mới (15 câu)
            </button>
          </div>

          {practiceLoading ? (
            <div className="py-20 text-center text-slate-400 text-xs font-bold">
              Đang tải lịch sử phiên luyện tập...
            </div>
          ) : (practiceSessionsData?.sessions || []).length === 0 ? (
            <div className="card-saas p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto text-blue-600 border border-blue-200">
                <Clock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">Chưa có phiên luyện tập nào</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Bắt đầu tạo một phiên luyện tập mới để ôn luyện từng câu có định hướng theo thuật toán lặp lại ngắt quãng SRS.
                </p>
              </div>
              <button
                onClick={handleStartNewPracticeSession}
                className="inline-flex items-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 mr-1.5 fill-white" />
                Bắt đầu luyện tập ngay
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(practiceSessionsData?.sessions || []).map((s: any) => {
                const isDone = s.isCompleted;
                return (
                  <div
                    key={s.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            isDone
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {isDone ? 'Đã hoàn thành' : `Đang làm (${s.answeredCount}/${s.totalQuestions})`}
                        </span>
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-slate-400 font-medium">
                            {new Date(s.createdAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <button
                            onClick={() => handleDeletePracticeSession(s.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Xóa phiên"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{s.title}</h3>
                      <div className="text-[11px] font-semibold text-slate-500">
                        {s.questionBank?.name || 'Ngân hàng SAA-C03'}
                      </div>
                    </div>

                    {/* Progress & Stats */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="text-slate-600 font-bold">
                          <span className="text-emerald-600 font-black">{s.correctCount} đúng</span> /{' '}
                          <span className="text-rose-600 font-black">{s.incorrectCount} sai</span>
                        </div>
                        {s.answeredCount > 0 && (
                          <div className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-black text-[11px]">
                            {s.accuracyRate}% đúng
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/practice/${s.id}`}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1 shadow-xs"
                      >
                        <span>{isDone ? 'Luyện lại' : 'Tiếp tục'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab: Mock Exam Sessions */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-500" />
                <span>Lịch sử các phiên thi thử AWS</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Toàn bộ các đề thi 65 câu bạn đã làm. Bấm vào bài thi để xem lại chi tiết đáp án và phân tích chuyên sâu.
              </p>
            </div>
            <Link
              href="/exam"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center cursor-pointer whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 fill-white" />
              Thi thử đề mới
            </Link>
          </div>

          {mockExamsLoading ? (
            <div className="py-20 text-center text-slate-400 text-xs font-bold">
              Đang tải lịch sử bài thi thử...
            </div>
          ) : combinedMockExams.length === 0 ? (
            <div className="card-saas p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-600 border border-amber-200">
                <CheckSquare className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">Chưa có phiên thi thử nào</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Làm bài thi thử 65 câu mô phỏng phòng thi thật để đánh giá năng lực và xem lại toàn bộ giải thích chi tiết tại đây.
                </p>
              </div>
              <Link
                href="/exam"
                className="inline-flex items-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition shadow-xs"
              >
                <Play className="w-3.5 h-3.5 mr-1.5 fill-white" />
                Bắt đầu thi thử ngay
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {combinedMockExams.map((exam: any) => {
                const isDone = exam.isCompleted;
                const isPassed = exam.isPassed ?? ((exam.score ?? 0) >= 720);
                const score = exam.score ?? 720;

                return (
                  <div
                    key={exam.id}
                    className={`p-5 rounded-2xl border transition space-y-4 flex flex-col justify-between ${
                      isDone
                        ? isPassed
                          ? 'bg-emerald-50/20 border-emerald-200'
                          : 'bg-red-50/20 border-red-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                              isDone
                                ? isPassed
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-red-100 text-red-800 border border-red-200'
                                : 'bg-amber-100 text-amber-900 border border-amber-200'
                            }`}
                          >
                            {isDone ? (
                              isPassed ? (
                                <>
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> PASSED (≥720)
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3 text-red-600" /> FAILED (&lt;720)
                                </>
                              )
                            ) : (
                              <>
                                <Clock className="w-3 h-3 text-amber-600" /> Đang thi
                              </>
                            )}
                          </span>
                          {exam.isLocal && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-md">
                              Offline
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-[11px] text-slate-400 font-medium">
                            {new Date(exam.submittedAt || exam.startedAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <button
                            onClick={() => handleDeleteMockExam(exam.id, exam.isLocal)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Xóa bài thi này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between gap-2">
                        <div>
                          <h3 className="text-sm font-extrabold text-slate-900 leading-snug">
                            {exam.questionBank?.name || 'Bài thi thử SAA-C03 (65 câu)'}
                          </h3>
                          <div className="text-[11px] font-semibold text-slate-500 mt-0.5 flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {formatDuration(exam.timeSpentSeconds)}
                            </span>
                            <span>•</span>
                            <span>{exam.totalQuestions} câu hỏi</span>
                          </div>
                        </div>

                        {isDone && (
                          <div className="text-right shrink-0">
                            <div className="text-[10px] uppercase font-bold text-slate-400">Điểm số</div>
                            <div
                              className={`text-2xl font-black ${isPassed ? 'text-emerald-600' : 'text-red-600'}`}
                            >
                              {score}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Stats & Link */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-600 font-bold">
                        <span className="text-emerald-600 font-black">{exam.correctCount} đúng</span>
                        <span>/</span>
                        <span className="text-red-600 font-black">{exam.incorrectCount} sai</span>
                        {exam.accuracyRate !== undefined && (
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-800 rounded font-black text-[10px]">
                            {exam.accuracyRate}%
                          </span>
                        )}
                      </div>

                      {isDone ? (
                        <Link
                          href={`/exam/${exam.id}/result`}
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1 shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>Xem lại & Giải thích</span>
                        </Link>
                      ) : (
                        <Link
                          href={`/exam/${exam.id}`}
                          className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center gap-1 shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-slate-950" />
                          <span>Làm tiếp</span>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab: Questions Review */}
      {activeTab === 'questions' && (
        <div className="space-y-6">

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
            <span className="flex items-center gap-1">
              <span>Đã Bookmark</span>
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            </span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
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
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Đã Bookmark</span>
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
                        Làm {userProg.attempts} lần (Đúng: {userProg.correctAttempts} / Sai: {userProg.incorrectAttempts})
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
                      <Star className="w-4 h-4 fill-current" />
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
