import React from "react";
import BlogLayout from "../components/BlogLayout";
import heroImage from "/assets/success-wire/bew.webp";

const BewakoofCEOStepsDown = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p className="lead-text">
        Prabhkiran Singh Steps Down as CEO of Bewakoof After Fourteen Years
      </p>
      <p>
        Prabhkiran Singh, co-founder and chief executive of Bewakoof, has
        announced that he will step down at the end of March, closing a
        fourteen-year chapter at the helm of one of India's most recognizable
        youth fashion brands. Singh, who launched the company in 2011 with
        fellow IIT Bombay graduate Siddharth Munot, built Bewakoof from a small
        operation into a digital-first label that became synonymous with quirky
        designs and affordable apparel for Gen Z consumers.
      </p>
      <p>
        The decision comes three years after Aditya Birla Fashion and Retail's
        digital venture TMRW acquired a majority stake in Bewakoof, positioning
        the brand for its next phase of growth. Singh explained in a personal
        note that his departure is driven by health and family priorities,
        reflecting on the journey from resource-constrained beginnings to a
        company that now serves millions of customers across India. He described
        the early years as a period of relentless experimentation, when
        humor-driven campaigns and relatable designs helped Bewakoof carve out a
        niche in a crowded market.
      </p>
      <p>
        Industry analysts see the move as emblematic of a broader shift in
        India's consumer landscape, where founder-led startups are increasingly
        absorbed into larger corporate ecosystems. Bewakoof's integration into
        TMRW has already brought structural changes, with a stronger focus on
        scaling operations, expanding offline retail, and leveraging synergies
        across Aditya Birla's portfolio. Singh's exit signals the transition
        from a founder-driven culture to a professionally managed brand, raising
        questions about how the company will retain the authenticity and
        youthful energy that defined its early years.
      </p>
      <p>
        Observers note that Singh's leadership was marked by resilience and a
        willingness to challenge conventions in fashion retail. Bewakoof's
        campaigns often leaned on humor and relatability, building a loyal
        following among young consumers who saw the brand as more than just
        clothing. The company's ability to sustain relevance in a fast-changing
        digital environment was a testament to Singh's instinct for connecting
        with audiences. His departure, while expected in the wake of corporate
        consolidation, nevertheless marks the end of an era for a brand that
        grew up alongside India's digital consumer revolution.
      </p>
      <p>
        As Bewakoof prepares for its next phase under TMRW's leadership, Singh's
        role in shaping its identity remains central to its story. The company
        now faces the challenge of scaling without losing the cultural resonance
        that made it distinctive. For Singh, the decision to step away reflects
        a personal recalibration after years of entrepreneurial intensity. For
        Bewakoof, it marks the beginning of a new chapter in which the brand
        must prove that it can thrive beyond the vision of its founder.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [];

  return (
    <BlogLayout
      category="Success Wire"
      title="Prabhkiran Singh Steps Down as CEO of Bewakoof After Fourteen Years"
      image={heroImage}
      content={content}
      recentPosts={recentPosts}
    />
  );
};

export default BewakoofCEOStepsDown;
