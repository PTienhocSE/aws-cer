import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes (pages that guests can visit)
  const isPublicRoute =
    pathname === '/' ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/question-banks') ||
    pathname.startsWith('/questions') ||
    pathname.startsWith('/practice') ||
    pathname.startsWith('/exam') ||
    pathname.startsWith('/docs') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.');

  const token = request.cookies.get('token')?.value;
  const guestMode = request.cookies.get('guest-mode')?.value === '1';

  // If visiting a protected page without a token, redirect to /login
  if (!isPublicRoute && !token && !guestMode) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  if (!token && !guestMode) {
    response.cookies.set('guest-mode', '1', {
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
