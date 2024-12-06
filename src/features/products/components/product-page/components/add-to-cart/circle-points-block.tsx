import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import CirclesIcon from "@/app/assets/Circles.svg";
import { palette } from "@/config/palette";

import { CirclePoints } from "./types";

export type CirclePointsProps = {
  circlePoints?: CirclePoints;
};

export const CirclePointsBlock = ({ circlePoints }: CirclePointsProps) => {
  return (
    <Box sx={styles.Container}>
      <Image src={CirclesIcon} width={13} height={13} alt="" />
      <Typography sx={styles.PointsAmount}>{circlePoints?.pointsTier1 || 0}</Typography>
      <Typography sx={styles.PointsLabel}>Points</Typography>
    </Box>
  );
};

const styles = {
  Container: {
    backgroundColor: palette.black,
    padding: "5px",
    textAlign: "center",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #655C5C",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  PointsAmount: {
    fontFamily: "Nunito, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "16px",
    color: palette.white,
  },
  PointsLabel: {
    fontFamily: "Nunito, sans-serif",
    fontWeight: 400,
    fontSize: 9,
    lineHeight: "12px",
    color: palette.white,
  },
};
