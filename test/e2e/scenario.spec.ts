/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// @ts-nocheck

import { expect, test } from "@playwright/test";

const SETTINGS_PANE_BUTTON_TITLE = "show preferences pane";
const SETTINGS_PANE_TEXT = "Settings";
const SETTINGS_PANE_CLASS = "preferences__pane";

const TIMER_BUTTONS = {
  START: "START",
  PAUSE: "PAUSE",
  RESUME: "RESUME",
};

const CONTROL_RADIO_BUTTONS = {
  POMO: "pomodoro",
  SHORT: "short break",
  LONG: "long break",
};

const INPUT_LABELS = {
  POMO: "pomodoro",
  SHORT: "short break",
  LONG: "long break",
};

const CHANGED_MINUTES = {
  POMO: 30,
  SHORT: 10,
  LONG: 25,
};

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://localhost:3000/");
});

const runningAndResumeScenario = async (
  page,
  checkRunningText1,
  checkRunningText2,
) => {
  await page.getByText(TIMER_BUTTONS.START).click();
  await expect(page.getByText(checkRunningText1)).toBeVisible();

  await page.getByText(TIMER_BUTTONS.PAUSE).click();
  await page.getByText(TIMER_BUTTONS.RESUME).click();
  await expect(page.getByText(checkRunningText2)).toBeVisible();

  await page.getByText(TIMER_BUTTONS.PAUSE).click();
};

const pomodoroScenario = async (page, checkRunningText1, checkRunningText2) => {
  await page.locator("label", { hasText: CONTROL_RADIO_BUTTONS.POMO }).click();

  await runningAndResumeScenario(page, checkRunningText1, checkRunningText2);
};

const shortBreakScenario = async (
  page,
  checkRunningText1,
  checkRunningText2,
) => {
  await page.locator("label", { hasText: CONTROL_RADIO_BUTTONS.SHORT }).click();

  await runningAndResumeScenario(page, checkRunningText1, checkRunningText2);
};

const longBreakScenario = async (
  page,
  checkRunningText1,
  checkRunningText2,
) => {
  await page.locator("label", { hasText: CONTROL_RADIO_BUTTONS.LONG }).click();

  await runningAndResumeScenario(page, checkRunningText1, checkRunningText2);
};

const settingsChangeScenario = async (page) => {
  await page.getByTitle(SETTINGS_PANE_BUTTON_TITLE).click();
  await expect(page.getByText(SETTINGS_PANE_TEXT)).toBeVisible();

  await page
    .locator(`//div[@class="${SETTINGS_PANE_CLASS}"]`)
    .getByLabel(INPUT_LABELS.POMO)
    .fill(CHANGED_MINUTES.POMO.toString());

  await page
    .locator(`//div[@class="${SETTINGS_PANE_CLASS}"]`)
    .getByLabel(INPUT_LABELS.SHORT)
    .fill(CHANGED_MINUTES.SHORT.toString());

  await page
    .locator(`//div[@class="${SETTINGS_PANE_CLASS}"]`)
    .getByLabel(INPUT_LABELS.LONG)
    .fill(CHANGED_MINUTES.LONG.toString());

  await page.getByText("Apply").click();
};

test("Timer can be started, paused, resumed.", async ({ page }) => {
  await pomodoroScenario(page, "24:58", "24:56");
  await shortBreakScenario(page, "2:58", "2:56");
  await longBreakScenario(page, "14:58", "14:56");
});

test("Settings can be changed.", async ({ page }) => {
  await settingsChangeScenario(page);
  await pomodoroScenario(page, "29:58", "29:56");
  await shortBreakScenario(page, "9:58", "9:56");
  await longBreakScenario(page, "24:58", "24:56");
});
