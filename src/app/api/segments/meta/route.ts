import { NextRequest } from "next/server";

import { get } from "@/lib/network";
import { RecentlyPurchasedProduct } from "@/types/products";
import { SegmentsMetaFilters } from '@/types/segments-meta-filters';

export async function GET(req: NextRequest) {
  const response = await get<SegmentsMetaFilters>("/segments/meta");

  return Response.json(response);
}
