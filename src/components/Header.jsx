"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../css/header.css";
// import logo from "../assets/images/main-logo.png";
import logo from "../assets/logo.png";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import MobileMenu from "./MobileMenu";

import Image from "next/image";

const Header = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) onSearch(value);
  };

  const handleLogoClick = () => {
    setSearchValue("");
    if (onSearch) onSearch("");
  };

  return (
    <>
      <header className="header-container-new">
        <div className="header-left">
          <Link href="/" className="header-logo" onClick={handleLogoClick}>
            <Image
              src={logo}
              alt="Success Wikis"
              className="logo-img"
              width={168}
              height={55}
              priority
            />
          </Link>
        </div>

        <nav className="header-nav only-windows">
          <Link href="/" className="nav-link">
            Stories
          </Link>
          <Link href="/success-wire" className="nav-link">
            Success Wire
          </Link>
        </nav>

        <div className="header-right only-windows">
          <div className="search-bar">
            <BsSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>

          <Link
            href="/get-featured"
            className="get-featured-btn"
          >
            Get Featured
          </Link>
        </div>

        {/* Mobile Actions */}
        <div className="header-mobile-actions only-mobile">
          <button
            className="surprise-me-mobile"
            onClick={() => window.dispatchEvent(new Event("openSurpriseMe"))}
          >
            Surprise Me
          </button>
          <button
            className="hamburger-btn"
            aria-label="Toggle Menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <FiMenu size={28} />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
