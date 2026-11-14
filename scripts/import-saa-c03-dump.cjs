const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DOMAINS = [
  { code: 'DOMAIN_1_DUMP', name: 'Design Secure Architectures', weightPercentage: 30 },
  { code: 'DOMAIN_2_DUMP', name: 'Design Resilient Architectures', weightPercentage: 26 },
  { code: 'DOMAIN_3_DUMP', name: 'Design High-Performing Architectures', weightPercentage: 24 },
  { code: 'DOMAIN_4_DUMP', name: 'Design Cost-Optimized Architectures', weightPercentage: 20 },
];

function categorizeDomain(text) {
  const lower = text.toLowerCase();
  if (/(kms|iam|encrypt|security|cognito|waf|shield|compliance|policy|guardduty|secrets manager|vpc endpoint|certificate)/.test(lower)) {
    return 'DOMAIN_1_DUMP';
  }
  if (/(multi-az|auto scaling|failover|disaster recovery|route 53|aurora global|backup|resilien|sqs|sns|fifo)/.test(lower)) {
    return 'DOMAIN_2_DUMP';
  }
  if (/(lambda|performance|cache|cloudfront|elasticache|kinesis|throughput|hpc|fsx|api gateway|dynamodb|s3 transfer acceleration|latency)/.test(lower)) {
    return 'DOMAIN_3_DUMP';
  }
  return 'DOMAIN_4_DUMP';
}

async function main() {
  console.log('🚀 Bắt đầu import bộ đề SAA_dump vào aws-cer...');

  const sourceJsonPath = path.join(__dirname, '..', 'examprepper_32_questions.json');
  const targetJsonPath = path.join(__dirname, '..', 'question-json', 'questions_raw_SAA-C03-DUMP.json');

  if (!fs.existsSync(sourceJsonPath)) {
    throw new Error(`Không tìm thấy file nguồn: ${sourceJsonPath}`);
  }

  const rawQuestions = JSON.parse(fs.readFileSync(sourceJsonPath, 'utf8'));
  console.log(`Đã đọc ${rawQuestions.length} câu hỏi từ ${path.basename(sourceJsonPath)}`);

  // Copy lưu trữ vào question-json
  fs.writeFileSync(targetJsonPath, JSON.stringify(rawQuestions, null, 2), 'utf8');
  console.log(`✓ Đã lưu bản sao vào: ${targetJsonPath}`);

  // 1. Tìm hoặc tạo Certification SAA-C03
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

  // 2. Tạo hoặc cập nhật QuestionBank SAA_dump
  const bankSlug = 'aws-saa-c03-dump';
  const bank = await prisma.questionBank.upsert({
    where: { slug: bankSlug },
    update: {
      certificationId: certification.id,
      name: 'SAA-C03 — SAA_dump (1.019 câu)',
      version: 'v1.0-dump',
      totalQuestions: rawQuestions.length,
      description: 'Bộ đề SAA_dump tổng hợp 1.019 câu hỏi thực chiến từ ExamPrepper kèm đáp án và tỷ lệ vote cộng đồng.',
      status: 'PUBLISHED',
    },
    create: {
      certificationId: certification.id,
      name: 'SAA-C03 — SAA_dump (1.019 câu)',
      slug: bankSlug,
      version: 'v1.0-dump',
      totalQuestions: rawQuestions.length,
      description: 'Bộ đề SAA_dump tổng hợp 1.019 câu hỏi thực chiến từ ExamPrepper kèm đáp án và tỷ lệ vote cộng đồng.',
      status: 'PUBLISHED',
    },
  });
  console.log(`✓ QuestionBank: ${bank.name} [${bank.slug}] (${bank.id})`);

  // 3. Tạo các Domains
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
  console.log(`✓ Đã thiết lập ${domainIds.size} domains cho SAA-C03.`);

  // 4. Xóa câu hỏi cũ của bank này nếu có (idempotent)
  const deleted = await prisma.question.deleteMany({ where: { questionBankId: bank.id } });
  if (deleted.count > 0) {
    console.log(`✓ Đã dọn dẹp ${deleted.count} câu hỏi cũ của bank ${bank.slug}`);
  }

  // 5. Chuẩn bị danh sách câu hỏi và import theo lô
  console.log('⏳ Đang tiến hành import 1.019 câu hỏi vào cơ sở dữ liệu...');
  const BATCH_SIZE = 25;
  let importedCount = 0;

  for (let i = 0; i < rawQuestions.length; i += BATCH_SIZE) {
    const chunk = rawQuestions.slice(i, i + BATCH_SIZE);

    await Promise.all(
      chunk.map(async (q) => {
        const domainCode = categorizeDomain(q.question);
        const domainId = domainIds.get(domainCode);
        const letters = Object.keys(q.choices).sort();
        const correctSet = new Set((q.answer || '').split(''));

        let explanation = `Đáp án đúng: ${q.answer}\n`;
        if (q.answers_community && q.answers_community.length > 0) {
          explanation += `\nBình chọn cộng đồng: ${q.answers_community.join(', ')}\n`;
        }
        if (q.answer_description && q.answer_description.trim()) {
          explanation += `\nGiải thích chi tiết:\n${q.answer_description.trim()}`;
        }

        const isMultiple = (q.answer || '').length > 1;

        return prisma.question.create({
          data: {
            rawId: q.question_id,
            questionBankId: bank.id,
            domainId: domainId,
            type: isMultiple ? 'MULTIPLE_CHOICE' : 'SINGLE_CHOICE',
            difficulty: q.question.length > 500 ? 'HARD' : q.question.length > 300 ? 'MEDIUM' : 'EASY',
            questionText: q.question,
            explanationText: explanation,
            tags: JSON.stringify([`EXAM_32_Q${q.question_id}`, 'SAA_DUMP', domainCode]),
            options: {
              create: letters.map((letter, idx) => ({
                rawId: q.question_id * 10 + (idx + 1),
                text: q.choices[letter] || '',
                isCorrect: correctSet.has(letter),
              })),
            },
          },
        });
      })
    );

    importedCount += chunk.length;
    process.stdout.write(`\r   -> Tiến độ: ${importedCount} / ${rawQuestions.length} câu (${Math.round((importedCount / rawQuestions.length) * 100)}%)`);
  }
  console.log('\n✓ Đã import thành công toàn bộ 1.019 câu hỏi!');

  // 6. Tự động ghi danh người dùng
  const usersToEnroll = ['ptientr.dev@gmail.com', 'guest@aws-cert.local'];
  for (const email of usersToEnroll) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
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
      console.log(`✓ Đã đăng ký môn học cho tài khoản: ${email}`);
    }
  }

  console.log('\n🎉 HOÀN TẤT: Bộ đề SAA_dump đã sẵn sàng sử dụng trên hệ thống!');
}

main()
  .catch((err) => {
    console.error('\n❌ Lỗi khi import:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
