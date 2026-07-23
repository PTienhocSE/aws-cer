'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Award, BookOpen, CheckCircle, Play, RotateCcw, ShieldAlert, Sparkles, Target, Zap } from 'lucide-react';

async function fetchOverview() {
  const res = await fetch('/api/progress/overview');
  if (!res.ok) throw new Error('Failed to fetch overview');
  return res.json();
}

async function fetchDomains() {
  const res = await fetch('/api/progress/domains');
  if (!res.ok) throw new Error('Failed to fetch domains');
  return res.json();
}

export default function ReviewSRSPage() {
  const router = useRouter();

  const { data: overview } = useQuery({
    queryKey: ['progressOverview'],
    queryFn: fetchOverview,
  });

  const { data: domainsData } = useQuery({
    queryKey: ['progressDomains'],
    queryFn: fetchDomains,
  });

  const handleStartPractice = async (mode: string, status?: string) => {
    try {
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, status, limit: 15 }),
      });
      const data = await res.json();
      if (data.sessionId) {
        router.push(`/practice/${data.sessionId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const weakDomains = domainsData?.weakDomains || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Chế độ Ôn tập & Spaced Repetition (SRS)</h1>
        <p className="text-xs text-slate-500">Tối ưu hóa khả năng ghi nhớ dài hạn bằng thuật toán lặp lại ngắt quãng</p>
      </div>

      {/* Main Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SRS Spaced Repetition Box */}
        <div className="card-saas p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-4 shadow-xl">
          <div className="flex items-center space-x-2 text-amber-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-base font-extrabold">SuperMemo SM-2 Algorithm</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Hệ thống tính toán lịch ôn tập tối ưu cho từng câu hỏi dựa trên số lần trả lời đúng, sai và mức độ tự tin của bạn.
          </p>

          <button
            onClick={() => handleStartPractice('SPACED_REPETITION')}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold text-sm rounded-xl transition shadow flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Bắt đầu ôn tập đến hạn
          </button>
        </div>

        {/* Daily Target Practice */}
        <div className="card-saas p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-slate-900 font-extrabold">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-base">Luyện tập mục tiêu hàng ngày</h2>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Phiên tổng hợp 15 câu gồm: câu mới, câu từng làm sai và câu thuộc Domain cần cải thiện.
            </p>
          </div>

          <button
            onClick={() => handleStartPractice('DAILY')}
            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl transition shadow flex items-center justify-center"
          >
            <Play className="w-4 h-4 mr-2 fill-white" /> Bắt đầu phiên hàng ngày
          </button>
        </div>
      </div>

      {/* Specific Review Launchers */}
      <div className="card-saas p-6 space-y-6">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Danh mục ôn tập đặc biệt</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleStartPractice('CUSTOM', 'INCORRECT')}
            className="p-5 rounded-xl border border-slate-200 hover:border-red-400 hover:bg-red-50/50 transition text-left space-y-2"
          >
            <div className="flex items-center space-x-2 text-red-600 font-extrabold text-sm">
              <Target className="w-4 h-4" />
              <span>Các câu đã từng làm sai</span>
            </div>
            <p className="text-xs text-slate-500">Tập trung sửa lỗi cho các câu chưa vượt qua</p>
          </button>

          <button
            onClick={() => handleStartPractice('CUSTOM', 'BOOKMARKED')}
            className="p-5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition text-left space-y-2"
          >
            <div className="flex items-center space-x-2 text-amber-600 font-extrabold text-sm">
              <Award className="w-4 h-4" />
              <span>Các câu đã đánh dấu ⭐</span>
            </div>
            <p className="text-xs text-slate-500">Ôn lại các câu hỏi quan trọng bạn đã lưu</p>
          </button>
        </div>
      </div>

      {/* Weak Domains Section */}
      {weakDomains.length > 0 && (
        <div className="card-saas p-6 space-y-4 border-l-4 border-l-red-500 bg-red-50/20">
          <div className="flex items-center space-x-2 text-red-700 font-extrabold">
            <ShieldAlert className="w-5 h-5" />
            <h2 className="text-base">Phát hiện Domain còn yếu</h2>
          </div>
          <p className="text-xs text-slate-600">
            Các Domain này có tỷ lệ trả lời đúng dưới 70%. Bạn nên dành thêm thời gian luyện tập trước khi thi thử.
          </p>

          <div className="space-y-2">
            {weakDomains.map((wd: any) => (
              <div key={wd.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-red-200 text-xs">
                <span className="font-bold text-slate-900">{wd.code}: {wd.name}</span>
                <span className="font-extrabold text-red-600">{wd.accuracy}% đúng</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
