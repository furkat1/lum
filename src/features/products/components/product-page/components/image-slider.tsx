import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box, styled, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useMemo } from "react";
import SlickSlider from "react-slick";

import NoImage from "@/app/assets/NoImage.svg";
import { palette } from "@/config/palette";

export type SliderProps = {
  pictures: string[];
};

export const Slider = ({ pictures }: SliderProps) => {
  const isLg = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const settings = useMemo(
    () => ({
      dots: pictures && pictures.length > 1,
      infinite: pictures && pictures.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    }),
    [pictures],
  );

  return (
    <StyledSlickSlider {...settings}>
      {pictures?.length ? (
        pictures.map((pic, index) => (
          <ImageContainer key={pic + index}>
            <Image
              src={pic}
              className="slider-image"
              style={{
                objectFit: "cover",
                border: "none",
              }}
              width={isLg ? 360 : 550}
              height={isLg ? 240 : 390}
              alt=""
            />
          </ImageContainer>
        ))
      ) : (
        <ImageContainer>
          <Image
            src={NoImage}
            className="slider-image"
            style={{ objectFit: "cover", border: "none" }}
            width={isLg ? 360 : 550}
            height={isLg ? 240 : 390}
            alt=""
          />
        </ImageContainer>
      )}
    </StyledSlickSlider>
  );
};

const ImageContainer = styled(Box)(() => ({
  position: "relative",
  width: "100%",
  height: "100%",
}));

// eslint-disable-next-line
// @ts-ignore
const StyledSlickSlider = styled(SlickSlider)(({ theme }) => ({
  width: "550px",
  height: "390px",
  [theme.breakpoints.down("lg")]: {
    width: "360px",
    height: "240px",
  },

  ".slick-dots li": {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.grey,
    margin: "4px !important",
    "&.slick-active": {
      backgroundColor: palette.primary_main,
    },
    "button::before": {
      opacity: 0,
    },
  },
}));
