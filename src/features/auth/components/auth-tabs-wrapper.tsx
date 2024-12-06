"use client";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

import AuthBg from "@/app/assets/AuthBg.svg";
import AuthBgWoman from "@/app/assets/AuthBgWoman.png";
import { palette } from "@/config/palette";
import { APP_ROUTES } from "@/config/routes";

import { LinkTabs } from ".";

export const AuthTabsWrapper = () => {
  const t = useTranslations("AuthLayout");
  return (
    <>
      <Box
        sx={{
          display: "block",
          position: "absolute",
          zIndex: -1,
          top: "200px",
          left: "121px",
          "@media (max-width: 1440px)": {
            display: "none",
          },
        }}
      >
        <Image src={AuthBg.src} alt="Background" width={309.716} height={210.265} />
      </Box>

      <Box
        sx={{
          display: "block",
          position: "absolute",
          zIndex: -1,
          bottom: 0,
          right: 0,
          "@media (max-width: 1280px)": {
            display: "none",
          },
          "@media (max-width: 1024px)": {
            display: "block",
          },
          "@media (max-width: 468px)": {
            display: "none",
          },
        }}
      >
        <Image src={AuthBgWoman.src} alt="Background" width={536} height={695} />
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: 948,
        }}
      >
        <Typography
          sx={{
            color: palette.white,
            fontSize: 30,
            fontWeight: 600,
            lineHeight: "120%",
            marginTop: "46px",
          }}
        >
          {t("title")}
        </Typography>
        <Typography
          sx={{
            color: palette.white,
            fontSize: 20,
            fontWeight: 500,
            lineHeight: "140%",
            opacity: 0.8,
            marginTop: "11px",
          }}
        >
          {t("subtitle")}
        </Typography>
      </Box>

      <Stack
        sx={{
          maxWidth: 948,
          width: "100%",
        }}
      >
        <LinkTabs
          links={[
            {
              href: APP_ROUTES.SIGN_IN,
              text: "Log in",
            },
            {
              href: APP_ROUTES.SIGN_UP,
              text: "Sign up",
            },
          ]}
          tabsSx={{
            margin: "33px 0",
          }}
        />
      </Stack>
    </>
  );
};
