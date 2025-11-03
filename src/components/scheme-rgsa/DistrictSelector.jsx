"use client";
import { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApi } from "@/lib/useApi";

export default function DistrictSelector({ selectedDistrict, onDistrictChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useApi("/getAllDistricts", "GET");

  const districts = useMemo(() => {
    const result = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];
    // All District option comes first (mimics original logic)
    return [
      { id: "all", name: "All Districts" },
      ...result.map((d) => ({ id: d._id, name: d.name }))
    ];
  }, [data]);

  const selectedDistrictName =
    districts.find((d) => d.id === selectedDistrict)?.name || "Select District";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px] justify-between text-gray-500 "
      >
        <span
          className={
            selectedDistrict === "all" ? "text-gray-500" : "text-gray-700"
          }
        >
          {selectedDistrict === "all"
            ? "Search District"
            : selectedDistrictName}
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
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {loading && (
              <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
            )}
            {!loading && districts.length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">No districts</div>
            )}
            {!loading && districts.map((district) => (
              <button
                key={district.id}
                onClick={() => {
                  onDistrictChange(district.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                  selectedDistrict === district.id
                    ? "bg-green-50 text-green-600"
                    : "text-gray-700"
                }`}
              >
                {district.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
