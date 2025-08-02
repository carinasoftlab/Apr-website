"use client";
import React from "react";
import "./DataTable.css"; // Import external CSS file

const data = [
  {
    number: 1,
    criteria: "100% Work Completion + UC",
    score: "10/10",
    status: "Complete",
    visual: "",
  },
  {
    number: 2,
    criteria: "Audited Accounts Submitted",
    score: "4/5",
    status: "Partial",
    visual: "",
  },
  {
    number: 3,
    criteria: "Revenue + Employment Schemes",
    score: "9/10",
    status: "Complete",
    visual: "",
  },
  {
    number: 4,
    criteria: "Green Budgeting",
    score: "5/5",
    status: "Complete",
    visual: "",
  },
  {
    number: 5,
    criteria: "Community Assets Created",
    score: "14/15",
    status: "Partial",
    visual: "",
  },
  {
    number: 6,
    criteria: "SHG Convergence",
    score: "5/5",
    status: "Complete",
    visual: "",
  },
  {
    number: 7,
    criteria: "Geo-tagging of 3 Stages",
    score: "9/10",
    status: "Partial",
    visual: "",
  },
  {
    number: 8,
    criteria: "GPDP/ZPDP Upload",
    score: "5/5",
    status: "Complete",
    visual: "",
  },
  {
    number: 9,
    criteria: "Online Audit Reports",
    score: "5/5",
    status: "Incomplete",
    visual: "",
  },
  {
    number: 10,
    criteria: "Revenue Collection Records",
    score: "9/10",
    status: "Complete",
    visual: "",
  },
  {
    number: 11,
    criteria: "Panchayat Advancement Index",
    score: "10/10",
    status: "Complete",
    visual: "",
  },
  {
    number: 12,
    criteria: "Inspection Reports Submitted",
    score: "5/5",
    status: "Complete",
    visual: "",
  },
];

export default function DataTable() {
  return (
    <div
      className="data-table-container"
      style={{
        "--table-width": "70vw",
        "--table-height": "53vh",
      }}
    >
      <table className="data-table">
        <thead className="data-table-header">
          <tr>
            <th className="col-number">Sr. No</th>
            <th className="col-criteria">Criteria</th>
            <th className="col-score">Score</th>
            <th className="col-status">Status</th>
            <th className="col-visual">Visual</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.number} className="data-table-row">
              <td>{item.number}</td>
              <td>{item.criteria}</td>
              <td>{item.score}</td>
              <td>{item.status}</td>
              <td>{item.visual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
