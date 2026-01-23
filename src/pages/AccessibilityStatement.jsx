import React from 'react';
import '../css/index.css';

const AccessibilityStatement = () => {
  return (
    <div className="legal-page-container" style={{ padding: '120px 40px', margin: '0 auto', fontFamily: 'var(--font-primary)' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '40px' }}>Accessibility Statement</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Last updated: 25-08-2025</p>

      <div className="legal-content" style={{ lineHeight: '1.8', fontSize: '16px', color: '#333' }}>
        <p>At Success Wikis, we are committed to making our website accessible to all users, including those with disabilities.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Our Commitment</h3>
        <p>We are guided by Web Content Accessibility Guidelines (WCAG) 2.1 Level AA and strive to comply fully.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Accessibility Features</h3>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '10px' }}>Semantic HTML and clear structure for screen-reader compatibility.</li>
            <li style={{ marginBottom: '10px' }}>Alt text provided for images.</li>
            <li style={{ marginBottom: '10px' }}>Sufficient color contrast and scalable text.</li>
            <li style={{ marginBottom: '10px' }}>Keyboard navigation support.</li>
            <li style={{ marginBottom: '10px' }}>Responsive layout that works with assistive technologies.</li>
        </ul>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Known Issues</h3>
        <p>We’re actively working to address any accessibility gaps. If you encounter any barriers or need assistance, please let us know.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Feedback</h3>
        <p>Your feedback is important. Contact us at hello@successwikis.com or call +91-1234567890 with:</p>
         <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '10px' }}>The web page URL</li>
            <li style={{ marginBottom: '10px' }}>The issue you encountered</li>
            <li style={{ marginBottom: '10px' }}>Your assistive technology (if applicable)</li>
        </ul>
        <p>We aim to respond within 3 business days.</p>
      </div>
    </div>
  );
};

export default AccessibilityStatement;
