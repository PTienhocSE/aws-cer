'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Award, CheckSquare, Clock, ShieldCheck, Zap } from 'lucide-react';

async function fetchDomains() {
  const res = await fetch('/api/progress/domains');
  if (!res.ok) throw new Error('Failed to fetch domains');
  return res.json();
}

async function fetchOverview() {
  const res = await fetch('/api/progress/overview');
  if (!res.ok) return null;
  return res.json();
}

export default function MockExamConfigPage() {
  const router = useRouter();

  const [totalQuestions, setTotalQuestions] = useState<number>(65);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(130);
  const [domainId, setDomainId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const { data: domainsData } = useQuery({
    queryKey: ['domains'],
    queryFn: fetchDomains,
  });

  const { data: overview } = useQuery({
    queryKey: ['progressOverview'],
    queryFn: fetchOverview,
  });

  const handleStartExam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/mock-exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domainId: domainId || undefined,
          totalQuestions,
          timeLimitMinutes,
        }),
      });

      const data = await res.json();
      if (data.examAttemptId) {
        router.push(`/exam/${data.examAttemptId}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const certName = overview?.activeCertification?.name || 'AWS Certification';
  const certCode = overview?.activeCertification?.code || 'SAA-C03';

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 mx-auto shadow-md">
          <CheckSquare className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Thi thử chứng chỉ {certName} ({certCode})
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Trải nghiệm kỳ thi chuẩn mô phỏng thực tế với đếm ngược thời gian và đánh giá kết quả theo thang điểm AWS (100–1000).
        </p>
      </div>

      <div className="card-saas p-6 sm:p-8 space-y-6">
        {/* Exam Preset Selection */}
        <div>
          <label className="block text-xs font-extrabold text-slate-900 uppercase mb-3">
            Chọn định dạng bài thi
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setTotalQuestions(65);
                setTimeLimitMinutes(130);
              }}
              className={`p-4 rounded-xl border-2 text-left transition ${
                totalQuestions === 65
                  ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2 text-sm font-extrabold">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Đề thi Chuẩn (65 Câu)</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Thời gian: 130 phút • Điểm đạt: 720/1000</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setTotalQuestions(20);
                setTimeLimitMinutes(40);
              }}
              className={`p-4 rounded-xl border-2 text-left transition ${
                totalQuestions === 20
                  ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-bold'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2 text-sm font-extrabold">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Đề thi Rút gọn (20 Câu)</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">Thời gian: 40 phút • Thích hợp luyện nhanh</div>
            </button>
          </div>
        </div>

        {/* Domain Filter */}
        <div>
          <label className="block text-xs font-extrabold text-slate-900 uppercase mb-2">
            Phạm vi câu hỏi
          </label>
          <select
            value={domainId}
            onChange={(e) => setDomainId(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">
              Tổng hợp tất cả {domainsData?.domains?.length || 4} Domains (Khuyên dùng)
            </option>
            {domainsData?.domains?.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.code}: {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Exam Conditions Disclaimer */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-600">
          <div className="font-bold text-slate-900 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600" /> Quy định làm bài thi thử:
          </div>
          <ul className="list-disc pl-4 space-y-1">
            <li>Đáp án đúng và giải thích không hiển thị trong lúc làm bài.</li>
            <li>Có thể cắm cờ (Flag) câu hỏi để xem lại trước khi nộp.</li>
            <li>Hệ thống tự động nộp bài khi hết thời gian đếm ngược.</li>
          </ul>
        </div>

        <button
          onClick={handleStartExam}
          disabled={loading}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl transition shadow-lg flex items-center justify-center"
        >
          {loading ? 'Đang khởi tạo đề thi...' : 'Bắt đầu làm bài thi ngay'}
        </button>
      </div>
    </div>
  );
}
