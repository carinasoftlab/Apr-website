"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import "./Data.css"; //

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
    <section id="data" className="data-section">
      <div className="live-data-container">
        <motion.div
          className="live-data-heading"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 1 }}
        >
          <h2 className="live-data-title">LIVE DATA</h2>
        </motion.div>

        <motion.div
          className="live-data-grid"
          variants={cardGridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Card 1 */}
          <motion.div className="live-data-card" variants={cardItemVariants}>
            <Image
              src="/images/scheme.png"
              alt="Schemes Live"
              layout="fill"
              objectFit="cover"
              className="card-image"
            />
            <div className="card-overlay-teal" />
            <div className="card-content">
              <h3 className="card-number">50+</h3>
              <p className="card-label">Schemes</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div className="live-data-card" variants={cardItemVariants}>
            <Image
              src="/images/villages.png"
              alt="Villages Added"
              layout="fill"
              objectFit="cover"
              className="card-image"
            />
            <div className="card-overlay-Tangerine" />
            <div className="card-content">
              <h3 className="card-number-2">2700</h3>
              <p className="card-label-2">Villages Added So Far</p>
            </div>
          </motion.div>

          <motion.div className="live-data-card" variants={cardItemVariants}>
            <Image
              src="/images/bhawan.png"
              alt="Villages Added"
              layout="fill"
              objectFit="cover"
              className="card-image"
            />
            <div className="card-overlay-blue" />
            <div className="card-content">
              <h3 className="card-number-3">24+</h3>
              <p className="card-label-3">Panchayat Bhawan</p>
            </div>
          </motion.div>

          <motion.div className="live-data-card" variants={cardItemVariants}>
            <Image
              src="/images/centre.png"
              alt="Villages Added"
              layout="fill"
              objectFit="cover"
              className="card-image"
            />
            <div className="card-overlay-green" />
            <div className="card-content">
              <h3 className="card-number-4">18</h3>
              <p className="card-label-4">DPRC Centre</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
