import React from 'react';
import '../css/index.css';

const TermsOfUse = () => {
  return (
    <div className="legal-page-container" style={{ padding: '120px 40px', margin: '0 auto', fontFamily: 'var(--font-primary)' }}>
      <h1 style={{ fontSize: '42px', fontWeight: '700', marginBottom: '40px' }}>Legal / Terms of Use</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>Last updated: 25-08-2025</p>

      <div className="legal-content" style={{ lineHeight: '1.8', fontSize: '16px', color: '#333' }}>
        <p>Welcome to Success Wikis (“we”, “our”, “us”). By accessing or using our website at successwikis.com, you agree to these Terms of Use and our Privacy Policy. If you do not agree, please exit.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>1. Use of Content</h3>
        <p>All content is for informational purposes only. You may not reproduce, distribute, or modify content without explicit permission, except as permitted by law.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>2. Accuracy & Liability</h3>
        <p>While we strive for accuracy, we don’t guarantee content correctness, completeness, or suitability. You use the site at your own risk.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>3. User Contributions</h3>
        <p>If users submit content (e.g., comments, feedback), you grant us a non-exclusive, worldwide, royalty-free license to use, publish, and modify it.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>4. External Links</h3>
        <p>Our site may link to third-party sites—we’re not responsible for their content or policies.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>5. Intellectual Property</h3>
        <p>All website materials (text, graphics, logos) are our property or properly licensed and protected by copyright and trademark law.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>6. Modifications</h3>
        <p>We reserve the right to update these terms at any time. Continued use after updates implies consent.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>7. Governing Law</h3>
        <p>These Terms are governed by the laws of [Jurisdiction] without regard to conflict-of-law principles.</p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginTop: '40px', marginBottom: '20px' }}>8. Contact</h3>
        <p>Questions? Contact us at:<br />
        Email: hello@successwikis.com</p>
      </div>
    </div>
  );
};

export default TermsOfUse;
