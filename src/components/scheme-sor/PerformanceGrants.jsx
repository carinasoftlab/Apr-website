import React from "react";
import { SearchInput } from "./search-input";
import { SchemeSorAccordion } from "./SchemeSorAccordion";
import { PerformanceGrantsCard } from "./performance-grants-card";

const PerformanceGrants = () => {
  return (
    <div className="w-full space-y-8">
      {/* Header Section */}
      <div className="text-center ">
        <h1 className="text-3xl md:md:text-3xl lg:text-[52px] font-bold tracking-tight text-gray-900 dark:text-white uppercase">
          Performance Grants
        </h1>
      </div>

      {/* Performance Grants Cards */}
      <div className="px-4 lg:px-0">
        <PerformanceGrantsCard />
      </div>
    </div>
  );
};

export default PerformanceGrants;
