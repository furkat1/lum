import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import ClinicsHeroImage from "@/app/assets/hero/Main.png";
import SBCLogo from "@/app/assets/SBCLogo.svg";
import { palette } from "@/config/palette";

import { MaxWidthContainer } from "./max-width-container";

export const ClinicsHeroSection = async () => {
  const t = await getTranslations("Clinics");
  return (
    <Box sx={{ position: "relative", width: "100vw" }}>
      <Image
        src={ClinicsHeroImage}
        alt="Hero image"
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
          minHeight: 233,
        }}
        quality={100}
        priority
        placeholder="blur"
      />

      <MaxWidthContainer
        sx={{
          position: "absolute",
          left: "50%",
          top: "35%",
          transform: "translateX(-50%) translateY(-65%)",
        }}
      >
        <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
          <Image width={184} height={81} src={SBCLogo} alt="SBC logo" />
          <Typography
            sx={{
              fontSize: 30,
              lineHeight: "38px",
              width: 345,
              breakWord: "break-word",
              color: palette.white,
              marginLeft: 3.75,
            }}
          >
            {t("hero")}
          </Typography>
        </Stack>
      </MaxWidthContainer>
    </Box>
  );
};
