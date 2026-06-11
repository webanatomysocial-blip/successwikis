import React from 'react';
import '../css/index.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page-container" style={{ padding: '120px 40px', margin: '0 auto', fontFamily: 'var(--font-primary)' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '40px' }}>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Last updated: 25-08-2025</p>

      <div className="legal-content" style={{ lineHeight: '1.8', fontSize: '16px', color: '#333' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>Introduction</h3>
        <p>Success Wikis (“we”, “us”, “our”) values your privacy. This policy explains how we collect, use, and protect your personal data when you use our services.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>1. Information We Collect</h3>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '10px' }}><strong>Personal data you provide:</strong> e.g., email for newsletters or comments.</li>
            <li style={{ marginBottom: '10px' }}><strong>Automatically collected data:</strong> e.g., IP address, browser type, device information, browsing behavior (via cookies and analytics).</li>
        </ul>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>2. How We Use Your Data</h3>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
            <li style={{ marginBottom: '10px' }}>To maintain and improve our services.</li>
            <li style={{ marginBottom: '10px' }}>To personalize content and marketing.</li>
            <li style={{ marginBottom: '10px' }}>To communicate with you (e.g., respond to requests).</li>
            <li style={{ marginBottom: '10px' }}>To analyze usage and improve user experience.</li>
        </ul>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>3. Cookies & Tracking Technologies</h3>
        <p>We use cookies as described in our Cookies Policy above.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>4. Sharing Your Information</h3>
        <p>We may share data with service providers (e.g., hosting, analytics), who must keep it confidential and secure. We may also comply with legal requests (like subpoenas).</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>5. Your Rights</h3>
        <p>If applicable under laws like GDPR or CCPA, you may have the right to access, correct, or delete your data, as well as opt-out of data processing. Contact us to exercise these rights.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>6. Data Security & Retention</h3>
        <p>We implement appropriate technical and organizational measures to protect your data. We retain data only as long as needed for the purposes described or as required by law.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>7. Children’s Privacy</h3>
        <p>Our services are not intended for children under 16. We do not knowingly collect personal data from minors.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>8. International Transfers</h3>
        <p>If data is transferred outside your jurisdiction, we ensure adequate protections are in place.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>9. Changes to This Privacy Policy</h3>
        <p>We may revise this policy from time to time. The “Last updated” date at the top will reflect the latest changes.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>10. Contact Information</h3>
        <p>Questions or requests? Email us at hello@successwikis.com.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
