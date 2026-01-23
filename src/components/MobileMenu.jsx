import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/mobile-menu.css";
import { IoClose } from "react-icons/io5";
import { FaChevronRight, FaChevronDown } from "react-icons/fa"; // Icons for arrows
import { podMetadata } from "../pod/metadata";
import sponsoredImg from "../assets/Sponsored/sponsored-image.jpg";

const MobileMenu = ({ isOpen, onClose }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const navigate = useNavigate();

  // Get unique categories
  const categories = [
    "All",
    ...new Set(podMetadata.map((post) => post.category)),
  ];

  if (!isOpen) return null;

  const handleCategoryClick = (category) => {
    // Navigate to home with tab param
    navigate(`/?tab=${encodeURIComponent(category)}`);
    onClose();
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu-container">
        <div className="mobile-menu-header">
          <button
            className="close-menu-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <IoClose />
          </button>
        </div>

        <ul className="mobile-menu-list">
          {/* Categories Dropdown */}
          <li className="mobile-menu-item">
            <button
              className="mobile-menu-link"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
            >
              <span>All Categories</span>
              {isCategoriesOpen ? (
                <FaChevronDown className="menu-arrow" />
              ) : (
                <FaChevronRight className="menu-arrow" />
              )}
            </button>
            <div className={`mobile-submenu ${isCategoriesOpen ? "open" : ""}`}>
              {categories.map((category) => (
                <div key={category} className="mobile-submenu-item">
                  <button
                    className="mobile-submenu-link"
                    onClick={() => handleCategoryClick(category)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      padding: 0,
                    }}
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </li>

          {/* Static Links */}
          <li className="mobile-menu-item">
            <Link
              to="/about"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>About Us</span>
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              to="/ads"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>Ads</span>
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              to="/blogs"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>Blogs</span>
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              to="/events"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>Events</span>
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              to="/contact"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>Advertise With Us</span> {/* Using contact page for now */}
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              to="/contact"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>Publish Your Story</span>
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
        </ul>

        <div
          className="mobile-menu-sponsored"
          style={{ paddingTop: "20px", height: "200px" }}
        >
          <span
            style={{
              display: "block",
              fontSize: "12px",
              color: "#999",
              marginBottom: "5px",
              textAlign: "right",
              textTransform: "uppercase",
            }}
          >
            Sponsored
          </span>
          <a
            href="https://togglenow.com/services/mca-audit-trail/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={sponsoredImg}
              alt="Sponsored"
              style={{
                width: "100%",
                borderRadius: "8px",
                height: "200px",
                objectFit: "cover",
              }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
