import type { Preview } from "@storybook/react";

import "../src/index.css";
import "../src/App.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
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
  },
};

export default preview;
