// import { SchemeSorHeader } from "@/components/scheme-sor/SchemeSorHeader";
// import { SchemeSorSchemesSection } from "@/components/scheme-sor/SchemeSorMainSection";
// import Link from "@/components/links/page";
// import Footer from "@/components/footer/page";
// import Header from "@/components/Header/Header";

// export default function SchemeSorPage() {
//   return (
//     <>
//       <Header />
//       <main className="flex  flex-col items-center   justify-center min-h-screen  w-full ">
//         <SchemeSorHeader />
//         <SchemeSorSchemesSection />
//       </main>
//       <Link />
//       <Footer />
//     </>
//   );
// }


import ImportantLinks from "@/components/implink/ImportantLinks";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";
import { Suspense } from "react";
import ClientWrapper from "./ClientWrapper";

export default function SchemeSorPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <ClientWrapper />
        </Suspense>
      </main>
      <ImportantLinks />
      <Footer />
    </>
  );
}
