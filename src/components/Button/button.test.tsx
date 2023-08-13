import { fireEvent, render } from "@testing-library/react";

import Button from "./button";

describe("Given a Button component", () => {
  describe("When it is of type 'settings'", () => {
    const mockToggleVisibility = vi.fn();
    const component = (
      <Button type="settings" toggleVisibility={mockToggleVisibility} />
    );
    const title = "show preferences pane";

    it("Then it should render.", () => {
      const { getByTitle } = render(component);
      expect(getByTitle(title)).toBeInTheDocument();
    });

    it("Then it should call toggleVisibility function when clicked", () => {
      const { getByTitle } = render(component);
      fireEvent.click(getByTitle(title));
      expect(mockToggleVisibility).toHaveBeenCalledTimes(1);
    });
  });

  describe("When it is of type 'close'", () => {
    const mockToggleVisibility = vi.fn();
    const buttonText = "Close Me";
    const component = (
      <Button
        type="close"
        buttonText={buttonText}
        toggleVisibility={mockToggleVisibility}
      />
    );

    it("Then it should render.", () => {
      const { getByText } = render(component);
      expect(getByText(buttonText)).toBeInTheDocument();
    });

    it("Then it should call toggleVisibility function when clicked", () => {
      const { getByText } = render(component);
      fireEvent.click(getByText(buttonText));
      expect(mockToggleVisibility).toHaveBeenCalledTimes(1);
    });
  });

  describe("When it is of type 'apply' with provided text", () => {
    const mockToggleVisibility = vi.fn();
    const buttonText = "Apply Changes";
    const component = (
      <Button
        type="apply"
        buttonText={buttonText}
        toggleVisibility={mockToggleVisibility}
      />
    );

    it("Then it should render.", () => {
      const { getByText } = render(component);
      expect(getByText(buttonText)).toBeInTheDocument();
    });
  });

  describe("When it is of an unsupported type", () => {
    const mockToggleVisibility = vi.fn();
    const component = (
      <Button type="unsupportedType" toggleVisibility={mockToggleVisibility} />
    );

    it("Then it should not render anything", () => {
      const { container } = render(component);
      expect(container.firstChild).toBeNull();
    });
  });
});
