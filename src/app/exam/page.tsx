'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
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
  Shuffle,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

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

function MockExamConfigContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlBankId = searchParams.get('bankId');
  const urlSlug = searchParams.get('slug');

  const [selectedBankId, setSelectedBankId] = useState<string>('');
  const [totalQuestions, setTotalQuestions] = useState<number>(65);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(130);
  const [domainId, setDomainId] = useState<string>('');
  const [keepOriginalOrder, setKeepOriginalOrder] = useState<boolean>(true);
  const [safeMode, setSafeMode] = useState<boolean>(false);
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

  // 3. Auto initialize selectedBankId (prioritizing URL query param)
  useEffect(() => {
    if (banksList.length === 0) return;

    if (urlBankId) {
      const found = banksList.find((b: any) => b.id === urlBankId);
      if (found) {
        setSelectedBankId(found.id);
        return;
      }
    }

    if (urlSlug) {
      const found = banksList.find((b: any) => b.slug === urlSlug);
      if (found) {
        setSelectedBankId(found.id);
        return;
      }
    }

    if (!selectedBankId) {
      const activeId = overview?.activeQuestionBankId;
      const foundActive = banksList.find((b: any) => b.id === activeId);
      const foundDump = banksList.find((b: any) => b.slug === 'aws-saa-c03-dump');
      const defaultId = foundActive?.id || foundDump?.id || banksList[0]?.id;
      if (defaultId) setSelectedBankId(defaultId);
    }
  }, [banksList, overview, selectedBankId, urlBankId, urlSlug]);

  // Selected bank details
  const selectedBank = useMemo(
    () => banksList.find((b: any) => b.id === selectedBankId),
    [banksList, selectedBankId]
  );

  const is65QuestionTest = useMemo(() => {
    return selectedBank && selectedBank.totalQuestions === 65;
  }, [selectedBank]);

  // Adjust order setting and total questions when bank changes
  useEffect(() => {
    if (!selectedBank) return;

    // For 65-question tests: default to preserving original question order (no shuffle)
    if (selectedBank.totalQuestions <= 65) {
      setKeepOriginalOrder(true);
      setTotalQuestions(selectedBank.totalQuestions);
      setTimeLimitMinutes(selectedBank.totalQuestions <= 20 ? 40 : 130);
    } else {
      // For large banks (390 câu, 1019 câu): default to shuffle
      setKeepOriginalOrder(false);
      setTotalQuestions(65);
      setTimeLimitMinutes(130);
    }
  }, [selectedBank]);

  // 4. Load Domains specifically for the selected bank
  const { data: domainsData, isLoading: domainsLoading } = useQuery({
    queryKey: ['domains', selectedBankId],
    queryFn: () => fetchDomains(selectedBankId),
    enabled: !!selectedBankId,
  });

  // Group banks for the dropdown
  const groupedBanks = useMemo(() => {
    const udemyTests: any[] = [];
    const udemyMax: any[] = [];
    const dojoTests: any[] = [];
    const dojoMax: any[] = [];
    const saaStandalone: any[] = [];
    const others: any[] = [];

    banksList.forEach((b: any) => {
      if (b.version?.startsWith('v1.0-udemy-test') || b.slug?.includes('udemy-test')) {
        udemyTests.push(b);
      } else if (b.slug?.includes('udemy')) {
        udemyMax.push(b);
      } else if (b.version?.startsWith('v1.0-dojo-test') || b.slug?.includes('dojo-test')) {
        dojoTests.push(b);
      } else if (b.slug?.includes('dojo')) {
        dojoMax.push(b);
      } else if (b.certification?.code === 'SAA-C03' || b.slug?.includes('saa-c03')) {
        saaStandalone.push(b);
      } else {
        others.push(b);
      }
    });

    udemyTests.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    dojoTests.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    return { udemyTests, udemyMax, dojoTests, dojoMax, saaStandalone, others };
  }, [banksList]);

  // Start local resilient exam (Client-Side Safe Mode)
  const startLocalExam = async (bankId: string) => {
    try {
      const toastId = toast.loading('Đang khởi tạo đề thi an toàn (Kháng mạng công ty)...');

      // Fetch questions via GET (never blocked by corporate proxy!)
      const res = await fetch(`/api/questions?questionBankId=${bankId}&limit=${totalQuestions}&page=1`, {
        headers: { 'x-guest-mode': '1' },
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Không thể tải câu hỏi từ server');
      const data = await res.json();
      const questions = data.questions || [];

      if (questions.length === 0) {
        toast.dismiss(toastId);
        alert('Không tìm thấy câu hỏi cho bộ đề đã chọn.');
        return;
      }

      let chosenQuestions = questions;
      if (!keepOriginalOrder && chosenQuestions.length > 1) {
        chosenQuestions = [...chosenQuestions].sort(() => Math.random() - 0.5);
      }
      chosenQuestions = chosenQuestions.slice(0, Math.min(chosenQuestions.length, totalQuestions));

      const localAttemptId = `local-${Date.now()}`;
      const localAttempt = {
        id: localAttemptId,
        questionBankId: bankId,
        bankName: selectedBank?.name || 'Đề thi thử',
        totalQuestions: chosenQuestions.length,
        timeLimitMinutes,
        startedAt: new Date().toISOString(),
        isLocal: true,
        answers: chosenQuestions.map((q: any, idx: number) => ({
          id: `local-ans-${idx}`,
          questionId: q.id,
          selectedOptionIds: '[]',
          isFlagged: false,
          question: {
            id: q.id,
            rawId: q.rawId,
            type: q.type,
            questionText: q.questionText,
            explanationText: q.explanationText,
            options: q.options.map((o: any) => ({
              id: o.id,
              text: o.text,
              isCorrect: o.isCorrect,
            })),
            domain: q.domain,
          },
        })),
      };

      localStorage.setItem(`aws_cer_mock_exam_${localAttemptId}`, JSON.stringify(localAttempt));
      toast.dismiss(toastId);
      toast.success('Đã tạo đề thi thành công! Bài làm được bảo vệ an toàn.');
      router.push(`/exam/${localAttemptId}`);
    } catch (err) {
      console.error('Local exam error:', err);
      alert('Lỗi kết nối khi tải câu hỏi. Vui lòng kiểm tra lại đường truyền!');
    }
  };

  const handleStartExam = async () => {
    if (!selectedBankId) {
      alert('Vui lòng chọn một bộ câu hỏi để thi thử!');
      return;
    }

    setLoading(true);

    // If safeMode is explicitly chosen:
    if (safeMode) {
      await startLocalExam(selectedBankId);
      setLoading(false);
      return;
    }

    // Try standard server creation first
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
          shuffle: !keepOriginalOrder,
        }),
      });

      // If server responds with error or corporate proxy rejects POST:
      if (!res.ok) {
        console.warn('Server mock-exam POST rejected. Switching to client-side safe exam mode...');
        await startLocalExam(selectedBankId);
        return;
      }

      const data = await res.json();
      if (data.examAttemptId) {
        router.push(`/exam/${data.examAttemptId}`);
      } else {
        await startLocalExam(selectedBankId);
      }
    } catch (e) {
      console.warn('Network timeout/proxy block on /api/mock-exams. Switching to safe local exam mode...', e);
      await startLocalExam(selectedBankId);
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
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          {certName} • Mô phỏng chuẩn kỳ thi thật với tính giờ đếm ngược, rà soát cắm cờ và chấm điểm theo thang AWS (100–1000).
        </p>
      </div>

      <div className="card-saas p-6 sm:p-8 space-y-6">
        {/* 1. Chọn Bộ câu hỏi (Question Bank Selector with Optgroups) */}
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
                setDomainId('');
              }}
              className="w-full p-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer transition shadow-2xs"
            >
              {groupedBanks.udemyTests.length > 0 && (
                <optgroup label="SAA-C03 — Bộ 6 Đề thi Udemy (Chuẩn 65 câu/đề)">
                  {groupedBanks.udemyTests.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} (65 câu) • {b.version}
                    </option>
                  ))}
                  {groupedBanks.udemyMax.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} (Max 390 câu)
                    </option>
                  ))}
                </optgroup>
              )}

              {groupedBanks.dojoTests.length > 0 && (
                <optgroup label="SAA-C03 — Bộ 6 Đề thi Tutorials Dojo (Chuẩn 65 câu/đề)">
                  {groupedBanks.dojoTests.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} (65 câu) • {b.version}
                    </option>
                  ))}
                  {groupedBanks.dojoMax.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} (Max 390 câu)
                    </option>
                  ))}
                </optgroup>
              )}

              {groupedBanks.saaStandalone.length > 0 && (
                <optgroup label="SAA-C03 — Bộ đề thực chiến độc lập">
                  {groupedBanks.saaStandalone.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.totalQuestions} câu)
                    </option>
                  ))}
                </optgroup>
              )}

              {groupedBanks.others.length > 0 && (
                <optgroup label="Chứng chỉ AWS khác">
                  {groupedBanks.others.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.totalQuestions} câu) — {b.certification?.code || 'AWS'}
                    </option>
                  ))}
                </optgroup>
              )}
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

        {/* 2. Thứ tự câu hỏi & Giữ nguyên không trộn (Task 2) */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={keepOriginalOrder}
              onChange={(e) => setKeepOriginalOrder(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-amber-500 focus:ring-amber-400 cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-extrabold text-slate-900 flex items-center">
                Giữ nguyên thứ tự đề thi gốc (Không trộn ngẫu nhiên)
                {is65QuestionTest && (
                  <span className="ml-2 text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                    Khuyên dùng cho đề 65 câu
                  </span>
                )}
              </span>
              <p className="text-slate-500 text-[11px] mt-0.5 leading-relaxed">
                {is65QuestionTest
                  ? 'Đề thi 65 câu: Các câu hỏi được giữ nguyên theo đúng thứ tự bài thi chuẩn (từ câu 1 đến câu 65).'
                  : 'Lấy các câu hỏi theo thứ tự tuần tự trong ngân hàng câu hỏi thay vì xáo trộn ngẫu nhiên.'}
              </p>
            </div>
          </label>
        </div>

        {/* 3. Chế độ an toàn / Kháng proxy mạng công ty (Task 2) */}
        <div className="p-4 bg-emerald-50/60 border border-emerald-200/90 rounded-2xl space-y-2">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={safeMode}
              onChange={(e) => setSafeMode(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <div className="text-xs">
              <span className="font-extrabold text-emerald-950 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600 inline" />
                Chế độ thi an toàn (Kháng mạng công ty / Offline)
              </span>
              <p className="text-emerald-800 text-[11px] mt-0.5 leading-relaxed">
                Tải đề thi trực tiếp qua GET và lưu bài làm liên tục trên trình duyệt. Không lo mạng công ty ngắt kết nối, chặn POST API, hay lỗi serverless timeout.
              </p>
            </div>
          </label>
        </div>

        {/* 4. Chọn định dạng bài thi (Exam Preset Selection) */}
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

        {/* 5. Lọc Domain theo Question Bank đã chọn */}
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

        {/* 6. Start Exam Button */}
        <button
          onClick={handleStartExam}
          disabled={loading || banksLoading || !selectedBankId}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl transition shadow-lg flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            'Đang chuẩn bị đề thi...'
          ) : (
            <span className="flex items-center">
              <CheckSquare className="w-4 h-4 mr-2 text-amber-400" />
              Bắt đầu làm bài thi ({totalQuestions} câu • {timeLimitMinutes} phút)
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default function MockExamConfigPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-slate-500 font-semibold text-sm">
          Đang tải cấu hình bài thi...
        </div>
      }
    >
      <MockExamConfigContent />
    </Suspense>
  );
}
