import { NextRequest } from "next/server";

import { IntegratedMessage } from "@/features/integrated-messages/types/messages";
import { get } from "@/lib/network";
import { PaginatedResponse } from "@/types";

export async function GET(request: NextRequest) {
  const response = await get<PaginatedResponse<IntegratedMessage>>(
    "/messages",
    request.nextUrl.search,
  );

  return Response.json(response);
}
