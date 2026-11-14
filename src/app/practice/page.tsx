'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Play,
  Calendar,
  Clock,
  Trash2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Plus,
  Award,
  ShieldCheck,
  Layers,
  ArrowLeft,
  CheckSquare,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

async function fetchPracticeSessions(bankId?: string | null) {
  const url = bankId ? `/api/practice-sessions?questionBankId=${encodeURIComponent(bankId)}` : '/api/practice-sessions';
  const res = await fetch(url, {
    headers: { 'x-guest-mode': '1' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch practice sessions');
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

export default function PracticeSessionsListPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [filterTab, setFilterTab] = useState<'ALL' | 'COMPLETED' | 'IN_PROGRESS'>('ALL');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: overview } = useQuery({
    queryKey: ['progressOverview', user?.activeQuestionBankId],
    queryFn: fetchOverview,
  });

  const currentBankId = overview?.activeQuestionBankId || user?.activeQuestionBankId;

  const { data, isLoading } = useQuery({
    queryKey: ['practiceSessionsList', currentBankId],
    queryFn: () => fetchPracticeSessions(currentBankId),
  });

  const sessions: any[] = data?.sessions || [];

  const handleStartNewSession = async () => {
    try {
      setIsCreatingNew(true);
      const res = await fetch('/api/practice-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-guest-mode': '1' },
        credentials: 'include',
        body: JSON.stringify({
          mode: 'CUSTOM',
          questionBankId: currentBankId,
          limit: 15,
        }),
      });
      const resData = await res.json();
      if (resData.sessionId) {
        toast.success('Đã tạo phiên luyện tập mới (15 câu)!');
        router.push(`/practice/${resData.sessionId}`);
      } else {
        toast.error(resData.error || 'Không thể tạo phiên mới');
      }
    } catch {
      toast.error('Lỗi khi tạo phiên mới');
    } finally {
      setIsCreatingNew(false);
    }
  };

  const handleDeleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Bạn có chắc muốn xóa lịch sử phiên luyện tập này?')) {
      return;
    }

    try {
      setDeletingId(sessionId);
      const res = await fetch(`/api/practice-sessions/${sessionId}`, {
        method: 'DELETE',
        headers: { 'x-guest-mode': '1' },
        credentials: 'include',
      });
      if (res.ok) {
        toast.success('Đã xóa phiên luyện tập.');
        queryClient.invalidateQueries({ queryKey: ['practiceSessionsList'] });
      } else {
        toast.error('Không thể xóa phiên luyện tập.');
      }
    } catch {
      toast.error('Lỗi khi xóa phiên luyện tập.');
    } finally {
      setDeletingId(null);
    }
  };

  const completedSessions = sessions.filter((s) => s.isCompleted);
  const inProgressSessions = sessions.filter((s) => !s.isCompleted);

  const filteredSessions =
    filterTab === 'COMPLETED'
      ? completedSessions
      : filterTab === 'IN_PROGRESS'
      ? inProgressSessions
      : sessions;

  const totalAnsweredAcross = sessions.reduce((acc, s) => acc + s.answeredCount, 0);
  const totalCorrectAcross = sessions.reduce((acc, s) => acc + s.correctCount, 0);
  const avgAccuracy = totalAnsweredAcross > 0 ? Math.round((totalCorrectAcross / totalAnsweredAcross) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Header Card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-amber-600">
            <BookOpen className="w-4 h-4" />
            <span>Quản lý Phiên Học</span>
            {overview?.activeCertification && (
              <span className="px-2 py-0.5 bg-slate-900 text-amber-400 rounded-md text-[10px]">
                {overview.activeCertification.code}
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Lịch sử &amp; Quản lý các phiên luyện tập
          </h1>
          <p className="text-xs text-slate-500 font-medium max-w-2xl">
            Theo dõi tất cả các phiên luyện tập bạn đã thực hiện. Bấm &quot;Xem lại Review&quot; trên từng phiên để mở lại chi tiết 15 câu, đối chiếu đáp án đúng và làm lại bất kỳ lúc nào.
          </p>
        </div>

        <button
          onClick={handleStartNewSession}
          disabled={isCreatingNew}
          className="w-full md:w-auto px-5 py-3 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-md shadow-amber-500/25 transition active:scale-95 flex items-center justify-center space-x-2 shrink-0 disabled:opacity-50 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          <span>{isCreatingNew ? 'Đang tạo...' : 'Luyện tập phiên mới (15 câu)'}</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="card-saas p-5 space-y-2 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Tổng số phiên đã luyện</span>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{sessions.length}</div>
          <div className="text-[11px] font-semibold text-slate-500">
            {completedSessions.length} phiên đã hoàn thành 100%
          </div>
        </div>

        <div className="card-saas p-5 space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Phiên hoàn thành</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            {completedSessions.length}
          </div>
          <div className="text-[11px] font-semibold text-emerald-700">
            {sessions.length > 0 ? Math.round((completedSessions.length / sessions.length) * 100) : 0}% tỷ lệ hoàn thành
          </div>
        </div>

        <div className="card-saas p-5 space-y-2 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Độ chính xác trung bình</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{avgAccuracy}%</div>
          <div className="text-[11px] font-semibold text-slate-500">
            {totalCorrectAcross}/{totalAnsweredAcross} câu trả lời đúng
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
        <button
          onClick={() => setFilterTab('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
            filterTab === 'ALL'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span>Tất cả các phiên</span>
          <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
            filterTab === 'ALL' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
          }`}>
            {sessions.length}
          </span>
        </button>

        <button
          onClick={() => setFilterTab('COMPLETED')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
            filterTab === 'COMPLETED'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Đã hoàn thành</span>
          <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
            filterTab === 'COMPLETED' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {completedSessions.length}
          </span>
        </button>

        <button
          onClick={() => setFilterTab('IN_PROGRESS')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
            filterTab === 'IN_PROGRESS'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'bg-white border border-slate-200 text-amber-800 hover:bg-amber-50'
          }`}
        >
          <span>Đang làm dở</span>
          <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
            filterTab === 'IN_PROGRESS' ? 'bg-slate-950/20 text-slate-950' : 'bg-amber-100 text-amber-900'
          }`}>
            {inProgressSessions.length}
          </span>
        </button>
      </div>

      {/* Sessions List */}
      {isLoading ? (
        <div className="py-24 text-center text-slate-500 font-bold text-sm">
          Đang tải danh sách các phiên luyện tập...
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="card-saas p-16 text-center space-y-4">
          <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500 border border-amber-200">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-slate-900">Chưa có phiên luyện tập nào</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Hãy bắt đầu một phiên luyện tập 15 câu mới để củng cố kiến thức và làm chủ chứng chỉ.
            </p>
          </div>
          <button
            onClick={handleStartNewSession}
            disabled={isCreatingNew}
            className="px-5 py-2.5 bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
          >
            Bắt đầu luyện tập ngay
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredSessions.map((s) => {
            const dateStr = new Date(s.updatedAt || s.createdAt).toLocaleString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={s.id}
                onClick={() => router.push(`/practice/${s.id}?mode=review`)}
                className="card-saas p-5 sm:p-6 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer space-y-3.5 group border border-slate-200/90"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                        {s.title}
                      </h3>
                      {s.isCompleted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                          Hoàn thành
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-800 border border-amber-200">
                          Đang làm ({s.answeredCount}/{s.totalQuestions})
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium flex flex-wrap items-center gap-2">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {dateStr}
                      </span>
                      {s.questionBank?.name && (
                        <span>• {s.questionBank.name}</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    {/* Primary Button: Review Session */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/practice/${s.id}?mode=review`);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-xs transition flex items-center space-x-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Xem lại Review</span>
                    </button>

                    {/* Secondary Button: Re-practice or Continue */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/practice/${s.id}`);
                      }}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center cursor-pointer"
                      title={s.isCompleted ? 'Làm lại phiên này' : 'Tiếp tục làm bài'}
                    >
                      <Play className="w-3 h-3 mr-1 fill-current" />
                      <span>{s.isCompleted ? 'Làm lại' : 'Làm tiếp'}</span>
                    </button>

                    {/* Delete Session Button */}
                    <button
                      onClick={(e) => handleDeleteSession(s.id, e)}
                      disabled={deletingId === s.id}
                      title="Xóa phiên luyện tập này"
                      className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition cursor-pointer disabled:opacity-40"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress & Stats Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-600">
                      Tiến độ: <strong className="text-slate-900">{s.answeredCount}/{s.totalQuestions}</strong> câu
                    </span>
                    <span className="text-slate-700 font-black">
                      {s.answeredCount > 0 ? (
                        <>
                          <span className="text-emerald-700 mr-2">✓ {s.correctCount} đúng</span>
                          <span className="text-rose-600 mr-2">✗ {s.incorrectCount} sai</span>
                          <span className="text-slate-900">({s.accuracyRate}%)</span>
                        </>
                      ) : (
                        'Chưa làm câu nào'
                      )}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/80">
                    <div
                      className={`h-full transition-all duration-300 rounded-full ${
                        s.isCompleted
                          ? s.accuracyRate >= 72
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : 'bg-gradient-to-r from-amber-500 to-amber-400'
                          : 'bg-gradient-to-r from-blue-400 to-blue-500'
                      }`}
                      style={{
                        width: `${s.totalQuestions > 0 ? Math.min(100, Math.round((s.answeredCount / s.totalQuestions) * 100)) : 0}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
