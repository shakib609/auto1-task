import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FavoritesProvider from "../contexts/FavoritesContext";
import { generateMockCar } from "../testUtils";

import FavoritesPage from "./FavoritesPage";

describe("FavoritesPage tests", () => {
  const localStorageGetItemSpy = jest.spyOn(Storage.prototype, "getItem");

  test("renders text if no cars saved", () => {
    localStorageGetItemSpy.mockReturnValue(null);
    render(
      <FavoritesProvider>
        <FavoritesPage />
      </FavoritesProvider>
    );
    const noCarsTextElement = screen.getByText(/no cars saved yet!/i);
    expect(noCarsTextElement).toBeInTheDocument();
  });

  test("renders saved cars", () => {
    const mockedCars = [...Array(10)].map(generateMockCar);
    localStorageGetItemSpy.mockReturnValue(JSON.stringify(mockedCars));
    render(
      <FavoritesProvider>
        <FavoritesPage />
      </FavoritesProvider>,
      { wrapper: MemoryRouter }
    );

    mockedCars.forEach((car) => {
      const carTitleElement = screen.getByText(
        `${car.manufacturerName} ${car.modelName}`
      );
      expect(carTitleElement).toBeInTheDocument();
    });
  });
});
