"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSchemeDropdownOpen, setIsSchemeDropdownOpen] = useState(null);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    {
      name: "Schemes",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { name: "RGSA", href: "/scheme-rgsa" },
        { name: "SOR", href: "/scheme-sor" },
        { name: "FC Grants", href: "/scheme-fc-grants" },
        { name: "ASSETS", href: "" },
      ],
    },
    { name: "Guidelines", href: "" },
    { name: "Important Links", href: "#links" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  return (
    <header className="relative bg-white w-full z-50 h-20 md:h-auto lg:h-35 xl:h-35 2xl:h-44">
      {/* Topbar Emblem - Mobile Only */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto mt-2 lg:mb-5 xl:mb-0 flex justify-center items-center py-2 px-4"
      >
        <Image src="/images/emblem.svg" alt="Emblem" width={30} height={30} />
      </motion.div>

      <div className=" px-4 lg:-mt-15 xl:-mt-15 ">
        {/* Branding Row */}
        <div className="flex items-center lg:items-baseline-last justify-between py-4 lg:py-1 relative -mt-20 lg:-mt-10 xl:mt-0">
          {/* Left Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center xl:w-[14vw] lg:w-[12vw] w-[30vw]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-[16vw] h-[8vw] sm:w-[12vw] sm:h-[6vw] md:h-[8vw] lg:w-[6vw] lg:h-[6vh] xl:w-[8vw] xl:h-[5vw]"
            >
              <Image
                src="/images/header1.svg"
                alt="Panchayati Raj Logo"
                fill
                className="object-contain"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-bold text-[1.7vw] sm:text-[1.2vw] md:text-[1.5vw] lg:text-[1vw] xl:text-[1vw] text-[#282828] uppercase text-center"
            >
              Panchayati Raj
            </motion.p>
          </motion.div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="bg-green-900 rounded-tl-2xl rounded-bl-2xl flex items-center gap-6 px-4 lg:py-2.5 xl:py-2">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <>
                      <button
                        className={`flex items-center gap-1 px-2.5 py-2 font-semibold lg:text-[0.8vw] xl:text-[1vw] uppercase rounded-lg outline-offset-[-1px] transition-colors ${
                          isSchemeDropdownOpen === item.name
                            ? "bg-white/10 text-white"
                            : "text-white hover:bg-white/10"
                        }`}
                        onClick={() =>
                          setIsSchemeDropdownOpen(
                            isSchemeDropdownOpen === item.name
                              ? null
                              : item.name
                          )
                        }
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${
                            isSchemeDropdownOpen === item.name
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>
                      {isSchemeDropdownOpen === item.name && (
                        <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border z-50 bg-white">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className={`block w-full px-4 py-2 font-semibold transition-colors first:rounded-t-lg last:rounded-b-lg
                                ${
                                  pathname === dropdownItem.href
                                    ? "bg-[#FAEFDD] text-[#1e4c30] font-semibold"
                                    : "text-[#555] hover:bg-[#FAEFDD]"
                                }`}
                              onClick={() => setIsSchemeDropdownOpen(null)}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-2 py-1 font-semibold text-base lg:text-[0.8vw] xl:text-[1vw] 2xl:text-[1.03vw] uppercase tracking-wide rounded-lg  outline-offset-[-1px] transition-colors
                        ${
                          pathname === item.href
                            ? "bg-white text-green-900"
                            : "text-white hover:bg-white/10"
                        }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-amber-500 rounded-tr-2xl text-center rounded-br-2xl px-6 lg:py-[0.85rem] 2xl:py-[0.95rem]">
              <Link
                href="/login"
                className={`font-semibold text-base lg:text-[1.2vw] 2xl:text-[1.03vw] uppercase tracking-wide
                  ${
                    pathname === "/login"
                      ? "text-gray-200"
                      : "text-white hover:text-gray-200"
                  }`}
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right Logo - Large Screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden lg:flex flex-col items-center w-[18vw] xl:w-[18vw] lg:w-[12]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-[8vw] h-[6vw] xl:w-[9vw] xl:h-[6vw] relative"
            >
              <Image
                src="/images/header2.svg"
                alt="Government Logo"
                fill
                className="object-contain rounded-md"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="font-bold text-sm lg:text-[1vw] text-[#282828] uppercase -mt-2 text-center"
            >
              Govt. of Arunachal Pradesh
            </motion.p>
          </motion.div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center bg-[#1e4c30] rounded-[12px] px-3 py-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1e4c30] rounded-b-[18px] mt-2 z-50">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <>
                    <button
                      className={`flex items-center justify-between w-full px-4 py-3 font-bold text-sm uppercase transition-colors
                          ${
                            isSchemeDropdownOpen === item.name
                              ? "bg-white/10 text-yellow-300"
                              : "text-white hover:bg-white/10"
                          }`}
                      onClick={() =>
                        setIsSchemeDropdownOpen(
                          isSchemeDropdownOpen === item.name ? null : item.name
                        )
                      }
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isSchemeDropdownOpen === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isSchemeDropdownOpen === item.name && (
                      <div className="bg-white/10">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className={`block w-full px-8 py-2 transition-colors
                                ${
                                  pathname === dropdownItem.href
                                    ? "text-yellow-300"
                                    : "text-white/90 hover:text-white"
                                }`}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsSchemeDropdownOpen(null);
                            }}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block w-full px-4 py-3 font-bold text-sm uppercase transition-colors
                        ${
                          pathname === item.href
                            ? "text-yellow-300"
                            : "text-white hover:bg-white/10"
                        }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="border-t border-white/20 mx-4 my-2">
              <Link
                href="/login"
                className={`block w-full text-left px-4 py-3 font-bold text-sm uppercase transition-colors
                    ${
                      pathname === "/login"
                        ? "text-yellow-300"
                        : "text-[#f4ac1a] hover:bg-white/10"
                    }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
