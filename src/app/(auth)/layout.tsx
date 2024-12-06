import { Stack } from "@mui/material";
import { PropsWithChildren } from "react";

import { Header } from "@/components/layout";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
      }}
    >
      <Header isAuthPage={true} />

      {children}
    </Stack>
  );
}
