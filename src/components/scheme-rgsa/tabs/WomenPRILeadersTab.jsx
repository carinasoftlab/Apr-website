"use client";
import { useState, useEffect } from "react";
import { useApi } from "@/lib/useApi";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import CardSkeleton from "../CardSkeleton";

// Live data via API

export default function WomenPRILeadersTab({ selectedDistrict, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const itemsPerPage = 12;

  // Build params for server-side district filtering
  const apiParams = { page: currentPage, limit: itemsPerPage };
  if (selectedDistrict && selectedDistrict !== "all") {
    apiParams.district = selectedDistrict;
  }
  // Fetch women leaders with params
  const { data, loading, error } = useApi(
    "/getAllWomenPriLeaders",
    "GET",
    { params: apiParams }
  );

  // Reset to page 1 on district change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDistrict]);

  // Normalize
  useEffect(() => {
    const responseArray = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];

    const baseImageUrl = (process.env.NEXT_PUBLIC_IMAGE_URL || "").replace(/\/$/, "");
    const resolveImageUrl = (img) => {
      if (!img) return "/images/placeholder.svg";
      if (/^https?:\/\//i.test(img)) return img;
      const hasUploadsInBase = /\/uploads\/(images|assets)\/?$/i.test(baseImageUrl);
      const prefix = hasUploadsInBase ? baseImageUrl : `${baseImageUrl}/uploads/images`;
      return `${prefix}/${encodeURI(img)}`;
    };

    const normalized = responseArray.map((item) => ({
      id: item._id,
      name: item.name,
      designation: item.designation,
      location: item.location,
      district: typeof item.district === "object" ? item.district?.name : item.district,
      image: resolveImageUrl(item.image),
    }));

    setDisplayData(normalized);
  }, [data]);

  const totalPages = data?.totalPages || Math.ceil((data?.totalDocuments || displayData.length) / itemsPerPage) || 1;

  if (isLoading || loading) {
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
        {displayData.map((item, index) => (
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
