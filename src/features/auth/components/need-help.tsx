import { Link, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

import SupportEmail from "@/app/assets/SupportEmail.svg";
import SupportPhone from "@/app/assets/SupportPhone.svg";
import { palette } from "@/config/palette";
import { StaticData } from "@/config/static-data";

export const NeedHelp = () => {
  const t = useTranslations("NeedHelp");
  return (
    <Stack sx={{ marginTop: "27px", opacity: 0.8 }}>
      <Typography
        sx={{
          color: palette.white,
          fontSize: 18,
          fontWeight: 700,
          lineHeight: "110%",
        }}
      >
        {t("title")}
      </Typography>
      <Typography
        sx={{
          color: palette.white,
          fontSize: 18,
          fontWeight: 400,
          lineHeight: "110%",
          marginTop: "5px",
        }}
      >
        {t("subtitle")}
      </Typography>
      <Stack flexDirection="row" alignItems="center" sx={{ marginTop: "16px" }}>
        <Image src={SupportEmail} alt="Email Icon" />
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
        <Image src={SupportPhone} alt="Email Icon" />
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
    </Stack>
  );
};
