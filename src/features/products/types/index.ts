import { SxProps } from "@mui/material";

export type ProductCardProps = {
  machineTypeName?: string;
  offerText?: string;
  name?: string;
  code?: string;
  price?: number;
  priceBefore?: number;
  currency?: string;
  circlePoints?: number;
  customSxStyles?: SxProps;
  unitsInPack?: string;
  button?: React.ReactNode;
  productImage?: React.ReactNode;
  circlePointsIcon?: React.ReactNode;
};
