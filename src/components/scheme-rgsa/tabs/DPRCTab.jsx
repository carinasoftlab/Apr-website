"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useApi } from "@/lib/useApi";

const GramPanchayatCard = ({ selectedDistrict = "all" }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Build params including district filter
  const apiParams = {
    page: 1,
    limit: 10,
    scheme: "RGSA",
    subScheme: "DPRC",
  };
  if (selectedDistrict && selectedDistrict !== "all") {
    apiParams.district = selectedDistrict;
  }

  // Fetch DPRC items
  const { data, loading } = useApi("/getAllSchemeAssets", "GET", {
    params: apiParams,
  });

  // When district changes, close modal if open
  useEffect(() => {
    setSelectedImage(null);
  }, [selectedDistrict]);

  // Resolve image URLs against NEXT_PUBLIC_IMAGE_URL
  const baseImageUrl = useMemo(
    () => (process.env.NEXT_PUBLIC_IMAGE_URL || "").replace(/\/$/, ""),
    []
  );
  const resolveImg = (file) => {
    if (!file) return "/images/placeholder.svg";
    if (/^https?:\/\//i.test(file)) return file;
    const hasUploads = /\/uploads\/(images|assets)\/?$/i.test(baseImageUrl);
    const prefix = hasUploads ? baseImageUrl : `${baseImageUrl}/uploads/images`;
    return `${prefix}/${encodeURI(file)}`;
  };

  const items = useMemo(() => {
    const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
    return arr.map((item, idx) => {
      const districtName =
        typeof item.district === "object" ? item.district?.name || "--" : item.district || "--";
      const docs1 = item?.documents?.documentsImg1 || [];
      const images = (Array.isArray(docs1) ? docs1 : [])
        .map((d) => resolveImg(d?.file || d))
        .slice(0, 3);
      while (images.length < 3) images.push("/images/placeholder.svg");
      return {
        id: item._id || idx,
        districtName,
        images,
      };
    });
  }, [data, baseImageUrl]);

  return (
    <div className="max-w-full mx-auto p-4">
      {/* Main Card */}
      <div className="flex gap-12 flex-col">
        {(loading ? [1, 2] : items).map((entry, entryIndex) => (
          <div
            key={loading ? entryIndex : entry.id}
            className={`rounded-2xl border p-8 md:p-14 border-[#F4AC1A] bg-gradient-to-b from-[#FFF8E1] to-white overflow-hidden space-y-8 ${
              loading ? "animate-pulse" : ""
            }`}
          >
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b border-[#F4AC1A] pb-2">
                Project Images
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {(loading ? [1, 2, 3] : entry.images).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
                    onClick={() => !loading && setSelectedImage({ src: img, alt: `DPRC image ${idx + 1}`, title: "Project Image" })}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={loading ? "/images/placeholder.svg" : img}
                      alt={loading ? "loading" : `DPRC image ${idx + 1}`}
                      className="w-full h-48 lg:h-60 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/placeholder.svg";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Card Header */}
            <div className="flex flex-col sm:justify-between sm:items-start gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#F4AC1A] uppercase tracking-wide">
                District: {loading ? "Loading..." : entry.districtName}
              </h2>
            </div>
          </div>
        ))}

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl max-h-fit"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 px-3.5 hover:bg-opacity-75 transition-all"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded">
                <h4 className="font-semibold">{selectedImage.title}</h4>
                <p className="text-sm text-gray-300">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GramPanchayatCard;
