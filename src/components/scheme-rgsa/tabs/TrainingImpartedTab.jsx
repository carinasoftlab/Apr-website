"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import CardSkeleton from "../CardSkeleton";

// Mock data for Training Imparted
const mockData = [
  {
    id: 1,
    trainingName: "Panchayat Advancement Index (PAI)",
    location: "Yuchli",
    district: "Keyi Panyor District",
    participants: 50,
    image: "/images/scheme-rgsa/training1.png",
    date: "2024-01-15",
  },
  {
    id: 2,
    trainingName: "Panchayat Advancement Index (PAI)",
    location: "Yuchli",
    district: "Keyi Panyor District",
    participants: 50,
    image: "/images/scheme-rgsa/training2.jpeg",
    date: "2024-01-15",
  },
];

export default function TrainingImpartedTab({ selectedDistrict, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 9;

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <CardSkeleton key={i} variant="training" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gradient-to-b from-prime-bg to-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border-2 border-second p-4"
          >
            {/* Training Image */}
            <div className="aspect-video relative overflow-hidden mb-4">
              <img
                src={item.image || "/images/placeholder.svg"}
                alt={item.trainingName}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.svg";
                }}
              />
            </div>

            <div className="grid grid-cols-3">
              <div className="col-span-2">
                {/* Training Name Label */}
                <div>
                  <p className="text-sm text-prime font-medium mb-1">
                    Training Name
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.trainingName}
                  </h3>
                </div>
                <div>
                  {/* Location */}
                  <p className="text-sm text-prime font-medium mb-1">
                    Location
                  </p>
                  <p className="text-lg font-bold text-gray-900 mb-4">
                    {item.location}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-prime font-medium mb-1">
                    District
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {item.district}
                  </p>
                </div>
              </div>
              <div className=" bg-prime-bg rounded-2xl flex flex-col items-center justify-center ">
                <p className="text-sm text-prime font-medium mb-1">
                  Participations
                </p>
                <p className="text-6xl font-bold text-gray-900">
                  {item.participants}
                </p>
              </div>
            </div>

            {/* District and Participations */}
            {/* <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">
                  District
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {item.district}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-600 font-medium mb-1">
                  Participations
                </p>
                <p className="text-6xl font-bold text-gray-900">
                  {item.participants}
                </p>
              </div>
            </div> */}
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
