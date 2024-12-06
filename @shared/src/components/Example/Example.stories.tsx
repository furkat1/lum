import { Meta, StoryObj } from "@storybook/react";

import { Example } from "./Example";

const meta: Meta = {
  title: "components/Example",
  component: Example,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof Example>;

export const Empty: Story = {
  args: {},
};

export const WithText: Story = {
  args: {
    text: "Hello Storybook",
  },
};

export const WithColor: Story = {
  args: {
    text: "Hello Storybook",
    color: "#FF7F92",
  },
};

export default meta;
