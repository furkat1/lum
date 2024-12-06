import { get } from "@/lib/network";

import { GetOpenOrdersRequest, GetOpenOrdersResponse } from "../types/orders";

export const getOpenOrdersCount = async (
  params: GetOpenOrdersRequest,
): Promise<GetOpenOrdersResponse> => {
  const ps: { [key: string]: string } = {};
  Object.entries(params).forEach(([key, val]) => (ps[key] = val.join(",")));
  const searchParams = new URLSearchParams(ps);
  return await get<GetOpenOrdersResponse>(`/orders/open-orders?${searchParams}`);
};
