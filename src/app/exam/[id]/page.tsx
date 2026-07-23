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
} from 'lucide-react';

export default function MockExamRunnerPage() {
  const { id: examAttemptId } = useParams<{ id: string }>();
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersMap, setAnswersMap] = useState<Record<string, { selectedOptionIds: string[]; isFlagged: boolean }>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: examData, isLoading } = useQuery({
    queryKey: ['mockExam', examAttemptId],
    queryFn: async () => {
      const res = await fetch(`/api/mock-exams/${examAttemptId}`);
      if (!res.ok) throw new Error('Failed to fetch mock exam');
      return res.json();
    },
  });

  const attempt = examData?.attempt;

  // Initialize timer and answer map
  useEffect(() => {
    if (attempt) {
      const initialMap: Record<string, { selectedOptionIds: string[]; isFlagged: boolean }> = {};
      attempt.answers.forEach((ans: any) => {
        // selectedOptionIds is stored as JSON string in DB e.g. "[]" or "[\"id1\"]"
        let parsedIds: string[] = [];
        try {
          const raw = ans.selectedOptionIds;
          parsedIds = typeof raw === 'string' ? JSON.parse(raw) : (raw || []);
        } catch {
          parsedIds = [];
        }
        initialMap[ans.questionId] = {
          selectedOptionIds: parsedIds,
          isFlagged: ans.isFlagged || false,
        };
      });
      setAnswersMap(initialMap);

      if (timeLeftSeconds === null) {
        const totalSecs = attempt.timeLimitMinutes * 60;
        const elapsedSecs = Math.floor((Date.now() - new Date(attempt.startedAt).getTime()) / 1000);
        setTimeLeftSeconds(Math.max(totalSecs - elapsedSecs, 0));
      }
    }
  }, [attempt]);

  // Countdown timer effect
  useEffect(() => {
    if (timeLeftSeconds === null || timeLeftSeconds <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleSubmitExam(); // Auto submit when time runs out!
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds]);

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

      return {
        ...prev,
        [questionId]: { ...current, selectedOptionIds: newOptions },
      };
    });
  };

  const handleFlagToggle = (questionId: string) => {
    setAnswersMap((prev) => {
      const current = prev[questionId] || { selectedOptionIds: [], isFlagged: false };
      return {
        ...prev,
        [questionId]: { ...current, isFlagged: !current.isFlagged },
      };
    });
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    try {
      const userAnswers = Object.entries(answersMap).map(([questionId, data]) => ({
        questionId,
        selectedOptionIds: data.selectedOptionIds,
        isFlagged: data.isFlagged,
      }));

      const res = await fetch(`/api/mock-exams/${examAttemptId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAnswers }),
      });

      const data = await res.json();
      if (data.attemptId) {
        router.push(`/exam/${examAttemptId}/result`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !attempt) {
    return <div className="py-20 text-center text-slate-500 font-semibold text-sm">Đang tải đề thi...</div>;
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
          <span className="font-extrabold text-sm sm:text-base">Bài thi thử SAA-C03</span>
          <span className="text-xs bg-white/10 px-2.5 py-1 rounded-md text-amber-300 font-bold">
            {answeredCount}/{attempt.answers.length} Đã làm
          </span>
        </div>

        {/* Live Timer */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 bg-amber-500/20 px-3.5 py-1.5 rounded-xl border border-amber-500/40 text-amber-400 font-mono font-extrabold text-sm sm:text-base">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>{timeLeftSeconds !== null ? formatTimer(timeLeftSeconds) : '130:00'}</span>
          </div>

          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs rounded-xl shadow transition flex items-center"
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
              <span className="text-xs font-extrabold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                Câu {currentIndex + 1} / {attempt.answers.length}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded border border-amber-200">
                {currentQuestion.domain.name}
              </span>
            </div>

            <button
              onClick={() => handleFlagToggle(currentQuestion.id)}
              className={`flex items-center text-xs font-bold px-3 py-1.5 rounded-lg border transition ${
                currentAnswerState.isFlagged
                  ? 'bg-amber-50 border-amber-400 text-amber-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 mr-1.5 ${currentAnswerState.isFlagged ? 'fill-amber-500' : ''}`} />
              {currentAnswerState.isFlagged ? 'Đã cắm cờ' : 'Cắm cờ xem lại'}
            </button>
          </div>

          <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
            {currentQuestion.questionText}
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((opt: any, index: number) => {
              const isSelected = currentAnswerState.selectedOptionIds.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionToggle(currentQuestion.id, opt.id, currentQuestion.type)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition flex items-start space-x-3 text-sm ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/60 text-slate-950 font-bold shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-extrabold text-slate-600 text-xs shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="px-4 py-2.5 bg-white border border-slate-200 font-bold text-xs rounded-xl disabled:opacity-40 flex items-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Câu trước
            </button>

            <button
              disabled={currentIndex >= attempt.answers.length - 1}
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl disabled:opacity-40 flex items-center shadow"
            >
              Câu sau <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <div className="card-saas p-5 space-y-4">
          <h2 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Danh sách câu hỏi</h2>
          <div className="grid grid-cols-5 gap-2">
            {attempt.answers.map((ans: any, idx: number) => {
              const state = answersMap[ans.question.id] || { selectedOptionIds: [], isFlagged: false };
              const isAnswered = state.selectedOptionIds.length > 0;
              const isCurrent = idx === currentIndex;

              let btnStyle = 'bg-slate-100 text-slate-600 border-slate-200';
              if (isCurrent) btnStyle = 'ring-2 ring-amber-500 font-extrabold bg-slate-900 text-white';
              else if (state.isFlagged) btnStyle = 'bg-amber-100 text-amber-800 border-amber-400 font-bold';
              else if (isAnswered) btnStyle = 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold';

              return (
                <button
                  key={ans.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-lg border text-xs flex items-center justify-center transition ${btnStyle}`}
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
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={handleSubmitExam}
                disabled={isSubmitting}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-xs rounded-xl shadow"
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
