import { render, screen } from "@testing-library/react";
import { randColor } from "@ngneat/falso";

import apiManager from "../services/apiManager";
import SearchProvider from "./SearchContext";
import SearchResults from "../components/SearchResults";
import { MemoryRouter } from "react-router-dom";
import { generateMockCar, generateMockManufacturer } from "../testUtils";

describe("SearchProvider tests", () => {
  const apiManagerColorsSpy = jest.spyOn(apiManager, "getColors");
  const apiManagerManufacturersSpy = jest.spyOn(apiManager, "getManufacturers");
  const apiManagerCarsSpy = jest.spyOn(apiManager, "getAllCars");

  const mockColors: TColorsAPIResponse = {
    colors: [randColor(), randColor()],
  };
  const mockManufacturers: TManufacturersAPIResponse = {
    manufacturers: [generateMockManufacturer()],
  };
  const mockCars: TAllCarsAPIResponse = {
    cars: [generateMockCar(), generateMockCar(), generateMockCar()],
    totalCarsCount: 3,
    totalPageCount: 1,
  };

  beforeEach(() => {
    apiManagerColorsSpy.mockResolvedValue(mockColors);
    apiManagerManufacturersSpy.mockResolvedValue(mockManufacturers);
    apiManagerCarsSpy.mockResolvedValue(mockCars);
  });

  test("should call colors, manufacturers and cars api on initial render", async () => {
    render(
      <SearchProvider>
        <SearchResults />
      </SearchProvider>,
      { wrapper: MemoryRouter }
    );

    const carDetailsText = await screen.findByText(/showing 3 of 3 results/i);
    expect(carDetailsText).toBeInTheDocument();
    expect(apiManagerColorsSpy).toHaveBeenCalledTimes(1);
    expect(apiManagerManufacturersSpy).toHaveBeenCalledTimes(1);
    expect(apiManagerCarsSpy).toHaveBeenCalledTimes(1);
  });
});
