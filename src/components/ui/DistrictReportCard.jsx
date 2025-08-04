"use client";
import React, { useEffect } from "react";
import "./DistrictReportCard.css";

export default function DistrictReportCard({ districtData, onClose }) {
  if (!districtData) return null;

  const {
    name,
    50: score,
    16: rank,
    24: total,
    12: completed,
    8: going,
    10: assets,
    16: dprc,
    10: womenPRI,
    totalLeaders,
    10: training,
    3: panchayatBhawans,
    // lastUpdated
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
        <h1 className="HEADING">GRASS ROOT GOVERNANCE</h1>
        {/* Header */}
        <div className="header-popup">
          <h1 className="district-header">District Name : {name}</h1>
          <button
            onClick={onClose}
            aria-label="Close"
            className="district-close-button"
          >
            ✕
          </button>
        </div>

        {/* Cards Grid */}
        <div className="district-grid-1">
          {/* SOR Card */}
          <div className="sor-card">
            <div className="sor-header"></div>
            <div className="sor-title">SOR</div>

            <div className="sor-content">
              <div className="sor-item">
                <div className="sor-label">Score</div>
                <div className="sor-badge">
                  <div>{50}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">Rank</div>
                <div className="sor-badge">
                  <div>{16}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">Total Schemes</div>
                <div className="sor-badge">
                  <div>{24}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">Complete Schemes</div>
                <div className="sor-badge">
                  <div>{12}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">On Going Schemes</div>
                <div className="sor-badge">
                  <div>{8}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">Assets</div>
                <div className="sor-badge">
                  <div>{10}</div>
                </div>
              </div>
            </div>
          </div>

          {/* RGSA Card */}
          <div className="sor-card">
            <div className="rgsa-header"></div>
            <div className="rgsa-title">RGSA</div>

            <div className="sor-content">
              <div className="sor-item">
                <div className="sor-label">Panchayat Bhawans</div>
                <div className="sor-badge">
                  <div>{3}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">DPRC</div>
                <div className="sor-badge">
                  <div>{16}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">Women PRI Leader</div>
                <div className="sor-badge">
                  <div>{10}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">Training Imparted</div>
                <div className="sor-badge">
                  <div>{10}</div>
                </div>
              </div>
            </div>
          </div>

          {/* FC Grants Card */}
          <div className="sor-card">
            <div className="fc-header"></div>
            <div className="fc-title">FC Grants</div>

            <div className="sor-content">
              <div className="sor-item">
                <div className="sor-label">Total Schemes</div>
                <div className="sor-badge">
                  <div>{24}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">Complete Schemes</div>
                <div className="sor-badge">
                  <div>{12}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">On Going Schemes</div>
                <div className="sor-badge">
                  <div>{8}</div>
                </div>
              </div>

              <div className="sor-item">
                <div className="sor-label">Assets</div>
                <div className="sor-badge">
                  <div>{10}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="district-footer">
          <p>Last Updated: {lastUpdated}</p>
        </div> */}
      </div>
    </div>
  );
}
