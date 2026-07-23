'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Play, RotateCcw, ShieldAlert, Target, CheckCircle2, XCircle } from 'lucide-react';

export default function IncorrectAnswersPage() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['incorrectQuestions'],
    queryFn: async () => {
      const res = await fetch('/api/questions?status=INCORRECT&limit=100');
      if (!res.ok) throw new Error('Failed to fetch incorrect questions');
      return res.json();
    },
  });

  const handleStartPracticeIncorrect = async () => {
    try {
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'INCORRECT', status: 'INCORRECT', limit: 25 }),
      });
      const result = await res.json();
      if (result.sessionId) {
        router.push(`/practice/${result.sessionId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading) {
    return <div className="py-20 text-center text-slate-500 font-semibold text-sm">Đang tải câu hỏi làm sai...</div>;
  }

  const questions = data?.questions || [];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center">
            <ShieldAlert className="w-6 h-6 mr-2 text-red-500" /> Các câu hỏi trả lời sai
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Danh sách {questions.length} câu bạn đã từng trả lời chưa chính xác. Lịch sử không bị xóa khi bạn trả lời đúng lại.
          </p>
        </div>

        {questions.length > 0 && (
          <button
            onClick={handleStartPracticeIncorrect}
            className="px-5 py-3 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center"
          >
            <Target className="w-4 h-4 mr-2" /> Bắt đầu luyện lại {questions.length} câu sai
          </button>
        )}
      </div>

      {/* Questions List */}
      {questions.length === 0 ? (
        <div className="card-saas p-12 text-center text-slate-500 space-y-3">
          <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500" />
          <div className="font-extrabold text-slate-700 text-sm">Tuyệt vời! Không có câu sai nào cần ôn lại.</div>
          <p className="text-xs text-slate-400">
            Bạn đã làm chủ tất cả các câu hỏi đã trả lời trong môn học này.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q: any, idx: number) => (
            <div key={q.id} className="card-saas p-5 space-y-3 border-l-4 border-l-red-500">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold px-2.5 py-0.5 bg-red-50 text-red-700 rounded border border-red-200">
                  Câu #{idx + 1} • {q.domainName}
                </span>
                {q.userProgress && (
                  <span className="text-slate-500 font-semibold">
                    Đã thử {q.userProgress.attempts} lần ({q.userProgress.incorrectAttempts} lần sai)
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-slate-800 leading-relaxed">{q.question}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
