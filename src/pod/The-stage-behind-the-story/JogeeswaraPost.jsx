import React from 'react';
import PodLayout from '../../components/PodLayout';
import sampleImage from '../../assets/The-stage-behind-the-story/JOG.webp'; 
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';
import { FaLinkedin, FaInstagram, FaEnvelope, FaGlobe, FaBookOpen } from 'react-icons/fa';

const JogeeswaraPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                <a href='https://www.linkedin.com/in/jogeeswara-puvvala-85603b24b'>Jogeeswara</a> didn’t set out with a roadmap. He was simply curious, tinkering with machine learning models, trying to understand how they worked beyond theory. That curiosity eventually led him to connect those models to everyday workflows, like responding to customer queries or handling follow‑ups. Out of those experiments came <a href='https://www.j-agents.in/'>J Agents</a>, a venture focused on building AI systems that take care of repetitive business tasks.
            </p>

            <p>
                The moment it felt real was when one of his early prototypes managed to handle basic queries without much manual effort. Watching it work inside a flow, not just as an isolated model, made him realize this wasn’t just an experiment. It could actually save someone time.
            </p>

            <p>
                From the outside, the journey might look structured. In reality, it was shaped by persistence and small wins. Jogeeswara admits there was no clear plan, just trial, error, and learning from what didn’t work. That willingness to keep building until something useful emerged is what gave J Agents its direction.
            </p>

            <p>
                The problem he’s tackling is significant. Studies show that customer service teams spend up to 40% of their time on repetitive queries, while businesses lose billions annually to inefficiencies in routine workflows. Automating even a fraction of those tasks can free up human effort for higher‑value work. J Agents is designed to step into that gap, building assistants that can handle conversations, follow‑ups, and structured tasks without constant oversight.
            </p>

            <p>
                What makes Jogeeswara stand out is his approach to problem‑solving. He isn’t chasing scale for its own sake. He’s focused on whether the systems he builds are genuinely useful, even if they start small. That mindset reflects his personality: practical, patient, and more interested in impact than appearances.
            </p>

            <p>
                Right now, he’s experimenting with tools for direct‑to‑consumer founders, helping them generate ads, visuals, and weekly posts through structured prompts. It’s a specific, hands‑on attempt to make AI tools simpler and more usable for real business needs.
            </p>

            <p>
                Jogeeswara knows he’s still early in the journey, but he’s clear about what drives him: the satisfaction of building something that actually gets used. For him, the energy comes not from grand visions but from the small, practical wins that prove AI can make everyday work easier. And that’s the direction he’s determined to keep following.
            </p>
            
            <div className="pod-external-links">
                <a href='https://www.linkedin.com/in/jogeeswara-puvvala-85603b24b' target="_blank" rel="noopener noreferrer" className="pod-external-link">
                    <FaLinkedin size={24} color="#0a66c2" /> Jogeeswara's LinkedIn Profile
                </a>
                <a href='https://www.linkedin.com/company/j-agents/' target="_blank" rel="noopener noreferrer" className="pod-external-link">
                    <FaLinkedin size={24} color="#0a66c2" /> J Agents LinkedIn
                </a>
                <a href='https://www.instagram.com/jagents.ai/' target="_blank" rel="noopener noreferrer" className="pod-external-link">
                    <FaInstagram size={24} color="#E1306C" /> J Agents Instagram
                </a>
                <a href='mailto:contact.jagents@gmail.com' className="pod-external-link">
                    <FaEnvelope size={24} color="#D44638" /> contact.jagents@gmail.com
                </a>
                <a href='https://www.j-agents.in/' target="_blank" rel="noopener noreferrer" className="pod-external-link">
                    <FaGlobe size={24} color="#555" /> J Agents Website
                </a>
                <a href='https://www.processmaker.com/blog/repetitive-tasks-at-work-research-and-statistics-2024/' target="_blank" rel="noopener noreferrer" className="pod-external-link">
                    <FaBookOpen size={24} color="#e53935" /> Research Study: Repetitive Tasks at Work
                </a>
            </div>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'The Soldier Who Rewired the Future', link: '/stage-behind-the-story/soldier-rewired' },
        { title: 'The Man Who Builds Schools', link: '/stage-behind-the-story/man-who-builds-schools' },
        { title: 'Raghav Foundation: Building Schools', link: '/driven-by-purpose/raghav-foundation' }
    ];

    return (
        <PodLayout 
            category="The stage behind the story"
            title="When Trial and Error Turns Into Direction"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage} 
        />
    );
};

export default JogeeswaraPost;
