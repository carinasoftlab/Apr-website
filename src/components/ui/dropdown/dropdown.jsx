import { DISTRICTS } from "@/constants/scheme-fc-grants.data";
import React from "react";

const Dropdown = () => {
  return (
    <div className="flex items-center  gap-5  w-full">
      <label htmlFor="district" className=" text-sm  text-gray-700  font-bold">
        Select a District
      </label>
      <select
        id="district"
        name="district"
        className="w-fit px-8 py-2  bg-gray-100 text-gray-800 rounded-md border text-sm text-start  focus:outline-none  transition duration-200 ease-in-out"
      >
        {DISTRICTS &&
          DISTRICTS.map((district) => (
            <option key={district.value} value={district.value}>
              {district.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Dropdown;
