import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface RawAnswer { id: number; text: string; is_correct: boolean; }
interface RawQuestion { id: number; text: string; explanation?: string; question_type: string; answers: RawAnswer[]; }
interface ImportConfig { filePath: string; certCode: string; certName: string; certSlug: string; provider: string; bankName: string; bankSlug: string; version: string; }

function categorizeDomain(text: string): { code: string; name: string } {
  const lower = text.toLowerCase();
  if (lower.includes('kms') || lower.includes('iam') || lower.includes('encrypt') || lower.includes('security') || lower.includes('cognito') || lower.includes('waf') || lower.includes('shield') || lower.includes('compliance') || lower.includes('policy'))
    return { code: 'DOMAIN_1', name: 'Security & Compliance' };
  if (lower.includes('multi-az') || lower.includes('auto scaling') || lower.includes('failover') || lower.includes('disaster recovery') || lower.includes('route 53') || lower.includes('aurora global') || lower.includes('backup') || lower.includes('resiliency'))
    return { code: 'DOMAIN_2', name: 'Resilient Architectures' };
  if (lower.includes('lambda') || lower.includes('performance') || lower.includes('cache') || lower.includes('cloudfront') || lower.includes('elasticache') || lower.includes('sqs') || lower.includes('kinesis') || lower.includes('throughput'))
    return { code: 'DOMAIN_3', name: 'High Performance & Operations' };
  return { code: 'DOMAIN_4', name: 'Cost Optimization' };
}

function buildExplanation(q: RawQuestion): string {
  const correct = q.answers.filter(a => a.is_correct);
  const wrong = q.answers.filter(a => !a.is_correct);
  let parts: string[] = [];
  if (correct.length) parts.push(`### Đáp án đúng\n${correct.map(a => `- ${a.text}`).join('\n')}`);
  if (q.explanation) parts.push(`### Giải thích\n${q.explanation}`);
  if (wrong.length) parts.push(`### Vì sao các đáp án khác không phù hợp?\n${wrong.map((a, i) => `- **Lựa chọn ${i + 1}**: ${a.text}`).join('\n')}`);
  return parts.join('\n\n');
}

const BATCH_SIZE = 50;

async function importBank(config: ImportConfig) {
  console.log(`\n========================================`);
  console.log(`🚀 Processing: ${config.certName} (${config.certCode})`);
  console.log(`========================================`);

  const cert = await prisma.certification.upsert({
    where: { slug: config.certSlug },
    update: { name: config.certName, code: config.certCode },
    create: { code: config.certCode, name: config.certName, slug: config.certSlug, provider: config.provider, status: 'PUBLISHED' },
  });

  const bank = await prisma.questionBank.upsert({
    where: { slug: config.bankSlug },
    update: { name: config.bankName },
    create: { certificationId: cert.id, name: config.bankName, slug: config.bankSlug, version: config.version, status: 'PUBLISHED' },
  });

  const domainsData = [
    { code: 'DOMAIN_1', name: 'Security & Compliance', weightPercentage: 30 },
    { code: 'DOMAIN_2', name: 'Resilient Architectures', weightPercentage: 26 },
    { code: 'DOMAIN_3', name: 'High Performance & Operations', weightPercentage: 24 },
    { code: 'DOMAIN_4', name: 'Cost Optimization', weightPercentage: 20 },
  ];

  const domainMap: Record<string, string> = {};
  for (const d of domainsData) {
    const domain = await prisma.domain.upsert({
      where: { id: `${bank.id}_${d.code}` },
      update: {},
      create: { id: `${bank.id}_${d.code}`, questionBankId: bank.id, code: d.code, name: d.name, weightPercentage: d.weightPercentage },
    });
    domainMap[d.code] = domain.id;
  }

  if (!fs.existsSync(config.filePath)) { console.error(`❌ File not found: ${config.filePath}`); return; }

  const rawQuestions: RawQuestion[] = JSON.parse(fs.readFileSync(config.filePath, 'utf-8'));
  const valid = rawQuestions.filter(q => q.text && q.answers?.length > 0);

  console.log(`   📦 ${valid.length} questions — inserting in batches of ${BATCH_SIZE}...`);

  // Batch insert questions
  for (let i = 0; i < valid.length; i += BATCH_SIZE) {
    const batch = valid.slice(i, i + BATCH_SIZE);
    const domainInfo = categorizeDomain(batch[0].text);

    // Insert questions in batch
    const questionsToCreate = batch.map(q => {
      const di = categorizeDomain(q.text);
      const isMultiple = q.question_type === 'multiple' || q.answers.filter(a => a.is_correct).length > 1;
      return {
        rawId: q.id,
        questionBankId: bank.id,
        domainId: domainMap[di.code],
        type: isMultiple ? 'MULTIPLE_CHOICE' : 'SINGLE_CHOICE',
        difficulty: q.text.length > 500 ? 'HARD' : q.text.length > 300 ? 'MEDIUM' : 'EASY',
        questionText: q.text,
        explanationText: buildExplanation(q),
        tags: JSON.stringify([di.code]),
      };
    });

    const createdQuestions = await prisma.$transaction(
      questionsToCreate.map(q => prisma.question.create({ data: q, select: { id: true, rawId: true } }))
    );

    // Map rawId -> DB id for options
    const rawIdToDbId = new Map(createdQuestions.map(q => [q.rawId, q.id]));

    // Batch insert all options for this batch
    const allOptions = batch.flatMap(q => {
      const dbId = rawIdToDbId.get(q.id);
      if (!dbId) return [];
      return q.answers.map(ans => ({ questionId: dbId, rawId: ans.id, text: ans.text, isCorrect: ans.is_correct }));
    });

    await prisma.questionOption.createMany({ data: allOptions, skipDuplicates: true });

    const done = Math.min(i + BATCH_SIZE, valid.length);
    console.log(`   ✓ ${done}/${valid.length} questions imported`);
  }

  await prisma.questionBank.update({ where: { id: bank.id }, data: { totalQuestions: valid.length } });
  console.log(`✅ Done: ${cert.name} — ${valid.length} questions`);
}

async function runAll() {
  const jsonDir = path.join(process.cwd(), 'question-json');
  const files: ImportConfig[] = [
    { filePath: path.join(jsonDir, 'questions_raw_CLF-C02.json'), certCode: 'CLF-C02', certName: 'AWS Certified Cloud Practitioner', certSlug: 'aws-clf-c02', provider: 'AWS', bankName: 'AWS Cloud Practitioner Bank', bankSlug: 'aws-clf-c02-v1', version: 'v1.0' },
    { filePath: path.join(jsonDir, 'questions_raw_DEA-C01.json'), certCode: 'DEA-C01', certName: 'AWS Certified Data Engineer – Associate', certSlug: 'aws-dea-c01', provider: 'AWS', bankName: 'AWS Data Engineer Associate Bank', bankSlug: 'aws-dea-c01-v1', version: 'v1.0' },
    { filePath: path.join(jsonDir, 'questions_raw_DVA-C02.json'), certCode: 'DVA-C02', certName: 'AWS Certified Developer – Associate', certSlug: 'aws-dva-c02', provider: 'AWS', bankName: 'AWS Developer Associate Bank', bankSlug: 'aws-dva-c02-v1', version: 'v1.0' },
    { filePath: path.join(jsonDir, 'questions_raw_MLA-C01.json'), certCode: 'MLA-C01', certName: 'AWS Certified Machine Learning Engineer – Associate', certSlug: 'aws-mla-c01', provider: 'AWS', bankName: 'AWS ML Engineer Associate Bank', bankSlug: 'aws-mla-c01-v1', version: 'v1.0' },
    { filePath: path.join(jsonDir, 'questions_raw_SAA-C03.json'), certCode: 'SAA-C03', certName: 'AWS Certified Solutions Architect – Associate', certSlug: 'aws-saa-c03', provider: 'AWS', bankName: 'AWS Solutions Architect Associate Bank', bankSlug: 'aws-saa-c03-v1', version: 'v1.0' },
    { filePath: path.join(jsonDir, 'questions_raw_SAP-C02.json'), certCode: 'SAP-C02', certName: 'AWS Certified Solutions Architect – Professional', certSlug: 'aws-sap-c02', provider: 'AWS', bankName: 'AWS Solutions Architect Professional Bank', bankSlug: 'aws-sap-c02-v1', version: 'v1.0' },
    { filePath: path.join(jsonDir, 'questions_raw_SOA-C02.json'), certCode: 'SOA-C02', certName: 'AWS Certified SysOps Administrator – Associate', certSlug: 'aws-soa-c02', provider: 'AWS', bankName: 'AWS SysOps Administrator Associate Bank', bankSlug: 'aws-soa-c02-v1', version: 'v1.0' },
  ];

  const passwordHash = '$2a$10$wW10jVw.g53QW5r9O0bH/./X3NfC5V7e8D8E9F0G1H2I3J4K5L6M7';
  await prisma.user.upsert({ where: { email: 'demo@aws.com' }, update: {}, create: { email: 'demo@aws.com', passwordHash, name: 'AWS Learner Demo' } });

  for (const cfg of files) { await importBank(cfg); }
  console.log(`\n🎉 ALL QUESTION BANKS IMPORTED SUCCESSFULLY!`);
}

runAll()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
