"use client";
import React, { useEffect } from "react";
// import { Button } from "@/components/ui/button";
import "./DistrictReportCard.css";

export default function DistrictReportCard({ districtData, onClose }) {
  if (!districtData) return null;

  const {
    name,
    score,
    rank,
    topCriteria,
    development,
    totalDevelopment,
    totalSchemes,
    completedSchemes,
    ongoingSchemes,
    agriculture,
    health,
    introulturare,
    livestock,
    womenPRI,
    totalLeaders,
    training,
    totalPanchayatBhawans,
    // tags,
    panchayatBhawans,
    assets,
    revenue,
    lastUpdated,
  } = districtData;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="district-modal-backdrop">
      <div className="district-modal-container">
        <div className="header-popup">
          <button
            onClick={onClose}
            aria-label="Close"
            className="district-close-button"
          >
            ✕
          </button>

          <h1 className="district-header">District Name : {name}</h1>
        </div>

        <div className="district-grid-card">
          {/* SOR Grant */}
          <div className="district-card">
            <h2 className="district-title">SOR Grant</h2>
            <div className="district-inner-card">
              <h3 className="district-subtitle">Total Schemes</h3>
              <div className="district-schemes">
                <div className="scheme-item">
                  <div className="scheme-label">
                    <span className="dot dot-light" />
                    Introulturare
                  </div>
                  <span className="scheme-value">{introulturare}</span>
                </div>
                <div className="scheme-item">
                  <div className="scheme-label">
                    <span className="dot dot-dark" />
                    Agriculture
                  </div>
                  <span className="scheme-value">{agriculture}</span>
                </div>

                <div className="scheme-item">
                  <div className="scheme-label">
                    <span className="dot dot-dark" />
                    Livestock
                  </div>
                  <span className="scheme-value">{livestock}</span>
                </div>

                <div className="scheme-item">
                  <div className="scheme-label">
                    <span className="dot dot-dark" />
                    Health
                  </div>
                  <span className="scheme-value">{health}</span>
                </div>
              </div>
            </div>
            <div className="district-box-grid-1">
              <div className="info-box-1">
                <h3>BASIC GRANTS</h3>
                <p>{totalSchemes}</p>
              </div>
              <div className="info-box-1">
                <h3>PERFORMANCE GRANTS</h3>
                <p>{score}</p>
              </div>
            </div>
          </div>

          {/* RGSA Section */}
          <div className="district-card col-span-2">
            <h2 className="district-title">RGSA Schemes</h2>
            <div className="district-box-grid">
              <div className="info-box">
                <h3>DPRC Development</h3>
                <p>
                  {development}/{totalDevelopment}
                </p>
              </div>
              <div className="info-box">
                <h3>Women PRI Leaders</h3>
                <p>
                  {womenPRI}/{totalLeaders}
                </p>
              </div>
              <div className="info-box">
                <h3>Training Imparted</h3>
                <p>{training}</p>
              </div>
              <div className="info-box">
                <h3>Panchayat Bhawans</h3>
                <p>
                  {panchayatBhawans}/{totalPanchayatBhawans}
                </p>
              </div>
            </div>

            <div className="fc-section">
              <h2>FC GRANTS</h2>
              <div className="district-box-grid">
                <div className="info-box-fc">
                  <h3>Tied Schemes</h3>
                  <p>{totalSchemes}</p>
                </div>
                <div className="info-box-fc">
                  <h3>United Schemes</h3>
                  <p>{totalSchemes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags and Footer */}
        <div className="district-footer">
          <p className="footer-updated">Last Updated: {lastUpdated}</p>
        </div>
      </div>
    </div>
  );
}
