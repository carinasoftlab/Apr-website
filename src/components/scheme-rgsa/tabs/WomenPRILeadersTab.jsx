"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import CardSkeleton from "../CardSkeleton";

// Mock data for Women PRI Leaders
const mockData = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  name: "Nyabi Jini Dirchi",
  designation: "Designation",
  location: "Garung Karbi, Balijan, Anni District",
  district: ["gangtok", "mangan", "namchi", "gyalshing", "soreng", "pakyong"][
    i % 6
  ],
  image: `/images/scheme-rgsa/women-leader.png`,
  phone: "+91 98765 43210",
}));

export default function WomenPRILeadersTab({ selectedDistrict, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 24;

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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <CardSkeleton key={i} variant="profile" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6  gap-6">
        {currentData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-gradient-to-b from-prime-bg to-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-second p-3"
          >
            {/* Profile Image */}
            <div className="aspect-square relative overflow-hidden mb-4">
              <img
                src={item.image || "/images/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover rounded-2xl "
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.svg";
                }}
              />
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold text-center ">{item.name}</h3>

            {/* Designation */}
            <p className="text-base font-medium text-center mb-3">
              {item.designation}
            </p>

            {/* Location */}
            <p className="text-lg text-[#555555] font-medium text-center leading-relaxed px-3">
              {item.location}
            </p>
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
