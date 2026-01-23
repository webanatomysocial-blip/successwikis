import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/blog-post.css";
import carbonBadge from "../assets/carbon-footer.png";
import whiteLogo from "../assets/logo-white.png";

// Import specific icons from react-icons
import { FiFacebook, FiLinkedin, FiInstagram } from "react-icons/fi";
import { RiLinkedinFill, RiInstagramFill } from "react-icons/ri"; // Filled versions (optional)
import { FaLinkedinIn, FaInstagram } from "react-icons/fa"; // Alternative popular ones

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

import sponsoredDefault from "../assets/Sponsored/sponsored-image.jpg";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import Footer from "./Footer";
import "../css/interactive.css";

const PodLayout = ({
  category,
  title,
  content,
  image,
  recentPosts,
  sponsoredImage,
}) => {
  const progressBarRef = useRef(null);
  const headerRef = useRef(null);
  const currentUrl = window.location.href;

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
          <div className="pod-split-header">
            <div className="pod-title-section">
              <h1 className="head-text">{title}</h1>
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
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      currentUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="social-link-header"
                  >
                    <FiFacebook size={24} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      currentUrl
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="social-link-header"
                  >
                    <FiLinkedin size={24} />
                  </a>
                </div>
                <LikeButton postId={title} />
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
              <h3>Recent posts</h3>
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
            <div className="pod-body">{content}</div>
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
