"use client";
import Link from "next/link";
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
    <header className="relative bg-white w-full z-50">
      <div className="container mx-auto px-4">
        {/* Top Header */}
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Left Logo */}
          <div className="flex flex-col items-center">
            <div className="h-16 lg:h-[92px] w-20 lg:w-[110px] relative">
              <Image
                src="/images/header1.svg"
                alt="Panchayati Raj Logo"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <p className="font-bold text-sm lg:text-base text-[#282828] uppercase text-center">
              Panchayati Raj
            </p>
          </div>

          {/* Center Logo */}
          <div className="flex flex-col items-center relative z-10">
            <div className="h-12 lg:h-16 w-8 lg:w-10 relative z-10">
              <Image
                src="/images/emblem.svg"
                alt="Center Emblem"
                fill
                className="object-cover z-10"
              />
            </div>
          </div>

          {/* Right Logo */}
          <div className="flex flex-col items-center">
            <div className="h-16 lg:h-[92px] w-28 lg:w-[157px] relative">
              <Image
                src="/images/header2.svg"
                alt="Government Logo"
                fill
                className="object-cover rounded-md"
              />
            </div>
            <p className="font-bold text-sm lg:text-base text-[#282828] uppercase text-center">
              Govt. of Arunachal Pradesh
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center sticky top-0 bg-white z-50 shadow-md">
            <div className="bg-[#1e4c30] rounded-l-[18px] flex items-center px-4 py-2">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.hasDropdown ? (
                    <>
                      <button
                        className={`flex items-center gap-1 px-4 py-2 font-bold text-base uppercase rounded-lg transition-colors
                      ${
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
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                      {isSchemeDropdownOpen === item.name && (
                        <div className="absolute top-full left-0 mt-2 w-48  rounded-lg  border z-50">
                          {item.dropdownItems?.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className={`block w-full bg-[#fff]  px-4 py-2 font-medium transition-colors first:rounded-t-lg last:rounded-b-lg
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
                      className={`flex items-center gap-1 px-4 py-2 font-bold text-base uppercase rounded-lg transition-colors
                    ${
                      pathname === item.href
                        ? "bg-white text-[#1e4c30]"
                        : "text-white hover:bg-white/10"
                    }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-[#f4ac1a] rounded-r-[18px] px-8 py-4">
              <Link
                href="/login"
                className={`font-bold text-base uppercase transition-colors
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

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-[#1e4c30] rounded-[18px] px-4 py-3">
            <span className="text-white font-bold text-sm uppercase">Menu</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-1"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-[#1e4c30] rounded-b-[18px] mt-1 z-50">
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
                            isSchemeDropdownOpen === item.name
                              ? null
                              : item.name
                          )
                        }
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isSchemeDropdownOpen === item.name
                              ? "rotate-180"
                              : ""
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
        </nav>
      </div>
    </header>
  );
}
