"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
// import "./link.css"; // your CSS for styles

const links = [
  { src: "/images/image1.svg", name: "Ministry of Panchayati Raj", href: "#" },
  { src: "/images/image2.svg", name: "Government of India", href: "#" },
  { src: "/images/image3.svg", name: "National Portal", href: "#" },
  { src: "/images/image4.svg", name: "Digital India", href: "#" },
  { src: "/images/image5.svg", name: "MyGov Portal", href: "#" },
  { src: "/images/image6.svg", name: "Arunachal Pradesh", href: "#" },
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

export default function Links() {
  return (
    <section
      id="links"
      className="important-links-section bg-gradient-to-b from-[#FAEFDD] to-[#FFFFFF] py-8 lg:py-16"
    >
      <div className="header text-center mb-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-[#2b2b2b]">
          IMPORTANT LINKS
        </h1>
      </div>

      <motion.div
        className="link-container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {links.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.href}
            className="content-img bg-white rounded-[28px] p-6 h-48 flex flex-col items-center justify-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
            variants={cardVariants}
          >
            <div className="h-20 lg:h-24 w-full flex items-center justify-center mb-4">
              <Image
                src={link.src}
                alt={link.name}
                width={100}
                height={80}
                className="object-contain"
              />
            </div>
            <h2 className="text-black font-normal text-base lg:text-xl text-center leading-tight hover:text-[#1c4d2f] transition-colors">
              {link.name}
            </h2>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
