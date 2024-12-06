"use client";

import { Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

import HeaderLogoIcon from "@/app/assets/HeaderLogo.svg";
import { palette } from "@/config/palette";

export const HeaderLogo = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Stack flexDirection="row" alignItems="center" gap={"11px"} width={"min-content"}>
      {!loaded && <Skeleton width={254} height={43} sx={{ backgroundColor: palette.light_grey }} />}
      <Image
        src={HeaderLogoIcon}
        alt="LUMENIS"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoadingComplete={() => setLoaded(true)}
      />
      {loaded && (
        <Typography
          sx={{
            fontFamily: `ABCArizona, Arial, Helvetica, sans-serif`,
            fontSize: 31,
            fontWeight: 442,
            lineHeight: 0,
            letterSpacing: "0.25px",
            color: palette.white,
          }}
        >
          APP
        </Typography>
      )}
    </Stack>
  );
};
