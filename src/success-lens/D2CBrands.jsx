import React from 'react';
import BlogLayout from '../components/BlogLayout';
import heroImage from '../assets/success-wire/D2C.png';

const D2CBrands = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p className="lead-text">
                We’ve entered an era where speed defines trust. If you're in Delhi, you can get groceries in 10 minutes—thanks to Blinkit and Zepto.
            </p>
            <p>
                But while these apps have redefined convenience, one segment has been left behind: D2C brands. Click “Buy” on a premium brand ad, and you’re met with a 3–5 day wait. That gap is costing brands conversions.
            </p>
            <blockquote className="pod-quote">
                “Speed isn’t a luxury anymore—it’s a growth lever. We’re not just delivering boxes, we’re delivering conversions, retention, and brand trust.” — Siddharth Batra, Pikndel.
            </blockquote>

            <h2>Enter Pikndel: Speed as a Service</h2>
            <p>
                Founded by Siddharth Batra and Tullika Batra, Pikndel helps D2C brands offer 1-hour, same-day, or next-day delivery—directly through their own websites.
            </p>
            <p>
                Notable clients include Mamaearth, boAt, Bellavita, Uniqlo, and Healthkart. They’ve seen COD success rise from 75% to 90%+ simply by delivering faster.
            </p>

            <h2>Scaling with Depth, Not Haste</h2>
            <p>
                Instead of chasing vanity metrics, Pikndel chose focus. It doubled down on Delhi NCR, improving delivery efficiency and achieving six straight months of profitability.
            </p>
            <p>
                “We didn’t overpromise. We built depth, not noise,” the founders share. Now, with proven economics, Pikndel plans to expand to 11 new cities.
            </p>

            <h2>Final Thought: Speed is Trust</h2>
            <p>
                In a world where Blinkit and Zepto have redefined expectations, speed is no longer optional—it’s emotional. 
                Pikndel is building a bridge between promise and delivery. For D2C brands chasing loyalty, that bridge might just be the missing piece.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'India\'s Deeptech', link: '/success-wire/india-deeptech-talent-patience' },
        { title: 'Zoho\'s Arattai Surge', link: '/success-wire/zoho-arattai-surge' }
    ];

    return (
        <BlogLayout 
            category="Success Wire"
            title="What D2C Brands Can Learn from Blinkit's Speed"
            image={heroImage}
            content={content}
            recentPosts={recentPosts}
        />
    );
};

export default D2CBrands;
