"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiLinkedin, FiInstagram, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/blog-post.css'; // Reusing base styles
import carbonBadge from '../assets/carbon-footer.png';
import whiteLogo from '../assets/logo-white.png';
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import ShareButton from './ShareButton';
import CommentSection from './CommentSection';
import Footer from './Footer';
import AudioReader from './AudioReader';
import '../css/interactive.css';
import sponsoredDefault from '../assets/Sponsored/sponsored-image.jpg';

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EventLayout = ({ category, title, content, image, sponsoredImage, date }) => {
    const progressBarRef = useRef(null);
    const headerRef = useRef(null);
    const contentBodyRef = useRef(null);
    const pathname = usePathname();
    const router = useRouter();
    const [currentUrl, setCurrentUrl] = useState("");

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
            router.back();
        } else {
            if (category === "Success Wire" || pathname.includes("/success-wire")) {
                router.push("/success-wire");
            } else if (category === "Blog" || pathname.includes("/blogs")) {
                router.push("/blogs");
            } else if (category === "Events" || pathname.includes("/events")) {
                router.push("/events");
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
            width: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3
            }
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
                            <h1 className='head-text'>{title}</h1>
                            {date && (
                                <p style={{ marginTop: '15px', color: '#666', fontSize: '1.1rem', fontWeight: '500' }}>
                                    SW Editorial Team • {date}
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
                            <div className="pod-header-title">
                                {category}

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
                                        <FiLinkedin size={20}/>
                                    </a>
                                </div>
                                <AudioReader contentRef={contentBodyRef} title={title} />
                                <ShareButton url={currentUrl} title={title} />
                            </div>
                        </div>
                        <div className="scroll-progress-bar" ref={progressBarRef}></div>
                    </div>
                </div>

                {/* Two-Column Layout (No Recent Posts) */}
                {/* Two-Column Layout (No Recent Posts) */}
                <div className="pod-container two-column-layout">
                    <div className="pod-main-content">
                        <div className="pod-body" ref={contentBodyRef}>
                            {content}
                        </div>
                    </div>

                    <aside className="pod-sidebar-right">
                        <div className="sponsored-card">
                            <span className="sponsored-label">Sponsored</span>
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
                        </div>
                    </aside>
                </div>

                <div className="pod-container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 40px 60px' }}>
                    <CommentSection postId={title} />
                </div>
            </div>

            <Footer />
        </>
    );
};

export default EventLayout;
