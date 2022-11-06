import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import Navbar from "./Navbar";

describe("Navbar tests", () => {
  test("renders logo", () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    const logoElement = screen.getByAltText(/auto1\.com/i);
    expect(logoElement).toBeInTheDocument();
  });

  test("renders links with appropriate path", () => {
    render(<Navbar />, { wrapper: MemoryRouter });

    const purchaseLink = screen.getByRole("link", {
      description: "Purchase",
    });
    expect(purchaseLink).toHaveAttribute("href", "/");

    const myOrdersLink = screen.getByRole("link", {
      description: "My Orders",
    });
    expect(myOrdersLink).toHaveAttribute("href", "/favorites");

    const sellLink = screen.getByRole("link", {
      description: "Sell",
    });
    expect(sellLink).toHaveAttribute("href", "/sell");

    const navbarLogo = screen.getAllByRole("link")[0];
    expect(navbarLogo).toHaveAttribute("href", "/");
  });
});
