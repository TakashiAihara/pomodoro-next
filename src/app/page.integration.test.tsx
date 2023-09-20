/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// @ts-nocheck

// TODO: Extract actions into functions
import { fireEvent, render, screen } from "@testing-library/react";

import Home from "./page";

const mocks = vi.hoisted(() => ({ mockSound: vi.fn() }));
vi.mock("use-sound", () => ({ default: vi.fn(() => [mocks.mockSound]) }));

const SETTINGS_PANE_BUTTON_TITLE = "show preferences pane";
const SETTINGS_PANE_TEXT = "Settings";

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

const TIME_UP_MESSAGES = {
  BREAK: "time for a break",
  WORK: "back to work!",
};

const DEFAULT_MINUTES = {
  POMO: 25,
  SHORT: 3,
  LONG: 15,
};

const DEFAULT_MILL_SECS = {
  POMO: DEFAULT_MINUTES.POMO * 60 * 1000,
  SHORT: DEFAULT_MINUTES.SHORT * 60 * 1000,
  LONG: DEFAULT_MINUTES.LONG * 60 * 1000,
};

const CHANGED_MINUTES = {
  POMO: 30,
  SHORT: 10,
  LONG: 25,
};

const CHANGED_MILL_SECS = {
  POMO: CHANGED_MINUTES.POMO * 60 * 1000,
  SHORT: CHANGED_MINUTES.SHORT * 60 * 1000,
  LONG: CHANGED_MINUTES.LONG * 60 * 1000,
};

// @ts-expect-error no define type because compile not working
const convertToStr = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes);
  const paddedSeconds = String(seconds).padStart(2, "0");

  return `${paddedMinutes}:${paddedSeconds}`;
};

const confirmCheckedControl = (controlLabelText) => {
  expect(screen.getByLabelText(controlLabelText)).toBeChecked();
};
const confirmCurrentTime = (remainingMillSec) => {
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();
};

const confirmCurrentSettings = (remainingMillSec, controlLabelText) => {
  confirmCheckedControl(controlLabelText);
  confirmCurrentTime(remainingMillSec);
};

const startTimerWithClickTimer = (remainingMillSec) => {
  fireEvent.click(screen.getByText(convertToStr(remainingMillSec))); // Click on the timer to start
};

const pauseTimer = () => {
  fireEvent.click(screen.getByText(TIMER_BUTTONS.PAUSE));
};

const resumeTimer = () => {
  fireEvent.click(screen.getByText(TIMER_BUTTONS.RESUME));
};

const confirmTimerRunning = (remainingMillSec) => {
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  confirmCurrentTime(remainingMillSec);
  return remainingMillSec;
};

const confirmTimerPaused = (remainingMillSec) => {
  vi.advanceTimersByTime(1000 * 120);
  confirmCurrentTime(remainingMillSec);
};

const waitEnd = (remainingMillSec) => {
  vi.advanceTimersByTime(remainingMillSec);
};

const confirmTimerEnd = (expectMessage) => {
  expect(mocks.mockSound).toHaveBeenCalled();
  expect(screen.getByText(expectMessage)).toBeInTheDocument();
};

const switchControl = (controlButton) => {
  fireEvent.click(screen.getByLabelText(controlButton));
};

const openSettings = () => {
  fireEvent.click(screen.getByTitle(SETTINGS_PANE_BUTTON_TITLE));
  expect(screen.getByText(SETTINGS_PANE_TEXT)).toBeInTheDocument();
};

const changeAllTimer = (pomoLength, shortLength, longLength) => {
  // Change all timer
  fireEvent.input(
    screen.getByLabelText("pomodoro", {
      selector: "input[type=number]",
    }),
    {
      target: { value: pomoLength },
    },
  );
  fireEvent.input(
    screen.getByLabelText("short break", {
      selector: "input[type=number]",
    }),
    {
      target: { value: shortLength },
    },
  );
  fireEvent.input(
    screen.getByLabelText("long break", {
      selector: "input[type=number]",
    }),
    {
      target: { value: longLength },
    },
  );
  fireEvent.click(screen.getByText("Apply"));
};

it("Basic Pomodoro scenario with default settings", () => {
  vi.useFakeTimers();
  render(<Home />);
  let remainingMillSec = 0;

  // *** 1st Pomodoro ***
  remainingMillSec = DEFAULT_MILL_SECS.POMO;
  confirmCurrentSettings(remainingMillSec, CONTROL_RADIO_BUTTONS.POMO);
  startTimerWithClickTimer(remainingMillSec);
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  pauseTimer();
  confirmTimerPaused(remainingMillSec);
  resumeTimer();
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  waitEnd(remainingMillSec);
  confirmTimerEnd(TIME_UP_MESSAGES.BREAK);

  // *** Short Break ***
  remainingMillSec = DEFAULT_MILL_SECS.SHORT;
  switchControl(CONTROL_RADIO_BUTTONS.SHORT);
  confirmCurrentSettings(remainingMillSec, CONTROL_RADIO_BUTTONS.SHORT);
  startTimerWithClickTimer(remainingMillSec);
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  waitEnd(remainingMillSec);
  confirmTimerEnd(TIME_UP_MESSAGES.WORK);

  // *** 2st Pomodoro ***
  remainingMillSec = DEFAULT_MILL_SECS.POMO;
  switchControl(CONTROL_RADIO_BUTTONS.POMO);
  confirmCurrentSettings(remainingMillSec, CONTROL_RADIO_BUTTONS.POMO);
  startTimerWithClickTimer(remainingMillSec);
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  waitEnd(remainingMillSec);
  confirmTimerEnd(TIME_UP_MESSAGES.BREAK);

  // *** Long Break ***
  remainingMillSec = DEFAULT_MILL_SECS.LONG;
  switchControl(CONTROL_RADIO_BUTTONS.LONG);
  confirmCurrentSettings(remainingMillSec, CONTROL_RADIO_BUTTONS.LONG);
  startTimerWithClickTimer(remainingMillSec);
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  waitEnd(remainingMillSec);
  confirmTimerEnd(TIME_UP_MESSAGES.WORK);
});

it("Basic Pomodoro scenario with changed settings", () => {
  vi.useFakeTimers();
  render(<Home />);
  let remainingMillSec = 0;

  openSettings();
  changeAllTimer(
    CHANGED_MINUTES.POMO,
    CHANGED_MINUTES.SHORT,
    CHANGED_MINUTES.LONG,
  );

  // *** 1st Pomodoro ***
  remainingMillSec = CHANGED_MILL_SECS.POMO;
  confirmCurrentSettings(remainingMillSec, CONTROL_RADIO_BUTTONS.POMO);
  startTimerWithClickTimer(remainingMillSec);
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  pauseTimer();
  confirmTimerPaused(remainingMillSec);
  resumeTimer();
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  waitEnd(remainingMillSec);
  confirmTimerEnd(TIME_UP_MESSAGES.BREAK);

  // *** Short Break ***
  remainingMillSec = CHANGED_MILL_SECS.SHORT;
  switchControl(CONTROL_RADIO_BUTTONS.SHORT);
  confirmCurrentSettings(remainingMillSec, CONTROL_RADIO_BUTTONS.SHORT);
  startTimerWithClickTimer(remainingMillSec);
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  waitEnd(remainingMillSec);
  confirmTimerEnd(TIME_UP_MESSAGES.WORK);

  // *** 2st Pomodoro ***
  remainingMillSec = CHANGED_MILL_SECS.POMO;
  switchControl(CONTROL_RADIO_BUTTONS.POMO);
  confirmCurrentSettings(remainingMillSec, CONTROL_RADIO_BUTTONS.POMO);
  startTimerWithClickTimer(remainingMillSec);
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  waitEnd(remainingMillSec);
  confirmTimerEnd(TIME_UP_MESSAGES.BREAK);

  // *** Long Break ***
  remainingMillSec = CHANGED_MILL_SECS.LONG;
  switchControl(CONTROL_RADIO_BUTTONS.LONG);
  confirmCurrentSettings(remainingMillSec, CONTROL_RADIO_BUTTONS.LONG);
  startTimerWithClickTimer(remainingMillSec);
  remainingMillSec = confirmTimerRunning(remainingMillSec);
  waitEnd(remainingMillSec);
  confirmTimerEnd(TIME_UP_MESSAGES.WORK);
});
