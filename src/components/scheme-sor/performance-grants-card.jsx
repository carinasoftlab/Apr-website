"use client";

import { useMemo } from "react";
import { useApi } from "@/lib/useApi";

export function PerformanceGrantsCard() {
  const { data, loading } = useApi("/getDistrictScores", "GET");

  const rows = useMemo(() => {
    const arr = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];
    return arr.map((item, index) => {
      const districtName =
        (item.district && typeof item.district === "object"
          ? item.district.name || item.district._id
          : item.district) || item.name || "--";
      const rank = item.rank || index + 1;
      
      return { rank, district: item?.districtName ?? districtName };
    });
  }, [data]);

  const skeletonCount = 10;

  return (
    <div className={`w-full mx-auto bg-white rounded-xl overflow-hidden transition-opacity duration-300 ${loading ? "opacity-90" : "opacity-100"}`}>
      {/* Header */}
      <div className="grid grid-cols-[20%_80%]  text-sm md:text-lg font-bold text-gray-800">
        <div className="p-4 text-center">Performance Rank</div>
        <div className="p-4 text-center">District Name</div>
      </div>

      {/* Content */}
      {(loading ? Array.from({ length: skeletonCount }) : rows).map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-[20%_80%] pb-1 rounded-full`}
        >
          <div
            className={`p-4 h-15 rounded-l-md text-sm md:text-lg ${
              loading
                ? "bg-[#FBE8B4] animate-pulse"
                : "bg-[#F4AC1A] text-black font-bold flex items-center justify-center text-lg"
            }`}
            style={loading ? { animationDelay: `${index * 60}ms` } : undefined}
          >
            {!loading && item.rank}
          </div>
          <div
            className={`p-4 h-15 rounded-r-md text-center! justify-center text-sm md:text-lg ${
              loading
                ? "bg-[#FFF8EE] animate-pulse"
                : "bg-[#FAEFDD] text-gray-800 flex items-center text-lg text-center"
            }`}
            style={loading ? { animationDelay: `${index * 60}ms` } : undefined}
          >
            {!loading && item.district}
          </div>
        </div>
      ))}

      {!loading && rows.length === 0 && (
        <div className="py-6 text-center text-gray-400">No performance data available.</div>
      )}
    </div>
  );
}
