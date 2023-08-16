import { fireEvent, render, screen } from "@testing-library/react";

import TimerDisplay from "./timerdisplay";

const mocks = vi.hoisted(() => {
  return {
    mockStartSound: vi.fn(),
    mockPauseSound: vi.fn(),
  };
});

vi.mock("use-sound", () => {
  return {
    default: vi.fn((fileName) =>
      // eslint-disable-next-line
      fileName.includes("start")
        ? [mocks.mockStartSound]
        : [mocks.mockPauseSound],
    ),
  };
});

afterEach(() => {
  vi.clearAllMocks(); // mocks history clear
  vi.restoreAllMocks(); // restore implementation
});

const mockSetIsActive = vi.fn();
const mockSetButtonText = vi.fn();

const defaultProps = {
  timerMode: "pomo",
  percentage: 100,
  timeLeft: "25:00",
  isActive: false,
  setIsActive: mockSetIsActive,
  buttonText: "START",
  setButtonText: mockSetButtonText,
  volume: 1,
  setVolume: vi.fn(),
};
describe("Given TimerDisplay with fully 'pomo' timerMode", () => {
  const props = { ...defaultProps };

  describe("When rendered it", () => {
    it("Then displayed time and 'START' text.", () => {
      render(<TimerDisplay {...props} />);

      expect(screen.getByText("25:00")).toBeInTheDocument();
      expect(screen.getByText("START")).toBeInTheDocument();
    });
  });

  describe("When clicked", () => {
    it("Then plays sound and toggles activity.", () => {
      render(<TimerDisplay {...props} />);
      fireEvent.click(screen.getByText("START"));

      expect(mockSetButtonText).toHaveBeenCalledWith("PAUSE");
      expect(mockSetIsActive).toHaveBeenCalledWith(true);
      expect(mocks.mockStartSound).toHaveBeenCalled();
      expect(mocks.mockPauseSound).not.toHaveBeenCalled();
    });
  });
});

describe("Given TimerDisplay with half 'pomo' timerMode", () => {
  const props = {
    ...defaultProps,
    percentage: 50,
    timeLeft: "12:30",
    buttonText: "PAUSE",
    isActive: true,
  };

  describe("When clicked", () => {
    it("Then displayed 'RESUME'", () => {
      render(<TimerDisplay {...props} />);
      fireEvent.click(screen.getByText("PAUSE"));

      expect(mockSetButtonText).toHaveBeenCalledWith("RESUME");
      expect(mockSetIsActive).toHaveBeenCalledWith(false);
    });
  });
});

describe("Given TimerDisplay with empty 'pomo' timerMode", () => {
  const props = {
    ...defaultProps,
    timerMode: "pomo",
    percentage: 0,
    timeLeft: "0:00",
    buttonText: "PAUSE",
    isActive: true,
  };

  describe("When clicked", () => {
    it("Then displayed message", () => {
      render(<TimerDisplay {...props} />);
      fireEvent.click(screen.getByText("PAUSE"));

      expect(screen.getByText("time for a break")).toBeInTheDocument();
    });
  });
});

describe.each(["short", "long"])(
  "Given TimerDisplay with empty '%s' timerMode",
  (timerMode) => {
    const props = {
      ...defaultProps,
      timerMode,
      percentage: 0,
      timeLeft: "0:00",
      buttonText: "PAUSE",
      isActive: true,
    };

    describe("When clicked", () => {
      it("Then displayed message", () => {
        render(<TimerDisplay {...props} />);
        fireEvent.click(screen.getByText("PAUSE"));

        expect(screen.getByText("back to work!")).toBeInTheDocument();
      });
    });
  },
);

describe.each([
  {
    isActive: true,
    buttonText: "PAUSE",
    calledMock: mocks.mockPauseSound,
  },
  {
    isActive: false,
    buttonText: "START",
    calledMock: mocks.mockStartSound,
  },
])(
  "Given TimerDisplay with isActive: $isActive timer",
  ({ isActive, buttonText, calledMock }) => {
    const props = { ...defaultProps, isActive, buttonText };

    describe("When clicked it", () => {
      it(`Then play ${buttonText} sounds`, () => {
        render(<TimerDisplay {...props} />);
        fireEvent.click(screen.getByText(buttonText));

        expect(calledMock).toHaveBeenCalled();
      });
    });
  },
);
