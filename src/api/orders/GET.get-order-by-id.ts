import { get } from "@/lib/network";

import { GetOrderResponse } from "../types/orders";

export const getOrderById = async (id: number | "cart"): Promise<GetOrderResponse> => {
  return await get<GetOrderResponse>(`/orders/${id}`);
};
