"use client";
import React, { useState,  } from "react";
import "./Pb.css";

const districtData = {
  "District 1": { name: "Panchayat Bhavan 1", status: "DONE" },
  "District 2": { name: "Panchayat Bhavan 2", status: "IN PROGRESS" },
  "District 3": { name: "Panchayat Bhavan 3", status: "PENDING" },
};

export default function Modal({ isOpen, onClose }) {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  if (!isOpen) return null;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setDropdownOpen(false);
  };

  const bhawanInfo = districtData[selectedDistrict];

  return (
    <div className="pb-modal-overlay">
      <div className="pb-modal-box">
        <button className="pb-close" onClick={onClose}>
          ✕
        </button>
        <h1 className="pb-title">RGSA</h1>
        <div className="pb-horizontal-line"></div>

        <div className="items">
          <h2 className="pb-subtitle">PANCHAYAT BHAWAN</h2>
          <p className="pb-description">
            See here in which district Panchayat Bhawan has been
            <br /> constructed or is pending
          </p>

          <div className="pb-dropdown">
            <div className="district-name" onClick={toggleDropdown}>
              <h1>{selectedDistrict || "Select District"}</h1>
              <img src="/images/dropdown.svg" alt="dropdown arrow" />
            </div>

            {dropdownOpen && (
              <ul className="dropdown-list-1">
                {Object.keys(districtData).map((district) => (
                  <li
                    key={district}
                    onClick={() => handleSelectDistrict(district)}
                  >
                    {district}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {bhawanInfo && (
          <div className="pb-table">
            <div>
              <div className="table-content">
                <h1>Panchayat Bhavan</h1>
                <h1>Status</h1>
              </div>
            </div>

            <div className="table-horizontal-line"></div>

            {/* <div>
              <div className="pb-table-2">
                <div>{bhawanInfo.name}</div>
                <div>
                  <span
                    className={`pb-status ${bhawanInfo.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {bhawanInfo.status}
                  </span>
                </div>
              </div>
            </div> */}
            <div className="table-horizontal-line"></div>
          </div>
        )}
      </div>
    </div>
  );
}
