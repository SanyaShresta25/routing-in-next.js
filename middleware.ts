// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const isAuth = Boolean(token);
  const isLoginPage = path === '/login';

  if (!isAuth && !isLoginPage) {
    // Redirect unauthenticated users who try to access protected routes
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuth && isLoginPage) {
    // Redirect authenticated users away from the login page
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Allow request
  return NextResponse.next();
}

// Apply middleware to all routes except static files, images, favicon
export const config = {
  matcher: [
    /*
      Explanation:
      - ignoring static, image, favicon
      - allowing /login
      - everything else is protected
    */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
