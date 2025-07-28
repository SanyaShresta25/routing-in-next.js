import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/home', '/about', '/profile', '/blog', '/contact', '/course','/event-registration'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] === 'kn' ? 'kn' : 'en';


  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  const isAuth = Boolean(token);


  if (!isAuth && (pathname === '/' || pathname === '/en')) {
    return NextResponse.redirect(new URL('/en/login', request.url));
  }

 
  if (!isAuth && protectedRoutes.some(route => pathname.startsWith(`/${locale}${route}`))) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

 
  if (isAuth && pathname === `/${locale}/login`) {
    return NextResponse.redirect(new URL(`/${locale}/home`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|images|assets).*)'],
};