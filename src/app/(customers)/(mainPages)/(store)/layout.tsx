import { Box } from "@mui/material";
import { PropsWithChildren, Suspense } from "react";

import { StoreTabsLayout } from "@/components/layout";
import { StoreTabs, StoreTabsSkeleton } from "@/components/layout/store-tabs";

export default function StoreLayout({ children }: PropsWithChildren) {
  return (
    <StoreTabsLayout>
      <Suspense fallback={<StoreTabsSkeleton />}>
        <StoreTabs />
      </Suspense>

      <Box sx={{ paddingTop: 4 }}>{children}</Box>
    </StoreTabsLayout>
  );
}
