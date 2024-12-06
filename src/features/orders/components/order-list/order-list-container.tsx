import { GetOrdersRequest, GetOrdersResponse } from "@shared/types";
import qs from "qs";

import { get } from "@/lib/network";

import { OrderList } from "./order-list";

export const OrderListContainer = async () => {
  const searchParams: GetOrdersRequest = {
    skip: 0,
    limit: 12,
    sortBy: "createdAt",
    sortDirection: "desc",
  };

  const initialData = await get<GetOrdersResponse>("/orders", `?${qs.stringify(searchParams)}`);

  return <OrderList initialData={initialData} />;
};
