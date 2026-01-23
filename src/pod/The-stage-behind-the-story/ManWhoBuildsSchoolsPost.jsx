import React from 'react';
import PodLayout from '../../components/PodLayout';
import sampleImage from '../../assets/The-stage-behind-the-story/raghav.jpeg'; 
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

const ManWhoBuildsSchoolsPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                When Ravi Madabhushi founded his first school back in 1999, it wasn’t part of a grand business plan. It was driven by something far simpler, yet far deeper: passion. A deep, unshakable pull toward school education, and a belief that if done right, education could change everything — not just for students, but for the people who dared to build schools themselves.
            </p>
            <p>
                Years later, that passion would evolve into Raghav Foundation — a name that’s now become synonymous with trust, guidance, and expertise in India’s education space. But the journey wasn’t glamorous. It was full of the unknown. Ravi had to figure out every detail himself — from navigating complex affiliations to facing construction challenges and financial uncertainty. That struggle, though painful, became the blueprint for something greater.
            </p>

            <blockquote className="pod-quote">
                “If only someone could’ve held my hand back then,” he recalls.<br/>
                “It would’ve saved years of time and heartbreak.”
            </blockquote>

            <p>
                That thought stayed with him. And it became the foundation for what Raghav Foundation does today — mentoring first-time school founders, consulting on education ventures, and hand-holding dreamers through the difficult path of building institutions from scratch.
            </p>

            <h2>A Foundation Built on Purpose, Not Just Profit</h2>
            <p>
                Raghav Foundation isn’t a consulting firm in the traditional sense. It’s a mission. Ravi and his team sit across the table from aspiring founders — many of whom have no background in education or business — and ask the tough questions:
            </p>
            <ul>
                <li>Why do you want to start this school?</li>
                <li>Are you ready for the hurdles?</li>
                <li>Is this about money or impact?</li>
            </ul>
            <p>
                Only if they sense deep intent and commitment do they move forward. And when they do, they go all in.
            </p>
            <p>
                From blueprint to board approvals, branding to budgeting — Raghav Foundation doesn’t just advise. They embed themselves into the project. Sometimes, a single idea from Ravi’s head has saved multi-crore projects from collapse. Like the North Indian school that had built two massive blocks — only to stall due to flawed calculations. Ravi flew in, studied the site, sat in silence, and came up with a fix that saved the entire initiative. Today, that school is thriving.
            </p>

            <blockquote className="pod-quote">
                “We treat every project like it’s our own baby,” he says.<br/>
                 “Their success is our success. Their mission becomes ours.”
            </blockquote>

            <h2>Success, Redefined</h2>
            <p>
                For Ravi, success isn’t revenue or reach. It’s when a school that almost didn’t happen finally opens its doors. It’s the joy of a client calling months later to say, “We made it.” It’s staying up late to find one more workaround, one more possibility — even when no one’s asking for it.
            </p>
            
            <blockquote className="pod-quote">
                “Of course, money is part of the game. But passion? Passion is everything.”
            </blockquote>

            <p>
                That mindset is what helped Raghav Foundation survive its hardest phase: COVID-19. With education stalled and doors closed, the team could’ve given up. But they didn’t. They waited. They evolved. And they used that quiet time to rethink and expand — reaching founders across India, from north to south, east to west.
            </p>
            <p>
                Today, Raghav Foundation is known nationwide. But it still functions like a friend you can count on — especially when things fall apart.
            </p>

            <h2>A Platform to Celebrate Stories Like These</h2>
            <p>
                That’s exactly why we’re building SuccessWikis — to spotlight the kind of stories that never make it to magazine covers, but shape the real economy. The stories of people who build value, not vanity. Who solve invisible problems. Who lead with heart.
            </p>
            <p>
                Stories like Ravi’s.
            </p>
            <p>
                And yes, as Ravi humbly noted in the interview, he didn’t walk this path alone. His team. His early believers. And his collaborators — including Mosol9, a full-scale marketing company and founding investor in SuccessWikis — have stood by him, not just as vendors, but as co-dreamers.
            </p>

            <blockquote className="pod-quote">
                “They waited when I delayed. They came with ideas when I had none,” he shared.<br/>
                “That’s rare. And that matters.”
            </blockquote>

            <p>
                At SuccessWikis, we believe success doesn’t start with scale. It starts with soul.<br/>
                And we’re proud to tell stories that prove it — one builder at a time.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Tarini Sai Padmanabhan', link: '/stage-behind-the-story/tarini-sai' },
        { title: 'The Soldier Who Rewired the Future', link: '/stage-behind-the-story/soldier-rewired' },
        { title: 'Raghav Foundation', link: '/driven-by-purpose/raghav-foundation' }
    ];

    return (
        <PodLayout 
            category="The stage behind the story"
            title="The Man Who Builds Schools for People Who Dream of Building Them"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage} 
        />
    );
};

export default ManWhoBuildsSchoolsPost;
