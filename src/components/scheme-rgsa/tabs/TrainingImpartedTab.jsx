"use client";
import { useState, useEffect } from "react";
import { useApi } from "@/lib/useApi";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import CardSkeleton from "../CardSkeleton";

// Live data fetched from API

export default function TrainingImpartedTab({ selectedDistrict, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const itemsPerPage = 9;

  // Build params for server-side filtering
  const apiParams = { page: currentPage, limit: itemsPerPage };
  if (selectedDistrict && selectedDistrict !== "all") {
    apiParams.district = selectedDistrict; // backend expects district ObjectId
  }

  // Fetch using shared hook with params
  const { data, loading, error } = useApi(
    "/getAllTrainingImparted",
    "GET",
    { params: apiParams }
  );

  // Reset page when district changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDistrict]);

  // Map API response into local state when data loads
  useEffect(() => {
    const responseArray = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];

    const baseImageUrl = (process.env.NEXT_PUBLIC_IMAGE_URL || "").replace(/\/$/, "");

    const resolveImageUrl = (img) => {
      if (!img) return "/images/placeholder.svg";
      if (/^https?:\/\//i.test(img)) return img; // already absolute
      const hasUploadsInBase = /\/uploads\/(images|assets)\/?$/i.test(baseImageUrl);
      const prefix = hasUploadsInBase ? baseImageUrl : `${baseImageUrl}/uploads/images`;
      return `${prefix}/${encodeURI(img)}`;
    };

    const normalized = responseArray.map((item) => ({
      id: item._id,
      trainingName: item.trainingName,
      location: item.location,
      district:
        typeof item.district === "object" ? item.district?.name : item.district,
      participations: item.participations,
      image: resolveImageUrl(item.image),
    }));

    setDisplayData(normalized);
  }, [data]);

  const totalPages = data?.totalPages || Math.ceil((data?.totalDocuments || displayData.length) / itemsPerPage) || 1;

  if (isLoading || loading) {
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
        {displayData.map((item, index) => (
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
                <p className="text-2xl font-bold text-gray-900">
                  {item.participations}
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
