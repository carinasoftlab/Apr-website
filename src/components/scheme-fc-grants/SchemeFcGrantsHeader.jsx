"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useApi } from "@/lib/useApi";

export function SchemeFcGrantsHeader() {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("/images/placeholder.png");

  // Fetch FC Grants page data
  const { data, loading, error } = useApi(
    "/getAllSchemePages?type=FC Grants",
    "GET"
  );

  useEffect(() => {
    if (!loading) setIsLoading(false);
  }, [loading]);

  // Extract FC Grants data safely
  const fcGrantsData = data?.data?.[0] || {};
  const description = fcGrantsData.description || "";
  const bannerImage = fcGrantsData.heroImage
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/${fcGrantsData.heroImage}`
    : "/images/placeholder.png";

  // Update image source when API gives data
  useEffect(() => {
    if (bannerImage) setImgSrc(bannerImage);
  }, [bannerImage]);

  // Sections (array of heading + points)
  const sections = fcGrantsData.sections || [];

  return (
    <section className="w-full bg-gradient-to-t from-prime-bg to-white">
      <div className="max-w-11/12 px-4 md:px-6 pb-12 mx-auto">
        {/* Title & Description */}
        <div className="mb-12 lg:mb-16 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl text-center lg:text-[52px] font-bold text-gray-800 leading-tight mb-6 uppercase">
            15TH FINANCE COMMISSION GRANTS
          </h1>
          {isLoading ? (
            <div className="w-full flex flex-col items-center gap-2">
              <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">
              Failed to load scheme data
            </p>
          ) : (
            <p className="text-sm text-justify md:text-base lg:text-lg 2xl:text-xl 2xl:leading-relaxed text-gray-700 lg:w-full 2xl:w-[95%]">
              {description}
            </p>
          )}
        </div>

        {/* Content Section */}
        <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-y-12 items-start">
          {/* Left Column: Dynamic Sections */}
          <div className="space-y-10">
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-6 bg-gray-300 w-48 rounded animate-pulse" />
                  <ul className="flex flex-col gap-6">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <li
                        key={j}
                        className="flex items-start space-x-3 animate-pulse"
                      >
                        <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="h-4 bg-gray-300 rounded w-full max-w-[85%]" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : sections.length > 0 ? (
              sections.map((section, i) => (
                <div key={section._id || i} className="space-y-4">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-prime">
                    {section.heading}
                  </h2>
                  <ul className="flex flex-col gap-6 text-sm md:text-base text-gray-700">
                    {section.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex text-lg items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="2xl:text-xl">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No sections available</p>
            )}
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full h-[400px] 2xl:h-[42vh] rounded-2xl max-w-lg lg:max-w-xl xl:max-w-[32vw]">
              {isLoading ? (
                <div className="w-full h-full bg-gray-300 rounded-[42px] animate-pulse" />
              ) : (
                <Image
                  src={imgSrc}
                  alt="FC Grants Banner"
                  className="w-full h-auto rounded-[42px] object-contain object-center shadow-lg"
                  fill
                  priority
                  onError={() => setImgSrc("/images/placeholder.png")} //  fallback works now
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
