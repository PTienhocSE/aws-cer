const { execSync } = require('child_process');

console.log('========================================');
console.log('🧪 AWS CertPrep Platform Test Runner');
console.log('========================================\n');

try {
  console.log('Running SM-2 Spaced Repetition Algorithm Tests...');
  execSync('npx ts-node --compiler-options "{\\"module\\":\\"commonjs\\"}" test/spaced-repetition.test.ts', { stdio: 'inherit' });

  console.log('\nRunning Real Streak Calculation Unit Tests...');
  execSync('npx ts-node --compiler-options "{\\"module\\":\\"commonjs\\"}" test/streak.test.ts', { stdio: 'inherit' });

  console.log('\nRunning Practice Selection & Domain Resume Tests...');
  execSync('npx ts-node --compiler-options "{\\"module\\":\\"commonjs\\"}" test/practice-selection.test.ts', { stdio: 'inherit' });

  console.log('\n✅ ALL PLATFORM UNIT TESTS PASSED SUCCESSFULLY!');
} catch (error) {
  console.error('\n❌ TEST FAILURE:', error.message);
  process.exit(1);
}
