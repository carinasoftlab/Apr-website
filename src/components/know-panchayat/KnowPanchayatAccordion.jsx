"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PanchayatVideos } from "./PanchayatVideos";

/**
 * Single accordion item
 */
function AccordionItem({ title, districtData, isOpen, onClick }) {
  return (
    <div className="rounded-3xl bg-prime-bg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <button
        className="flex justify-between items-center w-full py-6 px-5 sm:px-6 text-left text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-bold text-base md:text-lg">{title}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && districtData && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden p-4 lg:p-6"
          >
            <div className="space-y-6 bg-gradient-to-t from-prime-bg to-white dark:bg-gray-800 rounded-3xl p-5 border border-gray-100 dark:border-gray-700">
              {districtData.ZillaParishadSegment && (
                <div>
                  {/* <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {districtData.ZillaParishadSegment}
                  </h3> */}
                  {districtData.ZillaParishadData?.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {districtData.ZillaParishadData.map((segment) =>
                        segment.schemeName?.map((scheme, idx) => (
                          <li
                            key={`zilla-${segment.id}-${idx}`}
                            className="text-gray-700 dark:text-gray-300"
                          >
                            {scheme}
                          </li>
                        ))
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      No schemes available
                    </p>
                  )}
                </div>
              )}

              {districtData.GramPanchayatSegment && (
                <div>
                  <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {districtData.GramPanchayatSegment}
                  </h3>
                  {districtData.GramPanchayatData?.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {districtData.GramPanchayatData.map((segment) =>
                        segment.schemeName?.map((scheme, idx) => (
                          <li
                            key={`gram-${segment.id}-${idx}`}
                            className="text-gray-700 dark:text-gray-300"
                          >
                            {scheme}
                          </li>
                        ))
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      No schemes available
                    </p>
                  )}
                </div>
              )}

              {!districtData.ZillaParishadSegment &&
                !districtData.GramPanchayatSegment && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">
                      No data available for this district
                    </p>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Accordion wrapper
 */
export default function KnowPanchayatAccordion({ data }) {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

<PanchayatVideos />

  return (
    <div className="w-full space-y-4 mx-auto overflow-hidden">
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          districtData={item}
          title={item.districtName || "Unknown District"}
          isOpen={openItem === item.id}
          onClick={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
