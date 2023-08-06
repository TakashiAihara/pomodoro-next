import { type Preview } from "@storybook/react";
import { ScreenshotOptions, withScreenshot } from "storycap";

import "../src/index.css";
import "../src/App.css";

export const decorators = [withScreenshot];

export const screenshotOptions: { screenshot: ScreenshotOptions } = {
  screenshot: {
    viewports: ["iPhone 11", "iPad", "1024x768"],
    omitBackground: true,
    fullPage: true,
  },
};

export const backgroundsOptions = {
  backgrounds: {
    default: "white",
    values: [
      {
        name: "black",
        value: "#000000",
      },
      {
        name: "white",
        value: "#ffffff",
      },
    ],
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    ...backgroundsOptions,
    ...screenshotOptions,
  },
};

export default preview;
