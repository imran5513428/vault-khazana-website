import React from 'react';
import { Link } from 'react-router-dom';
import './business-solutions.css';

const capabilities = [
  [
    '01',
    'Design',
    'Develop a visual identity and packaging artwork that fits your business.'
  ],
  [
    '02',
    'Print',
    'Turn approved artwork into professional printed materials and packaging.'
  ],
  [
    '03',
    'Packaging',
    'Choose practical food-service packaging and make it recognisably yours.'
  ],
  [
    '04',
    'Business Orders',
    'Bring packaging and branding requirements together for your business.'
  ]
];

const processSteps = [
  [
    '01',
    'Share your requirement',
    'Tell us about your business, packaging and quantities.'
  ],
  [
    '02',
    'Plan the solution',
    'Discuss suitable packaging, branding and printing options.'
  ],
  [
    '03',
    'Move to production',
    'Finalise the artwork and requirements before production.'
  ]
];

function BusinessSolutionsPage() {
  const showcaseImage = `${import.meta.env.BASE_URL}images/business-solutions-showcase.png`;

  return (
    <div className="business-solutions-page">
      <section className="bs-hero">
        <div className="container bs-hero-grid">
          <div className="bs-hero-copy">
            <p className="bs-eyebrow">BUSINESS SOLUTIONS</p>

            <h1>
              Build a Brand <span>People Remember.</span>
            </h1>

            <p className="bs-hero-lead">
              Packaging can do more than carry your food. It can carry your
              brand.
            </p>

            <p className="bs-hero-text">
              From packaging and printed materials to branded food-service
              products, bring your business identity into the details
              customers see every day.
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

              <a href="#capabilities" className="bs-text-link">
                Explore solutions <span>↓</span>
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

      <section className="bs-capabilities section" id="capabilities">
        <div className="container">
          <div className="bs-section-heading">
            <p className="bs-eyebrow">WHAT WE CAN DO</p>

            <h2>From idea to branded packaging.</h2>

            <p>
              One connected approach for businesses that want their packaging
              to look considered, consistent and professional.
            </p>
          </div>

          <div className="bs-capability-grid">
            {capabilities.map(([number, title, description]) => (
              <article className="bs-capability-card" key={number}>
                <span className="bs-card-number">{number}</span>

                <h3>{title}</h3>

                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bs-proof section">
        <div className="container">
          <div className="bs-proof-panel">
            <div className="bs-proof-copy">
              <p className="bs-eyebrow">THE POSSIBILITY</p>

              <h2>
                Make every cup, bag, box and label part of your brand.
              </h2>

              <p>
                Your packaging is one of the most visible parts of your food
                business. With the right combination of design, printing and
                packaging, everyday orders can become part of the customer
                experience.
              </p>

              <Link to="/category/food-containers" className="btn btn-primary">
                Shop Packaging <span>→</span>
              </Link>
            </div>

            <div className="bs-proof-points">
              <div>
                <span>01</span>
                <strong>Brand consistency</strong>
                <p>Keep your customer-facing packaging visually connected.</p>
              </div>

              <div>
                <span>02</span>
                <strong>Professional presentation</strong>
                <p>Give everyday food orders a more polished appearance.</p>
              </div>

              <div>
                <span>03</span>
                <strong>Business-ready solutions</strong>
                <p>Bring packaging, printing and branding requirements together.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bs-process section">
        <div className="container">
          <div className="bs-process-panel">
            <div className="bs-process-intro">
              <p className="bs-eyebrow">A SIMPLE APPROACH</p>

              <h2>Bring the brand and the packaging together.</h2>

              <p>
                Tell us what you are building, what you need printed or
                packaged, and where you want your brand to appear. We can then
                shape the right business solution around it.
              </p>
            </div>

            <div className="bs-process-list">
              {processSteps.map(([number, title, description]) => (
                <div className="bs-process-item" key={number}>
                  <span>{number}</span>

                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bs-cta section">
        <div className="container">
          <div className="bs-cta-inner">
            <p className="bs-eyebrow">READY TO BUILD YOUR BRAND?</p>

            <h2>Let's make your packaging part of the brand.</h2>

            <p>
              Talk to us about custom packaging, printed materials or a
              business order.
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

              <Link to="/" className="btn btn-primary btn-lg">
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
