'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Award,
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  Flame,
  Highlighter,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  Zap,
  ArrowRight,
  Check,
  TrendingUp,
  Activity,
  Compass,
  Plus,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

async function fetchQuestionBanks() {
  const res = await fetch('/api/question-banks');
  if (!res.ok) throw new Error('Failed to fetch question banks');
  return res.json();
}

async function fetchOverview() {
  const res = await fetch('/api/progress/overview');
  if (!res.ok) return null;
  return res.json();
}

async function fetchDomains() {
  const res = await fetch('/api/progress/domains');
  if (!res.ok) return null;
  return res.json();
}

export default function HomePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, hydrated, setUser } = useAuthStore();
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);

  const { data: banksData } = useQuery({
    queryKey: ['landingQuestionBanks'],
    queryFn: fetchQuestionBanks,
  });

  const { data: overview } = useQuery({
    queryKey: ['progressOverview'],
    queryFn: fetchOverview,
    enabled: !!user,
  });

  const { data: domainsData } = useQuery({
    queryKey: ['progressDomains'],
    queryFn: fetchDomains,
    enabled: !!user,
  });

  const switchActiveBankMutation = useMutation({
    mutationFn: async (bankId: string) => {
      const res = await fetch('/api/me/active-question-bank', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionBankId: bankId }),
      });
      if (!res.ok) throw new Error('Switch bank failed');
      return res.json();
    },
    onSuccess: (data, bankId) => {
      if (user && data) {
        setUser({ ...user, activeQuestionBankId: bankId });
        queryClient.invalidateQueries({ queryKey: ['progressOverview'] });
        queryClient.invalidateQueries({ queryKey: ['progressDomains'] });
        queryClient.invalidateQueries({ queryKey: ['landingQuestionBanks'] });
        toast.success('Đã chuyển môn học thành công!');
        setCourseDropdownOpen(false);
      }
    },
  });

  const handleStartPractice = async (mode: string, domainId?: string) => {
    try {
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, domainId, limit: 15 }),
      });
      const data = await res.json();
      if (data.sessionId) {
        router.push(`/practice/${data.sessionId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartLearning = () => {
    if (!user) {
      router.push('/login');
    } else if (user.activeQuestionBankId) {
      router.push('/questions');
    } else {
      router.push('/question-banks');
    }
  };

  const handleEnrollBank = async (bankId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    try {
      const res = await fetch(`/api/question-banks/${bankId}/enroll`, { method: 'POST' });
      if (res.ok) {
        router.push('/questions');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Wait for auth to resolve before rendering — prevents landing page flash
  if (!hydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-500">Đang tải...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, render FULL Rich Dashboard view (overview can be null/loading)
  if (user) {
    const stats = overview?.stats || {
      totalQuestions: 950,
      totalAnswered: 0,
      accuracyRate: 0,
      bookmarkedCount: 0,
      notesCount: 0,
      streakDays: 3,
      dailyTarget: 20,
      lastMockExamScore: null,
      lastMockExamPassed: null,
    };

    const certCode = overview?.activeCertification?.code || 'AWS';
    const activeBankId = overview?.activeQuestionBankId || user?.activeQuestionBankId;
    const activeBankObj = banksData?.questionBanks?.find((b: any) => b.id === activeBankId);
    
    // Filter ONLY banks that the user has enrolled in!
    const enrolledBanks = banksData?.questionBanks?.filter((b: any) => b.isEnrolled) || [];
    const percentOverall = Math.round((stats.totalAnswered / (stats.totalQuestions || 1)) * 100);

    return (
      <div className="space-y-6 sm:space-y-8 pb-16">
        {/* Clean Dashboard Banner */}
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-8 text-white shadow-xl relative border border-slate-800 z-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3.5 max-w-2xl w-full">
              {/* Course Switcher Dropdown Button */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 flex items-center shrink-0">
                  <Compass className="w-3.5 h-3.5 mr-1" /> Môn học đang chọn:
                </span>

                <div className="relative max-w-full">
                  <button
                    onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
                    onBlur={() => setTimeout(() => setCourseDropdownOpen(false), 200)}
                    className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-amber-400/50 rounded-full transition-all shadow-xs group max-w-full"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    <span className="text-xs font-extrabold text-amber-300 truncate max-w-[180px] sm:max-w-[340px]">
                      {activeBankObj
                        ? `${activeBankObj.certification.code}: ${activeBankObj.name}`
                        : 'AWS Certification Bank'}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-200 shrink-0 ${courseDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu Popup - Shows ONLY Enrolled Courses */}
                  {courseDropdownOpen && (
                    <div className="absolute left-0 mt-2 min-w-[300px] sm:min-w-[420px] max-w-[90vw] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-[100] space-y-1">
                      <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1 flex justify-between items-center">
                        <span>Môn học đã đăng ký ({enrolledBanks.length})</span>
                        <Link href="/question-banks" className="text-amber-400 hover:underline flex items-center font-bold">
                          <Plus className="w-3 h-3 mr-0.5" /> Thêm môn mới
                        </Link>
                      </div>

                      {enrolledBanks.length === 0 ? (
                        <div className="p-3 text-xs text-slate-400 text-center">
                          Bạn chưa đăng ký môn học nào.
                        </div>
                      ) : (
                        enrolledBanks.map((b: any) => {
                          const isSelected = b.id === activeBankId;

                          return (
                            <button
                              key={b.id}
                              onMouseDown={() => switchActiveBankMutation.mutate(b.id)}
                              className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between gap-3 group ${
                                isSelected
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'hover:bg-slate-800 text-slate-200'
                              }`}
                            >
                              <div className="space-y-0.5 min-w-0 flex-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-[10px] font-extrabold px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded whitespace-nowrap shrink-0 border border-amber-400/30">
                                    {b.certification.code}
                                  </span>
                                  <span className="text-xs font-bold text-slate-100 truncate">
                                    {b.name}
                                  </span>
                                </div>
                                <div className="text-[10px] text-slate-400 whitespace-nowrap">
                                  {b.totalQuestions} câu hỏi • {b.domainsCount} Domains
                                </div>
                              </div>

                              {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                            </button>
                          );
                        })
                      )}

                      <div className="pt-1.5 border-t border-slate-800 px-2">
                        <Link
                          href="/question-banks"
                          className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-extrabold rounded-xl transition flex items-center justify-center space-x-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Đăng ký thêm bộ đề khác</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner Welcome Title */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Xin chào, {user.name || user.email}!
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                  Tiếp tục hành trình luyện tập, ghi chú và làm chủ chứng chỉ với thuật toán Spaced Repetition.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="pt-1 flex items-center space-x-3 text-xs text-slate-300">
                <div className="w-36 bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${Math.max(percentOverall, 5)}%` }}
                  />
                </div>
                <span className="font-extrabold text-amber-400">{percentOverall}%</span>
                <span className="text-slate-400 text-[11px]">({stats.totalAnswered}/{stats.totalQuestions} câu)</span>
              </div>
            </div>

            {/* Banner Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => handleStartPractice('DAILY')}
                className="w-full sm:w-auto px-5 py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-2xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center whitespace-nowrap shrink-0 hover:scale-[1.01]"
              >
                <Zap className="w-4 h-4 mr-1.5 fill-slate-950 shrink-0" />
                <span>Vẫn đang luyện tập</span>
              </button>

              <Link
                href="/question-banks"
                className="w-full sm:w-auto px-4 py-3.5 bg-slate-800 hover:bg-slate-750 text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center border border-slate-700 whitespace-nowrap shrink-0"
              >
                <span>Đổi môn / Tất cả bộ đề</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Metric Cards 6 Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="card-saas p-4 sm:p-5 space-y-2 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-extrabold">
              <span>Đã làm</span>
              <div className="p-1 rounded-lg bg-blue-50 text-blue-600">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-slate-900">
              {stats.totalAnswered} <span className="text-xs text-slate-400 font-medium">/ {stats.totalQuestions}</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 font-bold">
              Đạt {percentOverall}% ngân hàng
            </div>
          </div>

          <div className="card-saas p-4 sm:p-5 space-y-2 border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-extrabold">
              <span>Tỷ lệ đúng</span>
              <div className="p-1 rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-slate-900">{stats.accuracyRate}%</div>
            <div className="text-[10px] sm:text-[11px] text-emerald-700 font-extrabold">Mục tiêu thi &ge; 72%</div>
          </div>

          <div className="card-saas p-4 sm:p-5 space-y-2 border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-extrabold">
              <span>Điểm mới nhất</span>
              <div className="p-1 rounded-lg bg-amber-50 text-amber-600">
                <Award className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-slate-900">
              {stats.lastMockExamScore !== null ? stats.lastMockExamScore : '—'}
            </div>
            <div className="text-[10px] sm:text-[11px]">
              {stats.lastMockExamPassed === true ? (
                <span className="text-emerald-700 font-extrabold">PASSED</span>
              ) : stats.lastMockExamPassed === false ? (
                <span className="text-red-600 font-extrabold">FAILED</span>
              ) : (
                <span className="text-slate-400 font-semibold">Chưa thi thử</span>
              )}
            </div>
          </div>

          <div className="card-saas p-4 sm:p-5 space-y-2 border-l-4 border-l-amber-400">
            <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-extrabold">
              <span>Đánh dấu</span>
              <div className="p-1 rounded-lg bg-amber-50 text-amber-600">
                <Bookmark className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-slate-900">{stats.bookmarkedCount}</div>
            <Link href="/bookmarks" className="text-[10px] sm:text-[11px] text-amber-600 font-extrabold hover:underline flex items-center">
              Xem danh sách <ArrowRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="card-saas p-4 sm:p-5 space-y-2 border-l-4 border-l-indigo-500">
            <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-extrabold">
              <span>Ghi chú</span>
              <div className="p-1 rounded-lg bg-indigo-50 text-indigo-600">
                <FileText className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-slate-900">{stats.notesCount}</div>
            <Link href="/notes" className="text-[10px] sm:text-[11px] text-indigo-600 font-extrabold hover:underline flex items-center">
              Quản lý note <ArrowRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="card-saas p-4 sm:p-5 space-y-2 border-l-4 border-l-pink-500">
            <div className="flex items-center justify-between text-slate-500 text-[11px] sm:text-xs font-extrabold">
              <span>Highlight</span>
              <div className="p-1 rounded-lg bg-pink-50 text-pink-600">
                <Highlighter className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-xl sm:text-3xl font-black text-slate-900">Xem lại</div>
            <Link href="/highlights" className="text-[10px] sm:text-[11px] text-pink-600 font-extrabold hover:underline flex items-center">
              Các từ tô màu <ArrowRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Domain Progress Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-saas p-5 sm:p-8 space-y-5">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-amber-500" /> Tiến độ theo Domain
                  </h2>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                    Cơ cấu trọng số kỳ thi {certCode} và độ thành thạo
                  </p>
                </div>
                <span className="text-xs font-extrabold px-3.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-full whitespace-nowrap shrink-0">
                  {domainsData?.domains?.length || 4} Domains
                </span>
              </div>

              <div className="space-y-4">
                {domainsData?.domains?.map((d: any) => (
                  <div key={d.id} className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50/80 transition space-y-3.5 shadow-xs">
                    <div className="flex justify-between items-start gap-2">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-slate-900 text-amber-400 rounded-md shrink-0">
                            {d.code}
                          </span>
                          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                            {d.name}
                          </h3>
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-500 font-medium">
                          Trọng số: <span className="font-extrabold text-slate-800">{d.weightPercentage}%</span> • Đã làm: <span className="font-extrabold text-slate-800">{d.answeredCount}/{d.totalQuestions}</span> câu
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-xs sm:text-base font-black text-slate-900 whitespace-nowrap">
                          {d.accuracy}% đúng
                        </div>
                        {d.isWeak ? (
                          <span className="inline-flex items-center text-[10px] font-extrabold text-red-700 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 whitespace-nowrap">
                            <ShieldAlert className="w-3 h-3 mr-1 text-red-600" /> Cần tập trung
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 whitespace-nowrap">
                            <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" /> Đang học tốt
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Gradient Progress Bar */}
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-200/80 p-0.5">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          d.accuracy >= 75
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : d.accuracy >= 50
                            ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                            : 'bg-gradient-to-r from-red-500 to-rose-400'
                        }`}
                        style={{ width: `${Math.max(d.completion, 6)}%` }}
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleStartPractice('CUSTOM', d.id)}
                        className="text-xs font-extrabold text-amber-600 hover:text-amber-700 flex items-center group whitespace-nowrap"
                      >
                        Luyện câu hỏi Domain này <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Launchers Right Column */}
          <div className="space-y-6">
            {/* SRS Launcher Card */}
            <div className="card-saas p-6 space-y-4 border-l-4 border-l-amber-500">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-5 h-5 text-amber-500" />
                  <h2 className="text-base font-extrabold text-slate-900">Spaced Repetition (SRS)</h2>
                </div>
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                  SM-2
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Tự động gợi ý các câu hỏi đến hạn ôn tập dựa trên thuật toán ghi nhớ ngắt quãng SuperMemo SM-2.
              </p>

              <button
                onClick={() => handleStartPractice('SPACED_REPETITION')}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm rounded-2xl transition-all shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/35 flex items-center justify-center space-x-2 whitespace-nowrap hover:scale-[1.01] active:scale-[0.99]"
              >
                <Zap className="w-4.5 h-4.5 fill-slate-950 shrink-0" />
                <span>Bắt đầu ôn tập SRS</span>
              </button>
            </div>

            {/* Practice Mode Launchers */}
            <div className="card-saas p-6 space-y-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center">
                <TrendingUp className="w-4 h-4 mr-1.5 text-amber-500" /> Chế độ luyện tập nhanh
              </h2>
              <div className="space-y-3">
                <Link
                  href="/highlights"
                  className="w-full text-left p-4 rounded-2xl border border-pink-200 bg-pink-50/40 hover:border-pink-400 hover:bg-pink-50/80 transition flex items-center justify-between group shadow-2xs"
                >
                  <div>
                    <div className="text-xs font-black text-slate-900 flex items-center">
                      <Highlighter className="w-4 h-4 mr-1.5 text-pink-600" /> Xem lại Highlight
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">Các từ khóa & câu hỏi bôi đen</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-pink-600 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </Link>

                <button
                  onClick={() => handleStartPractice('WEAK_DOMAINS')}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition flex items-center justify-between group shadow-2xs"
                >
                  <div>
                    <div className="text-xs font-black text-slate-900">Tập trung Domain yếu</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">Ôn lại các câu hay trả lời sai</div>
                  </div>
                  <Target className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform shrink-0 ml-2" />
                </button>

                <button
                  onClick={() => handleStartPractice('CUSTOM')}
                  className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition flex items-center justify-between group shadow-2xs"
                >
                  <div>
                    <div className="text-xs font-black text-slate-900">Luyện tập ngẫu nhiên</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">15 câu ngẫu nhiên từ ngân hàng</div>
                  </div>
                  <BookOpen className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform shrink-0 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modern Non-Salesy Landing Page for Guests / Public
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 md:pt-12 md:pb-20 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3.5 py-1.5 bg-amber-500/10 text-amber-800 rounded-full text-xs font-extrabold border border-amber-500/20">
              <Sparkles className="w-4 h-4 mr-1.5 text-amber-600" />
              Nền tảng học tập & Ghi nhớ chứng chỉ IT
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Chinh phục chứng chỉ với <span className="gradient-text">Spaced Repetition</span> & Ghi chú thông minh
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Hệ thống hỗ trợ hơn 950+ câu hỏi ôn tập các chứng chỉ AWS, Kubernetes, Terraform. Tập trung vào thực hành bài tập, theo dõi điểm yếu và duy trì thói quen học tập mỗi ngày.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <button
                onClick={handleStartLearning}
                className="px-7 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-amber-500/25 flex items-center hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 mr-2 fill-slate-950" /> Bắt đầu học ngay
              </button>

              <Link
                href="/question-banks"
                className="px-7 py-4 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm rounded-2xl transition-all border border-slate-200 shadow-sm flex items-center"
              >
                <BookOpen className="w-4 h-4 mr-2 text-slate-500" /> Khám phá bộ câu hỏi
              </Link>
            </div>
          </div>

          {/* Hero Feature Preview Box */}
          <div className="p-6 sm:p-8 space-y-5 bg-white text-slate-900 rounded-3xl shadow-xl border border-slate-200/90 relative">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold px-3 py-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 rounded-lg">
                  AWS SAA-C03
                </span>
                <span className="text-xs text-slate-500 font-bold">Chế độ Luyện tập</span>
              </div>
              <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />
            </div>

            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
              Một công ty cần di chuyển 50 TB dữ liệu lưu trữ khối từ hạ tầng on-premises sang AWS với chi phí tối ưu nhất và độ trễ truy xuất thấp nhất. Dịch vụ AWS nào phù hợp nhất?
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-500 text-amber-950 font-bold flex items-center shadow-xs">
                <span className="w-6 h-6 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold mr-2.5 text-xs shrink-0">C</span>
                AWS S3 File Gateway
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-medium flex items-center">
                <span className="w-6 h-6 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-extrabold mr-2.5 text-xs shrink-0">D</span>
                AWS Snowball Edge Storage Optimized
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500 font-semibold border-t border-slate-100">
              <span className="flex items-center text-amber-600 font-extrabold">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> SuperMemo SM-2 Spaced Repetition
              </span>
              <span>Lưu note & Highlight tức thì</span>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Question Banks Section */}
      <section id="question-banks" className="space-y-8 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Các Bộ câu hỏi chứng chỉ hiện có</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Dữ liệu được cập nhật chuẩn xác từ ngân hàng đề thi thực tế
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banksData?.questionBanks?.map((bank: any) => (
            <div key={bank.id} className="card-saas p-6 space-y-5 flex flex-col justify-between hover:scale-[1.01] transition-transform">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-extrabold px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
                    {bank.certification.code || bank.certification.provider}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{bank.version}</span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 leading-snug">{bank.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{bank.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="text-xs text-slate-600 font-semibold">
                  <span className="font-extrabold text-slate-900">{bank.totalQuestions}</span> câu hỏi • <span className="font-extrabold text-slate-900">{bank.domainsCount}</span> Domains
                </div>

                <button
                  onClick={() => handleEnrollBank(bank.id)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center"
                >
                  Bắt đầu học <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Features Section */}
      <section id="features" className="space-y-8 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tính năng hỗ trợ học tập chuyên sâu</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Tập trung hoàn toàn vào trải nghiệm ôn luyện và ghi nhớ dài hạn
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Practice theo Domain & Topic',
              desc: 'Tùy chỉnh số lượng câu hỏi, mức độ khó và lọc câu chưa làm.',
              icon: BookOpen,
              color: 'text-blue-600 bg-blue-50',
            },
            {
              title: 'Thi thử Mock Exam',
              desc: 'Đồng hồ đếm ngược thời gian thực, cắm cờ câu hỏi và chấm điểm chuẩn AWS (100-1000).',
              icon: Clock,
              color: 'text-amber-600 bg-amber-50',
            },
            {
              title: 'Spaced Repetition (SRS)',
              desc: 'Tự động tính toán chu kỳ lặp lại ngắt quãng SuperMemo SM-2 cho từng câu hỏi.',
              icon: RotateCcw,
              color: 'text-emerald-600 bg-emerald-50',
            },
            {
              title: 'Tô màu Highlight nội dung',
              desc: 'Bôi đen từ khóa quan trọng trong câu hỏi và lưu vết 4 sắc màu.',
              icon: Highlighter,
              color: 'text-pink-600 bg-pink-50',
            },
            {
              title: 'Ghi chú cá nhân Auto-save',
              desc: 'Viết ghi chú riêng cho từng câu hỏi với cơ chế tự động đồng bộ DB.',
              icon: FileText,
              color: 'text-indigo-600 bg-indigo-50',
            },
            {
              title: 'Phát hiện Domain còn yếu',
              desc: 'Tự động thống kê và đề xuất các chủ đề có tỷ lệ đúng dưới 70%.',
              icon: ShieldAlert,
              color: 'text-red-600 bg-red-50',
            },
          ].map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="card-saas p-6 space-y-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${f.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="space-y-8 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Quy trình học tập 5 bước đơn giản</h2>
          <p className="text-xs sm:text-sm text-slate-500">Dễ dàng bắt đầu mà không có bất kỳ rào cản phức tạp nào</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
          {[
            { step: '1', title: 'Tạo tài khoản', desc: 'Đăng ký nhanh chóng' },
            { step: '2', title: 'Chọn môn học', desc: 'Chọn chứng chỉ AWS/IT' },
            { step: '3', title: 'Đăng ký bộ đề', desc: 'Kích hoạt môn học active' },
            { step: '4', title: 'Luyện tập & Note', desc: 'Luyện đề và lưu ghi chú' },
            { step: '5', title: 'Theo dõi tiến độ', desc: 'Xem thống kê & SRS' },
          ].map((s) => (
            <div key={s.step} className="card-saas p-5 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center mx-auto">
                {s.step}
              </div>
              <h3 className="text-xs font-extrabold text-slate-900">{s.title}</h3>
              <p className="text-[11px] text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="pt-12 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>© 2026 CertPrep.ai — Nền tảng học tập & luyện thi chứng chỉ IT cá nhân.</div>
        <div className="flex space-x-4">
          <Link href="/question-banks" className="hover:underline">Bộ câu hỏi</Link>
          <Link href="/login" className="hover:underline">Đăng nhập</Link>
        </div>
      </footer>
    </div>
  );
}
