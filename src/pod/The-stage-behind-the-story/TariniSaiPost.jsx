import React from 'react';
import PodLayout from '../../components/PodLayout';
import sampleImage from '../../assets/The-stage-behind-the-story/Tarini-Sai-Padmanabhan.jpeg'; 
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

const TariniSaiPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                In an era where seeing is no longer believing, <strong>Tarini Sai Padmanabhan</strong> is on a mission to restore truth in the digital world. At just 20 years old, she’s the founder of <strong>Axory AI</strong>, a pioneering startup tackling one of the most urgent challenges of our time—deepfake detection and AI-generated content verification. Her vision? To build the “trust layer of the internet.”
            </p>

            <p>
                Tarini’s journey didn’t begin with a pitch deck—it began with pain. A close friend, a popular influencer with over 300,000 followers, was devastated by a malicious deepfake. Authorities refused to act, citing the lack of concrete evidence. That moment lit a fire in Tarini.
            </p>

            <blockquote className="pod-quote">
                “When I saw how powerless even someone with a large following was, I knew this wasn’t just a one-off problem. It was a systemic crisis—and someone had to solve it,” she shares.
            </blockquote>

            <p>
                Armed with a background in image processing, AI, and real-world experience from hackathons and research, Tarini turned outrage into action. She assembled a passionate, skilled team of student innovators from top institutions—MIT Manipal, IIT Jodhpur, IIT Madras—and set out to build Axory AI.
            </p>

            <blockquote className="pod-quote">
                “We’re not just building tech—we’re building trust. The goal is to empower every individual to verify truth in a world where reality is being edited.”
            </blockquote>

            <p>
                Axory AI is already making waves with its real-time detection tools for deepfakes and AI-generated content. Whether it’s helping individuals protect their identity, or equipping institutions with verification tools, Axory is redefining digital credibility.
            </p>

            <blockquote className="pod-quote">
                “This isn’t just about solving misinformation. It’s about protecting people’s reputations, mental health, and even their safety,” Tarini says.
            </blockquote>

            <p>
                She has already been invited to speak at two TEDx events, and was a keynote speaker at GAI Bharat Utsav 2025, where her story moved an audience of over 2,000 students.
            </p>

            <blockquote className="pod-quote">
                “I’ve learned that impact isn’t about how big your team is or how many years you’ve worked—it’s about how fast you move with clarity and courage,” she says with conviction.
            </blockquote>

            <p>
                Tarini is not just creating a company; she’s shaping a movement. Her story reflects the essence of SuccessWikis—a platform that doesn’t chase vanity metrics, but uncovers real stories of bold visionaries, courageous doers, and next-gen builders creating value where the world needs it most.
            </p>

            <blockquote className="pod-quote">
                “If your problem is real, your age doesn’t matter. Your clarity does.”
            </blockquote>
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
            title="Tarini Sai Padmanabhan: Building the Trust Layer of the Internet with Axory AI"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage} 
        />
    );
};

export default TariniSaiPost;
