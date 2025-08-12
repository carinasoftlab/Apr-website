"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DISTRICTS = [
  { id: "1", name: "All Districts" },
  { id: "2", name: "Tawang" },
  { id: "3", name: "West Kameng" },
  { id: "4", name: "East Kameng" },
  { id: "5", name: "Pakke-Kessang" },
  { id: "6", name: "Papum Pare" },
  { id: "7", name: "Kra Daadi" },
  { id: "8", name: "Kurung Kumey" },
  { id: "9", name: "Lower Subansiri" },
  { id: "10", name: "Upper Subansiri" },
  { id: "11", name: "West Siang" },
  { id: "12", name: "Leparada" },
  { id: "13", name: "Shi-Yomi" },
  { id: "14", name: "East Siang" },
  { id: "15", name: "Upper Siang" },
  { id: "16", name: "Lower Siang" },
  { id: "17", name: "Lower Dibang Valley" },
  { id: "18", name: "Dibang Valley" },
  { id: "19", name: "Lohit" },
  { id: "20", name: "Namsai" },
  { id: "21", name: "Anjaw" },
  { id: "22", name: "Changlang" },
  { id: "23", name: "Tirap" },
  { id: "24", name: "Longding" },
];

export default function DistrictSelector({
  selectedDistrict,
  onDistrictChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedDistrictName =
    DISTRICTS.find((d) => d.id === selectedDistrict)?.name || "Select District";

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
            {DISTRICTS.map((district) => (
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
