"use client";

import React, { useState, useCallback, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQItem = React.memo(({ faq, isOpen, onToggle }) => (
  <div className="rounded-2xl p-2 sm:p-4 bg-prime-bg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <button
      className="flex justify-between items-center w-full py-4 sm:py-2 px-4 sm:px-6 text-left text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-all duration-200"
      onClick={onToggle}
    >
      <span className="font-semibold text-base sm:text-lg md:text-xl leading-snug">
        {faq.question}
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
        <div className="px-4 py-4 text-gray-700 bg-white rounded-xl text-sm  md:text-lg text-justify">
          {Array.isArray(faq.answer) ? (
            <ul className="list-disc px-4 space-y-2">
              {faq.answer.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          ) : (
            faq.answer
          )}
        </div>
      </div>
    </div>
  </div>
));

const FCGrandsFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(0);

 const faqs = useMemo(
   () => [
     {
       question: "What is the 15th Finance Commission (15th FC)?",
       answer: [
         "The 15th FC is a constitutional body constituted under Article 280 of the Constitution of India.",
         "It is tasked with recommending the distribution of tax revenues between the Centre and the States, and among the States themselves, for the period 2020–2026.",
       ],
     },
     {
       question: "What is the period covered by the 15th FC recommendations?",
       answer: [
         "Initially from 2020-21 to 2024-25.",
         "Due to a one-year interim report, the final recommendations cover 2021-22 to 2025-26.",
       ],
     },
     {
       question:
         "What is the total grant recommended for Rural Local Bodies (RLBs) under 15th FC?",
       answer: [
         "₹2,36,805 crore for Rural Local Bodies (RLBs).",
         "₹70,051 crore for Urban Local Bodies (ULBs).",
         "Totaling ₹3,06,856 crore for all local bodies over five years.",
       ],
     },
     {
       question:
         "How much grant is earmarked for Arunachal Pradesh under 15th FC?",
       answer: [
         "Approximately ₹1,731.60 crore was allocated to PRIs in Arunachal Pradesh for the period 2020–25.",
         "This includes various components such as Tied and Untied Grants.",
       ],
     },
     {
       question: "What are Tied and Untied Grants?",
       answer: [
         "Tied Grants must be used for specific purposes like drinking water, sanitation, and solid waste management.",
         "Untied Grants can be used for any priority development works as per local needs.",
       ],
     },
     {
       question: "What is the ratio of Tied to Untied Grants?",
       answer: [
         "The 15th FC recommended a 60:40 split:",
         "60% Tied Grants.",
         "40% Untied Grants.",
       ],
     },
     {
       question:
         "What are the eligibility criteria for availing 15th FC grants by PRIs?",
       answer: [
         "Constitute a State Finance Commission (SFC) every 5 years.",
         "Transfer funds to PRIs as per SFC recommendations.",
         "Maintain online audited accounts.",
         "Upload Local Government Directory (LGD) data.",
         "Use eGramSwaraj and PFMS portals for fund tracking.",
       ],
     },
     {
       question: "How are grants released by the Union Government?",
       answer: [
         "The Union Ministry of Finance releases grants in two equal installments annually.",
         "Release is subject to fulfillment of performance-based conditions and online compliance.",
       ],
     },
     {
       question: "What is the role of PFMS in 15th FC grant implementation?",
       answer: [
         "All grants are routed through the Public Financial Management System (PFMS).",
         "Direct transfer to PRIs’ accounts.",
         "Real-time fund tracking.",
         "Ensuring transparency.",
       ],
     },
     {
       question: "What is the role of eGramSwaraj portal?",
       answer: [
         "Monitoring and reporting for Action Plan preparation.",
         "Tracking project progress.",
         "Asset geo-tagging.",
         "Financial tracking.",
         "Uploading approved plans and UC details on eGramSwaraj is mandatory for release of subsequent installments.",
       ],
     },
     {
       question: "What kinds of works can be taken up under 15th FC Grants?",
       answer: [
         "Tied: Water harvesting, soak pits, toilets, waste management.",
         "Untied: Roads, culverts, community halls, school repairs, etc., as per GP resolution.",
       ],
     },
     {
       question: "Can 15th FC funds be used for salary/honorarium payments?",
       answer: [
         "No, 15th FC grants are developmental in nature.",
         "They cannot be used for salary payments, pensions, or office expenses.",
       ],
     },
     {
       question:
         "What happens if a PRI does not utilize the grant properly or delays reporting?",
       answer: [
         "Withholding of next installment.",
         "Audit observations.",
         "Reallocation to performing PRIs (in some cases).",
       ],
     },
     {
       question: "Who monitors the usage of 15th FC Grants?",
       answer: [
         "State Finance Department.",
         "Department of Panchayati Raj.",
         "MoPR & MoF, Government of India.",
         "Real-time monitoring via eGramSwaraj-PFMS interface.",
       ],
     },
     {
       question: "Is there any performance incentive in 15th FC?",
       answer: [
         "There is no separate performance incentive fund.",
         "Better-performing States and PRIs receive timely release of grants.",
         "Their success influences future policy recommendations.",
       ],
     },
   ],
   []
 );


  const itemsPerPage = 10;
  const totalPages = Math.ceil(faqs.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaqs = useMemo(
    () => faqs.slice(startIndex, startIndex + itemsPerPage),
    [faqs, startIndex, itemsPerPage]
  );

  const toggleFaq = useCallback(
    (index) => {
      setOpenIndex(openIndex === index ? null : index);
    },
    [openIndex]
  );

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-prime text-center mb-6 sm:mb-10 leading-snug">
        15th Finance Commission – Frequently Asked Questions
      </h2>

      {/* FAQ List */}
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
            {currentFaqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                faq={faq}
                isOpen={openIndex === idx}
                onToggle={() => toggleFaq(idx)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center lg:justify-end mt-6 gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="px-3 sm:px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base"
          onClick={() => {
            setDirection(-1);
            setCurrentPage((p) => p - 1);
            setOpenIndex(null);
          }}
          disabled={currentPage === 1}
        >
          Prev
        </motion.button>

        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => {
              setDirection(i + 1 > currentPage ? 1 : -1);
              setCurrentPage(i + 1);
              setOpenIndex(null);
            }}
            className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${
              currentPage === i + 1
                ? "bg-prime text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </motion.button>
        ))}

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="px-3 sm:px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-sm sm:text-base"
          onClick={() => {
            setDirection(1);
            setCurrentPage((p) => p + 1);
            setOpenIndex(null);
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default FCGrandsFaq;
