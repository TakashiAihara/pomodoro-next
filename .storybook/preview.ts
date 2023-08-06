import { type Preview } from "@storybook/react";
import { ScreenshotOptions, withScreenshot } from "storycap";

import "../src/index.css";
import "../src/App.css";

export const decorators = [withScreenshot];

export const screenshotOptions: { screenshot: ScreenshotOptions } = {
  screenshot: {
    variants: {
      "iPhone 11": {
        viewport: "iPhone 11",
      },
      iPad: {
        viewport: "iPad",
      },
      "1024x768": {
        viewport: "1024x768",
      },
    },
    omitBackground: true,
    delay: 1000,
    waitAssets: true,
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
