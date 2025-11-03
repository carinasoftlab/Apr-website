"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Renders a single accordion item for API-provided categories.
 */
function CategoryAccordionItem({ title, subCategories = [], isOpen, onClick }) {
  return (
    <div className="rounded-3xl lg:p-1 lg:px-4 bg-prime-bg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <button
        className="flex justify-between items-center w-full py-6 px-5 sm:px-6 text-left text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900 transition-all duration-200"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.replace(/\s/g, "-").toLowerCase()}`}
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
            aria-labelledby={`accordion-header-${title.replace(/\s/g, "-").toLowerCase()}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden p-2 px-4 lg:p-6 lg:pt-3"
          >
            <div className="p-5 lg:p-6 rounded-3xl bg-white border border-gray-100 dark:border-gray-700 text-sm sm:text-base text-gray-700 dark:text-gray-300 space-y-5">
              {subCategories && subCategories.length ? (
                <div className="space-y-3">
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-800">
                          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                            Sub-Scheme Category
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {subCategories.map((name, idx) => (
                          <tr key={`${name}-${idx}`} className="border-b dark:border-gray-700">
                            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                              {name}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>No sub-categories available.</p>
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

/**
 * API-driven Accordion for SOR categories
 */
export function SchemeSorAccordion({
  selectedDistrict,
  selectedYear,
  categories,
  categoriesLoading,
}) {
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  if (categoriesLoading) {
    return <AccordionSkeleton />;
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="w-full space-y-4 mx-auto dark:bg-gray-900 overflow-hidden">
        <div className="text-center py-6 text-gray-500">No categories found.</div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4 mx-auto dark:bg-gray-900 overflow-hidden">
      {categories.map((cat, idx) => (
        <CategoryAccordionItem
          key={cat.id || cat.category || idx}
          title={cat.category || "Category"}
          subCategories={cat.subCategories || []}
          isOpen={openItem === (cat.id || cat.category || idx)}
          onClick={() => handleToggle(cat.id || cat.category || idx)}
        />
      ))}
    </div>
  );
}
