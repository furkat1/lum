import { Meta, StoryObj } from "@storybook/react";

import ComparisonSlider from "./ComparisonSlider";
import React from "react";

const meta: Meta = {
  title: "components/ComparisonSlider",
  component: ComparisonSlider,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof ComparisonSlider>;

export const Empty: Story = {
  args: {},
};

export const WithImages: Story = {
  args: {
    firstImageLabel: "before",
    secondImageLabel: "after",
    firstImage: (
      <img
        width="100%"
        src={
          "https://cdn.prod.lumenis-ng.com/Store/autotest/Store_Products_Clinical_Results/Before.PNG"
        }
        alt=""
      />
    ),
    secondImage: (
      <img
        width="100%"
        src={
          "https://cdn.prod.lumenis-ng.com/Store/autotest/Store_Products_Clinical_Results/After.PNG"
        }
        alt=""
      />
    ),
  },
};

export default meta;
