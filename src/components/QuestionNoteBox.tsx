'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Save, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  questionId: string;
  initialNote?: string;
  onSaved?: () => void;
}

export default function QuestionNoteBox({ questionId, initialNote = '', onSaved }: Props) {
  const [content, setContent] = useState(initialNote);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setContent(initialNote);
  }, [initialNote, questionId]);

  const handleSave = async () => {
    if (!content.trim() && !initialNote) return;
    setSaving(true);

    try {
      await fetch(`/api/questions/${questionId}/note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      toast.success('Đã tự động lưu ghi chú cá nhân thành công!');
      if (onSaved) onSaved();
    } catch (e) {
      console.error('Note save error:', e);
      toast.error('Lỗi khi lưu ghi chú');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-2">
      <div className="flex justify-between items-center text-xs font-extrabold text-slate-700">
        <span className="flex items-center">
          <FileText className="w-4 h-4 mr-1.5 text-indigo-500" /> Ghi chú cá nhân (Tự động lưu)
        </span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleSave}
        placeholder="Nhập ghi chú hoặc nhắc nhở riêng cho câu hỏi này..."
        rows={3}
        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none font-medium leading-relaxed"
      />

      <div className="flex justify-end pt-1">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition flex items-center shadow-2xs"
        >
          <Save className="w-3.5 h-3.5 mr-1" />
          {saving ? 'Đang lưu...' : 'Lưu ghi chú'}
        </button>
      </div>
    </div>
  );
}
