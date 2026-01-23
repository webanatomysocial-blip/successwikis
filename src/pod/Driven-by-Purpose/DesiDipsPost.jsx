import React from 'react';
import PodLayout from '../../components/PodLayout';
import sampleImage from '../../assets/Driven-by-Purpose/Desi-Dips.png'; 
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

const DesiDipsPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <p>
                In a world of mass-produced condiments and artificial flavors, <strong>Desi Dips</strong> is quietly reigniting tradition in one jar at a time. Inspired by age-old recipes and powered by local communities, they bring you preservative-free South Indian chutneys, sambar and wide range of products that are crafted in small batches using trusted farm-fresh pulses, spices and herbs.
            </p>

            <h2>More Than a Dip, It Is A Cultural Revival.</h2>
            <p>
                Desi Dips doesn’t just aim for taste, it crafts a heritage experience. Each product mirrors the texture and aroma of home-cooked flavors while embracing modern convenience. Whether it’s coconut, peanut or mint chutney, these instant delights invite home cooks to “elevate your meals with a burst of tradition”.
            </p>

            <h2>Sustainability Woven into Every Spoonful</h2>
            <p>
                Commitment to tradition meets compassionate commerce here. Every ingredient is plant-based and sustainably sourced. Plus, with every purchase, Desi Dips supports women’s livelihoods and child education by bringing cultural nourishment and social impact together.
            </p>

            <h2>Why Desi Dips Stands Out</h2>
            <ul>
                <li><strong>Authenticity with Integrity:</strong> Traditional recipes meticulously recreated without preservatives, ensuring both quality and cultural lineage.</li>
                <li><strong>Small-Batch Craftsmanship:</strong> Each batch honors flavor and attention to detail, avoiding compromises that come from scaling up.</li>
                <li><strong>Empowered Communities:</strong> Supporting local farmers and bolstering community welfare adds depth and responsibility to every serving.</li>
            </ul>

            <h2>Why This Matters Now</h2>
            <p>
                As convenience culture dominates, many authentic flavors fade unattended. Desi Dips challenges that by offering an easy, nostalgic bridge and letting families taste the past without the prep.
            </p>
            <p>
                In a marketplace full of flash, Desi Dips stands for soul. It reminds us that food isn’t just sustenance but it’s an identity, memory and connection.
            </p>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Raghav Foundation: Building Schools', link: '/driven-by-purpose/raghav-foundation' },
        { title: 'Zenith Energy – Turning Efficiency Into Legacy', link: '/driven-by-purpose/zenith-energy' },
        { title: 'AEC Sastra: Shaping Global AEC Leaders', link: '/driven-by-purpose/aec-sastra' }
    ];

    return (
        <PodLayout 
            category="Driven by Purpose"
            title="Desi Dips: Authentic Chutneys That Do More Than Just Taste Good"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage} 
        />
    );
};

export default DesiDipsPost;
