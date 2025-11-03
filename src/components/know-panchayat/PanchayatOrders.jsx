"use client";

import React, { useState, useCallback, useMemo } from "react";
import { ChevronDown, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useApi } from "@/lib/useApi";

const OrdersItem = React.memo(
  ({ order, isOpen, onToggle, resolveDocumentUrl }) => (
    <div className="rounded-2xl p-2 sm:p-4 bg-prime-bg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <button
        className="flex justify-between items-center w-full py-4 sm:py-2 px-4 sm:px-6 text-left text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 focus:outline-none transition-all duration-200"
        onClick={onToggle}
      >
        <span className="font-semibold text-base sm:text-lg md:text-xl leading-snug">
          {order.name}
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
          maxHeight: isOpen ? "800px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="pb-4 px-4">
          {order.docs && order.docs.length > 0 && (
            <div className="mt-4">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full border rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-100 text-gray-900">
                        <th className="px-4 py-3 text-left text-xs lg:text-sm font-semibold uppercase">
                          S.No.
                        </th>
                        <th className="px-4 py-3 text-center text-xs lg:text-sm font-semibold uppercase">
                          Description
                        </th>
                        <th className="px-4 py-3 text-right text-xs lg:text-sm font-semibold uppercase">
                          Download
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.docs.map((doc, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-4 py-3 text-sm text-gray-900 font-medium text-left">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700 text-center truncate">
                            {order.description}
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <button
                              onClick={() => {
                                const url = resolveDocumentUrl(doc);
                                if (url) window.open(url, "_blank");
                              }}
                              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              <FileText className="w-4 h-4" />
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
);

const PanchayatOrders = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);

  const { data, loading, error } = useApi("/circulars", "GET");
  const orders = data?.data || [];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = useMemo(
    () => orders.slice(startIndex, startIndex + itemsPerPage),
    [orders, startIndex, itemsPerPage]
  );

  const toggleFaq = useCallback(
    (index) => setOpenIndex(openIndex === index ? null : index),
    [openIndex]
  );

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  // Build base document URL safely
  const baseDocumentURL = useMemo(() => {
    const envDoc = (process.env.NEXT_PUBLIC_DOC_URL || process.env.NEXT_PUBLIC_DOCUMENT_URL || "").replace(/\/$/, "");
    if (envDoc) return envDoc;
    const apiBase = (process.env.NEXT_PUBLIC_IMAGE_URL || "").replace(/\/$/, "");
    if (!apiBase) return "";
    return apiBase.replace(/\/uploads\/images\/?$/i, "/uploads/documents");
  }, []);

  const resolveDocumentUrl = useCallback(
    (doc) => {
      if (!doc) return "";
      const str = String(doc).trim();
      if (/^https?:\/\//i.test(str)) return str;
      const base = baseDocumentURL;
      if (!base) return str; // last resort
      const hasUploads = /\/uploads\/(documents|images)\/?$/i.test(base);
      const prefix = hasUploads ? base : `${base}/documents`;
      return `${prefix}/${encodeURI(str)}`;
    },
    [baseDocumentURL]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-prime text-center mb-6 sm:mb-10 leading-snug">
        Orders / Circulars
      </h2>

      {loading ? (
        // Skeleton Loader
        <div className="w-full flex flex-col gap-4 items-center py-10">
          {[1, 2, 3, 4, 5, 6].map((_, idx) => (
            <div
              key={idx}
              className="w-full max-w-full rounded-2xl bg-gray-200 animate-pulse h-20 sm:h-20"
            />
          ))}
        </div>
      ) : error ? (
        <p className="text-center py-10 text-red-500">Failed to load data</p>
      ) : (
        <>
          {/* Accordion List */}
          <div className="relative min-h-[300px] sm:min-h-[450px]">
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
                {currentOrders.map((order, idx) => (
                  <OrdersItem
                    key={order._id}
                    order={order}
                    isOpen={openIndex === idx}
                    onToggle={() => toggleFaq(idx)}
                    resolveDocumentUrl={resolveDocumentUrl}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => {
                  if (currentPage > 1) {
                    setDirection(-1);
                    setCurrentPage(currentPage - 1);
                    setOpenIndex(null);
                  }
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Previous
              </button>

              <span className="px-4 py-2 text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => {
                  if (currentPage < totalPages) {
                    setDirection(1);
                    setCurrentPage(currentPage + 1);
                    setOpenIndex(null);
                  }
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PanchayatOrders;
