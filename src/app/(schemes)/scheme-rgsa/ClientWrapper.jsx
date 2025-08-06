"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { SchemeRgsaHeader } from "@/components/scheme-rgsa/SchemeRgsaHeader";
import { SchemeRgsaSchemesSection } from "@/components/scheme-rgsa/SchemeRgsaMainSection";

export default function ClientWrapper() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab");
    console.log("Current tab:", tab);
  }, [searchParams]);

  return (
    <>
      <SchemeRgsaHeader />
      <SchemeRgsaSchemesSection />
    </>
  );
}
