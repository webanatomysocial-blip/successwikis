import React from "react";
import BlogLayout from "../components/BlogLayout";
import heroImage from "/assets/success-wire/GeminiAI.webp";

const GoogleGeminiChrome = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p className="lead-text">
        Google Brings Gemini AI Into Chrome, Reimagining the Browser Experience
      </p>
      <p>
        Google has announced a major upgrade to its Chrome browser, integrating
        Gemini AI directly into the browsing experience. Sundar Pichai shared
        the update on LinkedIn, highlighting how Gemini will make the web more
        helpful, creative, and personalized.
      </p>
      <p>The rollout introduces several new features:</p>

      <h3 className="wp-block-heading">
        Reimagined Side Panel for Multitasking
      </h3>
      <p>
        Chrome now includes a redesigned side panel where Gemini is always
        available as your assistant. Users can summarize reviews, compare
        products, or check their calendar without leaving their primary tab,
        making multitasking seamless.
      </p>

      <h3 className="wp-block-heading">Creative Power of Nano Banana</h3>
      <p>
        A new in‑browser creative tool allows users to transform images
        instantly — for example, turning raw data into infographics — without
        downloading files or switching tabs.
      </p>

      <h3 className="wp-block-heading">
        Personal Intelligence for Proactive Help
      </h3>
      <p>
        Coming soon, Chrome will offer Personal Intelligence, enabling Gemini to
        remember past conversations and provide context‑aware answers. Users can
        opt in to connect their Google apps, with full control to disconnect at
        any time.
      </p>

      <h3 className="wp-block-heading">
        Agentic Capabilities with Auto Browse
      </h3>
      <p>
        Chrome is introducing “auto browse,” a feature that handles complex,
        multi‑step tasks such as researching travel itineraries or filling out
        forms. Auto browse is currently available in preview for Pro and Ultra
        subscribers.
      </p>
      <p>
        These features are rolling out now on Windows, MacOS, and Chromebook
        Plus in the U.S., with broader availability expected later this year.
      </p>
      <p>
        Industry analysts view this integration as a pivotal step in Google’s AI
        strategy, positioning Chrome not just as a browser but as a proactive
        digital partner. By embedding Gemini into everyday browsing, Google is
        aiming to redefine how users interact with the web — shifting from
        passive navigation to active collaboration.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [];

  return (
    <BlogLayout
      category="Success Wire"
      title="Google Brings Gemini AI Into Chrome, Reimagining the Browser Experience"
      image={heroImage}
      content={content}
      recentPosts={recentPosts}
    />
  );
};

export default GoogleGeminiChrome;
