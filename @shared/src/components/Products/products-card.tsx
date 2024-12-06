import React from "react";
import { Box, Stack, SxProps, Typography } from "@mui/material";

interface ProductCardProps {
  machineTypeName?: string;
  offerText?: string;
  name?: string;
  code?: string;
  price?: number;
  priceBefore?: number;
  currency?: string;
  circlePoints?: number;
  unitsInPack?: string;
  customSxStyles?: Partial<Record<keyof typeof styles, SxProps>>;
  button?: React.ReactNode;
  productImage?: React.ReactNode;
  circlePointsIcon?: React.ReactNode;
}

export const ProductCardContent = ({
  machineTypeName,
  offerText,
  name,
  code,
  price,
  priceBefore,
  currency,
  circlePoints,
  customSxStyles = {},
  unitsInPack = "",
  button = null,
  productImage = null,
  circlePointsIcon = null,
}: ProductCardProps) => {
  const formatPrice = (value?: number) => {
    if (!value || !currency) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Box sx={{ ...styles.cardContent, ...customSxStyles["cardContent"] } as SxProps}>
      <Box sx={{ ...styles.imageContainer, ...customSxStyles["imageContainer"] } as SxProps}>
        {productImage && productImage}
      </Box>

      <Box sx={{ ...styles.cardContentBlock, ...customSxStyles["cardContentBlock"] } as SxProps}>
        <Stack direction="row" gap={1} width="100%" justifyContent="space-between">
          <Typography
            sx={
              { ...styles.relatedMachineName, ...customSxStyles["relatedMachineName"] } as SxProps
            }
          >
            {machineTypeName}
          </Typography>
          {offerText && (
            <Box
              sx={
                {
                  ...styles.specialOfferContainer,
                  ...customSxStyles["cardContentBlock"],
                } as SxProps
              }
            >
              <Typography
                sx={
                  {
                    ...styles.specialOfferTypography,
                    ...customSxStyles["specialOfferTypography"],
                  } as SxProps
                }
              >
                {offerText}
              </Typography>
            </Box>
          )}
        </Stack>

        <Box sx={{ ...styles.infoContainer, ...customSxStyles["infoContainer"] } as SxProps}>
          <Typography sx={{ ...styles.productName, ...customSxStyles["productName"] } as SxProps}>
            {name}
          </Typography>

          <Typography sx={{ ...styles.productCode, ...customSxStyles["productCode"] } as SxProps}>
            {code}
          </Typography>

          <Typography sx={{ ...styles.unitsInPack, ...customSxStyles["unitsInPack"] } as SxProps}>
            {unitsInPack && unitsInPack}
          </Typography>

          <Stack
            sx={
              {
                ...styles.productPricesContainer,
                ...customSxStyles["productPricesContainer"],
              } as SxProps
            }
          >
            {priceBefore && (
              <Typography sx={{ ...styles.oldPrice, ...customSxStyles["oldPrice"] } as SxProps}>
                {formatPrice(priceBefore)}
              </Typography>
            )}
            <Typography sx={{ ...styles.actualPrice, ...customSxStyles["actualPrice"] } as SxProps}>
              {formatPrice(price)}
            </Typography>
          </Stack>
        </Box>

        {button && button}

        {circlePoints !== undefined && (
          <Box
            sx={
              {
                ...styles.circlePointsContainer,
                ...customSxStyles["circlePointsContainer"],
              } as SxProps
            }
          >
            {circlePointsIcon && circlePointsIcon}
            <Typography
              sx={{ ...styles.pointsAmount, ...customSxStyles["pointsAmount"] } as SxProps}
            >
              {circlePoints}
            </Typography>
            <Typography sx={{ ...styles.pointsLabel, ...customSxStyles["pointsLabel"] } as SxProps}>
              Points
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  cardContent: {
    display: "flex",
    padding: 0,
    bgcolor: "#403B3B",
    borderRadius: "5.45px",
    width: 325,
    overflow: "hidden",
    position: "relative",
    margin: "auto",
  },
  imageContainer: {
    minWidth: "45%",
    maxWidth: 300,
    width: "45%",
    boxSizing: "border-box",
    position: "relative",
  },
  cardContentBlock: {
    padding: "0 0 7px 9px",
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: 220,
  },
  relatedMachineName: {
    fontFamily: "Nunito, sans-serif",
    fontSize: 12,
    lineHeight: "13px",
    fontWeight: 400,
    color: "white",
    opacity: 0.5,
    minHeight: 26,
    display: "flex",
    alignItems: "center",
    flex: 1,
    margin: "auto auto auto 0",
  },
  specialOfferContainer: {
    backgroundColor: "#726e6e",
    borderRadius: "0 5.45px",
    padding: "0 8px",
    zIndex: 2,
    alignSelf: "flex-start",
    minHeight: 27,
    minWidth: 40,
    maxWidth: "50%",
    textAlign: "center",
  },
  specialOfferTypography: {
    fontFamily: "Nunito, sans-serif",
    color: "#fff",
    opacity: 0.8,
    fontWeight: 700,
    fontSize: 12,
    lineHeight: "13px",
    wordWrap: "break-word",
    textWrap: "wrap",
    maxWidth: "100%",
  },
  infoContainer: { flex: 1, paddingRight: 1, display: "flex", flexDirection: "column" },
  productName: {
    fontFamily: "Nunito, sans-serif",
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    minHeight: 22.5,
    lineHeight: "20px",
    overflowWrap: "anywhere",
    marginTop: 0.5,
  },
  productCode: {
    fontFamily: "Nunito, sans-serif",
    fontWeight: 300,
    fontSize: 12,
    color: "#fff",
    minHeight: 20,
    lineHeight: "20px",
  },
  unitsInPack: {
    fontFamily: "Nunito, sans-serif",
    fontWeight: 600,
    fontSize: 16,
    color: "#FF7F92",
    opacity: 0.6,
    minHeight: 20,
    lineHeight: "20px",
  },
  productPricesContainer: {
    alignItems: "flex-start",
    width: "max-content",
    marginTop: "auto",
    marginBottom: 1,
  },
  oldPrice: {
    fontFamily: "Nunito, sans-serif",
    fontSize: 14,
    color: "#fff",
    textDecoration: "line-through",
    lineHeight: "20px",
  },
  actualPrice: {
    fontFamily: "Nunito, sans-serif",
    color: "#FF7F92",
    fontWeight: 700,
    fontSize: 19,
    lineHeight: "20px",
  },
  circlePointsContainer: {
    backgroundColor: "#000",
    padding: 0.5,
    borderTopLeftRadius: 6,
    textAlign: "center",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #655C5C",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  pointsAmount: {
    fontFamily: "Nunito, sans-serif",
    fontWeight: 700,
    fontSize: 14,
    lineHeight: "16px",
    color: "#fff",
  },
  pointsLabel: {
    fontFamily: "Nunito, sans-serif",
    fontWeight: 400,
    fontSize: 9,
    lineHeight: "12px",
    color: "#fff",
  },
};

export default ProductCardContent;
