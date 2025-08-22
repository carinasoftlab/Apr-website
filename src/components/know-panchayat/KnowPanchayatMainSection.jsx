"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { videos } from "@/constants/video-panchayat";
import PanchayatTab from "./PanchayatTab";
import PanchayatVideos from "./PanchayatVideos";
import PanchayatOrders from "./PanchayatOrders";

export default function KnowPanchayatMainSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabQuery = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabQuery || "panchayat-videos");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Sync tab state with query param
  useEffect(() => {
    if (tabQuery && tabQuery !== activeTab) {
      setActiveTab(tabQuery);
    }
  }, [tabQuery]);

  const TABS = [
    { id: "panchayat-videos", label: "Panchayat Videos" },
    { id: "orders-circulars", label: "Orders / Circulars" },
  ];

  const filteredData = videos.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    // ✅ update query params without full reload
    const newUrl = `?tab=${tabId}`;
    router.replace(newUrl, { scroll: false });
  };

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case "panchayat-videos":
        return <PanchayatVideos data={filteredData} />;
      case "orders-circulars":
        return <PanchayatOrders data={filteredData} />;
      default:
        return null;
    }
  };

  return (
    <section className="flex items-center justify-center w-full py-12">
      <div className="w-full md:px-6 lg:px-0 xl:px-6">
        {/* Header + Controls */}
        <div className="mb-8 bg-white lg:p-6 flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row items-center justify-end">
            {/* Tabs */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <PanchayatTab
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

        {/* Tab Content */}
        <div>{renderTabContent(activeTab)}</div>
      </div>
    </section>
  );
}
