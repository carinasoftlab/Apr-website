"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImportantLinks } from "@/store/api/homeSlice";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

function SafeImage({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src || "/images/placeholder.png");
  return (
    <img
      src={imgSrc}
      alt={alt}
      width={100}
      height={100}
      className="object-contain"
      onError={() => setImgSrc("/images/placeholder.png")}
    />
  );
}

export default function LinksSlider() {
  const viewportRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  const { data: linkData, loading, error } = useSelector(
    (state) => state.home.importantLinks
  );
  const items = linkData?.data || [];

  

  useEffect(() => {
    // trigger cached fetch on mount
    dispatch(fetchImportantLinks());
  }, [dispatch]);

  // Scroll to specific card index
  const scrollToIndex = (index) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    if (!card) return;

    const cardWidth = card.offsetWidth + 24; // gap-6 = 24px
    const newIndex = Math.max(0, Math.min(index, items.length - 1));

    el.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });

    setCurrentIndex(newIndex);
  };

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  // Snap after dragging
  const handleDragEnd = () => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    if (!card) return;

    const cardWidth = card.offsetWidth + 24;
    const newIndex = Math.round(el.scrollLeft / cardWidth);

    scrollToIndex(newIndex);
  };

  return (
    <section
      id="links"
      className="important-links-section bg-gradient-to-b from-[#FAEFDD] to-[#fefdfa] py-8 lg:py-16 relative"
    >
      <div className="header text-center mb-10">
        <h1 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-[3.3rem] font-bold text-[#2B2B2B]">
          IMPORTANT LINKS
        </h1>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <div className="pointer-events-none absolute inset-y-[30%] left-0 right-0 flex items-center justify-between z-10">
          <div className="pl-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              aria-label="Previous"
              className="pointer-events-auto rounded-full bg-white/80 backdrop-blur border shadow hover:bg-white"
              onClick={handlePrev}
              disabled={currentIndex === 0}
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
              onClick={handleNext}
              disabled={currentIndex === items.length - 1}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        {/* Slider Track with Drag Support */}
        <motion.div
          ref={viewportRef}
          className="overflow-x-auto scroll-smooth px-8 custom-scrollbar-hide max-w-7xl m-auto"
          aria-roledescription="carousel"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
        >
          <ul className="flex gap-6 py-3 snap-x snap-mandatory w-full">
            {loading ? (
              <p className="text-center w-full py-8 animate-pulse">
                Loading important links...
              </p>
            ) : error ? (
              <p className="text-center w-full py-8 text-red-500">
                Failed to load links
              </p>
            ) : items.length > 0 ? (
              items.map((item, idx) => (
                <li
                  key={item?._id || idx}
                  className="snap-start shrink-0 w-[220px] sm:w-[250px]"
                >
                  <Link
                    href={item?.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-[28px] p-6 h-48 flex flex-col items-center justify-center hover:shadow-lg hover:scale-105 transition-transform duration-300"
                  >
                    <div className="h-20 lg:h-30 w-full flex items-center justify-center mb-4">
                      <SafeImage
                        src={
                          item?.logo
                            ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/${item.logo}`
                            : "/images/placeholder.png"
                        }
                        alt={item?.name || "Logo"}
                      />
                    </div>
                    <h2 className="text-black font-normal lg:text-sm text-center leading-tight hover:text-[#1c4d2f] transition-colors">
                      {item?.name}
                    </h2>
                  </Link>
                </li>
              ))
            ) : (
              <p className="text-center w-full py-8">No links available</p>
            )}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
