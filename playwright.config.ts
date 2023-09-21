import { defineConfig, devices } from "@playwright/test";

const defaultDevices = [
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"] },
  },
  {
    name: "firefox",
    use: { ...devices["Desktop Firefox"] },
  },
  {
    name: "webkit",
    use: { ...devices["Desktop Safari"] },
  },
  {
    name: "Mobile Chrome",
    use: { ...devices["Pixel 5"] },
  },
  {
    name: "Mobile Safari",
    use: { ...devices["iPhone 12"] },
  },
];

const defaultWebServer = {
  command: "BROWSER=none pnpm dev",
  url: "http://localhost:3000",
  reuseExistingServer: true,
};

const defaultConfig = {
  testDir: "./test/e2e",
  outputDir: "./__e2e__/",
  projects: defaultDevices,
};

const localConfig = defineConfig({
  ...defaultConfig,
  webServer: defaultWebServer,
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  reporter: "html",
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retry-with-video",
    trace: "on-first-retry",
  },
});

const ciConfig = defineConfig({
  ...defaultConfig,
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  workers: 1,
  webServer: {
    ...defaultWebServer,
    reuseExistingServer: false,
  },
  reporter: [
    [
      "blob",
      {
        open: "never",
        outputDir: "./test-results/e2e_blob",
      },
    ],
  ],
  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retry-with-video",
    trace: "retry-with-trace",
    navigationTimeout: 6000,
    actionTimeout: 4000,
  },
});

export default process.env.CI !== undefined ? ciConfig : localConfig;
