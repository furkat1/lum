import { get } from "@/lib/network";

import { GetPointsResponse } from "../types/points";

export const getPoints = async (userId: string): Promise<GetPointsResponse> => {
  return await get<GetPointsResponse>(`/points/users/${userId}`);
};
