import { render, screen } from "@testing-library/react";
import {
  randColor,
  randNumber,
  randUrl,
  randVehicleManufacturer,
  randVehicleModel,
} from "@ngneat/falso";

import CarDetailsCard from "./CarDetailsCard";
import { MemoryRouter } from "react-router-dom";

const mockCar: TCar = {
  color: randColor(),
  fuelType: "Diesel",
  manufacturerName: randVehicleManufacturer(),
  mileage: {
    number: randNumber(),
    unit: "km",
  },
  modelName: randVehicleModel(),
  pictureUrl: randUrl(),
  stockNumber: randNumber(),
};

describe("CarDetailsCard tests", () => {
  test("renders car with appropriate details", () => {
    render(<CarDetailsCard car={mockCar} />, { wrapper: MemoryRouter });
    const carDetailsHeader = screen.getByText(
      `${mockCar.manufacturerName} ${mockCar.modelName}`
    );
    expect(carDetailsHeader).toBeInTheDocument();
  });

  test("renders car details link", () => {
    render(<CarDetailsCard car={mockCar} />, { wrapper: MemoryRouter });
    const carDetailsLink = screen.getByRole("link");
    expect(carDetailsLink).toHaveAttribute(
      "href",
      `/details/${mockCar.stockNumber}`
    );
  });
});
