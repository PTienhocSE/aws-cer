'use client';

import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  Download,
  Upload,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  X,
  FileJson,
  Trash2,
  RefreshCw,
  Sparkles,
  Info,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import {
  QuestionAnswerMetadata,
  getAllOfflineAnswers,
  getLocalAnswersForSession,
  downloadMetadataFile,
  parseMetadataJson,
  clearOfflineAnswers,
} from '@/lib/practice-sync';

interface PracticeSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSessionId?: string;
  defaultTab?: 'export' | 'import';
}

export default function PracticeSyncModal({
  isOpen,
  onClose,
  currentSessionId,
  defaultTab = 'export',
}: PracticeSyncModalProps) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState<'export' | 'import'>(defaultTab);
  const [exportScope, setExportScope] = useState<'session' | 'all'>('session');
  const [exportRecords, setExportRecords] = useState<QuestionAnswerMetadata[]>([]);
  const [copied, setCopied] = useState(false);

  // Import State
  const [importJsonText, setImportJsonText] = useState('');
  const [importRecords, setImportRecords] = useState<QuestionAnswerMetadata[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isSubmittingImport, setIsSubmittingImport] = useState(false);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Load export data
  useEffect(() => {
    if (!isOpen) return;

    if (exportScope === 'session' && currentSessionId) {
      const records = getLocalAnswersForSession(currentSessionId);
      setExportRecords(records);
    } else {
      const allRecords = getAllOfflineAnswers();
      setExportRecords(allRecords);
    }
  }, [isOpen, exportScope, currentSessionId]);

  if (!isOpen) return null;

  // Handle Copy to Clipboard
  const handleCopy = () => {
    if (exportRecords.length === 0) {
      toast.error('Không có dữ liệu để sao chép.');
      return;
    }
    const text = JSON.stringify(exportRecords, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Đã sao chép metadata JSON vào clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Download File
  const handleDownload = () => {
    if (exportRecords.length === 0) {
      toast.error('Không có dữ liệu để xuất.');
      return;
    }
    const filename =
      exportScope === 'session' && currentSessionId
        ? `aws-cer-session-${currentSessionId.slice(0, 8)}.json`
        : `aws-cer-offline-all-${new Date().toISOString().slice(0, 10)}.json`;

    downloadMetadataFile(exportRecords, filename);
    toast.success(`Đã tải file ${filename}`);
  };

  // Handle Clear Local Storage
  const handleClear = () => {
    if (
      !window.confirm(
        'Bạn có chắc muốn xoá dữ liệu câu trả lời đã lưu trong trình duyệt này? Hãy chắc chắn bạn đã xuất hoặc nạp vào tài khoản trước.'
      )
    ) {
      return;
    }
    if (exportScope === 'session' && currentSessionId) {
      clearOfflineAnswers(currentSessionId);
      setExportRecords([]);
      toast.success('Đã xóa dữ liệu phiên này khỏi trình duyệt.');
    } else {
      clearOfflineAnswers();
      setExportRecords([]);
      toast.success('Đã xóa toàn bộ dữ liệu offline khỏi trình duyệt.');
    }
  };

  // Handle File Upload for Import
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setImportJsonText(content);
      try {
        const parsed = parseMetadataJson(content);
        setImportRecords(parsed);
        setParseError(null);
        toast.success(`Đã đọc ${parsed.length} câu hỏi từ file!`);
      } catch (err: any) {
        setParseError(err.message || 'Lỗi định dạng file JSON.');
        setImportRecords([]);
      }
    };
    reader.readAsText(file);
  };

  // Handle Textarea Change for Import
  const handleJsonTextChange = (text: string) => {
    setImportJsonText(text);
    if (!text.trim()) {
      setImportRecords([]);
      setParseError(null);
      return;
    }
    try {
      const parsed = parseMetadataJson(text);
      setImportRecords(parsed);
      setParseError(null);
    } catch (err: any) {
      setParseError(err.message || 'Cú pháp JSON không hợp lệ.');
      setImportRecords([]);
    }
  };

  // Submit Import to API
  const handleImportSubmit = async () => {
    if (!user) {
      toast.error('Vui lòng đăng nhập tài khoản trước khi nạp metadata.');
      return;
    }

    if (importRecords.length === 0) {
      toast.error('Không có dữ liệu hợp lệ để nạp.');
      return;
    }

    try {
      setIsSubmittingImport(true);
      const res = await fetch('/api/practice-sessions/import-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(importRecords),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Nạp metadata thất bại.');
      }

      toast.success(data.message || 'Đã nạp thành công vào tài khoản!');
      queryClient.invalidateQueries({ queryKey: ['practiceSessionsList'] });
      queryClient.invalidateQueries({ queryKey: ['progressOverview'] });
      queryClient.invalidateQueries({ queryKey: ['questions'] });

      // Reset form
      setImportJsonText('');
      setImportRecords([]);
      onClose();
    } catch (err: any) {
      toast.error(err.message || 'Lỗi trong quá trình nạp dữ liệu.');
    } finally {
      setIsSubmittingImport(false);
    }
  };

  const correctExportCount = exportRecords.filter((r) => r.isCorrect).length;
  const incorrectExportCount = exportRecords.length - correctExportCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                Đồng bộ dữ liệu học tập Offline
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Xuất/Nhập metadata khi làm ở máy công ty hoặc trình duyệt không đăng nhập
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 px-5 pt-3 bg-white">
          <button
            onClick={() => setActiveTab('export')}
            className={`pb-3 px-4 font-black text-xs sm:text-sm border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'export'
                ? 'border-amber-500 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>1. Xuất Metadata (Ở máy công ty)</span>
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-3 px-4 font-black text-xs sm:text-sm border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'import'
                ? 'border-amber-500 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>2. Nạp vào tài khoản (Máy cá nhân)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              {/* Scope Selector */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-xs font-black text-slate-700">Phạm vi xuất:</span>
                <div className="flex items-center gap-2">
                  {currentSessionId && (
                    <button
                      onClick={() => setExportScope('session')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        exportScope === 'session'
                          ? 'bg-amber-400 text-slate-950 shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Phiên hiện tại
                    </button>
                  )}
                  <button
                    onClick={() => setExportScope('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      exportScope === 'all'
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Tất cả câu đã làm trên trình duyệt này
                  </button>
                </div>
              </div>

              {/* Stats Badge */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                  <div className="text-[11px] font-bold text-slate-500">Tổng câu hỏi</div>
                  <div className="text-lg font-black text-slate-900">{exportRecords.length}</div>
                </div>
                <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 text-center">
                  <div className="text-[11px] font-bold text-emerald-700">Câu đúng</div>
                  <div className="text-lg font-black text-emerald-800">{correctExportCount}</div>
                </div>
                <div className="bg-rose-50 p-3 rounded-2xl border border-rose-100 text-center">
                  <div className="text-[11px] font-bold text-rose-700">Câu sai</div>
                  <div className="text-lg font-black text-rose-800">{incorrectExportCount}</div>
                </div>
              </div>

              {/* Note callout */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start space-x-2.5 text-xs text-amber-900">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  Metadata chỉ chứa thông tin tinh gọn: <b>ID câu hỏi</b>, <b>đúng/sai</b>, <b>đáp án đã chọn</b>, <b>đáp án đúng</b> và <b>session</b>.
                  Khi nạp vào tài khoản, nếu trùng câu đã từng làm trước đây hệ thống vẫn ghi nhận lần làm này vào lịch sử và thuật toán SRS.
                </p>
              </div>

              {/* JSON Preview */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                    <FileJson className="w-3.5 h-3.5 text-slate-500" />
                    <span>Xem trước dữ liệu JSON ({exportRecords.length} bản ghi):</span>
                  </label>
                  {exportRecords.length > 0 && (
                    <button
                      onClick={handleClear}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Xoá cache offline
                    </button>
                  )}
                </div>
                <pre className="p-3.5 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-2xl max-h-44 overflow-y-auto leading-relaxed">
                  {exportRecords.length > 0
                    ? JSON.stringify(exportRecords.slice(0, 3), null, 2) +
                      (exportRecords.length > 3 ? `\n... và ${exportRecords.length - 3} câu hỏi khác` : '')
                    : '// Chưa có dữ liệu câu trả lời nào được lưu trên trình duyệt này'}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleDownload}
                  disabled={exportRecords.length === 0}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải file JSON về máy</span>
                </button>

                <button
                  onClick={handleCopy}
                  disabled={exportRecords.length === 0}
                  className="py-3 px-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-extrabold text-xs sm:text-sm rounded-xl transition flex items-center gap-2 disabled:opacity-40 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                  <span>{copied ? 'Đã sao chép!' : 'Sao chép JSON'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* User login alert */}
              {!user && (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-center space-x-2 text-xs text-amber-900 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Bạn chưa đăng nhập. Vui lòng đăng nhập tài khoản để nạp tiến độ này vào hệ thống.</span>
                </div>
              )}

              {/* File Upload Zone */}
              <div className="p-5 border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-2xl bg-slate-50/50 text-center space-y-2 transition">
                <Upload className="w-8 h-8 text-amber-500 mx-auto" />
                <div className="text-xs font-bold text-slate-700">
                  Chọn file JSON đã xuất từ laptop công ty
                </div>
                <p className="text-[11px] text-slate-400">Hỗ trợ file .json được xuất từ trang này</p>
                <label className="inline-block px-4 py-2 bg-white border border-slate-200 hover:border-amber-400 text-slate-800 text-xs font-black rounded-xl shadow-2xs transition cursor-pointer">
                  Chọn file .json
                  <input
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Or Paste JSON Text */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-black text-slate-700">
                  <span>Hoặc dán nội dung JSON vào đây:</span>
                  {importRecords.length > 0 && (
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold text-[11px]">
                      Hợp lệ: {importRecords.length} câu hỏi
                    </span>
                  )}
                </div>
                <textarea
                  value={importJsonText}
                  onChange={(e) => handleJsonTextChange(e.target.value)}
                  rows={5}
                  placeholder='Dán nội dung JSON vào đây, ví dụ: [{"questionId": "...", "isCorrect": true, ...}]'
                  className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                {parseError && (
                  <p className="text-xs font-bold text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {parseError}
                  </p>
                )}
              </div>

              {/* Import Preview */}
              {importRecords.length > 0 && (
                <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Sẵn sàng nạp {importRecords.length} câu ({importRecords.filter((r) => r.isCorrect).length} đúng,{' '}
                      {importRecords.filter((r) => !r.isCorrect).length} sai)
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-extrabold uppercase">
                    Trùng câu vẫn tính
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleImportSubmit}
                disabled={!user || importRecords.length === 0 || isSubmittingImport}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmittingImport ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Đang nạp vào tài khoản...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Xác nhận nạp {importRecords.length} câu vào tài khoản</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
