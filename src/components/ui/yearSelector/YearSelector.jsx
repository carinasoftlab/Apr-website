"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function generateAcademicYears(startYear, endYear) {
  const items = [];
  for (let y = endYear; y >= startYear; y--) {
    const label = `${y}-${y + 1}`;
    items.push({ id: label, name: label });
  }
  return items;
}

export default function YearSelector({
  selectedYear,
  onYearChange,
  startYear = 2018,
  endYear = new Date().getFullYear(),
  includeAll = true,
  placeholder = "Search Year",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = "year-selector-listbox";

  const YEARS = useMemo(() => {
    const base = generateAcademicYears(startYear, endYear);
    return includeAll ? [{ id: "all", name: "All Years" }, ...base] : base;
  }, [startYear, endYear, includeAll]);

  const selectedName =
    YEARS.find((y) => y.id === selectedYear)?.name || "Select Year";

  const containerRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <style jsx>{`
        .year-selector-dropdown::-webkit-scrollbar {
          width: 6px;
        }

        .year-selector-dropdown::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .year-selector-dropdown::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .year-selector-dropdown::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>

      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[220px] justify-between text-gray-500"
      >
        <span
          className={selectedYear === "all" ? "text-gray-500" : "text-gray-700"}
        >
          {selectedYear === "all" ? placeholder : selectedName}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={listboxId}
            role="listbox"
            aria-label="Select Year"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto year-selector-dropdown"
          >
            {YEARS.map((year) => {
              const isActive = selectedYear === year.id;
              return (
                <button
                  key={year.id}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onYearChange(year.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                    isActive ? "bg-green-50 text-green-600" : "text-gray-700"
                  }`}
                >
                  <span>{year.name}</span>
                  {isActive ? <Check className="w-4 h-4" /> : null}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
