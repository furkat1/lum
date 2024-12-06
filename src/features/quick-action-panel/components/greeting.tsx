import { Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

import { getSession } from "@/lib/auth";

export const Greeting = async () => {
  const t = await getTranslations("Greeting");
  const { userName } = await getSession();

  return (
    <Typography>
      {t("hello")}, {userName}!
    </Typography>
  );
};
