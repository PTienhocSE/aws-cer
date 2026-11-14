'use client';

import { useState, useEffect, useCallback, use, Suspense } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Target,
  FileText,
  Sparkles,
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  Award,
  Check,
  Clock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import HighlightableText from '@/components/HighlightableText';
import MarkdownExplanation from '@/components/MarkdownExplanation';
import QuestionNoteBox from '@/components/QuestionNoteBox';

async function fetchPracticeSession(id: string) {
  const res = await fetch(`/api/practice-sessions/${id}`, {
    headers: { 'x-guest-mode': '1' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch session');
  return res.json();
}

async function fetchSessionQuestions(id: string) {
  const res = await fetch(`/api/practice-sessions/${id}/questions`, {
    headers: { 'x-guest-mode': '1' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

interface QuestionState {
  selectedOptionIds: string[];
  submittedOptionIds: string[];
  correctOptionIds: string[];
  isSubmitted: boolean;
  explanation: string | null;
}

function PracticeSessionContent({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.id;
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const modeParam = searchParams.get('mode');

  const [currentIndex, setCurrentIndex] = useState(0);
  // Per-question state map: key = questionId
  const [qStateMap, setQStateMap] = useState<Record<string, QuestionState>>({});
  const [initialized, setInitialized] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [viewMode, setViewMode] = useState<'PRACTICE' | 'REVIEW'>(
    modeParam === 'review' ? 'REVIEW' : 'PRACTICE'
  );
  const [activeReviewNoteId, setActiveReviewNoteId] = useState<string | null>(null);
  const [isStartingNextBatch, setIsStartingNextBatch] = useState(false);

  useEffect(() => {
    if (modeParam === 'review') {
      setViewMode('REVIEW');
    }
  }, [modeParam]);

  const [noteContent, setNoteContent] = useState('');
  const [noteStatus, setNoteStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const { data: questionsData, isLoading: questionsLoading } = useQuery({
    queryKey: ['practiceQuestions', sessionId],
    queryFn: () => fetchSessionQuestions(sessionId),
  });

  const currentQuestion = questionsData?.questions?.[currentIndex];

  // Initialize: set already-answered questions from DB or localStorage, jump to first unanswered
  useEffect(() => {
    if (!questionsData?.questions || initialized) return;

    let localAnswers: Record<string, any> = {};
    try {
      localAnswers = JSON.parse(localStorage.getItem(`aws_cer_session_${sessionId}_answers`) || '{}');
    } catch {}

    const initMap: Record<string, QuestionState> = {};
    let firstUnanswered = 0;

    questionsData.questions.forEach((q: any, idx: number) => {
      const local = localAnswers[q.id];
      const isAnswered = q.isAnswered || !!local;

      if (isAnswered) {
        const correctIds =
          q.correctOptionIds && q.correctOptionIds.length > 0
            ? q.correctOptionIds
            : q.options.filter((o: any) => o.isCorrect).map((o: any) => o.id);

        const submittedIds =
          local?.selectedOptionIds?.length > 0
            ? local.selectedOptionIds
            : q.userSelectedOptionIds?.length > 0
            ? q.userSelectedOptionIds
            : correctIds;

        initMap[q.id] = {
          selectedOptionIds: submittedIds,
          submittedOptionIds: submittedIds,
          correctOptionIds: correctIds,
          isSubmitted: true,
          explanation: q.explanation || null,
        };
      } else {
        if (firstUnanswered === 0 && idx > 0) firstUnanswered = idx;
        initMap[q.id] = {
          selectedOptionIds: [],
          submittedOptionIds: [],
          correctOptionIds: [],
          isSubmitted: false,
          explanation: null,
        };
      }
    });

    // Jump to first unanswered question
    const firstUnansweredIdx = questionsData.questions.findIndex(
      (q: any) => !q.isAnswered && !localAnswers[q.id]
    );
    setCurrentIndex(firstUnansweredIdx >= 0 ? firstUnansweredIdx : 0);
    setQStateMap(initMap);
    setInitialized(true);
  }, [questionsData, initialized, sessionId]);

  // Note content per question
  useEffect(() => {
    if (currentQuestion?.userNote) {
      setNoteContent(currentQuestion.userNote);
    } else {
      setNoteContent('');
    }
    setNoteStatus('idle');
  }, [currentIndex, currentQuestion?.id]);

  const saveNoteMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await fetch(`/api/questions/${currentQuestion.id}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error('Save note failed');
      return res.json();
    },
    onSuccess: () => {
      setNoteStatus('saved');
    },
    onError: () => {
      setNoteStatus('error');
    },
  });

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
    setNoteStatus('saving');
  };

  useEffect(() => {
    if (noteStatus !== 'saving' || !currentQuestion) return;
    const handler = setTimeout(() => {
      saveNoteMutation.mutate(noteContent);
    }, 1000);
    return () => clearTimeout(handler);
  }, [noteContent, noteStatus, currentQuestion?.id]);

  const toggleBookmarkMutation = useMutation({
    mutationFn: async () => {
      if (!currentQuestion) return;
      const res = await fetch(`/api/questions/${currentQuestion.id}/bookmark`, { method: 'POST' });
      if (!res.ok) throw new Error('Toggle bookmark failed');
      return res.json();
    },
    onMutate: async () => {
      // Optimistically update bookmark state in local query cache
      if (!currentQuestion) return;
      const nextState = !currentQuestion.isBookmarked;
      queryClient.setQueryData(['practiceQuestions', sessionId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          questions: old.questions.map((q: any) =>
            q.id === currentQuestion.id ? { ...q, isBookmarked: nextState } : q
          ),
        };
      });
      return { previousState: currentQuestion.isBookmarked };
    },
    onSuccess: (data) => {
      if (data?.isBookmarked !== undefined) {
        queryClient.setQueryData(['practiceQuestions', sessionId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            questions: old.questions.map((q: any) =>
              q.id === currentQuestion.id ? { ...q, isBookmarked: data.isBookmarked } : q
            ),
          };
        });
        toast.success(data.isBookmarked ? 'Đã đánh dấu câu hỏi!' : 'Đã bỏ đánh dấu.');
      }
    },
    onError: (err, variables, context: any) => {
      if (currentQuestion && context?.previousState !== undefined) {
        queryClient.setQueryData(['practiceQuestions', sessionId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            questions: old.questions.map((q: any) =>
              q.id === currentQuestion.id ? { ...q, isBookmarked: context.previousState } : q
            ),
          };
        });
      }
      toast.error('Không thể lưu trạng thái đánh dấu.');
    },
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async ({
      questionId,
      selectedOptionIds,
      confidenceLevel,
    }: {
      questionId: string;
      selectedOptionIds: string[];
      confidenceLevel?: number;
    }) => {
      try {
        const res = await fetch(`/api/questions/${questionId}/answers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-guest-mode': '1',
          },
          credentials: 'include',
          body: JSON.stringify({ selectedOptionIds, confidenceLevel, sessionId }),
        });
        if (!res.ok) {
          console.warn(`Server responded with ${res.status}. Tiến độ đã được lưu cục bộ.`);
          return { offline: true };
        }
        return res.json();
      } catch (err) {
        console.warn('Network sync failed (company proxy/offline). Đã lưu offline.', err);
        return { offline: true };
      }
    },
    onSuccess: (data, variables) => {
      if (data && !data.offline) {
        const { questionId } = variables;
        if (data.explanation || data.correctOptionIds) {
          setQStateMap((prev) => ({
            ...prev,
            [questionId]: {
              ...prev[questionId],
              correctOptionIds: data.correctOptionIds || prev[questionId]?.correctOptionIds || [],
              explanation: data.explanation || prev[questionId]?.explanation || null,
            },
          }));
        }
      }
    },
    onError: (err) => {
      console.warn('Không thể đồng bộ lên server, vẫn lưu cục bộ:', err);
    },
  });

  const handleOptionSelect = (optionId: string) => {
    if (!currentQuestion) return;
    const qState = qStateMap[currentQuestion.id];
    if (qState?.isSubmitted) return; // Already submitted, no changes

    const isMultiple = currentQuestion.type === 'multiple_choice';
    setQStateMap((prev) => {
      const current = prev[currentQuestion.id] || {
        selectedOptionIds: [],
        submittedOptionIds: [],
        correctOptionIds: [],
        isSubmitted: false,
        explanation: null,
      };
      const newSelected = isMultiple
        ? current.selectedOptionIds.includes(optionId)
          ? current.selectedOptionIds.filter((id) => id !== optionId)
          : [...current.selectedOptionIds, optionId]
        : [optionId];
      return { ...prev, [currentQuestion.id]: { ...current, selectedOptionIds: newSelected } };
    });
  };

  const handleCheckAnswer = (confidenceLevel: number = 3) => {
    if (!currentQuestion) return;
    const qState = qStateMap[currentQuestion.id];
    if (!qState || qState.selectedOptionIds.length === 0 || qState.isSubmitted) return;

    const selectedOptionIds = qState.selectedOptionIds;

    // 1. Xác định đáp án đúng ngay trên Client (Không chờ mạng/proxy server)
    const correctIds: string[] =
      currentQuestion.correctOptionIds && currentQuestion.correctOptionIds.length > 0
        ? currentQuestion.correctOptionIds
        : currentQuestion.options?.filter((o: any) => o.isCorrect).map((o: any) => o.id) || [];

    const isCorrect =
      correctIds.length > 0
        ? correctIds.length === selectedOptionIds.length &&
          correctIds.every((id: string) => selectedOptionIds.includes(id))
        : true;

    // 2. CẬP NHẬT GIAO DIỆN NGAY LẬP TỨC (Optimistic Update)
    setQStateMap((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...prev[currentQuestion.id],
        submittedOptionIds: selectedOptionIds,
        correctOptionIds: correctIds,
        isSubmitted: true,
        explanation: currentQuestion.explanation || null,
      },
    }));

    // Cập nhật cache để hiển thị highlight xanh/đỏ chuẩn
    queryClient.setQueryData(['practiceQuestions', sessionId], (old: any) => {
      if (!old) return old;
      return {
        ...old,
        questions: old.questions.map((q: any) =>
          q.id === currentQuestion.id
            ? {
                ...q,
                isAnswered: true,
                wasCorrect: isCorrect,
                userSelectedOptionIds: selectedOptionIds,
                options: q.options.map((opt: any) => ({
                  ...opt,
                  isCorrect: correctIds.includes(opt.id),
                })),
              }
            : q
        ),
      };
    });

    // 3. Lưu tiến độ vào localStorage để không bao giờ mất dù proxy công ty ngắt
    try {
      const localKey = `aws_cer_session_${sessionId}_answers`;
      const saved = JSON.parse(localStorage.getItem(localKey) || '{}');
      saved[currentQuestion.id] = {
        selectedOptionIds,
        isCorrect,
        confidenceLevel,
        answeredAt: new Date().toISOString(),
      };
      localStorage.setItem(localKey, JSON.stringify(saved));
    } catch {}

    // 4. Đồng bộ nền lên server
    submitAnswerMutation.mutate({
      questionId: currentQuestion.id,
      selectedOptionIds,
      confidenceLevel,
    });
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowRight' && questionsData) {
        if (currentIndex < questionsData.questions.length - 1) setCurrentIndex((i) => i + 1);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      }
      if (e.key.toLowerCase() === 'f' && currentQuestion) {
        toggleBookmarkMutation.mutate();
      }
    },
    [currentQuestion, questionsData, currentIndex, toggleBookmarkMutation]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Auto-scroll active question into center view
  useEffect(() => {
    const el = document.getElementById(`practice-nav-q-${currentIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentIndex]);

  const handleReset = async () => {
    if (!window.confirm('Xóa đáp án trong phiên này và học lại từ câu đầu? Lịch sử SRS tổng thể vẫn được giữ.')) {
      return;
    }
    setIsResetting(true);
    try {
      const res = await fetch(`/api/practice-sessions/${sessionId}/reset`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Reset failed');
      // Reset local state
      setQStateMap({});
      setCurrentIndex(0);
      setInitialized(false);
      // Refetch questions (they'll now show as unanswered)
      queryClient.invalidateQueries({ queryKey: ['practiceQuestions', sessionId] });
      queryClient.invalidateQueries({ queryKey: ['progressDomains'] });
      toast.success('Đã xoá toàn bộ câu trả lời. Bắt đầu luyện tập lại!');
    } catch (e) {
      toast.error('Không thể reset phiên học. Vui lòng thử lại.');
    } finally {
      setIsResetting(false);
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
        queryClient.setQueryData(['practiceQuestions', sessionId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            questions: old.questions.map((q: any) =>
              q.id === questionId ? { ...q, isBookmarked: !currentBookmarked } : q
            ),
          };
        });
        toast.success(!currentBookmarked ? 'Đã đánh dấu câu hỏi ⭐' : 'Đã bỏ đánh dấu.');
      }
    } catch {
      toast.error('Không thể lưu trạng thái đánh dấu.');
    }
  };

  const handleStartNextBatch = async () => {
    if (!questionsData?.questions) return;
    try {
      setIsStartingNextBatch(true);
      const currentQuestionIds = questionsData.questions.map((q: any) => q.id);
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-guest-mode': '1' },
        credentials: 'include',
        body: JSON.stringify({
          mode: 'NEXT_BATCH',
          excludeQuestionIds: currentQuestionIds,
          domainId: questionsData.session?.sourceId || undefined,
          questionBankId: questionsData.session?.questionBankId,
          limit: 15,
        }),
      });
      const data = await res.json();
      if (data.sessionId) {
        toast.success('Bắt đầu bộ 15 câu tiếp theo!');
        router.push(`/practice/${data.sessionId}`);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (e) {
      console.error(e);
      toast.error('Không thể tạo bộ câu hỏi tiếp theo');
    } finally {
      setIsStartingNextBatch(false);
    }
  };

  const handlePracticeMistakes = async (incorrectIds: string[]) => {
    if (incorrectIds.length === 0) return;
    try {
      setIsStartingNextBatch(true);
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-guest-mode': '1' },
        credentials: 'include',
        body: JSON.stringify({
          mode: 'CUSTOM',
          questionIds: incorrectIds,
          questionBankId: questionsData?.session?.questionBankId,
          limit: incorrectIds.length,
        }),
      });
      const data = await res.json();
      if (data.sessionId) {
        toast.success(`Luyện lại ${incorrectIds.length} câu làm sai!`);
        router.push(`/practice/${data.sessionId}`);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (e) {
      console.error(e);
      toast.error('Không thể tạo phiên học sửa sai');
    } finally {
      setIsStartingNextBatch(false);
    }
  };

  if (questionsLoading || !questionsData || !initialized) {
    return (
      <div className="py-20 text-center text-slate-500 font-semibold text-sm">
        Đang chuẩn bị câu hỏi luyện tập...
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-slate-500 font-semibold text-sm">Không có câu hỏi nào trong phiên học này.</p>
        <button onClick={() => router.push('/')} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">
          Về Dashboard
        </button>
      </div>
    );
  }

  const totalQuestions = questionsData.questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const answeredCount = Object.values(qStateMap).filter((s) => s.isSubmitted).length;
  const allDone = answeredCount === totalQuestions && totalQuestions > 0;

  const correctCount = questionsData.questions.filter((q: any) => {
    const s = qStateMap[q.id];
    return (
      s?.isSubmitted &&
      s.submittedOptionIds.length === s.correctOptionIds.length &&
      s.submittedOptionIds.every((id) => s.correctOptionIds.includes(id))
    );
  }).length;
  const incorrectCount = answeredCount - correctCount;
  const unansweredCount = totalQuestions - answeredCount;

  const incorrectQuestions = questionsData.questions.filter((q: any) => {
    const s = qStateMap[q.id];
    const isCorrect =
      s?.isSubmitted &&
      s.submittedOptionIds.length === s.correctOptionIds.length &&
      s.submittedOptionIds.every((id) => s.correctOptionIds.includes(id));
    return s?.isSubmitted && !isCorrect;
  });
  const incorrectIds = incorrectQuestions.map((q: any) => q.id);

  // Dedicated Full-Session Review Screen
  if (viewMode === 'REVIEW') {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Top Summary & Action Header */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center space-x-2 text-xs font-black text-amber-600 uppercase tracking-wider">
                <RotateCcw className="w-4 h-4" />
                <span>Xem lại kết quả &amp; Review chi tiết</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Chi tiết toàn bộ {totalQuestions} câu vừa luyện tập
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Đối chiếu đáp án bạn đã chọn với đáp án chuẩn AWS, đọc giải thích chi tiết và đánh dấu các câu cần lưu ý.
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-black text-slate-900">
                  {correctCount}/{totalQuestions}
                </div>
                <div className="text-[11px] font-bold text-slate-500">
                  {totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0}% chính xác
                </div>
              </div>
              <div
                className={`px-3 py-1.5 rounded-2xl text-xs font-black ${
                  totalQuestions > 0 && Math.round((correctCount / totalQuestions) * 100) >= 72
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {totalQuestions > 0 && Math.round((correctCount / totalQuestions) * 100) >= 72 ? 'ĐẠT (≥ 72%)' : 'CẦN ÔN LẠI'}
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setViewMode('PRACTICE')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition flex items-center cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Quay lại chế độ làm bài
              </button>
              <Link
                href="/practice"
                className="px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 font-extrabold text-xs rounded-xl transition flex items-center"
              >
                <Clock className="w-4 h-4 mr-1.5 text-slate-500" /> Quản lý các phiên
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {incorrectIds.length > 0 && (
                <button
                  onClick={() => handlePracticeMistakes(incorrectIds)}
                  disabled={isStartingNextBatch}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-extrabold text-xs rounded-xl transition flex items-center disabled:opacity-50 cursor-pointer"
                >
                  <Target className="w-4 h-4 mr-1.5 text-rose-600" />
                  Luyện lại {incorrectIds.length} câu SAI
                </button>
              )}

              <button
                onClick={handleStartNextBatch}
                disabled={isStartingNextBatch}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/25 transition active:scale-95 flex items-center disabled:opacity-50 cursor-pointer"
              >
                <span>{isStartingNextBatch ? 'Đang chuẩn bị...' : 'Tiếp tục luyện tập (15 câu tiếp theo)'}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 15 Question Review Cards */}
        <div className="space-y-6">
          {questionsData.questions.map((q: any, qIdx: number) => {
            const state = qStateMap[q.id];
            const userSelectedIds: string[] = state?.submittedOptionIds || q.userSelectedOptionIds || [];
            const correctIds: string[] =
              state?.correctOptionIds && state.correctOptionIds.length > 0
                ? state.correctOptionIds
                : q.correctOptionIds && q.correctOptionIds.length > 0
                ? q.correctOptionIds
                : q.options?.filter((o: any) => o.isCorrect).map((o: any) => o.id) || [];

            const isSubmittedQ = !!state?.isSubmitted || !!q.isAnswered;
            const isQuestionCorrect =
              isSubmittedQ &&
              userSelectedIds.length === correctIds.length &&
              userSelectedIds.every((id: string) => correctIds.includes(id));

            return (
              <div
                key={q.id}
                className={`card-saas p-5 sm:p-6 space-y-4 border transition-all ${
                  isSubmittedQ
                    ? isQuestionCorrect
                      ? 'border-emerald-300 shadow-2xs'
                      : 'border-rose-300 shadow-2xs'
                    : 'border-slate-200/90'
                }`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-black px-2.5 py-0.5 bg-slate-900 text-amber-400 rounded-md">
                      Câu #{qIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {q.domainName || 'AWS SAA-C03'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {isSubmittedQ ? (
                      isQuestionCorrect ? (
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

                    {/* Bookmark Toggle Button */}
                    <button
                      onClick={() => handleToggleBookmark(q.id, q.isBookmarked)}
                      title={q.isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu câu hỏi ⭐'}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        q.isBookmarked
                          ? 'bg-amber-50 border-amber-300 text-amber-600'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:border-amber-300'
                      }`}
                    >
                      <Award className="w-4 h-4 fill-current" />
                    </button>

                    {/* Note Toggle Button */}
                    <button
                      onClick={() =>
                        setActiveReviewNoteId(activeReviewNoteId === q.id ? null : q.id)
                      }
                      title="Ghi chú cá nhân"
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        q.userNote
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-indigo-500 hover:border-indigo-300'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div className="text-sm font-semibold text-slate-800 leading-relaxed">
                  <HighlightableText
                    questionId={q.id}
                    text={q.content}
                    highlights={q.userHighlights}
                  />
                </div>

                {/* Inline Note Box */}
                {activeReviewNoteId === q.id && (
                  <div className="pt-1">
                    <QuestionNoteBox
                      questionId={q.id}
                      initialNote={q.userNote || ''}
                      onSaved={() => {
                        queryClient.invalidateQueries({ queryKey: ['practiceQuestions', sessionId] });
                        setActiveReviewNoteId(null);
                      }}
                    />
                  </div>
                )}

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Lựa chọn đáp án:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options?.map((opt: any, optIdx: number) => {
                      const letter = opt.key || String.fromCharCode(65 + optIdx);
                      const isUserSelected = userSelectedIds.includes(opt.id);
                      const isCorrectOption = correctIds.includes(opt.id);

                      let cardClass = 'bg-white border-slate-200 text-slate-600 opacity-70';
                      let badge = null;

                      if (isUserSelected && isCorrectOption) {
                        cardClass = 'bg-emerald-50/90 border-2 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                        badge = (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-600 text-white shrink-0">
                            <Check className="w-3 h-3 mr-0.5" /> Bạn đã chọn (Chính xác)
                          </span>
                        );
                      } else if (isUserSelected && !isCorrectOption) {
                        cardClass = 'bg-rose-50/90 border-2 border-rose-500 text-rose-950 font-bold shadow-xs';
                        badge = (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-600 text-white shrink-0">
                            <XCircle className="w-3 h-3 mr-0.5" /> Bạn đã chọn (Sai)
                          </span>
                        );
                      } else if (!isUserSelected && isCorrectOption) {
                        cardClass = 'bg-emerald-50/60 border-2 border-emerald-400 text-emerald-950 font-bold';
                        badge = (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                            <Check className="w-3 h-3 mr-0.5 text-emerald-600" /> Đáp án đúng chuẩn AWS
                          </span>
                        );
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition ${cardClass}`}
                        >
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                              isCorrectOption
                                ? 'bg-emerald-600 text-white'
                                : isUserSelected
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {letter}
                          </span>
                          <div className="flex-1 pt-0.5 leading-relaxed">{opt.content}</div>
                          {badge}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation */}
                {(state?.explanation || q.explanation) && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 border border-amber-200/80 space-y-2 mt-2">
                    <div className="flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-amber-800">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>Giải thích chi tiết chuẩn AWS:</span>
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      <MarkdownExplanation
                        content={state?.explanation || q.explanation}
                        theme="light"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Completion Box */}
        <div className="card-saas p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-black text-amber-400">Bạn đã hoàn tất việc review bộ câu hỏi!</h3>
            <p className="text-xs text-slate-300">
              Đạt {correctCount}/{totalQuestions} câu đúng ({totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0}%). Bấm nút để tiếp tục sang bộ 15 câu tiếp theo!
            </p>
          </div>

          <button
            onClick={handleStartNextBatch}
            disabled={isStartingNextBatch}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm rounded-2xl transition-all shadow-md shadow-amber-500/25 hover:shadow-lg active:scale-95 flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50 cursor-pointer"
          >
            <span>{isStartingNextBatch ? 'Đang chuẩn bị...' : 'Tiếp tục luyện tập (15 câu tiếp theo)'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    );
  }

  const qState = qStateMap[currentQuestion.id] || {
    selectedOptionIds: [],
    submittedOptionIds: [],
    correctOptionIds: [],
    isSubmitted: false,
    explanation: null,
  };

  const isSubmitted = qState.isSubmitted;

  const confidenceButtons = [
    { level: 1, label: 'Đoán', icon: HelpCircle },
    { level: 2, label: 'Chưa chắc', icon: AlertCircle },
    { level: 3, label: 'Khá chắc', icon: CheckCircle },
    { level: 4, label: 'Rất chắc', icon: Target },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Header & Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-extrabold text-slate-500">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-slate-600 hover:text-slate-900 transition whitespace-nowrap cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-1 shrink-0" /> Thoát phiên học
            </button>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <Link
              href="/practice"
              className="hidden sm:flex items-center text-slate-500 hover:text-slate-800 transition"
            >
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" /> Lịch sử phiên
            </Link>
          </div>
          <div className="flex items-center space-x-2.5">
            {allDone && (
              <button
                onClick={() => setViewMode('REVIEW')}
                className="px-3.5 py-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-full shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Review {totalQuestions} câu</span>
              </button>
            )}
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-extrabold text-xs">
              {answeredCount}/{totalQuestions} đã làm
            </span>
            <span className="bg-slate-200/80 px-3 py-1 rounded-full text-slate-700 font-extrabold text-xs whitespace-nowrap">
              Câu {currentIndex + 1} / {totalQuestions}
            </span>
          </div>
        </div>

        <div className="w-full bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-400 to-amber-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 overflow-x-auto py-2.5 px-1 no-scrollbar">
            <div className="flex items-center gap-2 min-w-max py-1.5 px-1">
              {questionsData.questions.map((question: any, index: number) => {
                const state = qStateMap[question.id];
                const isCurrent = currentIndex === index;
                const isSubmittedQuestion = !!state?.isSubmitted;
                const isCorrect =
                  isSubmittedQuestion &&
                  state.submittedOptionIds.length === state.correctOptionIds.length &&
                  state.submittedOptionIds.every((optionId) => state.correctOptionIds.includes(optionId));
                const hasSelectedDraft = !isSubmittedQuestion && (state?.selectedOptionIds?.length ?? 0) > 0;

                // Dedicated, clean, beautiful styling per state — zero browser focus outline, generous ring clearance
                let btnStyle = '';
                if (isCurrent) {
                  if (isSubmittedQuestion) {
                    btnStyle = isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-400 ring-offset-2 ring-offset-white shadow-sm font-black z-10'
                      : 'bg-rose-600 text-white border-rose-600 ring-2 ring-rose-400 ring-offset-2 ring-offset-white shadow-sm font-black z-10';
                  } else {
                    btnStyle = 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-400 ring-offset-2 ring-offset-white shadow-sm font-black z-10';
                  }
                } else {
                  if (isSubmittedQuestion) {
                    btnStyle = isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 font-bold'
                      : 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100 font-bold';
                  } else if (hasSelectedDraft) {
                    btnStyle = 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 font-bold';
                  } else {
                    btnStyle = 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 font-medium';
                  }
                }

                return (
                  <button
                    key={question.id}
                    id={`practice-nav-q-${index}`}
                    onClick={() => setCurrentIndex(index)}
                    title={
                      isSubmittedQuestion
                        ? isCorrect
                          ? `Câu ${index + 1}: Đúng`
                          : `Câu ${index + 1}: Sai`
                        : hasSelectedDraft
                        ? `Câu ${index + 1}: Đang chọn đáp án`
                        : `Câu ${index + 1}: Chưa làm`
                    }
                    className={`w-9 h-9 rounded-xl text-xs border transition-all shrink-0 flex items-center justify-center outline-none focus:outline-none focus-visible:outline-none cursor-pointer ${btnStyle}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
          {questionsData.session?.mode === 'DOMAIN' && (
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="px-3 py-2 bg-white border border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-600 text-xs font-bold rounded-xl flex items-center shrink-0 disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 mr-1 ${isResetting ? 'animate-spin' : ''}`} />
              Học lại Domain
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-xs">
          <div className="flex flex-wrap items-center gap-2.5 font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Đúng: {correctCount}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Sai: {incorrectCount}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              Chưa làm: {unansweredCount}
            </span>
          </div>

          {unansweredCount > 0 && (
            <button
              onClick={() => {
                const firstUnanswered = questionsData.questions.findIndex((q: any) => !qStateMap[q.id]?.isSubmitted);
                if (firstUnanswered !== -1) setCurrentIndex(firstUnanswered);
              }}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 transition"
            >
              <span>Nhảy tới câu chưa làm</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Completion Banner — shown when all questions done */}
      {allDone && (
        <div className="card-saas p-5 sm:p-6 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg animate-in fade-in">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-md">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-black text-slate-900">
                  Đã hoàn thành toàn bộ {totalQuestions} câu!
                </p>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {correctCount}/{totalQuestions} Đúng ({totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0}%)
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Xem lại toàn bộ {totalQuestions} câu để đọc giải thích chi tiết, xem đáp án chuẩn AWS và note lại trước khi sang bộ mới.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setViewMode('REVIEW')}
              className="flex-1 sm:flex-none px-5 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Review toàn bộ {totalQuestions} câu</span>
            </button>
            <button
              onClick={handleStartNextBatch}
              disabled={isStartingNextBatch}
              className="flex-1 sm:flex-none px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer"
            >
              <span>{isStartingNextBatch ? 'Đang tạo...' : 'Sang 15 câu tiếp theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Notes */}
        <div className="space-y-4">
          <div className="card-saas p-5 space-y-3 sticky top-20 shadow-lg border-l-4 border-l-amber-500">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <label className="text-xs font-extrabold text-slate-900 flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-amber-500 shrink-0" /> Ghi chú riêng
              </label>
              <div className="text-[11px] font-bold shrink-0">
                {noteStatus === 'saving' && <span className="text-amber-600">Đang lưu...</span>}
                {noteStatus === 'saved' && <span className="text-emerald-600">Đã lưu ✓</span>}
                {noteStatus === 'error' && <span className="text-red-600">Lỗi lưu!</span>}
              </div>
            </div>
            <textarea
              value={noteContent}
              onChange={handleNoteChange}
              rows={8}
              placeholder="Nhập ghi chú riêng của bạn..."
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 italic">Ghi chú tự động đồng bộ theo từng câu hỏi.</p>
          </div>
        </div>

        {/* Right: Question */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-saas p-5 sm:p-8 space-y-6 shadow-xl">
            {/* Question header badges */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-100 pb-4">
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span className="text-[11px] sm:text-xs font-extrabold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg whitespace-nowrap">
                  {currentQuestion.domainName}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg whitespace-nowrap">
                  {currentQuestion.type === 'single_choice' ? 'Chọn 1 đáp án' : 'Chọn nhiều đáp án'}
                </span>
                {isSubmitted && (
                  <span className="text-[11px] font-extrabold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg whitespace-nowrap">
                    ✓ Đã làm
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleBookmarkMutation.mutate()}
                className={`flex items-center text-xs font-extrabold px-3 py-1.5 rounded-xl border transition-all whitespace-nowrap shrink-0 ${
                  currentQuestion.isBookmarked
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 mr-1.5 ${currentQuestion.isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{currentQuestion.isBookmarked ? 'Đã đánh dấu (F)' : 'Đánh dấu (F)'}</span>
              </button>
            </div>

            {/* Question text */}
            <div className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
              <HighlightableText
                questionId={currentQuestion.id}
                text={currentQuestion.content}
                highlights={currentQuestion.userHighlights}
                onHighlightCreated={() => {
                  queryClient.invalidateQueries({ queryKey: ['practiceQuestions', sessionId] });
                }}
              />
            </div>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((option: any) => {
                const isSelected = qState.selectedOptionIds.includes(option.id);
                const wasSubmitted = qState.submittedOptionIds.includes(option.id);
                const isCorrect = isSubmitted && qState.correctOptionIds.includes(option.id);
                const isWrong = isSubmitted && wasSubmitted && !isCorrect;

                let optionStyle = 'bg-white border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-slate-50/80';
                if (isSubmitted) {
                  if (isCorrect) optionStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold';
                  else if (isWrong) optionStyle = 'bg-red-50 border-2 border-red-500 text-red-950';
                  else optionStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                } else if (isSelected) {
                  optionStyle = 'bg-amber-50 border-2 border-amber-500 text-amber-950 font-bold shadow-xs';
                }

                let keyStyle = 'bg-slate-100 text-slate-600';
                if (isSubmitted && isCorrect) keyStyle = 'bg-emerald-500 text-white';
                else if (isSubmitted && isWrong) keyStyle = 'bg-red-500 text-white';
                else if (isSelected) keyStyle = 'bg-amber-500 text-slate-950';

                return (
                  <button
                    key={option.id}
                    disabled={isSubmitted}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start space-x-3.5 ${optionStyle}`}
                  >
                    <div className={`w-6 h-6 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 ${keyStyle}`}>
                      {option.key}
                    </div>
                    <div className="text-xs sm:text-sm leading-relaxed flex-1 pt-0.5">{option.content}</div>
                  </button>
                );
              })}
            </div>

            {/* Confidence buttons OR explanation */}
            {!isSubmitted ? (
              <div className="pt-4 border-t border-slate-100 space-y-3.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    disabled={qState.selectedOptionIds.length === 0}
                    onClick={() => handleCheckAnswer(3)}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-md flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4 mr-2 text-slate-950" />
                    <span>Xem đáp án &amp; Kiểm tra ngay</span>
                  </button>
                  <div className="text-[11px] font-bold text-slate-400 text-center sm:text-right">
                    (Hoặc bấm 1 trong 4 mức độ tự tin bên dưới để tính lịch SRS)
                  </div>
                </div>

                <div className="text-xs font-extrabold text-slate-500 text-center sm:text-left pt-1">
                  Đánh giá độ tự tin (Spaced Repetition System):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {confidenceButtons.map((btn) => {
                    const Icon = btn.icon;
                    const disabled = qState.selectedOptionIds.length === 0;
                    return (
                      <button
                        key={btn.level}
                        disabled={disabled}
                        onClick={() => handleCheckAnswer(btn.level)}
                        className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center space-x-1.5 transition ${
                          disabled
                            ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                            : 'bg-white hover:bg-amber-50 hover:border-amber-400 text-slate-800 shadow-2xs cursor-pointer'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{btn.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Explanation shown for submitted questions */
              <div className="pt-4 border-t border-slate-100 space-y-4 animate-in fade-in">
                {(qState.explanation || currentQuestion.explanation) && (
                  <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                    <div className="flex items-center space-x-2 text-amber-400 font-extrabold text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>Giải thích chi tiết &amp; Mẹo thi</span>
                    </div>
                    <MarkdownExplanation
                      content={qState.explanation || currentQuestion.explanation || 'Chưa có phần giải thích.'}
                      theme="dark"
                    />
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between items-center pt-1">
                  <button
                    onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                    disabled={currentIndex === 0}
                    className="px-4 py-2.5 bg-white border border-slate-200 font-bold text-xs rounded-xl disabled:opacity-40 flex items-center transition hover:bg-slate-50 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Câu trước
                  </button>

                  <button
                    onClick={() => {
                      if (currentIndex < totalQuestions - 1) {
                        setCurrentIndex((i) => i + 1);
                      } else {
                        setViewMode('REVIEW');
                      }
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-md flex items-center whitespace-nowrap cursor-pointer hover:from-amber-500 hover:to-amber-600"
                  >
                    <span>{currentIndex < totalQuestions - 1 ? 'Câu tiếp theo' : 'Xem kết quả & Review 15 câu'}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation for unanswered questions too */}
          {!isSubmitted && (
            <div className="flex justify-between items-center px-1">
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-white border border-slate-200 font-bold text-xs rounded-xl disabled:opacity-40 flex items-center hover:bg-slate-50 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Câu trước
              </button>
              <button
                onClick={() => {
                  if (currentIndex < totalQuestions - 1) setCurrentIndex((i) => i + 1);
                }}
                disabled={currentIndex >= totalQuestions - 1}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl disabled:opacity-40 flex items-center transition cursor-pointer"
              >
                <span>Bỏ qua / Câu tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PracticeSessionPage(props: { params: Promise<{ id: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-slate-500 font-bold text-sm">
          Đang tải phiên luyện tập...
        </div>
      }
    >
      <PracticeSessionContent {...props} />
    </Suspense>
  );
}
