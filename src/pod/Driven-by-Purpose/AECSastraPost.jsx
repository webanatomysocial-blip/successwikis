import React from 'react';
import PodLayout from '../../components/PodLayout';
import sampleImage from '../../assets/Driven-by-Purpose/AEC-1.png'; 
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

const AECSastraPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                When <strong>AEC Sastra</strong> emerged from the roots of bimgrafX Academy, it did not just change a name it also ignited a mission: guiding architects, engineers and designers toward future-ready, globally certified careers in the AEC (Architecture, Engineering & Construction) industry.
            </p>

            <h2>From Academy to Industry-Aligned Impact</h2>
            <p>
                Born from bimgrafX Academy’s foundation, AEC Sastra carries forward a legacy of practical skill-building. As the education partner of bimgrafX, it now delivers impactful, industry-relevant training.
            </p>

            <h2>Built around Real Needs, With Global Reach</h2>
            <p>
                What does AEC Sastra do and why does it matter?
            </p>
            <ul>
                <li>Offers hands-on training in Building Information Modelling (BIM) tools used daily by global AEC firms</li>
                <li>Blends technical foundation with soft skills and industry knowledge to shape fully-rounded professionals</li>
                <li>Leverages trainers with 25+ years of experience in major global projects to bring classroom learning alive</li>
                <li>Empowers students to become global leaders as certified professionals now leading innovation across 10+ countries</li>
                <li>Grounds learning in reality, enabling students to confidently tackle live projects with true industry application</li>
                <li>Offers ongoing mentorship and resources long after classes end, ensuring skills stay sharp and relevant</li>
                <li>Has transformed over 90,000 careers across multiple continents.</li>
            </ul>

            <h2>Innovation on the Foundation of Experience</h2>
            <p>
                At its core, AEC Sastra isn’t about credentials, it’s about transformation. It gives engineers and architects tools to shift mindsets, master new technologies and practice design with confidence skills no textbook can truly teach.
            </p>

            <h2>Why This Story Matters</h2>
            <p>
                In a world racing to adopt tech-first solutions, AEC Sastra is quietly shaping the professionals who will build tomorrow. They are not just learning BIM; they’re becoming the bridge between design intent and global delivery.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Raghav Foundation: Building Schools', link: '/driven-by-purpose/raghav-foundation' },
        { title: 'Zenith Energy – Turning Efficiency Into Legacy', link: '/driven-by-purpose/zenith-energy' },
        { title: 'Desi Dips: Authentic Chutneys', link: '/driven-by-purpose/desi-dips' }
    ];

    return (
        <PodLayout 
            category="Driven by Purpose"
            title="AEC Sastra: Shaping Global AEC Leaders"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage} 
        />
    );
};

export default AECSastraPost;
