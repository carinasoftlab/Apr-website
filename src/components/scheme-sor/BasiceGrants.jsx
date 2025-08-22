"use client";
import React, { useEffect, useState } from "react";
import { SchemeSorAccordion } from "./SchemeSorAccordion";
import { SCHEME_UNDER_SOR_DATA } from "@/constants/scheme-sor.data";
import DistrictSelector from "@/components/scheme-rgsa/DistrictSelector";
import YearSelector from "../ui/yearSelector/YearSelector";
import Pagination from "../scheme-rgsa/Pagination";
const BasiceGrants = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("1"); // "1" corresponds to "All Districts"
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const itemsPerPage = 3;

  // District mapping to get name from ID
  const getDistrictNameById = (id) => {
    const districts = [
      { id: "1", name: "All Districts" },
      { id: "2", name: "Anjaw" },
      { id: "3", name: "Changlang" },
      { id: "4", name: "Dibang Valley" },
      { id: "5", name: "East Kameng" },
      { id: "6", name: "East Siang" },
      { id: "7", name: "Kamle" },
      { id: "8", name: "Kra Daadi" },
      { id: "9", name: "Kurung Kumey" },
      { id: "10", name: "Lepa Rada" },
      { id: "11", name: "Lohit" },
      { id: "12", name: "Longding" },
      { id: "13", name: "Lower Dibang Valley" },
      { id: "14", name: "Lower Siang" },
      { id: "15", name: "Lower Subansiri" },
      { id: "16", name: "Namsai" },
      { id: "17", name: "Pakke-Kessang" },
      { id: "18", name: "Papum Pare" },
      { id: "19", name: "Shi Yomi" },
      { id: "20", name: "Siang" },
      { id: "21", name: "Tawang" },
      { id: "22", name: "Tirap" },
      { id: "23", name: "Upper Dibang Valley" },
      { id: "24", name: "Upper Siang" },
      { id: "25", name: "Upper Subansiri" },
      { id: "26", name: "West Kameng" },
      { id: "27", name: "West Siang" },
      { id: "28", name: "Keyi Panyor" },
      { id: "29", name: "Bichom" },
    ];

    return districts.find((d) => d.id === id)?.name || "";
  };

  useEffect(() => {
    let filtered = SCHEME_UNDER_SOR_DATA;

    // Filter by district
    if (selectedDistrict !== "1") {
      // "1" is "All Districts"
      const districtName = getDistrictNameById(selectedDistrict);
      filtered = filtered.filter((item) => item.districtName === districtName);
    }
    if (selectedYear !== "all") {
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedDistrict, selectedYear]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Search Section */}
      <div className=" lg:p-4 flex flex-col md:flex-row items-start md:items-center gap-3 py-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Select District</span>
          <DistrictSelector
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="font-bold text-gray-800">Financial Year</p>
          <YearSelector onYearChange={setSelectedYear} />
        </div>
      </div>

      {/* Accordion Content */}
      <SchemeSorAccordion
        selectedDistrict={selectedDistrict}
        selectedYear={selectedYear}
        data={filteredData}
      />

      {/* {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )} */}
    </div>
  );
};

export default BasiceGrants;
