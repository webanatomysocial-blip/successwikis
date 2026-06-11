"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiLinkedin, FiInstagram, FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
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

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const pathname = usePathname();
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [pathname]);

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

  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      if (category === "Success Wire" || pathname.includes("/success-wire")) {
        router.push("/success-wire");
      } else if (category === "Blog" || pathname.includes("/blogs")) {
        router.push("/blogs");
      } else if (category) {
        router.push(`/?tab=${encodeURIComponent(category)}`);
      } else {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    // Update currentUrl whenever location changes
    setCurrentUrl(window.location.href);
  }, [pathname]);

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
          <button onClick={handleBackClick} className="go-back-btn">
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
                <Image
                  src={image || whiteLogo}
                  alt={title}
                  fill
                  sizes="(max-width: 1080px) 100vw, 1080px"
                  style={{ objectFit: 'cover' }}
                  priority
                  unoptimized={typeof (image || whiteLogo) !== 'object'}
                />
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
