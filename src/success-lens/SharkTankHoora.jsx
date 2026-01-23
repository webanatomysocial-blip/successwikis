import React from 'react';
import BlogLayout from '../components/BlogLayout';
import heroImage from '../assets/success-wire/Shark-tank.jpeg';

const SharkTankHoora = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p className="lead-text">
                Sometimes, the “no” you hear today becomes the story the world celebrates tomorrow.
            </p>
            <p>
                For Hoora, a Nagpur-based startup once turned down on Shark Tank India, that “no” didn’t end the journey — it became the ignition.
            </p>
            <p>
                Today, Hoora has raised ₹5 crore in a seed round from a group of strategic investors — a powerful validation of its vision to build a Vehicle 360° company that reimagines how Indians own, manage, and care for their vehicles.
            </p>
            <p>
                Founded in 2019 by Yashwant Budhwani, Harsh Somani, and Khalid Ansari, Hoora began humbly — as a car wash provider. But behind that simple service was a bigger dream: to simplify vehicle ownership in a country where maintaining, insuring, and managing a vehicle often feels like a maze.
            </p>

            <h2>From Car Washes to Connected Ecosystems</h2>
            <p>
                What started with soap and water has evolved into a comprehensive platform that blends services, products, insurance, and tech into one seamless ecosystem.
            </p>
            <p>
                At the heart of this transformation lies the Hoora Kit — a compact, tech-enabled hardware tool that makes vehicle care smarter, faster, and more sustainable. It’s not just cleaning cars — it’s cleaning up the inefficiencies and waste in an outdated system.
            </p>

            <blockquote className="pod-quote">
                To date, Hoora has logged 20 lakh+ app downloads, reached ₹3 crore in monthly recurring revenue, and saved 6 crore+ liters of water through sustainable practices.
            </blockquote>

            <h2>Building the Vehicle 360° Future</h2>
            <p>
                With this new ₹5 crore funding, Hoora plans to expand into major cities, deploy over 1,000 Hoora Kits, and explore new verticals — including direct-to-consumer products, an automotive accessories marketplace, and insurance solutions.
            </p>
            <p>
                Their vision? To become the go-to platform for every stage of vehicle ownership — from purchase to maintenance to resale — combining digital convenience, clean technology, and sustainability.
            </p>

            <blockquote className="pod-quote">
                “Hoora was founded with a mission to simplify vehicle ownership in India while promoting sustainability and innovation. This fundraise marks a significant step in our journey to make Hoora the go-to platform for every vehicle owner.” — Yashwant Budhwani, CEO of Hoora.
            </blockquote>

            <h2>Why This Matters</h2>
            <p>
                India’s vehicle market is exploding — but so are the pain points of ownership. Fragmented service providers, lack of transparency, environmental waste, and rising maintenance costs make the experience chaotic.
            </p>
            <p>
                Hoora’s approach turns this chaos into clarity. By digitizing, standardizing, and sustainably scaling every part of vehicle care, it’s not just solving problems — it’s redefining expectations.
            </p>

            <h2>Final Thought</h2>
            <p>
                Rejections don’t define startups — reinventions do. Hoora’s journey reminds us that the real fuel behind every venture isn’t capital — it’s conviction. In a world chasing speed, Hoora chose direction. And that may just be what drives the next era of smart, sustainable mobility.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Google to invest $15 billion', link: '/success-wire/google-invest-15-billion-ai' },
        { title: 'From Handmade Roots', link: '/success-wire/handmade-roots-global-movement' }
    ];

    return (
        <BlogLayout 
            category="Success Wire"
            title="Shark Tank Said No, Investors Said Yes: Hoora's Journey"
            image={heroImage}
            content={content}
            recentPosts={recentPosts}
        />
    );
};

export default SharkTankHoora;
