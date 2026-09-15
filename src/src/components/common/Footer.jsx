import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* FOOTER CONTENT */}
        <div className="footer-content">
          
          {/* BRAND SECTION */}
          <div className="footer-section footer-brand">
            <div className="footer-logo">
              <span className="footer-vk">VK</span>
              <span className="footer-name">VAULT KHAZANA</span>
            </div>
            <p className="footer-tagline">
              Packaging & Food-Service Supplies
            </p>
            <p className="footer-description">
              Trusted quality disposables delivered nationwide across Pakistan.
            </p>
          </div>

          {/* NAVIGATION SECTION */}
          <div className="footer-section">
            <h4 className="footer-title">Shop</h4>
            <nav className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/">All Products</Link>
              <Link to="/category/food-containers">Food Containers</Link>
              <Link to="/category/cups-drinkware">Cups & Drinkware</Link>
              <Link to="/category/bags">Bags</Link>
              <Link to="/category/foil-wrap">Foil & Wrap</Link>
            </nav>
          </div>

          {/* BUSINESS SECTION */}
          <div className="footer-section">
            <h4 className="footer-title">Business</h4>
            <nav className="footer-nav">
              <Link to="/">Wholesale Pricing</Link>
              <Link to="/">Bulk Orders</Link>
              <Link to="/">Business Solutions</Link>
              <Link to="/">For Restaurants</Link>
            </nav>
          </div>

          {/* COMPANY SECTION */}
          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <nav className="footer-nav">
              <Link to="/">About Us</Link>
              <Link to="/">Contact</Link>
              <Link to="/">FAQ</Link>
              <Link to="/">Shipping Info</Link>
            </nav>
          </div>

          {/* CONTACT SECTION */}
          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact">
              <p>
                <strong>Email:</strong><br />
                <a href="mailto:info@vaultkhazana.com">
                  info@vaultkhazana.com
                </a>
              </p>
              <p>
                <strong>WhatsApp:</strong><br />
                <a href="https://wa.me/923001234567">
                  +92 300 1234567
                </a>
              </p>
              <p>
                <strong>Location:</strong><br />
                Islamabad, Pakistan
              </p>
            </div>
          </div>

        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} VAULT KHAZANA. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="/">Privacy Policy</Link>
              <span className="separator">•</span>
              <Link to="/">Terms of Service</Link>
              <span className="separator">•</span>
              <Link to="/">Shipping Policy</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
