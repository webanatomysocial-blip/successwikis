import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLinkedin, FiInstagram, FiArrowLeft } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/blog-post.css";
import carbonBadge from "../assets/carbon-footer.png";
import whiteLogo from "../assets/logo-white.png";

import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import GetFeaturedWidget from "./GetFeaturedWidget";
import ShareButton from "./ShareButton";
import Footer from "./Footer";
import AudioReader from "./AudioReader";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const BlogLayout = ({
  category,
  title,
  content,
  image,
  recentPosts,
  date,
  postId,
}) => {
  const progressBarRef = useRef(null);
  const headerRef = useRef(null);
  const contentBodyRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

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

  const handleGoBack = () => {
    if (window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      if (category === "Success Wire" || window.location.pathname.includes("/success-wire")) {
        navigate("/success-wire");
      } else if (category === "Blog" || window.location.pathname.includes("/blogs")) {
        navigate("/blogs");
      } else if (category) {
        navigate(`/?tab=${encodeURIComponent(category)}`);
      } else {
        navigate("/");
      }
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
          <button onClick={handleGoBack} className="go-back-btn">
            <FiArrowLeft size={20} />
            Go Back
          </button>
          <div className="pod-split-header">
            <div className="pod-title-section">
              <h1 className="head-text">{title}</h1>
              {date && (
                <p style={{ marginTop: '15px', color: '#666', fontSize: '1.1rem', fontWeight: '500' }}>
                  SW Editorial Team • {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
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
            
              </div>
              <div className="pod-header-actions">
                <div className="social-icons-header">
                  <button
                    onClick={handleShare}
                    aria-label="Share"
                    className="social-link-header"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <FiInstagram size={20} />
                  </button>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="social-link-header"
                  >
                    <FiLinkedin size={20} />
                  </a>
                </div>
                <AudioReader contentRef={contentBodyRef} title={title} />
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
            <div className="pod-body" ref={contentBodyRef}>{content}</div>
          </div>

          <aside className="pod-sidebar-right">
            <GetFeaturedWidget />
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogLayout;
