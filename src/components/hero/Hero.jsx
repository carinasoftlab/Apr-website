"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion"; 
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "./Hero.css";


const slides = [
  {
    img: "/images/slider1.png",
    title: "Swearing-in Ceremony of",
    heading: "Hon’ble Chief Minister",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },

  {
    img: "/images/slider2.png",
    title: "Swearing-in Ceremony of",
    heading: "Hon’ble Chief Minister",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },

  {
    img: "/images/slider3.png",
    title: "Swearing-in Ceremony of",
    heading: "Hon’ble Chief Minister",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },

  {
    img: "/images/slider4.png",
    title: "Swearing-in Ceremony of",
    heading: "Hon’ble Chief Minister",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export default function HeroCarousel() {
  return (
    <div id="home" className="hero-carousel-wrapper">
      
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-slide">
              <Image
                src={slide.img}
                alt={slide.heading}
                layout="fill"
                objectFit="cover"
                priority
              />

              <motion.div
                className="hero-content"
                key={`slide-content-${index}-${Date.now()}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <h4>{slide.title}</h4>
                <h1>{slide.heading}</h1>
                <p>{slide.desc}</p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Below */}
      <div className="custom-pagination-wrapper">
        <div className="custom-pagination"></div>
      </div>
    </div>
  );
}