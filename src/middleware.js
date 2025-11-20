import { NextResponse } from 'next/server';

const LAUNCH_DATE = new Date('2026-01-01T00:00:00');
const BYPASS_COOKIE_NAME = 'bypass_coming_soon';
const BYPASS_COOKIE_VALUE = 'true';

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  // Allow access to coming-soon page, API routes, and static files
  if (
    pathname.startsWith('/coming-soon') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') // Static files
  ) {
    return NextResponse.next();
  }

  // Check for preview query parameter
  const hasPreview = searchParams.get('preview') === 'true';

  // Get bypass cookie from request
  const bypassCookie = request.cookies.get(BYPASS_COOKIE_NAME);
  const hasBypass = bypassCookie?.value === BYPASS_COOKIE_VALUE;

  // Current date check
  const now = new Date();
  const isBeforeLaunch = now < LAUNCH_DATE;

  // If preview parameter is present, set cookie and allow access
  if (hasPreview) {
    const response = NextResponse.next();
    response.cookies.set(BYPASS_COOKIE_NAME, BYPASS_COOKIE_VALUE, {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: true,
      sameSite: 'lax',
    });
    return response;
  }

  // If before launch date and no bypass, redirect to coming-soon
  if (isBeforeLaunch && !hasBypass) {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  // Allow access if after launch date or bypass is active
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

