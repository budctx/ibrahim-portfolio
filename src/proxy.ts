import {NextRequest, NextResponse} from 'next/server';

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  // The new experience defaults to Arabic. Existing unprefixed secondary
  // English routes remain English until their localized migration is complete.
  const legacyEnglish = /^\/(?:work|about|playground|projects)(?:\/|$)/.test(path);
  const locale = path === '/en' || path.startsWith('/en/') || legacyEnglish ? 'en' : 'ar';
  requestHeaders.set('x-portfolio-locale', locale);
  return NextResponse.next({request: {headers: requestHeaders}});
}
export const config = {matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']};
