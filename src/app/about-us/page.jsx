"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ImportantLinks from "@/components/implink/ImportantLinks";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutData } from "@/store/api/homeSlice";
import { useApi } from "@/lib/useApi";

export default function AboutPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.home.aboutData);
  const [imageError, setImageError] = React.useState(false);

  const {
    data: globalCounts,
    loading: statsLoading,
    error: statsError,
  } = useApi("/getGlobalOverviewCounts", "GET");

  const stats = React.useMemo(() => {
    const d = globalCounts?.data || {};
    return [
      { label: "Total Districts", value: d.totalDistricts ?? "--" },
      { label: "Panchayat Bhawans", value: d.panchayatBhawans ?? "--" },
      { label: "DPRC Centres", value: d.dprcCentres ?? "--" },
      { label: "Women PRI Leaders", value: d.womenPriLeaders ?? "--" },
      {
        label: "District Panchayat Development Officers",
        value: d.districtPanchayatDevelopmentOfficers ?? "--",
      },
    ];
  }, [globalCounts]);

  const heroData = data?.data?.[0];
  const baseImageURL =
    process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "") || "";

  // Reset image error when data changes
  React.useEffect(() => {
    setImageError(false);
  }, [heroData?.heroImage]);

  // Fetch data on component mount
  React.useEffect(() => {
    dispatch(fetchAboutData());
  }, [dispatch]);

  if (error)
    return <p className="text-center text-red-500">Something went wrong</p>;

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="2xl:py-36 xl:py-32 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-prime-bg">
        <div className="max-w-[90%] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-5 w-40 bg-gray-300 rounded"></div>
                  <div className="h-10 w-72 bg-gray-300 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    <div className="h-4 w-4/6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ) : (
                <>
                  <motion.p
                    className="text-lg xl:text-xl mb-2 font-extralight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Arunachal Pradesh
                  </motion.p>
                  <motion.h1
                    className="text-4xl lg:text-5xl font-semibold text-prime mb-6 font-mont"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    PANCHAYATI RAJ
                  </motion.h1>

                  <motion.div
                    className="prose prose-lg text-gray-700 lg:leading-8 xl:text-xl lg:text-justify"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <p>{heroData?.content}</p>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative w-full h-[400px] 2xl:h-[55vh] rounded-[47px] overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {loading ? (
                <div className="w-full h-full bg-gray-300 animate-pulse rounded-[47px]" />
              ) : (
                <Image
                  src={
                    imageError || !heroData?.heroImage
                      ? "/images/placeholder.png"
                      : `${baseImageURL}/images/${heroData.heroImage}`
                  }
                  alt="Hero Image"
                  fill
                  className="object-cover rounded-xl"
                    onError={() => setImageError(true)}
                    unoptimized
                />
              )}
              {!loading && (
                <div className="absolute inset-0 bg-gray-300 opacity-10 pointer-events-none"></div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-white to-prime-bg">
        <div className="md:max-w-4/5 mx-auto">
          <motion.h2
            className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            PANCHAYATS STRUCTURES IN ARUNACHAL PRADESH
          </motion.h2>

          <div className="bg-white rounded-3xl p-8">
            <div className="space-y-1">
              {statsLoading && (
                <>
                  {[1, 2, 3, 4, 5].map((i, index) => (
                    <motion.div
                      key={i}
                      className="flex justify-between bg-prime-bg rounded-xl overflow-hidden flex-col md:flex-row mb-3 md:mb-1 animate-pulse"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="flex-1 px-6 py-4 xl:py-6 xl:px-28 2xl:py-7">
                        <div className="h-6 w-48 bg-gray-200 rounded"></div>
                      </div>
                      <div className="bg-second px-8 py-4 min-w-[120px] 2xl:min-w-96 text-center xl:py-6 2xl:py-7 flex justify-center items-center">
                        <div className="h-6 w-12 bg-white/60 rounded"></div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}

              {!statsLoading && statsError && (
                <div className="text-center py-6">
                  <p className="text-red-600">Failed to load overview stats.</p>
                </div>
              )}

              {!statsLoading &&
                !statsError &&
                stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="flex justify-between bg-prime-bg rounded-xl overflow-hidden flex-col md:flex-row mb-3 md:mb-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex-1 px-6 py-4 xl:py-6 xl:px-28 2xl:py-7">
                      <h3 className="text-lg xl:text-xl font-semibold text-center md:text-left">
                        {stat.label}
                      </h3>
                    </div>
                    <motion.div
                      className="bg-second px-8 py-4 min-w-[120px] 2xl:min-w-96 text-center xl:py-6 2xl:py-7 flex justify-center items-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-xl font-bold">{stat.value}</span>
                    </motion.div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <ImportantLinks />
      <Footer />
    </>
  );
}
