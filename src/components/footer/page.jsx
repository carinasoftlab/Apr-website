"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f3fcff] pt-12 px-8 pb-8">
      <div className="flex flex-col xl:flex-row gap-18 lg:flex-col xl:gap-38 justify-center items-center px-4 py-8 mx-auto">
        
        {/* Left Section: Logo and Social Media */}
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/images/footerlogo.svg"
              alt="Panchayati Raj Logo"
              width={200}
              height={200}
              className="mb-2 h-auto w-auto"
            />
            <h2 className="font-montserrat font-bold text-gray-800 text-xl md:text-[1.8vw]">
              PANCHAYATI RAJ
            </h2>
          </div>
          <div className="flex gap-3 mt-2 lg:mt-4 sm:gap-2">
            <Link href="#" aria-label="Facebook">
              <Image
                src="/images/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>

            <Link href="#" aria-label="X (formerly Twitter)">
              <Image
                src="/images/x.svg"
                alt="X (formerly Twitter)"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>

        {/* Other Links Section */}
        <div className="flex flex-col md:flex-col lg:flex-row gap-8 lg:gap-18 xl:gap-36 items-center">
          <div className="flex flex-col sm:flex-row gap-12 lg:gap-18 xl:gap-36">
            <div className="flex flex-col gap-4 font-montserrat items-start w-[15vw] lg:w-[10vw]">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                OTHER LINK
              </h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href="#"
                  className="text-sm sm:text-sm text-gray-700 font-medium hover:underline"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-sm sm:text-sm text-gray-700 font-medium hover:underline"
                >
                  About Us
                </Link>
              </nav>
            </div>

            <div className="flex flex-col gap-4 font-montserrat items-start">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                GET IN TOUCH
              </h3>
              <div className="flex items-start gap-2 text-sm text-justify sm:text-sm text-gray-700">
                {/* <MapPin
                  height={15}
                  className="text-green-600 -ml-8 mt-1 shrink-0"
                /> */}
                <p className="font-montserrat text-justify">
                  Directorate of Panchayati Raj, <br />
                  ESS Sector, Itanagar,
                  <br />
                  Arunachal Pradesh: 791111
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <p className="font-montserrat text-sm sm:text-sm">
              For RTI and grievance related queries,
              <br /> mail us at:{" "}
              <Link
                href="mailto:support@example.com"
                className="font-semibold  text-[#1E4C30] underline hover:text-[#F4AC1A]"
              >
                arunachalpanchayati@gmail.com
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 md:pt-6 text-center font-medium text-sm mt-4">
        <p>
          copyright 2025, Department of Panchayati Raaj, Govt. of Arunachal
          Pradesh
        </p>
      </div>
    </footer>
  );
}
