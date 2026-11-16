'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Play,
  Sparkles,
  Trophy,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';
import { enableGuestMode } from '@/lib/guest';

interface Bank {
  id: string;
  name: string;
  slug: string;
  version: string;
  description: string | null;
  totalQuestions: number;
  domainsCount: number;
  certification: {
    id: string;
    code: string | null;
    name: string;
    provider: string;
  };
  isEnrolled: boolean;
  enrollmentStatus: string | null;
  progressPercent: number;
}

export default function QuestionBanksPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'ALL' | 'BUNDLES' | 'SAA_STANDALONE' | 'OTHERS'>('ALL');
  const [expandedBundles, setExpandedBundles] = useState<Record<string, boolean>>({
    'v1.0-udemy': true,
    'v1.0-dojo': true,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['questionBanksCatalog'],
    queryFn: async () => {
      const res = await fetch('/api/question-banks');
      if (!res.ok) throw new Error('Failed to fetch question banks');
      return res.json();
    },
  });

  const { data: overview } = useQuery({
    queryKey: ['progressOverview'],
    queryFn: async () => {
      const res = await fetch('/api/progress/overview');
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!user,
  });

  const activeBankId = user ? overview?.activeQuestionBankId || user?.activeQuestionBankId : null;

  const enrollMutation = useMutation({
    mutationFn: async (bankId: string) => {
      if (!user) enableGuestMode();
      const res = await fetch(`/api/question-banks/${bankId}/enroll`, { method: 'POST' });
      return res.json();
    },
    onSuccess: (data, bankId) => {
      if (data?.success) {
        if (user) setUser({ ...user, activeQuestionBankId: bankId });
        queryClient.invalidateQueries({ queryKey: ['questionBanksCatalog'] });
        queryClient.invalidateQueries({ queryKey: ['progressOverview'] });
        toast.success(
          user
            ? 'Đã đăng ký và chuyển sang môn học mới!'
            : 'Đã vào chế độ khách. Bạn có thể học ngay mà không cần đăng nhập.'
        );
        router.push('/questions');
      }
    },
  });

  const switchActiveMutation = useMutation({
    mutationFn: async (bankId: string) => {
      if (!user) {
        enableGuestMode();
        const res = await fetch(`/api/question-banks/${bankId}/enroll`, { method: 'POST' });
        return res.json();
      }
      const res = await fetch('/api/me/active-question-bank', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionBankId: bankId }),
      });
      return res.json();
    },
    onSuccess: (data, bankId) => {
      if (user && data) {
        setUser({ ...user, activeQuestionBankId: bankId });
        queryClient.invalidateQueries({ queryKey: ['questionBanksCatalog'] });
        queryClient.invalidateQueries({ queryKey: ['progressOverview'] });
        toast.success('Đã chuyển sang môn học thành công!');
        router.push('/questions');
      }
    },
  });

  const handleCardAction = (bankId: string, isEnrolled: boolean, isCurrentActive: boolean) => {
    if (!user) {
      enableGuestMode();
      enrollMutation.mutate(bankId);
      return;
    }
    if (isCurrentActive) {
      router.push('/questions');
    } else if (isEnrolled) {
      switchActiveMutation.mutate(bankId);
    } else {
      enrollMutation.mutate(bankId);
    }
  };

  const toggleBundle = (key: string) => {
    setExpandedBundles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Group Question Banks into Bundles ("Bộ lớn")
  const { udemyBundle, dojoBundle, standaloneSaaBanks, otherCertBanks } = useMemo(() => {
    const banks: Bank[] = data?.questionBanks || [];

    // 1. Udemy Series (Gom bằng key v1.0-udemy max)
    const udemyTests = banks
      .filter((b) => b.version.startsWith('v1.0-udemy-test') || b.slug.includes('udemy-test'))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    const udemyMaster =
      banks.find((b) => b.slug === 'aws-saa-c03-udemy-all') ||
      banks.find((b) => b.slug === 'aws-saa-c03-udemy') ||
      banks.find((b) => b.version === 'v1.1-udemy') ||
      null;

    // 2. Tutorials Dojo Series (Gom bằng key v1.0-dojo max)
    const dojoTests = banks
      .filter((b) => b.version.startsWith('v1.0-dojo-test') || b.slug.includes('dojo-test'))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

    const dojoMaster =
      banks.find((b) => b.slug === 'aws-saa-c03-dojo-all') ||
      banks.find((b) => b.version === 'v1.0-dojo-all') ||
      null;

    const bundleIds = new Set<string>([
      ...udemyTests.map((b) => b.id),
      ...(udemyMaster ? [udemyMaster.id] : []),
      ...dojoTests.map((b) => b.id),
      ...(dojoMaster ? [dojoMaster.id] : []),
    ]);

    // 3. Standalone SAA-C03 banks (Dump 1.019 câu, v2.0 390 câu)
    const standaloneSaa = banks.filter(
      (b) =>
        !bundleIds.has(b.id) &&
        (b.certification?.code === 'SAA-C03' || b.slug.includes('saa-c03'))
    );

    // 4. Other certifications (CLF-C02, DVA-C02, DEA-C01, SAP-C02...)
    const others = banks.filter(
      (b) =>
        !bundleIds.has(b.id) &&
        b.certification?.code !== 'SAA-C03' &&
        !b.slug.includes('saa-c03')
    );

    return {
      udemyBundle: {
        key: 'v1.0-udemy',
        title: 'SAA-C03-UDEMY — Trọn bộ 6 Đề thi thực chiến',
        badge: 'Gom bằng key v1.0-udemy max',
        code: 'SAA-C03',
        description:
          'Trọn bộ 6 đề thi thực chiến chuẩn cấu trúc AWS SAA-C03 (65 câu/đề • 4 Domains), giữ trọn vẹn English explanation và giải thích tiếng Việt đầy đủ.',
        master: udemyMaster,
        tests: udemyTests,
        totalQuestions: udemyMaster?.totalQuestions || 390,
      },
      dojoBundle: {
        key: 'v1.0-dojo',
        title: 'SAA-C03-DOJO — Trọn bộ 6 Đề thi thực chiến Tutorials Dojo',
        badge: 'Gom bằng key v1.0-dojo max',
        code: 'SAA-C03',
        description:
          'Trọn bộ 6 đề thi thực chiến Tutorials Dojo chuẩn AWS SAA-C03 (65 câu/đề • 4 Domains), đầy đủ giải thích và cheat sheet references chi tiết.',
        master: dojoMaster,
        tests: dojoTests,
        totalQuestions: dojoMaster?.totalQuestions || 390,
      },
      standaloneSaaBanks: standaloneSaa,
      otherCertBanks: others,
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-500 font-semibold text-sm">
        Đang tải danh sách bộ câu hỏi...
      </div>
    );
  }

  // Render a single sub-test card (inside a bundle)
  const renderSubTestCard = (bank: Bank) => {
    const isEnrolled = !!user && bank.isEnrolled;
    const isCurrentActive = !!user && activeBankId === bank.id;

    return (
      <div
        key={bank.id}
        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
          isCurrentActive
            ? 'ring-2 ring-amber-500 border-amber-300 bg-amber-50/40 shadow-sm'
            : 'border-slate-200 hover:border-slate-300 bg-white shadow-2xs'
        }`}
      >
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200">
              {bank.certification.code || 'SAA-C03'}
            </span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
              {bank.version}
            </span>
          </div>

          <h3 className="text-sm font-extrabold text-slate-900 leading-snug">{bank.name}</h3>
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
            {bank.description || 'Đầy đủ giải thích song ngữ và phân bổ 4 domains chuẩn AWS.'}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex justify-between items-center text-[11px] text-slate-600 font-semibold">
            <span>
              <strong className="text-slate-900">{bank.totalQuestions}</strong> câu hỏi
            </span>
            <span>
              <strong className="text-slate-900">{bank.domainsCount}</strong> Domains
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {isCurrentActive ? (
              <button
                onClick={() => router.push('/questions')}
                className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-[11px] font-extrabold rounded-xl flex items-center justify-center transition"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Đang học
              </button>
            ) : isEnrolled ? (
              <button
                onClick={() => handleCardAction(bank.id, isEnrolled, isCurrentActive)}
                disabled={switchActiveMutation.isPending}
                className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-extrabold rounded-xl transition flex items-center justify-center"
              >
                <Play className="w-3 h-3 mr-1 text-amber-400" /> Chuyển sang
              </button>
            ) : (
              <button
                onClick={() => handleCardAction(bank.id, isEnrolled, isCurrentActive)}
                disabled={enrollMutation.isPending}
                className="py-2 px-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-[11px] rounded-xl transition flex items-center justify-center shadow-2xs"
              >
                {user ? 'Đăng ký học' : 'Học ngay'}
              </button>
            )}

            {/* Quick action to take Mock Exam for this specific 65-question test */}
            <button
              onClick={() => router.push(`/exam?bankId=${bank.id}`)}
              className="py-2 px-3 bg-slate-100 hover:bg-amber-100 hover:border-amber-300 border border-slate-200 text-slate-800 hover:text-amber-900 font-extrabold text-[11px] rounded-xl transition flex items-center justify-center"
              title="Thi thử đề này với 65 câu giữ nguyên thứ tự"
            >
              <Award className="w-3.5 h-3.5 mr-1 text-amber-500" /> Thi thử đề này
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render a Major Bundle Card ("Bộ lớn")
  const renderBundleSection = (bundle: any) => {
    const isExpanded = !!expandedBundles[bundle.key];
    const isMasterActive = !!user && bundle.master && activeBankId === bundle.master.id;
    const activeSubTest = bundle.tests.find((t: Bank) => activeBankId === t.id);

    return (
      <div
        key={bundle.key}
        className="card-saas p-6 sm:p-7 border-2 border-slate-200/90 hover:border-amber-400/80 transition-all space-y-6 bg-gradient-to-br from-white via-white to-slate-50/50"
      >
        {/* Bundle Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black px-2.5 py-1 bg-amber-500 text-slate-950 rounded-lg shadow-2xs">
                {bundle.code}
              </span>
              <span className="text-xs font-extrabold px-3 py-1 bg-amber-500/10 text-amber-900 border border-amber-500/20 rounded-lg flex items-center">
                <Layers className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                {bundle.badge}
              </span>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                {bundle.tests.length} Đề thi chuẩn • {bundle.totalQuestions} câu hỏi
              </span>

              {activeSubTest && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Đang học:{' '}
                  {activeSubTest.name}
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {bundle.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {bundle.description}
            </p>
          </div>

          {/* Master bank actions & expand toggle */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {bundle.master && (
              <button
                onClick={() => handleCardAction(bundle.master.id, bundle.master.isEnrolled, isMasterActive)}
                className={`py-2.5 px-4 text-xs font-extrabold rounded-xl transition flex items-center shadow-xs ${
                  isMasterActive
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                {isMasterActive ? 'Đang học Bộ Max (390 câu)' : 'Học toàn bộ 390 câu (Max)'}
              </button>
            )}

            <button
              onClick={() => toggleBundle(bundle.key)}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-xl transition flex items-center"
            >
              <span>{isExpanded ? 'Thu gọn' : `Xem 6 đề (${bundle.tests.length})`}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 ml-1 text-slate-600" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Sub-tests Grid (6 independent 65-question exams) */}
        {isExpanded && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 uppercase tracking-wide">
              <span>Danh sách 6 đề thi chuẩn (65 câu hỏi / đề):</span>
              <span className="text-[11px] font-medium text-slate-500 normal-case">
                Mỗi đề có thể học riêng biệt hoặc thi thử độc lập
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bundle.tests.map((testBank: Bank) => renderSubTestCard(testBank))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render standalone bank card (for SAA_dump or other certifications)
  const renderStandaloneCard = (bank: Bank) => {
    const isEnrolled = !!user && bank.isEnrolled;
    const isCurrentActive = !!user && activeBankId === bank.id;

    return (
      <div
        key={bank.id}
        className={`card-saas p-6 flex flex-col justify-between space-y-5 transition-all ${
          isCurrentActive ? 'ring-2 ring-amber-500 border-amber-300 bg-amber-50/20 shadow-md' : ''
        }`}
      >
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs font-extrabold px-3 py-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 rounded-lg">
              {bank.certification.code || bank.certification.provider}
            </span>
            <span className="text-xs font-bold text-slate-400">{bank.version}</span>
          </div>

          <h2 className="text-base font-extrabold text-slate-900 leading-snug">{bank.name}</h2>
          <p className="text-xs text-slate-500 leading-relaxed">{bank.description}</p>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-600 font-semibold">
            <span>
              <strong className="text-slate-900">{bank.totalQuestions}</strong> câu hỏi
            </span>
            <span>
              <strong className="text-slate-900">{bank.domainsCount}</strong> Domains
            </span>
          </div>

          <div className="space-y-2">
            {isCurrentActive ? (
              <button
                onClick={() => router.push('/questions')}
                className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-extrabold rounded-xl flex items-center justify-center transition shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" /> Môn học đang học (Vào ngay)
              </button>
            ) : isEnrolled ? (
              <button
                onClick={() => handleCardAction(bank.id, isEnrolled, isCurrentActive)}
                disabled={switchActiveMutation.isPending}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition shadow-xs flex items-center justify-center"
              >
                <Play className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Chuyển sang môn này
              </button>
            ) : (
              <button
                onClick={() => handleCardAction(bank.id, isEnrolled, isCurrentActive)}
                disabled={enrollMutation.isPending}
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-xs rounded-xl transition shadow-md shadow-amber-500/20 flex items-center justify-center"
              >
                {user ? 'Đăng ký học ngay' : 'Học ngay không cần đăng nhập'}
              </button>
            )}

            <button
              onClick={() => router.push(`/exam?bankId=${bank.id}`)}
              className="w-full py-2 bg-slate-100 hover:bg-amber-100 border border-slate-200 hover:border-amber-300 text-slate-800 hover:text-amber-900 font-extrabold text-xs rounded-xl transition flex items-center justify-center"
            >
              <Award className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Thi thử bộ câu hỏi này
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-900 border border-amber-500/20">
          <BookOpen className="w-3.5 h-3.5 mr-1.5 text-amber-600" /> Kho ngân hàng câu hỏi &amp; Đề thi chuẩn AWS
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Danh mục Bộ câu hỏi &amp; Chứng chỉ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
          Được nhóm thành các bộ đề lớn chuẩn thực chiến (Udemy, Tutorials Dojo, SAA_dump). Bạn có thể đăng ký học riêng biệt theo từng đề hoặc luyện toàn bộ ngân hàng câu hỏi.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`py-2 px-3.5 text-xs font-extrabold rounded-xl transition cursor-pointer ${
            activeTab === 'ALL'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          Tất cả bộ đề ({data?.questionBanks?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('BUNDLES')}
          className={`py-2 px-3.5 text-xs font-extrabold rounded-xl transition cursor-pointer flex items-center ${
            activeTab === 'BUNDLES'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          <Layers className="w-3.5 h-3.5 mr-1 text-amber-700" />
          Bộ đề lớn SAA-C03 (Udemy &amp; Dojo)
        </button>
        <button
          onClick={() => setActiveTab('SAA_STANDALONE')}
          className={`py-2 px-3.5 text-xs font-extrabold rounded-xl transition cursor-pointer ${
            activeTab === 'SAA_STANDALONE'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          SAA-C03 Thực chiến (Dump 1.019 câu &amp; v2.0)
        </button>
        <button
          onClick={() => setActiveTab('OTHERS')}
          className={`py-2 px-3.5 text-xs font-extrabold rounded-xl transition cursor-pointer ${
            activeTab === 'OTHERS'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
          }`}
        >
          Chứng chỉ AWS khác ({otherCertBanks.length})
        </button>
      </div>

      {/* 1. Major Bundles Section (Udemy & Tutorials Dojo) */}
      {(activeTab === 'ALL' || activeTab === 'BUNDLES') && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-base">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span>Bộ đề lớn SAA-C03 (Gom nhóm theo series đề thi)</span>
          </div>

          <div className="space-y-6">
            {renderBundleSection(udemyBundle)}
            {renderBundleSection(dojoBundle)}
          </div>
        </div>
      )}

      {/* 2. Standalone SAA-C03 Banks (Dump 1.019 câu, v2.0 390 câu...) */}
      {(activeTab === 'ALL' || activeTab === 'SAA_STANDALONE') && standaloneSaaBanks.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-base">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>Bộ đề thực chiến SAA-C03 độc lập</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standaloneSaaBanks.map(renderStandaloneCard)}
          </div>
        </div>
      )}

      {/* 3. Other AWS Certifications */}
      {(activeTab === 'ALL' || activeTab === 'OTHERS') && otherCertBanks.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-base">
            <Award className="w-5 h-5 text-slate-700" />
            <span>Các chứng chỉ AWS khác (Cloud Practitioner, Developer, Data Engineer...)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCertBanks.map(renderStandaloneCard)}
          </div>
        </div>
      )}
    </div>
  );
}
