import React from "react";

const FCGrandsFaq = () => {
  const faqs = [
    {
      question: "What are FC Grants?",
      answer:
        "FC Grants are Financial Commission Grants provided to Gram Panchayats for various development activities and infrastructure projects.",
    },
    {
      question: "How are FC Grants allocated?",
      answer:
        "FC Grants are allocated based on various criteria including population, area, and performance indicators of the Gram Panchayat.",
    },
    {
      question: "What is the difference between Tied and Untied Funds?",
      answer:
        "Tied Funds are earmarked for specific purposes and cannot be diverted, while Untied Funds can be used flexibly by Gram Panchayats based on local priorities.",
    },
    {
      question: "How can Gram Panchayats apply for FC Grants?",
      answer:
        "Gram Panchayats can apply through the prescribed application format submitted to the concerned authorities with required documentation.",
    },
    {
      question: "What are the monitoring mechanisms for FC Grants?",
      answer:
        "Regular monitoring is done through progress reports, site visits, and utilization certificates to ensure proper use of funds.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-prime mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Common questions about FC Grants and their implementation
          </p>
        </div>
      </div>
    </div>
  );
};

export default FCGrandsFaq;
