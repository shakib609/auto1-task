import { createContext, useEffect, useState } from "react";
import favoritesManager from "../services/favoritesManager";

type TFavoritesContextValue = {
  savedCars: TCar[];
  isCarSaved: (car: TCar) => boolean;
  saveCarToFavorites: (car: TCar) => void;
  deleteCarFromFavorites: (car: TCar) => void;
};

export const FavoritesContext = createContext<TFavoritesContextValue>({
  savedCars: [],
  isCarSaved: (_car) => false,
  saveCarToFavorites: (_car: TCar) => {},
  deleteCarFromFavorites: (_car: TCar) => {},
});

type TFavoritesProviderProps = {
  children: React.ReactNode;
};

const FavoritesProvider: React.FC<TFavoritesProviderProps> = ({ children }) => {
  const [savedCars, setSavedCars] = useState<TCar[]>(
    favoritesManager.getFavorites()
  );

  useEffect(() => {
    favoritesManager.setFavorites(savedCars);
  }, [savedCars]);

  const isCarSaved = (car: TCar): boolean => {
    const existingCar = savedCars.find(
      (savedCar) => savedCar.stockNumber === car.stockNumber
    );
    return !!existingCar;
  };

  const saveCarToFavorites = (car: TCar) => {
    if (!isCarSaved(car)) {
      setSavedCars([...savedCars, car]);
    }
  };

  const deleteCarFromFavorites = (car: TCar) => {
    setSavedCars(
      savedCars.filter((savedCar) => savedCar.stockNumber !== car.stockNumber)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        savedCars,
        isCarSaved,
        saveCarToFavorites,
        deleteCarFromFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
