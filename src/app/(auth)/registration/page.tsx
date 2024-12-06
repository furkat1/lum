import { Stack } from "@mui/material";

import { AuthTabsWrapper } from "@/features/auth/components";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <Stack
      sx={{
        minHeight: "calc(100vh - 170px)",
        alignItems: "center",
        position: "relative",
        background: `linear-gradient(0deg, #212121 0%, rgba(33, 33, 33, 0.00) 37.85%)`,
        marginBottom: "105px",

        "@media (max-width: 1024px)": {
          paddingBottom: "354px",
        },
        "@media (max-width: 468px)": {
          paddingBottom: "0",
        },
      }}
    >
      <AuthTabsWrapper />
      <SignUpForm />
    </Stack>
  );
}
