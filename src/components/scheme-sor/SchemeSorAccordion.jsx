"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  SCHEME_SOR_DATA,
  SCHEME_UNDER_SOR_DATA,
} from "@/constants/scheme-sor.data";

/**
 * Renders a single accordion item.
 */
function AccordionItem({ title, districtData, isOpen, onClick }) {
  const districtSchemeData = SCHEME_UNDER_SOR_DATA.find(
    (district) => district.districtName === title
  );

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
          transition={{ duration: 0.5, ease: "easeInOut" }}
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
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden p-2 px-4 lg:p-6 lg:pt-3"
          >
            <div className="p-5 lg:p-6 rounded-3xl bg-white border border-gray-100 dark:border-gray-700 text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-5">
              {districtSchemeData ? (
                <div className="space-y-6">
                  {/* Zilla Parishad Table */}
                  {districtSchemeData.ZillaParishadSegment && (
                    <div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                          <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800 rounded-lg justify-between">
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Scheme Name
                              </th>
                              {/* <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Complition Date
                              </th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {districtSchemeData.ZillaParishadData &&
                              districtSchemeData.ZillaParishadData.map(
                                (segment) => (
                                  <tr
                                    key={segment.id}
                                    className="border-b dark:border-gray-700"
                                  >
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                      {segment.schemeName ? (
                                        <ul className="list-disc pl-5 space-y-1">
                                          {/* Always render schemeName */}
                                          <li>{segment.schemeName}</li>

                                          {/* Render locations if present */}
                                          {segment.locations &&
                                            segment.locations.length > 0 && (
                                              <ul className="list-disc pl-8 space-y-1">
                                                {segment.locations.map(
                                                  (location, locIdx) => (
                                                    <li key={locIdx}>
                                                      {location}
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            )}
                                        </ul>
                                      ) : (
                                        "No schemes available"
                                      )}
                                    </td>
                                    {/* <td className="px-4 py-3 text-center align-middle text-sm text-gray-700 dark:text-gray-300">
                                      {segment.complitionDate || "N/A"}
                                    </td> */}
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Gram Panchayat Table */}
                  {districtSchemeData.GramPanchayatSegment && (
                    <div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                          <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                Scheme Name
                              </th>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                                End Date
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {districtSchemeData.GramPanchayatData &&
                              districtSchemeData.GramPanchayatData.map(
                                (segment) => (
                                  <tr
                                    key={segment.id}
                                    className="border-b dark:border-gray-700"
                                  >
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                      {segment.schemeName &&
                                      segment.schemeName.length > 0 ? (
                                        <ul className="list-disc pl-5 space-y-1">
                                          {segment.schemeName.map(
                                            (scheme, idx) => (
                                              <li key={idx}>{scheme}</li>
                                            )
                                          )}
                                        </ul>
                                      ) : (
                                        "No schemes available"
                                      )}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                                      {segment.endDate || "N/A"}
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>No scheme data available for this district.</p>
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
    <div
      className={`bg-gray-300 dark:bg-white/10 rounded-md animate-pulse ${
        className || ""
      }`}
    />
  );
}

/**
 * Main Accordion component for Scheme of Arrangement (SoR) data.
 */
export function SchemeSorAccordion({
  selectedDistrict,
  selectedYear,
  data = SCHEME_SOR_DATA,
}) {
  const [openItem, setOpenItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const districts = SCHEME_UNDER_SOR_DATA.map((district) => ({
      id: district.id.toString(),
      title: district.districtName,
    }));
    setDistrictData(districts);
  }, []);

  const handleToggle = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  if (isLoading) {
    return <AccordionSkeleton />;
  }

  return (
    <div className="w-full space-y-4 mx-auto dark:bg-gray-900 overflow-hidden">
      {districtData.map((item) => (
        <AccordionItem
          key={item.id}
          districtData={SCHEME_UNDER_SOR_DATA.find(
            (d) => d.id.toString() === item.id
          )}
          title={item.title}
          isOpen={openItem === item.id}
          onClick={() => handleToggle(item.id)}
        />
      ))}
    </div>
  );
}
