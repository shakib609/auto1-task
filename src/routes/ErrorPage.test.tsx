import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ErrorPage from "./ErrorPage";

describe("ErrorPage tests", () => {
  test("renders not found text", () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });
    const textElement = screen.getByText(/404 \- not found/i);
    expect(textElement).toBeInTheDocument();
  });

  test("renders homepage link", () => {
    render(<ErrorPage />, { wrapper: MemoryRouter });
    const homepageLink = screen.getByRole("link");
    expect(homepageLink).toHaveAttribute("href", "/");
  });
});
