import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

import { ClinicsHeader, ClinicsHeroSection } from "@/components/layout";
import { MaxWidthContainer } from "@/components/layout/max-width-container";
import { palette } from "@/config/palette";

export default function ClinicsLayout({ children }: PropsWithChildren) {
  return (
    <Box sx={{ minHeight: "100vh", background: palette.bg_clinics, color: palette.black }}>
      <ClinicsHeader />
      <ClinicsHeroSection />
      <MaxWidthContainer>{children}</MaxWidthContainer>
    </Box>
  );
}
