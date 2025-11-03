"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function FloatingDownloadButton() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const downloadLinks = {
    android: "https://play.google.com/store/apps/details?id=in.gov.mospi.goistats&hl=en_IN",
    ios: "https://apps.apple.com/ro/app/goistats/id6751703789"
  };

  const handleDownload = (platform) => {
    window.open(downloadLinks[platform], "_blank");
    setIsOpen(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Download App"
      >
        <Image
          src="/images/goistats.png"
          alt="Download GoiStats App"
          width={64}
          height={64}
          className="w-full h-full object-cover"
        />
      </motion.button>

      {/* Download Options */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/10 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 bottom-full mb-4 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[200px] z-50"
            >
              {/* Android Option */}
              <button
                onClick={() => handleDownload("android")}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
              >
                <div className="w-8 h-8 bg-[#3CAD26] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.6818 12 7.6818s-3.5902.5621-5.1367 1.6649L4.841 5.8437a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900 font-montserrat">Android</div>
                  <div className="text-xs text-gray-500 font-montserrat">Google Play</div>
                </div>
              </button>

              {/* iOS Option */}
              <button
                onClick={() => handleDownload("ios")}
                className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.79 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.96-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.03-3.11z" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900 font-montserrat">iOS</div>
                  <div className="text-xs text-gray-500 font-montserrat">App Store</div>
                </div>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
