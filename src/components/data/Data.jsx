"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Animation Variants
const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const cardGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Card styles as an array
const cardStyles = [
  { bg: "#00CE5D", image: "/images/scheme.png", labelBg: "#1E4C30" },
  { bg: "#1C71F0", image: "/images/villages.png", labelBg: "#1D4070" },
  { bg: "#F59E0B", image: "/images/centre.png", labelBg: "#78350F" },
  { bg: "#00CD85", image: "/images/bhawan.png", labelBg: "#1E4C30" },
];

// Fallback style (if more cards than styles)
const fallbackStyle = {
  bg: "#1E4C30",
  image: "/images/centre.png",
  labelBg: "#ffffff33",
};

export default function LiveData({ liveDataCards }) {
 

  const cards = liveDataCards || [];

  return (
    <section className="flex flex-col items-center gap-12 bg-[#1E4C30] px-6 md:px-12 py-12 md:py-20">
      {/* Section Heading */}
      <motion.div
        className="text-center"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 1 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
          LIVE DATA
        </h1>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full"
        variants={cardGridVariants}
        initial="hidden"
        animate="visible" // ensure animation always runs
        viewport={{ once: true, amount: 0.3 }}
      >
        {cards.map((card, index) => {
          // Pick style by index, fallback if not enough styles
          const style = cardStyles[index] || fallbackStyle;

          return (
            <motion.div
              key={card._id || index}
              className="relative rounded-2xl overflow-hidden shadow-lg flex flex-col justify-center items-center h-[300px]" // fixed px height for now
              variants={cardItemVariants}
            >
              {/* Background image */}
              <Image
                src={style.image}
                alt={card.title || "Card"}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />

              {/* Color overlay */}
              <div
                className="absolute inset-0 z-0"
                style={{ backgroundColor: style.bg, opacity: 0.85 }}
              />

              {/* Card content */}
              <div className="relative z-10 flex flex-col justify-center items-center text-center space-y-4 px-4">
                <p
                  className="font-bold px-6 py-4 rounded-xl text-white text-lg md:text-2xl"
                  style={{ backgroundColor: style.labelBg }}
                >
                  {card.title || "No Title"}
                </p>
                <h3 className="text-white font-extrabold text-5xl md:text-6xl">
                  {card.number ?? 0}+
                </h3>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
