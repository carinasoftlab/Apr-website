"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Step 1: Data Array
const rgsaProcedures = [
  {
    text: "for water conservation purposes",
    dotColor: "bg-yellow-400",
  },
];

const rgsaProcedures_2 = [
  {
    text: "for need-based requirements at Gram Panchayat levels.    ",
    dotColor: "bg-yellow-400",
  },
];

export function SchemeFcGrantsHeader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // simulate loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full  bg-gradient-to-t from-prime-bg to-white">
      <div className="max-w-11/12 px-4 md:px-6 pb-12 mx-auto">
        {/* Title and Description */}
        <div className="mb-12 lg:mb-16 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl  text-center lg:text-[52px] font-bold text-gray-800 leading-tight mb-6 uppercase">
            15TH FINANCE COMMISSION GRANTS
          </h1>
          <p className="text-sm md:text-base lg:text-lg 2xl:text-xl 2xl:leading-relaxed text-gray-700 text-center max-w-8xl">
            The 15th Finance Commission, launched in 2020-21, allocates funds to
            Rural Local Bodies (RLBs) in two parts:
          </p>
        </div>

        {/* Content Section */}
        <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-y-12 items-start">
          {/* Left Column: SOP List or Skeleton */}
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-prime">
                Tied Grants
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
                  : rgsaProcedures.map((item, index) => (
                      <li
                        key={index}
                        className="flex text-lg items-start space-x-3"
                      >
                        <div
                          className={`w-2 h-2 ${item.dotColor} rounded-full mt-2 flex-shrink-0`}
                        ></div>
                        <span className="2xl:text-xl">{item.text}</span>
                      </li>
                    ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-prime">
                Untied Basic Grants
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
                  : rgsaProcedures_2.map((item, index) => (
                      <li
                        key={index}
                        className="flex text-lg items-start space-x-3"
                      >
                        <div
                          className={`w-2 h-2 ${item.dotColor} rounded-full mt-2 flex-shrink-0`}
                        ></div>
                        <span className="2xl:text-xl">{item.text}</span>
                      </li>
                    ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Image or Skeleton */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full h-[400px] 2xl:h-[42vh] rounded-2xl max-w-lg lg:max-w-xl xl:max-w-[32vw]">
              {isLoading ? (
                <div className="w-full aspect-video bg-gray-300 rounded-[42px] animate-pulse" />
              ) : (
                <Image
                  src="/images/scheme-sor/sor_grants_landscape.svg"
                  alt="SOR Grants Landscape"
                  className="w-full h-auto rounded-[42px] object-cover object-center shadow-lg"
                  priority
                  layout="fill"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
