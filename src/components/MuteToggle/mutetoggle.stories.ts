import type { Meta, StoryObj } from "@storybook/react";

import Mutetoggle from "./mutetoggle";

const meta = {
  title: "Mutetoggle",
  component: Mutetoggle,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "black",
    },
  },
  argTypes: {
    setVolume: { action: "setVolume" },
    volume: { control: "number" },
  },
} satisfies Meta<typeof Mutetoggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MutetoggleOn: Story = {
  args: {
    volume: 1,
  },
};

export const MutetoggleOff: Story = {
  args: {
    volume: 0,
  },
};
