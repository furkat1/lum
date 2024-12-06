"use client";

import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren } from "react";

import { palette } from "@/config/palette";
import { APP_ROUTES } from "@/config/routes";

import { MaxWidthContainer } from "./max-width-container";

export const StoreTabsLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  const { background, color } = React.useMemo(() => {
    if (pathname === APP_ROUTES.ORDERS) {
      return { background: palette.bg_pink, color: palette.black };
    }

    return { background: palette.bg_dark, color: palette.white };
  }, [pathname]);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background,
        color,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <MaxWidthContainer>{children}</MaxWidthContainer>
    </Box>
  );
};
