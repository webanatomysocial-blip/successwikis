import React from "react";
import PodLayout from "../../components/PodLayout";
import sampleImage from "../../assets/The-stage-behind-the-story/wf.webp";
import sponsoredImage from "../../assets/Sponsored/sponsored-image.jpg";

const WestfieldInternationalPost = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p>
        For Kasturi Manjula, education has never been just about classrooms and
        curricula—it has always been about people. With more than 15 years of
        experience as a school consultant and principal, she has dedicated her
        career to bridging gaps in the education system and guiding parents,
        teachers, and school owners toward a shared vision of learning. Today,
        she leads Westfield International School, a brand she founded to bring
        parent guidance and holistic schooling under one roof.
      </p>
      <p>
        Her journey began with a realization: while schools focused on
        academics, parents were often left without proper guidance. They needed
        hand‑holding, especially in the wake of COVID‑19, when education systems
        were disrupted and families struggled to adapt. Kasturi saw this gap and
        decided to act. At Westfield International School, parenting guidance
        became a core focus. By helping parents understand how to support
        academics and align with schools, she created a platform where
        collaboration could truly transform a child’s learning experience.
      </p>
      <p>
        But her vision extended beyond her own institution. As a consultant,
        Kasturi recognized that many aspiring school owners lacked clear
        pathways—how to start a school, enroll students, design marketing
        strategies, or build strong academic programs. She introduced structured
        processes, including pin number surveys to assess operational
        possibilities, marketing potential, and teacher training needs. With
        these tools, she offered investors and academicians practical roadmaps:
        how to screen buildings, enter markets, and onboard parents effectively.
        What had once been an unstructured industry began to take shape under
        her guidance.
      </p>
      <p>
        Over the years, Kasturi has helped launch 10 to 15 schools, each one a
        testament to her ability to combine vision with execution. She also
        identified deeper systemic gaps: between management and teachers,
        between coordinators and principals, and between schools and parents. To
        address these, she created Saira Academy, a platform for teacher
        training and professional development. Through Saira Academy, educators
        receive strategies, classroom techniques, and practical tools to
        strengthen teaching energy and bridge divides across the education
        ecosystem.
      </p>
      <p>
        The most rewarding chapter of her journey has been the growth of
        Westfield International School itself. Established in 2023, the school
        quickly expanded to multiple branches within just two years. Today, it
        serves around 400 children, offering not only academics but also a
        nurturing environment where parents, teachers, and administrators work
        in harmony. For Kasturi, this achievement is more than professional
        success—it is proof that her vision of parent‑centric schooling
        resonates with families and communities.
      </p>
      <p>
        Her work continues to evolve, but the essence remains the same: filling
        gaps, building bridges, and creating meaningful change in education. By
        combining consultancy with hands‑on leadership, Kasturi Manjula has
        shown that schools thrive when parents are empowered, teachers are
        supported, and investors are guided with clarity. In her words and
        actions, she embodies the belief that education is not just about
        teaching—it is about shaping futures, one child, one parent, and one
        school at a time.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [
    {
      title: "NexGen Software Solutions",
      link: "/stage-behind-the-story/nexgen-software",
    },
    {
      title: "Green Recykloplast Solutions",
      link: "/stage-behind-the-story/green-recykloplast",
    },
    {
      title: "Leenus Infra builds Smarter",
      link: "/founders-unfiltered/leenus-infra",
    },
  ];

  return (
    <PodLayout
      category="The stage behind the story"
      title="Kasturi Manjula: Guiding Parents, Building Schools, Shaping Futures"
      image={sampleImage}
      content={content}
      recentPosts={recentPosts}
      sponsoredImage={sponsoredImage}
    />
  );
};

export default WestfieldInternationalPost;
