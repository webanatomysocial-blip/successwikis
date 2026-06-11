import React from 'react';
import BlogPostLayout from '../components/BlogPostLayout';
import sampleImage from '../assets/ze-netzero-badge.png';

const FoundersUnfiltered = () => {
    const content = (
        <>
            <p>
                <strong>Tarini Sai Padmanabhan: Building the Trust Layer of the Internet with Axory AI</strong>
            </p>
            <p>
                In an age where seeing is no longer believing, deepfakes and AI-generated content threaten the very fabric 
                of truth. Tarini Sai Padmanabhan saw this coming and decided to build the shield we all need.
            </p>
            <h2>The Unfiltered Truth</h2>
            <p>
                Building Axory AI wasn't a straight path. It involved sleepless nights, pivoting models, and convincing 
                investors that "truth" is a scalable business.
            </p>
            <p>
                "We aren't just detecting fakes; we are restoring trust," says Tarini.
            </p>
        </>
    );

    const recentPosts = [
        { title: 'Ambition Is Changing — And That’s a Good Thing', link: '#' },
        { title: 'The Fear Every Founder Has (But Nobody Talks About)', link: '#' },
        { title: 'Google to Invest $15 billion in AI hub at Visakhapatnam, its largest India bet yet', link: '#' }
    ];

    return (
        <BlogPostLayout 
            category="Founder's Unfiltered"
            title="Tarini Sai Padmanabhan: Building the Trust Layer"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sampleImage}
        />
    );
};

export default FoundersUnfiltered;
