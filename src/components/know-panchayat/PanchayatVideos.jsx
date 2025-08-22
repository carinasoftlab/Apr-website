"use client";

import React, { useState, useCallback, useMemo } from "react";
import { ChevronDown, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const VIDEOSItem = React.memo(({ videos, isOpen, onToggle, onVideoPlay }) => (
  <div className="rounded-2xl p-2 sm:p-4 bg-prime-bg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <button
      className="flex justify-between items-center w-full py-4 sm:py-2 px-4 sm:px-6 text-left text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-200"
      onClick={onToggle}
    >
      <span className="font-semibold text-base sm:text-lg md:text-xl leading-snug">
        {videos.title}
      </span>
      <ChevronDown
        className={`transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    <div
      className="transition-all duration-500 ease-in-out overflow-hidden"
      style={{
        maxHeight: isOpen ? "500px" : "0px",
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="pb-4 px-4">
        {/* Description Section */}
        <div className="px-4 py-4 text-gray-700 flex flex-col lg:flex-row lg:gap-16 bg-white rounded-xl text-sm md:text-lg text-justify space-y-4">
          {videos.image && (
            <div className="w-full lg:w-1/2 2xl:w-1/3 mb-4 lg:mb-0">
              <img
                src={videos.image}
                alt={videos.title}
                className="w-full h-30 rounded-lg shadow-md object-cover"
              />
            </div>
          )}
          <div>
            {videos.description && (
              <div>
                {Array.isArray(videos.description) ? (
                  <ul className="px-4 space-y-2">
                    {videos.description.map((point, i) => (
                      <li key={`desc-${i}`}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{videos.description}</p>
                )}
              </div>
            )}

            {/* Watch Video Button */}
            {videos.videoLink && (
              <div className="mt-4 flex justify-start">
                <button
                  onClick={() => onVideoPlay(videos.videoLink)}
                  className=" relative inline-flex items-center justify-center px-3 py-2 text-base font-medium text-white hover:text-white bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 rounded-full shadow-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out "
                >
                  <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="relative">Watch Video</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
));

const PanchayatVideos = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const videos = useMemo(
    () => [
      {
        title: "Panchayat Bhavan inaugurated",
        image: "/images/videolink.png",
        description: [
          "The newly constructed Panchayat Bhavan was formally inaugurated to serve as the central hub for village-level administration and governance.",
        ],
        videoLink: "https://www.youtube.com/watch?v=sNkLc7XHiYk",
      },
      // {
      //   title: "New Scheme Launch",
      //   image: "/images/videolink.png",
      //   description:
      //     "The newly constructed Panchayat Bhavan was formally inaugurated to serve as the central hub for village-level administration and governance.",
      //   videoLink: "https://www.youtube.com/watch?v=sNkLc7XHiYk", // also works with short links
      // },
    ],
    []
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(videos.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVideos = useMemo(
    () => videos.slice(startIndex, startIndex + itemsPerPage),
    [videos, startIndex, itemsPerPage]
  );

  const toggleFaq = useCallback(
    (index) => {
      setOpenIndex(openIndex === index ? null : index);
    },
    [openIndex]
  );

  // Convert YouTube watch or short URL to embed URL
  const convertToEmbedUrl = (url) => {
    try {
      const yt = new URL(url);
      if (yt.hostname.includes("youtube.com") && yt.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${yt.searchParams.get(
          "v"
        )}?autoplay=1`;
      }
      if (yt.hostname.includes("youtu.be")) {
        const id = yt.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      }
    } catch (e) {
      return url;
    }
    return url;
  };

  const handleVideoPlay = (videoUrl) => {
    const embedUrl = convertToEmbedUrl(videoUrl);
    setCurrentVideoUrl(embedUrl);
    setVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setVideoModalOpen(false);
    setCurrentVideoUrl("");
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-prime text-center mb-6 sm:mb-10 leading-snug">
        Panchayat Videos
      </h2>

      {/* Accordion List */}
      <div className="relative min-h-[300px] sm:min-h-[300px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="space-y-3"
          >
            {currentVideos.map((videos, idx) => (
              <VIDEOSItem
                key={idx}
                videos={videos}
                isOpen={openIndex === idx}
                onToggle={() => toggleFaq(idx)}
                onVideoPlay={handleVideoPlay}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 lg:-right-12 text-white hover:text-gray-300 transition-colors duration-200 z-10 p-2"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video Container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src={currentVideoUrl}
                title="Video Player"
                className="absolute inset-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PanchayatVideos;
