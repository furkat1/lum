import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

import { UserPanel } from "@/components/layout";
import { palette } from "@/config/palette";

export default async function CustomersLayout({ children }: PropsWithChildren) {
  return (
    <>
      <UserPanel />
      <Box sx={{ flex: 1, background: palette.bg_dark, display: "flex", flexDirection: "column" }}>
        {children}
      </Box>
    </>
  );
}
