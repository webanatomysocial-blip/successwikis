import React from 'react';
import BlogLayout from '../components/BlogLayout';
import heroImage from '../assets/success-wire/When-the-World-Tightens.jpeg';

const WorldTightens = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p className="lead-text">
                Global tech is facing a shake-up. With the United States introducing a steep $100,000 fee on H-1B visas, many firms are rethinking where they deploy operations.
            </p>
            <p>
                For decades, Indian talent has powered Silicon Valley’s growth. But as the U.S. tightens its borders, the spotlight is shifting back to India as a frontline hub for innovation.
            </p>

            <h2>India as a Global Hub</h2>
            <p>
                India already hosts ~1,700 Global Capability Centres (GCCs), employing over 1.6 million professionals. These centers are evolving from back-offices to centers where global products are built and strategies shaped.
            </p>

            <blockquote className="pod-quote">
                “The U.S. visa squeeze may look like a roadblock, but for India’s tech ecosystem, it is a door swinging wide open.”
            </blockquote>

            <h2>What This Means for Indian Founders</h2>
            <p>
                <strong>Talent will stay local:</strong> More top-tier talent will build startups in India rather than moving abroad.
            </p>
            <p>
                <strong>Capital will follow talent:</strong> Venture capital will continue to deepen its presence in India to be close to innovation.
            </p>
            <p>
                <strong>Competition will intensify:</strong> Startups will compete with global giants for the same local talent pool.
            </p>

            <h2>Final Thought</h2>
            <p>
                India is no longer simply executing work; it is where the future is being built. The real question is whether we will seize this moment to lead as global innovators.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Amazon Fresh Expands', link: '/success-wire/amazon-fresh-expansion' },
        { title: 'Google to invest $15 billion', link: '/success-wire/google-invest-15-billion-ai' }
    ];

    return (
        <BlogLayout 
            category="Success Wire"
            title="When the World Tightens, India's Tech Founders Step Up"
            image={heroImage}
            content={content}
            recentPosts={recentPosts}
        />
    );
};

export default WorldTightens;
