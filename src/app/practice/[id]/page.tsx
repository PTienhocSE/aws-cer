'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import toast from 'react-hot-toast';
import HighlightableText from '@/components/HighlightableText';
import MarkdownExplanation from '@/components/MarkdownExplanation';

async function fetchPracticeSession(id: string) {
  const res = await fetch(`/api/practice-sessions/${id}`);
  if (!res.ok) throw new Error('Failed to fetch session');
  return res.json();
}

async function fetchSessionQuestions(id: string) {
  const res = await fetch(`/api/practice-sessions/${id}/questions`);
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

export default function PracticeSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const sessionId = resolvedParams.id;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentIndex, setCurrentIndex] = useState(0);
  // Per-question state map: key = questionId
  const [qStateMap, setQStateMap] = useState<Record<string, QuestionState>>({});
  const [initialized, setInitialized] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const [noteContent, setNoteContent] = useState('');
  const [noteStatus, setNoteStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const { data: questionsData, isLoading: questionsLoading } = useQuery({
    queryKey: ['practiceQuestions', sessionId],
    queryFn: () => fetchSessionQuestions(sessionId),
  });

  const currentQuestion = questionsData?.questions?.[currentIndex];

  // Initialize: set already-answered questions from DB, jump to first unanswered
  useEffect(() => {
    if (!questionsData?.questions || initialized) return;

    const initMap: Record<string, QuestionState> = {};
    let firstUnanswered = 0;

    questionsData.questions.forEach((q: any, idx: number) => {
      if (q.isAnswered) {
        const correctIds = q.options
          .filter((o: any) => o.isCorrect)
          .map((o: any) => o.id);
        const submittedIds = q.userSelectedOptionIds?.length > 0 ? q.userSelectedOptionIds : correctIds;
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
    const firstUnansweredIdx = questionsData.questions.findIndex((q: any) => !q.isAnswered);
    setCurrentIndex(firstUnansweredIdx >= 0 ? firstUnansweredIdx : 0);
    setQStateMap(initMap);
    setInitialized(true);
  }, [questionsData, initialized]);

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
      const res = await fetch(`/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selectedOptionIds, confidenceLevel, sessionId }),
      });
      if (!res.ok) throw new Error('Submit answer failed');
      return res.json();
    },
    onSuccess: (data, variables) => {
      const { questionId, selectedOptionIds } = variables;
      setQStateMap((prev) => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          submittedOptionIds: selectedOptionIds,
          correctOptionIds: data.correctOptionIds || [],
          isSubmitted: true,
          explanation: data.explanation || null,
        },
      }));
      // Also update the questions cache so options show correctly
      if (data?.correctOptionIds) {
        queryClient.setQueryData(['practiceQuestions', sessionId], (old: any) => {
          if (!old) return old;
          return {
            ...old,
            questions: old.questions.map((q: any) =>
              q.id === questionId
                ? {
                    ...q,
                    isAnswered: true,
                    wasCorrect: data.isCorrect,
                    userSelectedOptionIds: selectedOptionIds,
                    options: q.options.map((opt: any) => ({
                      ...opt,
                      isCorrect: data.correctOptionIds.includes(opt.id),
                    })),
                  }
                : q
            ),
          };
        });
      }
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

  const handleCheckAnswer = (confidenceLevel: number) => {
    if (!currentQuestion) return;
    const qState = qStateMap[currentQuestion.id];
    if (!qState || qState.selectedOptionIds.length === 0 || qState.isSubmitted) return;

    submitAnswerMutation.mutate({
      questionId: currentQuestion.id,
      selectedOptionIds: qState.selectedOptionIds,
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
          <button
            onClick={() => router.push('/')}
            className="flex items-center text-slate-600 hover:text-slate-900 transition whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4 mr-1 shrink-0" /> Thoát phiên học
          </button>
          <div className="flex items-center space-x-3">
            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-extrabold">
              {answeredCount}/{totalQuestions} đã làm
            </span>
            <span className="bg-slate-200/80 px-3 py-1 rounded-full text-slate-700 font-extrabold whitespace-nowrap">
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
          <div className="flex-1 overflow-x-auto pb-1 no-scrollbar">
            <div className="flex gap-1.5 min-w-max">
              {questionsData.questions.map((question: any, index: number) => {
                const state = qStateMap[question.id];
                const isCorrect =
                  state?.isSubmitted &&
                  state.submittedOptionIds.length === state.correctOptionIds.length &&
                  state.submittedOptionIds.every((optionId) => state.correctOptionIds.includes(optionId));
                return (
                  <button
                    key={question.id}
                    onClick={() => setCurrentIndex(index)}
                    title={
                      state?.isSubmitted
                        ? isCorrect
                          ? `Câu ${index + 1}: Đúng`
                          : `Câu ${index + 1}: Sai`
                        : `Câu ${index + 1}: Chưa làm`
                    }
                    className={`w-8 h-8 rounded-lg text-[11px] font-black border transition shrink-0 ${
                      currentIndex === index
                        ? 'ring-2 ring-amber-400 ring-offset-1'
                        : ''
                    } ${
                      state?.isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                          : 'bg-red-50 border-red-300 text-red-700'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-amber-300'
                    }`}
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
        <div className="flex flex-wrap gap-3 text-[10px] font-bold text-slate-500">
          <span className="flex items-center"><i className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-300 mr-1" /> Đúng</span>
          <span className="flex items-center"><i className="w-2.5 h-2.5 rounded bg-red-100 border border-red-300 mr-1" /> Sai</span>
          <span className="flex items-center"><i className="w-2.5 h-2.5 rounded bg-white border border-slate-300 mr-1" /> Chưa làm</span>
        </div>
      </div>

      {/* Completion Banner — shown when all questions done */}
      {allDone && (
        <div className="card-saas p-5 sm:p-6 bg-gradient-to-r from-emerald-50 to-amber-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">Đã hoàn thành toàn bộ {totalQuestions} câu!</p>
              <p className="text-xs text-slate-500 mt-0.5">Bấm “Làm lại từ đầu” để xoá đáp án và luyện tập lại toàn bộ phiên này.</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => router.push('/')}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 transition"
            >
              Về Dashboard
            </button>
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              <span>{isResetting ? 'Đang reset...' : 'Làm lại từ đầu'}</span>
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
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs font-extrabold text-slate-500 text-center">
                  Chọn đáp án rồi đánh giá độ tự tin để hệ thống tính lịch ôn tập SRS:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {confidenceButtons.map((btn) => {
                    const Icon = btn.icon;
                    const disabled = qState.selectedOptionIds.length === 0 || submitAnswerMutation.isPending;
                    return (
                      <button
                        key={btn.level}
                        disabled={disabled}
                        onClick={() => handleCheckAnswer(btn.level)}
                        className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center space-x-1.5 transition ${
                          disabled
                            ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                            : 'bg-white hover:bg-amber-50 hover:border-amber-400 text-slate-800 shadow-2xs'
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
                      <span>Giải thích chi tiết & Mẹo thi</span>
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
                    className="px-4 py-2.5 bg-white border border-slate-200 font-bold text-xs rounded-xl disabled:opacity-40 flex items-center transition hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Câu trước
                  </button>

                  <button
                    onClick={() => {
                      if (currentIndex < totalQuestions - 1) setCurrentIndex((i) => i + 1);
                      else router.push('/');
                    }}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition shadow-md flex items-center whitespace-nowrap"
                  >
                    <span>{currentIndex < totalQuestions - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}</span>
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
                className="px-4 py-2 bg-white border border-slate-200 font-bold text-xs rounded-xl disabled:opacity-40 flex items-center hover:bg-slate-50 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Câu trước
              </button>
              <button
                onClick={() => {
                  if (currentIndex < totalQuestions - 1) setCurrentIndex((i) => i + 1);
                }}
                disabled={currentIndex >= totalQuestions - 1}
                className="px-4 py-2 bg-white border border-slate-200 font-bold text-xs rounded-xl disabled:opacity-40 flex items-center hover:bg-slate-50 transition"
              >
                Bỏ qua <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
