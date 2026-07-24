import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function benchmark() {
  console.log('--- DB BENCHMARK TEST ---');
  
  const startConnect = Date.now();
  await prisma.$connect();
  console.log('1. Connection establishment:', Date.now() - startConnect, 'ms');

  const startPing = Date.now();
  await prisma.$queryRaw`SELECT 1`;
  console.log('2. Simple Ping Query (SELECT 1):', Date.now() - startPing, 'ms');

  const startQuery = Date.now();
  const questions = await prisma.question.findMany({
    take: 10,
    select: { id: true, questionText: true },
  });
  console.log('3. Pagination Query (10 questions):', Date.now() - startQuery, 'ms');
  console.log('   Fetched count:', questions.length);

  const startCount = Date.now();
  const total = await prisma.question.count();
  console.log('4. Count Query (total questions):', Date.now() - startCount, 'ms');
  console.log('   Total count:', total);
}

benchmark()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
