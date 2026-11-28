import {
  CHEATSHEET_CATEGORIES,
  CheatSheetCategory,
  CheatSheetItem,
} from '@/lib/cheatSheetData';

export type FlashcardType =
  | 'purpose'
  | 'when_to_use'
  | 'distinguish'
  | 'exam_tip'
  | 'quick_pick';

export const FLASHCARD_TYPE_LABELS: Record<FlashcardType, string> = {
  purpose: 'Mục đích',
  when_to_use: 'Khi nào chọn',
  distinguish: 'Phân biệt & Tránh nhầm',
  exam_tip: 'Mẹo thi & Ghi nhớ',
  quick_pick: 'Chọn nhanh Keyword',
};

export interface CheatSheetFlashcard {
  id: string;
  sourceItemId: string;
  serviceTag: string;
  categoryId: string;
  categoryTitle: string;
  categoryViTitle: string;
  cardType: FlashcardType;
  cardTypeLabel: string;
  front: string;
  back: string;
  rawArrowParts?: string[];
  extraContext?: string;
}

export interface CheatSheetQuizQuestion {
  id: string;
  serviceTag: string;
  categoryId: string;
  categoryTitle: string;
  questionType: FlashcardType;
  questionTypeLabel: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanationItem: {
    name: string;
    purpose: string;
    scenario: string;
    note: string;
    highlightLine?: string;
  };
}

interface ParsedScenario {
  whenToUse: string[];
  distinguish: string[];
  other: string[];
}

function parseScenarioLines(scenario: string): ParsedScenario {
  const lines = scenario
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const whenToUse: string[] = [];
  const distinguish: string[] = [];
  const other: string[] = [];

  for (const line of lines) {
    if (line.startsWith('Chọn khi:')) {
      whenToUse.push(line);
    } else if (
      line.startsWith('KHÔNG chọn khi:') ||
      line.startsWith('Phân biệt:') ||
      line.startsWith('Lưu ý:') ||
      line.startsWith('Lưu ý đề:')
    ) {
      distinguish.push(line);
    } else {
      other.push(line);
    }
  }

  return { whenToUse, distinguish, other };
}

function splitQuickPickPairs(line: string): Array<{ keywords: string; answer: string; raw: string }> {
  const trimmed = line.trim();
  if (!trimmed.includes('→')) return [];

  // Some lines pack 2 quick picks separated by " | "
  const segments = trimmed.split('|').map((s) => s.trim()).filter(Boolean);
  const allHaveArrow = segments.length > 1 && segments.every((s) => s.includes('→'));
  const targetSegments = allHaveArrow ? segments : [trimmed];

  const pairs: Array<{ keywords: string; answer: string; raw: string }> = [];
  for (const seg of targetSegments) {
    const arrowIdx = seg.indexOf('→');
    if (arrowIdx === -1) continue;
    const left = seg.slice(0, arrowIdx).trim();
    const right = seg.slice(arrowIdx + 1).trim();
    if (left && right) {
      pairs.push({ keywords: left, answer: right, raw: seg });
    }
  }
  return pairs;
}

function buildFlashcardsFromItem(
  item: CheatSheetItem,
  category: CheatSheetCategory
): CheatSheetFlashcard[] {
  const cards: CheatSheetFlashcard[] = [];
  const baseMeta = {
    sourceItemId: item.id,
    serviceTag: item.name,
    categoryId: category.id,
    categoryTitle: category.title,
    categoryViTitle: category.vietnameseTitle,
  };

  if (item.isQuickPick) {
    const scenarioLines = item.scenario
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    let pairIdx = 0;
    const nonPairLines: string[] = [];

    for (const line of scenarioLines) {
      const pairs = splitQuickPickPairs(line);
      if (pairs.length > 0) {
        for (const pair of pairs) {
          pairIdx++;
          cards.push({
            ...baseMeta,
            id: `${item.id}-qp-${pairIdx}`,
            cardType: 'quick_pick',
            cardTypeLabel: FLASHCARD_TYPE_LABELS.quick_pick,
            front: `Từ khóa đề thi (${category.title}): ${pair.keywords}\n→ Nên chọn dịch vụ / giải pháp nào?`,
            back: pair.answer,
            extraContext: pair.raw,
          });
        }
      } else {
        nonPairLines.push(line);
      }
    }

    if (nonPairLines.length > 0) {
      cards.push({
        ...baseMeta,
        id: `${item.id}-summary`,
        cardType: 'distinguish',
        cardTypeLabel: FLASHCARD_TYPE_LABELS.distinguish,
        front: `${item.name}\n(${item.purpose})`,
        back: nonPairLines.join('\n'),
      });
    }
  } else {
    // 1. Purpose card
    if (item.purpose.trim()) {
      cards.push({
        ...baseMeta,
        id: `${item.id}-purpose`,
        cardType: 'purpose',
        cardTypeLabel: FLASHCARD_TYPE_LABELS.purpose,
        front: `"${item.name}" dùng để làm gì?`,
        back: item.purpose.trim(),
      });
    }

    // 2. Scenario cards (When to use / Distinguish)
    const parsed = parseScenarioLines(item.scenario);
    const whenLines = parsed.whenToUse.length > 0 ? parsed.whenToUse : parsed.other;
    if (whenLines.length > 0) {
      cards.push({
        ...baseMeta,
        id: `${item.id}-when`,
        cardType: 'when_to_use',
        cardTypeLabel: FLASHCARD_TYPE_LABELS.when_to_use,
        front: `Khi nào nên chọn "${item.name}" trong đề thi AWS SAA-C03?`,
        back: whenLines.join('\n'),
      });
    }

    if (parsed.distinguish.length > 0) {
      cards.push({
        ...baseMeta,
        id: `${item.id}-distinguish`,
        cardType: 'distinguish',
        cardTypeLabel: FLASHCARD_TYPE_LABELS.distinguish,
        front: `Khi nào KHÔNG chọn "${item.name}" và cách phân biệt với dịch vụ khác?`,
        back: parsed.distinguish.join('\n'),
      });
    }
  }

  // 3. Note cards (Exam tips & key facts)
  const noteLines = item.note
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const plainNoteLines: string[] = [];
  let arrowTipIdx = 0;

  for (const line of noteLines) {
    if (line.includes('=>')) {
      const parts = line
        .split('=>')
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length >= 2) {
        arrowTipIdx++;
        const topic = parts[0];
        cards.push({
          ...baseMeta,
          id: `${item.id}-tip-${arrowTipIdx}`,
          cardType: 'exam_tip',
          cardTypeLabel: FLASHCARD_TYPE_LABELS.exam_tip,
          front: `Ghi nhớ & mẹo thi về "${topic}" của ${item.name}?`,
          back: line,
          rawArrowParts: parts,
        });
        continue;
      }
    }
    plainNoteLines.push(line);
  }

  if (plainNoteLines.length > 0) {
    cards.push({
      ...baseMeta,
      id: `${item.id}-notes`,
      cardType: 'exam_tip',
      cardTypeLabel: FLASHCARD_TYPE_LABELS.exam_tip,
      front: `Những thông số & lưu ý cốt lõi cần nhớ của "${item.name}"?`,
      back: plainNoteLines.join('\n'),
    });
  }

  return cards;
}

// Precomputed full flashcard deck generated verbatim from CHEATSHEET_CATEGORIES
export const ALL_CHEATSHEET_FLASHCARDS: CheatSheetFlashcard[] =
  CHEATSHEET_CATEGORIES.flatMap((category) =>
    category.items.flatMap((item) => buildFlashcardsFromItem(item, category))
  );

export interface ServiceTagSummary {
  serviceTag: string;
  categoryId: string;
  categoryTitle: string;
  cardCount: number;
  isQuickPick: boolean;
}

export const ALL_SERVICE_TAGS: ServiceTagSummary[] = CHEATSHEET_CATEGORIES.flatMap(
  (category) =>
    category.items.map((item) => ({
      serviceTag: item.name,
      categoryId: category.id,
      categoryTitle: category.title,
      cardCount: ALL_CHEATSHEET_FLASHCARDS.filter(
        (c) => c.sourceItemId === item.id
      ).length,
      isQuickPick: item.isQuickPick,
    }))
);

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function maskServiceName(text: string, serviceName: string): string {
  // Mask exact service name (or short alias after Amazon/AWS) if it appears in the prompt
  const candidates = [serviceName];
  const shortName = serviceName.replace(/^(Amazon|AWS)\s+/i, '').trim();
  if (shortName.length >= 3 && shortName !== serviceName) {
    candidates.push(shortName);
  }

  let masked = text;
  for (const cand of candidates) {
    const regex = new RegExp(`\\b${escapeRegExp(cand)}\\b`, 'gi');
    masked = masked.replace(regex, '___');
  }
  return masked;
}

/**
 * Generates multiple-choice quiz questions directly from Cheat Sheet content.
 */
export function generateCheatSheetQuizQuestions(options: {
  categoryId?: string;
  serviceTag?: string;
  cardType?: FlashcardType | 'ALL';
  limit?: number;
}): CheatSheetQuizQuestion[] {
  const { categoryId = 'all', serviceTag = 'all', cardType = 'ALL', limit = 20 } = options;

  const allItems = CHEATSHEET_CATEGORIES.flatMap((c) => c.items);

  // Filter target items based on category and serviceTag
  let targetItems = allItems;
  if (categoryId !== 'all') {
    targetItems = targetItems.filter((i) => i.categoryId === categoryId);
  }
  if (serviceTag !== 'all') {
    targetItems = targetItems.filter((i) => i.name === serviceTag);
  }

  const allRegularNames = allItems.filter((i) => !i.isQuickPick).map((i) => i.name);

  // Collect all quick-pick answers per category for clean distractors
  const qpAnswersByCat: Record<string, string[]> = {};
  const allQpAnswers: string[] = [];
  for (const item of allItems) {
    if (!item.isQuickPick) continue;
    const lines = item.scenario.split('\n');
    for (const line of lines) {
      for (const pair of splitQuickPickPairs(line)) {
        if (!qpAnswersByCat[item.categoryId]) qpAnswersByCat[item.categoryId] = [];
        if (!qpAnswersByCat[item.categoryId].includes(pair.answer)) {
          qpAnswersByCat[item.categoryId].push(pair.answer);
        }
        if (!allQpAnswers.includes(pair.answer)) {
          allQpAnswers.push(pair.answer);
        }
      }
    }
  }

  // Collect note right-hand values per category for exam_tip distractors
  const noteDetailsByCat: Record<string, Array<{ itemId: string; detail: string }>> = {};
  const allNoteDetails: Array<{ itemId: string; detail: string }> = [];
  for (const item of allItems) {
    for (const line of item.note.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed.includes('=>')) continue;
      const parts = trimmed.split('=>').map((p) => p.trim()).filter(Boolean);
      if (parts.length < 2) continue;
      const detail = parts.slice(1).join(' → ');
      if (detail.length < 4) continue;
      if (!noteDetailsByCat[item.categoryId]) noteDetailsByCat[item.categoryId] = [];
      noteDetailsByCat[item.categoryId].push({ itemId: item.id, detail });
      allNoteDetails.push({ itemId: item.id, detail });
    }
  }

  const normalizeOption = (s: string) =>
    s
      .toLowerCase()
      .replace(/^(amazon|aws)\s+/i, '')
      .replace(/\s*\([^)]*\)/g, '')
      .trim();

  const isTooSimilar = (a: string, b: string) => {
    const na = normalizeOption(a);
    const nb = normalizeOption(b);
    if (!na || !nb) return false;
    if (na === nb) return true;
    // Prevent "S3" vs "Amazon S3", "CloudShell" vs "AWS CloudShell"
    if (a.toLowerCase().trim() === b.toLowerCase().trim()) return true;
    return false;
  };

  const pickDistractors = (correct: string, pool: string[], fallbackPool: string[]): string[] => {
    const chosen: string[] = [];
    const accepted = [correct];

    const tryAdd = (cand: string) => {
      const trimmed = cand.trim();
      if (!trimmed) return false;
      if (accepted.some((existing) => isTooSimilar(existing, trimmed))) return false;
      accepted.push(trimmed);
      chosen.push(trimmed);
      return true;
    };

    for (const cand of shuffleArray(pool)) {
      tryAdd(cand);
      if (chosen.length === 3) return chosen;
    }

    for (const cand of shuffleArray(fallbackPool)) {
      tryAdd(cand);
      if (chosen.length === 3) return chosen;
    }

    return chosen;
  };

  const questions: CheatSheetQuizQuestion[] = [];

  for (const item of targetItems) {
    const sameCatServiceNames = allItems
      .filter((i) => !i.isQuickPick && i.categoryId === item.categoryId && i.name !== item.name)
      .map((i) => i.name);

    // 1. Purpose -> Identify service (regular items)
    if (!item.isQuickPick && (cardType === 'ALL' || cardType === 'purpose')) {
      const promptPurpose = maskServiceName(item.purpose.trim(), item.name);
      const distractors = pickDistractors(item.name, sameCatServiceNames, allRegularNames);
      if (distractors.length === 3) {
        const opts = shuffleArray([item.name, ...distractors]);
        questions.push({
          id: `quiz-${item.id}-purpose`,
          serviceTag: item.name,
          categoryId: item.categoryId,
          categoryTitle: item.categoryTitle,
          questionType: 'purpose',
          questionTypeLabel: FLASHCARD_TYPE_LABELS.purpose,
          prompt: `Dịch vụ / khái niệm AWS nào có chức năng chính: "${promptPurpose}"?`,
          options: opts,
          correctIndex: opts.indexOf(item.name),
          explanationItem: {
            name: item.name,
            purpose: item.purpose,
            scenario: item.scenario,
            note: item.note,
            highlightLine: item.purpose,
          },
        });
      }
    }

    // 2. When to use -> Identify service (regular items with Chọn khi:)
    if (!item.isQuickPick && (cardType === 'ALL' || cardType === 'when_to_use')) {
      const parsed = parseScenarioLines(item.scenario);
      if (parsed.whenToUse.length > 0) {
        const rawWhen = parsed.whenToUse[0].replace(/^Chọn khi:\s*/i, '').trim();
        const maskedWhen = maskServiceName(rawWhen, item.name);
        if (maskedWhen.length >= 12) {
          const distractors = pickDistractors(item.name, sameCatServiceNames, allRegularNames);
          if (distractors.length === 3) {
            const opts = shuffleArray([item.name, ...distractors]);
            questions.push({
              id: `quiz-${item.id}-when`,
              serviceTag: item.name,
              categoryId: item.categoryId,
              categoryTitle: item.categoryTitle,
              questionType: 'when_to_use',
              questionTypeLabel: FLASHCARD_TYPE_LABELS.when_to_use,
              prompt: `Trong đề thi SAA-C03 (${item.categoryTitle}), nên chọn dịch vụ nào khi: "${maskedWhen}"?`,
              options: opts,
              correctIndex: opts.indexOf(item.name),
              explanationItem: {
                name: item.name,
                purpose: item.purpose,
                scenario: item.scenario,
                note: item.note,
                highlightLine: parsed.whenToUse[0],
              },
            });
          }
        }
      }
    }

    // 3. Quick Pick pairs -> Choose exact service/solution
    if (item.isQuickPick && (cardType === 'ALL' || cardType === 'quick_pick')) {
      const lines = item.scenario.split('\n');
      let qIdx = 0;
      for (const line of lines) {
        for (const pair of splitQuickPickPairs(line)) {
          qIdx++;
          const pool = [
            ...(qpAnswersByCat[item.categoryId] || []),
            ...sameCatServiceNames,
          ];
          const distractors = pickDistractors(pair.answer, pool, allQpAnswers);
          if (distractors.length === 3) {
            const opts = shuffleArray([pair.answer, ...distractors]);
            questions.push({
              id: `quiz-${item.id}-qp-${qIdx}`,
              serviceTag: item.name,
              categoryId: item.categoryId,
              categoryTitle: item.categoryTitle,
              questionType: 'quick_pick',
              questionTypeLabel: FLASHCARD_TYPE_LABELS.quick_pick,
              prompt: `Từ khóa đề thi (${item.categoryTitle}): ${pair.keywords} → Nên chọn đáp án nào?`,
              options: opts,
              correctIndex: opts.indexOf(pair.answer),
              explanationItem: {
                name: item.name,
                purpose: item.purpose,
                scenario: item.scenario,
                note: item.note,
                highlightLine: pair.raw,
              },
            });
          }
        }
      }
    }

    // 4. Exam Tip (=> lines in Note) -> Verify exact knowledge detail
    if (cardType === 'ALL' || cardType === 'exam_tip') {
      const noteLines = item.note.split('\n').map((l) => l.trim()).filter(Boolean);
      let tipIdx = 0;
      for (const line of noteLines) {
        if (!line.includes('=>')) continue;
        const parts = line.split('=>').map((p) => p.trim()).filter(Boolean);
        if (parts.length < 2) continue;
        const topic = parts[0];
        const correctDetail = parts.slice(1).join(' → ');
        if (topic.length < 2 || correctDetail.length < 4) continue;

        tipIdx++;
        // Prefer distractors from same service or same category with similar length range
        const sameServiceDetails = allNoteDetails
          .filter((d) => d.itemId === item.id && d.detail !== correctDetail)
          .map((d) => d.detail);
        const sameCatDetails = (noteDetailsByCat[item.categoryId] || [])
          .filter((d) => d.detail !== correctDetail)
          .map((d) => d.detail);
        const fallbackDetails = allNoteDetails.map((d) => d.detail);

        const distractors = pickDistractors(
          correctDetail,
          [...sameServiceDetails, ...sameCatDetails],
          fallbackDetails
        );
        if (distractors.length === 3) {
          const opts = shuffleArray([correctDetail, ...distractors]);
          questions.push({
            id: `quiz-${item.id}-tip-${tipIdx}`,
            serviceTag: item.name,
            categoryId: item.categoryId,
            categoryTitle: item.categoryTitle,
            questionType: 'exam_tip',
            questionTypeLabel: FLASHCARD_TYPE_LABELS.exam_tip,
            prompt: `[${item.name}] Theo Cheat Sheet, thông tin nào đúng về "${topic}"?`,
            options: opts,
            correctIndex: opts.indexOf(correctDetail),
            explanationItem: {
              name: item.name,
              purpose: item.purpose,
              scenario: item.scenario,
              note: item.note,
              highlightLine: line,
            },
          });
        }
      }
    }
  }

  const shuffled = shuffleArray(questions);
  if (limit > 0 && shuffled.length > limit) {
    return shuffled.slice(0, limit);
  }
  return shuffled;
}
