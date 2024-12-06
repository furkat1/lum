import { alpha, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";

import StoreEmpty from "@/app/assets/StoreEmpty.svg";
import { palette } from "@/config/palette";

export const ProductsGridEmpty = () => {
  const t = useTranslations("Store");
  return (
    <Stack alignItems="center" gap={4}>
      <Image src={StoreEmpty} width={100} height={100} alt="Empty" />
      <Typography sx={{ fontSize: 30, color: alpha(palette.white, 0.7), height: 118, mt: 4 }}>
        {t("no-products")}
      </Typography>
    </Stack>
  );
};
