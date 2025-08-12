"use client";
import React, { useEffect } from "react";
export default function DistrictReportCard({ districtData, onClose }) {
  if (!districtData) return null;

  const {
    name,
    50: score,
    16: rank,
    24: total,
    12: completed,
    8: going,
    10: assets,
    16: dprc,
    10: womenPRI,
    totalLeaders,
    10: training,
    3: panchayatBhawans,
  } = districtData;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4 overflow-hidden">
      <div className="relative bg-white w-full max-w-5xl rounded-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto shadow-2xl">
        <h1 className="text-center text-green-900 text-3xl md:text-4xl font-bold font-montserrat mb-4">
          GRASS ROOT GOVERNANCE
        </h1>

        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-center text-gray-800 text-2xl md:text-3xl font-bold flex-1">
            District Name : {name}
          </h1>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 px-4 py-2 font-extrabold text-lg md:text-xl bg-gray-100 hover:bg-red-500 hover:text-white transition rounded-full shadow-md"
          >
            ✕
          </button>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* RGSA Card */}
          <div className="w-full sm:w-[48%] h-fit lg:w-[31%] max-w-sm rounded-xl border border-yellow-500 bg-gradient-to-t from-[#FAEFDD] to-white shadow-md overflow-hidden">
            <div className="h-2 bg-yellow-500" />
            <div className="bg-yellow-500 text-white text-center font-bold font-montserrat text-2xl py-4">
              RGSA
            </div>
            <div className="p-4 space-y-3">
              {[
                ["Panchayat Bhawans", 3],
                ["DPRC", 16],
                ["Women PRI Leader", 10],
                ["Training Imparted", 10],
              ].map(([label, value]) => (
                <div
                  className="flex justify-between items-center gap-4"
                  key={label}
                >
                  <div className="font-bold text-gray-800 text-sm md:text-base flex-1">
                    {label}
                  </div>
                  <div className="rounded-md bg-gray-200 w-10 h-10 flex items-center justify-center font-bold text-sm">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOR Card */}
          <div className="w-full sm:w-[48%] h-fit lg:w-[31%] max-w-sm rounded-xl border border-yellow-500 bg-gradient-to-t from-[#FAEFDD] to-white shadow-md overflow-hidden">
            <div className="h-2 bg-[#778933]" />
            <div className="bg-[#778933] text-white text-center font-bold font-montserrat text-2xl py-4">
              SOR
            </div>
            <div className="p-4 space-y-3">
              {[
                ["Score", 50],
                ["Rank", 16],
                ["Total Schemes", 24],
                ["Complete Schemes", 12],
                ["On Going Schemes", 8],
                ["Assets", 10],
              ].map(([label, value]) => (
                <div
                  className="flex justify-between items-center gap-4"
                  key={label}
                >
                  <div className="font-bold text-gray-800 text-sm md:text-base flex-1">
                    {label}
                  </div>
                  <div className="rounded-md bg-gray-200 w-10 h-10 flex items-center justify-center font-bold text-sm">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FC Grants Card */}
          <div className="w-full sm:w-[48%] h-fit lg:w-[31%] max-w-sm rounded-xl border border-yellow-500 bg-gradient-to-t from-[#FAEFDD] to-white shadow-md overflow-hidden">
            <div className="h-2 bg-green-900" />
            <div className="bg-green-900 text-white text-center font-bold font-montserrat text-2xl py-4">
              FC GRANTS
            </div>
            <div className="p-4 space-y-3">
              {[
                ["Total Schemes", 24],
                ["Complete Schemes", 12],
                ["On Going Schemes", 8],
                ["Assets", 10],
              ].map(([label, value]) => (
                <div
                  className="flex justify-between items-center gap-4"
                  key={label}
                >
                  <div className="font-bold text-gray-800 text-sm md:text-base flex-1">
                    {label}
                  </div>
                  <div className="rounded-md bg-gray-200 w-10 h-10 flex items-center justify-center font-bold text-sm">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
