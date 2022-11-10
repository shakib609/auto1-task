import { generateMockCar } from "../testUtils";
import favoritesManager from "./favoritesManager";

describe("favoritesManager tests", () => {
  const mockCar = generateMockCar();
  const localStorageGetItemSpy = jest.spyOn(Storage.prototype, "getItem");
  const localStorageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");

  test("favoritesManager sets default data if no data found", () => {
    localStorageGetItemSpy.mockReturnValue(null);
    favoritesManager.getFavorites();
    expect(localStorageGetItemSpy).toHaveBeenCalledTimes(1);
    expect(localStorageSetItemSpy).toHaveBeenCalledTimes(1);
  });

  test("favoritesManager sets default data if erroneous found", () => {
    localStorageGetItemSpy.mockReturnValue("{asdfpq;");
    console.error = jest.fn();
    favoritesManager.getFavorites();
    expect(localStorageGetItemSpy).toHaveBeenCalledTimes(1);
    expect(localStorageSetItemSpy).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalled();
  });

  test("favoritesManager sets supplied data successfully", () => {
    const data = [mockCar];
    console.error = jest.fn();
    favoritesManager.setFavorites(data);
    localStorageGetItemSpy.mockReturnValue(JSON.stringify(data));
    expect(localStorageSetItemSpy).toHaveBeenCalledTimes(1);
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      "auto1-favorites",
      JSON.stringify(data)
    );
  });
});
