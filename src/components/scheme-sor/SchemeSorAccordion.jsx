"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SCHEME_SOR_DATA } from "@/constants/scheme-sor.data";
import Image from "next/image";

/**
 * Renders a single accordion item.
 * @param {object} props - Component props.
 * @param {string} props.title - The title of the accordion item (for header).
 * @param {string} props.mainTitle - The main title inside the accordion content.
 * @param {string} props.description - The descriptive text inside the accordion content.
 * @param {string} props.image1Url - URL for the first image.
 * @param {string} props.image2Url - URL for the second image.
 * @param {string} props.address - Address information.
 * @param {string} props.villageName - Village name information.
 * @param {string} props.date - Date information.
 * @param {string} props.pinCode - Pin code information.
 * @param {boolean} props.isOpen - Whether the accordion item is open.
 * @param {() => void} props.onClick - Callback function when the item is clicked.
 */
function AccordionItem({
  title,
  mainTitle,
  description,
  image1Url,
  image2Url,
  address,
  villageName,
  date,
  pinCode,
  isOpen,
  onClick,
}) {
  return (
    <div className="rounded-3xl lg:p-1 lg:px-4 bg-prime-bg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <button
        className="flex justify-between items-center w-full py-6 px-5 sm:px-6 text-left text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 transition-all duration-200"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title
          .replace(/\s/g, "-")
          .toLowerCase()}`}
        id={`accordion-header-${title.replace(/\s/g, "-").toLowerCase()}`}
      >
        <span className="font-bold text-base md:text-lg">{title}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400 transition-colors duration-200" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`accordion-content-${title.replace(/\s/g, "-").toLowerCase()}`}
            role="region"
            aria-labelledby={`accordion-header-${title
              .replace(/\s/g, "-")
              .toLowerCase()}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden p-2 px-4 lg:p-6 lg:pt-3"
          >
            <div className="p-5 lg:p-6  rounded-3xl bg-white border border-gray-100 dark:border-gray-700 text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-5">
              <h2 className="text-sm  sm:text-xl font-bold text-prime dark:text-green-400">
                {mainTitle}
              </h2>
              <p className="leading-relaxed text-xs lg:text-base">{description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {image1Url && (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden  hover:shadow-lg transition-shadow duration-300 group">
                    <Image
                      src={image1Url}
                      alt="Building exterior"
                      fill
                      className="rounded-3xl transition-transform duration-300 object-cover"
                    />
                  </div>
                )}
                {image2Url && (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden  hover:shadow-lg transition-shadow duration-300 group">
                    <Image
                      src={image2Url}
                      alt="Inauguration plaque"
                      fill
                      className="rounded-3xl transition-transform duration-300 object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm lg:mt-3">
                <div className="flex  items-center space-x-2">
                  <span className="font-semibold text-xs lg:text-base text-gray-800 dark:text-gray-200">
                    Address:
                  </span>
                  <span className="text-gray-600 text-[10px] lg:text-base dark:text-gray-400">
                    {address}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-xs lg:text-base text-gray-800 dark:text-gray-200">
                    Village Name:
                  </span>
                  <span className="text-gray-600 text-[10px] lg:text-base dark:text-gray-400">
                    {villageName}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-xs lg:text-base text-gray-800 dark:text-gray-200">
                    Date:
                  </span>
                  <span className="text-gray-600 text-[10px] lg:text-base dark:text-gray-400">
                    {date}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-xs lg:text-base text-gray-800 dark:text-gray-200">
                    Pin Code:
                  </span>
                  <span className="text-gray-600 text-[10px] lg:text-base dark:text-gray-400">
                    {pinCode}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Renders a loading skeleton for the accordion.
 */
function AccordionSkeleton() {
  return (
    <div className="w-full space-y-2 mx-auto dark:bg-gray-900 rounded-3xl overflow-hidden">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl h-16 bg-prime-bg px-4 flex items-center justify-between animate-pulse transition-colors duration-200"
        >
          <div className="h-6 w-1/3 bg-white rounded-md"></div>
          <div className="h-6 w-10 bg-white rounded-md"></div>
        </div>
      ))}
    </div>
  );
}

export function Skeleton({ className }) {
  return (
    <div className={`bg-gray-300 dark:bg-white/10 rounded-md animate-pulse ${className || ''}`} />
  );
}

/**
 * Main Accordion component for Scheme of Arrangement (SoR) data.
 * Displays a list of questions and answers in an expandable format.
 */
export function SchemeSorAccordion() {
  const [openItem, setOpenItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setData(SCHEME_SOR_DATA);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  if (isLoading) {
    return <AccordionSkeleton />;
  }

  return (
    <div className="w-full space-y-4 mx-auto dark:bg-gray-900 rounded-3xl overflow-hidden">
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          mainTitle={item.mainTitle}
          description={item.description}
          image1Url={item.image1Url}
          image2Url={item.image2Url}
          address={item.address}
          villageName={item.villageName}
          date={item.date}
          pinCode={item.pinCode}
          isOpen={openItem === item.id}
          onClick={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
