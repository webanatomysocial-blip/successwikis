import React from 'react';

export const metadata = {
  title: "Our Works - SuccessWikis",
  description: "Discover our portfolio of publications, interactive podcasts, visual essays, and special features on SuccessWikis.",
};

const Works = () => {
    return (
        <div className="page-container" style={{ padding: "100px 20px", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 className="head-text">Our Works</h1>
            <p className="para-text" style={{ marginTop: "20px" }}>Check out our portfolio of storytelling features and creative media partnerships.</p>
        </div>
    );
};

export default Works;
