import * as assert from 'assert';
import {
  getNextQuestionIndex,
  parseQuestionIds,
  shuffleAndTake,
  takeFromPriorityGroups,
} from '../src/lib/practice-selection';

const ids = Array.from({ length: 40 }, (_, index) => `q-${index + 1}`);
let seed = 17;
const deterministicRandom = () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

const selected = shuffleAndTake(ids, 15, deterministicRandom);
assert.strictEqual(selected.length, 15, 'SRS must select exactly 15 questions');
assert.strictEqual(new Set(selected).size, 15, 'SRS selection must not contain duplicates');
assert.ok(selected.every((id) => ids.includes(id)), 'SRS selection must use bank questions only');
assert.notDeepStrictEqual(selected, ids.slice(0, 15), 'SRS selection must not always use the first 15 questions');

seed = 17;
const prioritized = takeFromPriorityGroups(
  [['due-1', 'due-2'], ['new-1', 'new-2'], ['future-1']],
  4,
  deterministicRandom
);
assert.deepStrictEqual(
  new Set(prioritized.slice(0, 2)),
  new Set(['due-1', 'due-2']),
  'SRS must select all due questions before new questions'
);
assert.ok(prioritized.includes('new-1') || prioritized.includes('new-2'));
assert.ok(!prioritized.includes('future-1'), 'Future questions are fallback only after due and new questions');

assert.deepStrictEqual(parseQuestionIds(JSON.stringify(['q-1', 'q-2'])), ['q-1', 'q-2']);
assert.deepStrictEqual(parseQuestionIds('invalid'), []);
assert.deepStrictEqual(parseQuestionIds('[1,2]'), []);

assert.strictEqual(
  getNextQuestionIndex(['q-1', 'q-2', 'q-3', 'q-4'], ['q-1', 'q-3']),
  1,
  'Domain resume must continue at the first unanswered question'
);
assert.strictEqual(
  getNextQuestionIndex(['q-1', 'q-2'], ['q-1', 'q-2']),
  1,
  'Completed Domain should remain on its final question'
);

console.log('✅ Practice selection and Domain resume tests passed');
