import React from 'react';
import './shipping-policy.css';

function PrivacyPolicyPage() {
const lastUpdated = '15 October 2026';

const contactMessage = encodeURIComponent(
'Hello VAULT KHAZANA, I have a question about the Privacy Policy or personal information connected with my order.'
);

const whatsappUrl = "https://wa.me/923335513428?text=${contactMessage}";

return (
<div className="shipping-policy-page">
<header className="shipping-policy-header">
<div className="shipping-policy-container">
<p className="shipping-policy-eyebrow">YOUR INFORMATION</p>
<h1>Privacy Policy</h1>

      <p className="shipping-policy-intro">
        Your trust matters to VAULT KHAZANA. This policy explains
        what information we may collect when you browse our website,
        contact us or place an order, and how we use that information.
      </p>

      <p className="shipping-policy-updated">
        Last updated: {lastUpdated}
      </p>
    </div>
  </header>

  <main className="shipping-policy-container shipping-policy-content">
    <section className="shipping-policy-section">
      <h2>1. Information We May Collect</h2>
      <p>
        Depending on how you use our website and services, we may
        receive information such as:
      </p>
      <ul>
        <li>Your name and contact number.</li>
        <li>Your delivery address and city.</li>
        <li>Your email address, if you provide it.</li>
        <li>
          Order details, including products, sizes, quantities,
          prices and delivery instructions.
        </li>
        <li>
          Messages and information you choose to share through
          WhatsApp, email or other contact methods.
        </li>
        <li>
          Basic technical information processed by website
          hosting or browsing services.
        </li>
      </ul>
      <p>
        We do not ask you to send unnecessary sensitive personal
        information to place an ordinary product order.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>2. How We Use Your Information</h2>
      <p>We may use the information you provide to:</p>
      <ul>
        <li>Respond to enquiries and product questions.</li>
        <li>Confirm orders, product availability and prices.</li>
        <li>Arrange delivery and communicate delivery charges.</li>
        <li>Coordinate order fulfilment and customer support.</li>
        <li>
          Resolve reported shortages, damaged items or other
          order issues.
        </li>
        <li>
          Maintain appropriate business records and help prevent
          misuse or fraudulent orders.
        </li>
        <li>Meet applicable legal or regulatory requirements.</li>
      </ul>
    </section>

    <section className="shipping-policy-section">
      <h2>3. When Information May Be Shared</h2>
      <p>
        We do not sell your personal information to advertisers.
        We may share the information reasonably needed to complete
        a transaction or handle a legitimate business requirement
        with:
      </p>
      <ul>
        <li>
          Suppliers, where necessary to confirm or fulfil your order.
        </li>
        <li>
          Riders, couriers or delivery services that need your
          contact or address details to deliver an order.
        </li>
        <li>
          Website hosting or technical service providers where
          their services process website-related information.
        </li>
        <li>
          Relevant authorities where disclosure is required by law.
        </li>
      </ul>
      <p>
        We aim to limit shared information to what is reasonably
        needed for the relevant purpose.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>4. Payments and Order Records</h2>
      <p>
        Payment arrangements depend on the order, delivery method
        and conditions confirmed by VAULT KHAZANA. Please do not
        send card PINs, passwords or one-time passcodes through
        our contact channels.
      </p>
      <p>
        We may keep relevant order and communication records for
        customer service, accounting, dispute resolution and
        applicable legal requirements.
      </p>
      <p>
        If you receive a suspicious payment instruction, verify it
        with VAULT KHAZANA through the contact details published
        on this website before acting on it.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>5. Cookies and Website Technology</h2>
      <p>
        Our website may use browser storage or similar technical
        features needed for functions such as remembering items
        in your cart or maintaining the website experience.
        Hosting or security services may also process basic
        technical information.
      </p>
      <p>
        The technologies in use may change as the website develops.
        We will update this policy if material changes require
        clarification.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>6. How Long We Keep Information</h2>
      <p>
        We keep personal information for as long as reasonably
        needed for order fulfilment, customer support, business
        records, dispute resolution and applicable legal obligations.
      </p>
      <p>
        Information that is no longer needed may be deleted or
        otherwise disposed of where reasonably practicable.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>7. Keeping Information Safe</h2>
      <p>
        We take reasonable steps to handle customer information
        carefully. However, no website, messaging service or
        electronic transmission can be guaranteed completely secure.
      </p>
      <p>
        Please share only the information necessary for your
        enquiry or order, and contact us if you believe your
        information has been used incorrectly.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>8. Your Questions and Requests</h2>
      <p>
        You may contact us to ask about personal information
        connected with your order or to request correction of
        inaccurate contact or delivery details. We may need to
        verify your identity before responding.
      </p>
      <p>
        Some records may need to be retained for legitimate
        business or legal purposes.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>9. External Services and Links</h2>
      <p>
        Our website may link to services such as WhatsApp or
        third-party delivery services. When you use an external
        service, that service's own privacy policy and terms may
        apply. VAULT KHAZANA does not control the privacy practices
        of independent third-party services.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>10. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy when our business
        practices, website features or applicable requirements
        change. The latest revision date will be displayed here.
      </p>
    </section>

    <section className="shipping-policy-section shipping-policy-contact">
      <h2>11. Contact Us</h2>
      <p>
        If you have a question about this policy or information
        associated with your order, please contact us.
      </p>
      <p>
        <strong>Email:</strong>{' '}
        <a href="mailto:info@vaultkhazana.com">
          info@vaultkhazana.com
        </a>
      </p>
      <p>
        <strong>WhatsApp:</strong>{' '}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          +92 333 5513428
        </a>
      </p>
      <div className="shipping-policy-signoff">
        <strong>VAULT KHAZANA</strong>
        <span>Packaging &amp; Food-Service Supplies</span>
      </div>
    </section>
  </main>
</div>

);
}

export default PrivacyPolicyPage;