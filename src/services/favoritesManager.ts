class FavoritesManager {
  private key = "auto1-favorites";

  getFavorites = (): TCar[] => {
    const stringifiedData = localStorage.getItem(this.key);
    try {
      const parsedData = JSON.parse(`${stringifiedData}`);
      if (parsedData) return parsedData;
      else {
        this.setFavorites([]);
        return [];
      }
    } catch (e) {
      console.error("Invalid localStorage value", e);
      console.error(e);
      this.setFavorites([]);
      return [];
    }
  };

  setFavorites = (value: TCar[]) => {
    localStorage.setItem(this.key, JSON.stringify(value));
  };
}

const favoritesManager = new FavoritesManager();

export default favoritesManager;
