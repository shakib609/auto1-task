import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App tests", () => {
  test("renders app container", () => {
    render(<App />);
    const appContainer = screen.getByTestId(/app\-container/i);
    expect(appContainer).toBeInTheDocument();
  });
});
