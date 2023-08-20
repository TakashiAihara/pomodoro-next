/* eslint-disable @typescript-eslint/no-unsafe-return */
import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

const mocks = vi.hoisted(() => {
  return {
    mockSound: vi.fn(),
    mockTimerDisplay: vi.fn(() => {
      return <div data-testid="mock-timer-display" />;
    }),
    mockUseState: vi.fn().mockImplementation((value) => {
      if (value === false) {
        return [true, vi.fn()];
      } else {
        return React.useState(value);
      }
    }),
  };
});

vi.mock("use-sound", () => {
  return {
    default: vi.fn(() => [mocks.mockSound]),
  };
});

vi.mock("./components/TimerDisplay/timerdisplay", () => {
  return {
    default: mocks.mockTimerDisplay,
  };
});

vi.mock("react", async () => {
  const actual = await vi.importActual("react");
  return {
    ...actual,
    useState: mocks.mockUseState,
  };
});

describe("Given Settings component", () => {
  describe("When it rendered", () => {
    it("Then it should render.", () => {
      render(<App />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "pomodoro",
      );
    });
  });
});

describe("Given Settings component active", () => {
  describe("When it rendered and wait some minutes", () => {
    it("Then it should tick.", () => {
      vi.useFakeTimers();

      render(<App />);

      vi.advanceTimersByTime(5000);
      const passedTimeLefts = mocks.mockTimerDisplay.mock.calls.map(
        (call) => call?.[0]?.timeLeft,
      );
      expect(passedTimeLefts).toContain("24:55");
    });
  });
});
