"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApi } from "@/lib/useApi";

export default function Dropdown({ selectedDistrict = "all", onDistrictChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useApi("/getAllDistricts?sort=name", "GET");

  // Add 'All Districts' to top of array
  const districts = useMemo(() => {
    const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    const mapped = arr.map((d) => ({ value: d._id || d.value, label: d.name || d.label })).filter((d) => d.value && d.label);
    return [{ value: "all", label: "All Districts" }, ...mapped];
  }, [data]);

  const selectedDistrictName =
    districts.find((d) => d.value === selectedDistrict)?.label || "All Districts";

  return (
    <div className="relative w-full max-w-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 hover:bg-gray-50 transition-colors"
      >
        <span className={selectedDistrict === "all" ? "text-gray-800" : "text-gray-800"}>
          {selectedDistrictName}
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {loading && (
              <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            )}
            {!loading && districts.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">No districts</div>
            )}
            {!loading && districts.map((district) => (
              <button
                key={district.value}
                onClick={() => {
                  onDistrictChange?.(district.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedDistrict === district.value
                    ? "bg-green-50 text-green-600"
                    : "text-gray-800"
                }`}
              >
                {district.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
