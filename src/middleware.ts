  import { NextResponse } from 'next/server';
  import type { NextRequest } from 'next/server';

  const publicRoutes = ['/login'];
  const protectedRoutes = ['/home', '/about', '/profile', '/blog', '/contact', '/course'];

  export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname === '/favicon.ico'
    ) {
      return NextResponse.next();
    }

    const token = request.cookies.get('token')?.value;
    const isAuth = Boolean(token);

    if (!isAuth && protectedRoutes.includes(pathname)) {
      const loginUrl = new URL('/login', request.url);
      const res = NextResponse.redirect(loginUrl);
      res.headers.set('x-middleware-cache', 'no-cache');
      return res;
    }

    if (isAuth && publicRoutes.includes(pathname)) {
      const homeUrl = new URL('/home', request.url);
      const res = NextResponse.redirect(homeUrl);
      res.headers.set('x-middleware-cache', 'no-cache');
      return res;
    }

    const res = NextResponse.next();
    res.headers.set('x-middleware-cache', 'no-cache');
    return res;
  }

  export const config = {
    matcher: ['/((?!_next|api|favicon.ico|images|assets).*)'],
  };