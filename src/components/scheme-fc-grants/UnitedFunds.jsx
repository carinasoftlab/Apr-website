"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useApi } from "@/lib/useApi";
import TiedFundsPagination from "../ui/pagination/TiedFundsPagination";

const UnitedFunds = ({ selectedDistrict = "all" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Build params with conditional district
  const params = {
    scheme: "FC Grants",
    subScheme: "Untied Funds",
    page: currentPage,
    limit: itemsPerPage,
  };
  if (selectedDistrict && selectedDistrict !== "all") {
    params.district = selectedDistrict;
  }

  const { data, loading } = useApi("/getAllSchemeAssets", "GET", { params });

  // Parse and normalize live data
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    const arr = Array.isArray(data?.data) ? data.data : [];
    const baseImageUrl = (process.env.NEXT_PUBLIC_IMAGE_URL || "").replace(
      /\/$/,
      ""
    );
    const resolveImg = (file) => {
      if (!file) return "/images/placeholder.svg";
      if (/^https?:\/\//i.test(file)) return file;
      const hasUploads = /\/uploads\/(images|assets)\/?$/i.test(baseImageUrl);
      const prefix = hasUploads
        ? baseImageUrl
        : `${baseImageUrl}/uploads/images`;
      return `${prefix}/${encodeURI(file)}`;
    };
    setAssets(
      arr.map((item) => {
        const gpn = item.gramPanchayat || "--";
        let imgs = (item?.documents?.assetImages || [] || [])
          .map((img) => resolveImg(img.file || img))
          .slice(0, 2);
        // Always produce two entries.
        while (imgs.length < 2) imgs.push("/images/placeholder.svg");
        return {
          id: item._id,
          heading: `${gpn} Gram Panchayat`,
          district:
            typeof item.district === "object"
              ? item.district?.name || "--"
              : item.district || "--",
          schemeCategory: item.schemeCategory || "--",
          addedOn: item.submissionDate
            ? new Date(item.submissionDate).toLocaleDateString()
            : "--",
          description: item.description || "--",
          images: imgs,
        };
      })
    );
  }, [data]);

  useEffect(() => {
    setCurrentPage(1); // Reset pagination if district changes
  }, [selectedDistrict]);

  const totalPages = Math.ceil((data?.totalDocuments || 0) / itemsPerPage) || 1;

  if (loading) {
    return (
      <>
        {[1, 2, 3].map((k) => (
          <div
            className="rounded-2xl border mb-8 p-8 md:p-14 border-[#F4AC1A] bg-gradient-to-b from-prime-bg to-white overflow-hidden space-y-8 animate-pulse"
            key={k}
          >
            {/* Card Header skeleton */}
            <div className="flex flex-col sm:justify-between sm:items-start gap-4 ">
              <div>
                <div className="h-7 w-64 bg-gray-200/70 rounded mb-3" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                <div className="h-5 w-28 bg-gray-200/70 rounded-full mb-1" />
                <div className="h-5 w-24 bg-gray-200/70 rounded-full mb-1" />
                <div className="h-5 w-20 bg-gray-200/70 rounded-full mb-1" />
              </div>
            </div>
            {/* Images skeleton */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {[1, 2].map((iimg) => (
                <div
                  key={iimg}
                  className="lg:h-96 h-72 relative rounded-lg overflow-hidden border bg-white"
                >
                  <div className="absolute inset-0 bg-gray-200/60" />
                </div>
              ))}
            </div>
            {/* Card info skeleton */}
            <div className="flex flex-col gap-1">
              <div className="h-3 w-24 bg-gray-200/60 rounded mb-2" />
              <div className="h-5 w-24 bg-gray-200/70 rounded mb-2" />
              <div className="h-5 w-28 bg-gray-200/60 rounded mb-1" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-gray-200/70 rounded mb-1" />
              <div className="h-10 w-80 bg-gray-200/60 rounded" />
            </div>
          </div>
        ))}
        {totalPages > 1 && (
          <TiedFundsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </>
    );
  }

  if (!assets.length) {
    return (
      <>
        <div className="text-center py-6 text-gray-400">No Untied Funds data found.</div>
        {totalPages > 1 && (
          <TiedFundsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </>
    );
  }

  return (
    <>
      {assets.map((item, idx) => (
        <div
          key={item.id}
          className="rounded-2xl border mb-8 p-8 md:p-14 border-[#F4AC1A] bg-gradient-to-b from-prime-bg to-white overflow-hidden space-y-8"
        >
          {/* Card Header */}
          <div className="flex flex-col sm:justify-between sm:items-start gap-4 ">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-prime uppercase tracking-wide ">
                {item.heading}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <p className="text-black uppercase font-semibold flex items-center">
                District: {item.district}
              </p>
            </div>
            <span className=" text-[#778933] uppercase font-semibold flex items-center">
              {item.schemeCategory}
            </span>
          </div>
          {/* Images */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
            {item.images.length ? (
              item.images.map((img, i) => (
                <div
                  key={i}
                  className="   lg:h-96 h-72 relative rounded-lg overflow-hidden border bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={item.heading + " image " + (i + 1)}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.svg";
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-sm">No images.</div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#555555] font-[560] mb-2 text-xs flex items-center">
              Added On • {item.addedOn}
            </span>
            <span className="text-prime text-xl font-semibold flex items-center">
              Scheme Name
            </span>
            <span className="text-[#555555] font-normal text-sm flex items-center">
              {item?.gramPanchayat || "--"}
            </span>
          </div>
          {/* Description */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-[#778933] ">Description</span>
            <p className="text-gray-800 text-base">{item?.description}</p>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <TiedFundsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

export default UnitedFunds;
