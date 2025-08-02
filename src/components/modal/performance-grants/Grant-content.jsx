"use client";

import { useState } from "react";
import "./GrantContent.css";
// import DataTable from "../../ui/table/DataTable";
// import DistrictDataTable from "../../ui/table/DistrictDataTable";
import DistrictGrid from "@/components/ui/DistrictGrid";

const GrantContent = ({ isOpen, onClose, type }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
  };

  const getGrantData = () => {
    const normalizedType = type?.toLowerCase();
    if (normalizedType === "basic grants") {
      return {
        title: "SOR",
        subtitle: "BASIC GRANTS",
        images: [
          { id: 1, src: "/images/drpc1.png", alt: "Basic Grant Allocation 1" },
          {
            id: 2,
            src: "/images/drpc2.png",
            alt: "Basic Grant Distribution 2",
          },
          { id: 3, src: "/images/drpc3.png", alt: "Basic Grant Report 3" },
          { id: 4, src: "/images/drpc4.png", alt: "Basic Grant Summary 4" },
        ],

        districts: [
          "District-1",
          "District-2",
          "District-3",
          "District-4",
          "District-5",
        ],

        info: {
          name: "Basic Grants Program",
          status: "Active",
        },
      };
    } else if (normalizedType === "performance grants") {
      return {
        title: "SOR",
        subtitle: "TOP 15 DISTRICTS",
        images: [],
        info: {
          name: "Performance Grants Program",
          status: "Active",
        },
      };
    }

    return null;
  };

  const grantData = getGrantData();
  if (!isOpen || !grantData) return null;

  return (
    <div className="grant-overlay">
      <div className="grant-content">
        <button className="grant-close" onClick={onClose}>
          ✕
        </button>
        <div>
          <h1 className="grant-title">{grantData.title}</h1>
          <div className="grant-horizontal-line"></div>
          <h2 className="grant-subtitle">{grantData.subtitle}</h2>
        </div>

        {type?.toLowerCase() === "performance grants" ? (
          <DistrictGrid
            selectedDistrict={selectedDistrict}
            onSelect={handleSelectDistrict}
          />
        ) : type?.toLowerCase() === "basic grants" ? (
          <div>
            <div className="basic-district" onClick={toggleDropdown}>
              <h1>{selectedDistrict || "Select District"}</h1>
              <img src="/images/dropdown.svg" alt="dropdown arrow" />
            </div>
            {/* Dropdown List */}
            {dropdownOpen && (
              <ul className="dropdown-district-list">
                {grantData.districts.map((district) => (
                  <li
                    key={district}
                    className="dropdown-item"
                    onClick={() => {
                      handleSelectDistrict(district);
                      setDropdownOpen(false); // close dropdown after selection
                    }}
                  >
                    {district}
                  </li>
                ))}
              </ul>
            )}

            <div className="basic-grant-images">
              {grantData.images.map((img) => (
                <img
                  key={img.id}
                  src={img.src}
                  alt={img.alt}
                  className="image-item"
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GrantContent;
