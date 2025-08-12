"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const schemesData = [
  {
    title: "RGSA",
    items: [
      "Panchayat Bhavan",
      "DPRC",
      "Training Imparted",
      "Women PRI Leaders",
    ],
  },
  {
    title: "SOR",
    items: ["Basic Grants", "Performance Grants"],
  },
  {
    title: "FC GRANTS",
    items: ["Tied Funds", "Untied Funds", "FAQ", "Scheme Related Links"],
  },
];

const Scheme = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const router = useRouter();

  const handleDropdownToggle = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Map item to tab id for RGSA, SOR, FC GRANTS
  const rgsaTabMap = {
    "Panchayat Bhavan": "panchayat-bhawans",
    DPRC: "dprc",
    "Training Imparted": "training-imparted",
    "Women PRI Leaders": "women-pri-leaders",
  };
  const sorTabMap = {
    "Basic Grants": "basice-grants",
    "Performance Grants": "performance-grants",
  };
  const fcGrantsTabMap = {
    "Tied Funds": "tied-funds",
    "Untied Funds": "untied-funds",
    FAQ: "faq",
    "Scheme Related Links": "scheme-related-links",
  };

  // Handler for item click
  const handleItemClick = (schemeTitle, item) => {
    if (schemeTitle === "RGSA" && rgsaTabMap[item]) {
      router.push(`/scheme-rgsa?tab=${rgsaTabMap[item]}`);
    } else if (schemeTitle === "SOR" && sorTabMap[item]) {
      router.push(`/scheme-sor?tab=${sorTabMap[item]}`);
    } else if (schemeTitle === "FC GRANTS" && fcGrantsTabMap[item]) {
      router.push(`/scheme-fc-grants?tab=${fcGrantsTabMap[item]}`);
      
    }
  };

  return (
    <section
      id="scheme"
      className=" flex flex-col items-center overflow-hidden  bg-gradient-to-b from-[#FAEFDD] to-white py-16 px-4 text-center lg:min-h-[60vh]"
    >
      <h2 className="text-2xl md:text-4xl lg:text-5xl 2xl:text-[3.3rem] font-bold text-[#2B2B2B] mb-10">
        SCHEMES
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-6 w-full mt-4 sm:mt-8"
      >
        {schemesData.map((scheme, index) => (
          <div
            key={`scheme-${index}`}
            className={`transition-all duration-700 ease-in-out delay-200  `}
          >
            <div
              className={`transition-all duration-700 ease-in-out w-full sm:w-[90%] md:w-[40vw] lg:w-[30vw] min-w-[250px] p-4  sm:p-6 lg:p-7 rounded-[32px]  bg-gradient-to-b from-[#58AE7B] to-[#1B4C2F] shadow-[0_42px_28px_-19px_rgba(0,0,0,0.36)]`}
            >
              {/* Dropdown Button */}
              <Button
                type="button"
                aria-expanded={!!openDropdowns[index]}
                variant="none"
                className="w-full flex items-center justify-between gap-4 text-white font-bold uppercase tracking-wide text-[clamp(18px,4vw,32px)] px-4 py-3 rounded-xl hover:-translate-y-0.5 transition-transform duration-200 ease-out will-change-transform"
                onClick={() => handleDropdownToggle(index)}
              >
                <div className="w-[95%]">{scheme.title}</div>
                <span
                  className={`text-white text-[clamp(20px,3vw,32px)] font-bold transition-all duration-500 ${
                    openDropdowns[index] ? "rotate-90" : "rotate-0"
                  } `}
                >
                  ›
                </span>
              </Button>

              {/* Dropdown Content */}
              <AnimatePresence initial={false}>
                {openDropdowns[index] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="mt-12 bg-white text-black rounded-[32px] px-4 py-2 overflow-hidden"
                  >
                    {scheme.items.map((item, i) => (
                      <button
                        type="button"
                        key={`item-${i}`}
                        className="w-full text-black flex justify-between items-center px-4 py-3 text-left text-[clamp(14px,2.5vw,16px)] font-medium transition-all duration-200 ease-out hover:text-prime hover:bg-green-100 hover:rounded-4xl transform hover:scale-[1.02] cursor-pointer"
                        onClick={() => handleItemClick(scheme.title, item)}
                      >
                        <span>{item}</span>
                        <span className="text-[clamp(10px,2vw,16px)] text-black opacity-70 transition-opacity duration-200 hover:opacity-100">
                          ›
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Scheme;
