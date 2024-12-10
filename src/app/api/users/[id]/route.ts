import { NextRequest } from "next/server";

import { put } from "@/lib/network";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; }> },
) {
  const requestBody = await request.json();
  const { id } = await params;
  const response = await put(`/users/${id}/`, requestBody);

  return Response.json(response);
}