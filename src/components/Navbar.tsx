'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import {
  Award,
  BookOpen,
  CheckSquare,
  ChevronDown,
  FileText,
  Flame,
  Highlighter,
  LayoutDashboard,
  LogOut,
  Menu,
  RotateCcw,
  Sparkles,
  User as UserIcon,
  X,
  Zap,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';

async function fetchOverview() {
  const res = await fetch('/api/progress/overview');
  if (!res.ok) return null;
  return res.json();
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [bankDropdownOpen, setBankDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const { data: overview } = useQuery({
    queryKey: ['progressOverview'],
    queryFn: fetchOverview,
    enabled: !!user,
  });

  if (pathname === '/login' || pathname === '/register') return null;

  const realStreak = overview?.stats?.streakDays ?? 0;

  const isMoreActive =
    pathname.startsWith('/notes') ||
    pathname.startsWith('/highlights') ||
    pathname.startsWith('/bookmarks') ||
    pathname.startsWith('/profile');

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

  return (
    <>
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 shadow-xs">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left: AWS Circular Logo Container */}
            <div className="flex items-center space-x-2.5 sm:space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8.5 h-8.5 sm:w-10 sm:h-10 bg-amber-500 rounded-full flex items-center justify-center p-2 shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform shrink-0">
                  <img
                    src="/amazon-web-services-logo.png"
                    alt="AWS Logo"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Center Navigation Links */}
            {user ? (
              <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
                <Link
                  href="/"
                  className={`flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    pathname === '/'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <LayoutDashboard className={`w-4 h-4 mr-1.5 ${pathname === '/' ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>Dashboard</span>
                </Link>

                {/* Bank Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setBankDropdownOpen(!bankDropdownOpen)}
                    onBlur={() => setTimeout(() => setBankDropdownOpen(false), 200)}
                    className={`flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      pathname.startsWith('/questions') || pathname.startsWith('/question-banks') || pathname.startsWith('/docs')
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <BookOpen className={`w-4 h-4 mr-1.5 ${
                      pathname.startsWith('/questions') || pathname.startsWith('/question-banks') || pathname.startsWith('/docs') ? 'text-amber-400' : 'text-slate-400'
                    }`} />
                    <span>Ngân hàng</span>
                    <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" />
                  </button>

                  {bankDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                      <Link
                        href="/questions"
                        className="flex items-center px-3 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                      >
                        <BookOpen className="w-4 h-4 mr-2 text-amber-500 shrink-0" />
                        <div>
                          <div>Ngân hàng câu hỏi</div>
                          <div className="text-[10px] font-medium text-slate-400 mt-0.5">Luyện từng câu theo SRS</div>
                        </div>
                      </Link>
                      <Link
                        href="/question-banks"
                        className="flex items-center px-3 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                      >
                        <Layers className="w-4 h-4 mr-2 text-indigo-500 shrink-0" />
                        <div>
                          <div>Ngân hàng bộ câu hỏi</div>
                          <div className="text-[10px] font-medium text-slate-400 mt-0.5">Chọn đề thi & môn học</div>
                        </div>
                      </Link>
                      <Link
                        href="/docs"
                        className="flex items-center px-3 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                      >
                        <FileText className="w-4 h-4 mr-2 text-amber-500 shrink-0" />
                        <div>
                          <div>Ngân hàng tài liệu SAA-C03</div>
                          <div className="text-[10px] font-medium text-slate-400 mt-0.5">Tài liệu lý thuyết & kiến trúc AWS</div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/exam"
                  className={`flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    pathname.startsWith('/exam')
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <CheckSquare className={`w-4 h-4 mr-1.5 ${pathname.startsWith('/exam') ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>Thi thử</span>
                </Link>

                {/* More Tools Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
                    className={`flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      isMoreActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>Công cụ khác</span>
                    <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-400" />
                  </button>

                  {moreDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                      <Link
                        href="/profile"
                        className="flex items-center px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                      >
                        <UserIcon className="w-4 h-4 mr-2 text-amber-500" /> Trang cá nhân
                      </Link>
                      <Link
                        href="/highlights"
                        className="flex items-center px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                      >
                        <Highlighter className="w-4 h-4 mr-2 text-pink-500" /> Đã Tô màu Highlight
                      </Link>
                      <Link
                        href="/notes"
                        className="flex items-center px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                      >
                        <FileText className="w-4 h-4 mr-2 text-indigo-500" /> Ghi chú cá nhân
                      </Link>
                      <Link
                        href="/bookmarks"
                        className="flex items-center px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                      >
                        <Award className="w-4 h-4 mr-2 text-amber-500" /> Đã Bookmark
                      </Link>
                      <Link
                        href="/review/incorrect"
                        className="flex items-center px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
                      >
                        <CheckSquare className="w-4 h-4 mr-2 text-red-500" /> Các câu làm sai
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            ) : (
              /* Unauthenticated Guest Landing Page Nav Links */
              <nav className="hidden md:flex items-center space-x-6 text-xs sm:text-sm font-bold text-slate-600">
                <Link
                  href="/docs"
                  className={`hover:text-slate-900 transition ${
                    pathname.startsWith('/docs') ? 'text-slate-900 font-extrabold' : ''
                  }`}
                >
                  Tài liệu SAA-C03
                </Link>
                <Link href="/question-banks" className="hover:text-slate-900 transition">
                  Bộ câu hỏi
                </Link>
                <Link href="/#features" className="hover:text-slate-900 transition">
                  Tính năng
                </Link>
                <Link href="/#how-it-works" className="hover:text-slate-900 transition">
                  Quy trình học
                </Link>
              </nav>
            )}

            {/* Right Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {user ? (
                <>
                  <div
                    className="flex items-center text-amber-700 bg-amber-50/90 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-extrabold border border-amber-200/80"
                    title="Chuỗi ngày học"
                  >
                    <Flame className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500" />
                    <span>{realStreak} Ngày</span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <Link
                    href="/login"
                    className="px-3 py-1.5 text-slate-700 hover:text-slate-900 text-xs font-extrabold rounded-xl transition"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/register"
                    className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-extrabold rounded-xl transition shadow-md shadow-amber-500/20 flex items-center"
                  >
                    <Zap className="w-3.5 h-3.5 mr-1 fill-slate-950" /> Bắt đầu
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tools Drawer Sheet */}
      {user && mobileToolsOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setMobileToolsOpen(false)}
          />
          <div className="relative bg-white rounded-t-3xl p-5 space-y-4 shadow-2xl border-t border-slate-200 z-10 animate-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-sm font-black text-slate-900 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-amber-500" /> Tất cả công cụ học tập
              </span>
              <button
                onClick={() => setMobileToolsOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-extrabold">
              <Link
                href="/profile"
                onClick={() => setMobileToolsOpen(false)}
                className="p-3.5 rounded-2xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center space-x-2.5 active:scale-95 transition"
              >
                <UserIcon className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                <span>Trang cá nhân</span>
              </Link>

              <Link
                href="/highlights"
                onClick={() => setMobileToolsOpen(false)}
                className="p-3.5 rounded-2xl bg-pink-50 text-pink-700 border border-pink-200 flex items-center space-x-2.5 active:scale-95 transition"
              >
                <Highlighter className="w-4.5 h-4.5 text-pink-600 shrink-0" />
                <span>Đã tô Highlight</span>
              </Link>

              <Link
                href="/notes"
                onClick={() => setMobileToolsOpen(false)}
                className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center space-x-2.5 active:scale-95 transition"
              >
                <FileText className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                <span>Ghi chú cá nhân</span>
              </Link>

              <Link
                href="/bookmarks"
                onClick={() => setMobileToolsOpen(false)}
                className="p-3.5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-2.5 active:scale-95 transition"
              >
                <Award className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                <span>Đã Bookmark</span>
              </Link>

              <Link
                href="/review/incorrect"
                onClick={() => setMobileToolsOpen(false)}
                className="p-3.5 rounded-2xl bg-red-50 text-red-700 border border-red-200 flex items-center space-x-2.5 active:scale-95 transition"
              >
                <CheckSquare className="w-4.5 h-4.5 text-red-600 shrink-0" />
                <span>Các câu làm sai</span>
              </Link>

              <Link
                href="/question-banks"
                onClick={() => setMobileToolsOpen(false)}
                className="p-3.5 rounded-2xl bg-slate-900 text-white flex items-center space-x-2.5 active:scale-95 transition"
              >
                <BookOpen className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <span>Đổi môn học</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Navigation Bar (App Mode) */}
      {user && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 shadow-2xl flex justify-around items-center">
          <Link
            href="/"
            className={`flex flex-col items-center px-3 py-1 rounded-xl text-[10px] font-bold transition ${
              pathname === '/' ? 'text-amber-600 font-extrabold' : 'text-slate-500'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/questions"
            className={`flex flex-col items-center px-3 py-1 rounded-xl text-[10px] font-bold transition ${
              pathname.startsWith('/questions') || pathname.startsWith('/question-banks') ? 'text-amber-600 font-extrabold' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span>Ngân hàng</span>
          </Link>

          <Link
            href="/exam"
            className={`flex flex-col items-center px-3 py-1 rounded-xl text-[10px] font-bold transition ${
              pathname.startsWith('/exam') ? 'text-amber-600 font-extrabold' : 'text-slate-500'
            }`}
          >
            <CheckSquare className="w-5 h-5 mb-0.5" />
            <span>Thi thử</span>
          </Link>

          <Link
            href="/review"
            className={`flex flex-col items-center px-3 py-1 rounded-xl text-[10px] font-bold transition ${
              pathname.startsWith('/review') && !pathname.startsWith('/review/incorrect')
                ? 'text-amber-600 font-extrabold'
                : 'text-slate-500'
            }`}
          >
            <RotateCcw className="w-5 h-5 mb-0.5" />
            <span>Ôn tập</span>
          </Link>

          <button
            onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
            className={`flex flex-col items-center px-3 py-1 rounded-xl text-[10px] font-bold transition ${
              isMoreActive || mobileToolsOpen ? 'text-amber-600 font-extrabold' : 'text-slate-500'
            }`}
          >
            <Layers className={`w-5 h-5 mb-0.5 ${isMoreActive || mobileToolsOpen ? 'text-amber-500' : 'text-slate-500'}`} />
            <span>Công cụ</span>
          </button>
        </nav>
      )}
    </>
  );
}
