"use client";

import React from "react";
import Image from "next/image";

const BeforeAfterWork = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* heading  */}
      <div>
        <p className="text-[#778933] uppercase font-semibold flex items-center">
    Scheme category 
        </p>
      </div>

     
      {/* Card Body */}
      <div className="">
        {/* Fund Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl  border ">
            <Image
              src={data.image}
              alt="image"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="rounded-xl  border ">
            <Image
              src={data.image}
              alt="after"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[#555555] text-sm font-bold">
          Added On • {data.addedOn}
        </p>
        <div>
          <p className="text-prime uppercase font-semibold flex items-center">
          Description
          </p>
          <p className="font-normal text-sm">Description of the work</p>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterWork;
