import React, { useState, useEffect, useRef } from 'react';
import { LuCopy, LuCheck } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

const ShareButton = ({ url, title }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleWhatsApp = () => {
        const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
        window.open(shareUrl, '_blank');
    };

    const handleEmail = () => {
        const subject = encodeURIComponent(title);
        const body = encodeURIComponent(`Check out this story on Success Wikis: ${url}`);
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="share-menu-container" ref={menuRef}>
            <button className="detail-share-btn" onClick={toggleMenu}>
                Share
            </button>
            
            {isOpen && (
                <div className="share-dropdown-menu">
                    <button className="share-menu-item" onClick={handleCopy}>
                        {copied ? <LuCheck size={18} color="#4caf50" /> : <LuCopy size={18} />}
                        <span>{copied ? 'Copied' : 'Copy link'}</span>
                    </button>
                    <button className="share-menu-item" onClick={handleWhatsApp}>
                        <FaWhatsapp size={18} color="#25d366" />
                        <span>WhatsApp</span>
                    </button>
                    <button className="share-menu-item" onClick={handleEmail}>
                        <FiMail size={18} color="#ea4335" />
                        <span>Email</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShareButton;
