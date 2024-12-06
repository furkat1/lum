import { Order, PaginatedResponse } from "@shared/types";
import { NextRequest } from "next/server";

import { get } from "@/lib/network";

export async function GET(request: NextRequest) {
  const response = await get<PaginatedResponse<Order>>("/orders", request.nextUrl.search);

  return Response.json(response);
}
