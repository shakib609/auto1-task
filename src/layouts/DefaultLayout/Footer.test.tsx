import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

describe("Footer tests", () => {
  test("renders footer with text", () => {
    render(<Footer />);
    const footerElement = screen.getByText(/© auto1 group 2018/i);
    expect(footerElement).toBeInTheDocument();
  });
});
