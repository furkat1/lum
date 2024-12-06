"use server";

import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/config/routes";
import { checkSn, createSession, destroySession, emailIdentify } from "@/lib/auth";
import { isHttpError } from "@/lib/type-guards";

import { SignupFlow } from "../constants";

export const loginAction = async (_: string | null, formData: FormData) => {
  const { error } = await createSession({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    rememberMe: !!formData.get("rememberMe") as boolean,
  });

  if (error) {
    return error;
  }

  redirect("/");
};

export const emailIdentifyAction = async (_: string | null, formData: FormData) => {
  const response = await emailIdentify(formData.get("email") as string);

  if (isHttpError(response)) {
    return response.error;
  }

  switch (response.flow) {
    case SignupFlow.OPP:
      redirect(APP_ROUTES.SIGN_UP_OPP);
      break;
    case SignupFlow.REFSN:
      redirect(APP_ROUTES.SIGN_UP_REF_SN);
      break;
    case SignupFlow.OTP:
      redirect(APP_ROUTES.SIGN_UP_OTP);
      break;
    default:
      return "[emailIdentifyAction] No such a flow";
  }
};

export const refSnAction = async (_: string | null, formData: FormData) => {
  const response = await checkSn(formData.get("refSn") as string);

  if (isHttpError(response)) {
    return response.error;
  }

  redirect(APP_ROUTES.SIGN_UP_OTP);
};

export const logoutAction = async () => {
  destroySession();
  redirect(APP_ROUTES.SIGN_IN);
};
