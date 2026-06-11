"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FiLinkedin, FiInstagram, FiArrowLeft, FiInfo } from "react-icons/fi";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/blog-post.css";
import ShareButton from "./ShareButton";
import AudioReader from "./AudioReader";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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
      navigator
        .share(shareData)
        .catch((err) => console.log("Error sharing", err));
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard!");
    }
  };

  const handleGoBack = () => {
    if (
      typeof window !== "undefined" &&
      window.history.state &&
      typeof window.history.state.idx === "number" &&
      window.history.state.idx > 0
    ) {
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
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
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
    <div className="pod-post-page">
      {/* Sticky Scroll Header */}
      <div
        className="pod-sticky-header visible"
        ref={headerRef}
        style={{ top: "80px" }}
      >
        <div className="pod-header-content">
          <div className="pod-header-title">{category} </div>
          <div className="pod-header-actions">
            {/* Social Icons Placeholders */}
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
            <ShareButton url={currentUrl} title={title} />
          </div>
        </div>
        {/* Black Line Progress Bar */}
        <div className="scroll-progress-bar" ref={progressBarRef}></div>
      </div>

      <div className="pod-container">
        {/* Main Content */}
        <div className="pod-main-content">
          <button onClick={handleGoBack} className="go-back-btn">
            <FiArrowLeft size={20} />
            Go Back
          </button>
          {/* Split Header: Title Left, Image Right */}
          <div className="pod-split-header">
            <div className="pod-title-section">
              <h1>{title}</h1>
            </div>
            <div className="pod-hero-img-container">
              <Image
                src={image || "https://via.placeholder.com/1080x600?text=SuccessWikis"}
                alt={title}
                fill
                sizes="(max-width: 1080px) 100vw, 1080px"
                style={{ objectFit: "cover" }}
                priority
                unoptimized={typeof (image || "https://via.placeholder.com/1080x600?text=SuccessWikis") !== "object"}
              />
            </div>
          </div>

          <div className="pod-body" ref={contentBodyRef}>
            {content}
          </div>
        </div>

        {/* Sticky Sidebar */}
        <aside className="pod-sidebar">
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

          <div className="sponsored-card">
            <span className="sponsored-label">
              <FiInfo size={14} /> Sponsored
            </span>
            {sponsoredImage && (
              <a
                href="https://webanatomy.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <Image
                    src={sponsoredImage}
                    alt="Sponsored"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: "cover" }}
                    unoptimized={typeof sponsoredImage !== "object"}
                  />
                </div>
              </a>
            )}
            <div className="sponsored-text">
              <h4>
                Do you run your entire marketing department as one person?
              </h4>
              <p>Call the marketing hotline at MarketingHotline.com</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PodLayout;
