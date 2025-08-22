"use client";

import Image from "next/image";
import { PlayCircle, ArrowRight } from "lucide-react";
import "./About.css";
import Link from "next/link";

export default function PanchayatPortal() {
  return (
    <section id="about">
      <div className="portal-wrapper lg:pb-10 xl:pb-16 2xl:pb-20 p-4 md:p-8">
        <div className="">
          <h1 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-[3.3rem] text-center font-bold text-[#2B2B2B] mb-4">
            KNOW YOUR PANCHAYAT
          </h1>
          <div className="max-w-7xlxl mx-auto px-4">
            <p className="text-base md:text-lg lg:text-xl 2xl:leading-8 text-justify text-[#555555] mb-8 2xl:mb-10">
              Explore important circulars, guidelines, and informative videos to
              {/* <br className="hidden lg:block" /> */}
              better understand the functioning of your Panchayat. This section
              serves as a resource hub to keep you informed about policies,
              roles,
              {/* <br className="hidden lg:block" /> */}
              and responsibilities at the grassroots level. Stay updated, stay
              empowered.
            </p>
          </div>
        </div>
        <div className="portal-grid">
          {/* Left Column */}
          <div className="relative bg-prime-bg rounded-4xl p-7 pt-0 max-h-[50vh] lg:max-h-[60vh] w-full overflow-y-scroll custom-scrollbar">
            <div className="bg-prime-bg sticky top-0 z-10 pb-6 lg:pb-9 w-full pt-8 items-center">
              <Link
                href="/know-panchayat?tab=panchayat-videos"
                className="bg-olive relative rounded-[19px] flex items-center justify-center py-5 text-white text-center font-semibold text-lg xl:text-xl mb-6 hover:bg-olive/90 transition"
              >
                <p className="mx-auto">Panchayat Videos</p>
                <p className="absolute right-4 text-4xl top-3">›</p>
              </Link>
            </div>
            <div className="card-list">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="bg-white flex 2xl:py-4 flex-col   md:px-4 md:flex-row items-center rounded-3xl w-full gap-5 md:gap-8 lg:gap-2"
                >
                  <div className="video-thumbnail rounded-3xl overflow-hidden mt-4 md:mt-0 px-3 md:px-0">
                    <Image
                      src="/images/videolink.png"
                      alt="Panchayat Bhavan inauguration"
                      width={250}
                      height={200}
                      className="object-cover w-full h-full rounded-3xl md:rounded-2xl"
                    />
                    <div className="video-overlay  mx-3 md:mx-0">
                      <a href="/know-panchayat?tab=panchayat-videos">
                        <PlayCircle className="icon-white" />
                      </a>
                    </div>
                  </div>
                  <div className="card-content-1  flex flex-col gap-2.5 px-6 mb-6 md:mt-6">
                    <h3 className="text-prime font-semibold text-base md:text-lg 2xl:text-xl">
                      Panchayat Bhavan inaugurated
                    </h3>
                    <p className="text-xs md:text-sm lg:text-base text-[#555555] leading-5 font-medium">
                      Description of the Panchayat Bhavan inauguration event,
                      coming soon
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative bg-prime-bg rounded-4xl p-7 pt-0 max-h-[50vh] lg:max-h-[60vh] w-full overflow-y-scroll custom-scrollbar">
            <div className="bg-prime-bg sticky top-0 z-10 pb-6 lg:pb-9 w-full pt-8 items-center">
              <Link
                href="/know-panchayat?tab=orders-circulars"
                className="bg-second relative rounded-[19px] flex items-center justify-center py-5 text-white text-center font-semibold text-lg xl:text-xl mb-6 hover:bg-second/90 transition"
              >
                {/* Centered text */}
                <p className="mx-auto">Orders / Circulars</p>
                {/* Arrow on right */}
                <p className="absolute right-4 text-4xl top-3">›</p>
              </Link>
            </div>
            <div className="card-list">
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <div
                  key={index}
                  className="text-card flex flex-col gap-2.5 py-7 px-6 rounded-3xl"
                >
                  <h3 className="text-prime font-semibold text-base md:text-lg 2xl:text-xl">
                    Panchayat Bhavan inaugurated
                  </h3>
                  <p className="text-xs md:text-sm lg:text-base text-[#555555] leading-5 font-medium">
                    Description of the Panchayat Bhavan inauguration event,
                    coming soon
                  </p>
                  <a
                    href="/know-panchayat?tab=orders-circulars"
                    className="text-prime font-medium text-xs md:text-sm lg:text-base flex items-center gap-1"
                  >
                    Read More <ArrowRight className="font-medium" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
