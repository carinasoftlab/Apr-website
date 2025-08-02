"use client";

import Link from "next/link";
import "./DistrictDataTable.css";

export default function DistrictDataTable({ stateName }) {
  const data = [
    { label: "District", value: stateName | "N/A" },
    { label: "Rank", value: "1st in State" },
    { label: "Total Score", value: "95 / 100" },
    { label: "Grant Received", value: "₹1.25 Cr" },
    { label: "Last Updated", value: "15 July 2025" },
  ];

  return (
    <div className="district-data-container">
      {data.map((item) => (
        <div key={item.label} className="district-card">
          <div className="district-label">{item.label}</div>
          <div className="district-value"> value {item.value}</div>
        </div>
      ))}

      <div className="district-download">
        <a href="/full-report.pdf" download className="district-download-btn">
          Download Full Report PDF
        </a>
      </div>
    </div>
  );
}
