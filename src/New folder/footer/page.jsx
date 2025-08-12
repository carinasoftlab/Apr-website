"use client";

import Image from "next/image";
import Link from "next/link";

import { MapPin } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section: Logo and Social Media */}
        <div className="footer-left">
          <div className="footer-logo">
            <Image
              src="/images/footerlogo.svg"
              alt="Panchayati Raj Logo"
              width={270}
              height={270}
              className="footer-logo-img"
            />
            <h2 className="footer-title">PANCHAYATI RAJ</h2>
          </div>
          <div className="footer-socials">
            <Link href="#" aria-label="Facebook">
              <Image
                src="/images/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Image
                src="/images/linkdIn.svg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Image
                src="/images/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="X (formerly Twitter)">
              <Image
                src="/images/x.svg"
                alt="X (formerly Twitter)"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Image
                src="/images/youtube.svg"
                alt="YouTube"
                width={30}
                height={30}
              />
            </Link>
          </div>
        </div>

        {/* Other Links Section */}
        <div className="footer-links">
          <h3 className="footer-heading">OTHER LINK</h3>
          <nav className="footer-nav">
            <Link href="#">Home</Link>
            <Link href="#">About Us</Link>
            <Link href="#">Term of Service</Link>
            <Link href="#">Privacy Policy</Link>
          </nav>
        </div>

        {/* Get In Touch Section */}
        <div className="footer-contact">
          <h3 className="footer-heading">GET IN TOUCH</h3>
          <div className="footer-contact-item">
            <MapPin className="footer-icon" />
            <p>
              Revenue Department,
              <br /> Arunachal Pradesh Ground Floor,
              <br /> Vallabh Bhavan - 2, Ministry,
              <br /> Area Hills, Arunachal Pradesh - 790104
            </p>
          </div>
        </div>

        <div>
          <p className="rti-text">
            For RTI and grievance related queries,
            <br /> mail us at:{" "}
            <Link href="mailto:support@example.com" className="rti-email">
              support@panchayatiRaaj.gov.in
            </Link>
          </p>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="footer-copy">
        <p>© Copyright 2022, All Rights Reserved by PanchayatiRaaj</p>
      </div>
    </footer>
  );
}
