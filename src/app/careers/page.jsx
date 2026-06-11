import React from 'react';

export const metadata = {
  title: "Careers - SuccessWikis",
  description: "Join the team at SuccessWikis. Find open roles and career opportunities in digital media and storytelling.",
};

const Careers = () => {
    return (
        <div className="page-container" style={{ padding: "100px 20px", maxWidth: "1200px", margin: "0 auto" }}>
            <h1 className="head-text">Careers</h1>
            <p className="para-text" style={{ marginTop: "20px" }}>Join our team. Check back soon for open roles!</p>
        </div>
    );
};

export default Careers;
