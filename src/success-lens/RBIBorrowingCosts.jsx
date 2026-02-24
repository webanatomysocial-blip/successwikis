import React from "react";
import BlogLayout from "../components/BlogLayout";
import heroImage from "/assets/success-wire/RBI.webp";

const RBIBorrowingCosts = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p className="lead-text">
        RBI Keeps Borrowing Costs Steady, Signals Stronger Growth Ahead
      </p>
      <p>
        The Reserve Bank of India’s Monetary Policy Committee (MPC) has kept the
        repo rate unchanged at 5.25%, signaling stability in borrowing costs
        while revising India’s growth outlook upward. The decision reflects a
        careful balance between controlling inflation and supporting economic
        expansion.
      </p>
      <p>
        Governor Shaktikanta Das emphasized that India’s economy remains
        resilient despite global headwinds. The MPC now projects GDP growth at
        6.8–7.2% for the first half of FY27, citing strong domestic demand,
        investment momentum, and government infrastructure spending.
      </p>
      <p>
        Inflation, though easing, continues to face risks from global commodity
        prices and currency fluctuations. The RBI reaffirmed its commitment to
        keeping inflation within its target band, while ensuring liquidity
        conditions remain supportive of growth.
      </p>
      <p>
        Markets reacted cautiously. The Sensex and Nifty opened lower amid weak
        global cues, though bond yields and the rupee held steady, reflecting
        confidence in the RBI’s neutral stance. Analysts believe the unchanged
        repo rate offers relief to borrowers while the upgraded growth forecast
        strengthens investor sentiment.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [];

  return (
    <BlogLayout
      category="Success Wire"
      title="RBI Keeps Borrowing Costs Steady, Signals Stronger Growth Ahead"
      image={heroImage}
      content={content}
      recentPosts={recentPosts}
    />
  );
};

export default RBIBorrowingCosts;
