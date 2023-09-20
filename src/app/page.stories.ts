import type { Meta, StoryObj } from "@storybook/react";

import Home from "./page";

const meta = {
  title: "App",
  component: Home,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};
