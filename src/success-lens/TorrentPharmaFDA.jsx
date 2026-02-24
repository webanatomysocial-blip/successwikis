import React from "react";
import BlogLayout from "../components/BlogLayout";
import heroImage from "../assets/success-wire/Torrent Pharma.webp";

const TorrentPharmaFDA = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p className="lead-text">
        Torrent Pharma’s Dahej Facility Clears US FDA Inspection With Zero
        Observations
      </p>
      <p>
        Torrent Pharmaceuticals has announced that the US Food and Drug
        Administration (FDA) inspection at its Dahej manufacturing facility
        concluded with zero observations. This outcome is a significant boost
        for the company, reinforcing its compliance standards and strengthening
        its credibility in global pharmaceutical markets.
      </p>
      <p>
        The Dahej plant is a key site for Torrent’s exports to the United
        States, one of its largest markets. A clean inspection report means
        uninterrupted supply, smoother regulatory approvals, and stronger
        confidence among international clients. Industry analysts note that such
        outcomes are rare and highlight the company’s robust quality systems.
      </p>
      <p>
        The timing is crucial. With global demand for affordable generics
        rising, Indian pharmaceutical companies are under increasing scrutiny
        from regulators. Torrent’s success at Dahej positions it favorably
        against competitors who often face compliance hurdles.
      </p>
      <p>
        Executives at Torrent emphasized that the company will continue to
        invest in quality and compliance, ensuring that its facilities meet the
        highest international standards. The inspection result is expected to
        positively impact investor sentiment and support Torrent’s growth
        trajectory in the US market.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [];

  return (
    <BlogLayout
      category="Success Wire"
      title="Torrent Pharma’s Dahej Facility Clears US FDA Inspection With Zero Observations"
      image={heroImage}
      content={content}
      recentPosts={recentPosts}
    />
  );
};

export default TorrentPharmaFDA;
