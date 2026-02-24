import React from "react";
import BlogLayout from "../components/BlogLayout";
import heroImage from "../assets/success-wire/Cabine.png";

const CabinetApprovesFund = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p className="lead-text">
        Cabinet Approves ₹10,000 Crore Fund to Strengthen Deep-Tech and
        Innovative Manufacturing Startups
      </p>
      <p>
        The Union Cabinet has cleared a ₹10,000 crore Fund of Funds to provide
        targeted support for India’s growing startup ecosystem. The initiative,
        announced on February 14, 2026, is designed to mobilise venture capital
        and strengthen enterprises working in deep-tech, early growth stages,
        and innovative manufacturing. Officials explained that the fund will be
        sector-agnostic, enabling investments across diverse industries while
        prioritising ventures that are developing solutions rooted in scientific
        and engineering advancements.
      </p>
      <p>
        The scheme represents the second phase of the Fund of Funds programme
        under Startup India, which was first launched in 2016 to encourage
        entrepreneurship and innovation. The government has stated that the fund
        will channel capital into smaller venture funds, which in turn will
        invest in promising startups that often face challenges in securing
        early-stage financing. Union Minister Ashwini Vaishnaw emphasised that
        the objective is to ensure India’s startup ecosystem remains globally
        competitive by facilitating access to venture capital at critical stages
        of growth.
      </p>
      <p>
        The announcement comes against the backdrop of record startup
        registrations in 2025. Nearly 44,000 new startups were registered last
        year, the highest annual addition since the inception of Startup India.
        At the programme’s 10th anniversary in January, the Prime Minister noted
        that India now hosts more than 2 lakh startups and around 125 unicorns.
        The surge reflects both the entrepreneurial energy of the country and
        the supportive policy environment created over the past decade.
      </p>
      <p>
        The Cabinet’s approval of the new fund is expected to complement
        existing initiatives such as the Production Linked Incentive schemes,
        which have already attracted significant investment and generated
        employment. Government data indicated that actual investments under PLI
        schemes have crossed ₹1.8 lakh crore, creating over 12 lakh jobs. By
        aligning the Fund of Funds with such programmes, policymakers aim to
        create a more integrated framework for innovation, manufacturing, and
        employment generation.
      </p>
      <p>
        The Department for Promotion of Industry and Internal Trade has recently
        laid down eligibility criteria for deep-tech startups, defining them as
        entities primarily engaged in producing solutions based on new
        scientific or engineering knowledge. This classification is expected to
        streamline the process of identifying ventures eligible for
        government-backed funding and support.
      </p>
      <p>
        Industry stakeholders have welcomed the move, noting that deep-tech
        ventures often require longer gestation periods and higher capital
        commitments compared to consumer-facing startups. By providing targeted
        financial support, the government aims to reduce the funding gap that
        has historically constrained such enterprises. The initiative is
        expected to nurture startups working on advanced technologies in areas
        such as materials science, biotechnology, and sustainable manufacturing,
        while remaining open to a wide range of sectors.
      </p>
      <p>
        The approval of the ₹10,000 crore fund marks a significant step in
        India’s ongoing efforts to strengthen its startup ecosystem. With record
        registrations in 2025 and a growing base of unicorns, the government’s
        latest intervention seeks to sustain momentum while addressing
        structural challenges faced by early-stage and deep-tech ventures. The
        fund is expected to be operationalised in the coming months, with
        detailed guidelines to be issued by the concerned ministries.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [];

  return (
    <BlogLayout
      category="Success Wire"
      title="Cabinet Approves ₹10,000 Crore Fund to Strengthen Deep-Tech and Innovative Manufacturing Startups"
      image={heroImage}
      content={content}
      recentPosts={recentPosts}
    />
  );
};

export default CabinetApprovesFund;
