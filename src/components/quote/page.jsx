"use client";
import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-8 md:py-10 lg:py-[60px] bg-gradient-to-b from-[#F4C81A] to-[#F4AC1A]">
      <h1 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-[3.3rem] text-center font-bold text-[#2B2B2B] mb-4">
        ABOUT US
      </h1>

      <div className="flex flex-col gap-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 px-2 sm:px-4">
          {/* Left Image */}
          <div className="flex flex-col items-center gap-4 text-center w-full lg:w-1/3">
            <Image
              src="/images/img1.svg"
              alt="about"
              width={500}
              height={500}
              className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[462px]"
            />
            <div>
              <h2 className="text-[#2B2B2B] font-extrabold text-base sm:text-lg  md:text-xl  xl:text-2xl">
                SHRI PEMA KHANDU
              </h2>
              <p className="text-[#2B2B2B] font-normal text-sm md:text-base   xl:text-lg">
                Hon'ble, Chief Minister
              </p>
            </div>
          </div>

          {/* Center Text */}
          <div className="w-full md:w-11/12 lg:w-2/3 xl:max-w-[683px] px-2 py-4">
            <p className="text-justify text-[#2B2B2B] text-base sm:text-lg md:text-sm xl:text-lg font-normal">
              The Department of Panchayati Raj was established in the year 1985.
              Since then, the functions of the Department, as per the Allocation
              of Business Rules, were limited to conducting Panchayati Raj
              elections and promulgating Acts, Laws, Bye-laws, Guidelines, etc.,
              of the Panchayati Raj Department and its relevant matters. The
              workload of the Department has increased manifold, and despite a
              shortage of manpower, the Department of Panchayati Raj has had to
              implement various flagship programmes in mission mode with limited
              manpower. As per the implementation strategy of the Department, in
              all the respective programme guidelines, there were provisions for
              manpower for programme-driven engagement on a monthly fixed
              honorarium/salary basis in order to work with elected PRIs and
              ensure the smooth implementation of civil works, basic services,
              and to oversee accounts and establishment matters at the district
              level as well as at headquarters.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex flex-col items-center gap-4 text-center w-full lg:w-1/3">
            <Image
              src="/images/img2.svg"
              alt="about"
              width={475}
              height={475}
            //className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[462px]"
              className="w-full max-w-[180px] sm:max-w-[230px] md:max-w-[280px] lg:max-w-[310px] xl:max-w-[330px]"
            />
            <div>
              <h2 className="text-[#2B2B2B] font-extrabold text-base sm:text-lg   xl:text-2xl">
                SHRI OJING TASING
              </h2>
              <p className="text-[#2B2B2B] font-normal text-sm md:text-base   xl:text-lg">
                Hon’ble Minister, Panchayati Raaj
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-wrap justify-center items-center gap-10">
          {/* Bottom Left */}
          <div className="flex flex-col items-center text-center">
            <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[190px] lg:h-[190px] xl:w-[250px] xl:h-[250px]">
              <Image
                src="/images/img3.svg"
                alt="about"
                width={250}
                height={250}
                className="w-full h-full rounded-full object-cover aspect-square"
              />
            </div>
            <div className="mt-2">
              <h2 className="text-[#2B2B2B] font-extrabold text-xs sm:text-sm md:text-base">
                SHRI MANISH K GUPTA
              </h2>
              <p className="text-[#2B2B2B] font-normal text-[10px] sm:text-xs md:text-sm">
                Chief Secretary
              </p>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="flex flex-col items-center text-center">
            <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[190px] lg:h-[190px] xl:w-[250px] xl:h-[250px]">
              <Image
                src="/images/img4.svg"
                alt="about"
                width={250}
                height={250}
                className="w-full h-full rounded-full object-cover aspect-square"
              />
            </div>
            <div className="mt-2">
              <h2 className="text-[#2B2B2B] font-extrabold text-xs sm:text-sm md:text-base">
                DR. SONAL SWAROOP, IAS
              </h2>
              <p className="text-[#2B2B2B] font-normal text-[10px] sm:text-xs md:text-sm">
                Secretary Panchayati Raj
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
