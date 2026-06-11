"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../css/mobile-menu.css";
import { IoClose } from "react-icons/io5";
import { FaChevronRight, FaChevronDown } from "react-icons/fa"; // Icons for arrows
import { FiInfo } from "react-icons/fi";
import { podMetadata } from "../pod/metadata";
import sponsoredImg from "../assets/Sponsored/sponsored-image.jpg";

const MobileMenu = ({ isOpen, onClose }) => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const router = useRouter();

  // Get unique categories
  const categories = [
    "All",
    ...new Set(podMetadata.map((post) => post.category)),
  ];

  if (!isOpen) return null;

  const handleCategoryClick = (category) => {
    // Navigate to home with tab param
    router.push(`/?tab=${encodeURIComponent(category)}`);
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
              href="/about"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>About Us</span>
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              href="/ads"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>Ads</span>
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              href="/blogs"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>Blogs</span>
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              href="/events"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>Events</span>
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              href="/contact"
              className="mobile-menu-link"
              onClick={handleLinkClick}
            >
              <span>Advertise With Us</span> {/* Using contact page for now */}
              <FaChevronRight className="menu-arrow" />
            </Link>
          </li>
          <li className="mobile-menu-item">
            <Link
              href="/contact"
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
          <span className="sponsored-label" title="This content is promoted by a sponsor.">
            <FiInfo size={14} /> Sponsored
          </span>
          <a
            href="https://webanatomy.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <Image
                src={sponsoredImg}
                alt="Sponsored"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                style={{ objectFit: 'cover' }}
                unoptimized={typeof sponsoredImg !== 'object'}
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
