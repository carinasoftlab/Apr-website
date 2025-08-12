"use client"
import { motion } from "framer-motion"

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getVisiblePages = () => {
    const maxVisible = 3 // Show 3 pages at a time
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    const end = Math.min(totalPages, start + maxVisible - 1)

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  const visiblePages = getVisiblePages()

  const navButtonClass =
    "px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center flex-shrink-0"

  return (
    <div className="flex items-center justify-center lg:justify-end gap-4 py-8">
      {/* Previous Button */}
      <motion.button
        whileHover={currentPage === 1 ? {} : { scale: 1.02 }}
        whileTap={currentPage === 1 ? {} : { scale: 0.98 }}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`${navButtonClass} ${
          currentPage === 1
            ? "bg-gray-100 text-gray-300 cursor-not-allowed rounded-md"
            : "bg-blue-100 text-black hover:bg-blue-200 rounded-md"
        }`}
      >
        Previous
      </motion.button>

      <div className="flex items-center gap-2">
        {visiblePages.map((page) => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-md text-sm font-medium flex items-center justify-center transition-colors ${
              currentPage === page
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {page}
          </motion.button>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={currentPage === totalPages ? {} : { scale: 1.02 }}
        whileTap={currentPage === totalPages ? {} : { scale: 0.98 }}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`${navButtonClass} ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-300 cursor-not-allowed rounded-md"
            : "bg-blue-100 text-black hover:bg-blue-200 rounded-md"
        }`}
      >
        Next
      </motion.button>
    </div>
  );
}
