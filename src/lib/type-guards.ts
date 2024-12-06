import { HttpError } from "@/types";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export const isHttpError = (response: any): response is HttpError => {
  return "error" in response && "status" in response;
};
