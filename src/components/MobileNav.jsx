"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiCalendar, FiAperture } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import "../css/mobile-nav.css";

const MobileNav = ({ onSearch, searchQuery }) => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  // Sync with parent search query
  React.useEffect(() => {
    setSearchValue(searchQuery || "");
    setIsSearchOpen(!!searchQuery);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) onSearch(value);
  };

  const toggleSearch = () => {
    if (isSearchOpen && searchValue) {
      // Clear search
      setSearchValue("");
      if (onSearch) onSearch("");
    }
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="mobile-bottom-nav only-mobile">
      <div className="mobile-nav-container">
        {!isSearchOpen ? (
          <>
            <Link
              href="/"
              className={`mobile-nav-item ${pathname === "/" ? "active" : ""}`}
            >
              <FiHome size={22} />
              <span>Home</span>
            </Link>
            <Link
              href="/events"
              className={`mobile-nav-item ${pathname === "/events" ? "active" : ""}`}
            >
              <FiCalendar size={22} />
              <span>Events</span>
            </Link>
            <Link
              href="/success-wire"
              className={`mobile-nav-item ${pathname === "/success-wire" ? "active" : ""}`}
            >
              <FiAperture size={22} />
              <span>Success Wire</span>
            </Link>
            <button
              onClick={toggleSearch}
              className="mobile-nav-item search-btn"
            >
              <BsSearch size={22} />
              <span>Search</span>
            </button>
          </>
        ) : (
          <div className="mobile-search-bar" style={{ marginBottom: "15px" }}>
            <BsSearch className="mobile-search-icon" size={18} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchValue}
              onChange={handleSearchChange}
              autoFocus
              className="mobile-search-input"
            />
            <button
              onClick={toggleSearch}
              className="mobile-search-close"
              aria-label="Close Search"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileNav;
