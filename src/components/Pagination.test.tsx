import { fireEvent, render, screen } from "@testing-library/react";

import Pagination from "./Pagination";

describe("Pagination tests", () => {
  const handlePageChange = jest.fn();

  test("renders pagination with current and total page count", () => {
    const currentPage = 2;
    const totalPageCount = 10;
    render(
      <Pagination
        totalPageCount={totalPageCount}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    );
    const paginationDetails = screen.getByText(
      `Page ${currentPage} of ${totalPageCount}`
    );
    expect(paginationDetails).toBeInTheDocument();
  });

  test("renders pagination with appropriate buttons", () => {
    render(
      <Pagination
        totalPageCount={10}
        currentPage={2}
        handlePageChange={handlePageChange}
      />
    );
    const paginationButtons = screen.getAllByRole("button");
    fireEvent(paginationButtons[0], new MouseEvent("click", { bubbles: true }));
    expect(handlePageChange).toHaveBeenCalledTimes(1);
    fireEvent(paginationButtons[1], new MouseEvent("click", { bubbles: true }));
    expect(handlePageChange).toHaveBeenCalledTimes(2);
    fireEvent(paginationButtons[2], new MouseEvent("click", { bubbles: true }));
    expect(handlePageChange).toHaveBeenCalledTimes(3);
    fireEvent(paginationButtons[3], new MouseEvent("click", { bubbles: true }));
    expect(handlePageChange).toHaveBeenCalledTimes(4);
  });
});
