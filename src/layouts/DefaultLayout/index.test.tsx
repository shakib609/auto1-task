import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import DefaultLayout from "./index";

describe("DefaultLayout tests", () => {
  test("renders supplied children", () => {
    render(
      <DefaultLayout>
        <p>Hello World</p>
      </DefaultLayout>,
      { wrapper: MemoryRouter }
    );
    const layoutElement = screen.getByText(/hello world/i);
    expect(layoutElement).toBeInTheDocument();
  });
});
