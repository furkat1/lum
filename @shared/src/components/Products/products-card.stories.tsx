import { Meta, StoryObj } from "@storybook/react";
import { ProductCardContent } from "./products-card";

const meta: Meta = {
  title: "components/Products",
  component: ProductCardContent,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof ProductCardContent>;

export const Empty: Story = {
  args: {},
};

export const CustomStyles: Story = {
  args: {
    customSxStyles: { cardContent: { bgcolor: "red " } },
  },
};

export default meta;
