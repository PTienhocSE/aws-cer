'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { DocItem } from '@/lib/docsData';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
  Sun,
  Moon,
  Highlighter,
  FileText,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Pencil,
  Save,
} from 'lucide-react';
import toast from 'react-hot-toast';
import NoteMarkdown from '@/components/NoteMarkdown';

export interface DocAnnotationItem {
  id: string;
  docSlug: string;
  type: 'HIGHLIGHT' | 'NOTE';
  selectedText: string;
  startOffset?: number | null;
  endOffset?: number | null;
  contextBefore?: string | null;
  contextAfter?: string | null;
  noteContent?: string | null;
  color: string;
  createdAt: string;
}

interface DocsViewerProps {
  title: string;
  categoryTitle: string;
  html: string;
  rawMarkdown: string;
  prevDoc?: DocItem;
  nextDoc?: DocItem;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  slug: string;
}

// Helper function to map normalized search indices back to exact raw character positions in HTML text nodes
function findRawMatchIndices(
  rawText: string,
  targetText: string,
  annotation?: Pick<DocAnnotationItem, 'startOffset' | 'endOffset' | 'contextBefore' | 'contextAfter'>
): { start: number; end: number } | null {
  const cleanTarget = targetText.trim();
  if (!cleanTarget) return null;

  // New annotations persist their exact position, so repeated text is never
  // accidentally attached to its first occurrence.
  const storedStart = annotation?.startOffset;
  const storedEnd = annotation?.endOffset;
  if (
    typeof storedStart === 'number' &&
    typeof storedEnd === 'number' &&
    storedStart >= 0 &&
    storedEnd > storedStart &&
    storedEnd <= rawText.length &&
    rawText.slice(storedStart, storedEnd).toLowerCase() === cleanTarget.toLowerCase()
  ) {
    return { start: storedStart, end: storedEnd };
  }

  // If the document was edited after the annotation was saved, use the nearby
  // text to relocate the correct occurrence.
  const lowerText = rawText.toLowerCase();
  const lowerTarget = cleanTarget.toLowerCase();
  const candidates: number[] = [];
  let candidateIndex = lowerText.indexOf(lowerTarget);
  while (candidateIndex !== -1) {
    candidates.push(candidateIndex);
    candidateIndex = lowerText.indexOf(lowerTarget, candidateIndex + 1);
  }
  if (candidates.length > 1 && (annotation?.contextBefore || annotation?.contextAfter)) {
    const before = annotation.contextBefore || '';
    const after = annotation.contextAfter || '';
    const commonSuffixLength = (left: string, right: string) => {
      let count = 0;
      while (
        count < left.length &&
        count < right.length &&
        left[left.length - 1 - count].toLowerCase() === right[right.length - 1 - count].toLowerCase()
      ) count++;
      return count;
    };
    const commonPrefixLength = (left: string, right: string) => {
      let count = 0;
      while (
        count < left.length &&
        count < right.length &&
        left[count].toLowerCase() === right[count].toLowerCase()
      ) count++;
      return count;
    };
    const best = candidates
      .map((start) => ({
        start,
        score:
          commonSuffixLength(rawText.slice(Math.max(0, start - before.length), start), before) +
          commonPrefixLength(
            rawText.slice(start + cleanTarget.length, start + cleanTarget.length + after.length),
            after
          ),
      }))
      .sort((a, b) => b.score - a.score)[0];
    if (best.score > 0) return { start: best.start, end: best.start + cleanTarget.length };
  }

  // 1. Try exact match first on rawText
  const exactIndex = lowerText.indexOf(lowerTarget);
  if (exactIndex !== -1) {
    return { start: exactIndex, end: exactIndex + cleanTarget.length };
  }

  // 2. Build index map between normalized string and rawText to preserve exact raw character positions
  let normalized = '';
  const rawIndexMap: number[] = [];

  let inWhitespace = false;
  for (let i = 0; i < rawText.length; i++) {
    const char = rawText[i];
    if (/\s/.test(char)) {
      if (!inWhitespace) {
        normalized += ' ';
        rawIndexMap.push(i);
        inWhitespace = true;
      }
    } else {
      normalized += char;
      rawIndexMap.push(i);
      inWhitespace = false;
    }
  }

  const normTarget = cleanTarget.replace(/\s+/g, ' ');
  const normMatchIndex = normalized.toLowerCase().indexOf(normTarget.toLowerCase());
  if (normMatchIndex === -1) return null;

  const normMatchEnd = normMatchIndex + normTarget.length;
  const rawStart = rawIndexMap[normMatchIndex];
  const lastNormIndex = normMatchEnd - 1;
  const rawEnd = (lastNormIndex < rawIndexMap.length ? rawIndexMap[lastNormIndex] : rawText.length - 1) + 1;

  return { start: rawStart, end: rawEnd };
}

// In-Memory DOM TreeWalker to produce a 100% stable annotated HTML string for React's dangerouslySetInnerHTML
function parseAndAnnotateHtml(rawHtml: string, annotationsList: DocAnnotationItem[]): string {
  if (!rawHtml || !annotationsList || annotationsList.length === 0) {
    return rawHtml;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');
    const container = doc.body;

    annotationsList.forEach((ann) => {
      if (!ann.selectedText) return;
      const targetText = ann.selectedText.trim();
      if (!targetText) return;

      const walker = doc.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
      let node: Node | null;
      const textNodes: Text[] = [];
      while ((node = walker.nextNode())) {
        if (node.textContent) {
          textNodes.push(node as Text);
        }
      }

      let fullText = '';
      const offsets: { node: Text; start: number; end: number }[] = [];

      for (const tNode of textNodes) {
        const text = tNode.textContent || '';
        const start = fullText.length;
        fullText += text;
        const end = fullText.length;
        offsets.push({ node: tNode, start, end });
      }

      const matchRange = findRawMatchIndices(fullText, targetText, ann);
      if (!matchRange) return;

      const { start: matchIndex, end: matchEnd } = matchRange;

      const matchingNodes = offsets.filter(
        (o) => o.end > matchIndex && o.start < matchEnd
      );

      if (matchingNodes.length === 0) return;

      try {
        const range = doc.createRange();
        const firstObj = matchingNodes[0];
        const lastObj = matchingNodes[matchingNodes.length - 1];

        const startOffsetInFirst = Math.max(0, matchIndex - firstObj.start);
        const endOffsetInLast = Math.min(
          lastObj.node.textContent?.length || 0,
          matchEnd - lastObj.start
        );

        range.setStart(firstObj.node, startOffsetInFirst);
        range.setEnd(lastObj.node, endOffsetInLast);

        const mark = doc.createElement('mark');
        mark.setAttribute('data-annotation-id', ann.id);

        if (ann.type === 'NOTE') {
          mark.className = 'doc-note-mark';
        } else {
          const colorClass = ann.color ? ann.color.toLowerCase() : 'amber';
          mark.className = `doc-highlight doc-highlight-${colorClass}`;
        }

        mark.appendChild(range.extractContents());
        range.insertNode(mark);
      } catch (err) {
        console.error('In-memory DOM wrap error:', err);
      }
    });

    return container.innerHTML;
  } catch (e) {
    console.error('Error parsing HTML for annotations:', e);
    return rawHtml;
  }
}

export default function DocsViewer({
  title,
  categoryTitle,
  html,
  rawMarkdown,
  prevDoc,
  nextDoc,
  theme = 'light',
  onToggleTheme,
  slug,
}: DocsViewerProps) {
  const isDark = theme === 'dark';
  const articleRef = useRef<HTMLElement>(null);
  const annotationPopoverRef = useRef<HTMLDivElement>(null);

  // Annotations state
  const [annotations, setAnnotations] = useState<DocAnnotationItem[]>([]);
  const [selectionState, setSelectionState] = useState<{
    text: string;
    startOffset: number;
    endOffset: number;
    contextBefore: string;
    contextAfter: string;
    x: number;
    topY: number;
    bottomY: number;
    popupAbove: boolean;
  } | null>(null);

  // Inline Note Popup state (positioned right BELOW selection)
  const [inlineNoteState, setInlineNoteState] = useState<{
    text: string;
    startOffset: number;
    endOffset: number;
    contextBefore: string;
    contextAfter: string;
    x: number;
    y: number;
  } | null>(null);
  const [noteInputContent, setNoteInputContent] = useState('');
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Hover & Pin Popover state
  const [hoveredAnnotation, setHoveredAnnotation] = useState<{
    item: DocAnnotationItem;
    x: number;
    y: number;
  } | null>(null);
  const [pinnedAnnotationId, setPinnedAnnotationId] = useState<string | null>(null);
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editNoteContent, setEditNoteContent] = useState('');
  const [isUpdatingNote, setIsUpdatingNote] = useState(false);

  // Fetch Annotations from DB
  const fetchAnnotations = async () => {
    try {
      const res = await fetch(`/api/docs/annotations?docSlug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        setAnnotations(data.annotations || []);
      }
    } catch (e) {
      console.error('Error fetching annotations:', e);
    }
  };

  useEffect(() => {
    fetchAnnotations();
  }, [slug]);

  // Generate 100% Stable Annotated HTML in React Memory (Preserves marks on re-render & hover!)
  const annotatedHtml = useMemo(() => {
    return parseAndAnnotateHtml(html, annotations);
  }, [html, annotations]);

  // Handle selection after mouse release or after mobile selection handles settle.
  const handleArticleSelectionEnd = (delay = 20) => {
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) {
        return;
      }

      const rawSelectedText = selection.toString();
      const text = rawSelectedText.trim();
      if (!text || text.length < 2) {
        return;
      }

      if (articleRef.current && articleRef.current.contains(selection.anchorNode)) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          const prefixRange = document.createRange();
          prefixRange.selectNodeContents(articleRef.current);
          prefixRange.setEnd(range.startContainer, range.startOffset);
          const leadingWhitespace = rawSelectedText.length - rawSelectedText.trimStart().length;
          const startOffset = prefixRange.toString().length + leadingWhitespace;
          const endOffset = startOffset + text.length;
          const articleText = articleRef.current.textContent || '';
          const popupAbove = rect.top >= 84;
          const viewportWidth = window.innerWidth;
          setSelectionState({
            text,
            startOffset,
            endOffset,
            contextBefore: articleText.slice(Math.max(0, startOffset - 80), startOffset),
            contextAfter: articleText.slice(endOffset, endOffset + 80),
            x: Math.min(
              Math.max(132, rect.left + rect.width / 2),
              Math.max(132, viewportWidth - 132)
            ),
            topY: rect.top - 10,
            bottomY: rect.bottom + 8,
            popupAbove,
          });
        } catch (e) {
          console.error(e);
        }
      }
    }, delay);
  };

  // Dismiss Selection / Inline Note Popup / Unpin on Outside Click
  useEffect(() => {
    const handleDocumentMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        typeof target.closest === 'function' &&
        (target.closest('#doc-selection-popup') ||
          target.closest('#doc-inline-note-popup') ||
          target.closest('#doc-annotation-popover') ||
          target.closest('[data-annotation-id]'))
      ) {
        return;
      }
      setPinnedAnnotationId(null);
      setHoveredAnnotation(null);
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          setSelectionState(null);
        }
      }, 50);
    };

    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown);
  }, []);

  const router = useRouter();
  const { user } = useAuthStore();

  // Save Highlight to DB with Optimistic Update (0ms UI latency!)
  const handleSaveHighlight = async (color: string = 'AMBER') => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để tô màu Highlight!');
      router.push('/login');
      return;
    }

    if (!selectionState?.text) return;
    const text = selectionState.text;
    setSelectionState(null);
    window.getSelection()?.removeAllRanges();

    // Optimistic UI Update (Instant Highlight!)
    const tempId = 'temp-' + Date.now();
    const tempAnn: DocAnnotationItem = {
      id: tempId,
      docSlug: slug,
      type: 'HIGHLIGHT',
      selectedText: text,
      startOffset: selectionState.startOffset,
      endOffset: selectionState.endOffset,
      contextBefore: selectionState.contextBefore,
      contextAfter: selectionState.contextAfter,
      color,
      createdAt: new Date().toISOString(),
    };

    setAnnotations((prev) => [...prev, tempAnn]);

    try {
      const res = await fetch('/api/docs/annotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docSlug: slug,
          type: 'HIGHLIGHT',
          selectedText: text,
          startOffset: tempAnn.startOffset,
          endOffset: tempAnn.endOffset,
          contextBefore: tempAnn.contextBefore,
          contextAfter: tempAnn.contextAfter,
          color,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setAnnotations((prev) => prev.filter((a) => a.id !== tempId));
        toast.error(err.error || 'Lỗi lưu Highlight');
        return;
      }

      const data = await res.json();
      if (data.annotation) {
        setAnnotations((prev) =>
          prev.map((a) => (a.id === tempId ? data.annotation : a))
        );
      }
      toast.success('Đã tô màu Highlight!');
    } catch (e) {
      console.error(e);
      setAnnotations((prev) => prev.filter((a) => a.id !== tempId));
      toast.error('Lỗi khi lưu Highlight');
    }
  };

  // Open Inline Note Popup (positioned right below selection)
  const handleOpenInlineNote = () => {
    if (!user) {
      toast.error('Bạn cần đăng nhập để tạo Ghi chú!');
      router.push('/login');
      return;
    }

    if (!selectionState?.text) return;
    setInlineNoteState({
      text: selectionState.text,
      startOffset: selectionState.startOffset,
      endOffset: selectionState.endOffset,
      contextBefore: selectionState.contextBefore,
      contextAfter: selectionState.contextAfter,
      x: window.innerWidth < 640 ? window.innerWidth / 2 : selectionState.x,
      y: selectionState.bottomY,
    });
    setNoteInputContent('');
    setSelectionState(null);
  };

  // Save Note to DB with Optimistic Update
  const handleSaveNote = async () => {
    if (!inlineNoteState?.text) return;
    const text = inlineNoteState.text;
    const note = noteInputContent;
    setInlineNoteState(null);
    setNoteInputContent('');
    window.getSelection()?.removeAllRanges();

    const tempId = 'temp-' + Date.now();
    const tempAnn: DocAnnotationItem = {
      id: tempId,
      docSlug: slug,
      type: 'NOTE',
      selectedText: text,
      startOffset: inlineNoteState.startOffset,
      endOffset: inlineNoteState.endOffset,
      contextBefore: inlineNoteState.contextBefore,
      contextAfter: inlineNoteState.contextAfter,
      noteContent: note,
      color: 'INDIGO',
      createdAt: new Date().toISOString(),
    };

    setAnnotations((prev) => [...prev, tempAnn]);

    try {
      const res = await fetch('/api/docs/annotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docSlug: slug,
          type: 'NOTE',
          selectedText: text,
          startOffset: tempAnn.startOffset,
          endOffset: tempAnn.endOffset,
          contextBefore: tempAnn.contextBefore,
          contextAfter: tempAnn.contextAfter,
          noteContent: note,
          color: 'INDIGO',
        }),
      });

      if (!res.ok) {
        setAnnotations((prev) => prev.filter((a) => a.id !== tempId));
        toast.error('Lỗi lưu ghi chú');
        return;
      }

      const data = await res.json();
      if (data.annotation) {
        setAnnotations((prev) =>
          prev.map((a) => (a.id === tempId ? data.annotation : a))
        );
      }
      toast.success('Đã lưu ghi chú!');
    } catch (e) {
      console.error(e);
      setAnnotations((prev) => prev.filter((a) => a.id !== tempId));
      toast.error('Lỗi khi lưu ghi chú');
    }
  };

  // Delete Annotation from DB
  const handleDeleteAnnotation = async (id: string) => {
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
    setPinnedAnnotationId(null);
    setHoveredAnnotation(null);

    try {
      const res = await fetch(`/api/docs/annotations?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Đã xóa ghi chú.');
      } else {
        fetchAnnotations(); // Rollback if failed
        toast.error('Không thể xóa ghi chú');
      }
    } catch (e) {
      console.error(e);
      fetchAnnotations();
      toast.error('Lỗi khi xóa ghi chú');
    }
  };

  const handleUpdateAnnotationNote = async () => {
    if (!hoveredAnnotation || hoveredAnnotation.item.type !== 'NOTE') return;
    const annotationId = hoveredAnnotation.item.id;
    setIsUpdatingNote(true);

    try {
      const res = await fetch('/api/docs/annotations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: annotationId, noteContent: editNoteContent }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Không thể cập nhật ghi chú');
        return;
      }

      setAnnotations((current) =>
        current.map((annotation) =>
          annotation.id === annotationId
            ? { ...annotation, noteContent: data.annotation.noteContent }
            : annotation
        )
      );
      setHoveredAnnotation((current) =>
        current?.item.id === annotationId
          ? {
              ...current,
              item: { ...current.item, noteContent: data.annotation.noteContent },
            }
          : current
      );
      setIsEditingNote(false);
      toast.success('Đã cập nhật ghi chú!');
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi cập nhật ghi chú');
    } finally {
      setIsUpdatingNote(false);
    }
  };

  // Handle Click on annotated mark tag to PIN popover
  const handleArticleClick = (e: React.MouseEvent<HTMLElement>) => {
    const markTarget = (e.target as HTMLElement).closest('[data-annotation-id]');
    if (markTarget) {
      const annId = markTarget.getAttribute('data-annotation-id');
      const item = annotations.find((a) => a.id === annId);
      if (item) {
        const rect = markTarget.getBoundingClientRect();
        setHoveredAnnotation({
          item,
          x: Math.max(10, rect.left),
          y: rect.bottom + 8,
        });
        setPinnedAnnotationId(item.id);
        setIsNoteExpanded(false);
        setIsEditingNote(false);
      }
    }
  };

  // Handle Mouse Hover / Move over annotated mark tags
  const handleArticleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (pinnedAnnotationId) return;

    const markTarget = (e.target as HTMLElement).closest('[data-annotation-id]');
    if (markTarget) {
      const annId = markTarget.getAttribute('data-annotation-id');
      const item = annotations.find((a) => a.id === annId);
      if (item) {
        if (hoveredAnnotation?.item.id !== item.id) {
          const rect = markTarget.getBoundingClientRect();
          setHoveredAnnotation({
            item,
            x: Math.max(10, rect.left),
            y: rect.bottom + 8,
          });
          setIsNoteExpanded(false);
          setIsEditingNote(false);
        }
      }
    } else {
      const popoverTarget = (e.target as HTMLElement).closest('#doc-annotation-popover');
      if (!popoverTarget) {
        setHoveredAnnotation(null);
      }
    }
  };

  const handleArticleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (pinnedAnnotationId) return;
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (
      relatedTarget &&
      typeof relatedTarget.closest === 'function' &&
      relatedTarget.closest('#doc-annotation-popover')
    ) {
      return;
    }
    setHoveredAnnotation(null);
  };

  // Keep the popup anchored to its mark while scrolling or resizing.
  useEffect(() => {
    const annotationId = hoveredAnnotation?.item.id;
    if (!annotationId) return;

    let frameId = 0;
    const updatePosition = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const anchor = articleRef.current?.querySelector<HTMLElement>(
          `[data-annotation-id="${annotationId}"]`
        );
        if (!anchor) return;

        const rect = anchor.getBoundingClientRect();
        const popup = annotationPopoverRef.current;
        const popupWidth = popup?.offsetWidth || (isNoteExpanded ? 576 : 320);
        const popupHeight = popup?.offsetHeight || 240;
        const gutter = window.innerWidth < 640 ? 8 : 12;
        const x = Math.min(
          Math.max(gutter, rect.left),
          Math.max(gutter, window.innerWidth - popupWidth - gutter)
        );
        const spaceBelow = window.innerHeight - rect.bottom;
        const desiredY =
          spaceBelow >= Math.min(popupHeight + 8, window.innerHeight * 0.6)
            ? rect.bottom + 8
            : rect.top - popupHeight - 8;
        const y = Math.min(
          Math.max(gutter, desiredY),
          Math.max(gutter, window.innerHeight - popupHeight - gutter)
        );

        setHoveredAnnotation((current) => {
          if (!current || current.item.id !== annotationId) return current;
          if (Math.abs(current.x - x) < 1 && Math.abs(current.y - y) < 1) return current;
          return { ...current, x, y };
        });
      });
    };

    updatePosition();
    const transitionTimer = window.setTimeout(updatePosition, 240);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(transitionTimer);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [hoveredAnnotation?.item.id, isNoteExpanded]);

  // Estimate reading time (~200 words per min)
  const wordCount = rawMarkdown ? rawMarkdown.split(/\s+/).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div
      className={`w-full min-w-0 max-w-full overflow-hidden border rounded-2xl shadow-sm p-3.5 sm:p-6 lg:p-8 space-y-6 transition-colors duration-200 relative ${
        isDark ? 'bg-[#131c2e] border-slate-800 text-slate-200' : 'bg-white border-slate-200/90 text-slate-800'
      }`}
    >
      {/* Top Header & Breadcrumbs */}
      <div className={`border-b pb-4 space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 font-semibold overflow-hidden flex-wrap">
            <span
              className={`flex items-center px-2.5 py-1 rounded-lg border font-bold shrink-0 ${
                isDark
                  ? 'text-amber-300 bg-amber-950/60 border-amber-800/60'
                  : 'text-amber-600 bg-amber-50 border-amber-200/80'
              }`}
            >
              <Layers className="w-3.5 h-3.5 mr-1" />
              {categoryTitle}
            </span>
            <span className={isDark ? 'text-slate-600' : 'text-slate-400'}>/</span>
            <span className={`font-bold truncate ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{title}</span>
          </div>

          <div className="flex items-center space-x-2">
            <div
              className={`flex items-center space-x-1.5 font-medium text-[11px] px-2.5 py-1 rounded-lg border ${
                isDark
                  ? 'text-slate-400 bg-[#090d16] border-slate-800'
                  : 'text-slate-400 bg-slate-50 border-slate-200/60'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Khoảng {readingTimeMinutes} phút đọc</span>
            </div>

            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                  isDark
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800'
                }`}
                title={isDark ? 'Chuyển sang Nền sáng' : 'Chuyển sang Nền tối'}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nền sáng</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-amber-300" />
                    <span>Nền tối</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top Sequential Page Navigation */}
      {(prevDoc || nextDoc) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {prevDoc ? (
            <Link
              href={`/docs/${prevDoc.slug}`}
              scroll
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
              className={`group px-3 py-2.5 rounded-xl border transition flex items-center gap-2 text-left ${
                isDark
                  ? 'border-slate-800 bg-[#090d16]/70 hover:border-amber-500'
                  : 'border-slate-200/90 bg-slate-50/50 hover:border-amber-400 hover:bg-amber-50/40'
              }`}
            >
              <ChevronLeft className="w-4 h-4 shrink-0 text-amber-500" />
              <div className="min-w-0">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Bài trước</div>
                <div className={`text-[11px] font-black truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {prevDoc.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextDoc ? (
            <Link
              href={`/docs/${nextDoc.slug}`}
              scroll
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
              className={`group px-3 py-2.5 rounded-xl border transition flex items-center justify-between gap-2 text-right ${
                isDark
                  ? 'border-slate-800 bg-[#090d16]/70 hover:border-amber-500'
                  : 'border-slate-200/90 bg-slate-50/50 hover:border-amber-400 hover:bg-amber-50/40'
              }`}
            >
              <div className="min-w-0 w-full">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Bài tiếp theo</div>
                <div className={`text-[11px] font-black truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {nextDoc.title}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 shrink-0 text-amber-500" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}

      {/* Main Markdown Content Area */}
      <article
        ref={articleRef}
        onClick={handleArticleClick}
        onMouseUp={() => handleArticleSelectionEnd()}
        onTouchEnd={() => handleArticleSelectionEnd(180)}
        onMouseMove={handleArticleMouseMove}
        onMouseLeave={handleArticleMouseLeave}
        className={`doc-content w-full min-w-0 max-w-full select-text touch-pan-y ${isDark ? 'doc-dark-mode' : ''} prose relative`}
      >
        <div className="w-full min-w-0 max-w-full" dangerouslySetInnerHTML={{ __html: annotatedHtml }} />
      </article>

      {/* Floating Action Popup with Multi-Color Highlight Swatches */}
      {selectionState && (
        <div
          id="doc-selection-popup"
          onMouseDown={(e) => e.preventDefault()}
          style={{
            position: 'fixed',
            left: `${selectionState.x}px`,
            top: `${selectionState.popupAbove ? selectionState.topY : selectionState.bottomY}px`,
            transform: selectionState.popupAbove ? 'translate(-50%, -100%)' : 'translateX(-50%)',
          }}
          className="z-50 max-w-[calc(100vw-1rem)] bg-slate-900 text-white border border-slate-700 shadow-2xl rounded-xl px-2 py-1.5 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 animate-in fade-in zoom-in-95"
        >
          {/* Multi-Color Swatches */}
          <div className="flex items-center space-x-1.5 border-r border-slate-700 pr-2">
            <button
              onClick={() => handleSaveHighlight('AMBER')}
              className="w-5 h-5 rounded-full bg-amber-400 border border-amber-200 hover:scale-125 transition shadow-xs cursor-pointer"
              title="Highlight Vàng Amber"
            />
            <button
              onClick={() => handleSaveHighlight('EMERALD')}
              className="w-5 h-5 rounded-full bg-emerald-400 border border-emerald-200 hover:scale-125 transition shadow-xs cursor-pointer"
              title="Highlight Xanh Lá Emerald"
            />
            <button
              onClick={() => handleSaveHighlight('BLUE')}
              className="w-5 h-5 rounded-full bg-sky-400 border border-sky-200 hover:scale-125 transition shadow-xs cursor-pointer"
              title="Highlight Xanh Dương Sky"
            />
            <button
              onClick={() => handleSaveHighlight('PINK')}
              className="w-5 h-5 rounded-full bg-pink-400 border border-pink-200 hover:scale-125 transition shadow-xs cursor-pointer"
              title="Highlight Hồng Pink"
            />
          </div>

          <button
            onClick={handleOpenInlineNote}
            className="flex items-center px-2 py-1 rounded-lg text-xs font-bold hover:bg-indigo-600 transition text-indigo-300 hover:text-white cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 mr-1" />
            <span>Ghi chú</span>
          </button>
        </div>
      )}

      {/* Inline Note Creation Popup (positioned right BELOW text selection) */}
      {inlineNoteState && (
        <div
          id="doc-inline-note-popup"
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            left: `${inlineNoteState.x}px`,
            top: `${inlineNoteState.y}px`,
            transform: 'translateX(-50%)',
          }}
          className={`z-50 w-[calc(100vw-1rem)] sm:w-80 max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-2xl p-4 space-y-3 shadow-2xl border animate-in fade-in zoom-in-95 ${
            isDark
              ? 'bg-[#1e293b] border-slate-700 text-slate-200'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between border-b pb-2 border-slate-200/40">
            <div className="flex items-center space-x-1.5 text-xs font-black text-indigo-400">
              <FileText className="w-3.5 h-3.5" />
              <span>Ghi chú cho đoạn đã chọn</span>
            </div>
            <button
              onClick={() => setInlineNoteState(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            className={`mx-4 mt-3 text-xs p-2.5 rounded-xl border font-mono italic leading-relaxed line-clamp-3 ${
              isDark ? 'bg-[#090d16] border-slate-800 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            "{inlineNoteState.text}"
          </div>

          <textarea
            rows={3}
            autoFocus
            placeholder="Nhập ghi chú... Hỗ trợ Markdown: **đậm**, `code`, danh sách..."
            value={noteInputContent}
            onChange={(e) => setNoteInputContent(e.target.value)}
            className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-amber-400 transition ${
              isDark
                ? 'bg-[#090d16] border-slate-800 text-slate-100 placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
            }`}
          />
          <div className="text-[10px] text-slate-400">
            Hỗ trợ Markdown: **đậm**, *nghiêng*, `code`, link, danh sách và code block.
          </div>

          <div className="flex items-center justify-end space-x-2 pt-1">
            <button
              onClick={() => setInlineNoteState(null)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Hủy
            </button>

            <button
              onClick={handleSaveNote}
              disabled={isSavingNote}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition disabled:opacity-50"
            >
              {isSavingNote ? 'Đang lưu...' : 'Lưu ghi chú'}
            </button>
          </div>
        </div>
      )}

      {/* Hover Popover Modal for Notes & Highlights */}
      {hoveredAnnotation && (
        <div
          ref={annotationPopoverRef}
          id="doc-annotation-popover"
          onMouseLeave={() => {
            if (!pinnedAnnotationId) setHoveredAnnotation(null);
          }}
          style={{
            position: 'fixed',
            left: `${hoveredAnnotation.x}px`,
            top: `${hoveredAnnotation.y}px`,
          }}
          className={`z-50 w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] max-h-[calc(100dvh-1rem)] overflow-y-auto sm:max-h-none sm:overflow-hidden rounded-2xl shadow-2xl border animate-in fade-in zoom-in-95 transition-[width] duration-200 ${
            isNoteExpanded && hoveredAnnotation.item.type === 'NOTE' ? 'sm:w-[36rem]' : 'sm:w-80'
          } ${
            isDark
              ? 'bg-[#1e293b] border-slate-700 text-slate-200'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className={`flex items-center justify-between border-b px-4 py-3 ${isDark ? 'border-slate-700 bg-slate-800/80' : 'border-slate-200 bg-slate-50'}`}>
            <span className="text-xs font-black flex items-center text-indigo-500">
              {hoveredAnnotation.item.type === 'NOTE' ? (
                <>
                  <FileText className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />
                  Ghi chú cá nhân
                </>
              ) : (
                <>
                  <Highlighter className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
                  Đoạn Highlight
                </>
              )}
            </span>

            <div className="flex items-center gap-1">
              {hoveredAnnotation.item.type === 'NOTE' && !isEditingNote && (
                <button
                  onClick={() => {
                    setEditNoteContent(hoveredAnnotation.item.noteContent || '');
                    setIsEditingNote(true);
                    setIsNoteExpanded(true);
                    setPinnedAnnotationId(hoveredAnnotation.item.id);
                  }}
                  className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition"
                  title="Chỉnh sửa ghi chú"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            <button
              onClick={() => handleDeleteAnnotation(hoveredAnnotation.item.id)}
              className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition"
              title="Xóa ghi chú này"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            </div>
          </div>

          <div
            className={`text-xs p-2 rounded-lg border font-mono italic leading-relaxed line-clamp-2 ${
              isDark ? 'bg-[#090d16] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            "{hoveredAnnotation.item.selectedText}"
          </div>

          {hoveredAnnotation.item.type === 'NOTE' && (
            <div className="mx-4 mt-3 mb-4 space-y-2">
              {isEditingNote ? (
                <div className="space-y-2">
                  <textarea
                    autoFocus
                    rows={10}
                    value={editNoteContent}
                    onChange={(event) => setEditNoteContent(event.target.value)}
                    placeholder="Nhập nội dung ghi chú Markdown..."
                    className={`max-h-[55vh] min-h-48 w-full resize-y rounded-xl border p-3 font-mono text-xs leading-relaxed outline-none transition focus:border-indigo-400 ${
                      isDark
                        ? 'border-slate-700 bg-slate-950 text-slate-100'
                        : 'border-slate-200 bg-white text-slate-800'
                    }`}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-400">Hỗ trợ đầy đủ Markdown và bảng GFM.</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsEditingNote(false)}
                        disabled={isUpdatingNote}
                        className="rounded-lg px-3 py-1.5 text-[11px] font-bold text-slate-400 hover:bg-slate-500/10 disabled:opacity-50"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleUpdateAnnotationNote}
                        disabled={isUpdatingNote}
                        className="flex items-center rounded-lg bg-indigo-600 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-indigo-500 disabled:opacity-50"
                      >
                        <Save className="mr-1.5 h-3.5 w-3.5" />
                        {isUpdatingNote ? 'Đang lưu...' : 'Lưu thay đổi'}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`rounded-xl border p-3 ${
                    isNoteExpanded ? 'max-h-[55vh] overflow-y-auto' : ''
                  } ${
                    isDark ? 'border-slate-700 bg-slate-900/40' : 'border-slate-200 bg-slate-50/70'
                  }`}
                >
                  <NoteMarkdown
                    theme={isDark ? 'dark' : 'light'}
                    content={
                      !hoveredAnnotation.item.noteContent
                        ? '(Không có nội dung)'
                        : isNoteExpanded || hoveredAnnotation.item.noteContent.length <= 120
                          ? hoveredAnnotation.item.noteContent
                          : `${hoveredAnnotation.item.noteContent.slice(0, 120)}...`
                    }
                  />
                </div>
              )}

              {!isEditingNote && (hoveredAnnotation.item.noteContent?.length || 0) > 120 && (
                <button
                  onClick={() => setIsNoteExpanded(!isNoteExpanded)}
                  className={`flex w-full items-center justify-center rounded-xl border px-3 py-2 text-[11px] font-bold transition ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700'
                      : 'border-slate-200 bg-slate-50 text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  {isNoteExpanded ? (
                    <>
                      <span>Thu gọn</span>
                      <ChevronUp className="w-3 h-3 ml-0.5" />
                    </>
                  ) : (
                    <>
                      <span>Xem thêm</span>
                      <ChevronDown className="w-3 h-3 ml-0.5" />
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Bottom Sequential Page Navigation */}
      <div className={`border-t pt-6 mt-10 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prevDoc ? (
            <Link
              href={`/docs/${prevDoc.slug}`}
              scroll
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
              className={`group p-4 rounded-xl border transition flex items-center space-x-3 text-left ${
                isDark
                  ? 'border-slate-800 bg-[#090d16]/70 hover:border-amber-500 hover:bg-amber-950/20'
                  : 'border-slate-200/90 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/40'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition shrink-0 ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-300 group-hover:border-amber-500 group-hover:text-amber-400'
                    : 'bg-white border-slate-200 text-slate-600 group-hover:border-amber-400 group-hover:text-amber-600'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? 'text-slate-400 group-hover:text-amber-400' : 'text-slate-400 group-hover:text-amber-700'
                  }`}
                >
                  Bài trước
                </div>
                <div
                  className={`text-xs font-black truncate ${
                    isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-900'
                  }`}
                >
                  {prevDoc.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextDoc ? (
            <Link
              href={`/docs/${nextDoc.slug}`}
              scroll
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
              className={`group p-4 rounded-xl border transition flex items-center justify-between space-x-3 text-right ${
                isDark
                  ? 'border-slate-800 bg-[#090d16]/70 hover:border-amber-500 hover:bg-amber-950/20'
                  : 'border-slate-200/90 hover:border-amber-400 bg-slate-50/50 hover:bg-amber-50/40'
              }`}
            >
              <div className="overflow-hidden w-full">
                <div
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? 'text-slate-400 group-hover:text-amber-400' : 'text-slate-400 group-hover:text-amber-700'
                  }`}
                >
                  Bài tiếp theo
                </div>
                <div
                  className={`text-xs font-black truncate ${
                    isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-slate-900'
                  }`}
                >
                  {nextDoc.title}
                </div>
              </div>
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition shrink-0 ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-300 group-hover:border-amber-500 group-hover:text-amber-400'
                    : 'bg-white border-slate-200 text-slate-600 group-hover:border-amber-400 group-hover:text-amber-600'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
