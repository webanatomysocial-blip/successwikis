import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLinkedin, FiInstagram, FiArrowLeft } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { podMetadata } from "../pod/metadata.js";
import { blogMetadata } from "../blogs/metadata.js";
import "../css/blog-post.css";

// Import specific icons from react-icons
import { RiLinkedinFill, RiInstagramFill } from "react-icons/ri"; // Filled versions (optional)
import { FaLinkedinIn, FaInstagram } from "react-icons/fa"; // Alternative popular ones

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

import sponsoredDefault from "../assets/Sponsored/sponsored-image.jpg";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import Footer from "./Footer";
import AudioReader from "./AudioReader";
import "../css/interactive.css";

const PodLayout = ({
  category,
  title,
  content,
  image,
  recentPosts,
  sponsoredImage,
  date,
  postId,
}) => {
  const progressBarRef = useRef(null);
  const headerRef = useRef(null);
  const contentBodyRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  // Helper to format date safely
  const formatDate = (dateVal) => {
    if (!dateVal) return null;
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return null;
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return null;
    }
  };

  const formattedDate =
    formatDate(date) ||
    (() => {
      // If date is missing (e.g. from static components), try to find it in metadata
      const meta = [...podMetadata, ...blogMetadata].find(
        (m) =>
          m.title === title ||
          (postId && (m.slug === postId || m.id === postId)) ||
          window.location.pathname.endsWith(m.slug),
      );
      return meta ? formatDate(meta.date) : null;
    })();

  const handleShare = () => {
    const shareData = {
      title: title,
      url: currentUrl,
    };
    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.log("Error sharing", err));
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    // Update currentUrl whenever location changes
    setCurrentUrl(window.location.href);
  }, [location]);

  useEffect(() => {
    // Animate Progress Bar width based on scroll
    gsap.to(progressBarRef.current, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <>
      <div className="pod-post-page">
        {/* Hero Section */}
        <div className="pod-hero-section">
          <button onClick={() => navigate(-1)} className="go-back-btn">
            <FiArrowLeft size={20} />
            Go Back
          </button>
          <div className="pod-split-header">
            <div className="pod-title-section">
              <h1 className="head-text">{title}</h1>
              {formattedDate && (
                <p
                  style={{
                    marginTop: "15px",
                    color: "#666",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                  }}
                >
                  SW Editorial Team • {formattedDate}
                </p>
              )}
            </div>
            <div className="pod-hero-img-container">
              <img src={image} alt={title} />
            </div>
          </div>
        </div>

        {/* Sticky Header */}
        <div className="pod-sticky-header-container" ref={headerRef}>
          <div className="pod-sticky-header">
            <div className="pod-header-content">
              <div className="pod-header-title">
                {category}{" "}
                <span style={{ margin: "0 10px", color: "#ccc" }}>|</span>{" "}
                {title}

              </div>
              <div className="pod-header-actions">
                <div className="social-icons-header">
                  <button
                    onClick={handleShare}
                    aria-label="Share"
                    className="social-link-header"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <FiInstagram size={24} />
                  </button>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      currentUrl,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="social-link-header"
                  >
                    <FiLinkedin size={24} />
                  </a>
                </div>
                <AudioReader contentRef={contentBodyRef} title={title} />
                <LikeButton postId={postId || title} legacyId={title} />
                <ShareButton url={currentUrl} title={title} />
              </div>
            </div>
            <div className="scroll-progress-bar" ref={progressBarRef}></div>
          </div>
        </div>

        {/* Three-Column Layout */}
        <div className="pod-container three-column-layout">
          <aside className="pod-sidebar-left">
            <div className="recent-posts">
              <h3>Recent Stories</h3>
              {recentPosts &&
                recentPosts.map((post, index) => (
                  <a key={index} href={post.link} className="recent-post-item">
                    {post.title}
                    <hr />
                  </a>
                ))}
            </div>
          </aside>

          <div className="pod-main-content">
            <div className="pod-body" ref={contentBodyRef}>{content}</div>
          </div>

          <aside className="pod-sidebar-right">
            <div className="sponsored-card">
              <span className="sponsored-label">Sponsored</span>
              <a
                href="https://togglenow.com/services/mca-audit-trail/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={sponsoredImage || sponsoredDefault} alt="Sponsored" />
              </a>
            </div>
          </aside>
        </div>

        <div className="pod-container">
          <CommentSection postId={title} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PodLayout;
