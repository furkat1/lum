import { alpha, Box, Stack, Typography } from "@mui/material";
import { OrderState } from "@shared/constants";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";

import { palette } from "@/config/palette";

import { getOrderStateImg } from "../helpers/get-order-state-img";

export type OrderStateProps = {
  state: OrderState;
};

export const OrderStateBadge: FC<OrderStateProps> = ({ state }) => {
  const t = useTranslations("Orders.states");

  const background = useMemo(() => {
    const gradient = `linear-gradient(90deg, ${palette.primary_main} 0%, ${palette.primary_main} 50%, ${alpha(palette.primary_main, 0.5)} 50%, ${alpha(palette.primary_main, 0.5)} 100%)`;

    switch (state) {
      case OrderState.PARTIALLY_APPROVED: {
        return alpha(palette.primary_main, 0.5);
      }
      case OrderState.PARTIALLY_DELIVERED:
      case OrderState.PARTIALLY_SHIPPED: {
        return gradient;
      }

      default: {
        return palette.primary_main;
      }
    }
  }, [state]);

  return (
    <Stack sx={{ alignItems: "center", gap: 0.75 }}>
      <Box
        sx={{
          background,
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={getOrderStateImg(state)} width={20} height={20} alt={state} />
      </Box>
      <Typography
        sx={{
          width: 120,
          textAlign: "center",
          breakWord: "break-word",
          fontSize: 18,
          fontWeight: 700,
          lineHeight: "19.8px",
        }}
      >
        {t(state)}
      </Typography>
    </Stack>
  );
};
