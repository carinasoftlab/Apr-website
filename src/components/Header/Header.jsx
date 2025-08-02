"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import "./Header.css";

const Header = () => {
 const [activeHash, setActiveHash] = useState("");

 useEffect(() => {
   const handleHashChange = () => {
     setActiveHash(window.location.hash);
   };

   handleHashChange(); // on mount
   window.addEventListener("hashchange", handleHashChange);
   return () => window.removeEventListener("hashchange", handleHashChange);
 }, []);
  const headerRef = useRef(null);
  const [isSticky, setSticky] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const triggerPoint = 150;
      setSticky(offset > triggerPoint);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDropdownActive = activeHash.startsWith("/schemes");

  return (
    <section id="header" className="header-section">
      <div className="header-1">
        <div className="logo-section">
          <div className="logo-1">
            <img src="/images/header1.svg" alt="" />
            <h3>PANCHAYATI RAAJ</h3>
          </div>
          <div className="logo-2">
            <img src="/images/header2.svg" alt="aplogo" />
            <h3>GOVT. OF ARUNACHAL PRADESH</h3>
            {/* <h2>Government of Arunachal Pradesh</h2> */}
          </div>
          <div className="emblem">
            <img src="/images/emblem.svg" alt="emblem" width={46} height={46} />
          </div>
        </div>

        <div
          className={`main-header sticky-wrapper ${isSticky ? "sticky" : ""}`}
        >
          <div className="nav">
            <div ref={headerRef} className={`header-2`}>
              <ul className={`links-nav ${isMobileMenuOpen ? "show" : ""}`}>
                <li className="nav-item" onClick={closeMobileMenu}>
                  <Link href="/" className={activeHash === "#" ? "active" : ""}>
                    HOME
                  </Link>
                </li>

                <li className="nav-item" onClick={closeMobileMenu}>
                  <Link
                    href="/about-us"
                    className={activeHash === "#about" ? "active" : ""}
                  >
                    ABOUT US
                  </Link>
                </li>

                <li
                  className={`nav-item dropdown ${
                    isDropdownActive ? "active" : ""
                  }`}
                >
                  <span className="dropdown-toggle">
                    SCHEMES{" "}
                    <FaChevronDown size={14} style={{ marginLeft: "4px" }} />
                  </span>
                  <ul className="dropdown-menu">
                    <li onClick={closeMobileMenu}>
                      <Link
                        href="/scheme-rgsa"
                        className={
                          activeHash === "/schemes/rgsa" ? "active" : ""
                        }
                      >
                        RGSA
                      </Link>
                    </li>
                    <li onClick={closeMobileMenu}>
                      <Link
                        href="/scheme-sor"
                        className={
                          activeHash === "/schemes/sor" ? "active" : ""
                        }
                      >
                        SOR
                      </Link>
                    </li>
                    <li onClick={closeMobileMenu}>
                      <Link
                        href="/schemes/grants"
                        className={
                          activeHash === "/schemes/grants" ? "active" : ""
                        }
                      >
                        FC Grants
                      </Link>
                    </li>

                    <li onClick={closeMobileMenu}>
                      <Link
                        href="/schemes/assets"
                        className={
                          activeHash === "/schemes/assets" ? "active" : ""
                        }
                      >
                        Regenerating Assets
                      </Link>
                    </li>
                  </ul>
                </li>

                <li className="nav-item" onClick={closeMobileMenu}>
                  <Link
                    href="/#guideline"
                    className={activeHash === "#guideline" ? "active" : ""}
                  >
                    GUIDELINES
                  </Link>
                </li>

                <li className="nav-item" onClick={closeMobileMenu}>
                  <Link
                    href="/#link"
                    className={activeHash === "#data" ? "active" : ""}
                  >
                    IMPORTANT LINKS
                  </Link>
                </li>

                <li className="nav-item" onClick={closeMobileMenu}>
                  <Link
                    href="/contact-us"
                    className={activeHash === "#footer" ? "active" : ""}
                  >
                    CONTACT US
                  </Link>
                </li>
              </ul>

              <button
                className={`navbar-toggle ${isMobileMenuOpen ? "active" : ""}`}
                onClick={toggleMobileMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>

          <a className="login" href="">
            LOGIN
          </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
