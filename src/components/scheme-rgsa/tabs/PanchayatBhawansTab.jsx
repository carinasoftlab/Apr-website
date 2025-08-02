"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import CardSkeleton from "../CardSkeleton";

// Mock data for Panchayat Bhawans
const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `PB-cum-CSC at Pankar GP`,
  image: `/images/scheme-rgsa/p-bhavan${i + 1}.png`,
  location: ["Kari-Daadi", "Parakha", "Soreng", "Namchi"][i % 4],
  district: ["Tawang", "Mangan", "Namchi", "Gyalshing"][i % 4],
  status: "Completed",
}));

export default function PanchayatBhawansTab({ selectedDistrict, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    const filtered =
      selectedDistrict === "all"
        ? mockData
        : mockData.filter((item) => item.district === selectedDistrict);
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedDistrict]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {currentData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#F5F5F5] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-5"
          >
            {/* Image */}
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src={item.image || "/images/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.svg";
                }}
              />
            </div>

            {/* Title */}
            <div className="px-6 py-4">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                {item.title}
              </h3>

              {/* District and Village Info */}
              <div className="grid grid-cols-2 gap-4 bg-white py-4 px-6 rounded-xl">
                <div>
                  <p className="text-sm text-gray-500 mb-1">District Name</p>
                  <p className="text-lg font-bold text-gray-900">
                    {item.district}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Village Name</p>
                  <p className="text-lg font-bold text-gray-900">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
