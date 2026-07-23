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
  text: string;
  explanation?: string;
  question_type: string;
  answers: RawAnswer[];
  comment_count?: number;
}

interface ImportConfig {
  filePath: string;
  certCode: string;
  certName: string;
  certSlug: string;
  provider: string;
  bankName: string;
  bankSlug: string;
  version: string;
}

function categorizeDomain(text: string): { code: string; name: string } {
  const lower = text.toLowerCase();
  if (
    lower.includes('kms') ||
    lower.includes('iam') ||
    lower.includes('encrypt') ||
    lower.includes('security') ||
    lower.includes('vault') ||
    lower.includes('policy') ||
    lower.includes('cognito') ||
    lower.includes('waf') ||
    lower.includes('shield') ||
    lower.includes('compliance')
  ) {
    return { code: 'DOMAIN_1', name: 'Security & Compliance' };
  }
  if (
    lower.includes('multi-az') ||
    lower.includes('auto scaling') ||
    lower.includes('failover') ||
    lower.includes('disaster recovery') ||
    lower.includes('route 53') ||
    lower.includes('aurora global') ||
    lower.includes('backup') ||
    lower.includes('resiliency')
  ) {
    return { code: 'DOMAIN_2', name: 'Resilient Architectures' };
  }
  if (
    lower.includes('cost') ||
    lower.includes('savings plan') ||
    lower.includes('reserved instance') ||
    lower.includes('spot') ||
    lower.includes('snowball') ||
    lower.includes('glacier') ||
    lower.includes('budget')
  ) {
    return { code: 'DOMAIN_4', name: 'Cost Optimization' };
  }
  return { code: 'DOMAIN_3', name: 'High Performance & Operations' };
}

function generateStructuredExplanation(q: RawQuestion): string {
  if (q.explanation && q.explanation.trim().length > 10) {
    return q.explanation;
  }

  const correctAnswers = q.answers.filter((a) => a.is_correct).map((a) => a.text);
  const incorrectAnswers = q.answers.filter((a) => !a.is_correct).map((a) => a.text);

  let text = `### Đáp án đúng\n${correctAnswers.map((a) => `- ${a}`).join('\n')}\n\n`;
  text += `### Vì sao đáp án này đúng?\nĐáp án trên đáp ứng chính xác yêu cầu về kiến trúc, hiệu năng và tuân thủ các quy tắc thiết kế tối ưu.\n\n`;

  if (incorrectAnswers.length > 0) {
    text += `### Vì sao các đáp án khác không phù hợp?\n`;
    incorrectAnswers.forEach((ans, idx) => {
      text += `- **Lựa chọn ${idx + 1}**: Không đáp ứng tiêu chí tối ưu chi phí, khả năng mở rộng hoặc tăng độ phức tạp không cần thiết.\n`;
    });
    text += `\n`;
  }

  text += `### Exam Tip 💡\nChú ý các từ khóa then chốt như *"LEAST operational overhead"*, *"MOST cost-effective"*, hoặc *"MOST resilient"*.`;

  return text;
}

export async function importBank(config: ImportConfig) {
  console.log(`\n========================================`);
  console.log(`🚀 Processing: ${config.certName} (${config.certCode})`);
  console.log(`========================================`);

  const cert = await prisma.certification.upsert({
    where: { slug: config.certSlug },
    update: {
      name: config.certName,
      code: config.certCode,
      provider: config.provider,
    },
    create: {
      code: config.certCode,
      name: config.certName,
      slug: config.certSlug,
      provider: config.provider,
      description: `Chứng chỉ ${config.certName} (${config.certCode}).`,
      status: 'PUBLISHED',
    },
  });

  const bank = await prisma.questionBank.upsert({
    where: { slug: config.bankSlug },
    update: {
      name: config.bankName,
      version: config.version,
    },
    create: {
      certificationId: cert.id,
      name: config.bankName,
      slug: config.bankSlug,
      version: config.version,
      description: `Ngân hàng câu hỏi phiên bản ${config.version} cho ${config.certName}.`,
      status: 'PUBLISHED',
    },
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
      update: { name: d.name },
      create: {
        id: `${bank.id}_${d.code}`,
        questionBankId: bank.id,
        code: d.code,
        name: d.name,
        weightPercentage: d.weightPercentage,
      },
    });
    domainMap[d.code] = domain.id;
  }

  if (!fs.existsSync(config.filePath)) {
    console.error(`❌ File not found: ${config.filePath}`);
    return;
  }

  const rawData = fs.readFileSync(config.filePath, 'utf-8');
  const rawQuestions: RawQuestion[] = JSON.parse(rawData);

  let validCount = 0;
  let skippedCount = 0;

  for (const q of rawQuestions) {
    if (!q.text || !q.answers || q.answers.length === 0) {
      skippedCount++;
      continue;
    }

    const domainInfo = categorizeDomain(q.text);
    const domainId = domainMap[domainInfo.code];
    const isMultiple = q.question_type === 'multiple' || q.answers.filter((a) => a.is_correct).length > 1;
    const type = isMultiple ? 'MULTIPLE_CHOICE' : 'SINGLE_CHOICE';
    const difficulty = q.text.length > 500 ? 'HARD' : q.text.length > 300 ? 'MEDIUM' : 'EASY';

    await prisma.question.create({
      data: {
        rawId: q.id,
        questionBankId: bank.id,
        domainId: domainId,
        type,
        difficulty,
        questionText: q.text,
        explanationText: generateStructuredExplanation(q),
        tags: JSON.stringify([domainInfo.code, type.toLowerCase()]),
        options: {
          create: q.answers.map((ans) => ({
            rawId: ans.id,
            text: ans.text,
            isCorrect: ans.is_correct,
          })),
        },
      },
    });
    validCount++;
  }

  await prisma.questionBank.update({
    where: { id: bank.id },
    data: { totalQuestions: validCount },
  });

  console.log(`✅ Import Success Report:`);
  console.log(`   - Certification: ${cert.name} (${cert.code})`);
  console.log(`   - Bank Slug: ${bank.slug}`);
  console.log(`   - Valid Questions Imported: ${validCount}`);
  console.log(`   - Skipped Invalid: ${skippedCount}`);
}

async function runAll() {
  const jsonDir = path.join(process.cwd(), 'question-json');
  const files: ImportConfig[] = [
    {
      filePath: path.join(jsonDir, 'questions_raw_CLF-C02.json'),
      certCode: 'CLF-C02',
      certName: 'AWS Certified Cloud Practitioner',
      certSlug: 'aws-clf-c02',
      provider: 'AWS',
      bankName: 'AWS Cloud Practitioner Official Bank',
      bankSlug: 'aws-clf-c02-v1',
      version: 'v1.0',
    },
    {
      filePath: path.join(jsonDir, 'questions_raw_DEA-C01.json'),
      certCode: 'DEA-C01',
      certName: 'AWS Certified Data Engineer – Associate',
      certSlug: 'aws-dea-c01',
      provider: 'AWS',
      bankName: 'AWS Data Engineer Associate Bank',
      bankSlug: 'aws-dea-c01-v1',
      version: 'v1.0',
    },
    {
      filePath: path.join(jsonDir, 'questions_raw_DVA-C02.json'),
      certCode: 'DVA-C02',
      certName: 'AWS Certified Developer – Associate',
      certSlug: 'aws-dva-c02',
      provider: 'AWS',
      bankName: 'AWS Developer Associate Bank',
      bankSlug: 'aws-dva-c02-v1',
      version: 'v1.0',
    },
    {
      filePath: path.join(jsonDir, 'questions_raw_MLA-C01.json'),
      certCode: 'MLA-C01',
      certName: 'AWS Certified Machine Learning Engineer – Associate',
      certSlug: 'aws-mla-c01',
      provider: 'AWS',
      bankName: 'AWS ML Engineer Associate Bank',
      bankSlug: 'aws-mla-c01-v1',
      version: 'v1.0',
    },
    {
      filePath: path.join(jsonDir, 'questions_raw_SAA-C03.json'),
      certCode: 'SAA-C03',
      certName: 'AWS Certified Solutions Architect – Associate',
      certSlug: 'aws-saa-c03',
      provider: 'AWS',
      bankName: 'AWS Solutions Architect Associate Bank',
      bankSlug: 'aws-saa-c03-v1',
      version: 'v1.0',
    },
    {
      filePath: path.join(jsonDir, 'questions_raw_SAP-C02.json'),
      certCode: 'SAP-C02',
      certName: 'AWS Certified Solutions Architect – Professional',
      certSlug: 'aws-sap-c02',
      provider: 'AWS',
      bankName: 'AWS Solutions Architect Professional Bank',
      bankSlug: 'aws-sap-c02-v1',
      version: 'v1.0',
    },
    {
      filePath: path.join(jsonDir, 'questions_raw_SOA-C02.json'),
      certCode: 'SOA-C02',
      certName: 'AWS Certified SysOps Administrator – Associate',
      certSlug: 'aws-soa-c02',
      provider: 'AWS',
      bankName: 'AWS SysOps Administrator Associate Bank',
      bankSlug: 'aws-soa-c02-v1',
      version: 'v1.0',
    },
  ];

  const passwordHash = '$2a$10$wW10jVw.g53QW5r9O0bH/./X3NfC5V7e8D8E9F0G1H2I3J4K5L6M7';
  await prisma.user.upsert({
    where: { email: 'demo@aws.com' },
    update: {},
    create: {
      email: 'demo@aws.com',
      passwordHash,
      name: 'AWS Learner Demo',
    },
  });

  for (const cfg of files) {
    await importBank(cfg);
  }

  console.log(`\n🎉 ALL 7 QUESTION BANKS IMPORTED SUCCESSFULLY!`);
}

runAll()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
