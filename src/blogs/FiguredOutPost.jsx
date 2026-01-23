import React from 'react';
import BlogLayout from '../components/BlogLayout';
import heroImage from '../blogs/blogs-images/3.jpeg';

const FiguredOutPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p className="lead-text">
                There’s a strange kind of pressure that comes with being alive right now.
                Everyone seems to be in motion. Building something. Becoming someone. Announcing the next milestone.
            </p>
            <p>And if you’re not, you start to wonder if you’re behind.</p>

            <h2>The Illusion of Clarity</h2>
            <p>
                We grow up believing that clarity is what separates the successful from the lost.
                That the people who “make it” are the ones who always knew what they wanted.
            </p>
            <p>
                But most of the time, clarity isn’t something you start with. It’s something you arrive at — slowly, quietly, 
                through a hundred small wrong turns. Nobody posts about those turns. But that’s where the real story hides.
            </p>

            <h2>The Noise Around Us</h2>
            <p>
                We scroll through people who seem certain — The founder who found their mission. The creator who “finally cracked the algorithm.” 
                The friend who just posted, “big news coming soon.”
            </p>
            <p>And somewhere inside, a whisper begins: <em>Why don’t I know what I’m doing yet?</em></p>
            <p>
                But the truth is — they don’t either. At least, not all the time. Everyone is figuring things out in real time. 
                Some are just better at packaging their uncertainty.
            </p>

            <h2>The Reality of Figuring It Out</h2>
            <p>We treat uncertainty like it’s failure. But it’s actually evidence of motion.</p>
            <p>
                It means you’re trying. It means you’re curious. It means you’re still alive to possibility.
            </p>
            <p>
                People who have it “all figured out” are usually the ones who stopped exploring. 
                And exploration — not certainty — is what keeps us growing.
            </p>

            <h2>For Founders, Creators, and Humans Alike</h2>
            <p>
                If you’re building something, you’ll go through seasons where everything feels like a guess.
                What to build next. Who to hire. Where to go from here.
            </p>
            <p>
                That’s normal. You’re not supposed to have the entire map — only the next step.
            </p>
            <p>
                Even the most visionary founders didn’t begin with a 10-year plan. They began with curiosity, confusion, 
                and a deep need to create something that felt right. That’s how clarity is built — one imperfect decision at a time.
            </p>

            <h2>The Pressure to Appear Sorted</h2>
            <p>
                We perform certainty because it earns respect. Investors want confident answers. Teams want direction. 
                The world wants proof you know where you’re going.
            </p>
            <p>But the most honest leaders are the ones who say:</p>
            <blockquote className="pod-quote">
                “I don’t have it all figured out — but I’m willing to learn.”
            </blockquote>
            <p>That kind of honesty builds trust faster than any vision statement.</p>

            <h2>What If You’re Exactly Where You Should Be?</h2>
            <p>
                Maybe this uncertainty you’re in isn’t a detour — maybe it’s design. Maybe the waiting is shaping you for what’s next.
            </p>
            <p>
                You don’t need to have it all figured out. You just need to stay open enough to let the next answer find you.
            </p>
            <p>
                Because someday, you’ll look back and realize — every moment of confusion was quietly forming your direction.
            </p>
            <p>You were becoming. You just didn’t know it yet.</p>
            <blockquote className="pod-quote">
                “Clarity doesn’t come before movement. It comes because of it.”
            </blockquote>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'The Fear Every Founder Has', link: '/blogs/fear-every-founder-has' },
        { title: 'How to Tell Your Story', link: '/blogs/how-to-tell-story' }
    ];

    return (
        <BlogLayout 
            category="Blogs"
            title="You Don't Need to Have It All Figured Out"
            image={heroImage}
            content={content}
            recentPosts={recentPosts}
        />
    );
};

export default FiguredOutPost;
