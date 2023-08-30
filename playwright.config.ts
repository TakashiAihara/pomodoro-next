import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

const defaultConfig: PlaywrightTestConfig = {
  testDir: "./test/e2e",
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    headless: true,
    video: "retry-with-video",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "BROWSER=none npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    stdout: "ignore",
    stderr: "pipe",
  },
  projects: [
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
  ],
};

const ciConfig: PlaywrightTestConfig = {
  testDir: `./test/e2e`,
  outputDir: "./__e2e__/",
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  workers: 2,
  webServer: {
    command: "BROWSER=none npm run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    stdout: "ignore",
    stderr: "pipe",
  },
  reporter: [
    ["html", { open: "never", outputFolder: "./test-results/e2e" }],
    ["github", { open: "never", outputFolder: "./test-results/e2e" }],
  ],
  use: {
    headless: true,
    screenshot: "on",
    video: "on",
    trace: "on",
    navigationTimeout: 3000,
    actionTimeout: 3000,
  },
  projects: [
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
  ],
};

export default defineConfig(
  process.env.CI !== undefined ? ciConfig : defaultConfig,
);
