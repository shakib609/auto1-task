import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import CarDetailsCard from "./CarDetailsCard";
import Pagination from "./Pagination";

const SearchResults: React.FC = () => {
  const {
    carResults: { cars, totalCarsCount, totalPageCount },
    searchParams,
    setSearchParams,
    loading,
  } = useContext(SearchContext);

  const handlePageChange = (page: number) => {
    if (searchParams.page !== page) {
      setSearchParams({ ...searchParams, page });
    }
  };

  return (
    <div>
      <h3 className="fz-18px fw-bold mb-12px">Available Cars</h3>

      {!loading && (
        <h3 className="fz-18px mb-24px">
          Showing {cars.length} of {totalCarsCount} results
        </h3>
      )}

      <div className="car-details-card-list">
        {cars.map((car) => (
          <CarDetailsCard key={car.stockNumber} car={car} />
        ))}
      </div>

      <Pagination
        handlePageChange={handlePageChange}
        totalPageCount={totalPageCount}
        currentPage={searchParams.page}
      />
    </div>
  );
};

export default SearchResults;
