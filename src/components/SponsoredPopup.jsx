import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiX, FiInfo } from "react-icons/fi";
import sponsoredDefault from "../assets/Sponsored/sponsored-image.jpg";

const SponsoredPopup = ({ sponsoredImage }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const imgSrc = sponsoredImage || sponsoredDefault;

  useEffect(() => {
    // Only show on mobile
    if (window.innerWidth > 768) return;

    // Show popup with a slight delay every time the route changes
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleClose = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className="sp-overlay" onClick={handleClose}>
      <div
        className="sp-popup"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="sp-close" onClick={handleClose} aria-label="Close">
          <FiX size={20} />
        </button>

        <span className="sp-label">
          <FiInfo size={13} /> Sponsored
        </span>

        <a
          href="https://webanatomy.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="sp-img-link"
        >
          <img src={imgSrc} alt="Sponsored" className="sp-img" />
        </a>

    
      </div>
    </div>
  );
};

export default SponsoredPopup;
