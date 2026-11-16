'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Check,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import HighlightableText from '@/components/HighlightableText';
import MarkdownExplanation from '@/components/MarkdownExplanation';

interface SessionReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: {
    id: string;
    type: 'practice' | 'exam';
    title?: string;
    isLocal?: boolean;
    score?: number;
    isPassed?: boolean;
  } | null;
}

export default function SessionReviewModal({
  isOpen,
  onClose,
  session,
}: SessionReviewModalProps) {
  const [mounted, setMounted] = useState(false);
  const [filterMode, setFilterMode] = useState<'ALL' | 'INCORRECT' | 'CORRECT'>('ALL');
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset filters when session changes
  useEffect(() => {
    setFilterMode('ALL');
    setCollapsedIds(new Set());
  }, [session?.id]);

  // 1. Fetch practice session questions
  const { data: practiceData, isLoading: practiceLoading } = useQuery({
    queryKey: ['sessionQuestionsModal', session?.id],
    queryFn: async () => {
      if (!session || session.type !== 'practice') return null;
      const res = await fetch(`/api/practice-sessions/${session.id}/questions`, {
        headers: { 'x-guest-mode': '1' },
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Không thể tải câu hỏi phiên học');
      return res.json();
    },
    enabled: isOpen && !!session && session.type === 'practice',
  });

  // 2. Fetch mock exam questions
  const { data: examData, isLoading: examLoading } = useQuery({
    queryKey: ['examQuestionsModal', session?.id],
    queryFn: async () => {
      if (!session || session.type !== 'exam') return null;
      if (session.isLocal || session.id.startsWith('local-')) {
        const cached = localStorage.getItem(`aws_cer_mock_exam_result_${session.id}`);
        if (cached) return JSON.parse(cached);
        const cachedExam = localStorage.getItem(`aws_cer_mock_exam_${session.id}`);
        if (cachedExam) return { attempt: JSON.parse(cachedExam) };
        return null;
      }
      try {
        const res = await fetch(`/api/mock-exams/${session.id}`, {
          headers: { 'x-guest-mode': '1' },
          credentials: 'include',
        });
        if (!res.ok) {
          const cached = localStorage.getItem(`aws_cer_mock_exam_result_${session.id}`);
          if (cached) return JSON.parse(cached);
          throw new Error('Không thể tải bài thi thử');
        }
        return res.json();
      } catch (err) {
        const cached = localStorage.getItem(`aws_cer_mock_exam_result_${session.id}`);
        if (cached) return JSON.parse(cached);
        throw err;
      }
    },
    enabled: isOpen && !!session && session.type === 'exam',
  });

  // Normalize questions across practice and exam
  const normalizedData = useMemo(() => {
    if (!session) return { title: '', questions: [], stats: { total: 0, correct: 0, incorrect: 0, unanswered: 0 } };

    if (session.type === 'practice') {
      const qs = practiceData?.questions || [];
      let correct = 0;
      let incorrect = 0;
      let unanswered = 0;

      const items = qs.map((q: any, idx: number) => {
        const userSelected: string[] = q.userSelectedOptionIds || [];
        const correctIds: string[] =
          q.correctOptionIds ||
          q.options?.filter((o: any) => o.isCorrect).map((o: any) => o.id) ||
          [];

        const isAnswered = !!q.isAnswered;
        const isCorrect =
          isAnswered &&
          userSelected.length === correctIds.length &&
          userSelected.every((id: string) => correctIds.includes(id));

        if (!isAnswered) unanswered++;
        else if (isCorrect) correct++;
        else incorrect++;

        return {
          id: q.id,
          index: idx + 1,
          domainName: q.domainName || 'General',
          content: q.content,
          explanation: q.explanation,
          isAnswered,
          isCorrect,
          userSelectedIds: userSelected,
          correctOptionIds: correctIds,
          options: q.options || [],
          userHighlights: q.userHighlights || [],
        };
      });

      return {
        title: session.title || practiceData?.session?.title || 'Phiên luyện tập',
        questions: items,
        stats: { total: items.length, correct, incorrect, unanswered },
      };
    } else {
      // Exam
      const attempt = examData?.attempt;
      const answers = attempt?.answers || [];
      let correct = 0;
      let incorrect = 0;
      let unanswered = 0;

      const items = answers.map((ans: any, idx: number) => {
        const q = ans.question || {};
        let userSelected: string[] = [];
        try {
          const raw = ans.selectedOptionIds;
          userSelected = typeof raw === 'string' ? JSON.parse(raw) : raw || [];
        } catch {
          userSelected = [];
        }

        const correctIds = (q.options || [])
          .filter((o: any) => o.isCorrect)
          .map((o: any) => o.id);

        const isAnswered = userSelected.length > 0;
        const isCorrect =
          ans.isCorrect !== undefined && ans.isCorrect !== null
            ? ans.isCorrect
            : isAnswered &&
              userSelected.length === correctIds.length &&
              userSelected.every((id: string) => correctIds.includes(id));

        if (!isAnswered) unanswered++;
        else if (isCorrect) correct++;
        else incorrect++;

        return {
          id: q.id || ans.id || String(idx),
          index: idx + 1,
          domainName: q.domain?.name || 'AWS Certification',
          content: q.questionText || q.content || 'Câu hỏi',
          explanation: q.explanationText || q.explanation,
          isAnswered,
          isCorrect,
          userSelectedIds: userSelected,
          correctOptionIds: correctIds,
          options: (q.options || []).map((opt: any, optIdx: number) => ({
            id: opt.id,
            key: String.fromCharCode(65 + optIdx),
            content: opt.text || opt.content,
            isCorrect: opt.isCorrect,
          })),
          userHighlights: [],
        };
      });

      return {
        title: session.title || 'Bài thi thử AWS (65 câu)',
        questions: items,
        stats: {
          total: attempt?.totalQuestions || items.length,
          correct,
          incorrect,
          unanswered,
          score: attempt?.score ?? session.score,
          isPassed: attempt?.isPassed ?? session.isPassed,
        },
      };
    }
  }, [session, practiceData, examData]);

  if (!mounted || !isOpen || !session) return null;

  const isLoading = session.type === 'practice' ? practiceLoading : examLoading;

  const filteredQuestions = normalizedData.questions.filter((q: any) => {
    if (filterMode === 'INCORRECT') return !q.isCorrect && q.isAnswered;
    if (filterMode === 'CORRECT') return q.isCorrect;
    return true;
  });

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isAllCollapsed =
    filteredQuestions.length > 0 &&
    filteredQuestions.every((q: any) => collapsedIds.has(q.id));

  const toggleCollapseAll = () => {
    if (isAllCollapsed) {
      setCollapsedIds(new Set());
    } else {
      setCollapsedIds(new Set(filteredQuestions.map((q: any) => q.id)));
    }
  };

  const fullReviewUrl =
    session.type === 'practice'
      ? `/practice/${session.id}?mode=review`
      : `/exam/${session.id}/result`;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-50 max-w-4xl w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col my-auto"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  session.type === 'practice'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {session.type === 'practice' ? 'Phiên luyện tập' : 'Phiên thi thử'}
              </span>
              <h2 className="text-base font-extrabold text-slate-900 truncate max-w-md">
                {normalizedData.title}
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
              <span className="text-emerald-600 font-black">
                {normalizedData.stats.correct} đúng
              </span>
              <span>•</span>
              <span className="text-rose-600 font-black">
                {normalizedData.stats.incorrect} sai
              </span>
              {normalizedData.stats.unanswered > 0 && (
                <>
                  <span>•</span>
                  <span className="text-slate-400">
                    {normalizedData.stats.unanswered} chưa làm
                  </span>
                </>
              )}
              {normalizedData.stats.score !== undefined && (
                <>
                  <span>•</span>
                  <span
                    className={`font-black ${
                      normalizedData.stats.isPassed ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    Điểm: {normalizedData.stats.score} (
                    {normalizedData.stats.isPassed ? 'PASSED' : 'FAILED'})
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <Link
              href={fullReviewUrl}
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs"
            >
              <span>Xem trang đầy đủ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
              title="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="px-5 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer ${
                filterMode === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả ({normalizedData.questions.length})
            </button>
            <button
              onClick={() => setFilterMode('INCORRECT')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                filterMode === 'INCORRECT'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Làm sai ({normalizedData.stats.incorrect})</span>
            </button>
            <button
              onClick={() => setFilterMode('CORRECT')}
              className={`px-3 py-1 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1 ${
                filterMode === 'CORRECT'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Làm đúng ({normalizedData.stats.correct})</span>
            </button>
          </div>

          <button
            onClick={toggleCollapseAll}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition cursor-pointer whitespace-nowrap ml-auto"
          >
            {isAllCollapsed ? (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>Mở rộng tất cả</span>
              </>
            ) : (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>Thu gọn tất cả</span>
              </>
            )}
          </button>
        </div>

        {/* Question List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {isLoading ? (
            <div className="py-20 text-center text-slate-400 text-xs font-bold">
              Đang tải chi tiết các câu hỏi trong phiên...
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs font-bold">
              Không có câu hỏi nào khớp với bộ lọc.
            </div>
          ) : (
            filteredQuestions.map((q: any) => {
              const isCollapsed = collapsedIds.has(q.id);

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl border transition shadow-xs overflow-hidden ${
                    !q.isAnswered
                      ? 'border-slate-200'
                      : q.isCorrect
                      ? 'border-emerald-200'
                      : 'border-rose-200'
                  }`}
                >
                  {/* Question Header (Always Visible / Click to Toggle) */}
                  <div
                    onClick={() => toggleCollapse(q.id)}
                    className="p-4 flex items-center justify-between gap-3 cursor-pointer select-none bg-slate-50/50 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {q.index}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {q.domainName}
                      </span>

                      {!q.isAnswered ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          Chưa làm
                        </span>
                      ) : q.isCorrect ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Đúng
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-rose-600" /> Sai
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCollapse(q.id);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded-lg transition"
                    >
                      {isCollapsed ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Question Body (Collapsible) */}
                  {!isCollapsed && (
                    <div className="p-4 sm:p-5 pt-1 space-y-4 border-t border-slate-100">
                      <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                        <HighlightableText
                          questionId={q.id}
                          text={q.content}
                          highlights={q.userHighlights}
                        />
                      </div>

                      {/* Options */}
                      <div className="space-y-2 pt-1">
                        <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                          Đáp án:
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {q.options.map((opt: any, optIdx: number) => {
                            const letter = opt.key || String.fromCharCode(65 + optIdx);
                            const isUserSelected = q.userSelectedIds.includes(opt.id);
                            const isCorrectOpt = q.correctOptionIds.includes(opt.id);

                            let cardClass = 'bg-white border-slate-200 text-slate-600 opacity-70';
                            let badge = null;

                            if (isUserSelected && isCorrectOpt) {
                              cardClass =
                                'bg-emerald-50/90 border-2 border-emerald-500 text-emerald-950 font-bold shadow-xs';
                              badge = (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-600 text-white shrink-0">
                                  <Check className="w-3 h-3 mr-0.5" /> Bạn đã chọn (Chính xác)
                                </span>
                              );
                            } else if (isUserSelected && !isCorrectOpt) {
                              cardClass =
                                'bg-rose-50/90 border-2 border-rose-500 text-rose-950 font-bold shadow-xs';
                              badge = (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-rose-600 text-white shrink-0">
                                  <XCircle className="w-3 h-3 mr-0.5" /> Bạn đã chọn (Sai)
                                </span>
                              );
                            } else if (!isUserSelected && isCorrectOpt) {
                              cardClass =
                                'bg-emerald-50/60 border-2 border-emerald-400 text-emerald-950 font-bold';
                              badge = (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                                  <Check className="w-3 h-3 mr-0.5 text-emerald-600" /> Đáp án chuẩn AWS
                                </span>
                              );
                            }

                            return (
                              <div
                                key={opt.id}
                                className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition ${cardClass}`}
                              >
                                <span
                                  className={`w-5 h-5 rounded-md text-[11px] font-black flex items-center justify-center shrink-0 ${
                                    isCorrectOpt
                                      ? 'bg-emerald-600 text-white'
                                      : isUserSelected
                                      ? 'bg-rose-600 text-white'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {letter}
                                </span>
                                <div className="flex-1 pt-0.5 leading-relaxed">
                                  {opt.content || opt.text}
                                </div>
                                {badge}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Explanation */}
                      {q.explanation && (
                        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 space-y-1.5 mt-2">
                          <div className="flex items-center space-x-1.5 text-xs font-black uppercase tracking-wider text-amber-800">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>Phân tích & Giải thích:</span>
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
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-500 font-semibold">
            Hiển thị {filteredQuestions.length}/{normalizedData.questions.length} câu hỏi
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs rounded-xl transition cursor-pointer"
            >
              Đóng
            </button>

            <Link
              href={fullReviewUrl}
              onClick={onClose}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Mở trang xem lại đầy đủ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
