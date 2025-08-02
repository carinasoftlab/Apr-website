import { SchemeSorHeader } from "@/components/scheme-sor/SchemeSorHeader";
import { SchemeSorSchemesSection } from "@/components/scheme-sor/SchemeSorMainSection";

export default function SchemeSorPage() {
  return (
    <main className="flex  flex-col items-center   justify-center min-h-screen  w-full ">
      <SchemeSorHeader />
      <SchemeSorSchemesSection />
    </main>
  );
}
