import React from 'react';
import Image from 'next/image';
import PodLayout from '../../components/PodLayout';
import singaraImg from '../../assets/The-stage-behind-the-story/Sinagara-Mohan.jpeg';
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

// Inner images
import innerImg1 from './innerImages/Sinagara-Mohan/WhatsApp Image 2026-04-20 at 7.09.36 PM.jpeg';
import innerImg2 from './innerImages/Sinagara-Mohan/WhatsApp Image 2026-04-20 at 7.09.36 PM (1).jpeg';
import innerImg3 from './innerImages/Sinagara-Mohan/WhatsApp Image 2026-04-20 at 7.09.36 PM (2).jpeg';
import innerImg4 from './innerImages/Sinagara-Mohan/WhatsApp Image 2026-04-20 at 7.09.37 PM.jpeg';
import innerImg5 from './innerImages/Sinagara-Mohan/WhatsApp Image 2026-04-20 at 7.09.47 PM.jpeg';

const SingaraMohanPost = ({ dynamicRecentPosts, postId }) => {
    const content = (
        <>
            <h2>Introducing the Filmmaker</h2>
            <p>
                Singara Mohan, the filmmaker behind <em>Kaalamega Karigindhi</em>, has always
                carried the intention of becoming a storyteller. His early exposure was to
                massy, commercial films in small-town theatres, but as he grew older and
                discovered world cinema and OTT platforms, his perspective shifted. He
                began to see cinema as a medium to spread ideology and emotion, not just
                spectacle. That realization led him toward art films and stories built on
                innocence and poetic sensibilities.
            </p>

            <Image
                src={innerImg1}
                alt="Singara Mohan — filmmaker behind Kaalamega Karigindhi"
                style={{ width: '100%', height: 'auto', borderRadius: '10px', margin: '24px 0' }}
            />

            <h2>The Spark of Filmmaking</h2>
            <p>
                Initially, Mohan viewed filmmaking as an overrated profession, associated
                more with fame than craft. But once he began researching the practical side
                of cinema, he realized the true power of writing and storytelling. Watching
                films that relied on pure emotion rather than high-octane action convinced
                him that audiences could be moved deeply through simple, well-written
                scenes. This insight pushed him to start writing sensible, emotion-driven
                stories.
            </p>

            <h2>The Birth of Kaalamega Karigindhi</h2>
            <p>
                The idea for <em>Kaalamega Karigindhi</em> came from Mohan's reflections on
                memories. He felt that memories haunt us more than anything else, and
                writing from lived experience would be more genuine and convincing. School
                memories, with their innocence, became the foundation of the film. He
                wanted to capture that purity, believing that childhood characters could best
                reflect innocence in its truest form.
            </p>

            <Image
                src={innerImg2}
                alt="Singara Mohan on the sets of Kaalamega Karigindhi"
                style={{ width: '100%', height: 'auto', borderRadius: '10px', margin: '24px 0' }}
            />

            <h2>Poetry and Language</h2>
            <p>
                Mohan has been writing poetry since his teenage years, influenced by his
                Telugu-medium education. He absorbed the language deeply and began
                composing verses early on. With Telugu losing prominence in mainstream
                cinema, he felt compelled to create a film that celebrated the language in its
                purest form. <em>Kaalamega Karigindhi</em> became a vehicle to showcase poetry
                and metaphor, weaving them naturally into the storytelling.
            </p>

            <h2>Directing New Actors</h2>
            <p>
                His approach to directing actors was rooted in authenticity. Rather than
                forcing performers into roles, he sought out individuals whose real-life
                sensibilities matched the characters he had written. This casting philosophy
                made performances feel natural and innocent, aligning with the film's
                themes. Working with new faces also suited the budget constraints of an
                independent production, but Mohan turned that limitation into a strength by
                prioritizing fit over fame.
            </p>

            <Image
                src={innerImg3}
                alt="Singara Mohan directing a scene from Kaalamega Karigindhi"
                style={{ width: '100%', height: 'auto', borderRadius: '10px', margin: '24px 0' }}
            />

            <h2>Challenges of Production</h2>
            <p>
                Singara Mohan explained that the biggest challenge was budget. The film
                was completed in just 12–13 days. To achieve this, Singara Mohan and his team
                had to prepare extensively, aiming to shoot eight minutes of final footage per
                day, which was far above the industry norm. Despite careful planning, delays
                with costumes, properties, and actor availability forced them to adapt
                constantly. Scheduling became a battle, but the team pushed through,
                determined not to compromise on quality.
            </p>

            <h2>Commitment to Vision</h2>
            <p>
                Independent filmmaking inevitably involves compromises, but Mohan
                refused to dilute his vision. He believed that with no known faces or big
                names, the product itself had to impress audiences. Post-production became
                the space where he compensated for limitations, reworking until the film met
                his standards. This persistence meant the project stretched from early 2022 to
                mid-2025, but the final output was worth the wait.
            </p>

            <Image
                src={innerImg4}
                alt="Behind the scenes — Kaalamega Karigindhi production"
                style={{ width: '100%', height: 'auto', borderRadius: '10px', margin: '24px 0' }}
            />

            <h2>Feedback and Criticism</h2>
            <p>
                The most impactful feedback came around the film's use of poetry. Some
                viewers questioned why children spoke in such poetic language. Mohan had
                anticipated this criticism, but his reasoning was clear: the story is narrated by
                an adult in his thirties, recalling childhood memories through a poetic lens.
                The intention was never to present events literally, but to show how memory
                itself transforms into metaphor. While not everyone grasped this, the
                feedback pushed him to reflect on how audiences interpret artistic choices.
            </p>

            <h2>Indie vs. Mainstream</h2>
            <p>
                He sees indie filmmakers as capable of merging into the mainstream if
                production houses are willing to trust skill over spectacle. Ultimately, every
                filmmaker wants their content to reach more people. <em>Kaalamega Karigindhi</em>,
                he admits, deserved wider reach. He values the independence of having
                created and released the film without compromise.
            </p>

            <Image
                src={innerImg5}
                alt="Singara Mohan — a filmmaker's journey of passion and craft"
                style={{ width: '100%', height: 'auto', borderRadius: '10px', margin: '24px 0' }}
            />

            <h2>Defining Success</h2>
            <p>
                For Mohan, success lies in having completed and released a professional
                product with new faces and no mainstream backing, and still securing OTT
                approval. In a time when even big-budget films with known stars struggle to
                release, he sees this achievement as significant. Beyond revenues, success is
                when audiences understand the poetic gestures and essence he intended. As
                he puts it, if viewers can feel the raw emotion and metaphors in the trailer
                alone, then the film has fulfilled its purpose.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Shyam Sankeerth Gupta: Rejected Twice, Accepted Everywhere', link: '/stage-behind-the-story/shyam-sankeerth-gupta-applywizz' },
        { title: 'Krithika Roy: Creativity Without Borders', link: '/stage-behind-the-story/krithika-roy-realivant' },
        { title: 'The Soldier Who Rewired the Future', link: '/stage-behind-the-story/soldier-rewired' }
    ];

    return (
        <PodLayout
      postId={postId}
            category="The stage behind the story"
            title="Singara Mohan on Crafting Memories Into Cinema"
            image={singaraImg}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage}
        />
    );
};

export default SingaraMohanPost;
