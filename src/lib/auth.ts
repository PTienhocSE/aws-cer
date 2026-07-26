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

// Legacy alias — now requires real auth, no longer falls back to demo
export async function getAuthUserOrDemo(req: NextRequest) {
  const user = await getAuthenticatedUser(req);
  if (user) return user;

  // Fallback: return null — callers should handle unauthorized
  return null;
}
