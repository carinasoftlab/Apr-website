// "use client";

// import { useState } from "react";
// import { SchemeSorAccordion } from "../scheme-sor/SchemeSorAccordion";
// import { schemeSorData } from "@/constants/scheme-sor.data";
// import { Button } from "../ui/button";
// import { SearchInput } from "../scheme-sor/search-input";
// import SchemeTab from "../scheme-sor/SchemeTab";
// import BasiceGrants from "../scheme-sor/BasiceGrants";
// import PerformanceGrants from "../scheme-sor/PerformanceGrants";

// export function SchemeRgsaSchemesSection() {
//   const [activeTab, setActiveTab] = useState("basice-grants");
//   const [searchTerm, setSearchTerm] = useState("");

//   const DEFAULT_TABS = [
//     { id: "basice-grants", label: "Basic Grants" },
//     { id: "performance-grants", label: "Performance Grants" },
//   ];

//   const filteredData = schemeSorData.filter((item) =>
//     item.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleTabChange = (tabId) => {
//     setActiveTab(tabId);
//   };

//   const renderTabContent = (tabId) => {
//     switch (tabId) {
//       case "basice-grants":
//         return <BasiceGrants />;
//       case "performance-grants":
//         return <PerformanceGrants />;
//       default:
//         return (
//           <div className="text-center text-gray-500 py-8">
//             Content not found
//           </div>
//         );
//     }
//   };

//   return (
//     <section className="flex max-w-11/12 items-center justify-center w-full py-12 bg-gray-50">
//       <div className="w-full md:px-6">
//         {/* Unified Header and Controls */}
//         <div className="mb-8 bg-white lg:p-6 flex flex-col gap-5">
//           <div className="flex flex-col lg:flex-row items-center justify-between">
//             {/* Heading */}
//             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center md:text-left uppercase" >
//               RGSA Schemes
//             </h2>
//             {/* Tab Buttons */}
//             <div className="flex flex-col md:flex-row gap-3 md:gap-4">
//               <SchemeTab
//                 actionButtons={DEFAULT_TABS.map((tab) => ({
//                   label: tab.label,
//                   id: tab.id,
//                   onClick: () => handleTabChange(tab.id),
//                 }))}
//                 currentTab={activeTab}
//                 onTabChange={handleTabChange}
//               />
//             </div>
//           </div>
//         </div>

//        <div className="h-screen"> {renderTabContent(activeTab)}</div>
//       </div>
//     </section>
//   );
// }

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PanchayatBhawansTab from "./tabs/PanchayatBhawansTab";
import TrainingImpartedTab from "./tabs/TrainingImpartedTab";
import WomenPRILeadersTab from "./tabs/WomenPRILeadersTab";
import DPRCTab from "./tabs/DPRCTab";
import DistrictSelector from "./DistrictSelector";
import SchemeTab from "../scheme-sor/SchemeTab";

export function SchemeRgsaSchemesSection() {
  const [activeTab, setActiveTab] = useState("panchayat-bhawans");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const TABS = [
    { id: "panchayat-bhawans", label: "Panchayat Bhawans" },
    { id: "dprc", label: "DPRC" },
    { id: "training-imparted", label: "Training Imparted" },
    { id: "women-pri-leaders", label: "Women PRI Leaders" },
  ];

  const handleTabChange = (tabId) => {
    setIsLoading(true);
    setActiveTab(tabId);
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 500);
  };

  const renderTabContent = (tabId) => {
    const commonProps = {
      selectedDistrict,
      isLoading,
    };

    switch (tabId) {
      case "panchayat-bhawans":
        return <PanchayatBhawansTab {...commonProps} />;
      case "dprc":
        return <DPRCTab {...commonProps} />;
      case "training-imparted":
        return <TrainingImpartedTab {...commonProps} />;
      case "women-pri-leaders":
        return <WomenPRILeadersTab {...commonProps} />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Content not found
          </div>
        );
    }
  };

  return (
    <section className="flex max-w-full items-center justify-center w-full py-12 bg-gray-50">
      <div className="w-full px-4 md:px-6 max-w-11/12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full">
             {/* Heading */}
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center md:text-left uppercase" >
               RGSA Schemes
             </h2>
             {/* Tab Buttons */}
             <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <SchemeTab
                actionButtons={TABS.map((tab) => ({
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

          {/* Section Header with District Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Section Title */}
            <h2 className="text-3xl font-bold text-olive uppercase tracking-wide">
              {TABS.find((tab) => tab.id === activeTab)?.label}
            </h2>

            {/* District Selector */}
            <div className="flex items-center gap-3">
              <span className="font-semibold">Select District</span>
              <DistrictSelector
                selectedDistrict={selectedDistrict}
                onDistrictChange={setSelectedDistrict}
              />
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            {renderTabContent(activeTab)}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
