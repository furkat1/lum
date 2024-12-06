import { get } from "@/lib/network";

import { GetOpenRequestsRequest, GetOpenRequestsResponse } from "../types/service-requests";

export const getOpenRequestsCount = async (
  params: GetOpenRequestsRequest,
): Promise<GetOpenRequestsResponse> => {
  const ps: { [key: string]: string } = {};
  Object.entries(params).forEach(([key, val]) => (ps[key] = val.join(",")));
  const searchParams = new URLSearchParams(ps);
  return await get<GetOpenRequestsResponse>(`/service-requests/open-requests?${searchParams}`);
};
