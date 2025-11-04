"use client";
import React, { useEffect } from "react";

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-12">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-green-200 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <p className="mt-4 text-gray-600 font-semibold">Loading district data...</p>
  </div>
);

export default function DistrictReportCard({ districtData, loading, error, onClose, onRetry }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!districtData && !loading) return null;

  const districtName = districtData?.districtName || districtData?.name || "District";
  
  const rgsaData = Array.isArray(districtData?.data?.RGSA) ? districtData.data.RGSA : [];
  const sorData = districtData?.data?.SOR && typeof districtData.data.SOR === "object" ? districtData.data.SOR : {};
  const fcGrantsData = districtData?.data?.["FC Grants"] && typeof districtData.data["FC Grants"] === "object" ? districtData.data["FC Grants"] : {};

  const getRgsaCount = (category) => {
    if (!Array.isArray(rgsaData)) return 0;
    const item = rgsaData.find((item) => item?.category === category);
    return item?.count ?? 0;
  };

  const panchayatBhawans = getRgsaCount("Panchayat Bhawans");
  const dprc = getRgsaCount("DPRC");
  const womenPRI = getRgsaCount("Women PRI Leader");
  const training = getRgsaCount("Training Imparted");

  const sorTotalSchemes = Number(sorData?.totalSchemes) || 0;
  const sorCompleteSchemes = Number(sorData?.completeSchemes) || 0;
  const sorOnGoingSchemes = Number(sorData?.onGoingSchemes) || 0;
  const sorAssets = Number(sorData?.assets) || 0;

  const fcTotalSchemes = Number(fcGrantsData?.totalSchemes) || 0;
  const fcCompleteSchemes = Number(fcGrantsData?.completeSchemes) || 0;
  const fcOnGoingSchemes = Number(fcGrantsData?.onGoingSchemes) || 0;
  const fcAssets = Number(fcGrantsData?.assets) || 0;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4 overflow-hidden">
      <div className="relative bg-white w-full max-w-5xl rounded-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto shadow-2xl">
        <h1 className="text-center text-green-900 text-3xl md:text-4xl font-bold font-montserrat mb-4">
          GRASS ROOT GOVERNANCE
        </h1>

        {/* Header */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-center text-gray-800 text-2xl md:text-3xl font-bold flex-1">
            District Name : {districtName}
          </h1>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 px-4 py-2 font-extrabold text-lg md:text-xl bg-gray-100 hover:bg-red-500 hover:text-white transition rounded-full shadow-md"
          >
            ✕
          </button>
        </div>

        {loading && <Loader />}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-red-600 font-semibold text-lg mb-2">Error Loading Data</p>
            <p className="text-gray-600 text-sm">{error}</p>
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && !error && (
        <div className="flex flex-wrap justify-center gap-4">
          {/* RGSA Card */}
          <div className="w-full sm:w-[48%] h-fit lg:w-[31%] max-w-sm rounded-xl border border-yellow-500 bg-gradient-to-t from-[#FAEFDD] to-white shadow-md overflow-hidden">
            <div className="h-2 bg-yellow-500" />
            <div className="bg-yellow-500 text-white text-center font-bold font-montserrat text-2xl py-4">
              RGSA
            </div>
            <div className="p-4 space-y-3">
              {[
                ["Panchayat Bhawans", panchayatBhawans],
                ["DPRC", dprc],
                ["Women PRI Leader", womenPRI],
                ["Training Imparted", training],
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
                ["Total Schemes", sorTotalSchemes],
                ["Complete Schemes", sorCompleteSchemes],
                ["On Going Schemes", sorOnGoingSchemes],
                ["Assets", sorAssets],
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
                ["Total Schemes", fcTotalSchemes],
                ["Complete Schemes", fcCompleteSchemes],
                ["On Going Schemes", fcOnGoingSchemes],
                ["Assets", fcAssets],
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
        )}
      </div>
    </div>
  );
}
