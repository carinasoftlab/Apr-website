"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import ImportantLinks from "@/components/implink/ImportantLinks";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Header />
      <section className="py-16 px-4 sm:px-6 lg:px-8 xl:py-40 bg-gradient-to-b from-white to-prime-bg font-mont">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-y-12 items-center">
            {/* Left Content - Contact Information */}
            <motion.div
              className="space-y-14"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div>
                <motion.h1
                  className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  CONTACT US
                </motion.h1>
                {/* <motion.p
                  className="text-gray-600 text-lg xl:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Queries Related to Schemes/Panchayat or for Engagement.
                </motion.p> */}
                {/* <motion.p
                  className="text-gray-600 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  write us at :
                </motion.p> */}
              </div>

              <div className="space-y-14">
                {/* Email */}
                <motion.div
                  className="flex items-center space-x-6 "
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <div className="flex-shrink-0 size-16 bg-prime-bg rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-prime" />
                  </div>
                  <div>
                    <h3 className="text-xl text-prime ">Email</h3>
                    <p className="text-lg">arunachalpanchayati@gmail.com</p>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  className="flex items-center space-x-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <div className="flex-shrink-0 size-16 bg-prime-bg rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-prime" />
                  </div>
                  <div>
                    <h3 className="text-xl text-prime">Address</h3>
                    <div className=" space-y-1 font-medium leading-tight text-lg">
                      <p className="">
                        Directorate of Panchayati Raj, Sector, Itanagar,
                        <br />
                        Arunachal Pradesh: 791111
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Map */}
            <motion.div
              className="relative h-full flex justify-center items-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* <ArunachalMap /> */}
              <Image width={700} height={700} src="/images/map-img.png" alt=""  />
              {/* <img className="w-[120%]" src="images/map-img.png" alt="" /> */}
            </motion.div>
          </div>
        </div>
      </section>

      <ImportantLinks />
      <Footer />
    </>
  );
}
