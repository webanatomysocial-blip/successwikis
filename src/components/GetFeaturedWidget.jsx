import React from 'react';
import Link from 'next/link';
import '../css/get-featured.css'; // We'll create this css file

const GetFeaturedWidget = () => {
    return (
        <div className="get-featured-widget">
            <h3>Have a story to tell? ✨</h3>
            <p>
                Get featured on SuccessWikis — where real journeys of founders, creators, and changemakers are shared. 
                Build credibility, gain SEO-boosting backlinks, and inspire thousands with your story.
            </p>
            <Link href="/get-featured" className="featured-btn">
                Apply now to be featured!
            </Link>
        </div>
    );
};

export default GetFeaturedWidget;
