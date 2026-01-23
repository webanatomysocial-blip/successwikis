import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
// import logo from "../assets/images/main-logo.png";
import logo from "../assets/logo.png";
import { BsSearch } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import MobileMenu from "./MobileMenu";

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
          <Link to="/" className="header-logo" onClick={handleLogoClick}>
            <img
              src={logo}
              alt="Success Wikis"
              className="logo-img"
              width="168"
              height="55"
            />
          </Link>
        </div>

        <nav className="header-nav only-windows">
          <Link to="/ads" className="nav-link">
            Ads
          </Link>
          <Link to="/blogs" className="nav-link">
            Blogs
          </Link>
          <Link to="/success-wire" className="nav-link">
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

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSec1u08PCoUHCZOZOprFHmBZpJ0ExADdcdbXvlZlq-JDCgGVg/viewform?pli=1&authuser=0"
            target="_blank"
            rel="noopener noreferrer"
            className="get-featured-btn"
          >
            Get Featured
          </a>
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
