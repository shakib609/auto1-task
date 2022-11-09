class FavoritesManager {
  private key = "auto1-favorites";

  getFavorites = (): TCar[] => {
    const stringifiedData = localStorage.getItem(this.key);
    try {
      const parsedData = JSON.parse(`${stringifiedData}`);
      if (parsedData) return parsedData;
      else {
        this.setValue([]);
        return [];
      }
    } catch (e) {
      console.error("Invalid localStorage value");
      console.error(e);
      this.setValue([]);
      return [];
    }
  };

  setValue = (value: TCar[]) => {
    localStorage.setItem(this.key, JSON.stringify(value));
  };

  addToFavorites = (car: TCar): TCar[] => {
    const favorites = this.getFavorites();
    const existingCar = favorites.find(
      (favoriteCar) => favoriteCar.stockNumber === car.stockNumber
    );
    if (!existingCar) {
      favorites.push(car);
      this.setValue(favorites);
    }
    return favorites;
  };

  removeFromFavorites = (car: TCar): TCar[] => {
    const favorites = this.getFavorites();
    const carIndex = favorites.findIndex(
      (favoriteCar) => favoriteCar.stockNumber === car.stockNumber
    );
    if (carIndex >= 0) {
      favorites.splice(carIndex, 1);
      this.setValue(favorites);
    }
    return favorites;
  };
}

const favoritesManager = new FavoritesManager();

export default favoritesManager;
