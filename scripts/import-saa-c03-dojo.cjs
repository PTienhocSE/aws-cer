const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DOMAINS = [
  { code: 'DOMAIN_1_DOJO', name: 'Design Secure Architectures', weightPercentage: 30 },
  { code: 'DOMAIN_2_DOJO', name: 'Design Resilient Architectures', weightPercentage: 26 },
  { code: 'DOMAIN_3_DOJO', name: 'Design High-Performing Architectures', weightPercentage: 24 },
  { code: 'DOMAIN_4_DOJO', name: 'Design Cost-Optimized Architectures', weightPercentage: 20 },
];

async function importQuestionSet({
  setSlug,
  bankName,
  version,
  fileName,
  expectedCount,
  certificationId,
  questionJsonDir,
}) {
  const filePath = path.join(questionJsonDir, fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (questions.length !== expectedCount) {
    throw new Error(`${setSlug}: expected ${expectedCount} questions, found ${questions.length}`);
  }

  const slug = `aws-saa-c03-dojo-${setSlug}`;
  console.log(`\n📦 Importing ${bankName} [${slug}] (${version})...`);

  const bank = await prisma.questionBank.upsert({
    where: { slug },
    update: {
      certificationId,
      name: bankName,
      version,
      totalQuestions: questions.length,
      description: `${bankName}, giữ English explanation đầy đủ từ Tutorials Dojo.`,
      status: 'PUBLISHED',
    },
    create: {
      certificationId,
      name: bankName,
      slug,
      version,
      totalQuestions: questions.length,
      description: `${bankName}, giữ English explanation đầy đủ từ Tutorials Dojo.`,
      status: 'PUBLISHED',
    },
  });

  const domainIds = new Map();
  for (const domain of DOMAINS) {
    const id = `${bank.id}_${domain.code}`;
    const saved = await prisma.domain.upsert({
      where: { id },
      update: { name: domain.name, weightPercentage: domain.weightPercentage },
      create: { id, questionBankId: bank.id, ...domain },
    });
    domainIds.set(domain.code, saved.id);
  }

  // Delete existing questions for idempotent re-import
  const deleted = await prisma.question.deleteMany({ where: { questionBankId: bank.id } });
  if (deleted.count > 0) {
    console.log(`   Cleaned up ${deleted.count} old questions from ${slug}`);
  }

  // Batch insert questions
  const BATCH_SIZE = 25;
  let importedCount = 0;

  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const chunk = questions.slice(i, i + BATCH_SIZE);

    await Promise.all(
      chunk.map(async (raw) => {
        const domainId = domainIds.get(raw.domain_code);
        if (!domainId) throw new Error(`Unknown domain ${raw.domain_code} on ${raw.source_id}`);

        const tags = [
          raw.source_id,
          `SAA-C03-DOJO-${setSlug.toUpperCase()}`,
          raw.domain_code,
          ...(raw.service_tags || []),
        ];

        return prisma.question.create({
          data: {
            rawId: raw.id,
            questionBankId: bank.id,
            domainId,
            type: raw.question_type === 'multiple' ? 'MULTIPLE_CHOICE' : 'SINGLE_CHOICE',
            difficulty: raw.text.length > 500 ? 'HARD' : raw.text.length > 300 ? 'MEDIUM' : 'EASY',
            questionText: raw.text,
            explanationText: raw.explanation,
            tags: JSON.stringify(tags),
            options: {
              create: raw.answers.map((answer) => ({
                rawId: answer.id,
                text: answer.text,
                isCorrect: answer.is_correct,
              })),
            },
          },
        });
      })
    );

    importedCount += chunk.length;
    process.stdout.write(`\r   -> Progress: ${importedCount} / ${questions.length} questions (${Math.round((importedCount / questions.length) * 100)}%)`);
  }

  console.log(`\n✓ Successfully imported ${questions.length} questions into ${slug}`);
  return bank;
}

async function main() {
  console.log('🚀 Starting SAA-C03 Tutorials Dojo Question Banks import (Tests 1-6 + Combined)...');

  const questionJsonDir = path.join(process.cwd(), 'question-json');

  // 1. Ensure SAA-C03 certification exists
  const certification = await prisma.certification.upsert({
    where: { slug: 'aws-saa-c03' },
    update: {
      code: 'SAA-C03',
      name: 'AWS Certified Solutions Architect – Associate',
    },
    create: {
      code: 'SAA-C03',
      name: 'AWS Certified Solutions Architect – Associate',
      slug: 'aws-saa-c03',
      provider: 'AWS',
    },
  });
  console.log(`✓ Certification: ${certification.code} (${certification.id})`);

  const createdBanks = [];

  // 2. Import 6 individual tests
  for (let examNumber = 1; examNumber <= 6; examNumber++) {
    const bank = await importQuestionSet({
      setSlug: `test${examNumber}`,
      bankName: `SAA-C03-DOJO — Đề thi ${examNumber}`,
      version: `v1.0-dojo-test${examNumber}`,
      fileName: `questions_raw_SAA-C03-DOJO-TEST${examNumber}.json`,
      expectedCount: 65,
      certificationId: certification.id,
      questionJsonDir,
    });
    createdBanks.push(bank);
  }

  // 3. Import combined bank (all 390 questions)
  const combinedBank = await importQuestionSet({
    setSlug: 'all',
    bankName: 'SAA-C03-DOJO — 390 câu tổng hợp',
    version: 'v1.0-dojo-all',
    fileName: 'questions_raw_SAA-C03-DOJO.json',
    expectedCount: 390,
    certificationId: certification.id,
    questionJsonDir,
  });
  createdBanks.push(combinedBank);

  // 4. Enroll active users to newly created banks so they can practice immediately
  const users = await prisma.user.findMany({ select: { id: true, email: true } });
  for (const user of users) {
    for (const bank of createdBanks) {
      await prisma.userQuestionBankEnrollment.upsert({
        where: {
          userId_questionBankId: {
            userId: user.id,
            questionBankId: bank.id,
          },
        },
        update: { status: 'ACTIVE' },
        create: {
          userId: user.id,
          questionBankId: bank.id,
          status: 'ACTIVE',
        },
      });
    }
    console.log(`✓ Enrolled user ${user.email} into all SAA-C03-DOJO banks`);
  }

  console.log('\n🎉 ALL DONE: Successfully imported 6 SAA-C03-DOJO test sets + 1 combined bank (390 questions) into database!');
}

main()
  .catch((err) => {
    console.error('\n❌ Import error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
