"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SchemeSorHeader } from "@/components/scheme-sor/SchemeSorHeader";
import { SchemeSorSchemesSection } from "@/components/scheme-sor/SchemeSorMainSection";

export default function ClientWrapper() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    console.log("Current tab:", tab); // Optional: handle query param logic
  }, [searchParams]);

  return (
    <>
      <SchemeSorHeader />
      <SchemeSorSchemesSection />
    </>
  );
}
