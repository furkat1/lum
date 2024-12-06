import React from "react";
import { ImgComparisonSlider } from "@img-comparison-slider/react";

interface Props {
  firstImageLabel?: string;
  secondImageLabel?: string;
  firstImage?: React.ReactNode;
  secondImage?: React.ReactNode;
}

export const ComparisonSlider = ({
  firstImageLabel,
  secondImageLabel,
  firstImage = null,
  secondImage = null,
}: Props) => {
  return (
    <ImgComparisonSlider style={{ outline: "none", width: "100%" }}>
      <figure
        style={{
          position: "relative",
          margin: 0,
          padding: 0,
        }}
        slot="first"
      >
        {firstImage}
        <figcaption
          style={{
            position: "absolute",
            top: 15,
            color: "#fff",
            padding: "4px 6px",
            lineHeight: "1em",
            backgroundColor: "#00000080",
            borderRadius: 5,
            left: 20,
          }}
          className="before"
        >
          {firstImageLabel}
        </figcaption>
      </figure>

      <figure
        style={{
          position: "relative",
          margin: 0,
          padding: 0,
        }}
        slot="second"
      >
        {secondImage}
        <figcaption
          style={{
            position: "absolute",
            top: 15,
            color: "#fff",
            padding: "4px 6px",
            lineHeight: "1em",
            backgroundColor: "#00000080",
            borderRadius: 5,
            right: 20,
          }}
          className="after"
        >
          {secondImageLabel}
        </figcaption>
      </figure>
    </ImgComparisonSlider>
  );
};
