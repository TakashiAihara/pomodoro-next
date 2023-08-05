import type { Meta, StoryObj } from "@storybook/react";

import Button from "./button";

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    buttonText: { control: "Button" },
    type: { control: ["settings", "close", "apply"] },
    toggleVisibility: { action: "toggleVisibility" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsButton: Story = {
  args: {
    buttonText: "Button",
    type: "settings",
  },
  parameters: {
    backgrounds: {
      default: "black",
    },
  },
};

export const CloseButton: Story = {
  args: {
    buttonText: "x",
    type: "close",
  },
};

export const ApplyButton: Story = {
  args: {
    buttonText: "Apply",
    type: "apply",
  },
};
