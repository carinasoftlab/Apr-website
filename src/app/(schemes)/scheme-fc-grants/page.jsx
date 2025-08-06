import FCGrandsFaq from "@/components/scheme-fc-grants/FCGrandsFaq";
import { SchemeFcGrantsHeader } from "@/components/scheme-fc-grants/SchemeFcGrantsHeader";
import SchemeRelatedLinks from "@/components/scheme-fc-grants/SchemeRelatedLinks";
import TiedFunds from "@/components/scheme-fc-grants/TiedFunds";
import UnitedFunds from "@/components/scheme-fc-grants/UnitedFunds";
import SchemeTab from "@/components/scheme-sor/SchemeTab";
import Dropdown from "@/components/ui/dropdown/Dropdown";
import TiedFundsPagination from "@/components/ui/pagination/TiedFundsPagination";
import Link from "@/components/links/page";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";
import ClientWrapper from "./ClientWrapper";

export default function Page({ searchParams }) {
  return (
    <>
      <Header />
      <main className="w-full py-12 md:py-16 lg:py-16 to-white">
        <ClientWrapper tabQuery={searchParams?.tab} />
      </main>
      <Link />
      <Footer />
    </>
  );
}
