import React from 'react';
import '../css/index.css';

const CookiesPolicy = () => {
  return (
    <div className="legal-page-container" style={{ padding: '120px 40px', margin: '0 auto', fontFamily: 'var(--font-primary)' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '40px' }}>Cookies Policy</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Last updated: 25-08-2025</p>

      <div className="legal-content" style={{ lineHeight: '1.8', fontSize: '16px', color: '#333' }}>
        <p>We use cookies and similar technologies (like web beacons and local storage) to enhance user experience and deliver personalized content and ads. This lets us analyze site performance and understand usage patterns.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>What are Cookies?</h3>
        <p>Small files stored on your device to recognize your browser, preferences, and improve site performance.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Types of Cookies We Use</h3>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '10px' }}><strong>Essential cookies:</strong> Required for site functionality (e.g., navigation, login).</li>
            <li style={{ marginBottom: '10px' }}><strong>Performance & Analytics cookies:</strong> Help us understand how you use the site and optimize performance.</li>
            <li style={{ marginBottom: '10px' }}><strong>Functional cookies:</strong> Remember preferences (e.g., language).</li>
            <li style={{ marginBottom: '10px' }}><strong>Advertising cookies:</strong> Deliver personalized ads and measure ad performance.</li>
        </ul>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Managing Cookies</h3>
        <p>You can set your browser to block cookies or delete existing ones—but this may affect your experience on Success Wikis.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Third-Party Cookies</h3>
        <p>We may allow third parties (ads, analytics) to place cookies. We do not control their use; please review their privacy policies for details.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Changes to This Policy</h3>
        <p>We may update this policy. Changes will be posted here with an updated “Last updated” date.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Contact Us</h3>
        <p>For questions, reach us at hello@successwikis.com.</p>
      </div>
    </div>
  );
};

export default CookiesPolicy;
