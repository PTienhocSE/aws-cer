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
    pathname.startsWith('/docs') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.');

  const token = request.cookies.get('token')?.value;

  // If visiting a protected page without a token, redirect to /login
  if (!isPublicRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
