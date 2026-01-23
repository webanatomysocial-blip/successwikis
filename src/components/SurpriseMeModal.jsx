import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { podMetadata } from '../pod/metadata';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import '../css/surprise-me.css';

const SurpriseMeModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [randomPost, setRandomPost] = useState(null);
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const handleOpen = () => {
            const randomIndex = Math.floor(Math.random() * podMetadata.length);
            setRandomPost(podMetadata[randomIndex]);
            setIsOpen(true);
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
                
                <Link to={`/${randomPost.categorySlug}/${randomPost.slug}`} className="surprise-content" onClick={closeExtensions}>
                    <div className="surprise-image-container">
                        <img src={randomPost.image} alt={randomPost.title} />
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
