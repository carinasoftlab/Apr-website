import React from "react";

const TiedFundsPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  // Helper to create page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const handlePageClick = (page) => {
    if (page === "..." || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav
      className={`flex flex-wrap items-center justify-center gap-2 mt-6 ${className}`}
      aria-label="Pagination"
    >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md  text-sm font-medium transition ${
            currentPage === 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-700 hover:border-gray-400 border-gray-200"
          }`}
        >
          Previous
        </button>
          {getPageNumbers().map((page, idx) => (
            <button
              key={idx}
              onClick={() => handlePageClick(page)}
              disabled={page === "..."}
          className={`px-3 py-1 rounded-md  text-sm font-medium transition
                ${
                  page === currentPage
                ? "bg-[#E3EBF7] text-[#285192"
                    : page === "..."
                    ? "text-gray-400 border-gray-200 cursor-default"
                    : "text-gray-700 hover:border-gray-400 border-gray-200"
                }
              `}
            >
              {page}
            </button>
          ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md  text-sm font-medium transition ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-700 hover:border-gray-400 border-gray-200"
          }`}
        >
          Next
        </button>
      </nav>
  );
};

export default TiedFundsPagination;
