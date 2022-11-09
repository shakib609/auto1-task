import { createContext, useCallback, useEffect, useState } from "react";
import apiManager from "../services/apiManager";

type TSearchParams = {
  color: string;
  manufacturer: string;
  page: number;
};

interface ISearchContextValue {
  allManufacturers: TManufacturer[];
  allColors: string[];
  carResults: TAllCarsAPIResponse;
  loading: boolean;
  searchParams: TSearchParams;
  setSearchParams: (_params: TSearchParams) => void;
}

export const SearchContext = createContext<ISearchContextValue>({
  allManufacturers: [],
  allColors: [],
  carResults: { cars: [], totalCarsCount: 0, totalPageCount: 1 },
  loading: false,
  searchParams: { color: "", manufacturer: "", page: 1 },
  setSearchParams: (_params) => {},
});

type TSearchProviderProps = {
  children: React.ReactNode;
};

const SearchProvider: React.FC<TSearchProviderProps> = ({ children }) => {
  const [allColors, setAllColors] = useState<string[]>([]);
  const [allManufacturers, setAllManufacturers] = useState<TManufacturer[]>([]);
  const [loading, setLoading] = useState(false);
  const [carResults, setCarResults] = useState<TAllCarsAPIResponse>({
    cars: [],
    totalCarsCount: 0,
    totalPageCount: 0,
  });
  const [searchParams, setSearchParams] = useState({
    color: "",
    manufacturer: "",
    page: 1,
  });

  const fetchCars = useCallback(() => {
    setLoading(true);
    apiManager
      .getAllCars(searchParams.page, {
        color: searchParams.color,
        manufacturer: searchParams.manufacturer,
      })
      .then((data) => {
        setCarResults(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchParams]);

  // fetch all colors and manufacturers on initial render
  useEffect(() => {
    apiManager.getColors().then((data) => {
      setAllColors(data.colors);
    });
    apiManager.getManufacturers().then((data) => {
      setAllManufacturers(data.manufacturers);
    });
  }, []);

  // fetch cars on any search params change
  useEffect(() => {
    fetchCars();
  }, [searchParams, fetchCars]);

  return (
    <SearchContext.Provider
      value={{
        allManufacturers,
        allColors,
        carResults,
        loading,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
