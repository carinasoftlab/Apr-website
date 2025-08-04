"use client";

import { useState } from "react";
import { SchemeSorAccordion } from "./SchemeSorAccordion";
import { schemeSorData } from "@/constants/scheme-sor.data";
import { Button } from "../ui/button";
import { SearchInput } from "./search-input";
import SchemeTab from "./SchemeTab";
import BasiceGrants from "./BasiceGrants";
import PerformanceGrants from "./PerformanceGrants";

export function SchemeSorSchemesSection() {
  const [activeTab, setActiveTab] = useState("basice-grants");
  const [searchTerm, setSearchTerm] = useState("");

  const DEFAULT_TABS = [
    { id: "basice-grants", label: "Basic Grants" },
    { id: "performance-grants", label: "Performance Grants" },
  ];

  const filteredData = schemeSorData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case "basice-grants":
        return <BasiceGrants />;
      case "performance-grants":
        return <PerformanceGrants />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Content not found
          </div>
        );
    }
  };

  return (
    <section className="flex max-w-11/12 items-center justify-center w-full py-12 ">
      <div className="w-full md:px-6 lg:px-0 xl:px-6">
        {/* Unified Header and Controls */}
        <div className="mb-8 bg-white lg:p-6 flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Heading */}
            <h2 className="text-3xl  md:text-[52px]  font-bold tracking-tight text-center md:text-left">
              SCHEMES UNDER <span className="text-prime">SOR</span>
            </h2>
            {/* Tab Buttons */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <SchemeTab
                actionButtons={DEFAULT_TABS.map((tab) => ({
                  label: tab.label,
                  id: tab.id,
                  onClick: () => handleTabChange(tab.id),
                }))}
                currentTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          </div>
        </div>

       <div className=""> {renderTabContent(activeTab)}</div>
      </div>
    </section>
  );
}
