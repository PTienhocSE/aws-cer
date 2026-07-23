import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import * as bcrypt from 'bcryptjs';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { email, password } = parsed.data;

    let user = await prisma.user.findUnique({ where: { email } });

    // Handle demo account automatic creation/reset if password is password123
    if (email === 'demo@aws.com') {
      const realHash = await bcrypt.hash('password123', 10);
      if (!user) {
        user = await prisma.user.create({
          data: {
            email: 'demo@aws.com',
            passwordHash: realHash,
            name: 'AWS Learner Demo',
          },
        });
      } else {
        // Ensure hash is valid
        const isDemoMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isDemoMatch && password === 'password123') {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { passwordHash: realHash },
          });
        }
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch && !(email === 'demo@aws.com' && password === 'password123')) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name || undefined,
      role: user.role,
      activeQuestionBankId: user.activeQuestionBankId,
    });

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        activeQuestionBankId: user.activeQuestionBankId || 'aws-saa-c03-v1',
      },
      token,
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Lỗi server khi đăng nhập' }, { status: 500 });
  }
}
