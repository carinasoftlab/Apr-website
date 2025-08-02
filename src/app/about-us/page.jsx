"use client"
import { motion } from 'framer-motion';
import Link from "@/components/links/page";
import Footer from "@/components/footer/page";
import Header from "@/components/Header/Header";

export default function page() {
 const stats = [
    { label: "Total District", value: "27" },
    { label: "Panchayat Bhawan", value: "08" },
    { label: "DPRC Centre", value: "23" },
    { label: "District Panchayat Development Officer", value: "22" },
    { label: "Zila Parishad Members", value: "242" },
    { label: "Total Zilla Parishad", value: "208" },
    { label: "Women PRI Leader", value: "2108" },
  ]
  return (
    <>
<Header />
       <section className="2xl:py-36 xl:py-32 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-prime-bg">
      <div className="max-w-11/12 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.p
                className=" text-lg xl:text-xl mb-2 font-extralight "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Arunachal Pradesh
              </motion.p>
              <motion.h1
                className="text-4xl lg:text-5xl  font-semibold text-prime mb-6 font-mont"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                PANCHAYATI RAJ
              </motion.h1>
            </div>

            <motion.div
              className="prose prose-lg text-gray-700 lg:leading-8 xl:text-xl lg:text-justify"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                <span className="font-semibold text-prime">The Department of Panchayati Raj</span> was established
                in the <span className="font-semibold text-prime">Year 1985</span>. Since then, the functions of the Department as
                per Allocation of Business Rules were limited with the conduct of Panchayati Raj Election and
                promulgation of Acts, Laws, Bye-Laws, Guidelines etc. of Panchayati Raj Department and its relevant
                matters. The work load of the Department has increased manifold and despite shortage of man power the
                department of Panchayati Raj had to implement the various flagship programmes in mission mode with
                limited man powers. As per implementation strategy of the Department, in all the respective Programme
                guidelines, there were provisions of man power for programme driven engagement on monthly fixed
                honorarium/salary basis in order to work with elected PRIs and smooth implementation of Civil works,
                base services and to oversee accounts and establishment matters at District level as well as at head
                quarters.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-[47px] overflow-hidden shadow-2xl">
              <img
                src="/images/About-hero.png"
                alt="Arunachal Pradesh Landscape"
                className="w-full h-[400px] 2xl:h-[55vh] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
          </section>
          

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-white to-prime-bg">
      <div className="max-w-4/5 mx-auto">
        <motion.h2
          className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-gray-800 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PANCHAYATS STRUCTURES IN ARUNACHAL PRADESH
        </motion.h2>

        <div className="bg-white rounded-3xl p-8">
          <div className="space-y-0.5">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex  justify-between bg-prime-bg rounded-xl  overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-1 px-6 py-4 xl:py-6 xl:px-28 2xl:py-7">
                  <h3 className="text-lg xl:text-xl font-semibold ">{stat.label}</h3>
                </div>
                <motion.div
                  className="bg-second px-8 py-4 min-w-[120px] 2xl:min-w-96 text-center xl:py-6 2xl:py-7 flex justify-center items-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-xl font-bold ">{stat.value}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      </section>
       <Link />
      <Footer />
    </>
  );
}
