import type { Meta, StoryObj } from "@storybook/react";

import Settings from "./settings";

const meta = {
  title: "Settings",
  component: Settings,
  parameters: {
    backgrounds: {
      default: "black",
    },
  },

  args: {
    accentColor: "#ff0000",
    fontPref: "kumbh",
    longLength: 15,
    pomoLength: 25,
    shortLength: 5,
    visible: true,
  },
  argTypes: {
    accentColor: { control: ["default, blue, purple"] },
    setAccentColor: { action: "setAccentColor" },
    fontPref: { control: ["kumbh", "roboto", "space"] },
    setFontPref: { action: "setFontPref" },
    closeSettings: { action: "closeSettings" },
    longLength: { control: "number" },
    pomoLength: { control: "number" },
    shortLength: { control: "number" },
    setLongLength: { action: "setLongLength" },
    setPomoLength: { action: "setPomoLength" },
    setSecondsLeft: { action: "setSecondsLeft" },
    setShortLength: { action: "setShortLength" },
    timerMode: { control: ["pomo", "short", "long"] },
    toggleSettingsVisibility: { action: "toggleSettingsVisibility" },
    visible: { control: "boolean" },
  },
} satisfies Meta<typeof Settings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsDefaultKumbh: Story = {
  args: {
    accentColor: "default",
    fontPref: "kumbh",
    pomoLength: 5,
    shortLength: 1,
    longLength: 15,
  },
};

export const SettingsBlueRoboto: Story = {
  args: {
    accentColor: "blue",
    fontPref: "roboto",
    pomoLength: 15,
    shortLength: 5,
    longLength: 25,
  },
};

export const SettingsPurpleSpace: Story = {
  args: {
    accentColor: "purple",
    fontPref: "space",
    pomoLength: 25,
    shortLength: 10,
    longLength: 35,
  },
};
