import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface RawAnswer {
  id: number;
  text: string;
  is_correct: boolean;
}

interface RawQuestion {
  id: number;
  source_id: string;
  domain_code: string;
  text: string;
  explanation: string;
  question_type: 'single' | 'multiple';
  answers: RawAnswer[];
}

const DOMAINS = [
  { code: 'DOMAIN_1_390Q', name: 'Security & Compliance (390Q)', weightPercentage: 30 },
  { code: 'DOMAIN_2_390Q', name: 'Resilient Architectures (390Q)', weightPercentage: 26 },
  { code: 'DOMAIN_3_390Q', name: 'High Performance & Operations (390Q)', weightPercentage: 24 },
  { code: 'DOMAIN_4_390Q', name: 'Cost Optimization (390Q)', weightPercentage: 20 },
];

async function main() {
  const filePath = path.join(process.cwd(), 'question-json', 'questions_raw_SAA-C03-390Q.json');
  const questions: RawQuestion[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Remove the temporary bank created by the previous naming convention.
  // Related domains, questions and options are removed by Prisma cascades.
  await prisma.questionBank.deleteMany({
    where: { slug: 'aws-saa-c03-390q' },
  });

  const certification = await prisma.certification.upsert({
    where: { slug: 'aws-saa-c03-q390' },
    update: {
      code: 'SAA-C03-Q390',
      name: 'AWS Solutions Architect Associate',
    },
    create: {
      code: 'SAA-C03-Q390',
      name: 'AWS Solutions Architect Associate',
      slug: 'aws-saa-c03-q390',
      provider: 'AWS',
    },
  });

  const bank = await prisma.questionBank.upsert({
    where: { slug: 'saa-c03-q390' },
    update: {
      certificationId: certification.id,
      name: 'AWS Solutions Architect Associate Bank',
      version: 'v2.0',
      totalQuestions: questions.length,
    },
    create: {
      certificationId: certification.id,
      name: 'AWS Solutions Architect Associate Bank',
      slug: 'saa-c03-q390',
      version: 'v2.0',
      totalQuestions: questions.length,
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

  // Make reruns deterministic for this bank and avoid duplicating its questions.
  await prisma.question.deleteMany({ where: { questionBankId: bank.id } });

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
        tags: JSON.stringify([raw.source_id, raw.domain_code]),
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

  console.log(`Imported ${questions.length} questions into ${bank.slug}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => prisma.$disconnect());
