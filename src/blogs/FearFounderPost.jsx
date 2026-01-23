import React from 'react';
import BlogLayout from '../components/BlogLayout';
import heroImage from '../blogs/blogs-images/2.png';

const FearFounderPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p className="lead-text">
                It doesn’t happen on launch day. It doesn’t even happen when you hit your first big milestone. 
                It happens much later — quietly, invisibly, in the spaces between investor calls, pitch decks, strategy sessions, 
                and all the noise you’ve carefully built around yourself to feel like everything’s under control.
            </p>
            <p>
                It usually comes at night, when the world is still. Not as a scream, but as a whisper that grows louder 
                with each hour you spend pretending it isn’t there. It’s the moment when your mind slips out of performance mode, 
                when you stop being the leader everyone expects you to be and return, for a brief and terrifying second, 
                to being just a human.
            </p>
            <p>
                And in that silence, a familiar question surfaces:
            </p>
            <blockquote className="pod-quote">
                “What if I’m not enough?”
            </blockquote>
            <p>
                This is the fear every founder carries — even the ones who look the most certain. Especially the ones who never talk about it.
            </p>

            <h2>The Fear Beneath the Hustle</h2>
            <p>
                Founders are expected to be visionaries — people with unshakable clarity, unstoppable energy, and answers for every possible question. 
                We build brands around certainty because certainty sells. Investors trust it. Teams depend on it. The world celebrates it.
            </p>
            <p>
                But behind the pitch decks and press releases, beneath the polished confidence and relentless optimism, sits something quieter 
                and far more honest: the fear of failing in public. The fear of being the story people whisper about in the past tense. 
                The fear of being the one who almost made it.
            </p>
            <p>
                It’s not just fear of failure. It’s the fear of being seen failing. And that’s a different kind of weight altogether.
            </p>

            <h2>Why No One Talks About It</h2>
            <p>
                We don’t talk about this fear because founders are supposed to inspire. The moment you admit uncertainty, the world begins to look at you differently.
                Investors sense “risk.” Employees sense “instability.” Peers sense “weakness.”
            </p>
            <p>
                So we learn to perform strength. We smile even when things break behind the scenes. We act like we know where the company is headed 
                even when we’re standing in the middle of fog. We say “We’re crushing it” when, inside, the ground is shaking.
            </p>
            <p>The silence doesn’t make the fear go away. It just makes it grow heavier.</p>

            <h2>How the Fear Actually Shows Up</h2>
            <p>It doesn’t storm into your day. It hides in small moments.</p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginBottom: '20px' }}>
                <li>In the hesitation before a launch, because “it’s not ready yet.”</li>
                <li>In the tightness in your chest when you refresh your metrics.</li>
                <li>In the way you avoid LinkedIn because someone else just announced a massive funding round.</li>
                <li>In the long pause you take before answering your team’s question, because you don’t actually have an answer.</li>
            </ul>
            <p>
                It shows up in the quiet, invisible cracks between your ambition and your uncertainty — the space where nobody’s watching 
                and everything feels heavier than it should.
            </p>

            <h2>The Truth Hidden in Fear</h2>
            <p>Here’s the thing nobody tells you: this fear isn’t a sign of weakness. It’s a sign you care.</p>
            <p>
                People who don’t care don’t lose sleep over the things they’re building. They don’t question their own worth. They walk away.
            </p>
            <p>
                The fear is proof that what you’re building matters to you. It’s evidence of your investment — not just financially, 
                but emotionally, mentally, even spiritually.
            </p>
            <p>
                Even the people you look up to — the founders who appear untouchable — have sat with the same fear. 
                The difference isn’t that they were fearless. It’s that they built with the fear, not in spite of it.
            </p>

            <h2>Founders Are Human First</h2>
            <p>
                We often forget this, even about ourselves. Behind every company, there’s a human being trying their best to hold everything 
                together while feeling like they might be the one falling apart.
            </p>
            <p>
                Being human doesn’t make you less of a founder. It makes your story real. And real stories are the ones people trust — 
                not the polished narratives that look perfect from the outside.
            </p>
            <p>You don’t have to fight the fear. You just have to stop pretending it isn’t there.</p>

            <h2>A Quiet Reminder</h2>
            <p>
                The fear will visit. It will arrive uninvited and linger longer than it should. But it doesn’t get to make the decisions.
            </p>
            <p>
                Every founder you admire has felt this same pressure — this same weight — and they kept building anyway. 
                Not because they were certain. But because they learned to keep moving, even in the fog.
            </p>
            <p>
                So if you’re scared right now… if the silence at night is louder than usual… if you’ve been carrying this weight alone, 
                you’re not broken. You’re just becoming the kind of person who can carry something big.
            </p>
            <blockquote className="pod-quote">
                Fear doesn’t mean you’re not enough. It means you care deeply about what you’re building.
            </blockquote>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Ambition Is Changing', link: '/blogs/ambition-is-changing' },
        { title: 'How to Tell Your Story', link: '/blogs/how-to-tell-story' }
    ];

    return (
        <BlogLayout 
            category="Blogs"
            title="The Fear Every Founder Has (But Nobody Talks About)"
            image={heroImage}
            content={content}
            recentPosts={recentPosts}
        />
    );
};

export default FearFounderPost;
