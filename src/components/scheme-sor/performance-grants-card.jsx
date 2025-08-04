"use client";

import { useEffect, useState } from "react";
import { performanceData } from "@/constants/scheme-sor.data";

export function PerformanceGrantsCard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // simulate loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full mx-auto bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-2 text-lg font-bold text-gray-800">
        <div className="p-4">Performance Rank</div>
        <div className="p-4">District Name</div>
      </div>

      {/* Content */}
      {(isLoading ? performanceData : performanceData).map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-[20%_80%] pb-1 rounded-full ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          <div
            className={`p-4 h-12 rounded-l-md ${
              isLoading ? "bg-[#FBE8B4]" : "bg-[#F4AC1A] text-black font-bold flex items-center justify-center text-lg"
            }`}
          >
            {!isLoading && item.rank}
          </div>
          <div
            className={`p-4 pl-7 md:pl-14 h-12 rounded-r-md ${
              isLoading ? "bg-[#FFF8EE]" : "bg-[#FAEFDD] text-gray-800 flex items-center text-lg"
            }`}
          >
            {!isLoading && item.district}
          </div>
        </div>
      ))}
    </div>
  );
}
