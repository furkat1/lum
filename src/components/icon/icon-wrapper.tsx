"use client";

import { Box, SxProps } from "@mui/material";
import { FC, useState } from "react";

import { palette } from "@/config/palette";

export type IconProps = {
  Icon: CustomIcon;
  hoverColor?: string;
  sx?: SxProps;
};

export type CustomIcon = ({ fill }: { fill: string }) => JSX.Element;

export const IconWrapper: FC<IconProps> = ({ Icon, hoverColor, sx }: IconProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Box sx={sx} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Icon fill={hovered ? hoverColor || "#FAB3BD" : palette.white} />
    </Box>
  );
};
