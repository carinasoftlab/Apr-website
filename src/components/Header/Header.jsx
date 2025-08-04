"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";
import "./Header.css";

export default function Header() {
  const [isSticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    setMobileDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen((prev) => !prev);
  };

  const isActive = (path) => pathname === path;

  return (
    <section id="header" className="header-section">
      <div className="header-1">
        <div className="logo-section">
          <div className="logo-1">
            <img src="/images/header1.svg" alt="Panchayati Raaj" />
            <h3>PANCHAYATI RAAJ</h3>
          </div>
          <div className="emblem">
            <img src="/images/emblem.svg" alt="emblem" />
          </div>
          <div className="logo-2">
            <img src="/images/header2.svg" alt="Govt of Arunachal" />
            <h3>GOVT. OF ARUNACHAL PRADESH</h3>
          </div>

          {/* Hamburger */}
        </div>

        <button
          className={`navbar-toggle ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={`main-header sticky-wrapper ${isSticky ? "sticky" : ""}`}
        >
          <div className="nav">
            <div className="header-2">
              <ul className="links-nav-desktop">
                <li>
                  <Link href="/" className={isActive("/") ? "active" : ""}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className={isActive("/about-us") ? "active" : ""}
                  >
                    ABOUT US
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <span className="dropdown-toggle">
                    SCHEMES <FaChevronDown size={14} />
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link href="/scheme-rgsa">RGSA</Link>
                    </li>
                    <li>
                      <Link href="/scheme-sor">SOR</Link>
                    </li>
                    <li>
                      <Link href="/scheme-fc-grants">FC Grants</Link>
                    </li>
                    <li>
                      <Link href="/schemes/assets">Regenerating Assets</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/#guideline">GUIDELINES</Link>
                </li>
                <li>
                  <Link href="/#link">IMPORTANT LINKS</Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className={isActive("/contact-us") ? "active" : ""}
                  >
                    CONTACT US
                  </Link>
                </li>
                <li>
                  <a className="login" href="">
                    <Link href="/login">LOGIN</Link>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div className="mobile-backdrop" onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Menu */}
      <ul className={`links-nav-mobile ${isMobileMenuOpen ? "show" : ""}`}>
        <li onClick={closeMobileMenu}>
          <Link href="/" className={isActive("/") ? "active" : ""}>
            HOME
          </Link>
        </li>
        <li onClick={closeMobileMenu}>
          <Link
            href="/about-us"
            className={isActive("/about-us") ? "active" : ""}
          >
            ABOUT US
          </Link>
        </li>
        <li
          className={`nav-item dropdown ${isMobileDropdownOpen ? "open" : ""}`}
        >
          <span className="dropdown-toggle" onClick={toggleMobileDropdown}>
            SCHEMES <FaChevronDown size={14} />
          </span>
          <ul className="dropdown-menu">
            <li onClick={closeMobileMenu}>
              <Link href="/scheme-rgsa">RGSA</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link href="/scheme-sor">SOR</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link href="/schemes/grants">FC Grants</Link>
            </li>
            <li onClick={closeMobileMenu}>
              <Link href="/schemes/assets">Regenerating Assets</Link>
            </li>
          </ul>
        </li>
        <li onClick={closeMobileMenu}>
          <Link href="/#guideline">GUIDELINES</Link>
        </li>
        <li onClick={closeMobileMenu}>
          <Link href="/#link">IMPORTANT LINKS</Link>
        </li>
        <li onClick={closeMobileMenu}>
          <Link
            href="/contact-us"
            className={isActive("/contact-us") ? "active" : ""}
          >
            CONTACT US
          </Link>
        </li>
        <li>
          <a className="login" href="">
            LOGIN
          </a>
        </li>
      </ul>
    </section>
  );
}
