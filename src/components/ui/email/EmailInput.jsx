"use client";

import { useState } from "react";
import "./EmailInput.css"; // Import your styles

export default function EmailInputForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !message) return;

    console.log("Submitted email:", email);
    console.log("Grievance message:", message);
    setSubmitted(true);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="email-form-wrapper">
      <form onSubmit={handleSubmit} className="email-form">
        <div className="email-label">
          <label htmlFor="email" className="">
            Enter your email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email-input"
          />
        </div>

        <div className="grievance-label">
          <label htmlFor="message">Your Grievance Details</label>
          <textarea
            id="message"
            placeholder="Please describe your grievance in detail, including relevant dates, times, and individuals involved. Be as specific as possible."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={6}
            className="message-textarea"
          ></textarea>
        </div>

        <button type="submit" className="email-submit-button">
          Submit
        </button>

        {submitted && (
          <p className="email-success-message">Thank you! Email submitted.</p>
        )}
      </form>
    </div>
  );
}
