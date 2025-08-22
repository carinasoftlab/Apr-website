"use client";

import React, { useState, useCallback, useMemo } from "react";
import { ChevronDown, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OrdersItem = React.memo(({ order, isOpen, onToggle }) => (
  <div className="rounded-2xl p-2 sm:p-4 bg-prime-bg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <button
      className="flex justify-between items-center w-full py-4 sm:py-2 px-4 sm:px-6 text-left text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-200"
      onClick={onToggle}
    >
      <span className="font-semibold text-base sm:text-lg md:text-xl leading-snug">
        {order.title}
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
        {/* Description Section */}
        {/* Table Section */}
        {order.documents && order.documents.length > 0 && (
          <div className="mt-6 px-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white text-gray-900">
                      <th className="px-4 py-3 text-start  text-xs lg:text-sm font-semibold uppercase ">
                        S.No.
                      </th>
                      <th className="px-4 py-3 text-center text-xs lg:text-sm font-semibold uppercase ">
                        Description
                      </th>
                      <th className="px-4 py-3 text-end text-xs lg:text-sm font-semibold uppercase ">
                        Download
                      </th>
                    </tr>
                  </thead>
                  {/* <tbody className="divide-y ">
                    {order.documents.map((doc, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">
                          {doc.description}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() =>
                              window.open(doc.downloadLink, "_blank")
                            }
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody> */}
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
));

const PanchayatOrders = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);

  const orders = useMemo(
    () => [
      {
        title: "Panchayat Bhavan Orders",
        image: "/images/videolink.png",
        description: [
          "Orders related to Panchayat Bhavan construction and maintenance.",
        ],
        documents: [
          {
            description: "Panchayat Bhavan Construction Guidelines",
            downloadLink: "https://example.com/download1.pdf",
          },
          {
            description: "Maintenance and Upkeep Instructions",
            downloadLink: "https://example.com/download2.pdf",
          },
          {
            description: "Safety Protocol Document",
            downloadLink: "https://example.com/download3.pdf",
          },
        ],
      },
      {
        title: "New Scheme Implementation",
        image: "/images/videolink.png",
        description:
          "Circulars and orders for new government schemes implementation.",
        documents: [
          {
            description: "Scheme Implementation Guidelines 2024",
            downloadLink: "https://example.com/scheme1.pdf",
          },
          {
            description: "Beneficiary Selection Criteria",
            downloadLink: "https://example.com/scheme2.pdf",
          },
          {
            description: "Application Process Manual",
            downloadLink: "https://example.com/scheme3.pdf",
          },
          {
            description: "Monitoring and Evaluation Framework",
            downloadLink: "https://example.com/scheme4.pdf",
          },
        ],
      },
      {
        title: "Administrative Orders",
        image: "/images/videolink.png",
        description: "General administrative orders and circulars.",
        documents: [
          {
            description: "Staff Attendance Policy",
            downloadLink: "https://example.com/admin1.pdf",
          },
          {
            description: "Record Keeping Guidelines",
            downloadLink: "https://example.com/admin2.pdf",
          },
        ],
      },
    ],
    []
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = useMemo(
    () => orders.slice(startIndex, startIndex + itemsPerPage),
    [orders, startIndex, itemsPerPage]
  );

  const toggleFaq = useCallback(
    (index) => {
      setOpenIndex(openIndex === index ? null : index);
    },
    [openIndex]
  );

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-prime text-center mb-6 sm:mb-10 leading-snug">
        Orders / Circulars
      </h2>

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
                key={idx}
                order={order}
                isOpen={openIndex === idx}
                onToggle={() => toggleFaq(idx)}
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
    </div>
  );
};

export default PanchayatOrders;
