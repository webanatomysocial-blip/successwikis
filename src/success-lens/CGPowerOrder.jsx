import React from "react";
import BlogLayout from "../components/BlogLayout";
import heroImage from "../assets/success-wire/SW-blog.png";

const CGPowerOrder = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p className="lead-text">
        CG Power and Industrial Solutions Ltd has announced its largest-ever
        single export order, valued at ₹900 crore (~$99M), from Tallgrass
        Integrated Logistics Solutions LLC in the United States.
      </p>
      <p>
        The contract involves supplying advanced power transformers engineered
        for hyperscale data centers, marking the company’s formal entry into the
        global digital infrastructure market.
      </p>
      <p>
        The order is significant for several reasons. First, it positions CG
        Power as a serious contender in the rapidly expanding data center
        sector, which is being fueled by surging demand for AI, cloud computing,
        and digital transformation worldwide. Second, it demonstrates how Indian
        engineering firms are now competing for high-value contracts in advanced
        technology infrastructure, moving beyond their traditional domestic
        markets.
      </p>

      <h2>Market Reaction and Strategic Pivot</h2>
      <p>
        Market reaction was immediate: CG Power’s shares surged more than 7% on
        January 19, reflecting investor confidence in the company’s ability to
        execute and expand globally. Analysts noted that this deal could be a
        turning point, opening up a pipeline of international opportunities in
        the data center vertical.
      </p>
      <blockquote className="pod-quote">
        “The transformers being supplied are designed for high reliability,
        efficiency, and uptime — critical requirements for hyperscale facilities
        that power global cloud services.” — CG Power Executives.
      </blockquote>
      <p>
        The company sees this order as a strategic pivot, aligning its future
        growth with one of the fastest-growing infrastructure segments
        worldwide.
      </p>

      <h2>Future Outlook and Challenges</h2>
      <p>
        Industry observers caution that execution risks remain, given the
        precision engineering and strict delivery timelines required for
        hyperscale projects. However, if successful, this contract could
        establish CG Power as a trusted supplier in the global data center
        ecosystem, setting the stage for sustained international expansion.
      </p>
      <p>
        CG Power’s $99M US order is more than a revenue milestone — it’s a
        strategic leap into the global digital backbone, positioning the company
        as a key Indian player in powering the world’s data infrastructure.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [];

  return (
    <BlogLayout
      category="Success Wire"
      title="CG Power Secures Landmark $99M US Data Center Order, Enters Global Digital Infrastructure Race"
      image={heroImage}
      content={content}
      recentPosts={recentPosts}
    />
  );
};

export default CGPowerOrder;
