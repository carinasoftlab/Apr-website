"use client";
import FCGrandsFaq from "@/components/scheme-fc-grants/FCGrandsFaq";
import { SchemeFcGrantsHeader } from "@/components/scheme-fc-grants/SchemeFcGrantsHeader";
import SchemeRelatedLinks from "@/components/scheme-fc-grants/SchemeRelatedLinks";
import TiedFunds from "@/components/scheme-fc-grants/TiedFunds";
import UnitedFunds from "@/components/scheme-fc-grants/UnitedFunds";
import SchemeTab from "@/components/scheme-sor/SchemeTab";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import TiedFundsPagination from "@/components/ui/pagination/TiedFundsPagination";
import { useState } from "react";
import Link from "@/components/links/page";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";

const page = () => {
  const [activeTab, setActiveTab] = useState("District 1");
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  const DEFAULT_TABS = [
    { id: "tied-funds", label: "Tied Funds" },
    { id: "untied-funds", label: "Untied Funds" },
    { id: "faq", label: "FAQ" },
    { id: "scheme-related-links", label: "Scheme Related Links" },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case "tied-funds":
        return <TiedFunds />;
      case "untied-funds":
        return <UnitedFunds />;
      case "faq":
        return <FCGrandsFaq />;
      case "scheme-related-links":
        return <SchemeRelatedLinks />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Content not found
          </div>
        );
    }
  };
  return (
    <>
      <Header />
      <main className="w-full py-12 md:py-16 lg:py-16  to-white">
        <div className="w-full   mx-auto space-y-4 ">
          {/* Header */}
          <SchemeFcGrantsHeader />

          {/* Tab Section */}
          <div className="max-w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left">
              RGSA SCHEMES
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

          <div className="mb-8 max-w-11/12 mx-auto ">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
              <div className="">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center md:text-left uppercase text-[#778933]">
                  Tied Funds
                </h1>
              </div>
              <div className="flex items-center  w-[19rem]">
                <span className="font-semibold w-full">Select District</span>
                <Dropdown
                  selectedDistrict={selectedDistrict}
                  onDistrictChange={setSelectedDistrict}
                />
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-11/12 mx-auto">
            {renderTabContent(activeTab)}
          </div>

          <div className=" max-w-11/12 mx-auto flex justify-center md:justify-end">
            <TiedFundsPagination
              currentPage={1}
              totalPages={3}
              onPageChange={() => {}}
            />
          </div>
        </div>
      </main>
      <Link />
      <Footer />
    </>
  );
};

export default page;
