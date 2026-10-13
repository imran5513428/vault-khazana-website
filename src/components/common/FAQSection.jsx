import React from 'react';
import { Link } from 'react-router-dom';
import './faq-section.css';

const FAQS = [
  {
    question: 'What can I buy from VAULT KHAZANA?',
    answer:
      'Explore disposable products, food-service essentials, takeaway packaging, cups, containers, bags, foil and wrap products, tissues and more. Our range serves everyday needs as well as food businesses, offices, retailers and other organisations.'
  },
  {
    question: 'Can I order for home use or a small business?',
    answer:
      'Yes. You can shop for household needs, workplaces and business operations. Minimum order quantities and pack sizes vary by product, so check the individual product details before ordering.'
  },
  {
    question: 'Do you offer bulk and wholesale orders?',
    answer:
      'Bulk purchasing is an important part of our offering. Tell us which products you need and the quantities you have in mind. We can discuss applicable pricing, available quantities and options for your order.'
  },
  {
    question: 'How do I understand the price and pack size?',
    answer:
      'Check each product page for its listed price, selling unit, pack size and minimum order quantity. Some products are priced per piece, while others are sold in packs or by a specified weight or size.'
  },
  {
    question: 'Can you create custom-printed packaging for my brand?',
    answer:
      'Our Business Solutions offering helps businesses explore custom packaging and printing with an experienced printing and branding team in Islamabad, backed by 22 years of industry experience. Options depend on the packaging type, quantity, artwork and your requirements.'
  },
  {
    question: 'What should I share for a custom packaging enquiry?',
    answer:
      'Tell us about your business and product, approximate quantity, preferred packaging style or size, budget and required timeline. If you have a logo or artwork, you can share it too. If you are unsure about the packaging, start with your product and goals.'
  },
  {
    question: 'Can my business reorder supplies regularly?',
    answer:
      'If you need supplies regularly, let us know which products you use and how often you expect to reorder. We can discuss your requirements and confirm availability and quantities for each order.'
  },
  {
    question: 'How do I confirm delivery charges and timing?',
    answer:
      'Delivery charges and estimated timing depend on the order and destination. Share your products, quantities and delivery city so these details can be confirmed before you proceed.'
  },
  {
    question: 'What if an item arrives damaged or incorrect?',
    answer:
      'Please contact us promptly with your order details and clear photographs of the affected item and packaging. We will review the issue and explain the appropriate next steps based on the circumstances and applicable order terms.'
  }
];

function FAQSection() {
  return (
    <section
      id="faq"
      className="section faq-section"
      aria-labelledby="faq-heading"
    >
      <div className="container faq-layout">
        <div className="faq-intro">
          <p className="eyebrow">HERE TO HELP</p>

          <h2 id="faq-heading">Frequently Asked Questions</h2>

          <p className="faq-intro-text">
            Clear answers about everyday supplies, bulk orders and
            custom-branded packaging — so you can choose what works
            for your home or business with confidence.
          </p>

          <div className="faq-actions">
            <Link
              to="/"
              state={{ scrollTo: 'shop-by-category' }}
              className="btn btn-accent faq-shop-button"
            >
              Explore Products <span aria-hidden="true">→</span>
            </Link>

            <Link
              to="/business-solutions"
              className="faq-business-link"
            >
              Need branded packaging? <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="faq-help-note">
            <span className="faq-help-mark" aria-hidden="true">
              ?
            </span>
            <p>
              Have a specific requirement? Tell us what you need,
              and we can discuss the available options.
            </p>
          </div>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <details className="faq-item" key={faq.question}>
              <summary>
                <span className="faq-number">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="faq-question">
                  {faq.question}
                </span>

                <span
                  className="faq-toggle"
                  aria-hidden="true"
                />
              </summary>

              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;