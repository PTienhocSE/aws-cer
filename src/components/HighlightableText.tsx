'use client';

import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';

interface Highlight {
  id: string;
  selectedText: string;
  color: string;
}

interface Props {
  questionId: string;
  text: string;
  highlights?: Highlight[];
  onHighlightCreated?: () => void;
  className?: string;
}

export default function HighlightableText({
  questionId,
  text,
  highlights = [],
  onHighlightCreated,
  className = '',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectionRange, setSelectionRange] = useState<{
    selectedText: string;
    x: number;
    y: number;
  } | null>(null);

  const colors = [
    { name: 'YELLOW', bg: 'bg-yellow-200 hover:bg-yellow-300 border-yellow-400' },
    { name: 'BLUE', bg: 'bg-blue-200 hover:bg-blue-300 border-blue-400' },
    { name: 'GREEN', bg: 'bg-green-200 hover:bg-green-300 border-green-400' },
    { name: 'PINK', bg: 'bg-pink-200 hover:bg-pink-300 border-pink-400' },
  ];

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setSelectionRange(null);
      return;
    }

    const selectedText = selection.toString().trim();
    if (selectedText.length < 2) {
      setSelectionRange(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (containerRect) {
      setSelectionRange({
        selectedText,
        x: rect.left - containerRect.left + rect.width / 2 - 60,
        y: rect.top - containerRect.top - 40,
      });
    }
  };

  const [localHighlights, setLocalHighlights] = useState<Highlight[]>(highlights);

  // Sync with prop changes
  React.useEffect(() => {
    setLocalHighlights(highlights);
  }, [highlights]);

  const applyHighlight = async (color: string) => {
    if (!selectionRange) return;

    const newHighlight: Highlight = {
      id: 'temp-' + Date.now(),
      selectedText: selectionRange.selectedText,
      color,
    };

    // Optimistically update local state immediately so user sees highlight instantly
    setLocalHighlights((prev) => [...prev, newHighlight]);

    try {
      await fetch(`/api/questions/${questionId}/highlights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedText: selectionRange.selectedText,
          color,
          targetType: 'QUESTION',
        }),
      });

      setSelectionRange(null);
      window.getSelection()?.removeAllRanges();
      toast.success('Đã lưu tô màu highlight!');
      if (onHighlightCreated) onHighlightCreated();
    } catch (e) {
      console.error(e);
      toast.error('Lỗi khi lưu highlight');
    }
  };

  // Render text with highlight marks
  const renderHighlightedText = () => {
    const activeHighlights = localHighlights && localHighlights.length > 0 ? localHighlights : highlights;
    if (!activeHighlights || activeHighlights.length === 0) {
      return text;
    }

    let parts: (string | React.ReactNode)[] = [text];

    activeHighlights.forEach((h) => {
      const colorBg =
        h.color === 'YELLOW'
          ? 'bg-yellow-200/90 text-yellow-950 px-1 rounded font-medium'
          : h.color === 'BLUE'
          ? 'bg-blue-200/90 text-blue-950 px-1 rounded font-medium'
          : h.color === 'GREEN'
          ? 'bg-green-200/90 text-green-950 px-1 rounded font-medium'
          : 'bg-pink-200/90 text-pink-950 px-1 rounded font-medium';

      const newParts: (string | React.ReactNode)[] = [];

      parts.forEach((part) => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }

        const idx = part.indexOf(h.selectedText);
        if (idx !== -1) {
          const before = part.substring(0, idx);
          const match = part.substring(idx, idx + h.selectedText.length);
          const after = part.substring(idx + h.selectedText.length);

          if (before) newParts.push(before);
          newParts.push(
            <mark key={h.id || idx} className={colorBg}>
              {match}
            </mark>
          );
          if (after) newParts.push(after);
        } else {
          newParts.push(part);
        }
      });

      parts = newParts;
    });

    return parts;
  };

  return (
    <div ref={containerRef} onMouseUp={handleMouseUp} className={`relative select-text ${className}`}>
      {selectionRange && (
        <div
          style={{ left: `${Math.max(0, selectionRange.x)}px`, top: `${Math.max(-30, selectionRange.y)}px` }}
          className="absolute z-50 flex space-x-1.5 p-1.5 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in zoom-in-95"
        >
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => applyHighlight(c.name)}
              className={`w-5 h-5 rounded-full border ${c.bg} transition hover:scale-110`}
              title={`Tô màu ${c.name.toLowerCase()}`}
            />
          ))}
        </div>
      )}

      <div>{renderHighlightedText()}</div>
    </div>
  );
}
