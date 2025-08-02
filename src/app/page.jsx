// import Header from '../components/Header/Header';
import Hero from "../components/hero/Hero";
import Map from "../components/map/Map";
import Scheme from "../components/scheme/page";
import Data from "../components/data/Data";
import Footer from "../components/footer/page";
import About from "../components/about/page";
import Links from "../components/links/page"
import Quote from "../components/quote/page"

export default function Home() {
  return (
    <main>
      {/* <Header /> */}
      <Hero />
      <Quote />
      <Map />
      <Scheme />
      <About />
      <Data />
      <Links />
      <Footer />
    </main>
  );
}
