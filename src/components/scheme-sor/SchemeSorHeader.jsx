"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useApi } from "@/lib/useApi";

export function SchemeSorHeader() {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("/images/placeholder.png");

  // Fetch SOR data
  const { data, loading, error } = useApi(
    "/getAllSchemePages?type=SOR",
    "GET"
  );


  

  // stop skeleton after API resolves
  useEffect(() => {
    if (!loading) setIsLoading(false);
  }, [loading]);

  // Extract SOR data
  const sorData = data?.data?.[0] || {};
  const description = sorData.description || "";
  const bannerImage = sorData.heroImage
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/${sorData.heroImage}`
    : "/images/placeholder.png";

  // Update image source when API data comes in
  useEffect(() => {
    if (bannerImage) setImgSrc(bannerImage);
  }, [bannerImage]);

  // SOP points (dynamic)
  const sections = sorData.sections || [];

  return (
    <section className="w-full py-12 md:py-16 lg:py-16 bg-gradient-to-t from-prime-bg to-white">
      <div className="max-w-11/12 px-4 md:px-6 mx-auto">
        {/* Title and Description */}
        <div className="mb-12 lg:mb-16 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl text-center lg:text-[52px] font-bold text-gray-800 leading-tight mb-6">
            STATE OWN SOURCE REVENUE (SOR) GRANTS
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
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left Column: Sections with headings and points */}
          <div className="space-y-10">
            {isLoading ? (
              <ul className="flex flex-col gap-6 text-sm md:text-base text-justify text-gray-700">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li
                    key={i}
                    className="flex items-start space-x-3 animate-pulse"
                  >
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="h-4 bg-gray-300 rounded w-full max-w-[90%]"></div>
                  </li>
                ))}
              </ul>
            ) : sections.length > 0 ? (
              sections.map((section, sIndex) => (
                <div key={sIndex} className="space-y-6">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-prime">
                    {section.heading}
                  </h2>
                  <ul className="flex flex-col gap-6 text-sm md:text-base text-justify text-gray-700">
                    {section.points?.map((point, index) => (
                      <li
                        key={index}
                        className="flex text-lg items-start space-x-3"
                      >
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{point}</span>
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
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-[32vw] h-[300px] md:h-[350px] lg:h-[400px]">
              {isLoading ? (
                <div className="w-full h-full bg-gray-300 rounded-[42px] animate-pulse" />
              ) : (
                <Image
                  src={imgSrc}
                  fill
                  alt="SOR Grants Landscape"
                  className="rounded-[42px] object-contain object-center shadow-lg"
                  priority
                  onError={() => setImgSrc("/images/placeholder.png")} // fallback works now
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
