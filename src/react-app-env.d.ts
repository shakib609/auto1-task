/// <reference types="react-scripts" />

type TCar = {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  mileage: {
    number: number;
    unit: "km" | "mi";
  };
  fuelType: "Diesel" | "Petrol";
  color: string;
  pictureUrl: string;
};

type TManufacturer = {
  name: string;
  models: [
    {
      name: string;
    }
  ];
};

type TAllCarsAPIResponse = {
  cars: TCar[];
  totalPageCount: number;
  totalCarsCount: number;
};

type TCarDetailsAPIResponse = {
  car: TCar;
};

type TColorsAPIResponse = {
  colors: string[];
};

type TManufacturersAPIResponse = {
  manufacturers: TManufacturer[];
};
