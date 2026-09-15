import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        
        <div className="not-found-content">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-message">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              ← Back to Home
            </Link>
            <Link to="/" className="btn btn-secondary">
              Browse Products
            </Link>
          </div>
        </div>

        <div className="not-found-illustration">
          <div className="illustration-content">
            <span className="illustration-icon">📦❌</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default NotFoundPage;
