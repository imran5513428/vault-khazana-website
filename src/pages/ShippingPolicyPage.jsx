import React from 'react';
import './shipping-policy.css';

function ShippingPolicyPage() {
const lastUpdated = '14 October 2026';

const shippingMessage = encodeURIComponent(
'Hello VAULT KHAZANA, I have a question about delivery availability, delivery charges, payment options, cancellations, refunds, or an existing order. Could you please help me?'
);

const whatsappUrl =
"https://wa.me/923335513428?text=${shippingMessage}";

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
        Delivery availability depends on your location, the order
        and the delivery method available for your area.
      </p>

      <p>
        Cash on Delivery (COD) may be available within our limited
        delivery zone, approximately 5 km from our designated
        delivery point. COD eligibility for your exact address
        must be confirmed by VAULT KHAZANA when you place your order.
      </p>

      <p>
        Addresses outside the COD zone may be served through an
        eligible third-party courier or ride-hailing service,
        subject to availability and full advance payment before
        dispatch. We cannot currently accept delivery orders
        outside Rawalpindi and Islamabad.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>2. Payment Methods</h2>

      <h3>Cash on Delivery (COD)</h3>

      <p>
        COD may be available for eligible addresses within our
        limited delivery zone of approximately 5 km. Availability
        depends on the address and delivery arrangements and
        must be confirmed by VAULT KHAZANA before the order is
        accepted for delivery.
      </p>

      <h3>Advance Payment</h3>

      <p>
        Orders delivered through third-party local courier or
        ride-hailing services, such as Bykea or inDrive, require
        full advance payment before dispatch.
      </p>

      <p>
        Certain business offers, including designated aluminium
        container offers, also require full advance payment.
        Please follow the payment conditions displayed with
        the relevant product or offer.
      </p>

      <p>
        These conditions apply across the website, including
        products featured in Good Finds and other special offers.
        We will communicate the applicable payment arrangements
        before dispatch.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>3. Delivery Charges</h2>

      <p>
        Delivery charges start from Rs. 150. The final amount
        depends on your delivery area, distance, order and the
        delivery service required.
      </p>

      <p>
        Depending on the order and location, we may arrange
        delivery through our own or personally arranged rider,
        or through a third-party courier or ride-hailing service.
      </p>

      <p>
        We will confirm the applicable delivery charges and
        arrangements before dispatch. Your order will not be
        dispatched until these details have been communicated
        to you.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>4. Order Cancellation and Refunds</h2>

      <h3>Cancellation by the Customer</h3>

      <p>
        If you cancel an order after making an advance payment,
        any deduction will depend on whether actual transport
        costs have been incurred.
      </p>

      <p>
        <strong>Cancellation before dispatch:</strong> If your
        order has not been dispatched and no transport costs
        have been incurred, your full advance payment will be
        refunded.
      </p>

      <p>
        <strong>Cancellation after transport costs are incurred:</strong>
        If actual outward or return transport charges have been
        incurred, the relevant charges may be deducted from your
        advance payment. The remaining balance will be refunded.
      </p>

      <p>
        <strong>No arbitrary cancellation fee:</strong> Any
        deduction will be based on actual transport charges
        incurred, not an arbitrary cancellation penalty. We
        will explain any applicable deduction to you.
      </p>

      <h3>Cancellation by VAULT KHAZANA or Non-Dispatch</h3>

      <p>
        If VAULT KHAZANA cancels your order, the supplier is unable
        to fulfil it, or the order cannot be dispatched for a
        reason attributable to us or our supply arrangements,
        your full advance payment will be refunded without
        deduction.
      </p>

      <p>
        We will inform you if your order cannot be fulfilled
        and explain the next steps for your refund.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>5. Checking Your Order on Delivery</h2>

      <p>
        Please check your items as soon as you receive them.
        Confirm that the products, quantities, sizes and other
        order details match your purchase.
      </p>

      <p>
        If you notice a shortage, an incorrect item, visible
        damage or another discrepancy, contact VAULT KHAZANA
        promptly, preferably at the time of delivery. Please
        share your order details and photographs of the affected
        items or packaging where possible.
      </p>

      <p>
        Prompt reporting helps us verify the issue and work
        towards a resolution with the supplier or delivery
        service. Delayed reports may make verification more
        difficult. We will review reported issues according
        to the circumstances and the information available.
      </p>
    </section>

    <section className="shipping-policy-section">
      <h2>6. Order and Delivery Confirmation</h2>

      <p>
        All orders are subject to confirmation by VAULT KHAZANA.
        Before dispatch, we will confirm the relevant delivery
        arrangements, applicable charges and payment requirements.
      </p>

      <p>
        Please ensure that your contact number, delivery address
        and order details are accurate so we can coordinate your
        delivery smoothly.
      </p>

      <p>
        Placing an order does not guarantee dispatch until the
        order and delivery arrangements have been confirmed.
      </p>
    </section>

    <section className="shipping-policy-section shipping-policy-contact">
      <h2>7. Need Help?</h2>

      <p>
        If you have questions about delivery availability,
        payment methods, delivery charges, cancellations,
        refunds or an existing order, please contact us
        before dispatch whenever possible.
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
        We will be happy to clarify the arrangements and assist
        you with your enquiry.
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