import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { MaxWidthContainer } from "@/components/layout/max-width-container";
import { palette } from "@/config/palette";

export default async function CustomersLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Box sx={{ flex: 1, background: palette.bg_pink, display: "flex", flexDirection: "column" }}>
        <MaxWidthContainer>{children}</MaxWidthContainer>
      </Box>
    </>
  );
}
