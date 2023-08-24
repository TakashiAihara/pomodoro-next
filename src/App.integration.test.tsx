/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// @ts-nocheck

// TODO: Extract actions into functions
import { fireEvent, render, screen } from "@testing-library/react";

import App from "./App";

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

it("Basic Pomodoro scenario with default settings", () => {
  vi.useFakeTimers();
  render(<App />);

  // *** 1st Pomodoro ***
  // Confirm current settings
  let remainingMillSec = DEFAULT_MILL_SECS.POMO;
  expect(screen.getByLabelText(CONTROL_RADIO_BUTTONS.POMO)).toBeChecked();
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Start the pomodoro timer
  fireEvent.click(screen.getByText(TIMER_BUTTONS.START));

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Stop the timer temporarily
  vi.advanceTimersByTime(1000 * 60);
  remainingMillSec = remainingMillSec - 1000 * 60;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();
  fireEvent.click(screen.getByText(TIMER_BUTTONS.PAUSE));

  // Confirm the timer is paused
  vi.advanceTimersByTime(1000 * 120);
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Resume the timer
  fireEvent.click(screen.getByText(TIMER_BUTTONS.RESUME));

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Timer is finished, realized sound, confirm the message
  vi.advanceTimersByTime(remainingMillSec);
  expect(mocks.mockSound).toHaveBeenCalled();
  expect(screen.getByText(TIME_UP_MESSAGES.BREAK)).toBeInTheDocument();

  // *** Short Break ***
  // Change to short break
  fireEvent.click(screen.getByLabelText(CONTROL_RADIO_BUTTONS.SHORT));

  // Confirm current settings
  remainingMillSec = DEFAULT_MILL_SECS.SHORT;
  expect(screen.getByLabelText(CONTROL_RADIO_BUTTONS.SHORT)).toBeChecked();
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Start the pomodoro timer
  // fireEvent.click(screen.getByText(TIMER_BUTTONS.START)); TODO: fix
  fireEvent.click(screen.getByText(convertToStr(remainingMillSec))); // Click on the timer to start

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Timer is finished, realized sound, confirm the message
  vi.advanceTimersByTime(remainingMillSec);
  expect(mocks.mockSound).toHaveBeenCalled();
  expect(screen.getByText(TIME_UP_MESSAGES.WORK)).toBeInTheDocument();

  // *** 2st Pomodoro ***
  // Change to long break
  fireEvent.click(screen.getByLabelText(CONTROL_RADIO_BUTTONS.POMO));

  // Confirm current settings
  remainingMillSec = DEFAULT_MILL_SECS.POMO;
  expect(screen.getByLabelText(CONTROL_RADIO_BUTTONS.POMO)).toBeChecked();
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Start the pomodoro timer
  // fireEvent.click(screen.getByText(TIMER_BUTTONS.START));
  fireEvent.click(screen.getByText(convertToStr(remainingMillSec))); // Click on the timer to start

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Timer is finished, realized sound, confirm the message
  vi.advanceTimersByTime(remainingMillSec);
  expect(mocks.mockSound).toHaveBeenCalled();
  expect(screen.getByText(TIME_UP_MESSAGES.BREAK)).toBeInTheDocument();

  // *** Long Break ***
  // Change to long break
  fireEvent.click(screen.getByLabelText(CONTROL_RADIO_BUTTONS.LONG));

  // Confirm current settings
  remainingMillSec = DEFAULT_MILL_SECS.LONG;
  expect(screen.getByLabelText(CONTROL_RADIO_BUTTONS.LONG)).toBeChecked();
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Start the pomodoro timer
  // fireEvent.click(screen.getByText(TIMER_BUTTONS.START)); TODO: fix
  fireEvent.click(screen.getByText(convertToStr(remainingMillSec))); // Click on the timer to start

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Timer is finished, realized sound, confirm the message
  vi.advanceTimersByTime(remainingMillSec);
  expect(mocks.mockSound).toHaveBeenCalled();
  expect(screen.getByText(TIME_UP_MESSAGES.WORK)).toBeInTheDocument();
});

it("Basic Pomodoro scenario with changed settings", () => {
  vi.useFakeTimers();
  render(<App />);

  // Open setting
  fireEvent.click(screen.getByTitle(SETTINGS_PANE_BUTTON_TITLE));
  expect(screen.getByText(SETTINGS_PANE_TEXT)).toBeInTheDocument();

  // Change all timer
  fireEvent.input(
    screen.getByLabelText("pomodoro", {
      selector: "input[type=number]",
    }),
    {
      target: { value: CHANGED_MINUTES.POMO },
    },
  );
  fireEvent.input(
    screen.getByLabelText("short break", {
      selector: "input[type=number]",
    }),
    {
      target: { value: CHANGED_MINUTES.SHORT },
    },
  );
  fireEvent.input(
    screen.getByLabelText("long break", {
      selector: "input[type=number]",
    }),
    {
      target: { value: CHANGED_MINUTES.LONG },
    },
  );
  fireEvent.click(screen.getByText("Apply"));

  // *** 1st Pomodoro ***
  // Confirm current settings
  let remainingMillSec = CHANGED_MILL_SECS.POMO;
  expect(screen.getByLabelText(CONTROL_RADIO_BUTTONS.POMO)).toBeChecked();
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Start the pomodoro timer
  fireEvent.click(screen.getByText(TIMER_BUTTONS.START));

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Stop the timer temporarily
  vi.advanceTimersByTime(1000 * 60);
  remainingMillSec = remainingMillSec - 1000 * 60;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();
  fireEvent.click(screen.getByText(TIMER_BUTTONS.PAUSE));

  // Confirm the timer is paused
  vi.advanceTimersByTime(1000 * 120);
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Resume the timer
  fireEvent.click(screen.getByText(TIMER_BUTTONS.RESUME));

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Timer is finished, realized sound, confirm the message
  vi.advanceTimersByTime(remainingMillSec);
  expect(mocks.mockSound).toHaveBeenCalled();
  expect(screen.getByText(TIME_UP_MESSAGES.BREAK)).toBeInTheDocument();

  // *** Short Break ***
  // Change to short break
  fireEvent.click(screen.getByLabelText(CONTROL_RADIO_BUTTONS.SHORT));

  // Confirm current settings
  remainingMillSec = CHANGED_MILL_SECS.SHORT;
  expect(screen.getByLabelText(CONTROL_RADIO_BUTTONS.SHORT)).toBeChecked();
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Start the pomodoro timer
  // fireEvent.click(screen.getByText(TIMER_BUTTONS.START)); TODO: fix
  fireEvent.click(screen.getByText(convertToStr(remainingMillSec))); // Click on the timer to start

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Timer is finished, realized sound, confirm the message
  vi.advanceTimersByTime(remainingMillSec);
  expect(mocks.mockSound).toHaveBeenCalled();
  expect(screen.getByText(TIME_UP_MESSAGES.WORK)).toBeInTheDocument();

  // *** 2st Pomodoro ***
  // Change to long break
  fireEvent.click(screen.getByLabelText(CONTROL_RADIO_BUTTONS.POMO));

  // Confirm current settings
  remainingMillSec = CHANGED_MILL_SECS.POMO;
  expect(screen.getByLabelText(CONTROL_RADIO_BUTTONS.POMO)).toBeChecked();
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Start the pomodoro timer
  // fireEvent.click(screen.getByText(TIMER_BUTTONS.START));
  fireEvent.click(screen.getByText(convertToStr(remainingMillSec))); // Click on the timer to start

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Timer is finished, realized sound, confirm the message
  vi.advanceTimersByTime(remainingMillSec);
  expect(mocks.mockSound).toHaveBeenCalled();
  expect(screen.getByText(TIME_UP_MESSAGES.BREAK)).toBeInTheDocument();

  // *** Long Break ***
  // Change to long break
  fireEvent.click(screen.getByLabelText(CONTROL_RADIO_BUTTONS.LONG));

  // Confirm current settings
  remainingMillSec = CHANGED_MILL_SECS.LONG;
  expect(screen.getByLabelText(CONTROL_RADIO_BUTTONS.LONG)).toBeChecked();
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Start the pomodoro timer
  // fireEvent.click(screen.getByText(TIMER_BUTTONS.START)); TODO: fix
  fireEvent.click(screen.getByText(convertToStr(remainingMillSec))); // Click on the timer to start

  // Confirm the timer is running
  vi.advanceTimersByTime(1000 * 5);
  remainingMillSec = remainingMillSec - 1000 * 5;
  expect(screen.getByText(convertToStr(remainingMillSec))).toBeInTheDocument();

  // Timer is finished, realized sound, confirm the message
  vi.advanceTimersByTime(remainingMillSec);
  expect(mocks.mockSound).toHaveBeenCalled();
  expect(screen.getByText(TIME_UP_MESSAGES.WORK)).toBeInTheDocument();
});
