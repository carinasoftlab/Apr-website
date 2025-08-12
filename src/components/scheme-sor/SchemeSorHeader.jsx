"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Step 1: Data Array
const sorProcedures = [
  {
    text: "SOR Basic Grants are distributed to 27 Districts based on area and population on a ratio of 50:50 basis.",
    dotColor: "bg-yellow-400",
  },
  {
    text: "70% of funds are released as Basic Grants to the 27 Zilla Parishads, shared between Gram Panchayats and Zilla Parishads in a 70:30 ratio respectively.",
    dotColor: "bg-green-800",
  },
  {
    text: "30% of funds received under SOR Grants shall be kept with the Department of Panchayati Raj as PERFORMANCE GRANTS for further release to best-performing Districts.",
    dotColor: "bg-green-600",
  },
];

export function SchemeSorHeader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full py-12 md:py-16 lg:py-16 bg-gradient-to-t from-prime-bg to-white">
      <div className="max-w-11/12 px-4 md:px-6 mx-auto">
        {/* Title and Description */}
        <div className="mb-12 lg:mb-16 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-3xl text-center lg:text-[52px] font-bold text-gray-800 leading-tight mb-6">
            STATE OWN SOURCE REVENUE (SOR) GRANTS
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 text-justify justify-center max-w-6xl">
            In pursuance of Article 243G of the Constitution of India and
            Articles 243H read with sections 31 & 99 of Arunachal Pradesh
            Panchayati Raj Act 1997 (Amended in 2018), the State Govt. Vide No.
            PR-21/2006 dated 27th Jan 2022 has placed 10% State Own Source
            Revenue (SOR) for PRIs through the SPICE model of devolution of
            power to PRIs.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left Column: SOP List or Skeleton */}
          <div className="space-y-6">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-prime">
              Standard Operating Procedure
            </h2>
            <ul className="flex flex-col gap-6 text-sm md:text-base text-justify text-gray-700">
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <li
                      key={i}
                      className="flex items-start space-x-3 animate-pulse"
                    >
                      <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="h-4 bg-gray-300 rounded w-full max-w-[90%] "></div>
                    </li>
                  ))
                : sorProcedures.map((item, index) => (
                    <li
                      key={index}
                      className="flex text-lg items-start space-x-3"
                    >
                      <div
                        className={`w-2 h-2 ${item.dotColor} rounded-full mt-2 flex-shrink-0`}
                      ></div>
                      <span>{item.text}</span>
                    </li>
                  ))}
            </ul>
          </div>

          {/* Right Column: Image or Skeleton */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-xl xl:max-w-[32vw] h-[300px] md:h-[350px] lg:h-[400px]">
              {isLoading ? (
                <div className="w-full h-full bg-gray-300 rounded-[42px] animate-pulse" />
              ) : (
                <Image
                  src="/images/scheme-sor/sor_grants_landscape.svg"
                  fill
                  alt="SOR Grants Landscape"
                  className="rounded-[42px] object-cover object-center shadow-lg"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
