"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import CardSkeleton from "../CardSkeleton";

// Real data for Women PRI Leaders
const womenData = [
  {
    id: 1,
    name: "Smti. Tuter Bagra",
    designation: "3/2-1 (GPC)",
    location: "Higi Bagra-2",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader.png",
  },
  {
    id: 2,
    name: "Smti. Geken Bagra",
    designation: "3/4-3 (GPM)",
    location: "Pigi Mengo Village",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader2.png",
  },
  {
    id: 3,
    name: "Smti. Jipu Bagra",
    designation: "3/1-1 (GPC)",
    location: "Higi Bagra-1",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader3.png",
  },
  {
    id: 4,
    name: "Smti. Mimbi Bagra",
    designation: "3/5-3 (GPM)",
    location: "Lipu Bagra-1",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader4.png",
  },
  {
    id: 5,
    name: "Smti. Jumbom Bagra",
    designation: "3/6-2 (GPM)",
    location: "Lipu Bagra-2",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader5.png",
  },
  {
    id: 6,
    name: "Smti. Minyum Karcho",
    designation: "3/3A-1 (GPM)",
    location: "Doji Jeko Village",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader6.png",
  },
  {
    id: 7,
    name: "Smti. Jumsa Ete Doji",
    designation: "3/3A-2 (GPC)",
    location: "Doji Jeko Village",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader7.png",
  },
  {
    id: 8,
    name: "Smti. Yabi Angu",
    designation: "3/3A-2-1 (GPM)",
    location: "Angu-II Village",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader8.png",
  },
  {
    id: 9,
    name: "Smti. Migba Angu",
    designation: "3/3A-1-2 (GPM)",
    location: "Angu-I Village",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader9.png",
  },
  {
    id: 10,
    name: "Smti. Lijum Doke Kamsi",
    designation: "i 3/3A-1-1 (GPM)",
    location: "Angu-I Village",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader10.png",
  },
  {
    id: 11,
    name: "Smti. Ligam Kato Lollen",
    designation: "3/3A-4 (GPM)",
    location: "Doji Nigmoi Village",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader11.png",
  },
  {
    id: 12,
    name: "Smti. Tobom Bagra",
    designation: "3/1-2 (GPM)",
    location: "Higi Bagra-1",
    // district: "west-siang",
    image: "/images/scheme-rgsa/women-leader12.png",
  },
];

export default function WomenPRILeadersTab({ selectedDistrict, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 12;

  useEffect(() => {
    const filtered =
      selectedDistrict === "all"
        ? womenData
        : womenData.filter((item) => item.district === selectedDistrict);
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedDistrict]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CardSkeleton key={i} variant="profile" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-6">
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
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.svg";
                }}
              />
            </div>

            {/* Name */}
            <h3 className="text-lg font-bold text-center">{item.name}</h3>

            {/* Designation */}
            <p className="text-base font-medium text-center mb-3">
              {item.designation}
            </p>

            {/* Location */}
            <p className="text-base text-[#555555] font-medium text-center leading-tight px-3">
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
