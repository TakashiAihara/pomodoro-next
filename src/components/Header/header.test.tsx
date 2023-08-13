import { render } from "@testing-library/react";

import Header from "./header";

describe("Given a Header component", () => {
  describe("When it with provided text", () => {
    const title = "testTitle";
    const component = <Header title={title} />;

    it("Then it should call render with text", () => {
      const { getByText } = render(component);
      expect(getByText(title)).toBeInTheDocument();
    });
  });
});
