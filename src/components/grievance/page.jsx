import React from "react";
import "./Grievance.css";
import EmailInput from "../ui/email/EmailInput";

const Grievance = () => {
  return (
    <div id="grievance">
      <div className="scheme-overlay-left" />
      <div className="scheme-overlay-right" />
      <div className="header-content">
        <h1>SUBMIT YOUR GRIEVANCE/ RTI</h1>
        <p>
          We are committed to addressing your concerns promptly and effectively.
          Please use the
          <br /> form below to submit any grievance you may have. Your feedback
          helps us improve.
        </p>
      </div>

      <div className="message-container">
        <div className="message-card">
          <h1>Grievance Submission Form</h1>
          <p>Fill out the details below to submit your grievance.</p>

          <EmailInput />
        </div>
      </div>
    </div>
  );
};

export default Grievance;
