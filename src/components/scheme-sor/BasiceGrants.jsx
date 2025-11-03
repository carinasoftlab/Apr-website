"use client";
import React, { useEffect, useState, useMemo } from "react";
import { SchemeSorAccordion } from "./SchemeSorAccordion";
import DistrictSelector from "@/components/scheme-rgsa/DistrictSelector";
import YearSelector from "../ui/yearSelector/YearSelector";
import Pagination from "../scheme-rgsa/Pagination";
import { useApi } from "@/lib/useApi";

const BasiceGrants = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("1"); // "1" corresponds to "All Districts"
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Derive year range (fallback to 2018-2024)
  const { startYear, endYear } = useMemo(() => {
    if (!selectedYear || selectedYear === "all") return { startYear: 2018, endYear: 2024 };
    // Attempt to parse formats like "2019", "2019-2020", "2019-20"
    const match = String(selectedYear).match(/(\d{4})(?:\D(\d{2,4}))?/);
    if (match) {
      const sy = parseInt(match[1], 10);
      const ey = match[2] ? (match[2].length === 2 ? parseInt(`20${match[2]}`, 10) : parseInt(match[2], 10)) : sy;
      if (!Number.isNaN(sy) && !Number.isNaN(ey)) return { startYear: Math.min(sy, ey), endYear: Math.max(sy, ey) };
    }
    return { startYear: 2018, endYear: 2024 };
  }, [selectedYear]);

  // Build params for API
  const categoryParams = useMemo(() => {
    const params = { startYear, endYear };
    if (selectedDistrict && selectedDistrict !== "1") params.district = selectedDistrict;
    return params;
  }, [selectedDistrict, startYear, endYear]);

  // Call API to get scheme categories
  const { data: categoryData, loading: categoryLoading } = useApi("/getAllSchemeCategory", "GET", { params: categoryParams });

  // Normalize into categories -> subcategories
  const categories = useMemo(() => {
    const arr = Array.isArray(categoryData?.data)
      ? categoryData.data
      : Array.isArray(categoryData)
      ? categoryData
      : [];

    const groups = new Map();
    arr.forEach((item) => {
      const cat = item?.schemeCategory || item?.category || "Unknown Category";
      const sub = item?.subSchemeCategory || item?.subCategory;
      if (!groups.has(cat)) groups.set(cat, new Set());
      if (Array.isArray(sub)) {
        sub.forEach((s) => s && groups.get(cat).add(String(s)));
      } else if (sub) {
        groups.get(cat).add(String(sub));
      }
    });

    return Array.from(groups.entries()).map(([category, subsSet]) => ({
      id: category,
      category,
      subCategories: Array.from(subsSet),
    }));
  }, [categoryData]);

  return (
    <div>
      {/* Search Section */}
      <div className=" lg:p-4 flex flex-col md:flex-row items-start md:items-center gap-3 py-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold w-full">Select District</span>

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
        selectedYear={`${startYear}-${endYear}`}
        categories={categories}
        categoriesLoading={categoryLoading}
      />
    </div>
  );
};

export default BasiceGrants;
