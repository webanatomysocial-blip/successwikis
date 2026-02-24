import React from "react";
import BlogLayout from "../components/BlogLayout";
import heroImage from "/assets/success-wire/alz.webp";

const AlzheimersPollutionLink = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p className="lead-text">
        New Study Links Long-Term Air Pollution Exposure to Higher Alzheimer’s
        Risk
      </p>
      <p>
        A major study published this week has found that prolonged exposure to
        fine particulate matter in air pollution may directly increase the risk
        of Alzheimer’s disease. The research, conducted by a team at Emory
        University and released on February 17, 2026, examined the effects of
        PM2.5 particles — tiny pollutants produced by vehicles, industry, and
        combustion — on brain health.
      </p>
      <p>
        The study, published in PLOS Medicine, analyzed health data from
        thousands of individuals across multiple regions and found a consistent
        association between higher levels of PM2.5 exposure and increased
        incidence of Alzheimer’s. While earlier research had linked polluted air
        to conditions such as high blood pressure and depression, which
        themselves are risk factors for dementia, this study suggests that
        particulate matter may contribute directly to neurodegeneration.
      </p>
      <p>
        Researchers explained that PM2.5 particles are small enough to enter the
        bloodstream and potentially cross the blood-brain barrier. Once inside,
        they may trigger inflammation and oxidative stress, processes known to
        damage neurons and accelerate cognitive decline. The findings add weight
        to growing evidence that environmental factors play a significant role
        in the onset of Alzheimer’s, which currently affects more than 57
        million people worldwide.
      </p>
      <p>
        The study’s authors emphasized that the results highlight the importance
        of reducing air pollution as a public health priority. They noted that
        Alzheimer’s disease is one of the fastest-growing health challenges
        globally, with millions of new diagnoses each year. By identifying air
        quality as a modifiable risk factor, the research underscores the
        potential for preventive strategies that go beyond medical treatment.
      </p>
      <p>
        Independent experts reviewing the findings stated that the evidence
        reinforces the need for stricter air quality standards and more robust
        monitoring systems. They pointed out that while genetic predisposition
        remains a key factor in Alzheimer’s, environmental exposures such as air
        pollution may determine how early and severely the disease manifests.
      </p>
      <p>
        The study is part of a growing body of work connecting environmental
        health and neurodegenerative diseases. With Alzheimer’s cases projected
        to rise sharply in the coming decades, researchers believe that tackling
        pollution could help reduce the burden on healthcare systems worldwide.
        The authors concluded that further research is needed to understand the
        precise biological mechanisms, but the link between air pollution and
        Alzheimer’s risk is now clearer than ever.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [];

  return (
    <BlogLayout
      category="Success Wire"
      title="New Study Links Long-Term Air Pollution Exposure to Higher Alzheimer’s Risk"
      image={heroImage}
      content={content}
      recentPosts={recentPosts}
    />
  );
};

export default AlzheimersPollutionLink;
