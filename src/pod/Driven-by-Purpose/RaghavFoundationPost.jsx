import React from 'react';
import PodLayout from '../../components/PodLayout';
import sampleImage from '../../assets/Driven-by-Purpose/Raghav.png'; 
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

const RaghavFoundationPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                In a nation where quality education is often out of reach, <strong>Raghav Foundation</strong> stands as an unwavering ally as one that empowers educational entrepreneurs to turn dreams into structured, thriving schools.
            </p>

            <h2>From Vision to Blueprint</h2>
            <p>
                Founded with the purpose of providing comprehensive support to every stakeholder in school education, Raghav Foundation brings over <strong>28 years of experience</strong> across academic, administrative, operational, financial and branding. Its mission isn’t vague or distant; it’s rooted in providing solutions to those who build schools: academics, school leaders, parents and teaching professionals.
            </p>

            <h2>Holistic School Setup, Done Right</h2>
            <p>
                Raghav Foundation transforms the abstract dream of a school into a fully operational reality. Their playbook includes:
            </p>
            <ul>
                <li><strong>Planning & Establishment:</strong> Starting with viability studies, SWOT analysis, location assessments and project contracts that set the stage for success</li>
                <li><strong>Operational Launch:</strong> A powerful combination of academic, administrative and financial planning ensures seamless pre-operational launches</li>
                <li><strong>Extended Support Services:</strong> From management support and staff training to franchise models (like Lotus International Academy), mergers & acquisitions, rebranding, affiliation guidance and admissions planning and being their support is end-to-end.</li>
            </ul>
            <p>
                Think of it like constructing the heart of a school—complete and coherent, with no gaps.
            </p>

            <h2>Precision, Planning, Proactive Impact</h2>
            <p>
                What differentiates Raghav Foundation is its <strong>systematic and proactive approach of meticulous</strong> need assessment, planning, evaluation and flawless execution.
            </p>
            <p>
                They detect hurdles before schools face them and adapt quickly by ensuring projects are completed 
                <strong>on time and within budget</strong>, every time.
            </p>

            <h2>Lifting Small Schools with Big Vision</h2>
            <p>
                Beyond business, Raghav Foundation carries a strong philanthropic mission:
                They equip small-budget schools by representing <strong>70% of India’s private education sector</strong> with professional systems and infrastructure that align with the National Education Policy.
            </p>
            <p>
                Their support extends to improving teaching methods, infrastructure, and learning quality. So that even under-resourced schools can impart education with dignity and effectiveness.
            </p>

            <h2>Why This Story Matters</h2>
            <p>
                Until now, stories of educational transformation often begin and end with policies or funding. Raghav Foundation flips the script where it is about <strong>empowering architects of education</strong>, giving them both the tools and the belief to build institutions that last.
            </p>
            <p>
                Because real change doesn’t happen through ambition alone. It needs structure, support and someone who believes in education as a force for equity, not just enterprise.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Zenith Energy – Turning Efficiency Into Legacy', link: '/driven-by-purpose/zenith-energy' },
        { title: 'AEC Sastra: Shaping Global AEC Leaders', link: '/driven-by-purpose/aec-sastra' },
        { title: 'Desi Dips: Authentic Chutneys', link: '/driven-by-purpose/desi-dips' }
    ];

    return (
        <PodLayout 
            category="Driven by Purpose"
            title="Raghav Foundation: Building Schools, Shaping Futures"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage} 
        />
    );
};

export default RaghavFoundationPost;
