import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogLayout from '../components/BlogLayout';
import heroImage from '../blogs/blogs-images/4.jpeg';

const TellStoryPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
           
            <p className="lead-text">
                There’s a moment almost every founder faces. You sit down to write your story — maybe for LinkedIn,
                maybe for your website, maybe for a pitch. And suddenly, it sounds like someone else wrote it.
                Too polished. Too formal. Too… PR.
            </p>
            <p>
                You delete. Rewrite. Delete again. Because how do you share your journey without sounding fake?
            </p>

            <h2>The Problem With PR-Sounding Stories</h2>
            <p>
                PR stories are built to impress. They’re full of numbers, big wins, and headlines.
                But real stories — the ones people remember — are built to connect.
            </p>
            <p>
                Think about it. When was the last time you were moved by someone’s “We raised $10M” post?
                Now compare that to the time you read: “I pitched 47 times before one person finally believed in me.”
            </p>
            <p>One feels like a press release. The other feels like a heartbeat.</p>

            <h2>So How Do You Tell Your Story?</h2>

            <h3>1. Go back to the moment</h3>
            <p>
                Don’t start with the outcome. Start with the memory. Not “We hit 1,000 customers.”
                But <em>“I still remember the first stranger who signed up. I refreshed the screen three times to make sure it was real.”</em>
            </p>

            <h3>2. Be honest, but not dramatic</h3>
            <p>
                You don’t need to add tragedy to earn attention. It’s enough to say:
                <em>“We almost gave up after our first product failed.”</em> That’s human. That’s enough.
            </p>

            <h3>3. Show the people, not just the product</h3>
            <p>
                Talk about the employee who stayed late. The customer who gave feedback. The mentor who believed in you.
                Because businesses are built by people — and people are what readers connect with.
            </p>

            <h3>4. Share what changed you</h3>
            <p>
                Every story has a turning point. Don’t just tell us what happened. Tell us what it taught you.
                That’s where readers lean in.
            </p>

            <h2>The Story You Don’t Need to Tell</h2>
            <p>
                You don’t need to sound bigger than you are. You don’t need to list every achievement.
                You don’t need to impress anyone.
            </p>
            <blockquote className="pod-quote">
                Because the truth is, the most powerful stories are not about scale. They’re about meaning.
            </blockquote>

            <h2>Final Reminder</h2>
            <p>
                Your story is not PR. Your story is the late nights, the rejections, the first yes, the quiet wins no one clapped for.
            </p>
            <p>
                And when you tell it like it happened — not like it was packaged — people will see you.
                Not the press release version. The human one.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Ambition Is Changing', link: '/blogs/ambition-is-changing' },
        { title: 'You Don\'t Need to Have It All Figured Out', link: '/blogs/dont-need-figured-out' }
    ];

    return (
        <BlogLayout
            category="Blogs"
            title="How to Tell Your Story Without Feeling Like PR"
            image={heroImage}
            content={content}
            recentPosts={recentPosts}
        />
    );
};

export default TellStoryPost;
