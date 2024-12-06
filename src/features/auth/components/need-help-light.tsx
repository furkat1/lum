"use client";

import { Box, Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

import SupportEmailLight from "@/app/assets/SupportEmailLight.svg";
import SupportPhoneLight from "@/app/assets/SupportPhoneLight.svg";
import { palette } from "@/config/palette";
import { StaticData } from "@/config/static-data";

export const NeedHelpLight = () => {
  const t = useTranslations("NeedHelp");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        background: "rgba(255, 255, 255, 0.30)",
        padding: "19.5px 81px",
        "@media (max-width: 960px)": {
          padding: "19.5px",
        },
        "@media (max-width: 720px)": {
          flexDirection: "column",
          padding: "10px",
          alignItems: "flex-start",
        },
      }}
    >
      <Box
        sx={{
          "@media (max-width: 720px)": {
            padding: "4px 8px 0",
          },
        }}
      >
        <Typography
          sx={{
            color: palette.black,
            fontSize: 28,
            fontWeight: 700,
            lineHeight: "110%",
            whiteSpace: "nowrap",
            "@media (max-width: 720px)": {
              fontSize: 18,
            },
          }}
        >
          {t("title")}
        </Typography>
        <Typography
          sx={{
            color: palette.black,
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "140%",
            marginTop: "7px",
            whiteSpace: "nowrap",
          }}
        >
          {t("subtitle")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "1px",
          height: 112,
          background: "rgba(0, 0, 0, 0.30)",
          marginLeft: "62px",
          marginRight: "62px",
          "@media (max-width: 720px)": {
            display: "none",
          },
        }}
      ></Box>
      <Box>
        <Stack flexDirection="row" alignItems="center" sx={{ marginTop: "16px" }}>
          <Image src={SupportEmailLight} alt="Email Icon" width={54} height={54} />
          <Link
            href={`mailto:${StaticData.EMAIL}`}
            sx={{
              color: palette.primary_main,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "140%",
              textDecoration: "underline",
              marginLeft: "11px",
            }}
          >
            {StaticData.EMAIL}
          </Link>
        </Stack>
        <Stack flexDirection="row" alignItems="center" sx={{ marginTop: "16px" }}>
          <Image src={SupportPhoneLight} alt="Email Icon" width={54} height={54} />
          <Link
            href={`tel:${StaticData.PHONE}`}
            sx={{
              color: palette.primary_main,
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "140%",
              textDecoration: "none",
              marginLeft: "11px",
            }}
          >
            {StaticData.PHONE_VIEW}
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};
