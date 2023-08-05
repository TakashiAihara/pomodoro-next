import type { Meta, StoryObj } from "@storybook/react";

import Timerdisplay from "./timerdisplay";

const meta = {
  title: "Timerdisplay",
  component: Timerdisplay,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "white",
    },
  },
  args: {
    buttonText: "Button",
    percentage: 0,
    timeLeft: 0,
    timerMode: "pomo",
  },
  argTypes: {
    buttonText: { control: "Button" },
    isActive: { control: "boolean" },
    percentage: { control: "number" },
    setButtonText: { action: "setButtonText" },
    setIsActive: { action: "setIsActive" },
    setVolume: { action: "setVolume" },
    timeLeft: { control: "string" },
    timerMode: { control: ["pomo", "short", "long"] },
    volume: { control: "number" },
  },
} satisfies Meta<typeof Timerdisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TimerdisplayFull: Story = {
  args: {
    buttonText: "START",
    percentage: 100,
    timeLeft: "25:00",
    volume: 1,
  },
};

export const TimerdisplayHalf: Story = {
  args: {
    buttonText: "PAUSE",
    percentage: 50,
    timeLeft: "12:30",
    volume: 1,
  },
};

export const TimerdisplayEmpty: Story = {
  args: {
    buttonText: "START",
    percentage: 0,
    timeLeft: "0:00",
    volume: 0,
  },
};
