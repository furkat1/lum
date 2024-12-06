import { NextRequest } from "next/server";

import { get } from "@/lib/network";
import { PaginatedResponse } from "@/types";
import { RecentlyPurchasedProduct } from "@/types/products";

export async function GET(req: NextRequest) {
  const response = await get<PaginatedResponse<RecentlyPurchasedProduct>>(
    "/store/recently-purchased",
    req.nextUrl.search,
  );

  return Response.json(response);
}
