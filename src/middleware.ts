import { NextRequest, NextResponse } from "next/server";

import { APP_ROUTES, PUBLIC_ROUTES } from "./config/routes";
import { setDestroySessionCookies, tryRefreshSession, verifySession } from "./lib/auth";

const refreshTokenPromises: { [sessionId: string]: Promise<NextResponse> | null } = {};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const {
    nextUrl: { pathname },
  } = request;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const { sessionIsValid, shouldRefresh, refreshToken } = await verifySession(request);

  if (sessionIsValid) {
    return NextResponse.next();
  }

  if (shouldRefresh && refreshToken) {
    if (!refreshTokenPromises[refreshToken]) {
      refreshTokenPromises[refreshToken] = tryRefreshSession(request).finally(() => {
        refreshTokenPromises[refreshToken] = null;
      });
    }

    const response = await refreshTokenPromises[refreshToken];

    if (!response) {
      const response = NextResponse.redirect(new URL(APP_ROUTES.SIGN_IN, request.url));
      return setDestroySessionCookies(response);
    }
    return response;
  }

  if (!sessionIsValid) {
    const response = NextResponse.redirect(new URL(APP_ROUTES.SIGN_IN, request.url));
    return setDestroySessionCookies(response);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
