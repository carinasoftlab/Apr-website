"use client";
import Hero from "../components/hero/Hero";
import Map from "../components/map/Map";
import Scheme from "../components/scheme/page";
import Data from "../components/data/Data";
import Footer from "../components/footer/page";
import PanchayatPortal from "../components/about/PanchayatPortal";
import ImportantLinks from "../components/implink/ImportantLinks";
import Quote from "../components/quote/page";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData, fetchImportantLinks } from "../store/api/homeSlice";

export default function Home() {
  const dispatch = useDispatch();
  const [slides, setSlides] = useState([]);
  const [liveDataCards, setLiveDataCards] = useState([]);

  // Redux selectors
  const { data: homeData, loading: homeLoading, error: homeError } = useSelector(
    (state) => state.home.homeData
  );
 

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchHomeData());
    dispatch(fetchImportantLinks());
  }, [dispatch]);

  // Retry function for error handling
  const handleRetry = () => {
    dispatch(fetchHomeData());
  };

  // Update local state when Redux data changes
  useEffect(() => {
    if (homeData?.data?.[0]) {
      setSlides(homeData.data[0].banner || []);
      setLiveDataCards(homeData.data[0].liveDataCards || []);
    }
  }, [homeData]);
  

  return (
    <main>
      <Header />
      <Hero data={slides} loading={homeLoading} />
      <Quote 
        data={homeData} 
        loading={homeLoading} 
        error={homeError}
        onRetry={handleRetry}
      />
      <Map />
      <Scheme />
      <PanchayatPortal 
        data={homeData?.data?.[0]?.knowYourPanchayat} 
        loading={homeLoading} 
        error={homeError} 
      />
      <Data liveDataCards={liveDataCards} />
      <ImportantLinks />
      <Footer />
    </main>
  );
}
