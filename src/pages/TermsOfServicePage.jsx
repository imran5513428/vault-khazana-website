
import React from 'react';
import './shipping-policy.css';

function TermsOfServicePage() {
  const lastUpdated = '21 October 2026';

  const contactMessage = encodeURIComponent(
    'Hello VAULT KHAZANA, I have a question about your terms of service or an order. Could you please help me?'
  );

  const whatsappUrl =
    `https://wa.me/923335513428?text=${contactMessage}`;

  return (
    <div className="shipping-policy-page">
      <header className="shipping-policy-header">
        <div className="shipping-policy-container">
          <p className="shipping-policy-eyebrow">
            IMPORTANT INFORMATION
          </p>

          <h1>Terms of Service</h1>

          <p className="shipping-policy-intro">
            These terms explain the conditions for using the
            VAULT KHAZANA website, placing orders and arranging
            delivery. Please read them before making a purchase.
          </p>

          <p className="shipping-policy-updated">
            Last updated: {lastUpdated}
          </p>
        </div>
      </header>

      <main className="shipping-policy-container shipping-policy-content">
        <section className="shipping-policy-section">
          <h2>1. About VAULT KHAZANA</h2>

          <p>
            VAULT KHAZANA supplies packaging and food-service
            products for individuals, food businesses, restaurants
            and other customers.
          </p>

          <p>
            Our current delivery service is limited to Rawalpindi
            and Islamabad. We do not currently accept delivery
            orders for other cities.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>2. Products, Prices and Availability</h2>

          <p>
            We aim to keep product descriptions, sizes, quantities
            and prices accurate. However, product availability
            and supplier stock may change.
          </p>

          <p>
            An order is subject to confirmation by VAULT KHAZANA.
            We will confirm availability, applicable pricing,
            payment requirements and delivery arrangements before
            dispatch.
          </p>

          <p>
            If an item becomes unavailable or we cannot fulfil
            your order, we will contact you to explain the
            available options. Any advance payment for an order
            we cannot fulfil will be refunded in full.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>3. Placing and Confirming an Order</h2>

          <p>
            Please provide accurate contact details, delivery
            address, product selections and quantities when
            placing an order.
          </p>

          <p>
            Submitting an order through the website does not
            guarantee that it has been accepted for dispatch.
            We may contact you to confirm the order and clarify
            any details before arranging delivery.
          </p>

          <p>
            An order summary, invoice or payment request issued
            before payment is verified records the order details
            and amount requested. It is not, by itself, proof
            that payment has been received, that the order has
            been paid in full, or that the products have been
            dispatched.
          </p>

          <p>
            Please respond to confirmation messages and ensure
            that someone can receive the order at the agreed
            address and time.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>4. Payments</h2>

          <h3>Cash on Delivery</h3>

          <p>
            Cash on Delivery (COD) may be available for eligible
            addresses within our limited delivery zone,
            approximately 5 km from our designated delivery
            point. Availability must be confirmed by VAULT
            KHAZANA before dispatch.
          </p>

          <h3>Advance Payment</h3>

          <p>
            Orders delivered through third-party local courier
            or ride-hailing services require full advance payment
            before dispatch.
          </p>

          <p>
            Special business offers, including designated
            aluminium container offers, require full advance
            payment where stated on the relevant offer.
          </p>

          <p>
            We will communicate the applicable payment
            requirements before dispatch. Customers should
            follow the payment instructions confirmed for
            their specific order.
          </p>

          <h3>Bank Transfer Deadline and Verification</h3>

          <p>
            For orders requiring bank transfer, full payment
            must be made within 48 hours after the customer
            receives the payment request, unless VAULT KHAZANA
            agrees to a different deadline in writing.
          </p>

          <p>
            Where the banking application provides a transaction
            reference or payment description field, please
            include your VAULT KHAZANA order reference to help
            us identify the payment.
          </p>

          <p>
            If that field is not available, you may share your
            transaction receipt or confirmation with us.
            However, a screenshot, transfer receipt, transaction
            reference or payment request alone does not establish
            that funds have been received in our bank account.
          </p>

          <p>
            Payment is treated as received only after VAULT
            KHAZANA verifies the funds in the designated bank
            account. Products will be dispatched only after
            the required payment has been verified and product
            availability and delivery arrangements have been
            confirmed.
          </p>

          <p>
            If payment is not received within 48 hours, we may
            contact you to ask whether you still wish to proceed.
            If payment remains unreceived, the order may be
            cancelled after appropriate notice, subject to any
            specific arrangement agreed with you and applicable
            law.
          </p>

          <p>
            Please contact us if you have made a transfer but
            it has not yet appeared in our account. Do not make
            another payment without first checking with us
            if you believe a transfer is already in progress.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>5. Delivery Charges and Arrangements</h2>

          <p>
            Delivery charges start from Rs. 150. The final
            charge depends on the delivery area, distance,
            order quantity and delivery service required.
          </p>

          <p>
            We will confirm the applicable delivery charge
            before dispatch. Delivery is arranged according
            to the customer's location and the available
            delivery method.
          </p>

          <p>
            Delivery dates and times are estimates until
            confirmed. Delays may occur because of traffic,
            weather, supplier availability or circumstances
            outside our reasonable control.
          </p>

          <p>
            For further details, please read our{' '}
            <a href="#/shipping-policy">
              Delivery &amp; Shipping Policy
            </a>.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>6. Cancellations and Refunds</h2>

          <h3>Cancellation by the Customer</h3>

          <p>
            If you cancel an order before dispatch and no
            transport costs have been incurred, your full
            advance payment will be refunded.
          </p>

          <p>
            If actual outward or return transport costs have
            already been incurred, those costs may be deducted
            from your advance payment where the deduction is
            lawful and applicable to the circumstances. We
            will explain any proposed deduction to you.
          </p>

          <h3>Cancellation by VAULT KHAZANA</h3>

          <p>
            If VAULT KHAZANA cancels your order or cannot fulfil
            it because the supplier is unable to provide the
            products, your full advance payment will be refunded
            without deduction.
          </p>

          <p>
            Refund arrangements will be communicated directly
            to the customer. Please contact us if you need
            clarification about a cancellation or refund.
            Nothing in these terms limits any rights or remedies
            available to customers under applicable law.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>7. Checking Products on Delivery</h2>

          <p>
            Please check the products and quantities when you
            receive your order. If you find a shortage, incorrect
            item or visible damage, contact us promptly,
            preferably at the time of delivery.
          </p>

          <p>
            Please provide your order details and photographs
            where possible so that we can review the issue.
            We will assess the circumstances and work towards
            an appropriate resolution.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>8. Custom Packaging and Business Services</h2>

          <p>
            Custom packaging, printing and branding services
            may require separate discussions, quotations,
            design approval, production timelines and payment
            arrangements.
          </p>

          <p>
            Production will proceed according to the
            specifications and terms agreed with the customer.
            Customers should carefully review and approve
            artwork, text, sizes, quantities and other
            specifications before production begins.
          </p>

          <p>
            Custom-service pricing and arrangements will be
            confirmed separately before the work proceeds.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>9. Appropriate Use of the Website</h2>

          <p>
            You agree to use this website lawfully and provide
            accurate information when placing an order. You
            must not misuse the website, attempt to interfere
            with its operation or submit fraudulent orders.
          </p>

          <p>
            Product images and descriptions are provided to
            help customers understand what they are ordering.
            Minor presentation differences may occur, but we
            aim to supply products matching the confirmed
            order details.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>10. Third-Party Services</h2>

          <p>
            We may use suppliers, couriers, ride-hailing
            services, hosting providers and other third parties
            to help fulfil orders or operate the website.
            Their availability and services may be subject
            to their own terms and operational conditions.
          </p>

          <p>
            We will communicate relevant delivery and payment
            arrangements before dispatch. Nothing in these
            terms removes any rights that customers have
            under applicable law.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>11. Privacy</h2>

          <p>
            We use customer information to confirm orders,
            arrange deliveries, respond to enquiries and
            operate our services. Please read our Privacy
            Policy for further information about how
            information is handled.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>12. Changes to These Terms</h2>

          <p>
            We may update these terms when our services,
            policies or operating arrangements change.
            The latest version will be published on this
            website with its updated date.
          </p>

          <p>
            The terms and order arrangements communicated
            and confirmed for your purchase will help
            determine how that order is handled, subject
            to applicable law.
          </p>
        </section>

        <section className="shipping-policy-section shipping-policy-contact">
          <h2>13. Contact Us</h2>

          <p>
            If you have questions about these terms, an
            existing order, payment or delivery, please
            contact VAULT KHAZANA.
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

export default TermsOfServicePage;
