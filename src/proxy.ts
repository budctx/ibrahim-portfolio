import {NextRequest, NextResponse} from 'next/server';

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  const locale = pathname === '/' || pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
  requestHeaders.set('x-portfolio-locale', locale);

  return NextResponse.next({
    request: {headers: requestHeaders},
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
