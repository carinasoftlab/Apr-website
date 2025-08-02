"use client";

import { useState } from "react";
import "./Dprc.css";

/**
 * DPRC Modal Component
 * @param {{ isOpen: boolean, onClose: function }} props
 */
const Dprc = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
    setDropdownOpen(false);
  };

  // Sample DPRC data - replace with your actual data
  const dprcImages = [
    {
      id: 1,
      src: "/images/drpc1.png",
      alt: "DPRC 1",
    },
    {
      id: 2,
      src: "/images/drpc2.png",
      alt: "DPRC 2",
    },
    {
      id: 3,
      src: "/images/drpc3.png",
      alt: "DPRC 3",
    },
    {
      id: 4,
      src: "/images/drpc4.png",
      alt: "DPRC 4",
    },
  ];

  const districts = [
    "District-1",
    "District-2",
    "District-3",
    "District-4",
    "District-5",
  ];

  const dprcInfo = {
    name: "District Resource Person Cluster",
    status: "Active",
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="dprc-overlay">
      <div className="dprc-content">
        <div className="image-grid">
          <button className="pb-close" onClick={onClose}>
            ✕
          </button>
          <div className="content-dprc">
            <div>
              <h1 className="pb-title">RGSA</h1>
              <div className="dprc-horizontal-line"></div>
              <h2 className="pb-subtitle">
                DISTRICT PANCHAYAT RESOURCE CENTER
              </h2>
              <p className="pb-description">
                Here you can see the images of Panchayat
                <br /> Bhawan of your district
              </p>
              <div className="pb-dropdown">
                <div className="district-name" onClick={toggleDropdown}>
                  <h1>{selectedDistrict || "Select District"}</h1>
                  <img src="/images/dropdown.svg" alt="dropdown arrow" />
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-list">
                    {districts.map((district) => (
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

            <div className="cont-img">
              {dprcImages.map((image) => (
                <div
                  key={image.id}
                  className="image-card"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={250}
                    height={50}
                    className="image-thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dprc;
