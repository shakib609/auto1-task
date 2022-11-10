import { randColor, randVehicleManufacturer } from "@ngneat/falso";
import { generateMockCar, generateMockManufacturer } from "../testUtils";
import apiManager from "./apiManager";

describe("apiManager tests", () => {
  test("fetches cars by query params from api", async () => {
    const mockCars = [...Array(10)].map(generateMockCar);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            cars: mockCars,
            totalCarsCount: 1000,
            totalPageCount: 100,
          }),
      })
    ) as jest.Mock;
    let apiResponse = await apiManager.getAllCars(1);
    expect(apiResponse.cars.length).toEqual(mockCars.length);

    apiResponse = await apiManager.getAllCars(1, { color: randColor() });
    expect(apiResponse.cars.length).toEqual(mockCars.length);

    apiResponse = await apiManager.getAllCars(1, {
      manufacturer: randVehicleManufacturer(),
    });
    expect(apiResponse.cars.length).toEqual(mockCars.length);
  });

  test("fetches all colors from api", async () => {
    const mockColors = [randColor(), randColor()];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ colors: mockColors }),
      })
    ) as jest.Mock;
    const apiResponse = await apiManager.getColors();
    expect(apiResponse.colors.length).toEqual(mockColors.length);
  });

  test("fetches all manufacturers from api", async () => {
    const mockManufacturers = [
      generateMockManufacturer(),
      generateMockManufacturer(),
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ manufacturers: mockManufacturers }),
      })
    ) as jest.Mock;
    const apiResponse = await apiManager.getManufacturers();
    expect(apiResponse.manufacturers.length).toEqual(mockManufacturers.length);
  });

  test("fetches car details from api with stockNumber", async () => {
    const mockCar = generateMockCar();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ car: mockCar }),
      })
    ) as jest.Mock;
    const apiResponse = await apiManager.getCarDetailsByStockId(
      mockCar.stockNumber
    );
    expect(apiResponse.car.modelName).toEqual(mockCar.modelName);
    expect(apiResponse.car.manufacturerName).toEqual(mockCar.manufacturerName);
    expect(apiResponse.car.color).toEqual(mockCar.color);
  });
});
