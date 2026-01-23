import React from 'react';
import PodLayout from '../../components/PodLayout';
import sampleImage from '../../assets/Driven-by-Purpose/zenith.png'; 
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

const ZenithEnergyPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                In a world where climate change, rising energy costs, and tightening regulations are reshaping the way businesses operate, <strong>Zenith Energy</strong> stands as a force of transformation. Their mission is deceptively simple — help businesses use less energy, more intelligently. But in practice, it’s a deeply layered journey that blends engineering precision, environmental responsibility, and long-term strategic thinking.
            </p>
            <p>
                For over three decades, Zenith worked as a consulting firm, conducting thousands of energy audits across sectors — from government institutions to manufacturing plants, hospitals, and industrial parks. But over time, they saw a frustrating pattern: companies struggled to implement the very solutions that could save them money and reduce their carbon footprint.
            </p>
            <p>
                It was a turning point. The team realised they could no longer be just advisers on the sidelines. They had to step into the arena — not only identifying inefficiencies but also owning the journey of change alongside their clients.
            </p>
            <p>
                Today, Zenith is more than a consultancy. They are strategic partners, guiding businesses through audits, sustainable system design, carbon accounting, and implementation of clean energy solutions. They’ve saved organisations tens of crores in costs and reduced emissions equivalent to planting hundreds of thousands of trees. More importantly, they’ve shifted mindsets — helping companies evolve from ticking compliance boxes to becoming climate-responsible leaders.
            </p>
            <p>
                What sets them apart is their end-to-end approach. Many in the industry focus on one slice of the sustainability puzzle, but Zenith brings together energy efficiency, renewable energy, and climate change services under one roof — building practical, tailored roadmaps to net zero without disrupting operations.
            </p>

            <blockquote className="pod-quote">
                The founder’s philosophy is clear: “Real impact doesn’t come from advice — it comes from action.”
            </blockquote>

            <p>
                It’s why their work doesn’t stop at reports. They train teams, monitor results, and adapt strategies to keep clients ahead of both risks and opportunities.
            </p>
            <p>
                For them, success has evolved. It’s no longer about delivering a project; it’s about leaving behind systems, relationships, and cultural shifts that last long after the contract ends. From small housing societies to large industrial players, Zenith proves that sustainability can be accessible, achievable, and profitable for all.
            </p>
            <p>
                Their story is proof that change doesn’t start with grand gestures. It starts with showing up, doing the work, and walking every step of the path toward a cleaner, smarter, and more resilient future.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Raghav Foundation: Building Schools', link: '/driven-by-purpose/raghav-foundation' },
        { title: 'AEC Sastra: Shaping Global AEC Leaders', link: '/driven-by-purpose/aec-sastra' },
        { title: 'Desi Dips: Authentic Chutneys', link: '/driven-by-purpose/desi-dips' }
    ];

    return (
        <PodLayout 
            category="Driven by Purpose"
            title="Zenith Energy – Turning Efficiency Into Legacy"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage} 
        />
    );
};

export default ZenithEnergyPost;
