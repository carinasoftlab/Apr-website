"use client";
import { useState, useEffect } from "react";
import { useApi } from "@/lib/useApi";
import { motion } from "framer-motion";
import Pagination from "../Pagination";
import CardSkeleton from "../CardSkeleton";

// Live data

export default function PanchayatBhawansTab({ selectedDistrict, isLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openCardId, setOpenCardId] = useState(null);
  const itemsPerPage = 6;

  // Build params for useApi with correct district filter (server-side)
  const apiParams = {
    page: currentPage,
    limit: itemsPerPage,
    scheme: "RGSA",
    subScheme: "Panchayat Bhawan",
    approvalStatus: "approved"
  };
  if (selectedDistrict && selectedDistrict !== "all") {
    apiParams.district = selectedDistrict;
  }

  const { data, loading } = useApi(
    "/getAllSchemeAssets",
    "GET",
    {
      params: apiParams,
    }
  );

  // Reset to page 1 when district changes
  useEffect(() => {
    setCurrentPage(1);
    setOpenCardId(null);
  }, [selectedDistrict]);

  // Build display data when API data arrives
  const [displayData, setDisplayData] = useState([]);
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
      const prefix = hasUploadsInBase ? baseImageUrl : `${baseImageUrl}/images`;
      return `${prefix}/${encodeURI(img)}`;
    };

    const normalized = responseArray.map((item, idx) => {
      const gp = item.gramPanchayat || "--";
      const districtName = typeof item.district === "object" ? (item.district?.name || "N/A") : (item.district || "N/A");
      const heading = `${gp} , ${districtName}, Arunachal pradesh`;

      const assetImages = item?.documents?.assetImages || [];
      const firstImageFile = Array.isArray(assetImages)
        ? (assetImages[0]?.file || assetImages[0])
        : null;
      const image = resolveImageUrl(firstImageFile);

      const startYear = item.schemeTimelineStart ? new Date(item.schemeTimelineStart).getFullYear() : null;
      const endYear = item.schemeTimelineEnd ? new Date(item.schemeTimelineEnd).getFullYear() : null;
      const financialYear = startYear && endYear ? `${startYear}-${endYear}` : "N/A";

      const lat = item?.geoCoordinates?.latitude;
      const lon = item?.geoCoordinates?.longitude;
      const geoCoordinates = (lat != null && lon != null) ? `${lat}, ${lon}` : "N/A";

      return {
        id: item._id || idx,
        heading,
        title: item.block || "N/A",
        image,
        districtId: typeof item.district === "object" ? item.district?._id : item.district,
        financialYear,
        dateOfCompletion: item.completionDate ? new Date(item.completionDate).toLocaleDateString() : "N/A",
        geoCoordinates,
        status: item.currentStatus || "N/A",
      };
    });
    setDisplayData(normalized);
  }, [data]);

  const totalPages = Math.ceil((data?.totalDocuments || 0) / itemsPerPage) || 1;

  if (isLoading || loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const currentData = displayData;

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
                      Block
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
