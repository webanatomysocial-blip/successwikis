import React from 'react';
import PodLayout from '../../components/PodLayout';
import sampleImage from '../../assets/Founder\'s-Unfiltered/leenus.png'; 
import sponsoredImage from '../../assets/Sponsored/sponsored-image.jpg';

const LeenusInfraPost = ({ dynamicRecentPosts }) => {
    const content = (
        <>
            <h2>What does your company do, and what problem does it solve?</h2>
            <p>
                At <strong>Leenus Infra Pvt. Ltd.</strong>, we provide end-to-end solutions for piping networks—from underground drainage and stormwater management to drinking water supply and water storage systems. We are proud to be an Authorized Distributor for <strong>Supreme Pipes</strong>, India’s leading brand in plastic piping solutions, which ensures our clients receive only the highest-quality, certified products.
            </p>
            <p>
                In a market where delays, inconsistent quality, and lack of technical support can disrupt entire projects, we solve these problems by being a single, dependable partner—offering highest-quality products, skilled installation, and 24/7 service to ensure projects run smoothly from start to finish.
            </p>

            <h2>What’s something that sets your business apart from others in your space?</h2>
            <p>
                We don’t just sell products—we deliver complete infrastructure solutions. Our key differentiator is the ability to combine premium products from Supreme with expert in-house services such as survey and design, pipe inspection, and civil works.
            </p>
            <p>
                We also offer innovative solutions like Ultra Manholes—up to 90% lighter than concrete, watertight, corrosion-resistant, and hydraulically efficient. This blend of cutting-edge products, professional execution, and the credibility of being an Authorized Distributor for Supreme Pipes positions us as a trusted partner in every project.
            </p>

            <h2>What impact is your product/service creating for your customers or community?</h2>
            <p>
                Our work transforms communities by delivering hygienic, Ultra-modern drainage systems, efficient leak free drinking water supply networks, and sustainable water storage solutions. This directly improves public health, reduces flooding risks, and supports long-term infrastructure reliability.
            </p>
            <p>
                Through our role as an Authorized Distributor for Supreme Pipes, we ensure that every project benefits from proven, long-lasting materials that reduce maintenance costs and environmental impact.
            </p>

            <h2>How are you adding real value to your users beyond just selling something?</h2>
            <p>
                We see ourselves as partners, not just suppliers. That’s why we offer: Technical guidance to select the right products for specific site requirements, Customized design and engineering to ensure optimal performance, Proactive stock management, so projects never face last-minute shortages, Full installation services with certified expertise in Supreme product applications.
            </p>
            <p>
                This holistic approach ensures our clients save time, control costs, and build with confidence.
            </p>

            <h2>What does success mean to you personally — and how has that evolved over time?</h2>
            <p>
                For us, success is defined by trust, reliability, and long-term impact. In our early days, success meant delivering on orders. Today, it means delivering complete, future-ready infrastructure solutions, leveraging the quality of Supreme products and our expertise, to improve lives and support sustainable development.
            </p>

            <h2>If people remember only one thing from your story, what should it be?</h2>
            <blockquote className="pod-quote">
                That Leenus Infra Pvt. Ltd. is your trusted, full-service infrastructure partner—an Authorized Distributor for Supreme Pipes, delivering certified products, expert execution, and unmatched reliability to help you build better, faster, and smarter.
            </blockquote>
        </>
    );

    const recentPosts = dynamicRecentPosts || [
        { title: 'Sindhu Reddy on Powering a Greener Future', link: '/founders-unfiltered/sindhu-reddy' },
        { title: 'Raghu Boddu on ToggleNow', link: '/founders-unfiltered/raghu-boddu' },
        { title: 'Tarini Sai Padmanabhan', link: '/stage-behind-the-story/tarini-sai' }
    ];

    return (
        <PodLayout 
            category="Founder's Unfiltered"
            title="From Supreme Pipes to Complete Infrastructure – How Leenus Infra Builds Smarter"
            image={sampleImage}
            content={content}
            recentPosts={recentPosts}
            sponsoredImage={sponsoredImage} 
        />
    );
};

export default LeenusInfraPost;
