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
      <div className="grid grid-cols-[20%_80%]  text-sm md:text-lg font-bold text-gray-800">
        <div className="p-4 text-center">Performance Rank</div>
        <div className="p-4 text-center">District Name</div>
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
            className={`p-4 h-15 rounded-l-md text-sm md:text-lg ${
              isLoading ? "bg-[#FBE8B4]" : "bg-[#F4AC1A] text-black font-bold flex items-center justify-center text-lg"
            }`}
          >
            {!isLoading && item.rank}
          </div>
          <div
            className={`p-4  h-15 rounded-r-md text-center! justify-center text-sm md:text-lg ${
              isLoading ? "bg-[#FFF8EE] text-center" : "bg-[#FAEFDD] text-gray-800 flex items-center  text-lg text-center"
            }`}
          >
            {!isLoading && item.district}
          </div>
        </div>
      ))}
    </div>
  );
}
