class APIManager {
  private _baseURL = "https://auto1-mock-server.herokuapp.com";

  private _makeRequest = async (path: string) => {
    const res = await fetch(this._baseURL + path);
    return res.json();
  };

  getAllCars = async (
    page: number,
    query?: { color?: string; manufacturer?: string }
  ): Promise<TAllCarsAPIResponse> => {
    const apiPath = "/api/cars";
    const queryParams = new URLSearchParams();
    queryParams.append("page", `${page}`);
    if (query?.color) {
      queryParams.append("color", query.color);
    }
    if (query?.manufacturer) {
      queryParams.append("manufacturer", query.manufacturer);
    }
    return await this._makeRequest(`${apiPath}?${queryParams.toString()}`);
  };

  getCarDetailsByStockId = async (
    stockId: number
  ): Promise<TCarDetailsAPIResponse> => {
    const apiPath = `/api/cars/${stockId}`;
    return await this._makeRequest(apiPath);
  };

  getColors = async (): Promise<TColorsAPIResponse> => {
    const apiPath = "/api/colors";
    return await this._makeRequest(apiPath);
  };

  getManufacturers = async (): Promise<TManufacturersAPIResponse> => {
    const apiPath = "/api/manufacturers";
    return await this._makeRequest(apiPath);
  };
}

const apiManager = new APIManager();

export default apiManager;
