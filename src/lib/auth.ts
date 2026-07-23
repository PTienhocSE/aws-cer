import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from './prisma';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);

export async function signToken(payload: {
  userId: string;
  email: string;
  name?: string;
  role: string;
  activeQuestionBankId?: string | null;
}) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as {
      userId: string;
      email: string;
      name?: string;
      role: string;
      activeQuestionBankId?: string | null;
    };
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

  return {
    userId: payload.userId,
    email: payload.email,
    name: payload.name,
    role: payload.role,
    activeQuestionBankId: payload.activeQuestionBankId,
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
