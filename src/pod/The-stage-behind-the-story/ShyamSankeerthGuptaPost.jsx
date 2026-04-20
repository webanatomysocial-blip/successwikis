import React from 'react';
import PodLayout from '../../components/PodLayout';
import shyamImg from '../../assets/The-stage-behind-the-story/Shyam.jpeg';
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

const ShyamSankeerthGuptaPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                <a target="_blank" href="http://linkedin.com/in/shyam-sankeeth/">Shyam Sankeerth Gupta</a>’s professional journey began in biotechnology, with a master’s degree in bioinformatics and computational biology. His academic foundation was rooted in scientific rigor and data-driven problem solving, but his career path took an unconventional turn. Rather than pursuing a traditional trajectory in research or pharmaceuticals, he identified a pressing challenge in the job market: the inefficiency of job applications and the lack of structured support for candidates. This pivot from science to technology illustrates how diverse expertise can be applied to solve human problems in unexpected domains. It also highlights the adaptability required of modern entrepreneurs, who often cross disciplinary boundaries to create impact.
            </p>

            <h2>The Birth of ApplyWizz</h2>
            <p>
                <a target="_blank" href='https://www.applywizz.ai/' >ApplyWizz</a>  emerged from Shyam Sankeerth Gupta’s personal frustration with job applications. He experienced firsthand the low response rates and the time-consuming nature of applying for multiple roles. Recognizing that many professionals, especially those abroad, struggled with the same issue, he envisioned a platform that could combine automation with human intelligence. <a target="_blank" href='https://www.linkedin.com/company/apply-wizz/'>ApplyWizz</a> was designed to help users discover opportunities, optimize their profiles, and streamline applications through structured workflows. In essence, it sought to bridge the gap between talent and opportunity by making the process more efficient and outcome-driven. The company’s mission reflects Shyam’s belief that technology should not replace human effort but rather augment it, creating systems that are scalable and accessible.
            </p>

            <h2>Scaling Fast in a Tier-3 City</h2>
            <p>
                One of the most striking aspects of ApplyWizz’s growth is its location. In under eight months, Shyam Sankeerth Gupta built and scaled a team of more than 100 employees in a tier-3 city in India. This choice was deliberate: it allowed him to tap into underutilized talent pools while creating employment opportunities in regions often overlooked by technology companies. More than 80 percent of the workforce is women, a statistic that underscores the company’s commitment to inclusivity and empowerment. By building a high-performance operational model in a non-metropolitan setting, ApplyWizz challenges assumptions about where innovation can thrive. It demonstrates that impact-driven businesses can flourish outside traditional tech hubs.
            </p>

            <h2>The Breakthrough Insight</h2>
            <p>
                The turning point in Shyam’s journey came when he realized that consistent, high-volume applications significantly improve job outcomes. While applying for jobs himself, he noticed that persistence led to interview calls and offers. This insight became the foundation of ApplyWizz’s subscription-based model, which ensures consistency through a blend of AI and human support. The platform’s design reflects a simple but powerful truth: success in the job market often depends less on luck and more on sustained effort. By systematizing this process, ApplyWizz helps users overcome the time constraints and workload challenges that typically hinder job seekers.
            </p>

            <h2>Setbacks That Shaped the Vision</h2>
            <p>
                Shyam’s path was not without setbacks. He lost jobs twice—once due to budget cuts and once because of visa constraints. At one point, he even explored stand-up comedy, a completely different career path. These experiences, though challenging, shaped his resilience and persistence. Rather than discouraging him, they reinforced the importance of consistent effort. His ability to bounce back from adversity became a defining trait of his entrepreneurial journey. The setbacks also provided the core insight behind ApplyWizz: that persistence in job applications can eventually lead to success, even when circumstances seem unfavorable.
            </p>

            <h2>The Hidden Weight of Leadership</h2>
            <p>
                Scaling a company to 100+ employees in less than a year brings immense responsibility. Shyam Sankeerth Gupta candidly acknowledges the mental and emotional demands of managing a large team. Every decision, no matter how small, can affect many lives. The unpredictability of scaling adds to the pressure, as founders often have to figure things out from scratch. Shyam Sankeerth Gupta describes the experience as exhausting and overwhelming, yet also deeply rewarding. His reflections highlight the human side of entrepreneurship, where leadership is not just about strategy but also about empathy and accountability.
            </p>

            <h2>Global Ambitions and Shark Tank Audition</h2>
            <p>
                Shyam’s vision extends beyond India. He was among the early immigrant founders to audition for Shark Tank USA, a testament to his ambition to build at a global level. This milestone reflects his willingness to take bold steps and position ApplyWizz on the international stage. His long-term goal is to evolve the platform into a competitor to LinkedIn, but with a stronger focus on automation, personalization, and measurable outcomes. By combining global aspirations with local impact, Shyam Sankeerth Gupta embodies the new generation of entrepreneurs who think beyond borders while staying rooted in community-driven values.
            </p>

            <h2>The Human Cost of Building Relentlessly</h2>
            <p>
                Behind ApplyWizz’s rapid growth lies a story of sacrifice. Shyam Sankeerth Gupta and his team worked 16–21 hours a day for over four months, often pushing themselves beyond their limits. The intensity took a toll on their health, but they believed deeply in what they were building. This level of commitment underscores the reality of entrepreneurship: success often requires relentless effort and the willingness to endure hardship. Shyam’s account serves as a reminder that building something meaningful is rarely easy, and persistence is often the defining factor between failure and breakthrough.
            </p>

            <h2>The Bigger Picture: Employment Challenges Worldwide</h2>
            <p>
                ApplyWizz’s mission resonates with broader employment challenges. According to the International Labour Organization, global youth unemployment remains above 13 percent, with millions struggling to secure stable work. Studies also show that job seekers spend an average of 11 hours per week on applications, yet response rates remain low. In India, where ApplyWizz is based, the Centre for Monitoring Indian Economy has reported persistent unemployment rates among graduates, highlighting the need for structured career support. By addressing inefficiencies in the job application process, ApplyWizz is not just solving an individual pain point but contributing to a larger effort to improve employment outcomes worldwide.
            </p>

            <h2>Looking Ahead</h2>
            <p>
                Shyam Sankeerth Gupta’s current focus is on scaling ApplyWizz into one of the largest AI-driven job platforms from a tier-3 city in India. His long-term vision is to create a system that not only connects talent with opportunities but actively helps users succeed in the application process. By combining automation with personalization, he aims to build a platform that delivers real outcomes rather than superficial engagement. The journey so far has been marked by resilience, sacrifice, and bold ambition. As ApplyWizz continues to grow, it stands as an example of how technology, when guided by human insight, can transform the way people navigate their careers.
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
            title="Shyam Sankeerth Gupta: Rejected Twice, Accepted Everywhere"
            image={shyamImg}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage}
        />
    );
};

export default ShyamSankeerthGuptaPost;
