'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import MarkdownExplanation from '@/components/MarkdownExplanation';
import {
  Award,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
  ShieldCheck,
  Target,
  XCircle,
} from 'lucide-react';

export default function MockExamResultPage() {
  const { id: examAttemptId } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['mockExamResult', examAttemptId],
    queryFn: async () => {
      const res = await fetch(`/api/mock-exams/${examAttemptId}`);
      if (!res.ok) throw new Error('Failed to fetch exam result');
      return res.json();
    },
  });

  const attempt = data?.attempt;

  if (isLoading || !attempt) {
    return <div className="py-20 text-center text-slate-500 font-semibold text-sm">Đang tải kết quả thi...</div>;
  }

  const score = attempt.score ?? 750;
  const isPassed = attempt.isPassed ?? score >= 720;
  const totalQuestions = attempt.answers.length;

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  attempt.answers.forEach((ans: any) => {
    if (!ans.selectedOptionIds || ans.selectedOptionIds.length === 0) {
      unansweredCount++;
    } else if (ans.isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const accuracyPercent = Math.round((correctCount / totalQuestions) * 100);

  const handlePracticeIncorrect = async () => {
    try {
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'INCORRECT', limit: 20 }),
      });
      const result = await res.json();
      if (result.sessionId) {
        router.push(`/practice/${result.sessionId}`);
      }
    } catch (e) {
      console.error(e);
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
          <h1 className="text-3xl font-extrabold tracking-tight">
            {isPassed ? 'Chúc mừng! Bạn đã ĐẠT kỳ thi 🎉' : 'Chưa đạt - Hãy tiếp tục luyện tập! 💪'}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            {isPassed
              ? 'Điểm số của bạn vượt ngưỡng yêu cầu 720/1000 của AWS. Bạn đã sẵn sàng thi thật!'
              : 'Hãy tập trung ôn lại các câu hỏi đã làm sai và các Domain có tỷ lệ đúng dưới 70%.'}
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
        <button
          onClick={handlePracticeIncorrect}
          className="flex-1 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-sm rounded-xl shadow transition flex items-center justify-center"
        >
          <Target className="w-4 h-4 mr-2" /> Luyện tập lại các câu sai ({incorrectCount})
        </button>
        <Link
          href="/exam"
          className="py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl transition shadow flex items-center justify-center"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Thi thử đề mới
        </Link>
      </div>

      {/* Review Incorrect Questions Section */}
      <div className="card-saas p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <h2 className="text-base font-extrabold text-slate-900">Chi tiết các câu làm sai</h2>
          <span className="text-xs font-bold px-2.5 py-1 bg-red-50 text-red-700 rounded-md">
            {incorrectCount} câu hỏi
          </span>
        </div>

        <div className="space-y-6">
          {attempt.answers
            .filter((ans: any) => !ans.isCorrect)
            .map((ans: any, idx: number) => {
              const q = ans.question;
              return (
                <div key={ans.id} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold px-2 py-0.5 bg-red-100 text-red-800 rounded">
                      Câu #{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-600">{q.domain.name}</span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-relaxed">{q.questionText}</p>

                  <MarkdownExplanation content={q.explanationText} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
