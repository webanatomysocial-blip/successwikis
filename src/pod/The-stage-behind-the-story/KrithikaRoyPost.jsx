import React from 'react';
import PodLayout from '../../components/PodLayout';
import krithikaImg from '../../assets/The-stage-behind-the-story/Krithika.jpeg';
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

const KrithikaRoyPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                For many students, college is a time to explore ideas. For <a target="_blank" href='http://linkedin.com/in/krithika-roy-aa8013378'>Krithika Roy</a>, it became the launchpad for a startup that blends design and fitness. As a college student and entrepreneur, she envisions a platform where creative minds can work freely anytime, anywhere, without the constraints of travel, fixed schedules, or hierarchical bosses. Her mission is to enable flexible, independent careers by merging creativity with wellness. The goal is not to reinforce a 9-to-6 mindset but to cultivate an entrepreneurial one, drawing perspectives from Millennials to Gen Alpha to create something futuristic and adaptable to the evolving world.
            </p>

            <h2>A Foundation Built on Family and Design</h2>
            <p>
                Krithika’s journey began with her father’s influence. A Fine Arts student with a design background, he nurtured her creativity from childhood. That early exposure shaped her passion and eventually inspired her to pursue design academically. Studying the same field in college strengthened her foundation and gave her the confidence to build something of her own. With support at home and a clear vision, she began working on immersive design solutions that integrate AI and machine learning, positioning her company to serve startups, multinational corporations, and creative enterprises. The blend of personal inspiration and academic grounding gave her venture both authenticity and technical depth.
            </p>

            <h2>The First Signs of Validation</h2>
            <p>
                Every entrepreneur has a moment when an idea shifts from dream to reality. For Krithika Roy, it was the rapid growth of AI and design innovation. When she approached potential clients with her concepts, their positive responses validated the vision. The appreciation for immersive solutions confirmed that there was demand for what she was building. This early traction provided the confidence to move forward, reinforcing the belief that design, when combined with technology, could deliver meaningful impact across industries.
            </p>

            <h2>Naming the Mission</h2>
            <p>
                One of the more surprising aspects of her journey was how the company’s name and mission came to life. Her father often spoke about how trends constantly questioned his relevance in the market, pushing him to keep learning and evolving. That thought resonated deeply. In every industry, professionals face the same question: how relevant are you today? This became the core of the company’s philosophy: continuous growth, staying relevant, and evolving with time. The name <a target="_blank" href='https://realivant.com/'>“Realivant”</a> reflects this ethos, serving as both a reminder and a commitment to adaptability in a fast-changing world.
            </p>

            <h2>Walking the Foggy Road</h2>
            <p>
                Entrepreneurship rarely begins with clarity. Krithika Roy describes the early stages as walking on a foggy road, where the destination is invisible. The path feels uncertain, and risks seem daunting. Yet, as she kept moving forward, learning, and experimenting, the vision became clearer. This metaphor captures the reality of building something new: progress often comes from persistence rather than certainty. For young founders, it is a reminder that clarity is earned through action, not given at the start.
            </p>

            <h2>Beyond Followers: Redefining Value</h2>
            <p>
                Currently, Krithika Roy is focused on challenging conventional ideas of value in the digital space. Many equate success with social media followers, but she believes genuine impact comes from real connections. Realivant is not just another digital marketing agency. It takes a different approach by prioritizing authenticity over vanity metrics. This philosophy led to the launch of RRS – <a target="_blank" href='http://Realivant'>Realivant</a> Rhythm Studio, a fitness venture that complements the design business. Through dance-based fitness sessions like Zumba, Hip Hop, and Western styles, trainers go directly to people’s spaces, making wellness personal and accessible. By combining creativity with fitness, Realivant expands its mission from digital design to holistic lifestyle solutions.
            </p>

            <h2>Designing Immersive Experiences</h2>
            <p>
                At its core, Realivant remains a design agency committed to creating immersive experiences. The company collaborates with theatre groups, event companies, e-learning platforms, and startups to bring ideas to life in engaging ways. Whether digital or physical, the focus is on impact design that resonates with audiences and enhances experiences. By integrating AI and ML, Realivant is positioning itself at the intersection of creativity and technology, offering solutions that are both innovative and practical.
            </p>

            <h2>The Bigger Picture: Why Relevance Matters</h2>
            <p>
                The company’s philosophy of “staying relevant” aligns with broader industry trends. According to a 2024 Deloitte study, over 70 percent of organizations cite adaptability as a critical skill for future success. In creative industries, relevance is often the difference between growth and obsolescence. The World Economic Forum has also emphasized that creativity, adaptability, and continuous learning are among the top skills needed in the future workforce. Realivant’s mission to blend design, technology, and wellness directly addresses these challenges, offering professionals tools to remain competitive in a rapidly evolving market.
            </p>

            <h2>Looking Ahead</h2>
            <p>
                Krithika’s vision is ambitious yet grounded. She aims to scale Realivant into a platform that not only delivers design solutions but also fosters independent, flexible careers. By integrating wellness, she is broadening the definition of creativity to include lifestyle and health. The long-term goal is to create a community where relevance is not just about professional skills but about holistic growth. For a college student balancing academics and entrepreneurship, the journey is demanding, but the clarity of vision and commitment to adaptability set the stage for a promising future.
            </p>
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
            title="Krithika Roy: Creativity Without Borders"
            image={krithikaImg}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage}
        />
    );
};

export default KrithikaRoyPost;
