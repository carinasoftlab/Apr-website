"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import CardSkeleton from "../CardSkeleton";

// Panchayat Bhawans data (East Kameng District)
const panchayatBhawansData = [
  {
    id: 1,
    heading: "Pankar Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan1.png",
    districtId: "4",
    financialYear: "2021-22 (Implemented 2022-23)",
    dateOfCompletion: "11/02/2023",
    geoCoordinates: "92.816146 27.394315",
    status: "Completed",
  },
  {
    id: 2,
    heading: "Bengde Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan2.png",
    districtId: "4",
    financialYear: "2021-22",
    dateOfCompletion: "22/07/2022",
    geoCoordinates: "93.041427 27.654570",
    status: "Completed",
  },
  {
    id: 3,
    heading: "Marjingla Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan3.png",
    districtId: "4",
    financialYear: "2021-22",
    dateOfCompletion: "11/06/2022",
    geoCoordinates: "93.039301 27.631816",
    status: "Completed",
  },
  {
    id: 4,
    heading: "Kadeya Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan4.png",
    districtId: "4",
    financialYear: "2021-22",
    dateOfCompletion: "18/06/2022",
    geoCoordinates: "92.889131 27.282900",
    status: "Completed",
  },
  {
    id: 5,
    heading: "Upper Liyak Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan5.png",
    districtId: "4",
    financialYear: "2021-22",
    dateOfCompletion: "28/06/2022",
    geoCoordinates: "92.845838 27.533602",
    status: "Completed",
  },
  {
    id: 6,
    heading: "Kadeya Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan6.jpg",
    districtId: "4",
    financialYear: "2021-22",
    dateOfCompletion: "18/06/2022",
    geoCoordinates: "92.889131 27.282900",
    status: "Completed",
  },
  {
    id: 7,
    heading: "Logoni Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan7.png",
    districtId: "4",
    financialYear: "2021-22 (Implemented 2022-23)",
    dateOfCompletion: "02/03/2023",
    geoCoordinates: "93.071196 27.292018",
    status: "Completed",
  },
  {
    id: 8,
    heading: "Pampoli Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan8.png",
    districtId: "4",
    financialYear: "2021-22",
    dateOfCompletion: "14/05/2022",
    geoCoordinates: "93.004237 27.318596",
    status: "Completed",
  },
  {
    id: 9,
    heading: "Kamrung Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan9.png",
    districtId: "4",
    financialYear: "2021-22",
    dateOfCompletion: "02/06/2022",
    geoCoordinates: "93.036373 27.242551",
    status: "Completed",
  },
  {
    id: 10,
    heading: "Domdila Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan10.png",
    districtId: "4",
    financialYear: "2022-23",
    dateOfCompletion: "16/03/2023",
    geoCoordinates: "93.108617 27.669393",
    status: "Completed",
  },
  {
    id: 11,
    heading: "Jeju Dada Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan11.png",
    districtId: "4",
    financialYear: "2022-23",
    dateOfCompletion: "10/02/2023",
    geoCoordinates: "93.076455 27.430880",
    status: "Completed",
  },
  {
    id: 12,
    heading: "Seba Gram Panchayat, East Kameng District (A.P)",
    title: "C/o Panchayat Bhawan cum Common Service Centre",
    image: "/images/scheme-rgsa/p-bhavan12.png",
    districtId: "4",
    financialYear: "2021-22 (Implemented 2022-23)",
    dateOfCompletion: "02/03/2023",
    geoCoordinates: "93.029988 27.227408",
    status: "Completed",
  },
];

export default function PanchayatBhawansTab({ selectedDistrict, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const [openCardId, setOpenCardId] = useState(null);

  const itemsPerPage = 6;

  useEffect(() => {
    const filtered =
      selectedDistrict === "all"
        ? panchayatBhawansData
        : panchayatBhawansData.filter(
            (item) => item.districtId === selectedDistrict
          );
    setFilteredData(filtered);
    setCurrentPage(1);
    setOpenCardId(null);
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
            className="bg-[#F5F5F5] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-5 cursor-pointer"
            onClick={() =>
              setOpenCardId((previousOpenCardId) =>
                previousOpenCardId === item.id ? null : item.id
              )
            }
          >
            {/* Image */}
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src={item.image}
                alt={item.heading}
                className="w-full h-full object-cover rounded-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.svg";
                }}
              />
            </div>

            {/* Title */}
            <div className=" py-4">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                {item.heading}
              </h3>

              {/* District and Village Info */}
              {/* {openCardId === item.id && ( */}
              <div className="bg-white py-4 px-6 rounded-xl">
                <div className="flex justify-between gap-5">
                  <div className="w-1/2">
                    <div className="text-sm font-bold text-gray-900  mb-1">
                      Name of Work
                    </div>
                    <div className="text-[0.75rem] text-gray-500">
                      {item.title}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="text-sm font-bold text-gray-900  mb-1">
                      Financial Year
                    </div>
                    <div className="text-[0.75rem] text-gray-500">
                      {item.financialYear}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-5">
                  <div className="w-1/2">
                    <div className="text-sm font-bold text-gray-900  mb-1">
                      Date of Completion
                    </div>
                    <div className="text-[0.75rem] text-gray-500">
                      {item.dateOfCompletion}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="text-sm font-bold text-gray-900  mb-1">
                      Geo Co-ordinates
                    </div>
                    <div className="text-[0.75rem] text-gray-500">
                      {item.geoCoordinates}
                    </div>
                  </div>
                </div>
              </div>
              {/* )} */}
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
