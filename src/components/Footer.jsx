"use client";

import React from "react";
import Link from "next/link";
import "../css/blog-post.css"; // Using the styles that match this footer structure
import whiteLogo from "../assets/logo-white.png";
import carbonBadge from "../assets/carbon-footer.png";
import Image from "next/image";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import CarbonPopup from "./CarbonPopup";
import { useState } from "react";

const Footer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left: Logo + Social Icons */}
        <div className="footer-left">
          <div className="logo-section">
            <Image
              src={whiteLogo}
              alt="Success Wikis Logo"
              className="footer-logo-img"
              width={168}
              height={55}
            />
          </div>

          <div className="social-icons">
            <a
              href="https://www.linkedin.com/company/successwikis/about/"
              aria-label="LinkedIn"
              className="social-link"
            >
              <FaLinkedinIn size={24} color="white" />
            </a>
            <a
              href="https://www.instagram.com/successwikis/"
              aria-label="Instagram"
              className="social-link"
            >
              <FaInstagram size={24} color="white" />
            </a>
          </div>
        </div>

        {/* Right: Carbon Badge */}
        <div
          className="footer-right"
          onClick={() => setIsPopupOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <Image
            src={carbonBadge}
            alt="Carbon-Neutral Website"
            width={250}
            height={55}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Bottom Links */}
      <div className="footer-bottom">
        <div className="footer-links">
          <Link href="/terms-of-use" className="footer-link">
            Legal
          </Link>
          <Link href="/cookies-policy" className="footer-link">
            Cookies
          </Link>
          <Link href="/about" className="footer-link">
            About
          </Link>
          <Link href="/privacy-policy" className="footer-link">
            Privacy policy
          </Link>
          <Link href="/accessibility-statement" className="footer-link">
            Accessibility
          </Link>
        </div>
        <p className="copyright">
          © {currentYear} Success Wikis All rights reserved
        </p>
      </div>
      <CarbonPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </footer>
  );
};

export default Footer;
