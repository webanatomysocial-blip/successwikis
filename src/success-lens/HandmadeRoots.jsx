import React from 'react';
import BlogLayout from '../components/BlogLayout';
import heroImage from '../assets/success-wire/taavi.jpeg';

const HandmadeRoots = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p className="lead-text">
                There's something quietly powerful about what Taavi is doing. In a world racing toward fast fashion, Taavi took a step back — to remember, to preserve, and to reimagine.
            </p>
            <p>
                Born out of Myntra’s initiative, Taavi isn’t just another clothing brand. It’s a movement that bridges India’s ancient handloom traditions with today’s modern aesthetics. It’s where the artistry of local weavers meets the taste of a global, fashion-forward audience.
            </p>
            <p>
                For years, handloom work has lived in the shadows — seen as beautiful but not always “practical” or “scalable.” But Taavi saw potential where others saw limitations. They didn’t just want to sell clothes; they wanted to tell stories — of artisans, of craft, of cultural identity.
            </p>

            <h2>The Craft Behind the Clothes</h2>
            <p>
                Each Taavi piece carries a bit of India’s textile soul. The brand partners with artisans across the country, working with natural dyes, organic fabrics, and traditional weaving techniques. But what makes it stand out is how it blends heritage with modernity.
            </p>
            <p>
                Instead of treating handloom as something “old,” Taavi places it in the now — pairing traditional fabrics with contemporary cuts, everyday comfort, and urban sensibilities. It’s not nostalgia. It’s evolution.
            </p>

            <h2>The Business Behind the Beauty</h2>
            <p>
                Taavi’s success isn’t just emotional — it’s strategic. By building a brand around purpose, Myntra tapped into a growing market for ethical and conscious fashion. In a space dominated by speed, Taavi slows down the narrative — and paradoxically, that’s what’s helping it scale.
            </p>
            <blockquote className="pod-quote">
                Its products aren’t mass-produced; they’re crafted. Its artisans aren’re laborers; they’re partners. And its mission isn’t just profit; it’s preservation with progress.
            </blockquote>

            <h2>The Larger Cultural Shift</h2>
            <p>
                What’s happening with Taavi reflects a larger movement in India’s creative economy — one where tradition is no longer seen as a limitation but a strategic advantage. As global fashion houses chase “authenticity,” Indian brands like Taavi already own it. 
            </p>
            <p>
                They’re proving that the future of design doesn’t lie in imitation, but in integration — where heritage crafts meet modern lifestyles. This intersection of storytelling, sustainability, and scalability is giving rise to a new blueprint for purpose-led brands.
            </p>

            <h2>Final Thought</h2>
            <p>
                Taavi isn’t just weaving fabric — it’s weaving meaning. In every thread lies a story of resilience, heritage, and reinvention. And maybe that’s the future of fashion — not just what we wear, but what we choose to stand for.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Shark Tank Said No', link: '/success-wire/shark-tank-hoora-success' },
        { title: 'From Hype to Habit', link: '/success-wire/hype-to-habit-new-normal' }
    ];

    return (
        <BlogLayout 
            category="Success Wire"
            title="From Handmade Roots to a Global Movement: Taavi"
            image={heroImage}
            content={content}
            recentPosts={recentPosts}
        />
    );
};

export default HandmadeRoots;
