'use client';

import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Flag,
  Send,
  ShieldCheck,
  Sparkles,
  TimerOff,
  XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import MarkdownExplanation from '@/components/MarkdownExplanation';

interface ExamSettings {
  examMode: 'STANDARD' | 'PRACTICE';
  timerEnabled: boolean;
  showAnswerAfterEach: boolean;
}

function evaluateQuestionCorrect(question: any, selectedOptionIds: string[]): boolean {
  if (!question?.options || selectedOptionIds.length === 0) return false;
  const correctOptionIds = question.options.filter((o: any) => o.isCorrect).map((o: any) => o.id);
  return (
    correctOptionIds.length > 0 &&
    selectedOptionIds.length === correctOptionIds.length &&
    selectedOptionIds.every((id) => correctOptionIds.includes(id))
  );
}

function MockExamRunnerContent() {
  const { id: examAttemptId } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isLocal = examAttemptId?.startsWith('local-');
  const modeParam = searchParams.get('mode');
  const timerParam = searchParams.get('timer');
  const instantParam = searchParams.get('instant');

  const [examSettings, setExamSettings] = useState<ExamSettings>(() => {
    if (modeParam === 'practice') {
      return {
        examMode: 'PRACTICE',
        timerEnabled: timerParam !== '0',
        showAnswerAfterEach: instantParam !== '0',
      };
    }
    return {
      examMode: 'STANDARD',
      timerEnabled: true,
      showAnswerAfterEach: false,
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState<Record<string, { selectedOptionIds: string[]; isFlagged: boolean }>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number | null>(null);
  const [elapsedPracticeSeconds, setElapsedPracticeSeconds] = useState<number>(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localAttempt, setLocalAttempt] = useState<any>(null);

  const hasAutoSubmittedRef = useRef(false);
  const timeLeftRef = useRef<number | null>(null);
  timeLeftRef.current = timeLeftSeconds;

  const isPracticeMode = examSettings.examMode === 'PRACTICE';

  // Restore/persist exam settings from localStorage (preserving user's in-exam toggles across refreshes)
  useEffect(() => {
    if (!examAttemptId) return;
    try {
      const savedRaw = localStorage.getItem(`aws_cer_mock_exam_settings_${examAttemptId}`);
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        setExamSettings({
          examMode: parsed.examMode === 'PRACTICE' ? 'PRACTICE' : 'STANDARD',
          timerEnabled: parsed.examMode === 'PRACTICE' ? Boolean(parsed.timerEnabled) : true,
          showAnswerAfterEach: parsed.examMode === 'PRACTICE' ? Boolean(parsed.showAnswerAfterEach) : false,
        });
        return;
      }
      if (modeParam === 'practice') {
        const initial: ExamSettings = {
          examMode: 'PRACTICE',
          timerEnabled: timerParam !== '0',
          showAnswerAfterEach: instantParam !== '0',
        };
        localStorage.setItem(`aws_cer_mock_exam_settings_${examAttemptId}`, JSON.stringify(initial));
        setExamSettings(initial);
      }
    } catch {}
  }, [examAttemptId, modeParam, timerParam, instantParam]);

  // Load checked questions state in practice mode
  useEffect(() => {
    if (!examAttemptId) return;
    try {
      const rawChecked = localStorage.getItem(`aws_cer_mock_exam_checked_${examAttemptId}`);
      if (rawChecked) setCheckedQuestions(JSON.parse(rawChecked));

      const rawElapsed = localStorage.getItem(`aws_cer_mock_exam_elapsed_${examAttemptId}`);
      if (rawElapsed) {
        const parsedElapsed = parseInt(rawElapsed, 10);
        if (!isNaN(parsedElapsed) && parsedElapsed >= 0) {
          setElapsedPracticeSeconds(parsedElapsed);
        }
      }
    } catch {}
  }, [examAttemptId]);

  // Load local attempt if isLocal
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
    queryKey: ['mockExam', examAttemptId, isPracticeMode],
    queryFn: async () => {
      if (isLocal) return null;
      const endpoint = isPracticeMode
        ? `/api/mock-exams/${examAttemptId}?mode=practice`
        : `/api/mock-exams/${examAttemptId}`;
      try {
        const res = await fetch(endpoint, {
          headers: { 'x-guest-mode': '1' },
          credentials: 'include',
        });
        if (!res.ok) {
          const cached = localStorage.getItem(`aws_cer_mock_exam_${examAttemptId}`);
          if (cached) return { attempt: JSON.parse(cached) };
          throw new Error('Failed to fetch mock exam');
        }
        const data = await res.json();
        if (data.attempt) {
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

  // Auto-redirect if already submitted / completed
  useEffect(() => {
    if (attempt?.isCompleted && examAttemptId) {
      router.replace(`/exam/${examAttemptId}/result`);
    }
  }, [attempt?.isCompleted, examAttemptId, router]);

  // Initialize timer and answer map (with LocalStorage restoration)
  useEffect(() => {
    if (!attempt || !examAttemptId) return;

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
    if (timeLeftRef.current === null) {
      let savedTimer: number | null = null;
      try {
        const rawTimer = localStorage.getItem(`aws_cer_mock_exam_timer_${examAttemptId}`);
        if (rawTimer) savedTimer = parseInt(rawTimer, 10);
      } catch {}

      const totalSecs = (attempt.timeLimitMinutes || 130) * 60;
      if (savedTimer !== null && !isNaN(savedTimer) && savedTimer > 0) {
        setTimeLeftSeconds(savedTimer);
      } else if (isPracticeMode) {
        setTimeLeftSeconds(totalSecs);
      } else {
        const elapsedSecs = Math.floor((Date.now() - new Date(attempt.startedAt).getTime()) / 1000);
        setTimeLeftSeconds(Math.max(totalSecs - elapsedSecs, 0));
      }
    }
  }, [attempt, examAttemptId, isPracticeMode]);

  // Complete and evaluate exam locally (Safe Mode / Offline / Corporate Proxy Fallback)
  const handleLocalEvaluation = useCallback(
    (timeSpentSeconds: number) => {
      if (!attempt) return;
      let correctCount = 0;
      const evaluatedAnswers = attempt.answers.map((ans: any) => {
        const q = ans.question;
        const qId = q.id;
        const userState = answersMap[qId] || { selectedOptionIds: [], isFlagged: false };

        const correctOptionIds = q.options.filter((o: any) => o.isCorrect).map((o: any) => o.id);
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
    },
    [attempt, answersMap, examAttemptId, router]
  );

  // Submit Mock Exam
  const handleSubmitExam = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const userAnswers = Object.entries(answersMap).map(([questionId, data]) => ({
        questionId,
        selectedOptionIds: data.selectedOptionIds,
        isFlagged: data.isFlagged,
      }));

      const timeSpentSeconds = isPracticeMode
        ? elapsedPracticeSeconds
        : attempt
        ? Math.max(0, (attempt.timeLimitMinutes || 130) * 60 - (timeLeftRef.current || 0))
        : 0;

      if (isLocal || !attempt?.id) {
        handleLocalEvaluation(timeSpentSeconds);
        return;
      }

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

      handleLocalEvaluation(timeSpentSeconds);
    } catch (e) {
      console.error('Submit error:', e);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    answersMap,
    isPracticeMode,
    elapsedPracticeSeconds,
    attempt,
    isLocal,
    examAttemptId,
    router,
    handleLocalEvaluation,
  ]);

  const latestSubmitRef = useRef(handleSubmitExam);
  latestSubmitRef.current = handleSubmitExam;

  // Track elapsed study seconds in Practice Mode
  useEffect(() => {
    if (!attempt || attempt.isCompleted || isSubmitting || !isPracticeMode) return;
    const interval = setInterval(() => {
      setElapsedPracticeSeconds((prev) => {
        const next = prev + 1;
        if (examAttemptId && next % 5 === 0) {
          try {
            localStorage.setItem(`aws_cer_mock_exam_elapsed_${examAttemptId}`, String(next));
          } catch {}
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [attempt, isSubmitting, isPracticeMode, examAttemptId]);

  // Countdown timer effect (only runs when timerEnabled is true)
  useEffect(() => {
    if (!attempt || attempt.isCompleted || isSubmitting || !examSettings.timerEnabled) return;
    if (timeLeftRef.current === null || timeLeftRef.current <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          if (!hasAutoSubmittedRef.current) {
            hasAutoSubmittedRef.current = true;
            setTimeout(() => latestSubmitRef.current(), 0);
          }
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
  }, [attempt, isSubmitting, examSettings.timerEnabled, examAttemptId]);

  // Toggle timer ON/OFF in Practice Mode
  const handleToggleTimer = () => {
    if (!isPracticeMode) return;
    const nextTimerEnabled = !examSettings.timerEnabled;
    const updatedSettings: ExamSettings = {
      ...examSettings,
      timerEnabled: nextTimerEnabled,
    };
    setExamSettings(updatedSettings);

    if (examAttemptId) {
      try {
        localStorage.setItem(`aws_cer_mock_exam_settings_${examAttemptId}`, JSON.stringify(updatedSettings));
        if (timeLeftRef.current !== null) {
          localStorage.setItem(`aws_cer_mock_exam_timer_${examAttemptId}`, String(timeLeftRef.current));
        }
      } catch {}
    }

    if (nextTimerEnabled && (timeLeftRef.current === null || timeLeftRef.current <= 0)) {
      const fullSecs = (attempt?.timeLimitMinutes || 130) * 60;
      setTimeLeftSeconds(fullSecs);
      hasAutoSubmittedRef.current = false;
    }

    toast.success(
      nextTimerEnabled ? 'Đã bật đếm giờ ngược' : 'Đã tắt đếm giờ — làm bài không giới hạn thời gian'
    );
  };

  // Toggle "Show Answer After Each Question" ON/OFF in Practice Mode
  const handleToggleShowAnswer = () => {
    if (!isPracticeMode) return;
    const nextShow = !examSettings.showAnswerAfterEach;
    const updatedSettings: ExamSettings = {
      ...examSettings,
      showAnswerAfterEach: nextShow,
    };
    setExamSettings(updatedSettings);

    if (examAttemptId) {
      try {
        localStorage.setItem(`aws_cer_mock_exam_settings_${examAttemptId}`, JSON.stringify(updatedSettings));
      } catch {}
    }

    toast.success(
      nextShow
        ? 'Đã bật hiển thị đáp án sau mỗi câu hỏi'
        : 'Đã tắt hiển thị đáp án — chỉ xem kết quả sau khi nộp bài'
    );
  };

  // Check current question answer immediately in Practice Mode
  const handleCheckQuestionAnswer = (questionId: string) => {
    const state = answersMap[questionId];
    if (!state || state.selectedOptionIds.length === 0) return;

    setCheckedQuestions((prev) => {
      const updated = { ...prev, [questionId]: true };
      if (examAttemptId) {
        try {
          localStorage.setItem(`aws_cer_mock_exam_checked_${examAttemptId}`, JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });
  };

  // Handle Option Toggle with continuous auto-save
  const handleOptionToggle = (questionId: string, optionId: string, type: string) => {
    // Lock options after answer is revealed for this question
    if (isPracticeMode && examSettings.showAnswerAfterEach && checkedQuestions[questionId]) {
      return;
    }

    setAnswersMap((prev) => {
      const current = prev[questionId] || { selectedOptionIds: [], isFlagged: false };
      let newOptions: string[];

      if ((type || 'SINGLE_CHOICE').toUpperCase() === 'SINGLE_CHOICE') {
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
  const isCurrentChecked = !!checkedQuestions[currentQuestion.id];
  const isRevealActive = isPracticeMode && examSettings.showAnswerAfterEach && isCurrentChecked;
  const isCurrentCorrect = isRevealActive
    ? evaluateQuestionCorrect(currentQuestion, currentAnswerState.selectedOptionIds)
    : false;

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs + ':' : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.values(answersMap).filter((a) => a.selectedOptionIds.length > 0).length;

  let checkedCount = 0;
  let checkedCorrectCount = 0;
  let checkedIncorrectCount = 0;
  if (isPracticeMode && examSettings.showAnswerAfterEach) {
    attempt.answers.forEach((ans: any) => {
      const q = ans.question;
      const qId = ans.questionId || q?.id;
      if (checkedQuestions[qId]) {
        checkedCount++;
        const selected = answersMap[qId]?.selectedOptionIds || [];
        if (evaluateQuestionCorrect(q, selected)) checkedCorrectCount++;
        else checkedIncorrectCount++;
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Top Header bar with Countdown Timer, Practice Toggles & Submit Action */}
      <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-lg flex flex-wrap justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-extrabold text-sm sm:text-base">
            {attempt.bankName || attempt.questionBank?.name || (isPracticeMode ? 'Luyện tập thi thử' : 'Bài thi thử SAA-C03')}
          </span>
          {isPracticeMode && (
            <span className="inline-flex items-center text-[11px] font-extrabold text-amber-300 bg-amber-500/20 border border-amber-400/40 px-2.5 py-0.5 rounded-md">
              <Sparkles className="w-3 h-3 mr-1" /> Luyện tập thi thử
            </span>
          )}
          <span className="text-xs bg-white/10 px-2.5 py-1 rounded-md text-amber-300 font-bold">
            {answeredCount}/{attempt.answers.length} Đã làm
          </span>
          {isPracticeMode && examSettings.showAnswerAfterEach && checkedCount > 0 && (
            <span className="text-xs bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1 rounded-md text-emerald-300 font-bold">
              Đúng {checkedCorrectCount}/{checkedCount}
            </span>
          )}
          {isLocal && (
            <span className="hidden sm:inline-flex items-center text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-md">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Chế độ an toàn
            </span>
          )}
        </div>

        {/* Right Controls: Live Timer / Practice Toggles / Submit */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 ml-auto">
          {isPracticeMode ? (
            <>
              {/* Toggle 1: Timer ON/OFF */}
              <button
                type="button"
                onClick={handleToggleTimer}
                title={examSettings.timerEnabled ? 'Bấm để tắt đếm giờ' : 'Bấm để bật đếm giờ'}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-extrabold text-xs sm:text-sm transition cursor-pointer ${
                  examSettings.timerEnabled
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/30'
                    : 'bg-white/10 border-white/15 text-slate-300 hover:bg-white/15'
                }`}
              >
                {examSettings.timerEnabled ? (
                  <>
                    <Clock className="w-4 h-4 animate-pulse shrink-0" />
                    <span className="font-mono">
                      {timeLeftSeconds !== null ? formatTimer(timeLeftSeconds) : '130:00'}
                    </span>
                    <span className="hidden sm:inline text-[10px] font-bold opacity-80 ml-1">• Bật</span>
                  </>
                ) : (
                  <>
                    <TimerOff className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Tắt đếm giờ</span>
                  </>
                )}
              </button>

              {/* Toggle 2: Show Answer After Each Question ON/OFF */}
              <button
                type="button"
                onClick={handleToggleShowAnswer}
                title={
                  examSettings.showAnswerAfterEach
                    ? 'Bấm để tắt hiển thị đáp án sau mỗi câu'
                    : 'Bấm để bật hiển thị đáp án sau mỗi câu'
                }
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border font-extrabold text-xs transition cursor-pointer ${
                  examSettings.showAnswerAfterEach
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30'
                    : 'bg-white/10 border-white/15 text-slate-300 hover:bg-white/15'
                }`}
              >
                {examSettings.showAnswerAfterEach ? (
                  <>
                    <Eye className="w-3.5 h-3.5 shrink-0" />
                    <span>Hiện đáp án: BẬT</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Hiện đáp án: TẮT</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-1.5 bg-amber-500/20 px-3.5 py-1.5 rounded-xl border border-amber-500/40 text-amber-400 font-mono font-extrabold text-sm sm:text-base">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>{timeLeftSeconds !== null ? formatTimer(timeLeftSeconds) : '130:00'}</span>
            </div>
          )}

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
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-100 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg">
                Câu {currentIndex + 1} / {attempt.answers.length}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                {currentQuestion.domain?.name || 'AWS Domain'}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg">
                {(currentQuestion.type || 'SINGLE_CHOICE').toUpperCase() === 'MULTIPLE_CHOICE'
                  ? 'Chọn nhiều đáp án'
                  : 'Chọn 1 đáp án'}
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
              const isRightOption = Boolean(opt.isCorrect);
              const labelLetter = String.fromCharCode(65 + index);

              let containerClass =
                'border-slate-200 bg-white hover:border-slate-300 text-slate-800 cursor-pointer';
              let letterClass = 'bg-slate-100 text-slate-600';

              if (isRevealActive) {
                if (isRightOption && isSelected) {
                  containerClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold cursor-default';
                  letterClass = 'bg-emerald-600 text-white';
                } else if (isRightOption && !isSelected) {
                  containerClass =
                    'border-emerald-400 border-dashed bg-emerald-50/60 text-emerald-900 font-semibold cursor-default';
                  letterClass = 'bg-emerald-500 text-white';
                } else if (isSelected && !isRightOption) {
                  containerClass = 'border-red-400 bg-red-50 text-red-900 font-semibold cursor-default';
                  letterClass = 'bg-red-600 text-white';
                } else {
                  containerClass = 'border-slate-200 bg-slate-50/50 text-slate-500 opacity-75 cursor-default';
                  letterClass = 'bg-slate-200 text-slate-500';
                }
              } else if (isSelected) {
                containerClass = 'border-amber-500 bg-amber-50/60 text-slate-950 font-bold shadow-xs cursor-pointer';
                letterClass = 'bg-amber-500 text-slate-950';
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isRevealActive}
                  onClick={() => handleOptionToggle(currentQuestion.id, opt.id, currentQuestion.type)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition flex items-start space-x-3 text-sm ${containerClass}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 ${letterClass}`}
                  >
                    {labelLetter}
                  </span>
                  <span className="flex-1 leading-relaxed">{opt.text}</span>

                  {isRevealActive && isSelected && isRightOption && (
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                      Bạn chọn đúng
                    </span>
                  )}
                  {isRevealActive && isSelected && !isRightOption && (
                    <span className="text-[10px] font-black uppercase text-red-700 bg-red-100 px-2 py-0.5 rounded shrink-0">
                      Bạn đã chọn
                    </span>
                  )}
                  {isRevealActive && !isSelected && isRightOption && (
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                      Đáp án đúng
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Practice Mode: Check Answer Button */}
          {isPracticeMode && examSettings.showAnswerAfterEach && !isCurrentChecked && (
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentAnswerState.selectedOptionIds.length === 0}
                onClick={() => handleCheckQuestionAnswer(currentQuestion.id)}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Eye className="w-4 h-4 mr-2" />
                Kiểm tra đáp án &amp; Xem giải thích
              </button>
              <span className="text-[11px] text-slate-400 font-semibold">
                Chọn đáp án rồi bấm kiểm tra để hiển thị đáp án ngay sau câu hỏi này.
              </span>
            </div>
          )}

          {/* Practice Mode: Instant Feedback & Explanation */}
          {isRevealActive && (
            <div className="space-y-3 pt-2 animate-in fade-in">
              <div
                className={`p-3.5 rounded-xl border flex items-center space-x-2.5 text-xs sm:text-sm font-extrabold ${
                  isCurrentCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-red-50 border-red-300 text-red-900'
                }`}
              >
                {isCurrentCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Chính xác! Bạn đã chọn đúng đáp án.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>Chưa chính xác. Hãy xem đáp án đúng và giải thích chi tiết bên dưới.</span>
                  </>
                )}
              </div>

              {currentQuestion.explanationText ? (
                <div className="p-4 sm:p-5 rounded-xl bg-slate-50/90 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-800 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Giải thích chi tiết (Song ngữ Anh - Việt)</span>
                  </div>
                  <MarkdownExplanation content={currentQuestion.explanationText} theme="light" />
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 italic">
                  Câu hỏi này chưa có phần giải thích chi tiết.
                </div>
              )}
            </div>
          )}

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
              const q = ans.question;
              const qId = ans.questionId || q?.id;
              const state = answersMap[qId] || { selectedOptionIds: [], isFlagged: false };
              const isAnswered = state.selectedOptionIds.length > 0;
              const isCurrent = idx === currentIndex;
              const isChecked = isPracticeMode && examSettings.showAnswerAfterEach && !!checkedQuestions[qId];

              let btnStyle = 'bg-slate-100 text-slate-600 border-slate-200';
              if (isCurrent) {
                btnStyle = 'ring-2 ring-amber-500 font-extrabold bg-slate-900 text-white';
              } else if (isChecked) {
                const isRight = evaluateQuestionCorrect(q, state.selectedOptionIds);
                btnStyle = isRight
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-400 font-bold'
                  : 'bg-red-100 text-red-800 border-red-400 font-bold';
              } else if (state.isFlagged) {
                btnStyle = 'bg-amber-100 text-amber-800 border-amber-400 font-bold';
              } else if (isAnswered) {
                btnStyle =
                  isPracticeMode && examSettings.showAnswerAfterEach
                    ? 'bg-sky-100 text-sky-800 border-sky-300 font-bold'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';
              }

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
            {isPracticeMode && examSettings.showAnswerAfterEach ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400 inline-block" />
                  <span>Đã kiểm tra: Đúng ({checkedCorrectCount})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-red-100 border border-red-400 inline-block" />
                  <span>Đã kiểm tra: Sai ({checkedIncorrectCount})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded bg-sky-100 border border-sky-300 inline-block" />
                  <span>Đã chọn chưa kiểm tra ({Math.max(0, answeredCount - checkedCount)})</span>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400 inline-block" />
                <span>Đã trả lời ({answeredCount})</span>
              </div>
            )}
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

export default function MockExamRunnerPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-slate-500 font-semibold text-sm">
          Đang tải đề thi thử...
        </div>
      }
    >
      <MockExamRunnerContent />
    </Suspense>
  );
}
