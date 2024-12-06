import "server-only";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { APP_COOKIES } from "@/config/cookies";
import { SESSION_KEYS, SignupFlow } from "@/features/auth/constants";
import { accessTokenToSession } from "@/features/auth/helpers/access-token-to-session";
import { AccessTokenResponse, RegistrationResponse, SessionData } from "@/features/auth/types";
import { HttpError } from "@/types";

import { post } from "./network";
import { isHttpError } from "./type-guards";

const AHEAD_IN_SEC = 5;

const refreshToken = async (token: string): Promise<AccessTokenResponse | null> => {
  try {
    const requestBody = {
      grantType: "refreshToken",
      refreshToken: token,
    };

    const response = await post<AccessTokenResponse>("/token", requestBody, false);
    if (isHttpError(response)) return null;
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getDefaultCookieOptions = (
  maxAge?: number,
): { httpOnly: boolean; sameSite: "strict"; path: string; maxAge?: number; secure: boolean } => ({
  httpOnly: true,
  sameSite: "strict",
  secure: true,
  path: "/",
  ...(maxAge && { maxAge }),
});

const setSessionCookies = async (
  accessTokenResponse: AccessTokenResponse,
  rememberMe?: boolean,
) => {
  const cookieStore = await cookies();

  cookieStore.set(
    APP_COOKIES.REMEMBER_ME,
    JSON.stringify(rememberMe),
    getDefaultCookieOptions(
      rememberMe ? accessTokenResponse.refreshTokenExpireInSec - AHEAD_IN_SEC : undefined,
    ),
  );

  cookieStore.set(
    APP_COOKIES.ACCESS_TOKEN,
    accessTokenResponse.accessToken,
    getDefaultCookieOptions(
      rememberMe ? accessTokenResponse.accessTokenExpireInSec - AHEAD_IN_SEC : undefined,
    ),
  );

  cookieStore.set(
    APP_COOKIES.REFRESH_TOKEN,
    accessTokenResponse.refreshToken,
    getDefaultCookieOptions(
      rememberMe ? accessTokenResponse.refreshTokenExpireInSec - AHEAD_IN_SEC : undefined,
    ),
  );

  cookieStore.set(
    APP_COOKIES.SESSION,
    JSON.stringify(accessTokenToSession(accessTokenResponse)),
    getDefaultCookieOptions(
      rememberMe ? accessTokenResponse.refreshTokenExpireInSec - AHEAD_IN_SEC : undefined,
    ),
  );
};

export const createSession = async (credentials: {
  email: string;
  password: string;
  rememberMe: boolean;
}): Promise<{ error?: string }> => {
  try {
    const requestBody = {
      grantType: "password",
      login: credentials.email,
      password: credentials.password,
    };

    const response = await post<AccessTokenResponse>("/token", requestBody, false);
    if (!isHttpError(response)) {
      await setSessionCookies(response, credentials.rememberMe);
      return {};
    }

    return { error: response.error };
  } catch (err) {
    console.error(err);
    return { error: "Invalid credentials" };
  }
};

export const emailIdentify = async (email: string): Promise<{ flow?: SignupFlow } | HttpError> => {
  const requestBody = {
    email,
  };

  const response = await post<RegistrationResponse>("/registration", requestBody, false);

  setSignupDataInCookie({ ...response, email });
  if (isHttpError(response)) {
    return response;
  }
  return { flow: response.flow };
};

const setSignupDataInCookie = async ({
  sessionId,
  email,
  flow,
}: {
  sessionId?: string;
  email?: string;
  flow?: SignupFlow;
}) => {
  const cookieStore = await cookies();

  if (sessionId) {
    cookieStore.set(SESSION_KEYS.SIGNUP_SESSION, sessionId);
  }
  if (email) {
    cookieStore.set(SESSION_KEYS.SIGNUP_EMAIL, email);
  }
  if (flow) {
    cookieStore.set(SESSION_KEYS.SIGNUP_STEP, flow);
  }
};

export const checkSn = async (sn: string): Promise<object | HttpError> => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_KEYS.SIGNUP_SESSION)?.value;

  const requestBody = {
    sn,
    sessionId,
  };

  const response = await post<object>("/registration/refsn", requestBody, false);

  if (isHttpError(response)) {
    return response;
  }
  await setSignupDataInCookie({
    flow: SignupFlow.OTP,
  });
  return response;
};

export const verifySession = async (
  request: NextRequest,
): Promise<{ sessionIsValid: boolean; shouldRefresh?: boolean; refreshToken?: string }> => {
  const accessToken = request.cookies.get(APP_COOKIES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(APP_COOKIES.REFRESH_TOKEN)?.value;

  if (accessToken) {
    return { sessionIsValid: true };
  }

  if (refreshToken) {
    return { sessionIsValid: false, shouldRefresh: true, refreshToken };
  }

  return {
    sessionIsValid: false,
    shouldRefresh: false,
  };
};

export const getSession = async (): Promise<SessionData> => {
  const cookieStore = await cookies();

  const stringifiedSession = cookieStore.get(APP_COOKIES.SESSION)?.value;

  const session: SessionData = JSON.parse(stringifiedSession || "{}");

  return session;
};

export const tryRefreshSession = async (request: NextRequest): Promise<NextResponse> => {
  const refreshTokenFromCookies = request.cookies.get(APP_COOKIES.REFRESH_TOKEN)?.value;
  const rememberMeCookies = JSON.parse(
    request.cookies.get(APP_COOKIES.REMEMBER_ME)?.value || "false",
  );

  if (!refreshTokenFromCookies) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    return setDestroySessionCookies(response);
  }

  const accessTokenResponse = await refreshToken(refreshTokenFromCookies);

  if (!accessTokenResponse) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    return setDestroySessionCookies(response);
  }

  const response = NextResponse.next();

  response.cookies.set(
    APP_COOKIES.ACCESS_TOKEN,
    accessTokenResponse.accessToken,
    getDefaultCookieOptions(
      rememberMeCookies ? accessTokenResponse.accessTokenExpireInSec - AHEAD_IN_SEC : undefined,
    ),
  );

  response.cookies.set(
    APP_COOKIES.REFRESH_TOKEN,
    accessTokenResponse.refreshToken,
    getDefaultCookieOptions(
      rememberMeCookies ? accessTokenResponse.refreshTokenExpireInSec - AHEAD_IN_SEC : undefined,
    ),
  );

  response.cookies.set(
    APP_COOKIES.SESSION,
    JSON.stringify(accessTokenToSession(accessTokenResponse)),
    getDefaultCookieOptions(
      rememberMeCookies ? accessTokenResponse.refreshTokenExpireInSec - AHEAD_IN_SEC : undefined,
    ),
  );

  response.cookies.set(
    APP_COOKIES.REMEMBER_ME,
    rememberMeCookies,
    getDefaultCookieOptions(
      rememberMeCookies ? accessTokenResponse.refreshTokenExpireInSec - AHEAD_IN_SEC : undefined,
    ),
  );

  return response;
};

export const setDestroySessionCookies = async (response: NextResponse) => {
  response.cookies.delete(APP_COOKIES.ACCESS_TOKEN);
  response.cookies.delete(APP_COOKIES.REFRESH_TOKEN);
  response.cookies.delete(APP_COOKIES.SESSION);
  response.cookies.delete(APP_COOKIES.PREFERRED_MACHINE_TYPE);

  return response;
};

export const destroySession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(APP_COOKIES.ACCESS_TOKEN);
  cookieStore.delete(APP_COOKIES.REFRESH_TOKEN);
  cookieStore.delete(APP_COOKIES.SESSION);
  cookieStore.delete(APP_COOKIES.PREFERRED_MACHINE_TYPE);
};
