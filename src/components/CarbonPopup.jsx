import React from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import logo from "../assets/ze-netzero-badge.png";
import "../css/carbon-popup.css";
import tree from "../assets/trees.jpg";

const CarbonPopup = ({ isOpen, onClose }) => {
  // List of allowed URLs for redirection to success page
  const allowedUrls = [
    "https://successwikis.com/",
    "https://successwikis.com",
    "http://localhost:5173",
    "http://localhost:5173/",
  ];

  const redirectToZenith = (e) => {
    e.preventDefault();
    // Get the referring URL (current window location in this context)
    const referringUrl = window.location.href;

    // Check if the referring URL starts with any of the allowed URLs
    const isAllowed = allowedUrls.some((url) => referringUrl.startsWith(url));

    // Redirect to success or fail page based on the check
    if (isAllowed) {
      window.location.href = "https://zenithenergy.com/success";
    } else {
      window.location.href = "https://zenithenergy.com/fail";
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="carbon-popup-overlay" onClick={onClose}>
      <div
        className="carbon-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="carbon-close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>

        <div className="carbon-popup-image">
          {/* Placeholder for the trees image from the screenshot */}
          <img
            src={tree}
            alt="Trees planted"
            width="400"
            height="250"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>

        <div className="carbon-text-content">
          <h2>This Website is Net Zero Aligned</h2>
          <p>
            These trees are planted to offset the CO2 emissions of the website
            <a
              href="https://successwikis.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              https://successwikis.com
            </a>{" "}
            & is Verified by{" "}
            <span className="highlight-red">Zenith Energy</span>
            <br />
            Let's make the Internet CO2 neutral!
          </p>

          <div className="click-verify">
            Click the badge to verify <MdVerified className="verify-icon" />
          </div>

          <a
            href="#"
            onClick={redirectToZenith}
            className="carbon-badge-large"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logo}
              alt="Carbon Neutral Website"
              width="200"
              height="44"
            />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CarbonPopup;
