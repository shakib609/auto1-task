import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import SearchFilter from "./SearchFilter";
import {
  randColor,
  randNumber,
  randUrl,
  randVehicleManufacturer,
  randVehicleModel,
} from "@ngneat/falso";
import SearchProvider from "../contexts/SearchContext";
import SearchResults from "./SearchResults";
import apiManager from "../services/apiManager";
import { generateMockCar, generateMockManufacturer } from "../testUtils";
import userEvent from "@testing-library/user-event";

describe("SearchFilter tests", () => {
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

  test("renders form labels", () => {
    render(<SearchFilter />);
    const colorLabel = screen.getByLabelText(/color/i);
    expect(colorLabel).toBeInTheDocument();
    const manufacturerLabel = screen.getByLabelText(/manufacturer/i);
    expect(manufacturerLabel).toBeInTheDocument();
    const colorSelect = screen.getByTestId("color-select");
    expect(colorSelect).toBeInTheDocument();
    const manufacturerSelect = screen.getByTestId("manufacturer-select");
    expect(manufacturerSelect).toBeInTheDocument();
  });

  test("renders options with default value selected", () => {
    render(<SearchFilter />);
    screen.getByRole("option", {
      name: /all car colors/i,
      selected: true,
    });
    screen.getByRole("option", {
      name: /all manufacturers/i,
      selected: true,
    });
  });

  test("renders options fetched from api", async () => {
    render(
      <SearchProvider>
        <SearchFilter />
      </SearchProvider>
    );

    const filterButton = screen.getByRole("button");
    await waitFor(() => {
      expect(filterButton).toBeEnabled();
    });
    expect(apiManagerColorsMock).toHaveBeenCalledTimes(1);
    expect(apiManagerManufacturersMock).toHaveBeenCalledTimes(1);
    const colorOptions = screen.getAllByTestId("color-select-option");
    expect(colorOptions.length).toEqual(mockColors.colors.length + 1);
    const manufacturerOptions = screen.getAllByTestId(
      "manufacturer-select-option"
    );
    expect(manufacturerOptions.length).toEqual(
      mockManufacturers.manufacturers.length + 1
    );
  });

  test("fetches new cars on select option change", async () => {
    render(
      <SearchProvider>
        <SearchFilter />
      </SearchProvider>
    );

    const filterButton = screen.getByRole("button");
    await waitFor(() => {
      expect(filterButton).toBeEnabled();
    });
    expect(apiManagerCarsMock).toHaveBeenCalledTimes(1);

    const colorSelect = screen.getByTestId("color-select");
    const manufacturerSelect = screen.getByTestId("manufacturer-select");

    userEvent.selectOptions(
      colorSelect,
      screen.getByRole("option", { name: mockColors.colors[0] })
    );
    userEvent.selectOptions(
      manufacturerSelect,
      screen.getByRole("option", {
        name: mockManufacturers.manufacturers[0].name,
      })
    );
    fireEvent(filterButton, new MouseEvent("click", { bubbles: true }));
    await waitFor(() => {
      expect(filterButton).toBeEnabled();
    });
    expect(apiManagerCarsMock).toHaveBeenCalledTimes(2);
    expect(apiManagerCarsMock).toHaveBeenCalledWith(1, {
      color: mockColors.colors[0],
      manufacturer: mockManufacturers.manufacturers[0].name,
    });
  });
});
