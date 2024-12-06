import { NextRequest } from "next/server";

import { APP_COOKIES } from "@/config/cookies";
import { get } from "@/lib/network";
import { MachineType } from "@/types/machines";
import { PaginatedResponse } from "@/types/paginated-response";

export async function GET() {
  const response = await get<PaginatedResponse<MachineType>>("/machinetypes");

  return Response.json(response);
}

export async function PUT(request: NextRequest) {
  const reqBody: { machineType: string } = await request.json();

  return Response.json(
    {},
    {
      status: 200,
      headers: {
        "Set-Cookie": `${APP_COOKIES.PREFERRED_MACHINE_TYPE}=${reqBody.machineType};path=/`,
      },
    },
  );
}
