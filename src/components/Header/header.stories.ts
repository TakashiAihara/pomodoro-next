import type { Meta, StoryObj } from "@storybook/react";

import Controls from "./header";

const meta = {
  title: "Header",
  component: Controls,
  parameters: {
    layout: "centered",
    background: "black",
  },
  args: {
    title: "pomodoro",
  },
} satisfies Meta<typeof Controls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {
  parameters: {
    backgrounds: {
      default: "black",
    },
  },
};
