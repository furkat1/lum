import { NextRequest } from "next/server";

import { put } from "@/lib/network";
import { Product } from "@/types/products";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string; itemId: string }> },
) {
  const requestBody = await request.json();
  const { orderId, itemId } = await params;
  const response = await put<Product>(`/orders/${orderId}/items/${itemId}`, requestBody);

  return Response.json(response);
}
