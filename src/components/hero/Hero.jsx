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
    img: "/images/sliders/slide6.svg",
    title: "Inaugurated by Hon'ble Minister",
    heading: "Shri Ojing Tasing",
    desc: "Shri Ojing Tasing, Hon’ble Minister (RD&PR), inaugurates the Panchayat Learning Centre at Lileng Gram Panchayat, Siang District- launched under RGSA 2023–24 to empower local governance and capacity-building at the grassroots level.",
  },
  {
    img: "/images/sliders/slide1.svg",
    title: "Inaugurated by Hon'ble Minister",
    heading: "Shri Ojing Tasing",
    desc: "The Panchayat Learning Centre at Lileng Gram Panchayat, Siang District was inaugurated on 2nd October 2024 under the Rashtriya Gram Swaraj Abhiyan (RGSA 2023–24). The centre was inaugurated by Shri Ojing Tasing, Hon’ble Minister (RD&PR), Govt. of Arunachal Pradesh, in the presence of local dignitaries and panchayat representatives.",
  },

  {
    img: "/images/sliders/slide4.svg",
    title: "Panchayat Advancement Index 2.0",
    heading: "Hon'ble Chief Minister",
    desc: "Hon'ble Chief Minister Pema Khandu today emphasized the state's unwavering commitment to grassroots democracy, as Arunachal Pradesh hosted a pivotal State Level Workshop on Panchayat Advancement Index (PAI) 2.0, marking a transformative step toward strengthening rural governance.",
  },
  {
    img: "/images/sliders/slide3.svg",
    title: "Panchayat Advancement Index 2.0",
    heading: "Hon'ble Chief Minister",
    desc: "Hon’ble Chief Minister Pema Khandu, alongside key officials and stakeholders, marked a defining moment for grassroots democracy at the State Level Workshop on Panchayat Advancement Index (PAI) 2.0- held as part of Arunachal Pradesh’s ongoing commitment to empowering rural governance and accelerating decentralized development.",
  },

  {
    img: "/images/sliders/slide2.svg",
    title: "Inaugurated by Hon'ble Minister",
    heading: "Shri Ojing Tasing",
    desc: "The Community Assets at Niglok Gram Panchayat were proudly inaugurated on 12th February 2025 under the LSDG Component of SOR Grants FY 2024–25, with a ribbon-cutting ceremony led by Shri Ojing Tasing, Hon’ble Minister, Department of Rural Development & Panchayati Raj",
  },
  {
    img: "/images/sliders/slide5.svg",
    title: "Inaugurated by Hon'ble Minister",
    heading: "Shri Ojing Tasing",
    desc: "The foundation stone for Community Assets at Niglok Gram Panchayat was laid on 12th February 2025 under the LSDG Component of SOR Grants FY 2024–25. The project was initiated by Shri Ojing Tasing, Hon’ble Minister, Department of Rural Development & Panchayati Raj, Govt. of Arunachal Pradesh, in the presence of Shri Ninong Ering, MLA, and Shri Tajing Jonnom, APCS, Director of Panchayat.",
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
        className="w-full relative h-[80vh] sm:h-[90vh] md:h-[70vh] lg:h-[75vh] xl:h-[75vh]"
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
