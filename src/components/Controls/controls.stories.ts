import type { Meta, StoryObj } from "@storybook/react";

import Controls from "./controls";

const meta = {
  title: "Controls",
  component: Controls,
  parameters: {
    layout: "centered",
  },
  args: {
    timerMode: "pomo",
    pomoLength: 25,
    shortLength: 5,
    longLength: 15,
    volume: 1,
  },
  argTypes: {
    timerMode: { control: ["pomo", "short", "long"] },
    setTimerMode: { action: "setTimerMode" },
    setSecondsLeft: { action: "setSecondsLeft" },
    setIsActive: { action: "setIsActive" },
    setButtonText: { action: "setButtonText" },
  },
} satisfies Meta<typeof Controls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ControlsPomoActive: Story = {
  args: {
    timerMode: "pomo",
  },
};

export const ControlsShortActive: Story = {
  args: {
    timerMode: "short",
  },
};

export const ControlsLongActive: Story = {
  args: {
    timerMode: "long",
  },
};
