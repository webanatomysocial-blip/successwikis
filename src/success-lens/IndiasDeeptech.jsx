import React from 'react';
import BlogLayout from '../components/BlogLayout';
import heroImage from '../assets/success-wire/India’s-Deeptech.png';

const IndiasDeeptech = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p className="lead-text">
                India’s deeptech ecosystem is brimming with potential—but unlocking it won’t be instant.
            </p>
            <p>
                At the inaugural Prosus Luminate event, entrepreneurs Kunal Shah, Mukesh Bansal, and Shradha Sharma explored how the country’s real advantage lies in compounding talent, ideas, and markets.
            </p>
            <p>
                From artificial intelligence to quantum computing, robotics, space tech, and biotech, India is nurturing nearly 4,000 deeptech startups. Global VC attention is following: cumulative investments hit $590 billion in 2023.
            </p>
            <blockquote className="pod-quote">
                “The new order of the global economy will be decided by code, capital, and conviction. India will deliver on this promise—but when depends on its entrepreneurs and innovators.” — Ashutosh Sharma, Prosus.
            </blockquote>

            <h2>What’s Holding India Back?</h2>
            <p>
                Panelists tackled this head-on. Shradha Sharma pointed out that despite landmark moves like the IndiaAI Mission, India still lags in the global deeptech race.
            </p>
            <p>
                Mukesh Bansal agreed: “OpenAI began in 2015. GPT breakthroughs happened in 2021. If India had focused on deeptech earlier, we might be closer to the frontlines today.”
            </p>
            <p>
                Yet both founders remain optimistic. India has one-fourth of the world’s AI engineers and chip designers. The challenge isn’t talent—it’s creating supportive ecosystems.
            </p>

            <h2>Is Funding the Real Problem?</h2>
            <p>
                Funding is growing: Indian deeptech startups raised $1.6 billion in 2024. However, Mukesh Bansal highlighted a bigger issue: early-stage funding is available, but sustaining Series B and C rounds remains a challenge.
            </p>

            <h2>Longevity Over Short-Term Growth</h2>
            <p>
                The discussion shifted to staying power. Kunal Shah reminded the audience that true lasting impact comes from profit and longevity, not just valuations.
            </p>
            <blockquote className="pod-quote">
                “We need to celebrate $1 billion in profit, not just revenue or funding. Longevity is the real measure of success.” — Mukesh Bansal.
            </blockquote>

            <h2>Final Thought</h2>
            <p>
                India’s deeptech journey isn’t about rushing—it’s about building the right foundations, nurturing talent, and letting ideas grow. Success comes from execution, persistence, and patience.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'From Hype to Habit', link: '/success-wire/hype-to-habit-new-normal' },
        { title: 'What D2C Brands Can Learn', link: '/success-wire/d2c-brands-learn-blinkit' }
    ];

    return (
        <BlogLayout 
            category="Success Wire"
            title="India's Deeptech : How Talent and Patience Can Drive Growth"
            image={heroImage}
            content={content}
            recentPosts={recentPosts}
        />
    );
};

export default IndiasDeeptech;
