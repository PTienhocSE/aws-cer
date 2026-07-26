export function shuffleAndTake<T>(
  items: readonly T[],
  limit: number,
  random: () => number = Math.random
): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled.slice(0, Math.max(0, limit));
}

export function parseQuestionIds(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) && parsed.every((id) => typeof id === 'string') ? parsed : [];
  } catch {
    return [];
  }
}

export function getNextQuestionIndex(
  orderedQuestionIds: readonly string[],
  answeredQuestionIds: Iterable<string>
): number {
  const answered = new Set(answeredQuestionIds);
  const index = orderedQuestionIds.findIndex((questionId) => !answered.has(questionId));
  return index >= 0 ? index : Math.max(orderedQuestionIds.length - 1, 0);
}

export function takeFromPriorityGroups<T>(
  groups: readonly (readonly T[])[],
  limit: number,
  random: () => number = Math.random
): T[] {
  const selected: T[] = [];
  const seen = new Set<T>();
  for (const group of groups) {
    for (const item of shuffleAndTake(group, group.length, random)) {
      if (selected.length >= limit) return selected;
      if (!seen.has(item)) {
        seen.add(item);
        selected.push(item);
      }
    }
  }
  return selected;
}
