import React from 'react';
import '../css/about.css';
import groupImg from '../assets/about-images/group.png';
import vectorImg from '../assets/about-images/Vector.png';
import { BsCircleFill, BsFillDiamondFill, BsFillSunFill, BsCircleHalf, BsStars } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="about-page-hero">
                <h1 className='big-text-head' style={{wordSpacing: '10px'}}>We Tell Stories <br /> That Matter.</h1>
            </section>

            <section className="our-story-about-page">
                <h2 className='head-text'>Our <br /> Story</h2>
                <p className="para-text">
                    SuccessWikis began with a simple belief: the most powerful stories in entrepreneurship are often the ones left untold. Behind every pitch deck and headline lies a founder’s reality — the risks taken, the lessons learned, and the resilience that keeps them moving forward. 
                    <br /><br />
                    We created SuccessWikis to give those stories <strong>a home.</strong>
                </p>
            </section>

             <section className="about-split-section">
                <div className="split-abs-container">
                    <img src={groupImg} alt="Group" className="abs-group-img" />
                </div>

                <div className="split-left">
                    <div className="split-content">
                        <h2 className="head-text-white">Who We Are</h2>
                        <p className="para-text-white">
                            As an emerging media house built for founders who value authenticity over hype, we are a platform that curates and shares real entrepreneurial journeys, with all their challenges and breakthroughs.
                        </p>
                        <p className="para-text-white">
                            At our core, we are a professional community dedicated to turning entrepreneurial experiences into narratives that connect, teach, and endure.
                        </p>
                    </div>
                </div>
                
                <div className="split-right">
                    <div className="vector-abs-container">
                        <img src={vectorImg} alt="Vector" className="abs-vector-img" />
                    </div>
                    <div className="split-content">
                        <h2 className="head-text">What We Do</h2>
                        <p className="para-text">
                            At SuccessWikis, we capture the real journeys of entrepreneurship. We spotlight founders who are building with intent, documenting both the breakthroughs and the challenges that shape their path.
                        </p>
                        <p className="para-text">
                            Through interviews, features, and curated storytelling, we create a space where startups can share their experiences with honesty and professionalism. Our work is designed to amplify voices that matter, helping founders gain visibility among entrepreneurs, investors, and professionals who value genuine stories.
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Believe Section */}
            <section className="what-we-believe-section">
                <h2 className="head-text">What We Believe</h2>
                <div className="beliefs-grid">
                    <div className="belief-item">
                        <BsCircleFill className="belief-icon pill-icon" />
                        <p className="para-text">
                            We believe entrepreneurship is about more than building companies — it’s about building meaning.
                        </p>
                    </div>
                    <div className="belief-item">
                        <BsFillDiamondFill className="belief-icon diamond-icon" />
                        <p className="para-text">
                            We believe founders grow stronger when they share openly, learn from each other, and rise together.
                        </p>
                    </div>
                    <div className="belief-item">
                        <BsFillSunFill className="belief-icon sun-icon" />
                        <p className="para-text">
                            We believe the real lessons come from the full journey: the risks taken, the pivots made, the breakthroughs celebrated, and the failures endured.
                        </p>
                    </div>
                    <div className="belief-item">
                        <BsCircleHalf className="belief-icon moon-icon" />
                        <p className="para-text">
                            We believe stories matter because they connect people — not through numbers, but through shared experiences, emotions, and ideas.
                        </p>
                    </div>
                    <div className="belief-item">
                        <BsStars className="belief-icon star-icon" />
                        <p className="para-text">
                            Above all, we believe success is measured by impact — and impact is not just found in moments of success, but also in the failures that teach, shape, and define the path forward.
                        </p>
                    </div>
                    <div className="belief-item empty-item"></div>
                </div>
            </section>

            {/* Advertise & Idea Section */}
            <section className="advertise-idea-section">
                <div className="ad-idea-grid">
                    <div className="idea-left">
                        <h2 className="head-text">Do you have a <br /> Great Idea?</h2>
                        <p className="para-text">Get in touch with us to see how we can work together</p>
                    </div>
                    <div className="ad-right">
                        <div className="ad-text-block">
                            <h3 className="sub-head-text">Advertise</h3>
                            <p className="para-text">
                                Success story reaches millions of potential visitors every month, your brand will be associated with Premium content and reaches visitors you are looking for
                            </p>
                        </div>
                    </div>
                </div>
                <div className="ad-cta-container">
                    <Link to="/contact" className="contact-pill-btn" >Contact US</Link>
                </div>
            </section>


            
        </>
    );
};

export default About;
