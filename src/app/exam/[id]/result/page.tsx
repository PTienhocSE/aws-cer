'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import MarkdownExplanation from '@/components/MarkdownExplanation';
import {
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Flag,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from 'lucide-react';

export default function MockExamResultPage() {
  const { id: examAttemptId } = useParams<{ id: string }>();
  const router = useRouter();

  const isLocal = examAttemptId?.startsWith('local-');
  const [localResult, setLocalResult] = useState<any>(null);
  const [filterMode, setFilterMode] = useState<'ALL' | 'INCORRECT' | 'CORRECT' | 'FLAGGED'>('ALL');
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (examAttemptId) {
      try {
        const raw = localStorage.getItem(`aws_cer_mock_exam_result_${examAttemptId}`);
        if (raw) {
          setLocalResult(JSON.parse(raw));
        } else {
          const rawExam = localStorage.getItem(`aws_cer_mock_exam_${examAttemptId}`);
          if (rawExam) setLocalResult({ attempt: JSON.parse(rawExam) });
        }
      } catch {}
    }
  }, [examAttemptId]);

  const { data, isLoading } = useQuery({
    queryKey: ['mockExamResult', examAttemptId],
    queryFn: async () => {
      if (isLocal) return null;
      try {
        const res = await fetch(`/api/mock-exams/${examAttemptId}`, {
          headers: { 'x-guest-mode': '1' },
          credentials: 'include',
        });
        if (!res.ok) {
          const cached = localStorage.getItem(`aws_cer_mock_exam_result_${examAttemptId}`);
          if (cached) return JSON.parse(cached);
          throw new Error('Failed to fetch exam result');
        }
        const d = await res.json();
        return d;
      } catch (err) {
        const cached = localStorage.getItem(`aws_cer_mock_exam_result_${examAttemptId}`);
        if (cached) return JSON.parse(cached);
        throw err;
      }
    },
    enabled: !isLocal && !!examAttemptId,
  });

  const attempt = isLocal ? localResult?.attempt : data?.attempt || localResult?.attempt;

  if ((isLoading && !localResult) || !attempt) {
    return (
      <div className="py-20 text-center text-slate-500 font-semibold text-sm">
        Đang tải kết quả bài thi...
      </div>
    );
  }

  const score = attempt.score ?? 720;
  const isPassed = attempt.isPassed ?? score >= 720;
  const totalQuestions = attempt.answers?.length || attempt.totalQuestions || 65;

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  let flaggedCount = 0;

  attempt.answers.forEach((ans: any) => {
    let parsedSelected: string[] = [];
    try {
      const raw = ans.selectedOptionIds;
      parsedSelected = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
    } catch {
      parsedSelected = [];
    }

    if (ans.isFlagged) flaggedCount++;

    if (parsedSelected.length === 0) {
      unansweredCount++;
    } else if (ans.isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const accuracyPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Filter questions according to active tab
  const filteredAnswers = attempt.answers.filter((ans: any) => {
    let parsedSelected: string[] = [];
    try {
      const raw = ans.selectedOptionIds;
      parsedSelected = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
    } catch {
      parsedSelected = [];
    }

    if (filterMode === 'INCORRECT') {
      return !ans.isCorrect || parsedSelected.length === 0;
    }
    if (filterMode === 'CORRECT') {
      return ans.isCorrect === true && parsedSelected.length > 0;
    }
    if (filterMode === 'FLAGGED') {
      return ans.isFlagged === true;
    }
    return true;
  });

  const isAllCollapsed = useMemo(() => {
    if (filteredAnswers.length === 0) return false;
    return filteredAnswers.every((ans: any) => {
      const qId = ans.id || ans.question?.id;
      return collapsedIds.has(qId);
    });
  }, [filteredAnswers, collapsedIds]);

  const toggleCollapseAll = () => {
    if (isAllCollapsed) {
      setCollapsedIds(new Set());
    } else {
      setCollapsedIds(new Set(filteredAnswers.map((ans: any) => ans.id || ans.question?.id)));
    }
  };

  const toggleQuestion = (qId: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(qId)) next.delete(qId);
      else next.add(qId);
      return next;
    });
  };

  const handlePracticeIncorrect = async () => {
    try {
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-mode': '1',
        },
        credentials: 'include',
        body: JSON.stringify({ status: 'INCORRECT', limit: 20 }),
      });
      const result = await res.json();
      if (result.sessionId) {
        router.push(`/practice/${result.sessionId}`);
      } else {
        router.push('/questions?status=INCORRECT');
      }
    } catch (e) {
      router.push('/questions?status=INCORRECT');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Score Banner */}
      <div
        className={`p-8 rounded-2xl border shadow-xl flex flex-col md:flex-row justify-between items-center gap-6 ${
          isPassed
            ? 'bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white border-emerald-500/30'
            : 'bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 text-white border-red-500/30'
        }`}
      >
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/15">
            <Award className="w-3.5 h-3.5 mr-1 text-amber-400" /> KẾT QUẢ THI THỬ SAA-C03
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center justify-center md:justify-start gap-2">
            <span>{isPassed ? 'Chúc mừng! Bạn đã ĐẠT kỳ thi' : 'Chưa đạt - Hãy tiếp tục luyện tập!'}</span>
            {isPassed ? (
              <Trophy className="w-8 h-8 text-amber-400 inline shrink-0" />
            ) : (
              <Target className="w-8 h-8 text-rose-400 inline shrink-0" />
            )}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
            {isPassed
              ? 'Điểm số của bạn vượt ngưỡng yêu cầu 720/1000 của AWS. Bạn đã nắm rất vững kiến thức đề thi này!'
              : 'Hãy tập trung rà soát lại các câu làm sai và đọc kỹ phần giải thích chi tiết song ngữ Anh - Việt bên dưới.'}
          </p>
        </div>

        {/* Score Badge */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 text-center shrink-0 min-w-[180px]">
          <div className="text-xs uppercase font-extrabold text-slate-300">Điểm số AWS</div>
          <div className={`text-4xl font-extrabold my-1 ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
            {score}
          </div>
          <div className="text-[11px] font-bold text-slate-300">
            {isPassed ? 'PASSED (≥ 720)' : 'FAILED (< 720)'}
          </div>
        </div>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card-saas p-4 text-center">
          <div className="text-xs font-bold text-slate-500">Tỷ lệ đúng</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{accuracyPercent}%</div>
        </div>
        <div className="card-saas p-4 text-center">
          <div className="text-xs font-bold text-slate-500">Số câu đúng</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">{correctCount}</div>
        </div>
        <div className="card-saas p-4 text-center">
          <div className="text-xs font-bold text-slate-500">Số câu sai</div>
          <div className="text-2xl font-extrabold text-red-600 mt-1">{incorrectCount}</div>
        </div>
        <div className="card-saas p-4 text-center">
          <div className="text-xs font-bold text-slate-500">Chưa trả lời</div>
          <div className="text-2xl font-extrabold text-slate-400 mt-1">{unansweredCount}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        {incorrectCount > 0 && (
          <button
            onClick={handlePracticeIncorrect}
            className="flex-1 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-xl shadow transition flex items-center justify-center cursor-pointer"
          >
            <Target className="w-4 h-4 mr-2 text-slate-950" /> Luyện tập lại các câu sai ({incorrectCount})
          </button>
        )}
        <Link
          href="/exam"
          className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl transition shadow flex items-center justify-center"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Thi thử đề khác
        </Link>
      </div>

      {/* Review Questions Section with Filters */}
      <div className="card-saas p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-base font-extrabold text-slate-900">Chi tiết đáp án &amp; Giải thích</h2>
            <p className="text-xs text-slate-500">
              Rà soát từng câu hỏi kèm đáp án của bạn, đáp án chính xác và phân tích chuyên sâu song ngữ.
            </p>
          </div>

          {/* Action Tools & Filter Pills: strictly 1 row, aligned right, no wrapping */}
          <div className="flex items-center gap-1.5 flex-nowrap shrink-0 lg:ml-auto overflow-x-auto max-w-full pb-1 lg:pb-0">
            <button
              onClick={toggleCollapseAll}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center whitespace-nowrap shrink-0 border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 shadow-2xs"
              title={isAllCollapsed ? 'Mở rộng tất cả câu hỏi' : 'Thu gọn tất cả câu hỏi'}
            >
              {isAllCollapsed ? (
                <>
                  <ChevronDown className="w-3.5 h-3.5 mr-1 text-slate-600" />
                  <span>Mở rộng tất cả</span>
                </>
              ) : (
                <>
                  <ChevronUp className="w-3.5 h-3.5 mr-1 text-slate-600" />
                  <span>Thu gọn tất cả</span>
                </>
              )}
            </button>
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
                filterMode === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả ({totalQuestions})
            </button>
            <button
              onClick={() => setFilterMode('INCORRECT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center whitespace-nowrap shrink-0 ${
                filterMode === 'INCORRECT'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5 mr-1" /> Làm sai ({incorrectCount + unansweredCount})
            </button>
            <button
              onClick={() => setFilterMode('CORRECT')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center whitespace-nowrap shrink-0 ${
                filterMode === 'CORRECT'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Làm đúng ({correctCount})
            </button>
            {flaggedCount > 0 && (
              <button
                onClick={() => setFilterMode('FLAGGED')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center whitespace-nowrap shrink-0 ${
                  filterMode === 'FLAGGED'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <Flag className="w-3.5 h-3.5 mr-1" /> Cắm cờ ({flaggedCount})
              </button>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredAnswers.map((ans: any, idx: number) => {
            const q = ans.question;
            let userSelectedIds: string[] = [];
            try {
              const raw = ans.selectedOptionIds;
              userSelectedIds = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
            } catch {
              userSelectedIds = [];
            }

            const isCorrect = ans.isCorrect === true;
            const originalIndex = attempt.answers.findIndex((a: any) => (a.questionId || a.question?.id) === q.id);
            const questionNumber = originalIndex >= 0 ? originalIndex + 1 : idx + 1;
            const qId = ans.id || ans.question?.id || String(idx);
            const isCollapsed = collapsedIds.has(qId);

            return (
              <div
                key={ans.id || idx}
                className={`p-5 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : userSelectedIds.length === 0
                    ? 'border-slate-200 bg-slate-50/50'
                    : 'border-red-200 bg-red-50/20'
                }`}
              >
                {/* Question Header (Clickable to collapse/expand) */}
                <div
                  onClick={() => toggleQuestion(qId)}
                  className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 cursor-pointer select-none group"
                >
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
                        isCorrect
                          ? 'bg-emerald-600 text-white'
                          : userSelectedIds.length === 0
                          ? 'bg-slate-500 text-white'
                          : 'bg-red-600 text-white'
                      }`}
                    >
                      Câu #{questionNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {q.domain?.name || 'AWS Domain'}
                    </span>
                    {ans.isFlagged && (
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded flex items-center">
                        <Flag className="w-3 h-3 mr-1 fill-amber-500 text-amber-500" /> Đã cắm cờ
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : userSelectedIds.length === 0
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Trả lời đúng
                        </>
                      ) : userSelectedIds.length === 0 ? (
                        'Chưa trả lời'
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 mr-1 text-red-600" /> Trả lời sai
                        </>
                      )}
                    </span>
                    <button
                      type="button"
                      aria-label={isCollapsed ? 'Mở rộng câu hỏi' : 'Thu gọn câu hỏi'}
                      className="w-7 h-7 rounded-lg bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition text-slate-600"
                    >
                      {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Content */}
                {isCollapsed ? (
                  <p
                    onClick={() => toggleQuestion(qId)}
                    className="text-xs text-slate-600 font-medium truncate pt-3 cursor-pointer hover:text-slate-900 transition"
                  >
                    {q.questionText}
                  </p>
                ) : (
                  <div className="space-y-4 pt-3">
                    {/* Question Text */}
                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                      {q.questionText}
                    </p>

                    {/* Options Comparison */}
                    <div className="space-y-2">
                      {q.options?.map((opt: any, optIdx: number) => {
                        const isSelected = userSelectedIds.includes(opt.id);
                        const isRightOption = opt.isCorrect;
                        const optLetter = String.fromCharCode(65 + optIdx);

                        let optBg = 'bg-white border-slate-200 text-slate-700';
                        if (isRightOption && isSelected) {
                          optBg = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isRightOption && !isSelected) {
                          optBg = 'bg-emerald-50/60 border-emerald-300 text-emerald-900 font-semibold border-dashed';
                        } else if (isSelected && !isRightOption) {
                          optBg = 'bg-red-50 border-red-300 text-red-900';
                        }

                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start space-x-2.5 ${optBg}`}
                          >
                            <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 bg-black/5">
                              {optLetter}
                            </span>
                            <div className="flex-1 leading-relaxed">{opt.text}</div>

                            {isSelected && isRightOption && (
                              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                                Bạn chọn đúng
                              </span>
                            )}
                            {isSelected && !isRightOption && (
                              <span className="text-[10px] font-black uppercase text-red-700 bg-red-100 px-2 py-0.5 rounded shrink-0">
                                Bạn đã chọn
                              </span>
                            )}
                            {!isSelected && isRightOption && (
                              <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                                Đáp án đúng
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    {q.explanationText && (
                      <div className="mt-4 p-4 rounded-xl bg-slate-50/90 border border-slate-200">
                        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-800 mb-2">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Giải thích chi tiết (Song ngữ Anh - Việt)</span>
                        </div>
                        <MarkdownExplanation content={q.explanationText} theme="light" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
