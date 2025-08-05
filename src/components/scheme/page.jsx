"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import "./Scheme.css";
import Modal from "../modal/Pb/Pb";
import Dprc from "../modal/Dprc/Dprc";
import GrantContent from "../modal/performance-grants/Grant-content";
import TiedContent from "../modal/Tied-grants/Tied-content";
import { Button } from "@/components/ui/button";
const schemesData = [
  {
    title: "RGSA",

    itemColor: "#E8F5E8", // Light green for items
    items: [
      "Panchayat Bhavan",
      "DPRC",
      "Training Imparted",
      "Women PRI Leaders",
    ],
  },
  {
    title: "SOR",

    itemColor: "#FFF2E8", // Light orange for items
    items: ["Basic Grants", "Performance Grants"],
  },
  {
    title: "FC GRANTS",

    itemColor: "#E8F5E8", // Light green for items
    items: ["Tied Funds", "Untied Funds", "FAQ", "Scheme Related Links"],
  },
];

const Scheme = () => {
  const [showPBModal, setShowPBModal] = useState(false);
  const [showDPRCModal, setShowDPRCModal] = useState(false);
  const [showBasicGrant, setShowBasicGrant] = useState(false);
  const [showPerformanceGrant, setShowPerformanceGrant] = useState(false);
  const [showTiedGrant, setShowTiedGrant] = useState(false);
  const [showUntiedGrant, setShowUntiedGrant] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const handleDropdownToggle = (index) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleGrantClick = (grantType) => {
    switch (grantType) {
      case "Basic Grants":
        setShowBasicGrant(true);
        break;
      default:
        break;
    }
  };

  const handleItemClick = (item) => {
    setOpenDropdowns({});
    switch (item) {
      case "Panchayat Bhavan":
        setShowPBModal(true);
        break;
      case "DPRC":
        setShowDPRCModal(true);
        break;
      case "Basic Grants":
        setShowBasicGrant(true);
        break;
      case "Performance Grants":
        setShowPerformanceGrant(true);
        break;
      case "Tied Funds":
        setShowTiedGrant(true);
        break;
      case "Untied Funds":
        setShowUntiedGrant(true);
        break;
    }
  };

  return (
    <section id="scheme" className="schemes-section">
      <div className="scheme-overlay-left" />
      <div className="scheme-overlay-right" />
      <motion.h2
        className="schemes-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        SCHEMES
      </motion.h2>
           <div className="schemes-cards">
        {schemesData.map((scheme, index) => {
          const isSOR = scheme.title === "SOR";

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div
                className={`dropdown-container ${
                  openDropdowns[index] ? "expanded" : ""
                }`}
                style={{
                  minHeight: openDropdowns[index]
                    ? `${60 + scheme.items.length * 50}px`
                    : "60px",
                }}
              >
                {/* Dropdown Button */}
                <Button
                  variant="none"
                  className="dropdown-button"
                  onClick={() => handleDropdownToggle(index)}
                  style={{
                    color: "var(--Text-White, #FFF)",
                    textAlign: "center",
                    fontFamily: "Montserrat, sans-serif",
                    
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    flex: "1 0 0",
                  }}
                >
                  {scheme.title}
                  <span
                    className={`arrow ${openDropdowns[index] ? "rotate" : ""}`}
                    style={{ color: "var(--Text-White, #FFF)" }}
                  >
                    ›
                  </span>
                </Button>

                {/* Dropdown Items */}
                <div
                  className={`dropdown-content-inline ${
                    openDropdowns[index] ? "open" : ""
                  }`}
                >
                  {scheme.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleItemClick(item)}
                      className="dropdown-item-inline"
                    >
                      <span style={{ color: scheme.color }}>{item}</span>
                      <span
                        className="arrow subtle"
                        style={{ color: scheme.color }}
                      >
                        ›
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <Modal isOpen={showPBModal} onClose={() => setShowPBModal(false)} />
      <Dprc isOpen={showDPRCModal} onClose={() => setShowDPRCModal(false)} />

      {showBasicGrant && (
        <GrantContent
          isOpen={showBasicGrant}
          onClose={() => setShowBasicGrant(false)}
          type="Basic Grants"
        />
      )}

      <GrantContent
        isOpen={showPerformanceGrant}
        onClose={() => setShowPerformanceGrant(false)}
        type="Performance Grants"
      />
      <TiedContent
        isOpen={showTiedGrant}
        onClose={() => setShowTiedGrant(false)}
        type="Tied Funds"
      />
      <TiedContent
        isOpen={showUntiedGrant}
        onClose={() => setShowUntiedGrant(false)}
        type="Untied Funds"
      />
    </section>
  );
};

export default Scheme;
