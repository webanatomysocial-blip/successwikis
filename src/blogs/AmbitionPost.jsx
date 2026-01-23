import React from 'react';
import BlogLayout from '../components/BlogLayout';
import heroImage from '../blogs/blogs-images/1.png';

const AmbitionPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p className="lead-text">
                For years, ambition was taught like a battle plan. Be faster. Be louder. Be visible.
                You were either chasing the dream or you were invisible. There was no middle ground.
            </p>
            <p>
                We grew up watching people build empires out of sleepless nights and glory out of sacrifice. 
                Their calendars became trophies. Their exhaustion became proof. Their loudness was celebrated like power itself.
            </p>
            <p>We learned to call that ambition.</p>

            <h2>The Old Story</h2>
            <p>
                For a long time, ambition had only one accepted shape: Sharp. Loud. Unapologetically big.
            </p>
            <p>
                You were expected to run — even when you didn’t know where the finish line was. You had to speak like a leader, 
                act like you had it figured out, and make noise so the world wouldn’t forget you existed.
            </p>
            <p>
                Slowing down felt like failure. Resting felt like weakness. Not wanting “more” made you feel small.
            </p>
            <p>
                We worshipped the visionaries who burned at both ends. We built a culture that confused chaos for hunger 
                and suffering for grit. And for a while, it worked. But slowly, something started to break.
            </p>

            <h2>The Quiet Shift</h2>
            <p>
                The loudest people aren’t the only ones building anymore.
                There’s a quiet movement happening — not on stages, not in headlines, but in late-night workspaces and quiet living rooms.
            </p>
            <p>
                People are still ambitious. But their ambition no longer needs to scream.
                It’s softer. More personal. Less about proving something to the world and more about building something that actually matters to them.
            </p>
            <blockquote className="pod-quote">
                This new kind of ambition doesn’t ask: "How do I get there first?" It asks: "Where do I actually want to go?"
            </blockquote>

            <h2>What It Feels Like</h2>
            <p>
                It feels like choosing depth over noise. It feels like building slower but sleeping better.
                It feels like being proud of something before it’s polished enough to be clapped for.
            </p>
            <p>
                People are no longer impressed by burnout disguised as hustle. They’re drawn to clarity. To honesty. 
                To people who can say, <em>“I’m building at my pace, not yours.”</em>
            </p>
            <p>The truth is — ambition isn’t dying. It’s just becoming more honest.</p>

            <h2>Why This Matters</h2>
            <p>
                For founders, leaders, and dreamers, this shift isn’t small. It’s seismic.
                Teams are no longer inspired by bosses who glorify chaos. They want steadiness, not storms.
            </p>
            <p>
                Investors are beginning to respect sustainable vision over theatrical growth.
                Communities are gathering around meaning, not megaphones.
            </p>
            <p>
                The world doesn’t need another empire built on exhaustion. It needs builders who know how to hold both ambition 
                and well-being in the same hands.
            </p>
            <blockquote className="pod-quote">
                The future won’t belong to the loudest voice. It’ll belong to the one that speaks with clarity.
            </blockquote>

            <h2>The New Ambition</h2>
            <p>
                This new ambition doesn’t look like a race. It looks like a path — carved slowly, intentionally, on your terms.
            </p>
            <p>
                You can still want more. You can still dream wildly. But you no longer have to lose yourself proving that dream is worthy.
            </p>
            <p>
                It’s no longer about chasing the spotlight. It’s about building a life you don’t need to escape from.
            </p>
            <p>
                Real ambition isn’t about how loud your dreams sound. It’s about how deeply they fit into the life you want to live.
            </p>

            <h2>A Quiet Revolution</h2>
            <p>
                This shift won’t trend like a funding headline. It won’t get shouted on big stages.
            </p>
            <p>
                But in quiet corners, in focused rooms, in the minds of founders and creators who are tired of performing strength, 
                something real is changing.
            </p>
            <p>
                And if your ambition feels different now — calmer, slower, quieter — don’t question it. You’re not falling behind.
                You might just be building for the long game.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'The Fear Every Founder Has', link: '/blogs/fear-every-founder-has' },
        { title: 'You Don\'t Need to Have It All Figured Out', link: '/blogs/dont-need-figured-out' }
    ];

    return (
        <BlogLayout 
            category="Blogs"
            title="Ambition Is Changing — And That's a Good Thing"
            image={heroImage}
            content={content}
            recentPosts={recentPosts}
        />
    );
};

export default AmbitionPost;
