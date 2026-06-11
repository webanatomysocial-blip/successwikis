"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FiLinkedin, FiInstagram, FiArrowLeft, FiInfo } from "react-icons/fi";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { podMetadata } from "../pod/metadata.js";
import { blogMetadata } from "../blogs/metadata.js";
import "../css/blog-post.css";

// Import specific icons from react-icons
import { RiLinkedinFill, RiInstagramFill } from "react-icons/ri"; // Filled versions (optional)
import { FaLinkedinIn, FaInstagram } from "react-icons/fa"; // Alternative popular ones

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const pathname = usePathname();
  const router = useRouter();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [pathname]);

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
      navigator
        .share(shareData)
        .catch((err) => console.log("Error sharing", err));
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleBackClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback redirection based on post category
      const catLower = category?.toLowerCase();
      if (catLower?.includes("success wire") || catLower?.includes("lens")) {
        router.push("/success-wire");
      } else if (catLower?.includes("blog")) {
        router.push("/blogs");
      } else if (category && category !== "Pod") {
        router.push(`/?tab=${encodeURIComponent(category)}`);
      } else {
        router.push("/");
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
          <button onClick={handleBackClick} className="go-back-btn">
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
              <Image
                src={image || "https://via.placeholder.com/1080x600?text=SuccessWikis"}
                alt={title}
                fill
                sizes="(max-width: 1080px) 100vw, 1080px"
                style={{ objectFit: 'cover' }}
                priority
                unoptimized={typeof (image || "https://via.placeholder.com/1080x600?text=SuccessWikis") !== 'object'}
              />
            </div>
          </div>
        </div>

        {/* Sticky Header */}
        <div className="pod-sticky-header-container" ref={headerRef}>
          <div className="pod-sticky-header">
            <div className="pod-header-content">
              <div className="pod-header-title">{category}</div>
              <div className="pod-header-actions">
                <div className="social-icons-header">
                  <button
                    onClick={handleShare}
                    aria-label="Share"
                    className="social-link-header"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <FiInstagram size={20} />
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
                    <FiLinkedin size={20} />
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
            <div className="pod-body" ref={contentBodyRef}>
              {content}
            </div>
          </div>

          <aside className="pod-sidebar-right">
            <div className="sponsored-card">
              <span className="sponsored-label">
                <FiInfo size={14} /> Sponsored
              </span>
              <a
                href="https://webanatomy.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <Image
                    src={sponsoredImage || sponsoredDefault}
                    alt="Sponsored"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: 'cover' }}
                    unoptimized={typeof (sponsoredImage || sponsoredDefault) !== 'object'}
                  />
                </div>
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
