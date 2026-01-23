import React from 'react';
import '../css/get-featured.css'; // We'll create this css file

const GetFeaturedWidget = () => {
    return (
        <div className="get-featured-widget">
            <h3>Have a story to tell? ✨</h3>
            <p>
                Get featured on SuccessWikis — where real journeys of founders, creators, and changemakers are shared. 
                Build credibility, gain SEO-boosting backlinks, and inspire thousands with your story.
            </p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSec1u08PCoUHCZOZOprFHmBZpJ0ExADdcdbXvlZlq-JDCgGVg/viewform" target="_blank" rel="noopener noreferrer" className="featured-btn">
                Apply now to be featured!
            </a>
        </div>
    );
};

export default GetFeaturedWidget;
