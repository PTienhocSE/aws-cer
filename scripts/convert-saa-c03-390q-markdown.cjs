const fs = require('fs');
const path = require('path');

const inputPath = path.join(process.cwd(), 'docs', 'exam-1.md');
const outputPath = path.join(process.cwd(), 'question-json', 'questions_raw_SAA-C03-390Q.json');

function categorizeDomain(text) {
  const lower = text.toLowerCase();
  if (/(kms|iam|encrypt|security|cognito|waf|shield|compliance|policy)/.test(lower)) return 'DOMAIN_1_390Q';
  if (/(multi-az|auto scaling|failover|disaster recovery|route 53|aurora global|backup|resilien)/.test(lower)) return 'DOMAIN_2_390Q';
  if (/(lambda|performance|cache|cloudfront|elasticache|sqs|kinesis|throughput)/.test(lower)) return 'DOMAIN_3_390Q';
  return 'DOMAIN_4_390Q';
}

const markdown = fs.readFileSync(inputPath, 'utf8');
const blocks = markdown.split(/^## Question\s+/m).slice(1);

const questions = blocks.map((block, index) => {
  const idMatch = block.match(/^(\d+)\s*\r?\n/);
  if (!idMatch) throw new Error(`Cannot read question number in block ${index + 1}`);

  const id = Number(idMatch[1]);
  const body = block.slice(idMatch[0].length).split(/^\s*---\s*$/m)[0].trim();
  const answerMatch = body.match(/^\*\*Answer:\*\*\s*([A-Z](?:\s*,\s*[A-Z])*)\s*$/m);
  if (!answerMatch) throw new Error(`Question ${id} has no answer`);

  const beforeAnswer = body.slice(0, answerMatch.index).trim();
  const explanationMarker = body.match(/^\*\*Explanation:\*\*\s*$/m);
  const explanation = explanationMarker
    ? body.slice(explanationMarker.index + explanationMarker[0].length).trim()
    : '';

  const optionRegex = /^-\s+\*\*([A-Z])\.\*\*\s+([\s\S]*?)(?=^-\s+\*\*[A-Z]\.\*\*|\s*$)/gm;
  const options = [];
  let optionMatch;
  while ((optionMatch = optionRegex.exec(beforeAnswer)) !== null) {
    options.push({ label: optionMatch[1], text: optionMatch[2].replace(/\s*✅\s*$/, '').trim() });
  }
  if (options.length < 2) throw new Error(`Question ${id} has only ${options.length} options`);

  const firstOptionIndex = beforeAnswer.search(/^-\s+\*\*[A-Z]\.\*\*/m);
  const text = beforeAnswer.slice(0, firstOptionIndex).trim();
  const correctLabels = new Set(answerMatch[1].split(',').map((label) => label.trim()));

  return {
    id,
    source_id: `SAA_C03_390Q_${id}`,
    domain_code: categorizeDomain(text),
    text,
    explanation,
    question_type: correctLabels.size > 1 ? 'multiple' : 'single',
    answers: options.map((option, optionIndex) => ({
      id: id * 10 + optionIndex + 1,
      label: option.label,
      text: option.text,
      is_correct: correctLabels.has(option.label),
    })),
  };
});

if (questions.length !== 390) throw new Error(`Expected 390 questions, found ${questions.length}`);
fs.writeFileSync(outputPath, `${JSON.stringify(questions, null, 2)}\n`, 'utf8');

const counts = questions.reduce((result, question) => {
  result[question.domain_code] = (result[question.domain_code] || 0) + 1;
  return result;
}, {});
console.log(`Wrote ${questions.length} questions to ${outputPath}`);
console.log(counts);
