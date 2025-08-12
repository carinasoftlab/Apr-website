"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";

const slides = [
  {
    img: "/images/slider1.png",
    title: "Swearing-in Ceremony of",
    heading: "Hon'ble Chief Minister",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/images/slider2.png",
    title: "Swearing-in Ceremony of",
    heading: "Hon'ble Chief Minister",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/images/slider3.png",
    title: "Swearing-in Ceremony of",
    heading: "Hon'ble Chief Minister",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    img: "/images/slider4.png",
    title: "Swearing-in Ceremony of",
    heading: "Hon'ble Chief Minister",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export default function HeroCarousel() {
  return (
    <div id="home" className="flex flex-col items-center relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        className="w-full relative h-[80vh] sm:h-[90vh] md:h-[70vh] lg:h-[70vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
              <Image
                src={slide.img}
                alt={slide.heading}
                fill
                className="object-cover w-full h-full"
                priority
              />

              <motion.div
                className="absolute bottom-[10%] left-[5%] right-[5%] text-white z-10 sm:text-center md:text-left"
                key={`slide-content-${index}-${Date.now()}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <h4 className="font-bold uppercase text-justify text-base sm:text-lg md:text-xl lg:text-2xl font-montserrat">
                  {slide.title}
                </h4>
                <h1 className="font-bold uppercase text-justify text-xl sm:text-2xl md:text-3xl lg:text-5xl font-montserrat leading-snug">
                  {slide.heading}
                </h1>
                <p className="max-w-[700px] text-justify text-xs sm:text-xs md:text-base mt-2 font-montserrat">
                  {slide.desc}
                </p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}

        {/* Swiper pagination container */}
        <div className="swiper-pagination absolute -top-10 z-[999] flex justify-center items-center gap-[2px] sm:gap-[3px]" />
      </Swiper>
    </div>
  );
}
