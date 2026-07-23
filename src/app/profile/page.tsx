'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User as UserIcon,
  Mail,
  Calendar,
  Shield,
  Award,
  BookOpen,
  Bookmark,
  FileText,
  Flame,
  CheckCircle2,
  Edit3,
  Check,
  Zap,
  Sparkles,
  ArrowRight,
  LogOut,
  RotateCcw,
  Compass,
} from 'lucide-react';
import toast from 'react-hot-toast';

async function fetchOverview() {
  const res = await fetch('/api/progress/overview');
  if (!res.ok) return null;
  return res.json();
}

async function fetchQuestionBanks() {
  const res = await fetch('/api/question-banks');
  if (!res.ok) throw new Error('Failed to fetch question banks');
  return res.json();
}

export default function ProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');

  const { data: overview } = useQuery({
    queryKey: ['progressOverview'],
    queryFn: fetchOverview,
    enabled: !!user,
  });

  const { data: banksData } = useQuery({
    queryKey: ['landingQuestionBanks'],
    queryFn: fetchQuestionBanks,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (newName: string) => {
      const res = await fetch('/api/me/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error('Update failed');
      return res.json();
    },
    onSuccess: (data) => {
      if (user && data?.user) {
        setUser({ ...user, name: data.user.name });
        toast.success('Đã cập nhật thông tin cá nhân!');
        setIsEditing(false);
      }
    },
    onError: () => {
      toast.error('Cập nhật thông tin thất bại!');
    },
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
        queryClient.invalidateQueries({ queryKey: ['landingQuestionBanks'] });
        toast.success('Đã chuyển môn học thành công!');
      }
    },
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    updateProfileMutation.mutate(nameInput.trim());
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    logout();
    toast.success('Đã đăng xuất tài khoản.');
    router.push('/');
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-xl">
        <UserIcon className="w-12 h-12 text-amber-500 mx-auto" />
        <h1 className="text-xl font-extrabold text-slate-900">Vui lòng đăng nhập</h1>
        <p className="text-xs text-slate-500">Bạn cần đăng nhập để xem trang cá nhân.</p>
        <Link
          href="/login"
          className="inline-flex px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md"
        >
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  const stats = overview?.stats || {
    totalQuestions: 950,
    totalAnswered: 0,
    accuracyRate: 0,
    bookmarkedCount: 0,
    notesCount: 0,
    streakDays: 3,
  };

  const enrolledBanks = banksData?.questionBanks?.filter((b: any) => b.isEnrolled) || [];
  const activeBankId = overview?.activeQuestionBankId || user?.activeQuestionBankId;
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Tháng 7/2026';

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-16">
      {/* 1. Hero User Profile Header Card */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-amber-500/25 shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>

            <div className="space-y-1">
              {!isEditing ? (
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white">{user.name || 'Học viên Demo'}</h1>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-slate-400 hover:text-amber-400 rounded-lg transition"
                    title="Chỉnh sửa tên"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="px-3 py-1 bg-slate-800 border border-amber-400 rounded-xl text-white text-sm font-bold focus:outline-hidden"
                    placeholder="Nhập tên hiển thị"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="p-1.5 bg-amber-400 text-slate-950 rounded-xl font-bold text-xs"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </form>
              )}

              <div className="text-xs text-slate-300 flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{user.email}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded-full border border-slate-700 flex items-center">
                  <Calendar className="w-3 h-3 mr-1 text-slate-400" /> {memberSince}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-300 font-bold text-xs rounded-2xl border border-slate-700 hover:border-red-700/50 transition flex items-center whitespace-nowrap shrink-0"
          >
            <LogOut className="w-4 h-4 mr-1.5" /> Đăng xuất
          </button>
        </div>
      </div>

      {/* 2. Learning Overview Stats Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center">
          <Award className="w-4.5 h-4.5 mr-2 text-amber-500" /> Thống kê quá trình học tập
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-saas p-4 space-y-1.5 border-l-4 border-l-blue-500">
            <div className="text-xs font-extrabold text-slate-500 flex justify-between">
              <span>Đã hoàn thành</span>
              <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.totalAnswered} câu</div>
            <div className="text-[10px] text-slate-400 font-semibold">Trên tổng số {stats.totalQuestions} câu</div>
          </div>

          <div className="card-saas p-4 space-y-1.5 border-l-4 border-l-emerald-500">
            <div className="text-xs font-extrabold text-slate-500 flex justify-between">
              <span>Tỷ lệ chính xác</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.accuracyRate}%</div>
            <div className="text-[10px] text-emerald-700 font-bold">Mục tiêu &ge; 72%</div>
          </div>

          <div className="card-saas p-4 space-y-1.5 border-l-4 border-l-amber-400">
            <div className="text-xs font-extrabold text-slate-500 flex justify-between">
              <span>Đã Bookmark</span>
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.bookmarkedCount} câu</div>
            <Link href="/bookmarks" className="text-[10px] text-amber-600 font-bold hover:underline flex items-center">
              Xem danh sách <ArrowRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>

          <div className="card-saas p-4 space-y-1.5 border-l-4 border-l-orange-500">
            <div className="text-xs font-extrabold text-slate-500 flex justify-between">
              <span>Chuỗi duy trì</span>
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">{stats.streakDays} Ngày</div>
            <div className="text-[10px] text-slate-500 font-bold flex items-center">
              <Flame className="w-3 h-3 mr-1 text-orange-500 fill-orange-500 shrink-0" />
              <span>Đang giữ chuỗi</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Enrolled Certifications & Question Banks */}
      <div className="card-saas p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center">
              <Compass className="w-5 h-5 mr-2 text-amber-500 shrink-0" />
              <span>Bộ đề chứng chỉ đã đăng ký ({enrolledBanks.length})</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Các môn học đang trong tiến trình luyện tập của bạn</p>
          </div>

          <Link
            href="/question-banks"
            className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center whitespace-nowrap shrink-0"
          >
            + Đăng ký môn mới
          </Link>
        </div>

        <div className="space-y-3">
          {enrolledBanks.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 space-y-2">
              <p>Bạn chưa đăng ký bộ đề chứng chỉ nào.</p>
              <Link href="/question-banks" className="text-amber-600 font-bold hover:underline">
                Khám phá ngân hàng bộ đề ngay ➔
              </Link>
            </div>
          ) : (
            enrolledBanks.map((bank: any) => {
              const isSelected = bank.id === activeBankId;

              return (
                <div
                  key={bank.id}
                  className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                    isSelected
                      ? 'bg-amber-50/60 border-amber-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5 min-w-0 flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-extrabold px-2.5 py-0.5 bg-slate-900 text-amber-400 rounded-md shrink-0">
                        {bank.certification.code}
                      </span>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate max-w-[200px] sm:max-w-[340px]">{bank.name}</h3>
                      {isSelected && (
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 bg-amber-400 text-slate-950 rounded-full shrink-0 whitespace-nowrap">
                          Đang kích hoạt
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-500">
                      {bank.totalQuestions} câu hỏi • {bank.domainsCount} Domains
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto shrink-0">
                    {!isSelected ? (
                      <button
                        onClick={() => switchActiveBankMutation.mutate(bank.id)}
                        disabled={switchActiveBankMutation.isPending}
                        className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs font-extrabold rounded-xl transition whitespace-nowrap"
                      >
                        Chuyển sang môn này
                      </button>
                    ) : (
                      <Link
                        href="/questions"
                        className="w-full sm:w-auto px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl transition flex items-center justify-center whitespace-nowrap"
                      >
                        Vào học ngay <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
