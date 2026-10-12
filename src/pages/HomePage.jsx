
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data/products';
import './pages.css';
import './good-finds.css';
import '../styles/home-hero.css';
import '../styles/category-image-pilot.css';

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo !== 'shop-by-category') return;

    const scrollToCategories = () => {
      const section = document.getElementById('shop-by-category');

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const frame = window.requestAnimationFrame(scrollToCategories);
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  // Hide Takeaway Packaging from the homepage category grid.
  const visibleCategories = CATEGORIES.filter(
    category => category.id !== 'takeaway-packaging'
  );

  const garbageBags = PRODUCTS.find(
    product => product.id === 'heavy-duty-black-waste-bags'
  );

  const aluminumContainer = PRODUCTS.find(
    product => product.id === 'f1-aluminum-container'
  );

  return (
    <div className="home-page">

      {/* STATIC HERO — PRESERVED */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-visual">
            <div className="hero-video-frame">
              <img
                src={`${import.meta.env.BASE_URL}images/vault-khazana-hero.png`}
                className="hero-video"
                alt="VAULT KHAZANA packaging and food-service supplies"
                fetchPriority="high"
              />

              <div className="hero-content">
                <h1 className="hero-title">
                  From Packaging to Brand
                </h1>

                <p className="hero-description">
                  Shop everyday food-service packaging or create custom packaging for your business.
                </p>

                <div className="hero-actions">
                  <Link
                    to="/"
                    state={{ scrollTo: 'shop-by-category' }}
                    className="hero-button hero-button-primary"
                  >
                    Shop Products
                    <span className="button-arrow" aria-hidden="true">→</span>
                  </Link>

                  <Link
                    to="/business-solutions"
                    className="hero-button hero-button-secondary"
                  >
                    Business Solutions
                    <span className="button-arrow" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section
        className="section section-categories"
        id="shop-by-category"
      >
        <div className="container">
          <div className="section-heading">
            <h2>Shop by Category</h2>
          </div>

          <div className="category-grid">
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="category-card category-card--image"
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/category-${category.id}.jpg`}
                  className="category-card-image"
                  alt={`${category.name} products`}
                  loading="lazy"
                />

                <div className="category-card-copy">
                  <h3 className="category-name">
                    {category.name}
                  </h3>

                  <p className="category-desc">
                    {category.description}
                  </p>
                </div>

                <span className="category-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GOOD FINDS. BETTER PRICES. */}
      <section
        className="section good-finds-section"
        id="good-finds-better-prices"
      >
        <div className="container">
          <div className="good-finds-heading">
            <p className="eyebrow">CURATED OFFERS</p>
            <h2>Good Finds. Better Prices.</h2>
            <p>
              Selected finds for everyday needs and business orders.
              Offer details and prices will be added soon.
            </p>
          </div>

          <div className="good-finds-banner">
            <img
              src={`${import.meta.env.BASE_URL}images/good-finds-better-prices-hero.png`}
              alt="Good Finds. Better Prices. Selected offers from VAULT KHAZANA"
              loading="lazy"
            />
          </div>

          <div className="good-finds-grid">

            {/* OFFER 1 — GARBAGE BAGS */}
            <article className="good-finds-card">
              <div className="good-finds-card-image">
                {garbageBags?.images?.[0] && (
                  <img
                    src={garbageBags.images[0]}
                    alt="Garbage bags"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="good-finds-card-copy">
                <p className="good-finds-card-label">
                  EVERYDAY FIND
                </p>

                <h3>Garbage Bags</h3>

                <p>
                  Offer details and pricing coming soon.
                </p>

                <Link
                  to="/category/bags"
                  className="good-finds-link"
                >
                  Explore Bags <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* OFFER 2 — ALUMINIUM FOIL CONTAINERS */}
            <article className="good-finds-card">
              <div className="good-finds-card-image">
                {aluminumContainer?.images?.[0] && (
                  <img
                    src={aluminumContainer.images[0]}
                    alt="Aluminium foil food container with lid"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="good-finds-card-copy">
                <p className="good-finds-card-label">
                  BUSINESS OFFER
                </p>

                <h3>Aluminium Foil Containers</h3>

                <p>
                  Carton offer details and pricing coming soon.
                </p>

                <Link
                  to="/category/aluminum-containers"
                  className="good-finds-link"
                >
                  Explore Containers <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* BUSINESS SOLUTIONS — PRESERVED */}
      <section className="section section-business-solutions">
        <div className="container">
          <div className="business-solutions-shell">
            <div className="business-solutions-copy">
              <p className="eyebrow">BUSINESS SOLUTIONS</p>

              <h2>Put Your Brand on Every Order</h2>

              <p className="business-solutions-lead">
                Custom packaging that looks like your business.
              </p>

              <p className="business-solutions-text">
                From printed cups and takeaway bags to branded food
                packaging and labels, explore packaging, branding and
                printing support built around your food business.
              </p>

              <div className="business-solutions-tags">
                <span>Printed Cups</span>
                <span>Branded Bags</span>
                <span>Labels &amp; Packaging</span>
              </div>

              <Link
                to="/business-solutions"
                className="btn btn-accent business-solutions-button"
              >
                Explore Business Solutions
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div
              className="business-solutions-visual"
              aria-label="Branded packaging, printing and business solutions showcase"
            >
              <div className="business-visual-glow"></div>

              <img
                src={`${import.meta.env.BASE_URL}images/business-solutions-showcase.png`}
                className="business-solutions-showcase-image"
                alt="Branded packaging, labels, printed materials and business solutions showcase"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section section-benefits bg-light">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why Choose Us</p>
            <h2>Reliable supplies for everyday business</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3>Nationwide Delivery</h3>
              <p>Reliable shipping to locations across Pakistan.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">✓</div>
              <h3>Quality Products</h3>
              <p>Practical packaging supplies for food-service needs.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Competitive Prices</h3>
              <p>Clear pricing for everyday purchasing.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📞</div>
              <h3>Easy Support</h3>
              <p>Contact us for product questions or special requests.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-how-it-works bg-light">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Simple Process</p>
            <h2>How it works</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Browse</h3>
              <p>Explore our range of packaging supplies.</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Choose</h3>
              <p>Select the products and quantities you need.</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Order</h3>
              <p>Add products to your cart and proceed to checkout.</p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Receive</h3>
              <p>Get your order delivered to your location.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need help choosing?</h2>

            <p>
              Get in touch with our team for questions
              or product guidance.
            </p>

            <a href="/" className="btn btn-accent btn-lg">
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
