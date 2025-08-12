"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

// Parent container animation (for stagger)
const cardGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Each card animation
const cardItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function LiveData() {
  return (
    <section
      id="data"
      className="flex flex-col items-center gap-[52.431px] self-stretch bg-[#1E4C30] px-[74px] py-[47.569px] pb-[113px]"
    >
      <div className="py-2">
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 1 }}
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-[3.3rem] text-center font-bold text-white mb-8 2xl:mb-14">
            LIVE DATA
          </h1>
        </motion.div>

        <motion.div
          className="xl:flex xl:flex-row md:grid md:grid-cols-2 gap-8 flex flex-col"
          variants={cardGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Card 1 */}
          <motion.div
            className="relative rounded-[2rem] overflow-hidden shadow-lg  h-[40vh] w-[60vw] md:h-[30vw] md:w-auto md:flex-1 md:max-w-auto md:aspect-[4/3] lg:aspect-[3/4] lg:h-[25vw] xl:h-[15vw] xl:w-[20vw] lg:w-[35vw]  sm:flex-col"
            variants={cardItemVariants}
          >
            <Image
              src="/images/scheme.png"
              alt="Schemes Live"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#00CD85] opacity-80" />
            <div className="relative z-10 flex flex-col just-center items-center py-8 mt-4 xl:mt-0">
              <h3 className="text-white font-extrabold text-7xl xl:text-7xl">
                50+
              </h3>
              <p className="bg-[#1E4C30] font-bold px-4 py-4 rounded-xl text-white text-xl md:text-2xl">
                Gram Sabhas
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="relative rounded-[2rem] overflow-hidden shadow-lg  h-[40vh] w-[60vw] md:h-[30vw] md:w-auto md:flex-1 md:max-w-auto md:aspect-[4/3] lg:aspect-[3/4] lg:h-[25vw] xl:h-[15vw] xl:w-[20vw] lg:w-[35vw]  sm:flex-col"
            variants={cardItemVariants}
          >
            <Image
              src="/images/villages.png"
              alt="Villages Added"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#F4AC1A] opacity-80" />
            <div className="relative z-10 flex flex-col just-center items-center py-8 mt-4 xl:mt-0">
              <h3 className="text-white font-extrabold text-7xl xl:text-7xl">
                2700+
              </h3>
              <p className="font-bold px-4 py-4 rounded-xl text-white text-xl md:text-xl bg-[#59460F]">
                Women Friendly <br />
                Gram Panchayat
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="relative rounded-[2rem] overflow-hidden shadow-lg  h-[40vh] w-[60vw] md:h-[30vw] md:w-auto md:flex-1 md:max-w-auto md:aspect-[4/3] lg:aspect-[3/4] lg:h-[25vw] xl:h-[15vw] xl:w-[20vw] lg:w-[35vw]  sm:flex-col"
            variants={cardItemVariants}
          >
            <Image
              src="/images/bhawan.png"
              alt="Panchayat Bhawan"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1C71F0] opacity-70" />
            <div className="relative z-10 flex flex-col just-center items-center py-8 mt-4 xl:mt-0">
              <h3 className="text-white font-extrabold text-7xl xl:text-7xl">
                24+
              </h3>
              <p className="font-bold px-4 py-4 text-center rounded-xl text-white text-xl md:text-xl bg-[#1D4070]">
                E-Enable
                <br />
                Gram Panchayat
              </p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className="relative rounded-[2rem] overflow-hidden shadow-lg  h-[40vh] w-[60vw] md:h-[30vw] md:w-auto md:flex-1 md:max-w-auto md:aspect-[4/3] lg:aspect-[3/4] lg:h-[25vw] xl:h-[15vw] xl:w-[20vw] lg:w-[35vw]  sm:flex-col"
            variants={cardItemVariants}
          >
            <Image
              src="/images/centre.png"
              alt="DPRC Centre"
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#00CD85] opacity-70" />
            <div className="relative z-10 flex flex-col just-center items-center py-8 mt-4 xl:mt-0">
              <h3 className="text-white font-extrabold text-7xl xl:text-7xl">
                18+
              </h3>
              <p className="font-bold px-4 py-4 text-center rounded-xl text-white text-xl md:text-xl bg-[#1E4C30]">
                Baal And<br/>Mahila Sabha
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
