import axios from "axios";

import { PaginatedResponse, PaginationParams } from "@/types";
import { RecentlyPurchasedProduct } from "@/types/products";

export const getRecentlyPurchasedProducts = async (params: PaginationParams) => {
  const response = await axios.get<PaginatedResponse<RecentlyPurchasedProduct>>(
    "/api/recently-purchased",
    {
      params,
    },
  );

  return response.data;
};
