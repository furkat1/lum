import { getSession } from "@/lib/auth";

export const GET = async () => {
  const session = await getSession();
  return Response.json(session);
};
