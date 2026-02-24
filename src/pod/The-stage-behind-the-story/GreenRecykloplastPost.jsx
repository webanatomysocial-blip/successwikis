import React from "react";
import PodLayout from "../../components/PodLayout";
import sampleImage from "../../assets/The-stage-behind-the-story/grp.webp";
import sponsoredImage from "../../assets/Sponsored/sponsored-image.jpg";

const GreenRecykloplastPost = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p>
        When Raghuram Natarajan speaks about plastics, it is not with the
        detachment of an industry veteran but with the urgency of someone who
        has seen the problem from the inside. With more than two decades in the
        packaging sector, supplying materials to multinational corporations and
        food companies, he witnessed firsthand the rise of multi‑layer
        plastics—the glossy wrappers and laminated packets that encase biscuits,
        chips, spices, and countless other everyday products. These packages,
        designed to preserve shelf life and brand appeal, have become
        indispensable to modern retail. Yet they carry a hidden cost: they are
        almost impossible to recycle.
      </p>
      <p>
        Globally, close to 650 million tons of plastic are consumed each year,
        and nearly 40 percent of that is used in multi‑layer packaging. Unlike
        broken buckets or chairs that a scrap collector can easily resell, these
        laminated plastics have zero recycling value. Less than one percent of
        them are recycled worldwide. The rest end up in landfills, incinerators,
        cement plants, or water bodies, where they linger for 500 to 600 years,
        leaching into soil and water and creating severe environmental hazards.
        For Raghuram, this was not just an industry statistic—it was a moral
        call to action.
      </p>
      <p>
        Together with two fellow directors, he founded Green Recykloplast
        Solutions Private Limited, a company dedicated to finding innovative
        ways to recycle multi‑layer plastics. “Since we come from the packaging
        background, we thought it is our responsibility to identify and work out
        unique solutions,” he explains. What began as a humble experiment has
        grown into a pioneering enterprise that is redefining how society thinks
        about waste.
      </p>
      <p>
        At the heart of Green Recykloplast’s work is a customized segregation
        and processing system. The company collects post‑consumer plastics from
        industries, municipal corporations, and urban local bodies, then
        transforms them into durable, value‑added products. The results are both
        practical and symbolic. One hundred and fifty discarded biscuit wrappers
        can be reborn as a writing pad for schoolchildren. Industrial storage
        pallets, outdoor furniture like garden benches and poolside recliners,
        and weatherproof profiles are all part of their portfolio. By converting
        heterogeneous mixed plastics into paver blocks, hollow bricks, and
        construction materials, the company demonstrates how waste can be
        reimagined into long‑lasting solutions.
      </p>
      <p>
        The impact goes beyond recycling. Every bench or pallet produced saves
        trees from being cut, every brick reduces the burden on landfills, and
        every notebook represents a step toward a circular economy. Their
        products are designed to be all‑weather, termite‑proof, and sustainable,
        offering industries and communities alternatives that preserve natural
        resources while reducing pollution.
      </p>
      <p>
        Green Recykloplast’s vision, as outlined on their website, is expansive.
        They position themselves as a{" "}
        <strong>360‑degree solution provider</strong> for plastic waste
        management, aiming to reduce carbon footprints, cut transport costs, and
        help corporates meet their CSR obligations. Their mission is clear: to
        upcycle 100 percent of the plastics they handle, turning what was once
        considered “zero‑value” waste into useful, long‑lasting products. From
        PET bottles to multi‑layer laminates, their processes are designed to
        shrink waste volume by up to 85 percent, saving space, fuel, and
        emissions. The company’s outputs are diverse, ranging from industrial
        goods to consumer products—even textiles like recycled T‑shirts.
      </p>
      <p>
        What sets Green Recykloplast apart is not just technology but
        philosophy. Raghuram insists that recycling is not a business add‑on but
        a societal responsibility. “We are polluting the atmosphere to such an
        extent that we are not able to give a proper, clean, green environment
        to our future citizens,” he says. His call is not only to industries but
        to individuals: to join a recycling revolution that protects forests,
        reduces pollution, and ensures a cleaner planet for generations to come.
      </p>
      <p>
        From a small team with a bold idea to a company with pan‑India and
        global ambitions, Green Recykloplast embodies the belief that innovation
        can solve entrenched environmental problems. Their journey is proof that
        responsibility, when paired with creativity, can turn waste into worth.
        And in Raghuram’s vision, every wrapper, packet, and scrap of plastic is
        not the end of a product’s life, but the beginning of something new.
      </p>
    </>
  );

  const recentPosts = dynamicRecentPosts || [
    {
      title: "NexGen Software Solutions",
      link: "/stage-behind-the-story/nexgen-software",
    },
    {
      title: "Leenus Infra builds Smarter",
      link: "/founders-unfiltered/leenus-infra",
    },
    {
      title: "Sindhu Reddy on Zenith Energy",
      link: "/founders-unfiltered/sindhu-reddy",
    },
  ];

  return (
    <PodLayout
      category="The stage behind the story"
      title="Turning Waste Into Worth: The Story of Raghuram Natarajan and Green Recykloplast"
      image={sampleImage}
      content={content}
      recentPosts={recentPosts}
      sponsoredImage={sponsoredImage}
    />
  );
};

export default GreenRecykloplastPost;
