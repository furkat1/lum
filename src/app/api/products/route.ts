import { NextRequest } from "next/server";

import { get } from "@/lib/network";
import { PaginatedResponse } from "@/types";
import { Product } from "@/types/products";

export async function GET(request: NextRequest) {
  const response = await get<PaginatedResponse<Product>>("/products", request.nextUrl.search);

  return Response.json(response);
}
