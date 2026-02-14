import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-300 text-blue-600 hover:bg-blue-50"
        }`}
      >
        ← Previous
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2 flex-wrap justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`w-10 h-10 rounded-md text-sm font-medium ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-50"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border border-gray-300 text-blue-600 hover:bg-blue-50"
        }`}
      >
        Next →
      </button>
    </div>
  );
}
