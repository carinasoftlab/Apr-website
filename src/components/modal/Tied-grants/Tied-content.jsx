"use client";
import { useState } from "react";
import "./Tied-content.css"

const TiedContent = ({ isOpen, onClose, type }) => {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);
  const toggleDropdown2 = () => setDropdownOpen2(!dropdownOpen2);

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setDropdownOpen1(false);
  };

  const handleSelectScheme = (scheme) => {
    setSelectedScheme(scheme);
    setDropdownOpen2(false);
  };

  const districtData = {
    "District-1": {},
    "District-2": {},
    "District-3": {},
    "District-4": {},
    "District-5": {},
  };

  const schemeData = ["MGNREGA", "PMAY", "SBM"];

  const grantData = {
    title: "FC GRANTS",
    subtitle: type?.toUpperCase(),
  };

  if (!isOpen || !type) return null;

  return (
    <div className="grant-overlay">
      <div className="grant-content">
        <div className="image-grid">
          <button className="grant-close" onClick={onClose}>
            ✕
          </button>
          <div className="content-grant">
            <div>
              <h1 className="grant-title">{grantData.title}</h1>
              <div className="grant-horizontal-line"></div>
              <h2 className="grant-subtitle">{grantData.subtitle}</h2>
            </div>

            {/* First Dropdown: District */}
            <div className="pb-dropdown">
              <div className="district-name" onClick={toggleDropdown1}>
                <h1>{selectedDistrict || "Select District"}</h1>
                <img src="/images/dropdown.svg" alt="dropdown arrow" />
              </div>
              {dropdownOpen1 && (
                <ul className="dropdown-list">
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

            {/* Second Dropdown: Scheme */}
            <div className="pb-dropdown">
              <div className="district-name" onClick={toggleDropdown2}>
                <h1>{selectedScheme || "Select Scheme"}</h1>
                <img src="/images/dropdown.svg" alt="dropdown arrow" />
              </div>
              {dropdownOpen2 && (
                <ul className="dropdown-list">
                  {schemeData.map((scheme) => (
                    <li key={scheme} onClick={() => handleSelectScheme(scheme)}>
                      {scheme}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiedContent;
