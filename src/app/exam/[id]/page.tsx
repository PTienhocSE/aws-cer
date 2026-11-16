'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Clock,
  Flag,
  Send,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function MockExamRunnerPage() {
  const { id: examAttemptId } = useParams<{ id: string }>();
  const router = useRouter();

  const isLocal = examAttemptId?.startsWith('local-');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState<Record<string, { selectedOptionIds: string[]; isFlagged: boolean }>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localAttempt, setLocalAttempt] = useState<any>(null);

  // Load local attempt if isLocal or fallback
  useEffect(() => {
    if (isLocal && examAttemptId) {
      try {
        const raw = localStorage.getItem(`aws_cer_mock_exam_${examAttemptId}`);
        if (raw) setLocalAttempt(JSON.parse(raw));
      } catch (e) {
        console.error('Failed to load local attempt:', e);
      }
    }
  }, [isLocal, examAttemptId]);

  // Load server attempt
  const { data: examData, isLoading: isServerLoading } = useQuery({
    queryKey: ['mockExam', examAttemptId],
    queryFn: async () => {
      if (isLocal) return null;
      try {
        const res = await fetch(`/api/mock-exams/${examAttemptId}`, {
          headers: { 'x-guest-mode': '1' },
          credentials: 'include',
        });
        if (!res.ok) {
          // If server returns error, check local storage backup
          const cached = localStorage.getItem(`aws_cer_mock_exam_${examAttemptId}`);
          if (cached) return { attempt: JSON.parse(cached) };
          throw new Error('Failed to fetch mock exam');
        }
        const data = await res.json();
        if (data.attempt) {
          // Backup attempt structure locally in case proxy interrupts later
          localStorage.setItem(`aws_cer_mock_exam_${examAttemptId}`, JSON.stringify(data.attempt));
        }
        return data;
      } catch (err) {
        const cached = localStorage.getItem(`aws_cer_mock_exam_${examAttemptId}`);
        if (cached) return { attempt: JSON.parse(cached) };
        throw err;
      }
    },
    enabled: !isLocal && !!examAttemptId,
  });

  const attempt = isLocal ? localAttempt : examData?.attempt;

  // Initialize timer and answer map (with LocalStorage restoration)
  useEffect(() => {
    if (!attempt || !examAttemptId) return;

    // Check if user has previously saved answers in localStorage for this exam
    let cachedAnswers: Record<string, { selectedOptionIds: string[]; isFlagged: boolean }> = {};
    try {
      const raw = localStorage.getItem(`aws_cer_mock_exam_answers_${examAttemptId}`);
      if (raw) cachedAnswers = JSON.parse(raw);
    } catch {}

    const initialMap: Record<string, { selectedOptionIds: string[]; isFlagged: boolean }> = {};
    attempt.answers.forEach((ans: any) => {
      const qId = ans.questionId || ans.question?.id;
      if (cachedAnswers[qId]) {
        initialMap[qId] = cachedAnswers[qId];
      } else {
        let parsedIds: string[] = [];
        try {
          const raw = ans.selectedOptionIds;
          parsedIds = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
        } catch {
          parsedIds = [];
        }
        initialMap[qId] = {
          selectedOptionIds: parsedIds,
          isFlagged: ans.isFlagged || false,
        };
      }
    });

    setAnswersMap(initialMap);

    // Initialize countdown timer
    if (timeLeftSeconds === null) {
      let savedTimer: number | null = null;
      try {
        const rawTimer = localStorage.getItem(`aws_cer_mock_exam_timer_${examAttemptId}`);
        if (rawTimer) savedTimer = parseInt(rawTimer, 10);
      } catch {}

      if (savedTimer !== null && !isNaN(savedTimer) && savedTimer > 0) {
        setTimeLeftSeconds(savedTimer);
      } else {
        const totalSecs = (attempt.timeLimitMinutes || 130) * 60;
        const elapsedSecs = Math.floor((Date.now() - new Date(attempt.startedAt).getTime()) / 1000);
        setTimeLeftSeconds(Math.max(totalSecs - elapsedSecs, 0));
      }
    }
  }, [attempt, examAttemptId]);

  // Countdown timer effect + persistence to localStorage
  useEffect(() => {
    if (timeLeftSeconds === null || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        const next = prev - 1;
        if (examAttemptId && next % 5 === 0) {
          try {
            localStorage.setItem(`aws_cer_mock_exam_timer_${examAttemptId}`, String(next));
          } catch {}
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds, examAttemptId]);

  // Handle Option Toggle with continuous auto-save
  const handleOptionToggle = (questionId: string, optionId: string, type: string) => {
    setAnswersMap((prev) => {
      const current = prev[questionId] || { selectedOptionIds: [], isFlagged: false };
      let newOptions: string[];

      if (type === 'SINGLE_CHOICE') {
        newOptions = [optionId];
      } else {
        newOptions = current.selectedOptionIds.includes(optionId)
          ? current.selectedOptionIds.filter((id) => id !== optionId)
          : [...current.selectedOptionIds, optionId];
      }

      const updated = {
        ...prev,
        [questionId]: { ...current, selectedOptionIds: newOptions },
      };

      // Continuous LocalStorage Auto-Save
      if (examAttemptId) {
        try {
          localStorage.setItem(`aws_cer_mock_exam_answers_${examAttemptId}`, JSON.stringify(updated));
        } catch {}
      }

      return updated;
    });
  };

  // Handle Flag Toggle with continuous auto-save
  const handleFlagToggle = (questionId: string) => {
    setAnswersMap((prev) => {
      const current = prev[questionId] || { selectedOptionIds: [], isFlagged: false };
      const updated = {
        ...prev,
        [questionId]: { ...current, isFlagged: !current.isFlagged },
      };

      if (examAttemptId) {
        try {
          localStorage.setItem(`aws_cer_mock_exam_answers_${examAttemptId}`, JSON.stringify(updated));
        } catch {}
      }

      return updated;
    });
  };

  // Complete and evaluate exam locally (Safe Mode / Offline / Corporate Proxy Fallback)
  const handleLocalEvaluation = (userAnswers: any[], timeSpentSeconds: number) => {
    let correctCount = 0;
    const evaluatedAnswers = attempt.answers.map((ans: any) => {
      const q = ans.question;
      const qId = q.id;
      const userState = answersMap[qId] || { selectedOptionIds: [], isFlagged: false };

      const correctOptionIds = q.options
        .filter((o: any) => o.isCorrect)
        .map((o: any) => o.id);

      const isCorrect =
        userState.selectedOptionIds.length === correctOptionIds.length &&
        userState.selectedOptionIds.every((id: string) => correctOptionIds.includes(id));

      if (isCorrect) correctCount++;

      return {
        ...ans,
        selectedOptionIds: JSON.stringify(userState.selectedOptionIds),
        isFlagged: userState.isFlagged,
        isCorrect,
        question: {
          ...q,
          options: q.options,
        },
      };
    });

    const totalQuestions = attempt.answers.length;
    const accuracy = totalQuestions > 0 ? correctCount / totalQuestions : 0;
    const score = Math.round(100 + accuracy * 900);
    const isPassed = score >= 720;

    const resultData = {
      attempt: {
        id: examAttemptId,
        score,
        isPassed,
        totalQuestions,
        isCompleted: true,
        submittedAt: new Date().toISOString(),
        timeSpentSeconds,
        answers: evaluatedAnswers,
      },
    };

    try {
      localStorage.setItem(`aws_cer_mock_exam_result_${examAttemptId}`, JSON.stringify(resultData));
    } catch {}

    toast.success('Đã nộp bài thành công!');
    router.push(`/exam/${examAttemptId}/result`);
  };

  // Submit Mock Exam
  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    try {
      const userAnswers = Object.entries(answersMap).map(([questionId, data]) => ({
        questionId,
        selectedOptionIds: data.selectedOptionIds,
        isFlagged: data.isFlagged,
      }));

      const timeSpentSeconds = attempt
        ? Math.max(0, (attempt.timeLimitMinutes || 130) * 60 - (timeLeftSeconds || 0))
        : 0;

      // If local safe exam: evaluate locally immediately
      if (isLocal || !attempt?.id) {
        handleLocalEvaluation(userAnswers, timeSpentSeconds);
        return;
      }

      // If server attempt, try server submit
      try {
        const res = await fetch(`/api/mock-exams/${examAttemptId}/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-guest-mode': '1',
          },
          credentials: 'include',
          body: JSON.stringify({
            answers: userAnswers,
            userAnswers,
            timeSpentSeconds,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.attemptId || data.attempt?.id) {
            router.push(`/exam/${examAttemptId}/result`);
            return;
          }
        }
      } catch (netErr) {
        console.warn('Server submission failed due to corporate proxy/network. Evaluating locally...', netErr);
      }

      // If server submission failed or timed out, gracefully evaluate locally so user NEVER loses their exam!
      handleLocalEvaluation(userAnswers, timeSpentSeconds);
    } catch (e) {
      console.error('Submit error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isLocal ? !localAttempt : isServerLoading || !attempt;

  if (isLoading || !attempt) {
    return (
      <div className="py-20 text-center text-slate-500 font-semibold text-sm">
        Đang tải đề thi thử...
      </div>
    );
  }

  const currentAnswer = attempt.answers[currentIndex];
  const currentQuestion = currentAnswer.question;
  const currentAnswerState = answersMap[currentQuestion.id] || { selectedOptionIds: [], isFlagged: false };

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.values(answersMap).filter((a) => a.selectedOptionIds.length > 0).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Top Header bar with Countdown Timer & Submit Action */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-lg flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="font-extrabold text-sm sm:text-base">
            {attempt.bankName || 'Bài thi thử SAA-C03'}
          </span>
          <span className="text-xs bg-white/10 px-2.5 py-1 rounded-md text-amber-300 font-bold">
            {answeredCount}/{attempt.answers.length} Đã làm
          </span>

          {isLocal && (
            <span className="hidden sm:inline-flex items-center text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Chế độ an toàn
            </span>
          )}
        </div>

        {/* Live Timer */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 bg-amber-500/20 px-3.5 py-1.5 rounded-xl border border-amber-500/40 text-amber-400 font-mono font-extrabold text-sm sm:text-base">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>{timeLeftSeconds !== null ? formatTimer(timeLeftSeconds) : '130:00'}</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs rounded-xl shadow transition flex items-center cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" /> Nộp bài thi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Panel */}
        <div className="lg:col-span-3 card-saas p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-extrabold px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg">
                Câu {currentIndex + 1} / {attempt.answers.length}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                {currentQuestion.domain?.name || 'AWS Domain'}
              </span>
            </div>

            <button
              onClick={() => handleFlagToggle(currentQuestion.id)}
              className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                currentAnswerState.isFlagged
                  ? 'bg-amber-50 border-amber-400 text-amber-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 mr-1.5 ${currentAnswerState.isFlagged ? 'fill-amber-500' : ''}`} />
              {currentAnswerState.isFlagged ? 'Đã cắm cờ' : 'Cắm cờ xem lại'}
            </button>
          </div>

          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed whitespace-pre-line">
            {currentQuestion.questionText}
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((opt: any, index: number) => {
              const isSelected = currentAnswerState.selectedOptionIds.includes(opt.id);
              const labelLetter = String.fromCharCode(65 + index);

              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionToggle(currentQuestion.id, opt.id, currentQuestion.type)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition flex items-start space-x-3 text-sm cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 text-slate-950 font-bold shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {labelLetter}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="px-4 py-2.5 bg-white border border-slate-200 font-bold text-xs rounded-xl disabled:opacity-40 flex items-center cursor-pointer hover:bg-slate-50 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Câu trước
            </button>

            <button
              disabled={currentIndex >= attempt.answers.length - 1}
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl disabled:opacity-40 flex items-center shadow cursor-pointer hover:bg-slate-800 transition"
            >
              Câu sau <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className="card-saas p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              Bảng câu hỏi ({attempt.answers.length})
            </h2>
            <span className="text-[11px] text-slate-400 font-semibold">Tự động lưu</span>
          </div>

          <div className="grid grid-cols-5 gap-2 max-h-[460px] overflow-y-auto pr-1">
            {attempt.answers.map((ans: any, idx: number) => {
              const qId = ans.questionId || ans.question?.id;
              const state = answersMap[qId] || { selectedOptionIds: [], isFlagged: false };
              const isAnswered = state.selectedOptionIds.length > 0;
              const isCurrent = idx === currentIndex;

              let btnStyle = 'bg-slate-100 text-slate-600 border-slate-200';
              if (isCurrent) btnStyle = 'ring-2 ring-amber-500 font-extrabold bg-slate-900 text-white';
              else if (state.isFlagged) btnStyle = 'bg-amber-100 text-amber-800 border-amber-400 font-bold';
              else if (isAnswered) btnStyle = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';

              return (
                <button
                  key={ans.id || idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg border text-xs flex items-center justify-center transition cursor-pointer ${btnStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-semibold">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400 inline-block" />
              <span>Đã trả lời ({answeredCount})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-amber-100 border border-amber-400 inline-block" />
              <span>Cắm cờ xem lại</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-slate-100 border border-slate-200 inline-block" />
              <span>Chưa trả lời ({attempt.answers.length - answeredCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-amber-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-extrabold text-slate-900">Xác nhận nộp bài thi?</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bạn đã hoàn thành <span className="font-bold text-slate-900">{answeredCount}</span> /{' '}
              <span className="font-bold text-slate-900">{attempt.answers.length}</span> câu hỏi. Bạn có chắc chắn muốn nộp bài để xem điểm thi?
            </p>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleSubmitExam}
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs rounded-xl shadow cursor-pointer"
              >
                {isSubmitting ? 'Đang chấm điểm...' : 'Nộp bài ngay'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
