"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import CardSkeleton from "../CardSkeleton";

// Mock data for DPRC
const mockData = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `DPRC Center ${i + 1}`,
  location: "Gangtok Keshi, Burtam",
  district: ["gangtok", "mangan", "namchi", "gyalshing"][i % 4],
  image: `/images/scheme-rgsa/p-bhavan${i + 1}.png`,
  status: "Active",
  capacity: 50,
}));

export default function DPRCTab({ selectedDistrict, isLoading }) {
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
            className="bg-[#F5F5F5] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow p-5"
          >
            <div className="aspect-[16/10] relative overflow-hidden rounded-xl">
              <img
                src={item.image || "/images/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.svg";
                }}
              />
            </div>
            <div className="pt-5">
              <h3 className="font-semibold text-center">{item.title}</h3>
              {/* <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Location:</span> {item.location}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {item.status}
                </p>
                <p>
                  <span className="font-medium">Capacity:</span> {item.capacity}{" "}
                  people
                </p>
              </div> */}
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
