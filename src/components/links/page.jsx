"use client";

import React from "react";
import "./link.css";
import { motion } from "framer-motion";

const links = [
  { src: "/images/image1.svg", name: "NAME" },
  { src: "/images/image2.svg", name: "NAME" },
  { src: "/images/image3.svg", name: "NAME" },
  { src: "/images/image4.svg", name: "NAME" },
  { src: "/images/image5.svg", name: "NAME" },
  { src: "/images/image6.svg", name: "NAME" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Page = () => {
  return (
    <section id="link" className="important-links-section">
      <div className="header">
        <h1>IMPORTANT LINKS</h1>
      </div>

      <motion.div
        className="link-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {links.map((link, idx) => (
          <motion.div className="content-img" key={idx} variants={cardVariants}>
            <img src={link.src} alt={link.name} width={250} height={300} />
            <h2>{link.name}</h2>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Page;
