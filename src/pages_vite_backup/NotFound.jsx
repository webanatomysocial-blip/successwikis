import React from 'react';
import { Link } from 'react-router-dom';
import '../css/404.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-visual">
          <div className="error-code">404</div>
          <div className="error-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="95" fill="none" stroke="#e0e0e0" strokeWidth="2" />
              <path d="M 70 120 Q 100 150 130 120" stroke="#ccc" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="80" cy="85" r="5" fill="#ccc" />
              <circle cx="120" cy="85" r="5" fill="#ccc" />
              <line x1="50" y1="40" x2="150" y2="40" stroke="#e0e0e0" strokeWidth="2" />
              <line x1="55" y1="50" x2="145" y2="50" stroke="#e0e0e0" strokeWidth="2" />
              <line x1="60" y1="60" x2="140" y2="60" stroke="#e0e0e0" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
        </div>

        <div className="not-found-text">
          <h1>Oops! Page Not Found</h1>
          <p>
            We couldn't find the page you're looking for. But don't worry, there are plenty of success stories waiting for you!
          </p>
            <Link to="/" className="black-bg-btn" style={{ margin: '0 auto' , marginTop: '20px' }}>
             Go to Home Page
            </Link>

        </div>

     
       
      </div>
    </div>
  );
};

export default NotFound;
