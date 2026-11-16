const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, activeQuestionBankId: true }
  });
  console.log('Users:', JSON.stringify(users, null, 2));

  const banks = await prisma.questionBank.findMany({
    select: { id: true, name: true, slug: true, totalQuestions: true }
  });
  console.log('Banks:');
  for (const b of banks) {
    const domains = await prisma.domain.findMany({
      where: { questionBankId: b.id },
      select: { id: true, code: true, name: true, _count: { select: { questions: true } } }
    });
    console.log(`Bank [${b.id}] (${b.slug}) - total ${b.totalQuestions} questions:`);
    domains.forEach(d => console.log(`   - Domain ${d.code} (${d.name}): ${d._count.questions} questions`));
  }
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
