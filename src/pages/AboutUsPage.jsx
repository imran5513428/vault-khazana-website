import React from 'react';
import { Link } from 'react-router-dom';
import './about-us.css';

function AboutUsPage() {
  const whatsappMessage = encodeURIComponent(
    'Hello VAULT KHAZANA, I would like to discuss custom packaging and branding options for my business.'
  );

  const heroImage = `${import.meta.env.BASE_URL}images/vault-khazana-hero.png`;

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-container">
          <p className="about-eyebrow">GET TO KNOW US</p>
          <h1>About VAULT KHAZANA</h1>
          <h2>Everyday Supplies to Custom-Branded Packaging</h2>

          <p className="about-hero-text">
            At VAULT KHAZANA, we bring together everyday disposable items,
            food-service supplies and packaging for homes, workplaces and
            businesses.
          </p>

          <p className="about-hero-text">
            Whether you need a few items for home, regular supplies for an
            office, hospital or showroom, or packaging for your food business,
            we aim to help you find what you need.
          </p>

          <Link
            to="/"
            state={{ scrollTo: 'shop-by-category' }}
            className="about-button about-button-primary"
          >
            Shop Packaging <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="about-supplies">
        <div className="about-container about-supplies-layout">
          <div className="about-section-copy">
            <p className="about-eyebrow">FOR EVERYDAY NEEDS</p>
            <h2>Supplies for Different Needs</h2>
            <p>
              From household use to day-to-day business operations, we offer
              packaging and food-service essentials for different needs and
              order sizes, subject to product availability and minimum order
              quantities.
            </p>

            <Link
              to="/"
              state={{ scrollTo: 'shop-by-category' }}
              className="about-text-link"
            >
              Explore our products <span aria-hidden="true">→</span>
            </Link>
          </div>

          <Link
            to="/"
            state={{ scrollTo: 'shop-by-category' }}
            className="about-branding-visual about-supplies-hero-visual"
            style={{ order: 2 }}
            aria-label="Explore packaging and food-service products by category"
          >
            <img
              src={heroImage}
              alt="VAULT KHAZANA packaging and food-service supplies"
              loading="lazy"
            />
          </Link>
        </div>
      </section>

      <section className="about-branding">
        <div className="about-container about-branding-layout">
          <div className="about-branding-visual">
            <img
              src={`${import.meta.env.BASE_URL}images/business-solutions-showcase.png`}
              alt="Custom-branded packaging and printing showcase"
              loading="lazy"
            />
          </div>

          <div className="about-section-copy">
            <p className="about-eyebrow">MORE THAN EVERYDAY SUPPLIES</p>
            <h2>Make Your Packaging Your Own</h2>
            <p>
              We also help businesses explore custom-printed packaging through
              an experienced printing and branding team in Islamabad, with
              22 years of industry experience.
            </p>
            <p>
              From adding your logo to suitable packaging to exploring
              printing options for your products, we can help you take the
              next step.
            </p>

            <a
              href={`https://wa.me/923335513428?text=${whatsappMessage}`}
              className="about-button about-button-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discuss Custom Packaging <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="about-contact">
        <div className="about-container">
          <p className="about-eyebrow">LET'S TALK</p>
          <h2>Have Something Specific in Mind?</h2>
          <p>
            Tell us what you need, and let's discuss the options that may work
            for you.
          </p>

          <div className="about-contact-actions">
            <Link
              to="/"
              state={{ scrollTo: 'shop-by-category' }}
              className="about-button about-button-light"
            >
              Shop Packaging <span aria-hidden="true">→</span>
            </Link>

            <a
              href={`https://wa.me/923335513428?text=${whatsappMessage}`}
              className="about-contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us on WhatsApp ↗
            </a>
          </div>

          <p className="about-brand-signoff">
            VAULT KHAZANA <span>— From Packaging to Brand.</span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;