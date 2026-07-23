import { calculateStreak } from '../src/lib/streak';
import assert from 'assert';

function testConsecutiveDaysStreak() {
  const activities = [
    { activityDate: '2026-07-21', answeredQuestions: 5 },
    { activityDate: '2026-07-22', answeredQuestions: 10 },
    { activityDate: '2026-07-23', answeredQuestions: 15 },
  ];

  const result = calculateStreak(activities, '2026-07-23');
  assert.strictEqual(result.currentStreak, 3, 'Current streak should be 3');
  assert.strictEqual(result.longestStreak, 3, 'Longest streak should be 3');
  assert.strictEqual(result.todayCompleted, 15, 'Today completed should be 15');
  console.log('✓ testConsecutiveDaysStreak Passed');
}

function testYesterdayStreakMaintained() {
  const activities = [
    { activityDate: '2026-07-21', answeredQuestions: 5 },
    { activityDate: '2026-07-22', answeredQuestions: 10 },
  ];

  const result = calculateStreak(activities, '2026-07-23');
  assert.strictEqual(result.currentStreak, 2, 'Current streak should be 2 when today not studied yet');
  assert.strictEqual(result.longestStreak, 2, 'Longest streak should be 2');
  assert.strictEqual(result.todayCompleted, 0, 'Today completed should be 0');
  console.log('✓ testYesterdayStreakMaintained Passed');
}

function testSkippedDayStreakReset() {
  const activities = [
    { activityDate: '2026-07-20', answeredQuestions: 5 },
    { activityDate: '2026-07-22', answeredQuestions: 10 },
  ];

  const result = calculateStreak(activities, '2026-07-24');
  assert.strictEqual(result.currentStreak, 0, 'Current streak should reset to 0 after skipped days');
  assert.strictEqual(result.longestStreak, 1, 'Longest streak should be 1');
  console.log('✓ testSkippedDayStreakReset Passed');
}

function runAllStreakTests() {
  console.log('\n--- Running Real Streak Unit Tests ---');
  testConsecutiveDaysStreak();
  testYesterdayStreakMaintained();
  testSkippedDayStreakReset();
  console.log('🎉 ALL STREAK TESTS PASSED!\n');
}

runAllStreakTests();
