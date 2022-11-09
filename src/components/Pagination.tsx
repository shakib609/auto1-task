type TPaginationProps = {
  totalPageCount: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<TPaginationProps> = ({
  totalPageCount,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="d-flex justify-content-center py-8px px-24px my-24px">
      <span
        role="button"
        className="me-24px"
        onClick={() => handlePageChange(1)}
      >
        First
      </span>
      <span
        role="button"
        aria-disabled={currentPage === 1}
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
      >
        Previous
      </span>
      <p className="mb-0 mx-24px">
        Page {currentPage} of {totalPageCount}
      </p>
      <span
        role="button"
        className="me-24px"
        aria-disabled={currentPage === totalPageCount}
        onClick={() =>
          currentPage < totalPageCount && handlePageChange(currentPage + 1)
        }
      >
        Next
      </span>
      <span role="button" onClick={() => handlePageChange(totalPageCount)}>
        Last
      </span>
    </div>
  );
};

export default Pagination;
