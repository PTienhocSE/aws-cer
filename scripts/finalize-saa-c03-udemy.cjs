const fs = require('fs');
const path = require('path');

const jsonDir = path.join(process.cwd(), 'question-json');
const combinedPath = path.join(jsonDir, 'questions_raw_SAA-C03-UDEMY.json');
const sourceQuestions = JSON.parse(fs.readFileSync(combinedPath, 'utf8'));

const explanations = new Map();
for (let examNumber = 1; examNumber <= 6; examNumber += 1) {
  const filePath = path.join(jsonDir, `saa-c03-udemy-test${examNumber}-explanations-vi.json`);
  const entries = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (entries.length !== 65) throw new Error(`Exam ${examNumber}: expected 65 Vietnamese explanations, found ${entries.length}`);
  for (const entry of entries) {
    if (!entry.id || typeof entry.explanation_vi !== 'string' || entry.explanation_vi.trim().length < 500) {
      throw new Error(`Exam ${examNumber}: invalid Vietnamese explanation for id ${entry.id}`);
    }
    if (explanations.has(entry.id)) throw new Error(`Duplicate Vietnamese explanation id ${entry.id}`);
    explanations.set(entry.id, entry.explanation_vi.trim());
  }
}

if (sourceQuestions.length !== 390) throw new Error(`Expected 390 source questions, found ${sourceQuestions.length}`);
if (explanations.size !== 390) throw new Error(`Expected 390 explanations, found ${explanations.size}`);

const merged = sourceQuestions.map((question) => {
  const explanationVi = explanations.get(question.id);
  if (!explanationVi) throw new Error(`Missing Vietnamese explanation for id ${question.id}`);
  const explanationEn = question.explanation_en || question.explanation;
  return {
    ...question,
    explanation_en: explanationEn,
    explanation_vi: explanationVi,
    explanation: `${explanationEn}\n\n==================== GIẢI THÍCH TIẾNG VIỆT THEO FORMAT ====================\n\n${explanationVi}`,
  };
});

fs.writeFileSync(combinedPath, `${JSON.stringify(merged, null, 2)}\n`, 'utf8');
for (let examNumber = 1; examNumber <= 6; examNumber += 1) {
  const testQuestions = merged.filter((question) => question.exam_set === examNumber);
  if (testQuestions.length !== 65) throw new Error(`Exam ${examNumber}: expected 65 merged questions, found ${testQuestions.length}`);
  const testPath = path.join(jsonDir, `questions_raw_SAA-C03-UDEMY-TEST${examNumber}.json`);
  fs.writeFileSync(testPath, `${JSON.stringify(testQuestions, null, 2)}\n`, 'utf8');
}

const manifest = Array.from({ length: 6 }, (_, index) => ({
  exam_set: index + 1,
  name: `SAA-C03-UDEMY — Đề thi ${index + 1}`,
  file: `questions_raw_SAA-C03-UDEMY-TEST${index + 1}.json`,
  question_count: 65,
}));
fs.writeFileSync(path.join(jsonDir, 'SAA-C03-UDEMY-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log('Merged English + Vietnamese explanations for 390 questions.');
console.log('Wrote 6 independent exam files with 65 questions each.');
