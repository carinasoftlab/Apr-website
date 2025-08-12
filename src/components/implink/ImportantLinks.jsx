"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function LinksSlider({
  items = [
    {
      name: "Open Govt. Data (OGD) Platform India",
      href: "https://data.gov.in",
      logoSrc: "/images/logo1.svg",
    },
    {
      name: "Incredible India",
      href: "https://incredibleindia.gov.in",
      logoSrc: "/images/logo2.svg",
    },
    {
      name: "Centralized Public Grievance Redress & Monitoring System",
      href: "https://pgportal.gov.in",
      logoSrc: "/images/logo3.svg",
    },
    {
      name: "Right To Information",
      href: "https://rti.dopt.gov.in",
      logoSrc: "/images/logo4.svg",
    },
    {
      name: "MyGov Portal",
      href: "https://mygov.in",
      logoSrc: "/images/logo5.svg",
    },
    {
      name: "National Portal of India",
      href: "https://www.india.gov.in",
      logoSrc: "/images/logo6.svg",
    },
    {
      name: "PM India",
      href: "https://www.pmindia.gov.in/",
      logoSrc: "/images/logo7.svg",
    },
    {
      name: "eGazette Of India",
      href: "https://egazette.gov.in",
      logoSrc: "/images/logo8.svg",
    },
    {
      name: "Digital India",
      href: "https://www.digitalindia.gov.in",
      logoSrc: "/images/logo9.svg",
    },
  ],
}) {
  const viewportRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth - 2;
    setCanPrev(el.scrollLeft > 2);
    setCanNext(el.scrollLeft < maxScrollLeft);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    updateButtons();
    const onScroll = () => updateButtons();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  const scrollByAmount = (dir) => {
    const el = viewportRef.current;
    if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.9);
    el.scrollBy({
      left: dir === "prev" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="links"
      className="important-links-section bg-gradient-to-b from-[#FAEFDD] to-[#fefdfa] py-8 lg:py-16 relative"
    >
      {/* Heading */}
      <div className="header text-center mb-10">
        <h1 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-[3.3rem] font-bold text-[#2B2B2B]">
          IMPORTANT LINKS
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-[30%] left-0 right-0 flex items-center justify-between z-10">
          <div className="pl-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label="Previous"
              className="pointer-events-auto rounded-full bg-white/80 backdrop-blur border shadow hover:bg-white"
              onClick={() => scrollByAmount("prev")}
              disabled={!canPrev}
            >
              <ChevronLeft className="size-5" />
            </Button>
          </div>
          <div className="pr-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label="Next"
              className="pointer-events-auto rounded-full bg-white/80 backdrop-blur border shadow hover:bg-white"
              onClick={() => scrollByAmount("next")}
              disabled={!canNext}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        {/* Slider Track */}
        <motion.div
          ref={viewportRef}
          className="overflow-x-auto scroll-smooth px-8 custom-scrollbar-hide max-w-7xl m-auto"
          aria-roledescription="carousel"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ul className="flex gap-6 py-3 snap-x snap-mandatory">
            {items.map((item, idx) => (
              <motion.li
                key={idx}
                className="snap-start shrink-0 w-[220px] sm:w-[250px]"
                variants={cardVariants}
              >
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-[28px] p-6 h-48 flex flex-col items-center justify-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <div className="h-20 lg:h-30 w-full flex items-center justify-center mb-4">
                    <Image
                      src={item.logoSrc || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <h2 className="text-black font-normal lg:text-sm text-center leading-tight hover:text-[#1c4d2f] transition-colors">
                    {item.name}
                  </h2>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
