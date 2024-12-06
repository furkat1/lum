import { Box, Skeleton } from "@mui/material";
import { getTranslations } from "next-intl/server";

import { get } from "@/lib/network";
import { PaginatedResponse } from "@/types";
import { RecentlyPurchasedProduct } from "@/types/products";

import { NavigationTabs } from "../ui/navigation-tabs";

export const StoreTabs = async () => {
  const t = await getTranslations("Store.tabs");

  const recentlyPurchased = await get<PaginatedResponse<RecentlyPurchasedProduct>>(
    "/store/recently-purchased",
  );

  const options = [
    { href: "/products", label: t("products") },
    {
      href: "/recently-purchased",
      label: t("recently-purchased"),
      disabled: recentlyPurchased.totalItemCount === 0,
    },
    { href: "/orders", label: t("orders") },
  ];

  return <NavigationTabs options={options} />;
};

export const StoreTabsSkeleton = () => {
  return (
    <Box sx={{ paddingTop: "6px" }}>
      <Skeleton variant="rectangular" width={"100%"} height={68} />
    </Box>
  );
};
