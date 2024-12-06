"use client";

import { alpha, Box, styled, Typography } from "@mui/material";
import Image from "next/image";
import { FC } from "react";

import PointsIcon from "@/app/assets/PointsBlack.svg";
import { palette } from "@/config/palette";

import { OrderListItemProps } from "../../types";
import { OrderStateBadge } from "../order-state-badge";

export const OrderListItem: FC<OrderListItemProps> = (props) => {
  const { createdAt, orderNumber, totalToPay, pointsRedeemed, orderState, selected } = props;

  return (
    <ItemContainer
      sx={{
        background: selected ? palette.white : alpha(palette.white, 0.5),
        outline: selected ? `8px solid ${alpha(palette.primary_main, 0.2)}` : "none",
      }}
    >
      <OrderNumber>Order #{orderNumber}</OrderNumber>

      <LabeledText>
        <Label>Date</Label>
        <Value>{createdAt}</Value>
      </LabeledText>

      <LabeledText>
        <Label>Total</Label>
        <Value>{totalToPay}</Value>
      </LabeledText>

      <LabeledText>
        <Label>Redeemed</Label>

        <PointsContainer>
          <Value>{pointsRedeemed}</Value>
          <Image alt="points logo" src={PointsIcon} width={13} height={13} />
          <PointsLabel>Points</PointsLabel>
        </PointsContainer>
      </LabeledText>

      {orderState && (
        <StateBadgeContainer>
          <OrderStateBadge state={orderState} />
        </StateBadgeContainer>
      )}
    </ItemContainer>
  );
};

const ItemContainer = styled(Box)(() => ({
  position: "relative",
  width: 345,
  height: 145,
  borderRadius: "6px",
  padding: "12px 21px",
  cursor: "pointer",
  border: `1px solid ${alpha(palette.primary_main, 0)}`,

  "&:hover": {
    border: `1px solid ${palette.primary_main}`,
  },
}));

const OrderNumber = styled(Typography)(() => ({
  fontSize: 18,
  fontWeight: 700,
  lineHeight: "19.8px",
  height: 26,
  marginBottom: 13,
}));

const LabeledText = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  marginBottom: 11,
}));

const Label = styled(Typography)(() => ({
  width: 77,
  fontSize: 14,
  lineHeight: "16.8px",
}));

const Value = styled(Typography)(() => ({
  fontSize: 15,
  fontWeight: 700,
  lineHeight: "21px",
}));

const PointsContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));

const PointsLabel = styled(Typography)(() => ({
  fontWeight: 400,
  lineHeight: "21px",
}));

const StateBadgeContainer = styled(Box)(() => ({
  position: "absolute",
  top: "43px",
  right: "6px",
}));
