"use client";
import { Box, styled } from "@mui/material";
import { ComparisonSlider } from "@shared/components";
import { ProductPicturePurpose } from "@shared/constants";
import Image from "next/image";
import { useMemo } from "react";

import NoImage from "@/app/assets/NoImage.svg";
import { Product } from "@/types/products";

interface Props {
  product: Product;
}

export const ClinicalResultSlider = ({ product }: Props) => {
  const clinicalResultBeforeImage = useMemo(
    () =>
      product?.pictures?.find(
        (picture) => picture.purpose === ProductPicturePurpose.CLINICAL_RESULTS_BEFORE,
      )?.url || "",
    [product?.pictures],
  );
  const clinicalResultAfterImage = useMemo(
    () =>
      product?.pictures?.find(
        (picture) => picture.purpose === ProductPicturePurpose.CLINICAL_RESULTS_AFTER,
      )?.url || "",
    [product?.pictures],
  );

  return (
    <>
      {(clinicalResultBeforeImage || clinicalResultAfterImage) && (
        <Box width={"50%"}>
          <ComparisonSlider
            firstImageLabel={"Before"}
            secondImageLabel={"After"}
            firstImage={
              <StyledSliderImage>
                <Image
                  src={clinicalResultBeforeImage || NoImage}
                  alt=""
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </StyledSliderImage>
            }
            secondImage={
              <StyledSliderImage>
                <Image
                  src={clinicalResultAfterImage || NoImage}
                  alt=""
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </StyledSliderImage>
            }
          />
        </Box>
      )}
    </>
  );
};

const StyledSliderImage = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "155px",
}));
