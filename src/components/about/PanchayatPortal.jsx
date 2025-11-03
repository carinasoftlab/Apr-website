"use client";

import Image from "next/image";
import { PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useApi } from "@/lib/useApi";
import "./About.css";

export default function PanchayatPortal({ data, loading, error }) {
  // Panchayat Videos API
  const {
    data: videoData,
    loading: videoLoading,
    error: videoError,
  } = useApi("/panchayatVideos", "GET");

  console.log("check data", data);
  

  const videos = videoData?.data || [];
  const baseImageURL = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "");

  // Limit videos to 4
  const videosToShow = videos.slice(0, 4);

  // Circulars API
  const {
    data: circularData,
    loading: circularLoading,
    error: circularError,
  } = useApi("/circulars", "GET");

  const circulars = circularData?.data || [];
  const circularsToShow = circulars.slice(0, 4);

  // ✅ Safe thumbnail resolver
  const getThumbnailUrl = (thumbnail) => {
    if (!thumbnail || thumbnail.trim() === "") {
      return "/images/videolink.png"; // fallback in /public/images
    }
    if (thumbnail.startsWith("http")) return thumbnail; // already a URL
    return `${baseImageURL}/${thumbnail.replace(/^\/+/, "")}`;
  };

  // ✅ Skeleton card
  const SkeletonCard = () => (
    <div className="bg-white flex flex-col md:flex-row items-center rounded-3xl w-full gap-5 md:gap-8 p-4 animate-pulse">
      <div className="bg-gray-300 rounded-3xl w-full md:w-1/3 h-32 md:h-24" />
      <div className="flex flex-col gap-2.5 w-full md:w-2/3">
        <div className="bg-gray-300 h-5 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-4 w-full rounded"></div>
        <div className="bg-gray-300 h-4 w-5/6 rounded"></div>
      </div>
    </div>
  );

  return (
    <section id="about">
      <div className="portal-wrapper lg:pb-10 xl:pb-16 2xl:pb-20 p-4 md:p-8">
        {/* Heading */}
        <div>
          {loading ? (
            <div className="text-center">
              <div className="h-8 md:h-12 lg:h-16 2xl:h-20 w-64 md:w-80 lg:w-96 2xl:w-[28rem] bg-gray-300 rounded animate-pulse mx-auto mb-4"></div>
              <div className="max-w-7xl mx-auto px-4">
                <div className="space-y-2">
                  <div className="h-4 md:h-5 lg:h-6 w-full bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 md:h-5 lg:h-6 w-5/6 bg-gray-300 rounded animate-pulse mx-auto"></div>
                  <div className="h-4 md:h-5 lg:h-6 w-4/6 bg-gray-300 rounded animate-pulse mx-auto"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-[3.3rem] text-center font-bold text-[#2B2B2B] mb-4">
                {data?.heading || ""}
              </h1>
              <div className="max-w-7xl mx-auto px-4">
                <p className="text-base md:text-lg lg:text-xl 2xl:leading-8 text-center text-[#555555] mb-8 2xl:mb-10">
                  {data?.description || ""}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Grid */}
        <div className="portal-grid">
          {/* Left Column: Panchayat Videos */}
          <div className="relative bg-prime-bg rounded-4xl p-7 pt-0 max-h-[50vh] lg:max-h-[60vh] w-full overflow-y-auto custom-scrollbar">
            <div className="bg-prime-bg sticky top-0 z-10 pb-6 lg:pb-9 w-full pt-8 items-center">
              <Link
                href="/know-panchayat?tab=panchayat-videos"
                className="bg-olive relative rounded-[19px] flex items-center justify-center py-5 text-white text-center font-semibold text-lg xl:text-xl mb-6 hover:bg-olive/90 transition"
              >
                <p className="mx-auto">Panchayat Videos</p>
                <p className="absolute right-4 text-4xl top-3">›</p>
              </Link>
            </div>

            <div className="card-list flex flex-col gap-4">
              {videoLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              {videoError && (
                <p className="text-center text-red-500">
                  Failed to load videos
                </p>
              )}

              {!videoLoading &&
                !videoError &&
                videosToShow.map((video, index) => (
                  <div
                    key={video._id || index}
                    className="bg-white flex 2xl:py-4 flex-col md:px-4 md:flex-row items-center rounded-3xl w-full gap-5 md:gap-8 lg:gap-2"
                  >
                    {/* Thumbnail */}
                    <div className="video-thumbnail relative rounded-3xl overflow-hidden mt-4 md:mt-0 px-3 md:px-0">
                      <Image
                        src={getThumbnailUrl(video.thumbnail)}
                        alt={video.title || "Panchayat Video"}
                        width={300}
                        height={180}
                        className="object-contain w-full h-full rounded-3xl md:rounded-2xl"
                        unoptimized
                        onError={(e) => {
                          e.currentTarget.src = "/images/placeholder.png";
                        }}  />
                      <div className="video-overlay absolute inset-0 flex items-center justify-center">
                        <Link
                          href="/know-panchayat?tab=panchayat-videos"
                          className="flex items-center justify-center"
                        >
                          <PlayCircle className="icon-white w-10 h-10" />
                        </Link>
                      </div>
                    </div>

                    {/* Video Content */}
                    <div className="card-content-1 flex flex-col gap-2.5 px-6 mb-6 md:mt-6">
                      <h3 className="text-prime font-semibold text-base md:text-lg 2xl:text-xl">
                        {video.title}
                      </h3>
                      <p className="text-xs md:text-sm lg:text-base text-[#555555] leading-5 font-medium">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Column: Orders / Circulars */}
          <div className="relative bg-prime-bg rounded-4xl p-7 pt-0 max-h-[50vh] lg:max-h-[60vh] w-full overflow-y-auto custom-scrollbar">
            <div className="bg-prime-bg sticky top-0 z-10 pb-6 lg:pb-9 w-full pt-8 items-center">
              <Link
                href="/know-panchayat?tab=orders-circulars"
                className="bg-second relative rounded-[19px] flex items-center justify-center py-5 text-white text-center font-semibold text-lg xl:text-xl mb-6 hover:bg-second/90 transition"
              >
                <p className="mx-auto">Orders / Circulars</p>
                <p className="absolute right-4 text-4xl top-3">›</p>
              </Link>
            </div>

            <div className="card-list flex flex-col gap-4">
              {circularLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              {circularError && (
                <p className="text-center text-red-500">
                  Failed to load circulars
                </p>
              )}

              {!circularLoading &&
                !circularError &&
                circularsToShow.map((circular, index) => (
                  <div
                    key={circular._id || index}
                    className="text-card flex flex-col gap-2.5 py-7 px-6 rounded-3xl"
                  >
                    <h3 className="text-prime font-semibold text-base md:text-lg 2xl:text-xl">
                      {circular.title}
                    </h3>
                    <p className="text-xs md:text-sm lg:text-base text-[#555555] leading-5 font-medium">
                      {circular.description}
                    </p>
                    <Link
                      href="/know-panchayat?tab=orders-circulars"
                      className="text-prime font-medium text-xs md:text-sm lg:text-base flex items-center gap-1"
                    >
                      Read More <ArrowRight className="font-medium" />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
