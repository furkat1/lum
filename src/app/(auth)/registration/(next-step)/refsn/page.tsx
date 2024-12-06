import { Stack } from "@mui/material";

import { palette } from "@/config/palette";
import { RefSnForm } from "@/features/auth/components/ref-sn-form";

export default async function RefSnPage() {
  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 64px)",
        alignItems: "center",
        position: "relative",
        padding: "15px",
        background: palette.bg_pink,
      }}
    >
      <RefSnForm />
    </Stack>
  );
}
