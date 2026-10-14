import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data/products';
import useCartStore from '../store/cartStore';
import FAQSection from '../components/common/FAQSection';
import './pages.css';
import './good-finds.css';
import '../styles/home-hero.css';
import '../styles/category-image-pilot.css';

const BAG_OPTIONS = [
  { value: '18x24', label: '18 × 24 in — approx. 50 pieces' },
  { value: '20x30', label: '20 × 30 in — approx. 40 pieces' },
  { value: '24x36', label: '24 × 36 in — approx. 25 pieces' },
  { value: '30x50', label: '30 × 50 in — approx. 12–13 pieces' }
];

function HomePage() {
  const location = useLocation();
  const addOfferToCart = useCartStore((state) => state.addOfferToCart);

  const [selectedBagSize, setSelectedBagSize] = useState('18x24');
  const [offerMessage, setOfferMessage] = useState('');
  const [offerError, setOfferError] = useState('');

  const contactMessage = encodeURIComponent(
    'Hello VAULT KHAZANA, I have a question about your products, prices, availability, or delivery. Could you please help me?'
  );

  const whatsappContactUrl =
    `https://wa.me/923335513428?text=${contactMessage}`;

  useEffect(() => {
    const targetId = location.state?.scrollTo;

    if (!['shop-by-category', 'faq'].includes(targetId)) return;

    const scrollToTarget = () => {
      const section = document.getElementById(targetId);

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const frame = window.requestAnimationFrame(scrollToTarget);
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  const visibleCategories = CATEGORIES.filter(
    (category) => category.id !== 'takeaway-packaging'
  );

  const garbageBags = PRODUCTS.find(
    (product) => product.id === 'off-white-waste-bags'
  );

  const aluminumF1 = PRODUCTS.find(
    (product) => product.id === 'f1-aluminum-container'
  );

  const aluminumF3 = PRODUCTS.find(
    (product) => product.id === 'f3-aluminum-container'
  );

  const addSpecialOffer = (offer) => {
    setOfferMessage('');
    setOfferError('');

    const result = addOfferToCart(offer);

    if (!result?.success) {
      setOfferError(
        result?.error || 'Unable to add this offer. Please try again.'
      );
      return;
    }

    setOfferMessage(`${offer.displayName} added to your cart.`);
  };

  const selectedBag = BAG_OPTIONS.find(
    (option) => option.value === selectedBagSize
  );

  const addGarbageBags = () => {
    if (!garbageBags) {
      setOfferError('Garbage bag information is temporarily unavailable.');
      setOfferMessage('');
      return;
    }

    addSpecialOffer({
      productId: 'off-white-waste-bags',
      variantKey: selectedBagSize,
      variantLabel: selectedBag?.label || selectedBagSize,
      displayName: 'Garbage Bags',
      quantity: 1,
      unitPrice: 525,
      sellingUnit: 'kg',
      priceBasis: 'per kg',
      offerType: 'everyday',
      image: garbageBags.images?.[0] || '',
      moq: 1,
      step: 1,
      requiresAdvancePayment: false
    });
  };

  const addAluminumCarton = (product, model, price) => {
    if (!product) {
      setOfferError(
        `${model} product information is temporarily unavailable.`
      );
      setOfferMessage('');
      return;
    }

    addSpecialOffer({
      productId: product.id,
      variantKey: 'carton-1000',
      variantLabel: 'Carton of 1,000 pieces',
      displayName: `${model} Aluminium Container with Lid`,
      quantity: 1,
      unitPrice: price,
      priceBasis: 'per carton of 1,000 pieces',
      sellingUnit: 'carton',
      offerType: 'business',
      image: product.images?.[0] || '',
      moq: 1,
      step: 1,
      packSize: 1000,
      requiresAdvancePayment: true
    });
  };

  return (
    <div className="home-page">
      {/* STATIC HERO */}
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
                <h1 className="hero-title">From Packaging to Brand</h1>

                <p className="hero-description">
                  Shop everyday food-service packaging or create custom
                  packaging for your business.
                </p>

                <p className="hero-delivery-notice">
                  <strong>Local delivery:</strong> Islamabad and Rawalpindi
                  only. We’ll confirm the delivery charge before dispatch.
                </p>

                <div className="hero-actions">
                  <Link
                    to="/"
                    state={{ scrollTo: 'shop-by-category' }}
                    className="hero-button hero-button-primary"
                  >
                    Shop Products
                    <span className="button-arrow" aria-hidden="true">
                      →
                    </span>
                  </Link>

                  <Link
                    to="/business-solutions"
                    className="hero-button hero-button-secondary"
                  >
                    Business Solutions
                    <span className="button-arrow" aria-hidden="true">
                      →
                    </span>
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
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-desc">{category.description}</p>
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
            <p>Selected finds for everyday needs and business orders.</p>
          </div>

          {(offerMessage || offerError) && (
            <div
              className={`good-finds-feedback ${offerError ? 'is-error' : 'is-success'}`}
              role="status"
              aria-live="polite"
            >
              {offerError || offerMessage}
              {offerMessage && !offerError && (
                <Link to="/cart"> View cart →</Link>
              )}
            </div>
          )}

          <div className="good-finds-grid">
            {/* EVERYDAY FIND — GARBAGE BAGS */}
            <article className="good-finds-card">
              <div className="good-finds-card-copy">
                <p className="good-finds-card-label">EVERYDAY FIND</p>
                <h3>Garbage Bags</h3>
                <p>
                  Practical waste bags for homes, offices, shops, restaurants
                  and commercial spaces.
                </p>
              </div>

              <div className="good-finds-card-image">
                {garbageBags?.images?.[0] && (
                  <img
                    src={garbageBags.images[0]}
                    alt="Garbage bags"
                    loading="lazy"
                  />
                )}
              </div>

              <div className="good-finds-card-copy good-finds-garbage-purchase">
                <p className="good-finds-price">
                  Rs 525 <span>per kg</span>
                </p>

                <label
                  className="good-finds-select-label"
                  htmlFor="garbage-bag-size"
                >
                  Choose bag size
                </label>

                <select
                  id="garbage-bag-size"
                  className="good-finds-size-select"
                  value={selectedBagSize}
                  onChange={(event) => {
                    setSelectedBagSize(event.target.value);
                    setOfferMessage('');
                    setOfferError('');
                  }}
                >
                  {BAG_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <p className="good-finds-note">
                  Price is per kg. Bag count varies by size.
                </p>

                <button
                  type="button"
                  className="good-finds-add-button"
                  onClick={addGarbageBags}
                >
                  Add 1 kg to Cart
                </button>
              </div>
            </article>

            {/* BUSINESS OFFERS — F1 AND F3 */}
            <article className="good-finds-card">
              <div className="good-finds-card-copy good-finds-aluminum-heading">
                <p className="good-finds-card-label">BUSINESS OFFER</p>
                <h3>Aluminium Foil Containers</h3>
                <p>
                  Aluminium food containers with lids for takeaway, baking,
                  meal preparation and food storage.
                </p>
              </div>

              <div className="good-finds-model-grid">
                <div className="good-finds-model good-finds-offer-model">
                  <div className="good-finds-model-image">
                    {aluminumF1?.images?.[0] && (
                      <img
                        src={aluminumF1.images[0]}
                        alt="F1 aluminium foil food container with lid"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <h4>F1 Container with Lid</h4>
                  <p className="good-finds-price">Rs 13,500</p>
                  <p className="good-finds-unit">
                    Per carton · 1,000 pieces
                  </p>
                  <p className="good-finds-offer-payment">
                    Advance payment required for this business offer.
                    Delivery charges extra. Available in Rawalpindi and
                    Islamabad only.
                  </p>

                  <button
                    type="button"
                    className="good-finds-add-button"
                    onClick={() =>
                      addAluminumCarton(aluminumF1, 'F1', 13500)
                    }
                  >
                    Add F1 Carton to Cart
                  </button>
                </div>

                <div className="good-finds-model good-finds-offer-model">
                  <div className="good-finds-model-image">
                    {aluminumF3?.images?.[0] && (
                      <img
                        src={aluminumF3.images[0]}
                        alt="F3 aluminium foil food container with lid"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <h4>F3 Container with Lid</h4>
                  <p className="good-finds-price">Rs 27,500</p>
                  <p className="good-finds-unit">
                    Per carton · 1,000 pieces
                  </p>
                  <p className="good-finds-offer-payment">
                    Advance payment required for this business offer.
                    Delivery charges extra. Available in Rawalpindi and
                    Islamabad only.
                  </p>

                  <button
                    type="button"
                    className="good-finds-add-button"
                    onClick={() =>
                      addAluminumCarton(aluminumF3, 'F3', 27500)
                    }
                  >
                    Add F3 Carton to Cart
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* BUSINESS SOLUTIONS */}
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
                From printed cups and takeaway bags to branded food packaging
                and labels, explore packaging, branding and printing support
                built around your food business.
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
              <div className="benefit-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#1F3A5C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h23v21H5z" />
                  <path d="M28 20h8l7 8v5H28z" />
                  <circle cx="14" cy="36" r="4" />
                  <circle cx="36" cy="36" r="4" />
                  <path d="M31 20v8h12" />
                </svg>
              </div>
              <h3>Local Delivery</h3>
              <p>Delivery currently available in Islamabad and Rawalpindi.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#E67E22" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M24 5 39 11v11c0 10-6.4 16.8-15 21-8.6-4.2-15-11-15-21V11z" />
                  <path d="m16 24 5 5 11-12" />
                </svg>
              </div>
              <h3>Quality Products</h3>
              <p>Practical packaging supplies for food-service needs.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#1F3A5C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="24" r="18" />
                  <path d="M29 16c-1.3-1.5-3.2-2.3-5.5-2.3-3.3 0-5.5 1.7-5.5 4.2 0 6.7 12 2.7 12 9.1 0 2.8-2.5 4.7-6 4.7-2.7 0-5.2-1.1-6.7-3" />
                  <path d="M24 10v28" />
                </svg>
              </div>
              <h3>Competitive Prices</h3>
              <p>Clear pricing for everyday purchasing.</p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#E67E22" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 7h20a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6h-8l-9 7v-7h-3a6 6 0 0 1-6-6V13a6 6 0 0 1 6-6z" />
                  <path d="M17 17h14M17 23h10" />
                </svg>
              </div>
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

      {/* FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

      {/* CONTACT CTA */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need help choosing?</h2>
            <p>
              Get in touch with our team for questions or product guidance.
            </p>

            <a
              href={whatsappContactUrl}
              className="btn btn-accent btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;