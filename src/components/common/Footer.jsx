
import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* BRAND INTRODUCTION */}
        <div className="footer-brand">
          <Link
            to="/"
            className="footer-logo"
            aria-label="VAULT KHAZANA Home"
          >
            <img
              className="footer-logo-image"
              src={`${import.meta.env.BASE_URL}images/vault-khazana-logo-light.png`}
              alt="VAULT KHAZANA"
            />
          </Link>

          <p className="footer-tagline">
            Packaging &amp; Food-Service Supplies
          </p>

          <p className="footer-description">
            From everyday food-service packaging to custom packaging
            solutions for your business.
          </p>
        </div>

        {/* FOOTER NAVIGATION COLUMNS */}
        <div className="footer-content">

          {/* COMPANY */}
          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <nav className="footer-nav" aria-label="Company">
              <Link to="/about-us">About Us</Link>

              <a
                href="https://wa.me/923335513428"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>

              <Link to="/" state={{ scrollTo: 'faq' }}>
                FAQ
              </Link>

              <Link to="/shipping-policy">
                Shipping Info
              </Link>
            </nav>
          </div>

          {/* BUSINESS */}
          <div className="footer-section">
            <h4 className="footer-title">Business</h4>
            <nav className="footer-nav" aria-label="Business">
              <Link to="/business-solutions">
                Business Solutions
              </Link>

              <Link to="/business-solutions">
                For Restaurants
              </Link>
            </nav>
          </div>

          {/* SHOP */}
          <div className="footer-section">
            <h4 className="footer-title">Shop</h4>
            <nav className="footer-nav" aria-label="Shop">
              <Link to="/">Home</Link>

              <Link
                to="/"
                state={{ scrollTo: 'shop-by-category' }}
              >
                All Products
              </Link>

              <Link to="/category/food-containers">
                Food Containers
              </Link>

              <Link to="/category/cups-drinkware">
                Cups &amp; Drinkware
              </Link>

              <Link to="/category/bags">
                Bags
              </Link>

              <Link to="/category/foil-wrap">
                Foil &amp; Wrap
              </Link>
            </nav>
          </div>

          {/* CONTACT */}
          <div className="footer-section">
            <h4 className="footer-title">Contact</h4>

            <div className="footer-contact">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@vaultkhazana.com">
                  info@vaultkhazana.com
                </a>
              </p>

              <p>
                <strong>WhatsApp:</strong>{' '}
                <a
                  href="https://wa.me/923335513428"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +92 333 5513428
                </a>
              </p>

              <p>
                <strong>Location:</strong>{' '}
                Islamabad, Pakistan
              </p>
            </div>
          </div>

        </div>

        {/* COPYRIGHT AND POLICY LINK */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} VAULT KHAZANA. All rights reserved.
            </p>

            <nav
              className="footer-legal"
              aria-label="Legal information"
            >
              <span className="footer-legal-item">
                <Link to="/shipping-policy">
                  Shipping Policy
                </Link>
              </span>
            </nav>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
