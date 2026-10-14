
import React from 'react';
import './shipping-policy.css';

function ShippingPolicyPage() {
  const lastUpdated = '14 October 2026';

  const shippingMessage = encodeURIComponent(
    'Hello VAULT KHAZANA, I have a question about delivery availability, delivery charges, payment options, or an existing order. Could you please help me?'
  );

  const whatsappUrl =
    `https://wa.me/923335513428?text=${shippingMessage}`;

  return (
    <div className="shipping-policy-page">
      <header className="shipping-policy-header">
        <div className="shipping-policy-container">
          <p className="shipping-policy-eyebrow">
            DELIVERY INFORMATION
          </p>
          <h1>Delivery &amp; Shipping Policy</h1>
          <p className="shipping-policy-intro">
            At VAULT KHAZANA, we aim to make ordering simple and
            delivery arrangements clear from the start. Please read
            this policy before placing your order.
          </p>
          <p className="shipping-policy-updated">
            Last updated: {lastUpdated}
          </p>
        </div>
      </header>

      <main className="shipping-policy-container shipping-policy-content">
        <section className="shipping-policy-section">
          <h2>1. Delivery Areas</h2>
          <p>
            We currently deliver within Rawalpindi and Islamabad only.
            Delivery availability depends on your location and the
            delivery service available for your area.
          </p>
          <p>
            Cash on Delivery (COD) is available only within our limited
            delivery zone, approximately 5 km from our designated
            delivery point. Addresses within Rawalpindi and Islamabad
            but outside this zone are served through local courier or
            ride-hailing services, which require advance payment, as
            explained in Section 2.
          </p>
          <p>
            Our team will confirm COD eligibility for your exact
            address when you place your order.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>2. Payment Methods</h2>
          <h3>Cash on Delivery (COD)</h3>
          <p>
            COD is available only for eligible addresses within our
            limited delivery zone of approximately 5 km. Availability
            will be confirmed by VAULT KHAZANA for your address.
          </p>

          <h3>Advance Payment</h3>
          <p>
            For orders delivered through local courier or ride-hailing
            services, such as Bykea or inDrive, full advance payment
            is required before dispatch.
          </p>
          <p>
            These payment and delivery conditions apply to all
            products, including items listed in Good Finds and
            special offers.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>3. Delivery Charges</h2>
          <p>
            Delivery charges start from Rs. 150. The final amount
            depends on your delivery area, distance and the delivery
            service required.
          </p>
          <p>
            We will confirm the applicable delivery charges before
            dispatch. Your order will not be dispatched until the
            delivery arrangements and charges have been communicated
            to you.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>4. Order Cancellation and Refunds</h2>

          <h3>Cancellation by the Customer</h3>
          <p>
            If you cancel an order after making an advance payment,
            the actual delivery or transport charges incurred for
            both the outward and return journeys will be deducted
            from your payment. The remaining balance will be refunded.
          </p>
          <p>
            Refunds are typically processed within a few hours of
            cancellation confirmation, depending on the circumstances.
          </p>
          <p>
            Any deduction will be based on actual charges incurred,
            not an arbitrary cancellation fee.
          </p>

          <h3>Cancellation by VAULT KHAZANA or Non-Dispatch</h3>
          <p>
            If VAULT KHAZANA cancels your order, the supplier is unable
            to fulfil it, or the order cannot be dispatched for a
            reason attributable to VAULT KHAZANA or its supply
            arrangements, your full advance payment will be refunded
            without deduction.
          </p>
          <p>
            Refunds are typically processed within a few hours of
            confirmation, depending on the circumstances. We will
            inform you if an order cannot be fulfilled and explain
            the next steps.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>5. Checking Your Order</h2>
          <p>
            Please check your items as soon as you receive them.
            Confirm that the products, quantities, sizes and other
            order details match your purchase.
          </p>
          <p>
            If you notice a shortage, an incorrect item, visible
            damage or another discrepancy, please contact VAULT
            KHAZANA on the same day you receive your delivery. Share
            photos or a video showing the issue so we can investigate
            and work towards a resolution with the supplier or
            delivery service.
          </p>
          <p>
            Prompt reporting helps us verify the issue while the
            details are still clear. Reports made after the day of
            delivery may be more difficult to verify and assess.
          </p>
        </section>

        <section className="shipping-policy-section">
          <h2>6. Order and Delivery Confirmation</h2>
          <p>
            All orders are subject to confirmation by VAULT KHAZANA.
            Before dispatch, we will confirm the delivery arrangements
            and applicable charges.
          </p>
          <p>
            Please ensure that your contact number, delivery address
            and order details are accurate so we can coordinate your
            delivery smoothly.
          </p>
        </section>

        <section className="shipping-policy-section shipping-policy-contact">
          <h2>7. Need Help?</h2>
          <p>
            If you have questions about delivery availability, payment
            methods, charges or an existing order, please contact us:
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
          <p>
            We will be happy to clarify the arrangements before
            dispatch.
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

export default ShippingPolicyPage;
