import React, { useState } from "react";
// import { SearchInput } from './search-input';
import { SchemeSorAccordion } from "./SchemeSorAccordion";
import { schemeSorData } from "@/constants/scheme-sor.data";
import { SearchInput } from "./search-input";
import DistrictSelector from "@/components/scheme-rgsa/DistrictSelector";
import YearSelector from "../ui/yearSelector/YearSelector";
const BasiceGrants = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  return (
    <div>
      {/* Search Section */}
      <div className=" lg:p-4 flex flex-col md:flex-row items-start md:items-center gap-3 py-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold">Select District</span>
          <DistrictSelector
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="font-bold text-gray-800">Financial Year</p>
          <YearSelector />
        </div>

        {/* <SearchInput /> */}
      </div>

      {/* Accordion Content */}
      <SchemeSorAccordion />
    </div>
  );
};

export default BasiceGrants;
