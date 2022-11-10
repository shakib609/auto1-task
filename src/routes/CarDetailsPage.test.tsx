import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FavoritesProvider from "../contexts/FavoritesContext";
import { generateMockCar } from "../testUtils";

import CarDetailsPage from "./CarDetailsPage";

describe("CarDetailsPage tests", () => {
  const mockCar = generateMockCar();
  const localStorageGetItemSpy = jest.spyOn(Storage.prototype, "getItem");
  const localStorageSetItemSpy = jest.spyOn(Storage.prototype, "setItem");

  test("renders car details", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ car: mockCar }),
      })
    ) as jest.Mock;
    render(<CarDetailsPage />);
    await screen.findByRole("button");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("renders error message on network error", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Mock error"))
    ) as jest.Mock;
    console.error = jest.fn();
    render(<CarDetailsPage />, { wrapper: MemoryRouter });
    await screen.findByText(/404 \- not found/i);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  test("renders save button if car is not saved", async () => {
    localStorageGetItemSpy.mockReturnValue(null);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ car: mockCar }),
      })
    ) as jest.Mock;
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ car: mockCar }),
      })
    ) as jest.Mock;
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ car: mockCar }),
      })
    ) as jest.Mock;
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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ car: mockCar }),
      })
    ) as jest.Mock;
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
