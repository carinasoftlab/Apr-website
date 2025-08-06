"use client";
// import Image from "next/images";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

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
    <header className="relative bg-[#fff] z-50 h-max px-6 py-2">
      <div className="container flex justify-center items-center py-2 px-4 mx-auto">
        <img
          src="/images/emblem.svg"
          alt="emblem"
          className="w-12 h-14 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16"
        />
      </div>

      <div className="flex justify-between items-center -mt-16 lg:items-baseline lg:-mt-10 xl:-mt-10 relative ">
        <div className="items-center flex flex-col justify-center">
          <img
            className="h-16 lg:h-16 xl:h-24"
            src="/images/header1.svg"
            alt="Arunachal-logo"
          />
          {/* <h3 className="font-semibold text-[0.8rem] sm:text-sm md:text-base lg:text-[0.6rem] xl:text-sm">
            PANCHAYATI RAAJ
          </h3> */}
        </div>

        <div className="hidden lg:flex  absolute left-1/2 -translate-1/2 top-[70%]">
          <div className="bg-green-900 w-max lg:h-10 xl:h-auto rounded-tl-xl rounded-bl-xl flex items-center gap-6 lg:gap-2 px-4 lg:py-1 xl:py-2">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <>
                    <button
                      className={`flex items-center gap-1  px-2  font-semibold text-sm lg:text-[0.6rem] xl:text-sm uppercase rounded-lg outline-offset-[-1px] transition-colors ${
                        isSchemeDropdownOpen === item.name
                          ? "bg-white/10 text-white"
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
                        className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${
                          isSchemeDropdownOpen === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isSchemeDropdownOpen === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-40 rounded-lg border z-50 bg-white">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className={`block w-full px-4 py-2 text-sm font-semibold transition-colors first:rounded-t-lg last:rounded-b-lg
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
                    className={`px-2 py-1 font-semibold text-sm lg:text-[0.6rem] xl:text-sm uppercase tracking-wide rounded-lg outline-offset-[-1px] transition-colors
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
          <div className="bg-amber-500 rounded-tr-2xl text-center rounded-br-2xl px-6 lg:h-10 xl:h-auto lg:py-[0.5rem] 2xl:py-[0.95rem]">
            <Link
              href="/login"
              className={`font-semiboldtext-sm lg:text-[0.6rem] xl:text-sm font-semibold uppercase tracking-wide
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

        <div className="hidden lg:flex flex-col items-center justify-center">
          <img
            className="h-24 lg:h-16 xl:h-24"
            src="/images/header2.svg"
            alt="Arunachal-logo"
          />
          {/* <h3 className="font-semibold text-[0.8rem] sm:text-sm md:text-base lg:text-[0.6rem] xl:text-sm">
            GOVT.OF ARUNACHAL PRADESH
          </h3> */}
        </div>

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
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1e4c30] rounded-b-[18px] mt-2 z-50">
          {navigationItems.map((item) => (
            <div key={item.name}>
              {item.hasDropdown ? (
                <>
                  <button
                    className={`flex items-center justify-between w-full px-4 py-3 font-semibold text-sm  uppercase transition-colors
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
                  className={`block w-full px-4 py-3 font-semibold text-sm uppercase transition-colors
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
              className={`block w-full text-left px-4 py-3 font-semibold text-sm uppercase transition-colors
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
    </header>
  );
}
