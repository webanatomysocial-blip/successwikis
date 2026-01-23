import React from "react";
import BlogLayout from "../components/BlogLayout";
import solarImg from "../assets/success-wire/solar.webp";

const NightSolarTech = ({ dynamicRecentPosts }) => {
  const content = (
    <>
      <p>
        Researchers at Stanford University and UNSW Sydney have made significant
        progress in developing solar technology that can generate electricity
        after dark, a concept often referred to as “anti-solar” or night-solar
        cells. The innovation relies on thermoradiative diodes, which capture
        infrared radiation emitted by the Earth’s surface as it cools at night.
        By converting this radiation into usable energy, scientists are tackling
        one of the most persistent challenges in renewable power: the dependence
        on daylight and the heavy reliance on battery storage.
      </p>
      <p>
        Traditional solar panels work by absorbing photons from sunlight and
        converting them into electricity. At night, however, the absence of
        sunlight has meant that solar systems must rely on stored energy or
        backup sources. Thermoradiative cells flip this principle by radiating
        heat into the cold night sky, creating a flow of electrons that can be
        harvested as electricity. While the energy output is modest compared to
        daytime solar generation, the breakthrough demonstrates that renewable
        energy production can continue even without direct sunlight.
      </p>
      <p>
        The Stanford team’s prototype, tested in 2022, produced measurable
        electricity at night by exploiting radiative cooling. UNSW Sydney
        researchers achieved similar results with their thermoradiative diode
        experiments, confirming that the principle can be applied across
        different environments. These findings have sparked global interest,
        with scientists and energy analysts noting that the technology could
        complement existing solar systems and reduce the need for large-scale
        battery installations.
      </p>
      <p>
        The implications are far-reaching. Energy demand often peaks in the
        evening when households use appliances, lighting, and heating or cooling
        systems. Night-solar panels could help balance supply during these
        hours, reducing strain on grids and lowering reliance on fossil fuel
        backup systems. In regions with limited access to electricity, the
        ability to generate power after sunset could be transformative, offering
        new opportunities for development and sustainability.
      </p>
      <p>
        Experts caution that challenges remain before commercialization.
        Producing thermoradiative cells requires specialized materials and
        processes that are currently expensive. Efficiency levels also need to
        improve significantly to make the technology viable at scale.
        Researchers emphasize that further innovation, investment, and
        collaboration with industry will be essential to move from laboratory
        prototypes to widespread deployment.
      </p>
      <p>
        Despite these hurdles, the scientific progress marks an important step
        toward diversifying renewable energy sources. Industry observers suggest
        that startups and investors may soon enter the field, building on the
        foundation laid by academic research. If successful, night-solar
        technology could reshape the renewable landscape, proving that solar
        power does not have to stop when the sun goes down.
      </p>
    </>
  );

  return (
    <BlogLayout
      category="Success Wire"
      title="Scientists Advance Night-Solar Technology with Breakthrough Thermoradiative Cells"
      image={solarImg}
      content={content}
      recentPosts={dynamicRecentPosts}
    />
  );
};

export default NightSolarTech;
