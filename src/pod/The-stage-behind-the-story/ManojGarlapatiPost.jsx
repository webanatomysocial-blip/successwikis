import React from 'react';
import PodLayout from '../../components/PodLayout';
import sampleImage from '../../assets/The-stage-behind-the-story/Manoj.webp';
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';
import { FaLinkedin, FaGlobe, FaNewspaper } from 'react-icons/fa';

const ManojGarlapatiPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                <a target="_blank" href=' https://www.linkedin.com/in/manoj-garlapati-878632226'>Manoj Garlapati</a> wasn’t your typical startup founder with a grand plan. He was simply someone who couldn’t stop noticing a problem.
            </p>

            <p>
                Everywhere he looked, the hiring process seemed broken. Employers were overwhelmed by hundreds of applications yet still struggled to identify the right fit. Job seekers, on the other hand, sent out resumes endlessly with little response. A global survey shows that nearly 75% of employers report difficulty finding qualified candidates, while job seekers often apply to dozens of roles before hearing back. The mismatch was glaring: talent was available, but opportunity wasn’t connecting.
            </p>

            <p>
                That observation became the foundation of <a target="_blank" href=''>Aspivance</a>, a platform designed to simplify hiring by enabling organizations to efficiently discover, evaluate, and hire the right candidates, while giving job seekers a way to showcase their abilities and connect with meaningful opportunities. Instead of focusing on resumes alone, Aspivance emphasizes skills and potential, a shift that reflects how modern workforces are evolving.
            </p>

            <p>
                One moment of doubt came during the early stages when Manoj realized how complex the hiring ecosystem actually is. Building trust between employers and candidates is not easy, and there were times he questioned whether a new platform could truly make a difference. But every time he spoke to people facing the same hiring challenges, it reassured him that the problem was real and worth solving.
            </p>

            <p>
                Before starting Aspivance, Manoj worked as a Product Analyst for three years, gaining strong experience in understanding user behavior, product strategy, and problem‑solving. His professional journey involved working closely with customers and businesses, which shaped his entrepreneurial mindset. Outside of work, writing quotes has always been his favorite hobby, a way to reflect, stay creative, and express ideas that inspire both himself and others.
            </p>

            <p>
                The journey has been far from linear. Manoj describes it as trial and error, learning by doing, and slowly shaping direction from feedback rather than a polished roadmap. What often surprises people is that Aspivance didn’t begin with a business plan. It began with listening. That willingness to step into uncertainty is what turned him from professional to founder.
            </p>

            <p>
                He also points out a reality that few talk about: the mental challenge of building something from scratch. Uncertainty, self‑doubt, and constant problem‑solving are part of the daily routine. Yet those same challenges have taught him resilience and reinforced his belief in the mission.
            </p>

            <p>
                Today, Manoj is focused on refining Aspivance with early users, building a reliable ecosystem where employers can find talent efficiently and candidates can connect with meaningful opportunities. His vision is simple but ambitious: hiring should be based on skills and potential, not just background or connections. And as he continues to build, he carries with him the same persistence that shaped his journey,the habit of paying attention, and the belief that even small, thoughtful solutions can change how people work and hire.
            </p>

            <div className="pod-external-links">
                <a href='https://www.linkedin.com/in/manoj-garlapati-878632226' target="_blank" rel="noopener noreferrer" className="pod-external-link">
                    <FaLinkedin size={24} color="#0a66c2" /> LinkedIn Profile
                </a>
                <a href='https://manojgarlapati.github.io/aspivance_final/c' target="_blank" rel="noopener noreferrer" className="pod-external-link">
                    <FaGlobe size={24} color="#555" /> Company Website
                </a>
                <a href='https://www.hcamag.com/asia/news/general/3-in-4-organisations-worldwide-struggling-to-find-skilled-talent/483220' target="_blank" rel="noopener noreferrer" className="pod-external-link">
                    <FaNewspaper size={24} color="#e53935" /> Related Article: Worldwide Struggle to Find Skilled Talent
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
            title="Manoj Garlapati Wasn’t Planning to Build a Startup. He Was Just Paying Attention"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage}
        />
    );
};

export default ManojGarlapatiPost;
