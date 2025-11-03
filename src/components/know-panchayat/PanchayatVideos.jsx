"use client";

import React, { useState, useCallback } from "react";
import { ChevronDown, Play, X } from "lucide-react";
import { motion } from "framer-motion";
import { useApi } from "@/lib/useApi";

const VIDEOSItem = React.memo(({ videos, isOpen, onToggle, onVideoPlay }) => (
  <div className="rounded-2xl p-2 sm:p-4 bg-prime-bg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <button
      className="flex justify-between items-center w-full py-4 sm:py-2 px-4 sm:px-6 text-left text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100"
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
      style={{ maxHeight: isOpen ? "500px" : "0px", opacity: isOpen ? 1 : 0 }}
    >
      <div className="pb-4 px-4">
        <div className="px-4 py-4 text-gray-700 flex flex-col lg:flex-row lg:gap-16 bg-white rounded-xl text-sm md:text-lg text-justify space-y-4">
          <div className="w-full lg:w-1/2 2xl:w-1/4 mb-4 lg:mb-0">
            <img
              src={
                videos.thumbnail
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/${videos.thumbnail}`
                  : "/images/placeholder.png"
              }
              alt={videos.title || "Video thumbnail"}
              className="w-full  h-30 rounded-lg shadow-md object-contain"
              width={400}   
              height={50} 
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.png";
              }}
            />
          </div>
          <div>
            {videos.description && <p>{videos.description}</p>}

            {videos.youtubeLink && (
              <div className="mt-4 flex justify-start">
                <button
                  onClick={() => onVideoPlay(videos.youtubeLink)}
                  className="inline-flex items-center px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-green-700 to-green-800 rounded-full shadow-lg transform hover:scale-105 transition-all"
                >
                  <Play className="w-4 h-4 mr-2" />
                  <span>Watch Video</span>
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
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  //  Fetch all videos
  const {
    data: videoData,
    loading,
    error,
  } = useApi("/panchayatVideos", "GET");

  const items = videoData?.data || [];

  const toggleFaq = useCallback(
    (index) => {
      setOpenIndex(openIndex === index ? null : index);
    },
    [openIndex]
  );

  //  Extract YouTube video id from a variety of URL formats
  const extractYouTubeId = (input) => {
    if (!input) return "";
    const raw = String(input).trim();
    // If it's already a plain ID (11 chars typical), accept alphanumeric-_ only
    if (/^[a-zA-Z0-9_-]{10,}$/.test(raw) && !/^https?:/i.test(raw)) return raw;
    try {
      const u = new URL(raw);
      const host = u.hostname.replace(/^www\./, "");
      if ((host === "youtube.com" || host === "m.youtube.com") && u.pathname === "/watch") {
        return u.searchParams.get("v") || "";
      }
      if ((host === "youtube.com" || host === "m.youtube.com") && u.pathname.startsWith("/shorts/")) {
        return u.pathname.split("/")[2] || "";
      }
      if (host === "youtu.be") {
        return u.pathname.slice(1) || "";
      }
      if (host === "youtube.com" && u.pathname.startsWith("/embed/")) {
        return u.pathname.split("/")[2] || "";
      }
      // Fallback regex
      const m = raw.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
      if (m && m[1]) return m[1];
      return "";
    } catch {
      return "";
    }
  };

  //  Build privacy-friendly embed URL
  const toEmbedUrl = (videoId) =>
    videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
      : "";

  const handleVideoPlay = (videoUrl) => {
    const id = extractYouTubeId(videoUrl);
    const embed = toEmbedUrl(id);
    if (embed) {
      setCurrentVideoUrl(embed);
      setVideoModalOpen(true);
    }
  };

  const handleCloseVideo = () => {
    setVideoModalOpen(false);
    setCurrentVideoUrl("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-prime text-center mb-6 sm:mb-10">
        Panchayat Videos
      </h2>

      {loading && (
        <div className="w-full flex flex-col gap-4 items-center">
          {/* Skeleton card 1 */}
          <div className="w-full max-w-full rounded-lg bg-gray-200 animate-pulse h-20" />

          {/* Skeleton card 2 */}
          <div className="w-full max-w-full rounded-lg bg-gray-200 animate-pulse h-20" />

          {/* Skeleton card 3 */}
          <div className="w-full max-w-full rounded-lg bg-gray-200 animate-pulse h-20" />

          {/* Skeleton card 4 */}
          <div className="w-full max-w-full rounded-lg bg-gray-200 animate-pulse h-20" />
        </div>
      )}
      {error && (
        <p className="text-center text-red-500">Failed to load videos.</p>
      )}
      {!loading && !error && items.length === 0 && (
        <p className="text-center text-gray-500">No videos available.</p>
      )}

      <div className="space-y-3">
        {items.map((videos, idx) => (
          <VIDEOSItem
            key={videos._id}
            videos={videos}
            isOpen={openIndex === idx}
            onToggle={() => toggleFaq(idx)}
            onVideoPlay={handleVideoPlay}
          />
        ))}
      </div>

      {videoModalOpen && currentVideoUrl && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl"
          >
            <button
              onClick={handleCloseVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>

            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                key={currentVideoUrl}
                src={currentVideoUrl}
                title="Video Player"
                className="absolute inset-0 w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
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
