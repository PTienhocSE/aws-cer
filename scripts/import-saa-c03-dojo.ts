import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface RawAnswer {
  id: number;
  label: string;
  text: string;
  is_correct: boolean;
}

interface RawQuestion {
  id: number;
  source_id: string;
  domain_code: string;
  domain_name: string;
  text: string;
  explanation: string;
  question_type: 'single' | 'multiple';
  service_tags?: string[];
  answers: RawAnswer[];
}

const DOMAINS = [
  { code: 'DOMAIN_1_DOJO', name: 'Design Secure Architectures', weightPercentage: 30 },
  { code: 'DOMAIN_2_DOJO', name: 'Design Resilient Architectures', weightPercentage: 26 },
  { code: 'DOMAIN_3_DOJO', name: 'Design High-Performing Architectures', weightPercentage: 24 },
  { code: 'DOMAIN_4_DOJO', name: 'Design Cost-Optimized Architectures', weightPercentage: 20 },
];

async function importQuestionSet(
  setSlug: string,
  bankName: string,
  version: string,
  fileName: string,
  expectedCount: number,
  certificationId: string,
  questionJsonDir: string,
) {
  const filePath = path.join(questionJsonDir, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const questions: RawQuestion[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (questions.length !== expectedCount) {
    throw new Error(`${setSlug}: expected ${expectedCount} questions, found ${questions.length}`);
  }

  const slug = `aws-saa-c03-dojo-${setSlug}`;
  const bank = await prisma.questionBank.upsert({
    where: { slug },
    update: {
      certificationId,
      name: bankName,
      version,
      totalQuestions: questions.length,
      description: `${bankName}, giữ trọn vẹn giải thích và liên kết tham khảo Tutorials Dojo chuẩn đề thi AWS SAA-C03.`,
      status: 'PUBLISHED',
    },
    create: {
      certificationId,
      name: bankName,
      slug,
      version,
      totalQuestions: questions.length,
      description: `${bankName}, giữ trọn vẹn giải thích và liên kết tham khảo Tutorials Dojo chuẩn đề thi AWS SAA-C03.`,
      status: 'PUBLISHED',
    },
  });

  const domainIds = new Map<string, string>();
  for (const domain of DOMAINS) {
    const id = `${bank.id}_${domain.code}`;
    const saved = await prisma.domain.upsert({
      where: { id },
      update: { name: domain.name, weightPercentage: domain.weightPercentage },
      create: { id, questionBankId: bank.id, ...domain },
    });
    domainIds.set(domain.code, saved.id);
  }

  await prisma.question.deleteMany({ where: { questionBankId: bank.id } });

  // Bulk / batch insert questions
  for (const raw of questions) {
    const domainId = domainIds.get(raw.domain_code);
    if (!domainId) throw new Error(`Unknown domain ${raw.domain_code} on ${raw.source_id}`);
    await prisma.question.create({
      data: {
        rawId: raw.id,
        questionBankId: bank.id,
        domainId,
        type: raw.question_type === 'multiple' ? 'MULTIPLE_CHOICE' : 'SINGLE_CHOICE',
        difficulty: raw.text.length > 500 ? 'HARD' : raw.text.length > 300 ? 'MEDIUM' : 'EASY',
        questionText: raw.text,
        explanationText: raw.explanation,
        tags: JSON.stringify([
          raw.source_id,
          `SAA-C03-DOJO-${setSlug.toUpperCase()}`,
          raw.domain_code,
          ...(raw.service_tags || []),
        ]),
        options: {
          create: raw.answers.map((answer) => ({
            rawId: answer.id,
            text: answer.text,
            isCorrect: answer.is_correct,
          })),
        },
      },
    });
  }

  console.log(`✓ Imported ${setSlug}: ${questions.length} questions into ${slug}`);
}

async function main() {
  const questionJsonDir = path.join(process.cwd(), 'question-json');
  const certification = await prisma.certification.upsert({
    where: { slug: 'aws-saa-c03' },
    update: { code: 'SAA-C03', name: 'AWS Certified Solutions Architect – Associate' },
    create: {
      code: 'SAA-C03',
      name: 'AWS Certified Solutions Architect – Associate',
      slug: 'aws-saa-c03',
      provider: 'AWS',
    },
  });

  console.log('🚀 Importing Dojo Question Banks into database...');

  // 1. Combined set (390 questions across all 6 tests)
  await importQuestionSet(
    'all',
    'SAA-C03-DOJO — 390 câu tổng hợp',
    'v1.0-dojo-all',
    'questions_raw_SAA-C03-DOJO.json',
    390,
    certification.id,
    questionJsonDir,
  );

  // 2. Individual tests 1..6
  for (let examNumber = 1; examNumber <= 6; examNumber += 1) {
    await importQuestionSet(
      `test${examNumber}`,
      `SAA-C03-DOJO — Đề thi ${examNumber}`,
      `v1.0-dojo-test${examNumber}`,
      `questions_raw_SAA-C03-DOJO-TEST${examNumber}.json`,
      65,
      certification.id,
      questionJsonDir,
    );
  }

  console.log('🎉 Successfully imported 390-question combined bank and 6 independent SAA-C03-DOJO exams!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
