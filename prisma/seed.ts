import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

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

  console.log('✅ Base Seeding Completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
