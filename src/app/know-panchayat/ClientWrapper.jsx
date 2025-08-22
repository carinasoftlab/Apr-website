"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { KnowPanchayatHeader } from "@/components/know-panchayat/KnowPanchayatHeader";
import  KnowPanchayatMainSection  from "@/components/know-panchayat/KnowPanchayatMainSection";
import PanchayatVideos from "@/components/know-panchayat/PanchayatVideos";
import PanchayatOrders from "@/components/know-panchayat/PanchayatOrders"


const tab = [
  { id: "panchayat-videos", label: "panchayat Videos" },
  { id: "orders/circulars", label: "Orders / Circulars" },
];

export default function ClientWrapper() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    console.log("Current tab:", tab);
  }, [searchParams]);

  const renderTabContent = (tabId) => {
    switch (tabId) {
      case "panchayat videos":
        return <PanchayatVideos />;
      case "orders / circulars":
        return <PanchayatOrders />;
    }
  }

  return (
    <>
      <KnowPanchayatHeader />
      <KnowPanchayatMainSection />
    </>
  );
}
