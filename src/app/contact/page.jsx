import React from "react";
import "../../css/contact.css";
import contactImagePlaceholder from "../../assets/contact-page/banner.jpg";
import Image from "next/image";

export const metadata = {
  title: "Contact Us - SuccessWikis",
  description: "Get in touch with SuccessWikis to advertise, publish your story, suggest a feature, or report a bug.",
};

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-wrapper">
          {/* Left: Text Content */}
          <div className="contact-content">
            <h1 className="head-text">Do you have a Great Idea?</h1>
            <p className="sub-para-text">
              Get in touch with us to see how we can work together
            </p>

            <div className="contact-section">
              <h2 className="sub-head-text">Advertise</h2>
              <p className="para-text">
                Success story reaches millions of potential visitors every
                month, your brand will be associated with Premium content and
                reaches visitors you are looking for
              </p>
              <a
                href="mailto:hello@successwikis.com?cc=srujan@mosol9.com"
                className="contact-btn"
              >
                Contact Us
              </a>
            </div>
            <div className="contact-section">
              <h2 className="sub-head-text">
                Bug / Suggestions / Something to Share
              </h2>
              <p className="para-text">
                Please use contact form if have anything to share with us.
              </p>
            </div>
          </div>

          {/* Right: Image */}
          <div className="contact-image-wrapper">
            <Image src={contactImagePlaceholder} alt="Team Meeting" priority />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
