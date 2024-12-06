"use server";

import { cookies } from "next/headers";

import { APP_COOKIES } from "@/config/cookies";
import { APP_ROUTES } from "@/config/routes";
import { SEARCH_PARAMS } from "@/config/search-params";
import { getSession } from "@/lib/auth";
import type { SearchParams } from "@/types/page-search-params";

export const verifyMachineTypeQuery = async (searchParams: SearchParams) => {
  const resolvedParams = await searchParams;
  const cookiesStore = await cookies();

  const session = await getSession();

  const machineTypeSearchParam = resolvedParams[SEARCH_PARAMS.MACHINE_TYPE];
  const machineTypeCookie = cookiesStore.get(APP_COOKIES.PREFERRED_MACHINE_TYPE);

  if (!session?.allowedMachineTypes) {
    return { redirectParams: null, error: "No available machine types" };
  }

  if (
    machineTypeSearchParam &&
    session.allowedMachineTypes.some((uuid) => uuid === machineTypeSearchParam)
  ) {
    return { redirectParams: null };
  }

  if (
    machineTypeCookie &&
    session.allowedMachineTypes.some((uuid) => uuid === machineTypeCookie.value)
  ) {
    return {
      redirectParams: `${APP_ROUTES.PRODUCTS}?${SEARCH_PARAMS.MACHINE_TYPE}=${machineTypeCookie.value}`,
    };
  }

  const firstAllowedMachineType = session.allowedMachineTypes[0];

  return {
    redirectParams: `${APP_ROUTES.PRODUCTS}?${SEARCH_PARAMS.MACHINE_TYPE}=${firstAllowedMachineType}`,
  };
};
