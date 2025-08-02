import { SchemeRgsaHeader } from "@/components/scheme-rgsa/SchemeRgsaHeader";
import { SchemeRgsaSchemesSection } from "@/components/scheme-rgsa/SchemeRgsaMainSection";
import Link from "@/components/links/page";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";

export default function SchemeRgsaPage() {
  return (
    <>
      <Header />
      <main className="flex  flex-col items-center   justify-center min-h-screen  w-full ">
        <SchemeRgsaHeader />
        <SchemeRgsaSchemesSection />
      </main>
      <Link />
      <Footer />
    </>
  );
}
