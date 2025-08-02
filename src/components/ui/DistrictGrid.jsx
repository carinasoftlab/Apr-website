"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import "./DistrictGrid.css";

const districts = [
  "Papum Pare",
  "Tawang",
  "West Kameng",
  "East Kameng",
  "Kurung Kumey",
  "Kra Daadi",
  "Lower Subansiri",
  "Upper Subansiri",
  "West Siang",
  "East Siang",
  "Upper Siang",
  "Dibang Valley",
  "Lower Dibang Valley",
  "Anjaw",
  "Lohit",
];

export default function DistrictGrid({
  selectedDistrict = "Papum Pare",
  onSelect,
}) {
  return (
    <div className="district-grid-wrapper">
      <div className="district-grid">
        {districts.map((district, index) => (
          <Button key={district} onClick={() => onSelect?.(district)}>
            {index + 1}. {district}
          </Button>
        ))}
      </div>
    </div>
  );
}
