'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import {
  AlertTriangle,
  RotateCcw,
  Trash2,
  X,
  CheckSquare,
  Square,
  Sparkles,
  HelpCircle,
  Database,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { clearAllLearningCache } from '@/lib/practice-sync';

interface ResetProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBankId?: string | null;
  currentBankName?: string | null;
  onSuccess?: () => void;
}

export default function ResetProgressModal({
  isOpen,
  onClose,
  currentBankId,
  currentBankName,
  onSuccess,
}: ResetProgressModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scope, setScope] = useState<'current' | 'all'>('current');
  const [clearSessions, setClearSessions] = useState(true);
  const [clearExams, setClearExams] = useState(true);
  const [clearCache, setClearCache] = useState(true);
  const [clearNotesAndBookmarks, setClearNotesAndBookmarks] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch available question banks to show their names if user selects
  const { data: banksData } = useQuery({
    queryKey: ['landingQuestionBanks'],
    queryFn: async () => {
      const res = await fetch('/api/question-banks');
      if (!res.ok) return { questionBanks: [] };
      return res.json();
    },
    enabled: isOpen,
  });

  const activeBank = (banksData?.questionBanks || []).find(
    (b: any) => b.id === currentBankId
  );
  const bankDisplayName =
    currentBankName || activeBank?.name || 'Bộ đề chứng chỉ đang học';

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!mounted || !isOpen) return null;

  const handleConfirmReset = async () => {
    try {
      setIsSubmitting(true);

      const targetBankId = scope === 'current' ? currentBankId : 'all';

      // 1. Call server API to reset database records
      const res = await fetch('/api/progress/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-mode': '1',
        },
        credentials: 'include',
        body: JSON.stringify({
          questionBankId: targetBankId,
          clearSessions,
          clearExams,
          clearNotesAndBookmarks,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Lỗi khi xóa lịch sử làm bài');
      }

      // 2. Clear client-side LocalStorage learning cache
      if (clearCache) {
        clearAllLearningCache();
      }

      // 3. Invalidate & refetch all related TanStack query caches
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['progressOverview'] }),
        queryClient.invalidateQueries({ queryKey: ['progressDomains'] }),
        queryClient.invalidateQueries({ queryKey: ['reviewQuestions'] }),
        queryClient.invalidateQueries({ queryKey: ['questions'] }),
        queryClient.invalidateQueries({ queryKey: ['reviewPracticeSessions'] }),
        queryClient.invalidateQueries({ queryKey: ['reviewMockExams'] }),
        queryClient.invalidateQueries({ queryKey: ['practiceQuestions'] }),
        queryClient.invalidateQueries({ queryKey: ['notes'] }),
        queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
        queryClient.invalidateQueries({ queryKey: ['highlights'] }),
      ]);

      toast.success(
        'Đã xóa cache & khôi phục bộ câu hỏi về trạng thái ban đầu thành công!'
      );

      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Không thể khôi phục bộ câu hỏi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
      className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-rose-50/60 border-b border-rose-100 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200 shadow-2xs">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                Xóa cache & Khôi phục bộ câu hỏi
              </h2>
              <p className="text-xs text-rose-700 font-medium mt-0.5">
                Đặt lại toàn bộ câu hỏi về trạng thái Chưa làm để ôn luyện từ đầu
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition cursor-pointer shrink-0 disabled:opacity-50"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs text-slate-600">
          {/* Scope Selector */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Phạm vi khôi phục</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setScope('current')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1 ${
                  scope === 'current'
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/30 font-bold text-slate-900'
                    : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="font-extrabold text-xs text-amber-900">
                  Bộ đề hiện tại
                </span>
                <span className="text-[11px] text-slate-500 truncate">
                  {bankDisplayName}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setScope('all')}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1 ${
                  scope === 'all'
                    ? 'bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/30 font-bold text-slate-900'
                    : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="font-extrabold text-xs text-amber-900">
                  Toàn bộ môn học
                </span>
                <span className="text-[11px] text-slate-500">
                  Tất cả các bộ đề đã học
                </span>
              </button>
            </div>
          </div>

          {/* Options Checklist */}
          <div className="space-y-2.5 pt-1">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-blue-500" />
              <span>Dữ liệu sẽ được xóa & làm mới:</span>
            </label>

            <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
              {/* Question progress */}
              <div className="flex items-start gap-2.5">
                <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">
                    Lịch sử trả lời câu hỏi (Bắt buộc)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Chuyển toàn bộ câu đúng / sai về trạng thái ban đầu (Chưa làm, tiến độ 0%).
                  </div>
                </div>
              </div>

              {/* Practice sessions */}
              <label
                onClick={() => setClearSessions(!clearSessions)}
                className="flex items-start gap-2.5 cursor-pointer select-none pt-2 border-t border-slate-200/60"
              >
                {clearSessions ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-slate-900">
                    Xóa lịch sử các phiên luyện tập
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Dọn sạch danh sách các phiên ôn tập 15 câu đã tạo.
                  </div>
                </div>
              </label>

              {/* Mock exams */}
              <label
                onClick={() => setClearExams(!clearExams)}
                className="flex items-start gap-2.5 cursor-pointer select-none pt-2 border-t border-slate-200/60"
              >
                {clearExams ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-slate-900">
                    Xóa lịch sử các bài thi thử (Mock Exams)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Dọn sạch các bài thi 65 câu và bảng điểm đã làm.
                  </div>
                </div>
              </label>

              {/* LocalStorage Cache */}
              <label
                onClick={() => setClearCache(!clearCache)}
                className="flex items-start gap-2.5 cursor-pointer select-none pt-2 border-t border-slate-200/60"
              >
                {clearCache ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-slate-900">
                    Xóa bộ nhớ đệm trình duyệt &amp; LocalStorage
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Dọn sạch các câu trả lời offline lưu tạm ở máy tính hiện tại.
                  </div>
                </div>
              </label>

              {/* Notes & bookmarks (default false) */}
              <label
                onClick={() => setClearNotesAndBookmarks(!clearNotesAndBookmarks)}
                className="flex items-start gap-2.5 cursor-pointer select-none pt-2 border-t border-slate-200/60"
              >
                {clearNotesAndBookmarks ? (
                  <CheckSquare className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-slate-900">
                    Xóa cả Bookmark, Highlight và Ghi chú cá nhân
                  </div>
                  <div className="text-[11px] text-slate-400">
                    (Không khuyến khích nếu bạn muốn giữ lại các mẹo ghi chú quan trọng).
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
            <div className="text-[11px] leading-relaxed">
              <b>Lưu ý quan trọng:</b> Thao tác này sẽ đặt lại hoàn toàn tiến độ về câu số 1 như lúc bạn mới mở tài khoản. Dữ liệu sau khi xóa <b>không thể hoàn tác</b>.
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer disabled:opacity-50"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            onClick={handleConfirmReset}
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md shadow-rose-600/25 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Đang xóa &amp; khôi phục...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xác nhận xóa &amp; Bắt đầu lại</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
