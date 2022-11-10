import {
  randColor,
  randNumber,
  randUrl,
  randVehicleManufacturer,
  randVehicleModel,
} from "@ngneat/falso";

export const generateMockCar = (): TCar => {
  return {
    color: randColor(),
    fuelType: "Diesel",
    manufacturerName: randVehicleManufacturer(),
    mileage: { number: randNumber(), unit: "km" },
    modelName: randVehicleModel(),
    pictureUrl: randUrl(),
    stockNumber: randNumber(),
  };
};

export const generateMockManufacturer = (): TManufacturer => {
  return {
    name: randVehicleManufacturer(),
    models: [{ name: randVehicleModel() }],
  };
};
