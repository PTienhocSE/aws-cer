const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'ptientr.dev@gmail.com' },
    include: {
      enrollments: {
        include: { questionBank: true },
        orderBy: { enrolledAt: 'desc' },
      },
    },
  });
  console.log('User activeBankId:', user.activeQuestionBankId);
  const activeBank = await prisma.questionBank.findUnique({ where: { id: user.activeQuestionBankId || '' } });
  console.log('Active bank name:', activeBank?.name, 'slug:', activeBank?.slug);
  console.log('User enrollments:', user.enrollments.map(e => ({ bankId: e.questionBankId, name: e.questionBank.name, slug: e.questionBank.slug, enrolledAt: e.enrolledAt })));

  const dumpBank = await prisma.questionBank.findUnique({
    where: { slug: 'aws-saa-c03-dump' },
    include: {
      domains: {
        include: { _count: { select: { questions: true } } },
      },
      _count: { select: { questions: true } },
    },
  });
  console.log('Dump bank total questions:', dumpBank?._count.questions);
  console.log('Dump bank domains:', dumpBank?.domains.map(d => ({ code: d.code, name: d.name, qCount: d._count.questions })));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
