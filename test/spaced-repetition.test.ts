import { calculateSuperMemo2 as calculateSpacedRepetition, MasteryStatus } from '../src/lib/spaced-repetition';
import assert from 'assert';

function testFirstCorrectAnswer() {
  const result = calculateSpacedRepetition({
    quality: 4,
    easinessFactor: 2.5,
    intervalDays: 0,
    repetitions: 0,
  });

  assert.strictEqual(result.intervalDays, 1, 'First correct answer should set interval to 1 day');
  assert.strictEqual(result.repetitions, 1, 'First correct answer should increment repetitions to 1');
  assert.strictEqual(result.masteryStatus, 'LEARNING', 'First correct answer should transition to LEARNING');
  console.log('✅ Test 1 passed: First correct answer');
}

function testIncorrectAnswerReset() {
  const result = calculateSpacedRepetition({
    quality: 1,
    easinessFactor: 2.3,
    intervalDays: 6,
    repetitions: 2,
  });

  assert.strictEqual(result.intervalDays, 1, 'Incorrect answer should reset interval to 1 day');
  assert.strictEqual(result.repetitions, 0, 'Incorrect answer should reset repetitions to 0');
  assert.strictEqual(result.masteryStatus, 'NEW', 'Incorrect answer should reset status to NEW');
  console.log('✅ Test 2 passed: Incorrect answer resets interval');
}

function testMasteredStateTransition() {
  const result = calculateSpacedRepetition({
    quality: 5,
    easinessFactor: 2.6,
    intervalDays: 15,
    repetitions: 4,
  });

  assert.strictEqual(result.masteryStatus, 'MASTERED', '5th consecutive correct answer should reach MASTERED status');
  console.log('✅ Test 3 passed: Advanced correct answer reaches MASTERED state');
}

function runAllTests() {
  console.log('🧪 Running Unit Tests for Spaced Repetition (SM-2)...');
  testFirstCorrectAnswer();
  testIncorrectAnswerReset();
  testMasteredStateTransition();
  console.log('🎉 All Unit Tests Passed!');
}

runAllTests();
