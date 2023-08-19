import { fireEvent, render, screen } from "@testing-library/react";

import Settings from "./settings";

const mockToggleSettingsVisibility = vi.fn();
const mockSetPomoLength = vi.fn();
const mockSetShortLength = vi.fn();
const mockSetLongLength = vi.fn();
const mockSetFontPref = vi.fn();
const mockSetAccentColor = vi.fn();
const mockCloseSettings = vi.fn();
const mockSetSecondsLeft = vi.fn();

const defaultProps = {
  visible: true,
  timerMode: "pomo",
  pomoLength: 25,
  shortLength: 5,
  longLength: 15,
  fontPref: "kumbh",
  accentColor: "default",
  toggleSettingsVisibility: mockToggleSettingsVisibility,
  setPomoLength: mockSetPomoLength,
  setShortLength: mockSetShortLength,
  setLongLength: mockSetLongLength,
  setFontPref: mockSetFontPref,
  setAccentColor: mockSetAccentColor,
  closeSettings: mockCloseSettings,
  setSecondsLeft: mockSetSecondsLeft,
};

describe("Given Settings component with visible false", () => {
  const props = { ...defaultProps, visible: false };
  describe("When it rendered", () => {
    it("Then it should not render.", () => {
      const { container } = render(<Settings {...props} />);

      expect(container).toBeEmptyDOMElement();
    });
  });
});

describe("Given Settings component with visible", () => {
  const props = { ...defaultProps, visible: true };

  describe("When it rendered", () => {
    it("Then it should render.", () => {
      render(<Settings {...props} />);

      expect(screen.getByText("Settings")).toBeInTheDocument();
    });
  });

  describe("When close button clicked", () => {
    it("Then should called toggleSettingsVisibility.", () => {
      render(<Settings {...props} />);
      fireEvent.click(screen.getByText("×"));

      expect(mockToggleSettingsVisibility).toHaveBeenCalled();
    });
  });
});

describe.each([
  {
    pomoLength: 35,
    shortLength: 10,
    longLength: 20,
  },
  {
    pomoLength: 45,
    shortLength: 15,
    longLength: 25,
  },
])(
  "Given Settings component with changed lengths",
  ({ pomoLength, shortLength, longLength }) => {
    describe("When it rendered", () => {
      const props = { ...defaultProps, pomoLength, shortLength, longLength };

      it("Then it should render with changed lengths.", () => {
        render(<Settings {...props} />);

        expect(screen.getByLabelText("pomodoro")).toHaveValue(pomoLength);
        expect(screen.getByLabelText("short break")).toHaveValue(shortLength);
        expect(screen.getByLabelText("long break")).toHaveValue(longLength);
      });
    });
  },
);

describe.each(["kumbh", "roboto", "space"])(
  "Given Settings component with fontPref",
  (fontPref) => {
    describe("When it rendered", () => {
      const props = { ...defaultProps, fontPref };

      it("Then it should render with checked fontPref.", () => {
        render(<Settings {...props} />);

        expect(screen.getByDisplayValue(fontPref)).toBeChecked();
      });
    });
  },
);

describe.each(["default", "blue", "purple"])(
  "Given Settings component with accentColor",
  (accentColor) => {
    describe("When it rendered", () => {
      const props = { ...defaultProps, accentColor };

      it("Then it should render with checked accentColor.", () => {
        render(<Settings {...props} />);

        expect(screen.getByDisplayValue(accentColor)).toBeChecked();
      });
    });
  },
);

describe("Given Settings component", () => {
  describe("When changed all values, and click apply", () => {
    const props = { ...defaultProps };

    it("Then it should call set values, and call closeSettings.", () => {
      render(<Settings {...props} />);
      fireEvent.input(screen.getByLabelText("pomodoro"), {
        target: { value: 35 },
      });
      fireEvent.input(screen.getByLabelText("short break"), {
        target: { value: 10 },
      });
      fireEvent.input(screen.getByLabelText("long break"), {
        target: { value: 20 },
      });
      fireEvent.click(screen.getByText("Apply"));

      expect(mockSetPomoLength).toHaveBeenCalledWith("35"); // string
      expect(mockSetShortLength).toHaveBeenCalledWith("10"); // string
      expect(mockSetLongLength).toHaveBeenCalledWith("20"); // string
      expect(mockSetFontPref).toHaveBeenCalledWith("kumbh");
      expect(mockSetAccentColor).toHaveBeenCalledWith("default");
      expect(mockCloseSettings).toHaveBeenCalled();
    });
  });
});

describe.each([
  {
    timerMode: "pomo",
    label: "pomodoro",
    minutes: 35,
    secondsLeft: 35 * 60,
  },
  {
    timerMode: "short",
    label: "short break",
    minutes: 10,
    secondsLeft: 10 * 60,
  },
  {
    timerMode: "long",
    label: "long break",
    minutes: 25,
    secondsLeft: 25 * 60,
  },
])(
  "Given Settings component with $timerMode mode",
  ({ timerMode, label, minutes, secondsLeft }) => {
    describe(`When change minutes to ${minutes} in ${label} and clicked apply`, () => {
      const props = { ...defaultProps, timerMode };

      it("Then it should call set seconds left with calculated time.", () => {
        render(<Settings {...props} />);
        fireEvent.input(screen.getByLabelText(label), {
          target: { value: minutes },
        });
        fireEvent.click(screen.getByText("Apply"));

        expect(mockSetSecondsLeft).toHaveBeenCalledWith(secondsLeft);
      });
    });
  },
);
