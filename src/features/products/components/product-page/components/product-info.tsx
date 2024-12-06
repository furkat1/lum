"use client";
import { Box, Stack, styled, useMediaQuery } from "@mui/material";
import { ProductPicturePurpose } from "@shared/constants";
import { useMemo } from "react";

import { palette } from "@/config/palette";
import { Product } from "@/types/products";

import { Slider } from "../components/image-slider";
import { ProductPageDesktopScreen } from "../components/product-page-desktop-screen";
import { ProductPageMobileScreen } from "../components/product-page-mobile-screen";

interface Props {
  product: Product | null;
}

export const ProductInfo = ({ product }: Props) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  if (!product) {
    return null;
  }

  const productPictures = useMemo(() => {
    return (
      product?.pictures
        ?.filter((picture) => picture.purpose !== ProductPicturePurpose.DETAILS)
        ?.map((picture) => picture.url) || []
    );
  }, [product]);

  return (
    <StyledInfoWrapper direction="row">
      <StyledSliderWrapper>
        <Slider pictures={productPictures} />
      </StyledSliderWrapper>
      {isMobile ? (
        <ProductPageMobileScreen product={product} />
      ) : (
        <ProductPageDesktopScreen product={product} />
      )}
    </StyledInfoWrapper>
  );
};

const StyledInfoWrapper = styled(Stack)(({ theme }) => ({
  paddingTop: "16px",
  display: "grid",
  minHeight: "70vh",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateAreas: `
    "image title"
    "image details"
    "image clinicalResults"
    "image technicalSpecs"
    "image addToCart"
  `,
  [theme.breakpoints.down("lg")]: {
    boxSizing: "border-box",
    margin: "10px",
    gridTemplateAreas: `
      "image title"
      "details technicalSpecs"
      "clinicalResults technicalSpecs"
      "addToCart addToCart"
    `,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100vw",
    bgcolor: palette.bg_pink,
    display: "block",
    paddingTop: 0,
    margin: 0,
  },
}));

const StyledSliderWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  gridArea: "image",
  width: "550px",
  [theme.breakpoints.down("lg")]: {
    width: "358px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));
