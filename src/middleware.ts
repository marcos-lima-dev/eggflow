import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('eggflow_session');

  const publicPaths = ['/login', '/api/auth/login'];
  const isPublic = publicPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (!isPublic && !sessionCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/pedidos/:path*',
    '/novo-pedido/:path*',
    '/design-system/:path*',
  ],
};