import { render } from "@testing-library/react";
import { generateMockCar } from "../testUtils";
import FavoritesProvider from "./FavoritesContext";

describe("SearchProvider tests", () => {
  const localStorageGetItemSpy = jest.spyOn(Storage.prototype, "getItem");
  jest.spyOn(console, "error");

  test("initializes state from empty localStorage", () => {
    localStorageGetItemSpy.mockReturnValue(null);
    render(<FavoritesProvider>test</FavoritesProvider>);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  test("initializes state from localStorage with previously saved data", () => {
    const mockSavedCars = [...Array(5)].map(generateMockCar);
    localStorageGetItemSpy.mockReturnValue(JSON.stringify(mockSavedCars));
    render(<FavoritesProvider>test</FavoritesProvider>);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  test("resets state if localStorage data is corrupted", () => {
    localStorageGetItemSpy.mockReturnValue("{invalid_json;;");
    render(<FavoritesProvider>test</FavoritesProvider>);
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});
