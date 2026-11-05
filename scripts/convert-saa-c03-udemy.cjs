const fs = require('fs');
const path = require('path');

const inputDir = path.join(process.cwd(), 'question_udemy');
const outputPath = path.join(process.cwd(), 'question-json', 'questions_raw_SAA-C03-UDEMY.json');

const domainCodes = {
  'Design Secure Architectures': 'DOMAIN_1_UDEMY',
  'Design Resilient Architectures': 'DOMAIN_2_UDEMY',
  'Design High-Performing Architectures': 'DOMAIN_3_UDEMY',
  'Design Cost-Optimized Architectures': 'DOMAIN_4_UDEMY',
};

const markerValues = new Set([
  'Lựa chọn đúng',
  'Lựa chọn của bạn đúng',
  'Lựa chọn của bạn không đúng',
  'Câu trả lời đúng',
  'Câu trả lời của bạn đúng',
  'Câu trả lời của bạn không đúng',
]);

function isMarker(line) {
  return markerValues.has(line.trim());
}

function markerMeansCorrect(marker) {
  return marker === 'Lựa chọn đúng' ||
    marker === 'Lựa chọn của bạn đúng' ||
    marker === 'Câu trả lời đúng' ||
    marker === 'Câu trả lời của bạn đúng';
}

function normalizedForMatch(value) {
  return value.replace(/\s+/g, '').replace(/\*\*/g, '');
}

function looksLikeEmbeddedCode(paragraph, followingParagraph) {
  const lines = paragraph.split('\n');
  const firstLine = lines[0].trim();
  const isYaml = lines.length > 1 && !firstLine.startsWith('{') && lines.some((line) => /^[A-Za-z][\w-]+:\s*$/.test(line.trim()));
  const nextLine = followingParagraph?.split('\n')[0]?.trim() || '';
  const isJsonBeforeMarkedOption = lines.length > 1 && firstLine.startsWith('{') && isMarker(nextLine) && !splitBalancedObjectOptions(paragraph);
  return isYaml || isJsonBeforeMarkedOption;
}

function splitQuestionSections(source) {
  const matches = [...source.matchAll(/^Câu hỏi (\d+)\s*$/gm)];
  return matches.map((match, index) => {
    const end = index + 1 < matches.length ? matches[index + 1].index : source.length;
    return { number: Number(match[1]), text: source.slice(match.index, end) };
  });
}

function nonEmptyLineAfter(source, index) {
  const lines = source.slice(index).split('\n');
  return lines.find((line) => line.trim().length > 0)?.trim() || '';
}

function splitParagraphs(text) {
  const markerPattern = [...markerValues]
    .sort((left, right) => right.length - left.length)
    .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const withMarkerBoundaries = text.replace(
    new RegExp(`\\n(?=(?:${markerPattern})\\s*(?:\\n|$))`, 'g'),
    '\n\n',
  );
  return withMarkerBoundaries
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function splitBalancedObjectOptions(value) {
  const objects = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  let escaped = false;
  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') inString = false;
      continue;
    }
    if (character === '"') {
      inString = true;
      continue;
    }
    if (character === '{') {
      if (depth === 0) start = index;
      depth += 1;
    } else if (character === '}' && depth > 0) {
      depth -= 1;
      if (depth === 0) {
        objects.push({ start, end: index + 1 });
        start = -1;
      }
    }
  }
  if (objects.length < 2) return null;

  const chunks = [];
  let previousEnd = 0;
  for (const object of objects) {
    const prefix = value.slice(previousEnd, object.start);
    const marker = prefix.split('\n').map((line) => line.trim()).find((line) => isMarker(line));
    chunks.push(`${marker ? `${marker}\n` : ''}${value.slice(object.start, object.end).trim()}`);
    previousEnd = object.end;
  }
  return chunks;
}

function parseQuestion(section, testNumber, fileName, globalId) {
  const explanationMatch = section.text.match(/^Giải thích tổng thể\s*$/m);
  const domainMatch = section.text.match(/^Lĩnh vực\s*$/m);
  if (!explanationMatch || !domainMatch || domainMatch.index < explanationMatch.index) {
    throw new Error(`Question ${testNumber}/${section.number} is missing explanation or domain`);
  }

  const beforeExplanation = section.text.slice(0, explanationMatch.index);
  const explanation = section.text
    .slice(explanationMatch.index + explanationMatch[0].length, domainMatch.index)
    .trim();
  const domainName = nonEmptyLineAfter(section.text, domainMatch.index + domainMatch[0].length);
  const domainCode = domainCodes[domainName];
  if (!domainCode) throw new Error(`Unknown domain on test ${testNumber}, question ${section.number}: ${domainName}`);

  const headerLines = beforeExplanation.replace(/\r/g, '').split('\n');
  if (!/^Câu hỏi \d+$/.test(headerLines[0].trim())) throw new Error(`Invalid header on test ${testNumber}, question ${section.number}`);

  const content = headerLines.slice(2).join('\n');
  const paragraphs = splitParagraphs(content);
  let questionEndIndex = paragraphs.findIndex((paragraph) => {
    const lastLine = paragraph.split('\n').at(-1).trim();
    return /(?:\?|\((?:select|choose)\s+[^)]*\))\s*$/i.test(lastLine);
  });
  if (questionEndIndex < 0) throw new Error(`Question ${testNumber}/${section.number} has no recognizable question stem`);

  while (
    questionEndIndex + 1 < paragraphs.length &&
    looksLikeEmbeddedCode(paragraphs[questionEndIndex + 1], paragraphs[questionEndIndex + 2])
  ) {
    questionEndIndex += 1;
  }
  const questionText = paragraphs.slice(0, questionEndIndex + 1).join('\n\n').trim();
  if (!questionText) throw new Error(`Question ${testNumber}/${section.number} has no question text`);

  const optionChunks = paragraphs.slice(questionEndIndex + 1).flatMap((paragraph) => {
    const objectChunks = splitBalancedObjectOptions(paragraph);
    return objectChunks || [paragraph];
  });
  const answers = [];
  let pendingMarker = null;
  for (const value of optionChunks) {
    const chunkLines = value.split('\n');
    let marker = pendingMarker;
    pendingMarker = null;
    if (isMarker(chunkLines[0])) marker = chunkLines.shift().trim();
    if (chunkLines.length === 0 && marker) {
      pendingMarker = marker;
      continue;
    }
    const text = chunkLines.join('\n').trim();
    if (!text) throw new Error(`Question ${testNumber}/${section.number} has an empty option`);
    answers.push({
      id: globalId * 10 + answers.length + 1,
      label: String.fromCharCode(65 + answers.length),
      text,
      is_correct: marker ? markerMeansCorrect(marker) : false,
      marker,
    });
  }

  if (answers.length < 2 || answers.length > 10) {
    throw new Error(`Question ${testNumber}/${section.number} has ${answers.length} options`);
  }
  const correctCount = answers.filter((answer) => answer.is_correct).length;
  if (correctCount < 1) throw new Error(`Question ${testNumber}/${section.number} has no correct answer`);

  const expectedMultiple = /\((?:select|choose)\s+(?:two|three|four|five)\b/i.test(questionText);
  if (expectedMultiple !== (correctCount > 1)) {
    throw new Error(`Question ${testNumber}/${section.number} answer count mismatch: ${correctCount} correct option(s), question text: ${questionText.slice(-80)}`);
  }

  for (const answer of answers.filter((candidate) => candidate.is_correct)) {
    if (!normalizedForMatch(explanation).includes(normalizedForMatch(answer.text))) {
      throw new Error(`Question ${testNumber}/${section.number} explanation does not contain correct answer: ${answer.text}`);
    }
  }

  return {
    id: globalId,
    source_id: `SAA_C03_UDEMY_TEST${testNumber}_Q${section.number}`,
    exam_set: testNumber,
    source_file: fileName,
    domain_code: domainCode,
    domain_name: domainName,
    text: questionText,
    explanation,
    question_type: correctCount > 1 ? 'multiple' : 'single',
    answers: answers.map(({ marker, ...answer }) => answer),
  };
}

const questions = [];
for (let testNumber = 1; testNumber <= 6; testNumber += 1) {
  const fileName = `test${testNumber}.txt`;
  const filePath = path.join(inputDir, fileName);
  const source = fs.readFileSync(filePath, 'utf8');
  const sections = splitQuestionSections(source);
  if (sections.length !== 65) throw new Error(`${fileName}: expected 65 questions, found ${sections.length}`);
  sections.forEach((section) => questions.push(parseQuestion(section, testNumber, fileName, questions.length + 1)));
}

if (questions.length !== 390) throw new Error(`Expected 390 questions, found ${questions.length}`);

fs.writeFileSync(outputPath, `${JSON.stringify(questions, null, 2)}\n`, 'utf8');

const domainCounts = questions.reduce((counts, question) => {
  counts[question.domain_code] = (counts[question.domain_code] || 0) + 1;
  return counts;
}, {});
const setCounts = questions.reduce((counts, question) => {
  counts[question.exam_set] = (counts[question.exam_set] || 0) + 1;
  return counts;
}, {});

console.log(`Wrote ${questions.length} questions to ${outputPath}`);
console.log('By exam set:', setCounts);
console.log('By domain:', domainCounts);
