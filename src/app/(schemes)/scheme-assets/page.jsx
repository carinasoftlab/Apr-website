import { SchemeAssetsHeader } from "@/components/scheme-assets/SchemeAssetsHeader";
import ImportantLinks from "@/components/implink/ImportantLinks"
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";

export default function SchemeSorPage() {
  return (
    <>
      <Header />
      <main className="flex  flex-col items-center   justify-center min-h-screen  w-full ">
        <SchemeAssetsHeader />
        {/* <SchemeAssets /> */}
      </main>
      <ImportantLinks />
      <Footer />
    </>
  );
}
