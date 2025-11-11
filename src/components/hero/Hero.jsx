"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";
import Image from "next/image";

const baseImageURL = process.env.NEXT_PUBLIC_IMAGE_URL;

export default function HeroCarousel({ data = [], loading = false }) {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  if (loading) {
    return (
      <div id="home" className="flex flex-col items-center relative">
        <div className="w-full relative h-[80vh] sm:h-[90vh] md:h-[70vh] lg:h-[75vh] xl:h-[75vh]">
          <div className="absolute inset-0 bg-gray-300 animate-pulse rounded-none" />
          <div className="absolute bottom-[10%] left-[5%] right-[5%]">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-3" />
            <div className="h-10 w-72 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="home" className="flex flex-col items-center relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 3000 }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        className="w-full relative h-[80vh] sm:h-[90vh] md:h-[70vh] lg:h-[75vh] xl:h-[75vh]"
      >
        {data.length > 0 ? (
          data.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full relative">
                {imageErrors[index] || !slide?.image || !baseImageURL ? (
                  <img
                    src="/images/placeholder.svg"
                    alt={slide?.heading || "Hero Slide"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={`${baseImageURL}/images/${slide.image}`}
                    alt={slide?.heading || "Hero Slide"}
                    fill
                    className="object-cover w-full h-full "
                    onError={() => handleImageError(index)}
                    priority={index === 0}
                    unoptimized
                  />
                )}

                {/* 🔥 Dark overlay */}
                <div className="absolute inset-0  bg-gradient-to-t from-[#00000093] to-transparent z-[5]" />

                {/*  Slide content */}
                <motion.div
                  className="absolute bottom-[10%] left-[5%] right-[5%] text-white z-10 sm:text-center md:text-left "
                  key={`slide-content-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                  {slide.heading && (
                    <h4 className="font-bold uppercase text-justify text-sm md:text-xl lg:text-2xl font-montserrat">
                      {slide.heading}
                    </h4>
                  )}
                  {slide.subHeading && (
                    <h1 className="font-bold uppercase text-justify text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-montserrat leading-snug">
                      {slide.subHeading}
                    </h1>
                  )}
                  {slide.description && (
                    <p className="max-w-[700px] text-justify text-xs sm:text-xs md:text-base mt-2 font-montserrat">
                      {slide.description}
                    </p>
                  )}
                </motion.div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <div className="flex items-center justify-center h-[70vh] text-white">
            No slides available
          </div>
        )}

        {/* Swiper pagination container */}
        <div className="swiper-pagination absolute -top-10 z-[999] flex justify-center items-center gap-[2px] sm:gap-[3px]" />
      </Swiper>
    </div>
  );
}
