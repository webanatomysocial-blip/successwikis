import React from "react";
import "../css/ads.css";

// Placeholders - user needs to upload these images to src/assets/ads-page/
import adsHeroImg from "../assets/ads-page/1.png";
import adsProblemImg from "../assets/ads-page/3.png";
import adsSolutionImg from "../assets/ads-page/2.png";

const Ads = () => {
  return (
    <div className="ads-page">
      <div className="ads-container">
        {/* Intro Section */}
        <h1
          className="head-text"
          style={{ textTransform: "uppercase", marginBottom: "40px" }}
        >
          It's time for a new kind of <br className="only-windows" />
          advertising for the internet
        </h1>

        <div className="ads-image-card">
          {/* Image 1: "YOU -> AD -> YOUR INTENTION" */}
          {/* USER: Upload the first black card image here */}
          <img src={adsHeroImg} alt="Advertising Diagram 1" />
        </div>

        {/* The Problem Section */}
        <h2
          className="head-text"
          style={{ textTransform: "uppercase", margin: "60px 0 30px" }}
        >
          The Problem
        </h2>
        <div className="ads-image-card">
          {/* Image 2: "PLATFORMS + ADS = SKEPTICISM" */}
          {/* USER: Upload the second black card image here */}
          <img src={adsProblemImg} alt="The Problem Diagram" />
        </div>
        <p
          className="para-text"
          style={{
            maxWidth: "700px",
            margin: "0 auto 20px",
            textAlign: "left",
          }}
        >
          Ads are everywhere — but many people don’t trust them. Studies show
          that when brands interrupt people with paid messages, fewer than 5%
          actually pay attention.
        </p>
        <p
          className="para-text"
          style={{
            maxWidth: "700px",
            margin: "0 auto 20px",
            textAlign: "left",
          }}
        >
          It’s not just the message or the targeting — it’s the context. When
          advertising is forced, intrusive or clearly self-serving, you lose
          trust.
        </p>

        {/* The Solution Section */}
        <h2
          className="head-text"
          style={{ textTransform: "uppercase", margin: "60px 0 30px" }}
        >
          The Solution
        </h2>
        <div className="ads-image-card">
          {/* Image 3: Repeated Diagram or Variation */}
          {/* USER: Upload the third black card image here */}
          <img src={adsSolutionImg} alt="The Solution Diagram" />
        </div>
        <p
          className="para-text"
          style={{
            maxWidth: "700px",
            margin: "0 auto 20px",
            textAlign: "left",
          }}
        >
          When your content is chosen and shared in a trusted environment,
          engagement stays genuine. Your message travels organically — first to
          your loyal audience, then through their networks across the internet.
        </p>
        <p
          className="para-text"
          style={{
            maxWidth: "700px",
            margin: "0 auto 20px",
            textAlign: "left",
          }}
        >
          True attention comes from brands that stop trying to take value and
          start trying to give value. Advertising doesn’t have to feel creepy,
          annoying or disconnected to work. It simply needs to add value.
        </p>

        {/* Why Choose Us */}
        <h2
          className="head-text"
          style={{ textTransform: "uppercase", margin: "60px 0 30px" }}
        >
          Why Choose Us?
        </h2>
        <p
          className="para-text"
          style={{
            maxWidth: "700px",
            margin: "0 auto 20px",
            textAlign: "left",
          }}
        >
          At SuccessWikis, we believe your message should feel natural, relevant
          and welcomed. Our approach helps your brand integrate into
          environments where people already trust and listen — so you don't just
          get seen, you get heard.
        </p>

        {/* Future */}
        <h2
          className="head-text"
          style={{ textTransform: "uppercase", margin: "60px 0 30px" }}
        >
          Let's Build The Future Together
        </h2>
        <p
          className="para-text"
          style={{
            maxWidth: "700px",
            margin: "0 auto 20px",
            textAlign: "center",
          }}
        >
          Ready to turn your advertising from a disruption into a conversation?
          Let's craft an experience that connects, engages, and moves your
          audience — on your terms.
        </p>

        <a
          href="mailto:hello@successwikis.com?cc=srujan@mosol9.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ads-cta-btn"
        >
          Start Advertising with us
        </a>
      </div>
    </div>
  );
};

export default Ads;
