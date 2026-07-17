import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiCalendar, FiAperture } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import "../css/mobile-nav.css";

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');

const MobileNav = ({ onSearch, searchQuery }) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [bannerHtml, setBannerHtml] = React.useState('');
  const [bannerClosed, setBannerClosed] = React.useState(false);

  React.useEffect(() => {
    fetch(`${API_BASE}/api/html-banner.php`)
      .then(r => r.json())
      .then(d => { if (d.status === 'success' && d.html) setBannerHtml(d.html); })
      .catch(() => {});
  }, []);

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
    <>
      {bannerHtml && !bannerClosed && (
        <div className="mobile-html-banner only-mobile">
          <button
            className="mobile-html-banner-close"
            onClick={() => setBannerClosed(true)}
            aria-label="Close"
          >
            ✕
          </button>
          <div dangerouslySetInnerHTML={{ __html: bannerHtml }} />
        </div>
      )}
    <nav className="mobile-bottom-nav only-mobile">
      <div className="mobile-nav-container">
        {!isSearchOpen ? (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `mobile-nav-item ${isActive ? "active" : ""}`
              }
            >
              <FiHome size={22} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `mobile-nav-item ${isActive ? "active" : ""}`
              }
            >
              <FiCalendar size={22} />
              <span>Events</span>
            </NavLink>
            <NavLink
              to="/success-wire"
              className={({ isActive }) =>
                `mobile-nav-item ${isActive ? "active" : ""}`
              }
            >
              <FiAperture size={22} />
              <span>Success Wire</span>
            </NavLink>
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
    </>
  );
};

export default MobileNav;
