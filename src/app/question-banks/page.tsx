'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Award, BookOpen, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function QuestionBanksPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();

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

  const activeBankId = user ? (overview?.activeQuestionBankId || user?.activeQuestionBankId) : null;

  const enrollMutation = useMutation({
    mutationFn: async (bankId: string) => {
      if (!user) {
        router.push('/login');
        return;
      }
      const res = await fetch(`/api/question-banks/${bankId}/enroll`, { method: 'POST' });
      return res.json();
    },
    onSuccess: (data, bankId) => {
      if (user && data) {
        setUser({ ...user, activeQuestionBankId: bankId });
        queryClient.invalidateQueries({ queryKey: ['questionBanksCatalog'] });
        queryClient.invalidateQueries({ queryKey: ['progressOverview'] });
        toast.success('Đã đăng ký và chuyển sang môn học mới!');
        router.push('/questions');
      }
    },
  });

  const switchActiveMutation = useMutation({
    mutationFn: async (bankId: string) => {
      if (!user) {
        router.push('/login');
        return;
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
      router.push('/login');
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

  if (isLoading) {
    return <div className="py-20 text-center text-slate-500 font-semibold text-sm">Đang tải danh sách bộ câu hỏi...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Danh mục Bộ câu hỏi & Chứng chỉ</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Chọn bộ câu hỏi bạn muốn đăng ký học và theo dõi tiến độ luyện tập riêng biệt.
        </p>
      </div>

      {/* Question Banks Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.questionBanks?.map((bank: any) => {
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
                    Đăng ký học ngay
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
