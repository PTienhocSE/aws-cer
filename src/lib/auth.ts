import { NextRequest } from 'next/server';
import { prisma } from './prisma';

export function signToken(payload: any) {
  return 'jwt-session-token-' + (payload.userId || 'guest');
}

export async function getAuthenticatedUser(req: NextRequest) {
  return getAuthUserOrDemo(req);
}

export async function getOptionalAuthUser(req: NextRequest) {
  const token = req.cookies.get('token')?.value || req.headers.get('authorization');
  if (!token) return null;

  const demoEmail = 'demo@aws.com';
  const user = await prisma.user.findUnique({ where: { email: demoEmail } });
  if (!user) return null;

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    activeQuestionBankId: user.activeQuestionBankId,
  };
}

export async function getAuthUserOrDemo(req: NextRequest) {
  const demoEmail = 'demo@aws.com';
  let user = await prisma.user.findUnique({
    where: { email: demoEmail },
  });

  if (!user) {
    const passwordHash = '$2a$10$wW10jVw.g53QW5r9O0bH/./X3NfC5V7e8D8E9F0G1H2I3J4K5L6M7';
    user = await prisma.user.create({
      data: {
        email: demoEmail,
        passwordHash,
        name: 'AWS Learner Demo',
      },
    });
  }

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    activeQuestionBankId: user.activeQuestionBankId || 'aws-saa-c03-v1',
  };
}
