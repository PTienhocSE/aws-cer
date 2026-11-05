import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from './prisma';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);

export async function signToken(payload: {
  userId: string;
}) {
  return new SignJWT({ userId: payload.userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { userId: string };
  } catch {
    return null;
  }
}

export async function getAuthenticatedUser(req: NextRequest) {
  const token =
    req.cookies.get('token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload?.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      activeQuestionBankId: true,
    },
  });

  if (!user) return null;

  return {
    userId: user.id,
    email: user.email,
    name: user.name || undefined,
    role: user.role,
    activeQuestionBankId: user.activeQuestionBankId,
  };
}

export async function getOptionalAuthUser(req: NextRequest) {
  return getAuthenticatedUser(req);
}

async function getGuestUser() {
  const guest = await prisma.user.upsert({
    where: { email: 'guest@aws-cert.local' },
    update: {},
    create: {
      email: 'guest@aws-cert.local',
      name: 'Guest Learner',
      role: 'USER',
      passwordHash: '$2a$10$7cC8j8wWqgQ8nZ8e9h0oOe0e5O5xQJwWg2j0e6mZQ3kR5T7uV9i2a',
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      activeQuestionBankId: true,
    },
  });

  let activeQuestionBankId = guest.activeQuestionBankId;
  if (!activeQuestionBankId) {
    const defaultGuestBank = await prisma.questionBank.findUnique({
      where: { slug: 'aws-saa-c03-udemy-all' },
      select: { id: true, status: true },
    });
    if (defaultGuestBank?.status === 'PUBLISHED') {
      activeQuestionBankId = defaultGuestBank.id;
      await prisma.user.update({
        where: { id: guest.id },
        data: { activeQuestionBankId },
      });
    }
  }

  return {
    userId: guest.id,
    email: guest.email,
    name: guest.name || undefined,
    role: guest.role,
    activeQuestionBankId,
  };
}

// Core learning APIs can use a shared guest profile when the browser has guest-mode enabled.
export async function getAuthUserOrDemo(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  if (user) return user;

  const guestMode = req.cookies.get('guest-mode')?.value === '1' || req.headers.get('x-guest-mode') === '1';
  if (guestMode) return getGuestUser();

  return null;
}
