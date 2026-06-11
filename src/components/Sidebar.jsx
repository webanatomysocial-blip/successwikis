"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../css/sidebar.css";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa6";
import logo from "../assets/ze-netzero-badge.png";
import CarbonPopup from "./CarbonPopup";

import Image from "next/image";

const Sidebar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <aside className="sidebar-container">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
      
          <li>
            <Link href="/blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/ads">Advertise with us</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <div
        className="sidebar-badge"
        onClick={() => setIsPopupOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <Image src={logo} alt="Carbon Neutral Badge" width={200} height={44} />
      </div>

      <nav className="sidebar-legal">
        <Link href="/terms-of-use">Legal</Link>
        <Link href="/cookies-policy">Cookies</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/accessibility-statement">Accessibility</Link>
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
