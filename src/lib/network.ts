"use server";

import { cookies } from "next/headers";

import { HttpError } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const USER_AGENT = "FRONTENDAPP";

export const get = async <T>(url: string, searchParams: string = ""): Promise<T> => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    const requestURL = API_URL + url + searchParams;

    console.log("Call - ", requestURL);

    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": USER_AGENT,
      },
    });

    const json = await response.json();

    return json;
  } catch (err) {
    throw new Error((err as { message: string }).message);
  }
};

export const post = async <T>(
  url: string,
  body: Record<string, unknown>,
  authorization: boolean = true,
): Promise<T | HttpError> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  console.log("Call - ", { method: "POST", url: API_URL + url, body: JSON.stringify(body) });

  const response = await fetch(API_URL + url, {
    method: "POST",
    headers: {
      ...(authorization ? { Authorization: `Bearer ${accessToken}` } : {}),
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      error: errorData.error,
      status: response.status,
    };
  }

  const isNotEmptyResponse = await response.clone().text();
  if (isNotEmptyResponse) {
    return response.json();
  }
  return {} as T;
};

export const put = async <T>(
  url: string,
  body: Record<string, unknown>,
  authorization: boolean = true,
): Promise<T> => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  const response = await fetch(API_URL + url, {
    method: "PUT",
    headers: {
      ...(authorization ? { Authorization: `Bearer ${accessToken}` } : {}),
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
    },
    body: JSON.stringify(body),
  });

  console.log(response);
  const isNotEmptyResponse = await response.clone().text();
  if (isNotEmptyResponse) {
    return response.json();
  }
  return {} as T;
};
