import { fireEvent, render, screen } from "@testing-library/react";

import Controls from "./controls";

const mocks = vi.hoisted(() => {
  return {
    mockSound: vi.fn(),
  };
});

vi.mock("use-sound", () => {
  return {
    default: vi.fn(() => [mocks.mockSound]),
  };
});

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

const mockSetIsActive = vi.fn();
const mockSetButtonText = vi.fn();
const mockSetTimerMode = vi.fn();
const mockSetSecondsLeft = vi.fn();

const defaultProps = {
  timerMode: "pomo",
  pomoLength: 25,
  shortLength: 5,
  longLength: 15,
  volume: 1,
  setIsActive: mockSetIsActive,
  setButtonText: mockSetButtonText,
  setTimerMode: mockSetTimerMode,
  setSecondsLeft: mockSetSecondsLeft,
};

describe.each([
  {
    timerMode: "pomo",
    label: "pomodoro",
  },
  {
    timerMode: "short",
    label: "short break",
  },
  {
    timerMode: "long",
    label: "long break",
  },
])("Given Controls component with $timerMode mode", ({ timerMode, label }) => {
  describe(`When it rendered`, () => {
    it(`Then checked '${timerMode}' radio button`, () => {
      const props = { ...defaultProps, timerMode, label };
      render(<Controls {...props} />);

      expect(screen.getByLabelText(label)).toBeChecked();
    });
  });
});

describe.each([
  {
    prevTimerMode: "short",
    timerMode: "pomo",
    label: "pomodoro",
    secondsLeft: 25 * 60,
  },
  {
    prevTimerMode: "pomo",
    timerMode: "short",
    label: "short break",
    secondsLeft: 5 * 60,
  },
  {
    prevTimerMode: "pomo",
    timerMode: "long",
    label: "long break",
    secondsLeft: 15 * 60,
  },
])(
  "Given Controls component with $prevTimerMode mode",
  ({ timerMode, label, secondsLeft, prevTimerMode }) => {
    describe(`When it clicked`, () => {
      it("Then its input should checked, back to start, not active, and play sound.", () => {
        const props = { ...defaultProps, timerMode: prevTimerMode };
        render(<Controls {...props} />);
        fireEvent.click(screen.getByLabelText(label));

        expect(mocks.mockSound).toHaveBeenCalled();
        expect(mockSetTimerMode).toHaveBeenCalledWith(timerMode);
        expect(mockSetIsActive).toHaveBeenCalledWith(false);
        expect(mockSetButtonText).toHaveBeenCalledWith("START");
        expect(mockSetSecondsLeft).toHaveBeenCalledWith(secondsLeft);
      });
    });
  },
);
