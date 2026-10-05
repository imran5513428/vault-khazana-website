import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './business-solutions.css';

const imageFiles = [
  'IMG-20260930-WA0009.jpg',
  'IMG-20260930-WA0010.jpg',
  'IMG-20260930-WA0011.jpg',
  'IMG-20260930-WA0012.jpg',
  'IMG-20260930-WA0016.jpg',
  'IMG-20260930-WA0017.jpg',
  'IMG-20260930-WA0018.jpg',
  'IMG-20260930-WA0019.jpg',
  'IMG-20260930-WA0020.jpg',
  'IMG-20260930-WA0021.jpg',
  'IMG-20260930-WA0023.jpg',
  'IMG-20260930-WA0024.jpg',
  'IMG-20260930-WA0025.jpg',
  'IMG-20260930-WA0026.jpg',
  'IMG-20260930-WA0027.jpg',
  'IMG-20260930-WA0028.jpg',
  'IMG-20260930-WA0029.jpg',
  'IMG-20260930-WA0030.jpg',
  'IMG-20260930-WA0031.jpg',
  'IMG-20260930-WA0034.jpg',
  'bs-01.jpg',
  'bs-02.jpg',
  'bs-03.jpg',
  'bs-04.jpg',
  'bs-05.jpg',
  'bs-06.jpg'
];

const capabilities = [
  [
    'Design',
    'Start with your logo, artwork or idea.'
  ],
  [
    'Printed Packaging',
    'Put your identity on the packaging your customers take away.'
  ],
  [
    'Labels & Print',
    'Extend the same look to labels and other printed pieces.'
  ],
  [
    'Business Orders',
    'Discuss packaging and branding together for your next order.'
  ]
];

const processSteps = [
  [
    '01',
    'Tell us what you need',
    'Share your business, packaging, quantity and branding requirement.'
  ],
  [
    '02',
    'Choose the direction',
    'We discuss the packaging and printing options that fit the job.'
  ],
  [
    '03',
    'Approve and produce',
    'Final artwork and requirements are confirmed before production.'
  ]
];

function BusinessSolutionsPage() {
  const [activeImage, setActiveImage] = useState(0);

  const imageBase =
    `${import.meta.env.BASE_URL}images/images-business-solution/`;

  const showcaseImage =
    `${import.meta.env.BASE_URL}images/business-solutions-showcase.png`;

  const previousImage = () => {
    setActiveImage(
      (current) =>
        (current - 1 + imageFiles.length) % imageFiles.length
    );
  };

  const nextImage = () => {
    setActiveImage(
      (current) =>
        (current + 1) % imageFiles.length
    );
  };

  return (
    <div className="business-solutions-page">

      {/* HERO */}
      <section className="bs-hero">
        <div className="container bs-hero-grid">

          <div className="bs-hero-copy">
            <p className="bs-eyebrow">BUSINESS SOLUTIONS</p>

            <h1>
              Put your brand on the packaging
              <span> people take home.</span>
            </h1>

            <p className="bs-hero-lead">
              Need your logo on cups, bags, boxes or labels?
              Let’s talk about what you need.
            </p>

            <p className="bs-hero-text">
              VAULT KHAZANA brings food-service packaging together
              with access to a wider printing and branding setup,
              so your business can build a more complete look.
            </p>

            <div className="bs-hero-actions">
              <a
                href="https://wa.me/923335513428"
                className="btn btn-accent btn-lg"
                target="_blank"
                rel="noreferrer"
              >
                Start a Business Enquiry <span>→</span>
              </a>

              <a
                href="#work"
                className="bs-text-link"
              >
                See our work <span>↓</span>
              </a>
            </div>
          </div>

          <div className="bs-hero-visual">
            <div className="bs-visual-label">
              <span>PACKAGING</span>
              <span>PRINTING</span>
              <span>BRANDING</span>
            </div>

            <img
              src={showcaseImage}
              alt="VAULT KHAZANA branded packaging and printing showcase"
              className="bs-showcase-image"
            />
          </div>

        </div>
      </section>


      {/* REAL WORK GALLERY */}
      <section
        className="bs-work section"
        id="work"
      >
        <div className="container">

          <div className="bs-work-heading">
            <div>
              <p className="bs-eyebrow">
                SELECTED FOOD-BRAND WORK
              </p>

              <h2>
                Real work. Real packaging ideas.
              </h2>
            </div>

            <p>
              A selection from our wider commercial printing
              and branding work. Use it as inspiration for what
              you could put on your own packaging.
            </p>
          </div>


          <div className="bs-gallery">

            <div className="bs-gallery-main">
              <img
                src={`${imageBase}${imageFiles[activeImage]}`}
                alt="Selected food-brand packaging and printing work"
                loading="eager"
              />

              <div className="bs-gallery-overlay">
                <span>
                  {String(activeImage + 1).padStart(2, '0')}
                  {' / '}
                  {String(imageFiles.length).padStart(2, '0')}
                </span>

                <span>
                  FOOD BRAND WORK
                </span>
              </div>
            </div>


            <div className="bs-gallery-controls">

              <button
                type="button"
                onClick={previousImage}
                aria-label="Previous work image"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextImage}
                aria-label="Next work image"
              >
                →
              </button>

              <span>
                Swipe or tap an image to explore
              </span>

            </div>


            <div
              className="bs-gallery-strip"
              aria-label="Food-brand work gallery"
            >
              {imageFiles.map((file, index) => (
                <button
                  type="button"
                  className={
                    `bs-gallery-thumb ${
                      index === activeImage ? 'is-active' : ''
                    }`
                  }
                  key={file}
                  onClick={() => setActiveImage(index)}
                  aria-label={`View work image ${index + 1}`}
                  aria-pressed={index === activeImage}
                >
                  <img
                    src={`${imageBase}${file}`}
                    alt=""
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* CAPABILITIES */}
      <section className="bs-capabilities section">
        <div className="container">

          <div className="bs-section-heading bs-section-heading-split">

            <div>
              <p className="bs-eyebrow">
                WHAT WE CAN HELP WITH
              </p>

              <h2>
                From the first idea to the finished look.
              </h2>
            </div>

            <p>
              You do not have to know exactly what you want
              before you contact us. Tell us what you are trying
              to achieve and we can discuss the options.
            </p>

          </div>


          <div className="bs-capability-grid">

            {capabilities.map(
              ([title, description], index) => (
                <article
                  className="bs-capability-card"
                  key={title}
                >
                  <span className="bs-card-number">
                    0{index + 1}
                  </span>

                  <h3>{title}</h3>

                  <p>{description}</p>
                </article>
              )
            )}

          </div>

        </div>
      </section>


      {/* PACKAGING + BRANDING */}
      <section className="bs-proof section">
        <div className="container">

          <div className="bs-proof-panel">

            <div className="bs-proof-copy">

              <p className="bs-eyebrow">
                PACKAGING + BRANDING
              </p>

              <h2>
                Make the packaging part of the experience.
              </h2>

              <p>
                A customer sees more than the food. Cups, bags,
                boxes and labels all become part of how your
                business is remembered.
              </p>

              <Link
                to="/category/food-containers"
                className="btn btn-primary"
              >
                Shop Packaging <span>→</span>
              </Link>

            </div>


            <div className="bs-proof-points">

              <div>
                <span>01</span>

                <strong>
                  One look
                </strong>

                <p>
                  Keep the packaging and printed pieces
                  connected to your brand.
                </p>
              </div>


              <div>
                <span>02</span>

                <strong>
                  Better presentation
                </strong>

                <p>
                  Turn an ordinary takeaway order into
                  a branded touchpoint.
                </p>
              </div>


              <div>
                <span>03</span>

                <strong>
                  Built around your business
                </strong>

                <p>
                  Discuss the right combination instead
                  of choosing pieces in isolation.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* PROCESS */}
      <section className="bs-process section">
        <div className="container">

          <div className="bs-process-panel">

            <div className="bs-process-intro">

              <p className="bs-eyebrow">
                HOW TO START
              </p>

              <h2>
                Tell us what you are building.
              </h2>

              <p>
                Whether you already have artwork or are still
                deciding what you need, start with a conversation.
              </p>

            </div>


            <div className="bs-process-list">

              {processSteps.map(
                ([number, title, description]) => (
                  <div
                    className="bs-process-item"
                    key={number}
                  >
                    <span>{number}</span>

                    <div>
                      <h3>{title}</h3>

                      <p>{description}</p>
                    </div>
                  </div>
                )
              )}

            </div>

          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="bs-cta section">
        <div className="container">

          <div className="bs-cta-inner">

            <p className="bs-eyebrow">
              HAVE A BUSINESS REQUIREMENT?
            </p>

            <h2>
              Let’s discuss your packaging.
            </h2>

            <p>
              Send us your logo, artwork, packaging idea or
              simply tell us what you are looking for.
            </p>

            <div className="bs-cta-actions">

              <a
                href="https://wa.me/923335513428"
                className="btn btn-accent btn-lg"
                target="_blank"
                rel="noreferrer"
              >
                Talk to Us on WhatsApp <span>→</span>
              </a>

              <Link
                to="/"
                className="btn btn-primary btn-lg"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default BusinessSolutionsPage;