"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useApi } from "@/lib/useApi";

export function SchemeRgsaHeader() {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("/images/placeholder.png");

  // Fetch API Data
  const { data, loading, error } = useApi(
    "/getAllSchemePages?type=RGSA",
    "GET"
  );

  // stop skeleton after API resolves
  useEffect(() => {
    if (!loading) setIsLoading(false);
  }, [loading]);

  // Extract scheme data
  const schemeData = data?.data?.[0] || {};
  const description = schemeData.description || "";
  const bannerImage = schemeData.heroImage
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/${schemeData.heroImage}`
    : "/images/placeholder.png";

  // Update image source when API data comes in
  useEffect(() => {
    if (bannerImage) setImgSrc(bannerImage);
  }, [bannerImage]);

  const sections = schemeData.sections || [];

  return (
    <section className="w-full py-12 md:py-16 lg:py-16 bg-gradient-to-t from-prime-bg to-white">
      <div className="max-w-max px-4 md:px-6 mx-auto">
        {/* Title and Description */}
        <div className="mb-12 lg:mb-16 flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl md:text-3xl text-center lg:text-[52px] font-bold text-gray-800 leading-tight mb-6 uppercase">
            Revamped Rashtriya Gram Swaraj Abhiyan (RGSA)
          </h1>

          {isLoading ? (
            <div className="w-full flex flex-col items-start gap-2">
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
        <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-y-12 px-4 2xl:px-18 lg:px-4 justify-center items-start">
          {/* Left Column: Sections */}
          <div className="space-y-10">
            {sections.map((section, sIndex) => (
              <div key={sIndex} className="space-y-6">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-prime">
                  {section.heading}
                </h2>
                <ul className="flex flex-col gap-6 text-sm md:text-base text-gray-700">
                  {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <li
                          key={i}
                          className="flex items-start space-x-3 animate-pulse"
                        >
                          <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="h-4 bg-gray-300 rounded w-full max-w-[90%]"></div>
                        </li>
                      ))
                    : section.points.map((point, index) => (
                        <li
                          key={index}
                          className="flex text-lg items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="2xl:text-xl">{point}</span>
                        </li>
                      ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full h-[400px] 2xl:h-[42vh] rounded-2xl max-w-lg lg:max-w-xl xl:max-w-[32vw] overflow-hidden">
              {isLoading ? (
                <div className="w-full h-full bg-gray-300 rounded-[42px] animate-pulse" />
              ) : (
                <Image
                  src={imgSrc}
                  alt="RGSA Banner"
                  fill
                  className="object-cover object-center rounded-[42px] shadow-sm"
                  priority
                  placeholder="blur"
                  blurDataURL="/images/placeholder.png"
                  onError={() => setImgSrc("/images/placeholder.png")} // fallback if broken
                  unoptimized
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
