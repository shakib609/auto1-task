import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FavoritesProvider from "../contexts/FavoritesContext";
import apiManager from "../services/apiManager";
import { generateMockCar } from "../testUtils";

import CarDetailsPage from "./CarDetailsPage";

describe("CarDetailsPage tests", () => {
  const mockCar = generateMockCar();
  const apiManagerCarDetailsSpy = jest.spyOn(
    apiManager,
    "getCarDetailsByStockId"
  );
  const localStorageGetItemSpy = jest.spyOn(Storage.prototype, "getItem");
  const localStorageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");

  beforeEach(() => {
    apiManagerCarDetailsSpy.mockResolvedValue({ car: mockCar });
  });

  test("renders car details", async () => {
    render(<CarDetailsPage />);
    await screen.findByRole("button");
    expect(apiManager.getCarDetailsByStockId).toHaveBeenCalledTimes(1);
  });

  test("renders error message on network error", async () => {
    console.error = jest.fn();
    apiManagerCarDetailsSpy.mockRejectedValue(new Error("Mock Error"));
    render(<CarDetailsPage />, { wrapper: MemoryRouter });
    await screen.findByText(/404 \- not found/i);
    expect(apiManagerCarDetailsSpy).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test("renders save button if car is not saved", async () => {
    localStorageGetItemSpy.mockReturnValue(null);
    render(
      <FavoritesProvider>
        <CarDetailsPage />
      </FavoritesProvider>
    );
    const saveButton = await screen.findByRole("button", { name: /save/i });
    expect(saveButton).toBeInTheDocument();
  });

  test("renders delete button if car is not saved", async () => {
    localStorageGetItemSpy.mockReturnValue(JSON.stringify([mockCar]));
    render(
      <FavoritesProvider>
        <CarDetailsPage />
      </FavoritesProvider>
    );
    const deleteButton = await screen.findByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  test("clicking save button saves the car to localStorage", async () => {
    localStorageGetItemSpy.mockReturnValue(null);
    render(
      <FavoritesProvider>
        <CarDetailsPage />
      </FavoritesProvider>
    );
    const saveButton = await screen.findByRole("button", { name: /save/i });
    expect(saveButton).toBeInTheDocument();
    fireEvent(saveButton, new MouseEvent("click", { bubbles: true }));
    await screen.findByRole("button", { name: /delete/i });
    expect(localStorageSetItemSpy).toHaveBeenLastCalledWith(
      "auto1-favorites",
      JSON.stringify([mockCar])
    );
  });

  test("clicking delete button deletes the car from localStorage", async () => {
    localStorageGetItemSpy.mockReturnValue(JSON.stringify([mockCar]));
    render(
      <FavoritesProvider>
        <CarDetailsPage />
      </FavoritesProvider>
    );
    const deleteButton = await screen.findByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
    fireEvent(deleteButton, new MouseEvent("click", { bubbles: true }));
    await screen.findByRole("button", { name: /save/i });
    expect(localStorageSetItemSpy).toHaveBeenLastCalledWith(
      "auto1-favorites",
      JSON.stringify([])
    );
  });
});
