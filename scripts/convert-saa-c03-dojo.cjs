const fs = require('fs');
const path = require('path');

const inputDir = path.join(process.cwd(), 'question_dojo');
const jsonDir = path.join(process.cwd(), 'question-json');

const domainCodes = {
  'Design Secure Architectures': 'DOMAIN_1_DOJO',
  'Design Secure Applications and Architectures': 'DOMAIN_1_DOJO',
  'Design Resilient Architectures': 'DOMAIN_2_DOJO',
  'Design High-Performing Architectures': 'DOMAIN_3_DOJO',
  'Design Cost-Optimized Architectures': 'DOMAIN_4_DOJO',
};

const domainDisplayNames = {
  'DOMAIN_1_DOJO': 'Design Secure Architectures',
  'DOMAIN_2_DOJO': 'Design Resilient Architectures',
  'DOMAIN_3_DOJO': 'Design High-Performing Architectures',
  'DOMAIN_4_DOJO': 'Design Cost-Optimized Architectures',
};

function parseSection(sec, testNumber, sectionNumber, globalId, fileName) {
  const choicesMarker = 'CÁC LỰA CHỌN:';
  const cIdx = sec.indexOf(choicesMarker);
  if (cIdx === -1) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: missing 'CÁC LỰA CHỌN:'`);
  }

  const secAfterChoices = sec.slice(cIdx + choicesMarker.length);
  const nextQMatch = secAfterChoices.match(/\n\s*Câu hỏi \d+/);
  if (!nextQMatch) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: missing second 'Câu hỏi' header`);
  }

  const choicesBlock = secAfterChoices.slice(0, nextQMatch.index).trim();
  const afterNextQ = secAfterChoices.slice(nextQMatch.index);

  const thuGonIdx = afterNextQ.indexOf('Thu gọn');
  if (thuGonIdx === -1) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: missing 'Thu gọn'`);
  }

  const explIdx = afterNextQ.indexOf('Giải thích tổng thể', thuGonIdx);
  if (explIdx === -1) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: missing 'Giải thích tổng thể'`);
  }

  const linhVucIdx = afterNextQ.lastIndexOf('Lĩnh vực');
  if (linhVucIdx === -1 || linhVucIdx < explIdx) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: missing 'Lĩnh vực'`);
  }

  // 1. Parse choices cleanly preserving multi-line content
  const choiceChunks = choicesBlock.split(/(?=^\[[^\]]*\]\s*[A-Z]\.)/m).map(c => c.trim()).filter(Boolean);
  const choices = [];
  for (const chunk of choiceChunks) {
    const m = chunk.match(/^\[([^\]]*)\]\s*([A-Z])\.\s*([\s\S]*)$/);
    if (!m) {
      throw new Error(`Test ${testNumber} Q${sectionNumber}: cannot parse choice chunk: ${chunk.slice(0, 60)}`);
    }
    choices.push({
      label: m[2],
      text: m[3].trim(),
      isCorrect: m[1].includes('ĐÁP ÁN ĐÚNG'),
    });
  }

  if (choices.length < 2) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: invalid choices count (${choices.length})`);
  }

  const correctCount = choices.filter(c => c.isCorrect).length;
  if (correctCount === 0) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: no correct choice found`);
  }

  // 2. Parse body (tags, question text)
  const bodyPart = afterNextQ.slice(thuGonIdx + 'Thu gọn'.length, explIdx).trim();

  // Find where choices[0] begins in bodyPart such that choices[1] immediately follows it
  let p0 = -1;
  let from = 0;
  while (true) {
    const i = bodyPart.indexOf(choices[0].text, from);
    if (i === -1) break;
    const after = bodyPart.slice(i + choices[0].text.length).trim();
    if (after.startsWith(choices[1].text)) {
      p0 = i;
      break;
    }
    from = i + 1;
  }

  if (p0 === -1) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: cannot find boundary between question and options in body`);
  }

  const stemPart = bodyPart.slice(0, p0).trim();
  const paragraphs = stemPart.split(/\r?\n\s*\r?\n/).map(p => p.trim()).filter(Boolean);
  if (paragraphs.length === 0) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: empty question stem`);
  }

  const linesP0 = paragraphs[0].split('\n').map(l => l.trim()).filter(Boolean);
  const isTagBlock = paragraphs.length > 1 && linesP0.every(l => l.length < 50 && !/[.!?]$/.test(l));

  let serviceTags = [];
  let questionText = '';
  if (isTagBlock) {
    serviceTags = linesP0;
    questionText = paragraphs.slice(1).join('\n\n');
  } else {
    questionText = paragraphs.join('\n\n');
  }

  // 3. Parse explanation
  const explanation = afterNextQ.slice(explIdx + 'Giải thích tổng thể'.length, linhVucIdx).trim();
  if (!explanation) {
    throw new Error(`Test ${testNumber} Q${sectionNumber}: empty explanation`);
  }

  // 4. Parse domain
  const rawDomain = afterNextQ.slice(linhVucIdx + 'Lĩnh vực'.length).trim().split('\n')[0].trim();
  let domainCode = domainCodes[rawDomain];
  if (!domainCode) {
    if (rawDomain === 'unknown') {
      // In test6 Q45: S3 cost-effective storage class selection -> Cost-Optimized Architectures
      domainCode = 'DOMAIN_4_DOJO';
    } else {
      throw new Error(`Test ${testNumber} Q${sectionNumber}: unknown domain '${rawDomain}'`);
    }
  }
  const domainName = domainDisplayNames[domainCode];

  return {
    id: globalId,
    source_id: `SAA_C03_DOJO_TEST${testNumber}_Q${sectionNumber}`,
    exam_set: testNumber,
    source_file: fileName,
    domain_code: domainCode,
    domain_name: domainName,
    text: questionText,
    explanation,
    question_type: correctCount > 1 ? 'multiple' : 'single',
    service_tags: serviceTags,
    answers: choices.map((c, idx) => ({
      id: globalId * 10 + (idx + 1),
      label: c.label,
      text: c.text,
      is_correct: c.isCorrect,
    })),
  };
}

function main() {
  console.log('🚀 Starting conversion of Tutorials Dojo tests (1-6)...');

  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
  }

  const allQuestions = [];
  const manifest = [];

  for (let testNumber = 1; testNumber <= 6; testNumber++) {
    const fileName = `test${testNumber}dojo.txt`;
    const filePath = path.join(inputDir, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const sections = content.split(/^={20,}\r?\n/m).filter(s => s.trim().length > 0);

    if (sections.length !== 65) {
      throw new Error(`${fileName}: expected 65 questions, found ${sections.length}`);
    }

    const testQuestions = [];
    sections.forEach((sec, idx) => {
      const q = parseSection(sec, testNumber, idx + 1, allQuestions.length + 1, fileName);
      testQuestions.push(q);
      allQuestions.push(q);
    });

    const testJsonPath = path.join(jsonDir, `questions_raw_SAA-C03-DOJO-TEST${testNumber}.json`);
    fs.writeFileSync(testJsonPath, JSON.stringify(testQuestions, null, 2), 'utf8');
    console.log(`✓ Test ${testNumber}: parsed ${testQuestions.length} questions -> ${path.basename(testJsonPath)}`);

    manifest.push({
      exam_set: testNumber,
      name: `SAA-C03-DOJO — Đề thi ${testNumber}`,
      file: `questions_raw_SAA-C03-DOJO-TEST${testNumber}.json`,
      question_count: testQuestions.length,
    });
  }

  const combinedJsonPath = path.join(jsonDir, 'questions_raw_SAA-C03-DOJO.json');
  fs.writeFileSync(combinedJsonPath, JSON.stringify(allQuestions, null, 2), 'utf8');
  console.log(`✓ Combined: saved ${allQuestions.length} questions -> ${path.basename(combinedJsonPath)}`);

  const manifestPath = path.join(jsonDir, 'SAA-C03-DOJO-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`✓ Manifest: saved -> ${path.basename(manifestPath)}`);

  // Domain statistics
  const domainCounts = allQuestions.reduce((acc, q) => {
    acc[q.domain_code] = (acc[q.domain_code] || 0) + 1;
    return acc;
  }, {});

  console.log('\n📊 Summary statistics:');
  console.log(`Total questions: ${allQuestions.length}`);
  console.log('By domain:');
  for (const [code, count] of Object.entries(domainCounts)) {
    console.log(`  - ${code} (${domainDisplayNames[code]}): ${count} questions (${Math.round((count / allQuestions.length) * 100)}%)`);
  }
}

main();
