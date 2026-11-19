import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/sidebar.css";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";
import carbonBadge from "../assets/carbon-neutral-website-badge.png";
import CarbonPopup from "./CarbonPopup";

const Sidebar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <aside className="sidebar-container">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
      
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/ads">Advertise with us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <div
        className="sidebar-badge"
        onClick={() => setIsPopupOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={carbonBadge}
          alt="Carbon Neutral Website approved by ZC"
          width="200"
          height="45"
        />
      </div>

      <nav className="sidebar-legal">
        <Link to="/terms-of-use">Legal</Link>
        <Link to="/cookies-policy">Cookies</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/accessibility-statement">Accessibility</Link>
      </nav>

      <div className="sidebar-socials">
        <a
          href="https://www.linkedin.com/company/successwikis/about/"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://www.instagram.com/successwikis/"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://youtube.com/@successwikis?si=w3eUKzQ4cQBqLpz0"
          aria-label="youtube"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaYoutube />
        </a>
      </div>

      <div className="sidebar-copyright">
        <p>© {currentYear} Success Wikis.</p>
        <p>All rights reserved.</p>
      </div>

      <CarbonPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </aside>
  );
};

export default Sidebar;
