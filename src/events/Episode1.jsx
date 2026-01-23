import React from "react";
import EventLayout from "../components/EventLayout";
import posterImg from "../assets/events/episode-1.png";
import img1 from "../assets/events/1.jpeg";
import img2 from "../assets/events/2.mp4";
import img3 from "../assets/events/3.jpeg";

const Episode1 = () => {
  const content = (
    <>
      <div className="event-intro">
        <h2>Episode-1</h2>
        <p className="event-date">
          On 06/09/2025, we hosted the first Success Wikis Founders Meet. Though
          only one founder could attend, it marked the beginning of our journey
          to build a community of changemakers. Every big story starts small—and
          this was ours.
        </p>
      </div>

      <div className="event-gallery">
        <div className="gallery-row">
          <div className="gallery-image">
            <img src={img1} alt="Event moment 1" />
          </div>
          <div className="gallery-image">
            <video src={img2} controls autoPlay loop muted playsInline />
          </div>
          <div className="gallery-image">
            <img src={img3} alt="Event moment 3" />
          </div>
        </div>
      </div>

      <div className="event-story">
        <p>
          Our very first Success Wikis event was not at all like we had
          envisioned.
          <br />
          Not 50 founders, not even 5—just 1 founder attended.
        </p>

        <p>
          At first, the vacant chairs might have seemed like a disappointment.
          But as the discussions progressed, we saw something remarkable: that
          one individual was more than sufficient to make the day worthwhile.
        </p>

        <p>
          Because behind every number, there's a story. Behind every story,
          there's a dream. And on that day, it was all about one dreamer who
          decided to show up, share, and connect.
        </p>

        <p>
          Five had signed up, one made it. And rather than be disappointed, we
          were grateful. Because every great journey starts this way—with a
          single step, a single voice, a single believer.
        </p>

        <p>That afternoon wasn't merely our first event.</p>

        <p>
          <strong>It was our first milestone:</strong>
        </p>
        <ul>
          <li>Our very first founder</li>
          <li>Our very first real connection</li>
          <li>
            Our very first step toward creating a community of changemakers.
          </li>
        </ul>

        <p>
          We went away that day not with less hope, but with more
          conviction—knowing that Success Wikis isn't about the crowd size, it's
          about the depth of the impact.
        </p>

        <p>
          <strong>And this is just the beginning.</strong>
        </p>
      </div>
    </>
  );

  return (
    <EventLayout
      category="Founder Meet"
      title="Episode-1"
      image={posterImg}
      content={content}
    />
  );
};

export default Episode1;
