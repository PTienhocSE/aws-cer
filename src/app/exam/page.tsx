'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  Award,
  CheckSquare,
  Clock,
  ShieldCheck,
  Zap,
  BookOpen,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

async function fetchQuestionBanks() {
  const res = await fetch('/api/question-banks', {
    headers: { 'x-guest-mode': '1' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch question banks');
  return res.json();
}

async function fetchDomains(questionBankId?: string) {
  const url = questionBankId
    ? `/api/progress/domains?questionBankId=${encodeURIComponent(questionBankId)}`
    : '/api/progress/domains';
  const res = await fetch(url, {
    headers: { 'x-guest-mode': '1' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch domains');
  return res.json();
}

async function fetchOverview() {
  const res = await fetch('/api/progress/overview', {
    headers: { 'x-guest-mode': '1' },
    credentials: 'include',
  });
  if (!res.ok) return null;
  return res.json();
}

export default function MockExamConfigPage() {
  const router = useRouter();

  const [selectedBankId, setSelectedBankId] = useState<string>('');
  const [totalQuestions, setTotalQuestions] = useState<number>(65);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(130);
  const [domainId, setDomainId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // 1. Load Question Banks
  const { data: banksData, isLoading: banksLoading } = useQuery({
    queryKey: ['questionBanksCatalog'],
    queryFn: fetchQuestionBanks,
  });

  const banksList = useMemo(() => banksData?.questionBanks || [], [banksData]);

  // 2. Load User Overview (to find active question bank)
  const { data: overview } = useQuery({
    queryKey: ['progressOverview'],
    queryFn: fetchOverview,
  });

  // 3. Auto initialize selectedBankId
  useEffect(() => {
    if (!selectedBankId && banksList.length > 0) {
      const activeId = overview?.activeQuestionBankId;
      const foundActive = banksList.find((b: any) => b.id === activeId);
      const foundDump = banksList.find((b: any) => b.slug === 'aws-saa-c03-dump');
      const defaultId = foundDump?.id || foundActive?.id || banksList[0]?.id;
      if (defaultId) setSelectedBankId(defaultId);
    }
  }, [banksList, overview, selectedBankId]);

  // Selected bank details
  const selectedBank = useMemo(
    () => banksList.find((b: any) => b.id === selectedBankId),
    [banksList, selectedBankId]
  );

  // 4. Load Domains specifically for the selected bank
  const { data: domainsData, isLoading: domainsLoading } = useQuery({
    queryKey: ['domains', selectedBankId],
    queryFn: () => fetchDomains(selectedBankId),
    enabled: !!selectedBankId,
  });

  // Adjust preset questions if bank has fewer questions than 65
  useEffect(() => {
    if (selectedBank?.totalQuestions && selectedBank.totalQuestions < totalQuestions) {
      if (selectedBank.totalQuestions <= 20) {
        setTotalQuestions(selectedBank.totalQuestions);
        setTimeLimitMinutes(Math.max(15, selectedBank.totalQuestions * 2));
      } else {
        setTotalQuestions(Math.min(65, selectedBank.totalQuestions));
      }
    }
  }, [selectedBank, totalQuestions]);

  const handleStartExam = async () => {
    if (!selectedBankId) {
      alert('Vui lòng chọn một bộ câu hỏi để thi thử!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/mock-exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-mode': '1',
        },
        credentials: 'include',
        body: JSON.stringify({
          questionBankId: selectedBankId,
          domainId: domainId || undefined,
          totalQuestions,
          timeLimitMinutes,
        }),
      });

      const data = await res.json();
      if (data.examAttemptId) {
        router.push(`/exam/${data.examAttemptId}`);
      } else if (data.error) {
        alert(data.error);
      }
    } catch (e) {
      console.error(e);
      alert('Lỗi kết nối khi khởi tạo bài thi. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const certName = selectedBank?.certification?.name || overview?.activeCertification?.name || 'AWS Certification';
  const certCode = selectedBank?.certification?.code || overview?.activeCertification?.code || 'SAA-C03';

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 mx-auto shadow-md">
          <CheckSquare className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Thi thử chứng chỉ {certCode}
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          {certName} • Mô phỏng chuẩn kỳ thi thật với tính giờ đếm ngược, rà soát cắm cờ và chấm điểm theo thang AWS (100–1000).
        </p>
      </div>

      <div className="card-saas p-6 sm:p-8 space-y-6">
        {/* 1. Chọn Bộ câu hỏi (Question Bank Selector) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-extrabold text-slate-900 uppercase flex items-center">
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              Chọn bộ câu hỏi thi thử:
            </label>
            {selectedBank && (
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                {selectedBank.totalQuestions} câu hỏi
              </span>
            )}
          </div>

          {banksLoading ? (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-400 animate-pulse">
              Đang tải danh sách bộ câu hỏi...
            </div>
          ) : (
            <select
              value={selectedBankId}
              onChange={(e) => {
                setSelectedBankId(e.target.value);
                setDomainId(''); // Reset domain filter when changing bank
              }}
              className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer transition shadow-2xs"
            >
              {banksList.map((bank: any) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name} ({bank.totalQuestions} câu) — {bank.certification?.code || 'AWS'}
                </option>
              ))}
            </select>
          )}

          {selectedBank && (
            <div className="mt-2.5 p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-xs text-slate-700 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5 flex-1">
                <div className="font-extrabold text-slate-900">
                  {selectedBank.name}
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  {selectedBank.description || 'Bộ đề thi thử trắc nghiệm chuẩn AWS.'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Chọn định dạng bài thi (Exam Preset Selection) */}
        <div>
          <label className="block text-xs font-extrabold text-slate-900 uppercase mb-3 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
            Chọn định dạng bài thi:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                const maxQ = selectedBank ? Math.min(65, selectedBank.totalQuestions) : 65;
                setTotalQuestions(maxQ);
                setTimeLimitMinutes(130);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer ${
                totalQuestions >= 50
                  ? 'border-amber-500 bg-amber-50/60 text-slate-950 font-bold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center space-x-2 text-sm font-extrabold">
                <Award className="w-4 h-4 text-amber-600" />
                <span>
                  Đề thi Chuẩn ({selectedBank ? Math.min(65, selectedBank.totalQuestions) : 65} Câu)
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Thời gian: 130 phút • Điểm đạt: 720/1000
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                const minQ = selectedBank ? Math.min(20, selectedBank.totalQuestions) : 20;
                setTotalQuestions(minQ);
                setTimeLimitMinutes(40);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer ${
                totalQuestions <= 30
                  ? 'border-amber-500 bg-amber-50/60 text-slate-950 font-bold shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex items-center space-x-2 text-sm font-extrabold">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>
                  Đề thi Rút gọn ({selectedBank ? Math.min(20, selectedBank.totalQuestions) : 20} Câu)
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Thời gian: 40 phút • Thích hợp luyện nhanh
              </div>
            </button>
          </div>
        </div>

        {/* 3. Lọc Domain theo Question Bank đã chọn */}
        <div>
          <label className="block text-xs font-extrabold text-slate-900 uppercase mb-2">
            Phạm vi câu hỏi (Domain):
          </label>
          <select
            value={domainId}
            onChange={(e) => setDomainId(e.target.value)}
            disabled={domainsLoading}
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="">
              Tổng hợp tất cả Domains ({domainsData?.domains?.length || 4} domains) — Khuyên dùng
            </option>
            {domainsData?.domains?.map((d: any) => (
              <option key={d.id} value={d.id}>
                {d.code}: {d.name} {d._count?.questions ? `(${d._count.questions} câu)` : ''}
              </option>
            ))}
          </select>
        </div>

        {/* 4. Quy định bài thi */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600">
          <div className="font-bold text-slate-900 flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600" /> Quy định làm bài thi thử:
          </div>
          <ul className="list-disc pl-4 space-y-1">
            <li>Câu hỏi được trộn ngẫu nhiên từ bộ đề đã chọn.</li>
            <li>Đáp án đúng và giải thích được ẩn trong lúc thi để mô phỏng phòng thi thật.</li>
            <li>Bạn có thể cắm cờ (Flag) câu hỏi để xem lại và sửa câu trả lời trước khi nộp.</li>
            <li>Hệ thống tự động nộp bài khi hết thời gian đếm ngược.</li>
          </ul>
        </div>

        {/* Start Exam Button */}
        <button
          onClick={handleStartExam}
          disabled={loading || banksLoading || !selectedBankId}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl transition shadow-lg flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Đang khởi tạo đề thi ngẫu nhiên...' : 'Bắt đầu làm bài thi ngay'}
        </button>
      </div>
    </div>
  );
}
