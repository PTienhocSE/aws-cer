import assert from 'assert';
import { parseMetadataJson, QuestionAnswerMetadata } from '../src/lib/practice-sync';
import { calculateSuperMemo2 } from '../src/lib/spaced-repetition';

console.log('🧪 Running Unit Tests for Practice Metadata Sync...');

// Test 1: Parse array JSON
function testParseArrayJson() {
  const sampleJson = JSON.stringify([
    {
      sessionId: 'session-123',
      questionId: 'q-456',
      isCorrect: true,
      selectedOptionIds: ['opt-a'],
      correctOptionIds: ['opt-a'],
      answeredAt: '2026-11-16T10:00:00.000Z',
    },
    {
      sessionId: 'session-123',
      questionId: 'q-789',
      isCorrect: false,
      selectedOptionIds: ['opt-b'],
      correctOptionIds: ['opt-c'],
      answeredAt: '2026-11-16T10:02:00.000Z',
    },
  ]);

  const result = parseMetadataJson(sampleJson);
  assert.strictEqual(result.length, 2, 'Should parse 2 records');
  assert.strictEqual(result[0].sessionId, 'session-123');
  assert.strictEqual(result[0].questionId, 'q-456');
  assert.strictEqual(result[0].isCorrect, true);
  assert.deepStrictEqual(result[0].selectedOptionIds, ['opt-a']);
  assert.deepStrictEqual(result[0].correctOptionIds, ['opt-a']);
  assert.strictEqual(result[1].isCorrect, false);
  console.log('✓ testParseArrayJson Passed');
}

// Test 2: Parse object wrapped JSON { data: [...] } and { records: [...] }
function testParseObjectWrappedJson() {
  const sampleObj = JSON.stringify({
    version: 1,
    exportedAt: '2026-11-16T12:00:00.000Z',
    data: [
      {
        sessionId: 'sess-abc',
        questionId: 'q-101',
        isCorrect: true,
        selectedOptionIds: ['opt-1', 'opt-2'],
        correctOptionIds: ['opt-1', 'opt-2'],
      },
    ],
  });

  const result = parseMetadataJson(sampleObj);
  assert.strictEqual(result.length, 1, 'Should extract from data property');
  assert.strictEqual(result[0].questionId, 'q-101');
  assert.strictEqual(result[0].isCorrect, true);
  assert.deepStrictEqual(result[0].selectedOptionIds, ['opt-1', 'opt-2']);
  console.log('✓ testParseObjectWrappedJson Passed');
}

// Test 3: Filter invalid records & handle empty JSON
function testFilterInvalidRecords() {
  const invalidJson = JSON.stringify([
    { somethingElse: 123 }, // Missing questionId
    null,
    { questionId: 'valid-q', isCorrect: false },
  ]);

  const result = parseMetadataJson(invalidJson);
  assert.strictEqual(result.length, 1, 'Only 1 valid record should be accepted');
  assert.strictEqual(result[0].questionId, 'valid-q');
  assert.strictEqual(result[0].isCorrect, false);

  assert.throws(() => parseMetadataJson(''), /Nội dung dữ liệu rỗng/);
  console.log('✓ testFilterInvalidRecords Passed');
}

// Test 4: Duplicate question handling ("cứ cho làm trên cty có trùng câu thì cứ kệ, vẫn tính câu đấy đã làm")
function testDuplicateQuestionAttempts() {
  // Simulate user doing the same question twice on work laptop
  const records: QuestionAnswerMetadata[] = [
    {
      sessionId: 'sess-work-morning',
      questionId: 'question-dup-1',
      isCorrect: false,
      selectedOptionIds: ['opt-wrong'],
      correctOptionIds: ['opt-right'],
      answeredAt: '2026-11-16T09:00:00.000Z',
    },
    {
      sessionId: 'sess-work-afternoon',
      questionId: 'question-dup-1',
      isCorrect: true,
      selectedOptionIds: ['opt-right'],
      correctOptionIds: ['opt-right'],
      answeredAt: '2026-11-16T15:00:00.000Z',
    },
  ];

  // Mock previous user progress: user already attempted 1 time in past
  let progress = {
    attempts: 1,
    correctAttempts: 0,
    incorrectAttempts: 1,
    easinessFactor: 2.5,
    intervalDays: 0,
    lastAnswerCorrect: false,
  };

  for (const item of records) {
    const attempts = progress.attempts + 1;
    const correctAttempts = progress.correctAttempts + (item.isCorrect ? 1 : 0);
    const incorrectAttempts = progress.incorrectAttempts + (item.isCorrect ? 0 : 1);

    const sm2 = calculateSuperMemo2({
      quality: item.isCorrect ? 4 : 1,
      easinessFactor: progress.easinessFactor,
      intervalDays: progress.intervalDays,
      repetitions: correctAttempts,
    });

    progress = {
      attempts,
      correctAttempts,
      incorrectAttempts,
      easinessFactor: sm2.easinessFactor,
      intervalDays: sm2.intervalDays,
      lastAnswerCorrect: item.isCorrect,
    };
  }

  // After 2 more attempts on company laptop:
  // Total attempts: 1 initial + 2 new = 3 attempts
  assert.strictEqual(progress.attempts, 3, 'Attempts should be 3');
  assert.strictEqual(progress.correctAttempts, 1, 'Correct attempts should be 1');
  assert.strictEqual(progress.incorrectAttempts, 2, 'Incorrect attempts should be 2');
  assert.strictEqual(progress.lastAnswerCorrect, true, 'Last answer should be correct');
  console.log('✓ testDuplicateQuestionAttempts Passed');
}

try {
  testParseArrayJson();
  testParseObjectWrappedJson();
  testFilterInvalidRecords();
  testDuplicateQuestionAttempts();
  console.log('🎉 ALL PRACTICE SYNC TESTS PASSED SUCCESSFULLY!\n');
} catch (err: any) {
  console.error('❌ Test Failure:', err.message);
  process.exit(1);
}
