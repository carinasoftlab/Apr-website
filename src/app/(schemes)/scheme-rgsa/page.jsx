// import { SchemeRgsaHeader } from "@/components/scheme-rgsa/SchemeRgsaHeader";
// import { SchemeRgsaSchemesSection } from "@/components/scheme-rgsa/SchemeRgsaMainSection";
// import Link from "@/components/links/page";
// import Footer from "@/components/footer/page";
// import Header from "@/components/Header/Header";

// export default function SchemeRgsaPage() {
//   return (
//     <>
//       <Header />
//       <main className="flex  flex-col items-center   justify-center min-h-screen  w-full ">
//         <SchemeRgsaHeader />
//         <SchemeRgsaSchemesSection />
//       </main>
//       <Link />
//       <Footer />
//     </>
//   );
// }
import Link from "@/components/links/page";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";
import { Suspense } from "react";
import ClientWrapper from "./ClientWrapper";

export default function SchemeRgsaPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <ClientWrapper />
        </Suspense>
      </main>
      <Link />
      <Footer />
    </>
  );
}
