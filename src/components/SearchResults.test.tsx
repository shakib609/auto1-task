import { randColor } from "@ngneat/falso";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchProvider from "../contexts/SearchContext";
import apiManager from "../services/apiManager";
import { generateMockCar, generateMockManufacturer } from "../testUtils";

import SearchResults from "./SearchResults";

describe("SearchResults tests", () => {
  const apiManagerColorsMock = jest.spyOn(apiManager, "getColors");
  const apiManagerManufacturersMock = jest.spyOn(
    apiManager,
    "getManufacturers"
  );
  const apiManagerCarsMock = jest.spyOn(apiManager, "getAllCars");

  const mockColors: TColorsAPIResponse = {
    colors: [randColor(), randColor()],
  };
  const mockManufacturers: TManufacturersAPIResponse = {
    manufacturers: [generateMockManufacturer()],
  };
  const mockCars: TAllCarsAPIResponse = {
    cars: [...Array(10)].map(generateMockCar),
    totalCarsCount: 1000,
    totalPageCount: 100,
  };

  beforeEach(() => {
    apiManagerColorsMock.mockResolvedValue(mockColors);
    apiManagerManufacturersMock.mockResolvedValue(mockManufacturers);
    apiManagerCarsMock.mockResolvedValue(mockCars);
  });

  test("handles page change on pagination", async () => {
    render(
      <SearchProvider>
        <SearchResults />
      </SearchProvider>,
      { wrapper: MemoryRouter }
    );

    const carManufacturer = await screen.findByText(/page 1 of 100/i);
    expect(carManufacturer).toBeInTheDocument();

    // Next
    const paginationNextButton = screen.getByText(/next/i);
    fireEvent(paginationNextButton, new MouseEvent("click", { bubbles: true }));
    await screen.findByText(/showing 10 of 1000 results/i);
    await screen.findByText(/page 2 of 100/i);
    expect(apiManagerCarsMock).toBeCalledTimes(2);

    // Previous
    const paginationPreviousButton = screen.getByText(/previous/i);
    fireEvent(
      paginationPreviousButton,
      new MouseEvent("click", { bubbles: true })
    );
    await screen.findByText(/showing 10 of 1000 results/i);
    await screen.findByText(/page 1 of 100/i);
    expect(apiManagerCarsMock).toBeCalledTimes(3);

    // Last
    const paginationLastButton = screen.getByText(/last/i);
    fireEvent(paginationLastButton, new MouseEvent("click", { bubbles: true }));
    await screen.findByText(/showing 10 of 1000 results/i);
    await screen.findByText(/page 100 of 100/i);
    expect(apiManagerCarsMock).toBeCalledTimes(4);

    // First
    const paginationFirstButton = screen.getByText(/first/i);
    fireEvent(
      paginationFirstButton,
      new MouseEvent("click", { bubbles: true })
    );
    await screen.findByText(/showing 10 of 1000 results/i);
    await screen.findByText(/page 1 of 100/i);
    expect(apiManagerCarsMock).toBeCalledTimes(5);
    fireEvent(
      paginationFirstButton,
      new MouseEvent("click", { bubbles: true })
    );
    screen.getByText(/page 1 of 100/i);
  });
});
