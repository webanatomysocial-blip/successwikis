import React from "react";
import BlogLayout from "../components/BlogLayout";
import heroImage from "/assets/success-wire/Nirmala.jpg";

const Budget2026Overhaul = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p className="lead-text">
        Budget 2026 Brings Customs Duty Overhaul and Record Infrastructure Push
      </p>
      <p>
        The Union Budget 2026 has introduced sweeping reforms in customs duty
        while setting a record capital expenditure target of ₹12.2 lakh crore.
        Finance Minister Nirmala Sitharaman, presenting her ninth consecutive
        budget, emphasized infrastructure as the backbone of India’s growth
        trajectory, with defence allocations also raised to ₹7.85 lakh crore.
      </p>
      <p>
        Unlike previous years, the budget avoided changes in income tax slabs,
        focusing instead on structural measures to boost manufacturing
        competitiveness and reduce import dependence. The customs duty overhaul
        is designed to simplify compliance and encourage domestic production,
        particularly in sectors such as electronics, renewable energy, and
        automotive components.
      </p>
      <p>
        The capital expenditure increase signals the government’s intent to
        sustain momentum in highways, railways, and urban infrastructure, while
        also supporting green energy projects. Analysts note that this is among
        the largest infrastructure pushes in India’s fiscal history, aimed at
        creating jobs and strengthening long‑term growth.
      </p>
      <p>
        Defence spending, now at ₹7.85 lakh crore, reflects both modernization
        needs and geopolitical realities, with emphasis on indigenous production
        under the Atmanirbhar Bharat framework. The budget also highlighted
        continued support for agriculture, MSMEs, and digital initiatives,
        though the absence of direct tax relief has drawn mixed reactions from
        salaried households.
      </p>
      <p>
        Overall, Budget 2026 positions India on a path of fiscal discipline
        combined with aggressive investment in growth‑oriented sectors. The
        government’s bet is clear: infrastructure and manufacturing will drive
        resilience, while customs reforms will ease the path for domestic
        industry to compete globally.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [];

  return (
    <BlogLayout
      category="Success Wire"
      title="Budget 2026 Brings Customs Duty Overhaul and Record Infrastructure Push"
      image={heroImage}
      content={content}
      recentPosts={recentPosts}
    />
  );
};

export default Budget2026Overhaul;
