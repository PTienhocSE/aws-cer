'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  FileSpreadsheet,
  Filter,
  HelpCircle,
  Info,
  Layers,
  LayoutList,
  Lightbulb,
  Play,
  RotateCcw,
  Search,
  Shuffle,
  SlidersHorizontal,
  Sparkles,
  Tag,
  Target,
  Trophy,
  X,
  XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { CHEATSHEET_CATEGORIES } from '@/lib/cheatSheetData';
import {
  ALL_CHEATSHEET_FLASHCARDS,
  ALL_SERVICE_TAGS,
  CheatSheetFlashcard,
  CheatSheetQuizQuestion,
  FLASHCARD_TYPE_LABELS,
  FlashcardType,
  generateCheatSheetQuizQuestions,
} from '@/lib/cheatSheetFlashcards';

const MASTERED_STORAGE_KEY = 'aws_cer_cheatsheet_flashcard_mastered_v1';
const REVIEW_STORAGE_KEY = 'aws_cer_cheatsheet_flashcard_review_v1';
const QUIZ_BEST_STORAGE_KEY = 'aws_cer_cheatsheet_quiz_best_v1';

const CARD_TYPE_STYLES: Record<FlashcardType, { bg: string; text: string; border: string }> = {
  purpose: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
  },
  when_to_use: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  distinguish: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
  },
  exam_tip: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
  },
  quick_pick: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
};

function renderFormattedCheatSheetText(text: string) {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <div className="space-y-2 text-left">
      {lines.map((line, idx) => {
        if (line.startsWith('Chọn khi:')) {
          const body = line.replace('Chọn khi:', '').trim();
          return (
            <div
              key={idx}
              className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/90 border border-emerald-200 text-xs sm:text-sm text-slate-800"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-extrabold text-emerald-800 mr-1">Chọn khi:</span>
                <span>{body}</span>
              </div>
            </div>
          );
        }

        if (line.startsWith('KHÔNG chọn khi:')) {
          const body = line.replace('KHÔNG chọn khi:', '').trim();
          return (
            <div
              key={idx}
              className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-50/90 border border-rose-200 text-xs sm:text-sm text-slate-800"
            >
              <XCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-extrabold text-rose-800 mr-1">KHÔNG chọn khi:</span>
                <span>{body}</span>
              </div>
            </div>
          );
        }

        if (line.startsWith('Phân biệt:')) {
          const body = line.replace('Phân biệt:', '').trim();
          return (
            <div
              key={idx}
              className="flex items-start gap-2 p-2.5 rounded-xl bg-indigo-50/90 border border-indigo-200 text-xs sm:text-sm text-slate-800"
            >
              <Info className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-extrabold text-indigo-800 mr-1">Phân biệt:</span>
                <span>{body}</span>
              </div>
            </div>
          );
        }

        if (line.includes('=>')) {
          const parts = line
            .split('=>')
            .map((p) => p.trim())
            .filter(Boolean);
          return (
            <div
              key={idx}
              className="flex items-center flex-wrap gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200"
            >
              {parts.map((p, pIdx) => (
                <React.Fragment key={pIdx}>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs sm:text-sm ${
                      pIdx === 0
                        ? 'bg-slate-900 text-white font-bold'
                        : pIdx === parts.length - 1
                        ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                        : 'bg-white text-slate-700 font-semibold border border-slate-200'
                    }`}
                  >
                    {p}
                  </span>
                  {pIdx < parts.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          );
        }

        return (
          <div
            key={idx}
            className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 leading-relaxed"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
            <span>{line}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function CheatSheetFlashcardsClient() {
  // Primary Mode: 'study' (Flashcard learning) vs 'quiz' (Test knowledge)
  const [appMode, setAppMode] = useState<'study' | 'quiz'>('study');

  // Shared Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedServiceTag, setSelectedServiceTag] = useState<string>('all');
  const [selectedCardType, setSelectedCardType] = useState<FlashcardType | 'ALL'>('ALL');
  const [serviceSearch, setServiceSearch] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Study Mode States
  const [studyStatusFilter, setStudyStatusFilter] = useState<'all' | 'unmastered' | 'mastered' | 'review'>('all');
  const [studyLayout, setStudyLayout] = useState<'card' | 'list'>('card');
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [shuffledOrder, setShuffledOrder] = useState<string[] | null>(null);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [reviewIds, setReviewIds] = useState<string[]>([]);

  // Quiz Mode States
  const [quizLimit, setQuizLimit] = useState<number>(20);
  const [quizInstantFeedback, setQuizInstantFeedback] = useState<boolean>(true);
  const [quizQuestions, setQuizQuestions] = useState<CheatSheetQuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizRevealed, setQuizRevealed] = useState<Record<string, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [bestScorePct, setBestScorePct] = useState<number | null>(null);

  // Touch swipe tracking for mobile flashcards
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Load persisted progress from localStorage
  useEffect(() => {
    try {
      const m = localStorage.getItem(MASTERED_STORAGE_KEY);
      if (m) setMasteredIds(JSON.parse(m));
      const r = localStorage.getItem(REVIEW_STORAGE_KEY);
      if (r) setReviewIds(JSON.parse(r));
      const b = localStorage.getItem(QUIZ_BEST_STORAGE_KEY);
      if (b) {
        const parsed = parseInt(b, 10);
        if (!isNaN(parsed)) setBestScorePct(parsed);
      }
    } catch {}
  }, []);

  const persistMastered = useCallback((next: string[]) => {
    setMasteredIds(next);
    try {
      localStorage.setItem(MASTERED_STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const persistReview = useCallback((next: string[]) => {
    setReviewIds(next);
    try {
      localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  // Available service tags filtered by selected category & serviceSearch
  const availableServiceTags = useMemo(() => {
    let tags = ALL_SERVICE_TAGS;
    if (selectedCategory !== 'all') {
      tags = tags.filter((t) => t.categoryId === selectedCategory);
    }
    const q = serviceSearch.trim().toLowerCase();
    if (q) {
      tags = tags.filter(
        (t) =>
          t.serviceTag.toLowerCase().includes(q) ||
          t.categoryTitle.toLowerCase().includes(q)
      );
    }
    return tags;
  }, [selectedCategory, serviceSearch]);

  // Filtered Flashcards for Study Mode
  const filteredCards = useMemo(() => {
    let cards = ALL_CHEATSHEET_FLASHCARDS;

    if (selectedCategory !== 'all') {
      cards = cards.filter((c) => c.categoryId === selectedCategory);
    }
    if (selectedServiceTag !== 'all') {
      cards = cards.filter((c) => c.serviceTag === selectedServiceTag);
    }
    if (selectedCardType !== 'ALL') {
      cards = cards.filter((c) => c.cardType === selectedCardType);
    }
    if (serviceSearch.trim() && selectedServiceTag === 'all') {
      const q = serviceSearch.trim().toLowerCase();
      cards = cards.filter(
        (c) =>
          c.serviceTag.toLowerCase().includes(q) ||
          c.front.toLowerCase().includes(q) ||
          c.back.toLowerCase().includes(q)
      );
    }

    if (studyStatusFilter === 'mastered') {
      cards = cards.filter((c) => masteredIds.includes(c.id));
    } else if (studyStatusFilter === 'unmastered') {
      cards = cards.filter((c) => !masteredIds.includes(c.id));
    } else if (studyStatusFilter === 'review') {
      cards = cards.filter((c) => reviewIds.includes(c.id));
    }

    if (shuffledOrder) {
      const orderMap = new Map<string, number>();
      shuffledOrder.forEach((id, idx) => orderMap.set(id, idx));
      cards = [...cards].sort((a, b) => (orderMap.get(a.id) ?? 999999) - (orderMap.get(b.id) ?? 999999));
    }

    return cards;
  }, [
    selectedCategory,
    selectedServiceTag,
    selectedCardType,
    serviceSearch,
    studyStatusFilter,
    masteredIds,
    reviewIds,
    shuffledOrder,
  ]);

  // Clamp cardIndex when filtered list shrinks
  useEffect(() => {
    if (cardIndex >= filteredCards.length) {
      setCardIndex(Math.max(0, filteredCards.length - 1));
    }
    setIsFlipped(false);
  }, [filteredCards.length, selectedCategory, selectedServiceTag, selectedCardType, studyStatusFilter]);

  const currentCard: CheatSheetFlashcard | undefined = filteredCards[cardIndex];

  // Generate fresh quiz when entering quiz mode or changing quiz parameters
  const startNewQuiz = useCallback(
    (customQuestions?: CheatSheetQuizQuestion[]) => {
      const next =
        customQuestions ||
        generateCheatSheetQuizQuestions({
          categoryId: selectedCategory,
          serviceTag: selectedServiceTag,
          cardType: selectedCardType,
          limit: quizLimit,
        });
      setQuizQuestions(next);
      setQuizIndex(0);
      setQuizAnswers({});
      setQuizRevealed({});
      setQuizCompleted(false);
    },
    [selectedCategory, selectedServiceTag, selectedCardType, quizLimit]
  );

  useEffect(() => {
    if (appMode === 'quiz') {
      startNewQuiz();
    }
  }, [appMode, selectedCategory, selectedServiceTag, selectedCardType, quizLimit]);

  // Study Actions
  const handleNextCard = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCardIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  }, [filteredCards.length]);

  const handlePrevCard = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCardIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  }, [filteredCards.length]);

  const handleMarkMastered = useCallback(
    (cardId: string) => {
      const nextMastered = masteredIds.includes(cardId)
        ? masteredIds
        : [...masteredIds, cardId];
      persistMastered(nextMastered);
      if (reviewIds.includes(cardId)) {
        persistReview(reviewIds.filter((id) => id !== cardId));
      }
      if (studyStatusFilter !== 'unmastered' && cardIndex < filteredCards.length - 1) {
        setIsFlipped(false);
        setCardIndex((prev) => prev + 1);
      } else {
        setIsFlipped(false);
      }
    },
    [masteredIds, reviewIds, persistMastered, persistReview, studyStatusFilter, cardIndex, filteredCards.length]
  );

  const handleMarkReview = useCallback(
    (cardId: string) => {
      const nextReview = reviewIds.includes(cardId) ? reviewIds : [...reviewIds, cardId];
      persistReview(nextReview);
      if (masteredIds.includes(cardId)) {
        persistMastered(masteredIds.filter((id) => id !== cardId));
      }
      if (cardIndex < filteredCards.length - 1) {
        setIsFlipped(false);
        setCardIndex((prev) => prev + 1);
      } else {
        setIsFlipped(false);
      }
    },
    [reviewIds, masteredIds, persistReview, persistMastered, cardIndex, filteredCards.length]
  );

  const handleShuffleCards = () => {
    const ids = ALL_CHEATSHEET_FLASHCARDS.map((c) => c.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setShuffledOrder(ids);
    setCardIndex(0);
    setIsFlipped(false);
    toast.success('Đã xáo trộn thứ tự thẻ học!');
  };

  const handleResetStudyProgress = () => {
    if (!confirm('Xóa trạng thái Đã thuộc / Cần ôn của toàn bộ bộ thẻ Flashcard?')) return;
    persistMastered([]);
    persistReview([]);
    setShuffledOrder(null);
    setCardIndex(0);
    setIsFlipped(false);
    toast.success('Đã đặt lại tiến độ học Flashcard!');
  };

  // Quiz Actions
  const currentQuizQ = quizQuestions[quizIndex];
  const currentSelectedOpt = currentQuizQ ? quizAnswers[currentQuizQ.id] : undefined;
  const isCurrentQuizRevealed = currentQuizQ
    ? quizCompleted || (quizInstantFeedback && !!quizRevealed[currentQuizQ.id])
    : false;

  const handleSelectQuizOption = useCallback(
    (questionId: string, optionIdx: number) => {
      if (quizCompleted) return;
      if (quizInstantFeedback && quizRevealed[questionId]) return;

      setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
      if (quizInstantFeedback) {
        setQuizRevealed((prev) => ({ ...prev, [questionId]: true }));
      }
    },
    [quizCompleted, quizInstantFeedback, quizRevealed]
  );

  const handleFinishQuiz = useCallback(() => {
    setQuizCompleted(true);
    const total = quizQuestions.length;
    if (total > 0) {
      const correct = quizQuestions.filter((q) => quizAnswers[q.id] === q.correctIndex).length;
      const pct = Math.round((correct / total) * 100);
      if (bestScorePct === null || pct > bestScorePct) {
        setBestScorePct(pct);
        try {
          localStorage.setItem(QUIZ_BEST_STORAGE_KEY, String(pct));
        } catch {}
      }
    }
  }, [quizQuestions, quizAnswers, bestScorePct]);

  // Keyboard shortcuts for Desktop (Study & Quiz)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable)) {
        return;
      }

      if (appMode === 'study' && studyLayout === 'card' && currentCard) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          setIsFlipped((f) => !f);
          return;
        }
        if (e.key === 'ArrowRight') {
          handleNextCard();
          return;
        }
        if (e.key === 'ArrowLeft') {
          handlePrevCard();
          return;
        }
        if (e.key === '1') {
          handleMarkReview(currentCard.id);
          return;
        }
        if (e.key === '2') {
          handleMarkMastered(currentCard.id);
          return;
        }
      }

      if (appMode === 'quiz' && !quizCompleted && currentQuizQ) {
        const key = e.key.toLowerCase();
        const optionKeys = ['a', 'b', 'c', 'd'];
        const optIdx = optionKeys.indexOf(key);
        if (optIdx !== -1 && optIdx < currentQuizQ.options.length) {
          handleSelectQuizOption(currentQuizQ.id, optIdx);
          return;
        }
        if (e.key === 'ArrowRight') {
          if (quizIndex < quizQuestions.length - 1) setQuizIndex((i) => i + 1);
          return;
        }
        if (e.key === 'ArrowLeft') {
          if (quizIndex > 0) setQuizIndex((i) => i - 1);
          return;
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          if (quizIndex < quizQuestions.length - 1) {
            setQuizIndex((i) => i + 1);
          } else {
            handleFinishQuiz();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    appMode,
    studyLayout,
    currentCard,
    handleNextCard,
    handlePrevCard,
    handleMarkMastered,
    handleMarkReview,
    quizCompleted,
    currentQuizQ,
    quizIndex,
    quizQuestions.length,
    handleSelectQuizOption,
    handleFinishQuiz,
  ]);

  // Stats for active scope
  const scopeStats = useMemo(() => {
    let cards = ALL_CHEATSHEET_FLASHCARDS;
    if (selectedCategory !== 'all') {
      cards = cards.filter((c) => c.categoryId === selectedCategory);
    }
    if (selectedServiceTag !== 'all') {
      cards = cards.filter((c) => c.serviceTag === selectedServiceTag);
    }
    const masteredInScope = cards.filter((c) => masteredIds.includes(c.id)).length;
    const reviewInScope = cards.filter((c) => reviewIds.includes(c.id)).length;
    return {
      total: cards.length,
      mastered: masteredInScope,
      review: reviewInScope,
      pct: cards.length > 0 ? Math.round((masteredInScope / cards.length) * 100) : 0,
    };
  }, [selectedCategory, selectedServiceTag, masteredIds, reviewIds]);

  const quizScoreStats = useMemo(() => {
    const answered = Object.keys(quizAnswers).length;
    const correct = quizQuestions.filter((q) => quizAnswers[q.id] === q.correctIndex).length;
    const wrongQuestions = quizQuestions.filter(
      (q) => quizAnswers[q.id] !== undefined && quizAnswers[q.id] !== q.correctIndex
    );
    return {
      total: quizQuestions.length,
      answered,
      correct,
      wrongCount: answered - correct,
      wrongQuestions,
      pct: quizQuestions.length > 0 ? Math.round((correct / quizQuestions.length) * 100) : 0,
    };
  }, [quizQuestions, quizAnswers]);

  const scrollCategoryStrip = (dir: 'left' | 'right') => {
    categoryScrollRef.current?.scrollBy({
      left: dir === 'left' ? -220 : 220,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Compact Responsive Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white pt-5 pb-6 px-3 sm:px-6 lg:px-8 border-b border-slate-700">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Top Breadcrumb + Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center flex-wrap gap-2">
                <Link
                  href="/cheat-seat-saa"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Bảng Cheat Sheet</span>
                </Link>
                <span className="text-[11px] font-bold text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                  {ALL_CHEATSHEET_FLASHCARDS.length} thẻ • {ALL_SERVICE_TAGS.length} service tags
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight flex items-center gap-2.5 pt-1">
                <Layers className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 shrink-0" />
                <span>Flashcard &amp; Test Kiến Thức Cheat Sheet SAA-C03</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Toàn bộ nội dung giữ nguyên 100% từ Cheat Sheet chuẩn SAA-C03. Mỗi service được tách thành nhiều thẻ gắn tag riêng để học nhanh và test lại ngay trên điện thoại.
              </p>
            </div>

            {/* Primary Mode Segmented Control */}
            <div className="grid grid-cols-2 sm:inline-flex bg-slate-950/80 p-1 rounded-2xl border border-slate-700 shrink-0">
              <button
                type="button"
                onClick={() => setAppMode('study')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                  appMode === 'study'
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Học Flashcard</span>
              </button>
              <button
                type="button"
                onClick={() => setAppMode('quiz')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                  appMode === 'quiz'
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Target className="w-4 h-4 shrink-0" />
                <span>Test Kiến Thức</span>
              </button>
            </div>
          </div>

          {/* Mini Progress Strip */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-between sm:justify-start gap-2">
              <span className="text-slate-300">Đang lọc:</span>
              <span className="font-black text-amber-400">{scopeStats.total} thẻ</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-between sm:justify-start gap-2">
              <span className="text-slate-300">Đã thuộc:</span>
              <span className="font-black text-emerald-400">
                {scopeStats.mastered} ({scopeStats.pct}%)
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-between sm:justify-start gap-2">
              <span className="text-slate-300">Cần ôn:</span>
              <span className="font-black text-rose-400">{scopeStats.review}</span>
            </div>
            {bestScorePct !== null && (
              <div className="hidden sm:flex bg-white/5 border border-white/10 rounded-xl px-3 py-2 items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-300">Điểm Test cao nhất:</span>
                <span className="font-black text-white">{bestScorePct}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6 space-y-4 sm:space-y-5">
        {/* Category Tabs Strip (Horizontal Swipeable on Mobile) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 sm:p-3 shadow-xs space-y-2.5">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollCategoryStrip('left')}
              className="hidden sm:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 shrink-0 cursor-pointer"
              aria-label="Cuộn trái"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              ref={categoryScrollRef}
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 flex-1"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedServiceTag('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tất cả (16)
              </button>

              {CHEATSHEET_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedServiceTag('all');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollCategoryStrip('right')}
              className="hidden sm:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 shrink-0 cursor-pointer"
              aria-label="Cuộn phải"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Filter Summary + Toggle Button */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 md:hidden">
            <div className="flex items-center gap-1.5 min-w-0 text-xs">
              <Tag className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="font-bold text-slate-700 truncate">
                {selectedServiceTag === 'all' ? 'Tất cả Services' : selectedServiceTag}
              </span>
              {selectedCardType !== 'ALL' && (
                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold shrink-0">
                  {FLASHCARD_TYPE_LABELS[selectedCardType]}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowMobileFilters((v) => !v)}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showMobileFilters ? 'Thu gọn lọc' : 'Lọc Service / Thẻ'}</span>
            </button>
          </div>

          {/* Detailed Filters (Always visible on md+, collapsible on mobile) */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block space-y-2.5 pt-1 md:pt-2 md:border-t md:border-slate-100`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
              {/* Search Service / Content */}
              <div className="relative md:col-span-4">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  placeholder="Tìm nhanh service tag (EC2, S3, Lambda...)"
                  className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />
                {serviceSearch && (
                  <button
                    type="button"
                    onClick={() => setServiceSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Service Tag Select Dropdown */}
              <div className="md:col-span-4">
                <select
                  value={selectedServiceTag}
                  onChange={(e) => setSelectedServiceTag(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">
                    Tất cả Service Tag ({availableServiceTags.length} service)
                  </option>
                  {availableServiceTags.map((st) => (
                    <option key={`${st.categoryId}-${st.serviceTag}`} value={st.serviceTag}>
                      {st.serviceTag} ({st.cardCount} thẻ)
                    </option>
                  ))}
                </select>
              </div>

              {/* Card Type Select */}
              <div className="md:col-span-4 flex items-center gap-2">
                <select
                  value={selectedCardType}
                  onChange={(e) => setSelectedCardType(e.target.value as FlashcardType | 'ALL')}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                >
                  <option value="ALL">Tất cả loại thẻ</option>
                  <option value="purpose">Mục đích</option>
                  <option value="when_to_use">Khi nào chọn</option>
                  <option value="distinguish">Phân biệt &amp; Tránh nhầm</option>
                  <option value="exam_tip">Mẹo thi &amp; Ghi nhớ</option>
                  <option value="quick_pick">Chọn nhanh Keyword</option>
                </select>

                {(selectedCategory !== 'all' ||
                  selectedServiceTag !== 'all' ||
                  selectedCardType !== 'ALL' ||
                  serviceSearch) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedServiceTag('all');
                      setSelectedCardType('ALL');
                      setServiceSearch('');
                    }}
                    className="px-2.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold shrink-0 cursor-pointer"
                    title="Xóa bộ lọc"
                  >
                    Xóa lọc
                  </button>
                )}
              </div>
            </div>

            {/* Quick Service Tag Pills when category or search narrows down to <= 35 tags */}
            {(selectedCategory !== 'all' || serviceSearch.trim().length > 0) &&
              availableServiceTags.length > 0 &&
              availableServiceTags.length <= 35 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                    <Tag className="w-3 h-3 text-amber-500" />
                    Service:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedServiceTag('all')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap shrink-0 border transition cursor-pointer ${
                      selectedServiceTag === 'all'
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Tất cả
                  </button>
                  {availableServiceTags.map((st) => (
                    <button
                      key={`${st.categoryId}-${st.serviceTag}`}
                      type="button"
                      onClick={() =>
                        setSelectedServiceTag(
                          selectedServiceTag === st.serviceTag ? 'all' : st.serviceTag
                        )
                      }
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap shrink-0 border transition cursor-pointer ${
                        selectedServiceTag === st.serviceTag
                          ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                      }`}
                    >
                      {st.serviceTag}{' '}
                      <span className="opacity-70 font-semibold">({st.cardCount})</span>
                    </button>
                  ))}
                </div>
              )}
          </div>
        </div>

        {/* ============================================================ */}
        {/* STUDY MODE: FLASHCARD DECK                                   */}
        {/* ============================================================ */}
        {appMode === 'study' && (
          <div className="space-y-4">
            {/* Study Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
              {/* Status filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {[
                  { key: 'all', label: 'Tất cả' },
                  { key: 'unmastered', label: 'Chưa thuộc' },
                  { key: 'review', label: `Cần ôn (${scopeStats.review})` },
                  { key: 'mastered', label: `Đã thuộc (${scopeStats.mastered})` },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setStudyStatusFilter(tab.key as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 transition cursor-pointer ${
                      studyStatusFilter === tab.key
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Layout & Tools */}
              <div className="flex items-center gap-1.5 ml-auto">
                <button
                  type="button"
                  onClick={() => setStudyLayout(studyLayout === 'card' ? 'list' : 'card')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1.5 cursor-pointer"
                  title="Chuyển giữa chế độ Lật thẻ và Danh sách"
                >
                  {studyLayout === 'card' ? (
                    <>
                      <LayoutList className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Xem dạng danh sách</span>
                      <span className="sm:hidden">Danh sách</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Chế độ thẻ lật</span>
                      <span className="sm:hidden">Thẻ lật</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleShuffleCards}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1 cursor-pointer"
                  title="Xáo trộn thẻ"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Xáo trộn</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetStudyProgress}
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1 cursor-pointer"
                  title="Đặt lại tiến độ thuộc bài"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Làm lại</span>
                </button>
              </div>
            </div>

            {filteredCards.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3 shadow-xs">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">
                  Không có thẻ Flashcard nào khớp với bộ lọc hiện tại.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStudyStatusFilter('all');
                    setSelectedServiceTag('all');
                    setSelectedCardType('ALL');
                    setServiceSearch('');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-extrabold rounded-xl cursor-pointer"
                >
                  Hiển thị lại tất cả thẻ
                </button>
              </div>
            ) : studyLayout === 'card' && currentCard ? (
              /* ---- SINGLE FLIP CARD VIEW ---- */
              <div className="max-w-3xl mx-auto space-y-4">
                {/* Progress bar + Counter */}
                <div className="space-y-1.5 px-1">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-600">
                    <span>
                      Thẻ {cardIndex + 1} / {filteredCards.length}
                    </span>
                    <span className="text-slate-400 font-semibold hidden sm:inline">
                      Vuốt trái/phải hoặc bấm thẻ để lật
                    </span>
                    <span className="text-emerald-600">
                      {masteredIds.includes(currentCard.id)
                        ? 'Đã thuộc'
                        : reviewIds.includes(currentCard.id)
                        ? 'Cần ôn lại'
                        : 'Chưa đánh dấu'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{
                        width: `${Math.round(((cardIndex + 1) / filteredCards.length) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Interactive Tap-to-Flip Flashcard */}
                <div
                  onClick={() => setIsFlipped((f) => !f)}
                  onTouchStart={(e) => {
                    touchStartX.current = e.touches[0].clientX;
                    touchStartY.current = e.touches[0].clientY;
                  }}
                  onTouchEnd={(e) => {
                    if (touchStartX.current === null || touchStartY.current === null) return;
                    const dx = e.changedTouches[0].clientX - touchStartX.current;
                    const dy = e.changedTouches[0].clientY - touchStartY.current;
                    touchStartX.current = null;
                    touchStartY.current = null;
                    // Horizontal swipe threshold
                    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
                      if (dx < 0) handleNextCard();
                      else handlePrevCard();
                    }
                  }}
                  className={`relative rounded-3xl border-2 p-5 sm:p-8 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between transition-all duration-200 cursor-pointer select-none shadow-lg ${
                    isFlipped
                      ? 'bg-white border-amber-400 shadow-amber-500/10'
                      : 'bg-gradient-to-br from-white via-white to-amber-50/40 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  {/* Card Top Header: Service Tag + Category + Card Type */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Service Tag Badge (clickable to filter by this service) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedServiceTag(
                            selectedServiceTag === currentCard.serviceTag
                              ? 'all'
                              : currentCard.serviceTag
                          );
                        }}
                        title="Bấm để lọc toàn bộ thẻ của Service này"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-amber-400 text-[11px] sm:text-xs font-extrabold hover:bg-slate-800 transition cursor-pointer"
                      >
                        <Tag className="w-3 h-3 shrink-0" />
                        <span>{currentCard.serviceTag}</span>
                      </button>

                      <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold">
                        {currentCard.categoryTitle}
                      </span>

                      <span
                        className={`px-2 py-1 rounded-lg text-[11px] font-extrabold border ${
                          CARD_TYPE_STYLES[currentCard.cardType].bg
                        } ${CARD_TYPE_STYLES[currentCard.cardType].text} ${
                          CARD_TYPE_STYLES[currentCard.cardType].border
                        }`}
                      >
                        {currentCard.cardTypeLabel}
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        isFlipped
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {isFlipped ? 'Đáp án Cheat Sheet' : 'Mặt trước'}
                    </span>
                  </div>

                  {/* Card Center Body */}
                  <div className="py-5 sm:py-7 flex-1 flex flex-col justify-center">
                    {!isFlipped ? (
                      <div className="text-center space-y-3">
                        <p className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug whitespace-pre-line">
                          {currentCard.front}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4 animate-in fade-in duration-150">
                        <div className="text-xs font-bold text-slate-400">
                          {currentCard.front}
                        </div>

                        {currentCard.cardType === 'quick_pick' ? (
                          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                              Đáp án chọn nhanh
                            </div>
                            <div className="text-xl sm:text-2xl font-black text-emerald-950">
                              {currentCard.back}
                            </div>
                            {currentCard.extraContext && (
                              <div className="text-xs text-emerald-800 font-medium pt-1">
                                {currentCard.extraContext}
                              </div>
                            )}
                          </div>
                        ) : (
                          renderFormattedCheatSheetText(currentCard.back)
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Hint */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      {isFlipped
                        ? 'Chạm lại để xem mặt trước'
                        : 'Chạm vào thẻ để lật xem đáp án'}
                    </span>
                    <span className="hidden sm:inline">Space: Lật thẻ</span>
                  </div>
                </div>

                {/* Thumb-Friendly Bottom Action Controls */}
                <div className="space-y-2.5">
                  {/* Mastery buttons */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleMarkReview(currentCard.id)}
                      className={`py-3 sm:py-3.5 px-4 rounded-2xl border-2 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer ${
                        reviewIds.includes(currentCard.id)
                          ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                          : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                      }`}
                    >
                      <RotateCcw className="w-4 h-4 shrink-0" />
                      <span>Cần ôn lại</span>
                      <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-white/25 rounded border border-current/20 font-mono">
                        1
                      </kbd>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleMarkMastered(currentCard.id)}
                      className={`py-3 sm:py-3.5 px-4 rounded-2xl border-2 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer ${
                        masteredIds.includes(currentCard.id)
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Đã thuộc</span>
                      <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-white/25 rounded border border-current/20 font-mono">
                        2
                      </kbd>
                    </button>
                  </div>

                  {/* Navigation row */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={handlePrevCard}
                      className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Trước</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsFlipped((f) => !f)}
                      className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer shadow-xs"
                    >
                      <Eye className="w-4 h-4 text-amber-400" />
                      <span>{isFlipped ? 'Úp thẻ' : 'Lật thẻ'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextCard}
                      className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
                    >
                      <span>Tiếp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ---- LIST VIEW OF FLASHCARDS ---- */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredCards.slice(0, 120).map((card) => {
                  const isMastered = masteredIds.includes(card.id);
                  return (
                    <div
                      key={card.id}
                      className={`bg-white rounded-2xl border p-4 space-y-3 shadow-2xs transition ${
                        isMastered ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedServiceTag(card.serviceTag)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 text-amber-400 text-[11px] font-extrabold cursor-pointer"
                          >
                            <Tag className="w-3 h-3" />
                            <span>{card.serviceTag}</span>
                          </button>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                              CARD_TYPE_STYLES[card.cardType].bg
                            } ${CARD_TYPE_STYLES[card.cardType].text} ${
                              CARD_TYPE_STYLES[card.cardType].border
                            }`}
                          >
                            {card.cardTypeLabel}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            isMastered
                              ? persistMastered(masteredIds.filter((id) => id !== card.id))
                              : handleMarkMastered(card.id)
                          }
                          className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer ${
                            isMastered
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-emerald-600'
                          }`}
                          title={isMastered ? 'Bỏ đánh dấu đã thuộc' : 'Đánh dấu đã thuộc'}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                        {card.front}
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        {card.cardType === 'quick_pick' ? (
                          <div className="text-xs sm:text-sm font-black text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
                            {card.back}
                          </div>
                        ) : (
                          renderFormattedCheatSheetText(card.back)
                        )}
                      </div>
                    </div>
                  );
                })}
                {filteredCards.length > 120 && (
                  <div className="md:col-span-2 text-center py-4 text-xs font-semibold text-slate-500">
                    Đang hiển thị 120/{filteredCards.length} thẻ đầu tiên. Hãy chọn Chuyên đề hoặc Service Tag cụ thể để xem gọn hơn!
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* QUIZ MODE: TEST KNOWLEDGE FROM CHEAT SHEET                   */}
        {/* ============================================================ */}
        {appMode === 'quiz' && (
          <div className="space-y-4">
            {/* Quiz Settings Strip */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-slate-600">Số câu hỏi:</span>
                {[10, 20, 30, 0].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuizLimit(num)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                      quizLimit === num
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num === 0 ? 'Tất cả' : `${num} câu`}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setQuizInstantFeedback((v) => !v)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition cursor-pointer ${
                    quizInstantFeedback
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {quizInstantFeedback ? (
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span>{quizInstantFeedback ? 'Hiện đáp án ngay' : 'Chấm cuối bài'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => startNewQuiz()}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Tạo đề mới</span>
                </button>
              </div>
            </div>

            {quizQuestions.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-3">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">
                  Không đủ dữ liệu câu hỏi cho bộ lọc này. Hãy thử chọn &quot;Tất cả loại thẻ&quot; hoặc mở rộng Service Tag.
                </p>
              </div>
            ) : quizCompleted ? (
              /* ---- QUIZ RESULT SUMMARY SCREEN ---- */
              <div className="space-y-5 max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
                          quizScoreStats.pct >= 72
                            ? 'bg-emerald-500 text-white'
                            : 'bg-amber-500 text-slate-950'
                        }`}
                      >
                        <Trophy className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                          Kết quả Test Kiến Thức Cheat Sheet
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-slate-900">
                          {quizScoreStats.correct}/{quizScoreStats.total} câu đúng ({quizScoreStats.pct}%)
                        </div>
                        <div className="text-xs font-semibold text-slate-500 mt-0.5">
                          Đã trả lời {quizScoreStats.answered}/{quizScoreStats.total} câu • Ngưỡng đạt khuyến nghị: ≥ 72%
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {quizScoreStats.wrongQuestions.length > 0 && (
                        <button
                          type="button"
                          onClick={() => startNewQuiz(quizScoreStats.wrongQuestions)}
                          className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Target className="w-4 h-4" />
                          <span>Làm lại {quizScoreStats.wrongQuestions.length} câu sai</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => startNewQuiz()}
                        className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Làm đề test mới</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detailed Review List */}
                <div className="space-y-3">
                  {quizQuestions.map((q, idx) => {
                    const userOpt = quizAnswers[q.id];
                    const isRight = userOpt === q.correctIndex;
                    return (
                      <div
                        key={q.id}
                        className={`bg-white rounded-2xl border p-4 sm:p-5 space-y-3 ${
                          isRight ? 'border-emerald-200' : 'border-rose-200'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white text-[11px] font-black">
                              Câu {idx + 1}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-950 text-[11px] font-extrabold border border-amber-200">
                              <Tag className="w-3 h-3" />
                              {q.serviceTag}
                            </span>
                          </div>
                          {isRight ? (
                            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700">
                              <CheckCircle2 className="w-4 h-4" /> Đúng
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-rose-700">
                              <XCircle className="w-4 h-4" />{' '}
                              {userOpt === undefined ? 'Chưa làm' : 'Sai'}
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-bold text-slate-900">{q.prompt}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt, oIdx) => {
                            const isCorrectOpt = oIdx === q.correctIndex;
                            const isSelectedOpt = oIdx === userOpt;
                            return (
                              <div
                                key={oIdx}
                                className={`p-2.5 rounded-xl border font-semibold ${
                                  isCorrectOpt
                                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                                    : isSelectedOpt
                                    ? 'bg-rose-50 border-rose-400 text-rose-900'
                                    : 'bg-slate-50 border-slate-200 text-slate-500'
                                }`}
                              >
                                <span className="font-black mr-1.5">
                                  {String.fromCharCode(65 + oIdx)}.
                                </span>
                                {opt}
                              </div>
                            );
                          })}
                        </div>

                        {q.explanationItem.highlightLine && (
                          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-800">
                            <span className="font-extrabold text-amber-900 mr-1">
                              Cheat Sheet gốc:
                            </span>
                            {q.explanationItem.highlightLine}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              currentQuizQ && (
                /* ---- ACTIVE QUIZ QUESTION RUNNER ---- */
                <div className="max-w-3xl mx-auto space-y-4">
                  {/* Question Number Strip */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-2">
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span className="text-slate-700">
                        Câu {quizIndex + 1} / {quizQuestions.length}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-600">
                          Đúng: {quizScoreStats.correct}
                        </span>
                        <button
                          type="button"
                          onClick={handleFinishQuiz}
                          className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-extrabold cursor-pointer"
                        >
                          Nộp bài ({quizScoreStats.answered}/{quizQuestions.length})
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                      {quizQuestions.map((q, idx) => {
                        const ans = quizAnswers[q.id];
                        const isRev = quizInstantFeedback && !!quizRevealed[q.id];
                        const isCurr = idx === quizIndex;
                        let style = 'bg-slate-100 text-slate-600 border-slate-200';
                        if (isRev) {
                          style =
                            ans === q.correctIndex
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'bg-rose-500 text-white border-rose-500';
                        } else if (ans !== undefined) {
                          style = 'bg-amber-200 text-amber-950 border-amber-300';
                        }
                        if (isCurr) {
                          style += ' ring-2 ring-slate-900 ring-offset-1';
                        }

                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => setQuizIndex(idx)}
                            className={`w-7 h-7 rounded-lg text-[11px] font-extrabold border shrink-0 transition cursor-pointer ${style}`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Question Card */}
                  <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-md space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-amber-400 text-[11px] font-extrabold">
                          <Tag className="w-3 h-3" />
                          {currentQuizQ.serviceTag}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold">
                          {currentQuizQ.categoryTitle}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-lg text-[11px] font-extrabold border ${
                            CARD_TYPE_STYLES[currentQuizQ.questionType].bg
                          } ${CARD_TYPE_STYLES[currentQuizQ.questionType].text} ${
                            CARD_TYPE_STYLES[currentQuizQ.questionType].border
                          }`}
                        >
                          {currentQuizQ.questionTypeLabel}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed">
                      {currentQuizQ.prompt}
                    </h2>

                    {/* 4 Options */}
                    <div className="space-y-2.5">
                      {currentQuizQ.options.map((opt, idx) => {
                        const letter = String.fromCharCode(65 + idx);
                        const isSelected = currentSelectedOpt === idx;
                        const isCorrectOpt = idx === currentQuizQ.correctIndex;

                        let containerClass =
                          'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 text-slate-800 cursor-pointer';
                        let letterClass = 'bg-slate-100 text-slate-700';

                        if (isCurrentQuizRevealed) {
                          if (isCorrectOpt) {
                            containerClass =
                              'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold cursor-default';
                            letterClass = 'bg-emerald-600 text-white';
                          } else if (isSelected && !isCorrectOpt) {
                            containerClass =
                              'bg-rose-50 border-rose-500 text-rose-950 font-semibold cursor-default';
                            letterClass = 'bg-rose-600 text-white';
                          } else {
                            containerClass =
                              'bg-slate-50/70 border-slate-200 text-slate-400 opacity-75 cursor-default';
                            letterClass = 'bg-slate-200 text-slate-500';
                          }
                        } else if (isSelected) {
                          containerClass =
                            'bg-amber-50 border-amber-500 text-slate-950 font-bold shadow-xs';
                          letterClass = 'bg-amber-500 text-slate-950';
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={isCurrentQuizRevealed}
                            onClick={() => handleSelectQuizOption(currentQuizQ.id, idx)}
                            className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition flex items-start gap-3 min-h-[52px] active:scale-[0.99] ${containerClass}`}
                          >
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${letterClass}`}
                            >
                              {letter}
                            </span>
                            <span className="flex-1 text-xs sm:text-sm leading-relaxed pt-0.5">
                              {opt}
                            </span>
                            {isCurrentQuizRevealed && isCorrectOpt && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            )}
                            {isCurrentQuizRevealed && isSelected && !isCorrectOpt && (
                              <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Instant Cheat Sheet Explanation */}
                    {isCurrentQuizRevealed && (
                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-in fade-in duration-150">
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-800">
                          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>Nội dung gốc trong Cheat Sheet ({currentQuizQ.explanationItem.name})</span>
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                          {currentQuizQ.explanationItem.purpose}
                        </p>

                        {renderFormattedCheatSheetText(currentQuizQ.explanationItem.scenario)}

                        {currentQuizQ.explanationItem.note && (
                          <div className="pt-2 border-t border-slate-200 space-y-1.5">
                            <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                              Ghi chú &amp; Mẹo thi:
                            </div>
                            {renderFormattedCheatSheetText(currentQuizQ.explanationItem.note)}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quiz Footer Navigation */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        disabled={quizIndex === 0}
                        onClick={() => setQuizIndex((i) => Math.max(0, i - 1))}
                        className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm rounded-xl disabled:opacity-40 flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Câu trước</span>
                      </button>

                      {quizIndex < quizQuestions.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setQuizIndex((i) => i + 1)}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Câu sau</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleFinishQuiz}
                          className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Hoàn thành &amp; Xem kết quả</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
