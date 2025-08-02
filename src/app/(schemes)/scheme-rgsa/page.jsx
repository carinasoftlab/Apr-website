import { SchemeRgsaHeader } from "@/components/scheme-rgsa/SchemeRgsaHeader";
import { SchemeRgsaSchemesSection } from "@/components/scheme-rgsa/SchemeRgsaMainSection";

export default function SchemeRgsaPage() {
  return (
    <main className="flex  flex-col items-center   justify-center min-h-screen  w-full ">
      <SchemeRgsaHeader />
      <SchemeRgsaSchemesSection />
    </main>
  );
}
