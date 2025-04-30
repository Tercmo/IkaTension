import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

const supportedLocales = ['en', 'es'];
const defaultLocale = 'en';

acceptLanguage.languages(supportedLocales);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};

const cookieName = 'i18next';

export function middleware(req: NextRequest) {
  let lng: string | undefined | null;
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }
  if (!lng) {
     lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  }
  if (!lng) {
    lng = defaultLocale;
  }

  // Redirect if locale in path is not supported
  if (
    !supportedLocales.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    // Prepend the detected or default locale to the path
    const redirectPath = `/${lng}${req.nextUrl.pathname.startsWith('/') ? '' : '/'}${req.nextUrl.pathname}${req.nextUrl.search}`;
    const redirectUrl = new URL(redirectPath, req.url);
    return NextResponse.redirect(redirectUrl);
  }


  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer')!);
    const lngInReferer = supportedLocales.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
