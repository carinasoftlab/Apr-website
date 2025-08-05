"use client";

import Image from "next/image";
import { PlayCircle, ArrowRight } from "lucide-react";
import "./About.css";

export default function PanchayatPortal() {
  return (
    <div className="portal-wrapper lg:pb-10 xl:pb-16 2xl:pb-20 p-4 md:p-8">
      <div className="">
        <h1 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-[3.3rem] text-center font-bold text-[#2B2B2B] mb-4">KNOW YOUR PANCHAYAT</h1>
        <p className="text-base md:text-lg lg:text-xl 2xl:leading-8 text-center text-[#555555] mb-8 2xl:mb-10">
          Explore important circulars, guidelines, and informative videos to
          better understand the functioning of your Panchayat.<br className="hidden lg:block"/> This section
          serves as a resource hub to keep you informed about policies, roles,
          and responsibilities at the grassroots<br className="hidden lg:block"/> level. Stay updated, stay
          empowered.
        </p>
      </div>
      <div className="portal-grid">
        {/* Left Column */}
        <div className="bg-prime-bg rounded-4xl p-7 max-h-[50vh] lg:max-h-[60vh] w-full overflow-y-scroll">
          <div className=" bg-olive rounded-[19px] py-5 text-white text-center font-semibold text-lg xl:text-xl mb-6">Know Your Panchayat</div>
          <div className="card-list">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="bg-white flex flex-col md:flex-row items-center rounded-3xl w-full gap-5 md:gap-8">
                <div className="video-thumbnail rounded-4xl overflow-hidden mt-4 md:mt-0 px-3 md:px-0">
                  <Image
                    src="/images/videolink.png"
                    alt="Panchayat Bhavan inauguration"
                    width={250}
                    height={200}
                    className="object-cover w-full h-full rounded-3xl  md:rounded-none"
                  />
                  <div className="video-overlay rounded-3xl md:rounded-none mx-3 md:mx-0">
                    <PlayCircle className="icon-white" />
                  </div>
                </div>
                <div className="card-content-1  flex flex-col gap-2.5 px-6 mb-6 md:mt-6">
                  <h3 className="text-prime font-semibold text-base md:text-lg 2xl:text-xl">Panchayat Bhavan inaugurated</h3>
                  <p className="text-xs md:text-sm lg:text-base text-[#555555] leading-5 font-medium">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting. Lorem Ipsum is simply dummy text of the
                    printing and typesetting.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="portal-section max-h-[50vh] lg:max-h-[60vh]">
          <div className="bg-second rounded-[19px] py-5 text-white text-center font-semibold text-lg xl:text-xl mb-6">Orders / Circular</div>
          <div className="card-list">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div key={index} className="text-card flex flex-col gap-2.5 py-7 px-6 rounded-3xl">
                <h3 className="text-prime font-semibold text-base md:text-lg 2xl:text-xl">Panchayat Bhavan inaugurated</h3>
                <p className="text-xs md:text-sm lg:text-base text-[#555555] leading-5 font-medium">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting. Lorem Ipsum is simply dummy text of the printing
                  and typesetting.
                </p>
                <a href="#" className="text-prime font-medium text-xs md:text-sm lg:text-base flex items-center gap-1">
                  Read More <ArrowRight className="font-medium" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
