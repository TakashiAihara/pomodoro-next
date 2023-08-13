import { fireEvent, render, screen } from "@testing-library/react";

import MuteToggle from "./mutetoggle";

describe("Given a MuteToggle component", () => {
  const mockSetVolume = vi.fn();
  const title = "mute button";

  describe("When volume is 1", () => {
    const component = <MuteToggle volume={1} setVolume={mockSetVolume} />;

    it("Then should it render with svg (1 paths)", () => {
      render(component);
      const muteToggle = screen.getByTitle(title);

      expect(muteToggle).toBeInTheDocument();
      expect(muteToggle.querySelectorAll("path").length).toBe(1);
    });

    it("Then should set volume to 0 when button is clicked.", () => {
      render(component);
      fireEvent.click(screen.getByTitle(title));

      expect(mockSetVolume).toHaveBeenCalledWith(0);
    });
  });

  describe("When volume is 0", () => {
    const component = <MuteToggle volume={0} setVolume={mockSetVolume} />;

    it("Then should it render with svg (2 paths)", () => {
      render(component);
      const muteToggle = screen.getByTitle(title);

      expect(muteToggle).toBeInTheDocument();
      expect(muteToggle.querySelectorAll("path").length).toBe(2);
    });

    it("Then should set volume to 1 when button is clicked.", () => {
      render(component);
      fireEvent.click(screen.getByTitle(title));

      expect(mockSetVolume).toHaveBeenCalledWith(1);
    });
  });
});
