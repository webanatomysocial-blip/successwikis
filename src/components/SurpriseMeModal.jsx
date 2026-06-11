"use client";

import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { podMetadata } from '../pod/metadata';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import '../css/surprise-me.css';
import { getApiBaseUrl } from '../lib/api';

const SurpriseMeModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [randomPost, setRandomPost] = useState(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const handleOpen = async () => {
            let combinedPosts = [...podMetadata];

            try {
                const apiBaseURL = getApiBaseUrl();
                const res = await fetch(`${apiBaseURL}/api/posts.php`);
                const data = await res.json();
                if (data.status === "success") {
                    const mapped = data.data
                        .filter(dbPost =>
                            [
                                "pod",
                                "driven_by_purpose",
                                "founders_unfiltered",
                                "stage_behind_story",
                            ].includes(dbPost.post_type)
                        )
                        .map(dbPost => {
                             let category = dbPost.category || "Pod";
                             let categorySlug = "pod";

                             if (dbPost.post_type === "driven_by_purpose") {
                                 category = "Driven by Purpose";
                                 categorySlug = "driven-by-purpose";
                             } else if (dbPost.post_type === "founders_unfiltered") {
                                 category = "Founder's Unfiltered";
                                 categorySlug = "founders-unfiltered";
                             } else if (dbPost.post_type === "stage_behind_story") {
                                 category = "The Stage Behind the Story";
                                 categorySlug = "stage-behind-the-story";
                             }

                             return {
                                 id: `dynamic-${dbPost.id}`,
                                 title: dbPost.outer_heading || dbPost.title,
                                 slug: dbPost.slug,
                                 image: dbPost.image_url,
                                 category: category,
                                 categorySlug: categorySlug,
                                 description: dbPost.meta_description || dbPost.excerpt,
                                 isDynamic: true
                             };
                        });
                    combinedPosts = [...combinedPosts, ...mapped];
                }
            } catch (err) {
                console.error("Failed to fetch dynamic pods in SurpriseMeModal", err);
            }

            if (combinedPosts.length > 0) {
                const randomIndex = Math.floor(Math.random() * combinedPosts.length);
                setRandomPost(combinedPosts[randomIndex]);
                setIsOpen(true);
            }
        };

        window.addEventListener('openSurpriseMe', handleOpen);
        return () => window.removeEventListener('openSurpriseMe', handleOpen);
    }, []);

    useEffect(() => {
        if (isOpen) {
            gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalRef.current, 
                { scale: 0.8, opacity: 0, y: 20 }, 
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
            );
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const closeExtensions = () => {
        gsap.to(modalRef.current, { scale: 0.8, opacity: 0, y: 20, duration: 0.3, ease: 'power2.in', onComplete: () => setIsOpen(false) });
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    };

    if (!isOpen || !randomPost) return null;

    return (
        <div className="surprise-overlay" ref={overlayRef} onClick={closeExtensions}>
            <div className="surprise-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <button className="surprise-close" onClick={closeExtensions}>
                    <IoClose size={24} />
                </button>
                
                <Link href={`/${randomPost.categorySlug}/${randomPost.slug}`} className="surprise-content" onClick={closeExtensions}>
                    <div className="surprise-image-container" style={{ position: "relative" }}>
                        <Image
                            src={randomPost.image}
                            alt={randomPost.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            style={{ objectFit: "cover" }}
                            unoptimized
                        />
                    </div>
                    <div className="surprise-info">
                        <h2 className="surprise-title">{randomPost.title}</h2>
                        <p className="surprise-description">
                            {randomPost.description ? 
                                (randomPost.description.length > 180 ? 
                                    randomPost.description.substring(0, 180) + '...' : 
                                    randomPost.description) : 
                                "Discover this amazing story on Success Wikis. Click to read the full journey and get inspired."
                            }
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default SurpriseMeModal;
