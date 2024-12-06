import { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Message } from "./message";

const meta: Meta = {
  title: "components/Message",
  component: Message,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Message>;

export const Empty: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    title: "Title",
    text: "Text",
  },
};

export const WithTextAndImage: Story = {
  args: {
    title: "Title",
    text: "Text",
    textAlignment: "RIGHT",
    backgroundImage: (
      <img src="https://cdn.prod.lumenis-ng.com/Feed/Carousel_Backgrounds/BG_3.png" alt="" />
    ),
  },
};

export default meta;
