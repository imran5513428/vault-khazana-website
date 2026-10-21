import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { getProductById } from '../data/products';
import '../styles/checkout.css';

const PAYMENT_DEADLINE_HOURS = 48;

const PAYMENT_DEADLINE_TEXT =
  'Payment deadline: Please complete the bank transfer within 48 hours of receiving this payment request.';

const PAYMENT_REFERENCE_TEXT =
  'Please include your Order Reference in the bank transfer transaction reference or notes field, where available. If your banking app does not provide this field, you may share the transaction receipt with us.';

const PAYMENT_VERIFICATION_TEXT =
  'A transfer receipt or screenshot alone does not confirm payment. Payment is confirmed only after VAULT KHAZANA verifies that the funds have been received in its bank account.';

const PAYMENT_EXPIRY_TEXT =
  'If payment is not received within 48 hours of your receiving this payment request, VAULT KHAZANA may contact you to confirm whether you still wish to proceed before taking any cancellation action, subject to applicable policies and consumer protection requirements.';

const formatPrice = (value) =>
  `Rs ${Math.round(Number(value) || 0).toLocaleString('en-PK')}`;

const getProductPriceBasis = (product) => {
  if (!product) return 'Price';

  if (product.sellingUnit === 'pack' && product.packSize) {
    return `per pack of ${product.packSize}`;
  }

  if (product.sellingUnit === 'kg') return 'per kg';

  return 'per piece';
};

const getProductUnitLabel = (product) => {
  if (!product) return 'pieces';
  if (product.sellingUnit === 'pack') return 'packs';
  if (product.sellingUnit === 'kg') return 'kg';
  return 'pieces';
};

const getItemName = (item) =>
  item.displayName || item.product?.name || 'Product';

const getItemUnitLabel = (item) => {
  if (item.isSpecialOffer) {
    if (item.sellingUnit === 'carton') return 'cartons';
    if (item.sellingUnit === 'kg') return 'kg';
    if (item.sellingUnit === 'pack') return 'packs';
  }

  return getProductUnitLabel(item.product);
};

const getItemPriceBasis = (item) => {
  if (item.isSpecialOffer) {
    if (item.priceBasis) return item.priceBasis;
    if (item.sellingUnit === 'carton') return 'per carton';
    if (item.sellingUnit === 'kg') return 'per kg';
    if (item.sellingUnit === 'pack') return 'per pack';
  }

  return getProductPriceBasis(item.product);
};

const getItemImage = (item) =>
  item.image || item.product?.images?.[0] || '';

const getItemPrice = (item) => {
  if (item.isSpecialOffer) {
    return Number(item.pricePerUnit) || 0;
  }

  return Number(item.product?.pricePerUnit) || 0;
};

const createOrderReference = () => {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);

  return `VK-${year}${month}${day}-${random}`;
};

function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const errorRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    notes: ''
  });

  const [advancePaymentConfirmed, setAdvancePaymentConfirmed] =
    useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [receiptData, setReceiptData] = useState(null);

  useEffect(() => {
    if (orderReference) {
      window.scrollTo(0, 0);
    }
  }, [orderReference]);

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [error]);

  const cartItems = items
    .map((item) => {
      const product = getProductById(item.productId);

      if (!product && !item.isSpecialOffer) return null;

      return {
        ...item,
        product: product || null
      };
    })
    .filter(Boolean);

  const hasBusinessOffer = cartItems.some(
    (item) => item.isSpecialOffer && item.requiresAdvancePayment
  );

  const subtotal = cartItems.reduce((total, item) => {
    return total + getItemPrice(item) * (Number(item.quantity) || 0);
  }, 0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));

    if (name === 'city') {
      setError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your mobile/WhatsApp number.');
      return;
    }

    if (!formData.city.trim()) {
      setError('Please enter your city.');
      return;
    }

    if (!formData.address.trim()) {
      setError('Please enter your delivery address.');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    const normalizedCity = formData.city
      .trim()
      .toLowerCase()
      .split(',')[0]
      .trim();

    if (!['rawalpindi', 'islamabad'].includes(normalizedCity)) {
      setError(
        'Delivery is currently available only in Islamabad and Rawalpindi. Please check your city.'
      );
      return;
    }

    if (hasBusinessOffer && !advancePaymentConfirmed) {
      setError(
        'Please confirm that you understand the advance-payment and dispatch terms for business offers.'
      );
      return;
    }

    const reference = createOrderReference();

    const orderDetails = cartItems
      .map((item, index) => {
        const quantity = Number(item.quantity) || 0;
        const unitPrice = getItemPrice(item);
        const lineTotal = unitPrice * quantity;
        const name = getItemName(item);
        const unitLabel = getItemUnitLabel(item);
        const priceBasis = getItemPriceBasis(item);

        const details = [
          `${index + 1}. ${name}`,
          item.variantLabel
            ? `Selected option: ${item.variantLabel}`
            : null,
          `Quantity: ${quantity} ${unitLabel}`,
          `Price: ${formatPrice(unitPrice)} ${priceBasis}`,
          `Subtotal: ${formatPrice(lineTotal)}`
        ].filter(Boolean);

        if (item.isSpecialOffer) {
          details.push('Order type: Special offer');
        }

        if (item.requiresAdvancePayment) {
          details.push('Payment requirement: Advance payment only');
        }

        return details.join(' | ');
      })
      .join('\n');

    const paymentMethod =
      'Bank transfer — full advance payment for products required before dispatch';

    const orderNotes = [
      formData.notes.trim(),
      'Order submitted online. Full payment for products must be received and verified before dispatch. Shipping arrangements will be confirmed separately.',
      PAYMENT_DEADLINE_TEXT,
      PAYMENT_REFERENCE_TEXT,
      PAYMENT_VERIFICATION_TEXT,
      PAYMENT_EXPIRY_TEXT,
      hasBusinessOffer
        ? 'Customer confirmed the special business-offer advance-payment terms.'
        : ''
    ]
      .filter(Boolean)
      .join('\n');

    const orderDate = new Date().toLocaleString('en-PK', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Karachi'
    });

    /*
     * Save the order details before clearing the cart.
     * The receipt must not depend on cart data after submission.
     */
    const receiptItems = cartItems.map((item) => {
      const quantity = Number(item.quantity) || 0;
      const unitPrice = getItemPrice(item);

      return {
        name: getItemName(item),
        variantLabel: item.variantLabel || '',
        quantity,
        unitLabel: getItemUnitLabel(item),
        priceBasis: getItemPriceBasis(item),
        unitPrice,
        lineTotal: unitPrice * quantity
      };
    });

    const receiptSnapshot = {
      reference,
      orderDate,
      customer: {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        city: formData.city.trim(),
        address: formData.address.trim()
      },
      items: receiptItems,
      subtotal
    };

    const formPayload = {
      access_key: '858a488b-0047-4d78-adb5-5ba47a8d2ca6',
      subject: `VAULT KHAZANA Order ${reference}`,
      from_name: 'VAULT KHAZANA Website',
      name: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      city: formData.city.trim(),
      address: formData.address.trim(),
      payment_method: paymentMethod,
      order_reference: reference,
      order_subtotal: formatPrice(subtotal),
      order_details: orderDetails,
      notes: orderNotes,
      botcheck: ''
    };

    try {
      setIsSubmitting(true);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(formPayload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Unable to submit your order. Please try again.'
        );
      }

      setReceiptData(receiptSnapshot);
      clearCart();
      setOrderReference(reference);
    } catch (submissionError) {
      setError(
        submissionError.message ||
          'Unable to submit your order. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildReceiptText = () => {
    if (!receiptData) return '';

    const lines = [
      'VAULT KHAZANA',
      'ORDER SUMMARY & PAYMENT REQUEST',
      '',
      `Order Reference: ${receiptData.reference}`,
      `Order Date: ${receiptData.orderDate}`,
      'Order Status: AWAITING FULL PAYMENT',
      '',
      'CUSTOMER DETAILS',
      `Name: ${receiptData.customer.fullName}`,
      `Phone: ${receiptData.customer.phone}`,
      receiptData.customer.email
        ? `Email: ${receiptData.customer.email}`
        : '',
      `City: ${receiptData.customer.city}`,
      `Address: ${receiptData.customer.address}`,
      '',
      'ORDERED PRODUCTS',
      ...receiptData.items.flatMap((item, index) =>
        [
          `${index + 1}. ${item.name}`,
          item.variantLabel ? `   Option: ${item.variantLabel}` : '',
          `   Quantity: ${item.quantity} ${item.unitLabel}`,
          `   Price: ${formatPrice(item.unitPrice)} ${item.priceBasis}`,
          `   Line total: ${formatPrice(item.lineTotal)}`
        ].filter(Boolean)
      ),
      '',
      `PRODUCT SUBTOTAL: ${formatPrice(receiptData.subtotal)}`,
      '',
      'BANK TRANSFER PAYMENT DETAILS',
      'Bank: Meezan Bank Limited',
      'Account Title: Raja Imran Yousaf',
      'IBAN: PK76MEZN0003360111492134',
      `Amount Payable: ${formatPrice(receiptData.subtotal)} (product subtotal; delivery charges confirmed separately)`,
      '',
      'IMPORTANT TERMS',
      '1. Full payment for the products is required before dispatch.',
      '2. This document is an order summary and payment request, not proof of payment.',
      '3. Payment is confirmed only after VAULT KHAZANA verifies receipt of funds in its bank account.',
      `4. ${PAYMENT_DEADLINE_TEXT}`,
      `5. ${PAYMENT_REFERENCE_TEXT}`,
      `6. ${PAYMENT_VERIFICATION_TEXT}`,
      `7. ${PAYMENT_EXPIRY_TEXT}`,
      '8. Products will be dispatched only after payment is verified and product availability is confirmed.',
      '9. Shipping arrangements and delivery charges will be confirmed separately.',
      '10. Order changes, cancellations and other issues are handled according to applicable VAULT KHAZANA policies and relevant consumer protection requirements.',
      '',
      'VAULT KHAZANA — Packaging & Food-Service Supplies'
    ];

    return lines.filter((line) => line !== '').join('\n');
  };

  const handleShareReceipt = () => {
    const text = buildReceiptText();

    if (!text) return;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (orderReference && receiptData) {
    return (
      <main className="checkout-page checkout-receipt-page">
        <div className="checkout-container">
          <section className="checkout-success">
            <div className="checkout-success-icon" aria-hidden="true">
              ✓
            </div>

            <p className="checkout-eyebrow">Order Received</p>
            <h1>Your Order Summary</h1>

            <p className="checkout-success-text">
              We have received your order request. This document is not proof
              of payment. Please complete payment within 48 hours of receiving
              this payment request.
            </p>
          </section>

          <section
            className="checkout-receipt"
            id="printable-order-receipt"
          >
            <header className="checkout-receipt-header">
              <p className="checkout-eyebrow">VAULT KHAZANA</p>
              <h2>Order Summary &amp; Payment Request</h2>
              <p>Packaging &amp; Food-Service Supplies</p>
            </header>

            <div className="checkout-receipt-status">
              <span>Order Status</span>
              <strong>AWAITING FULL PAYMENT</strong>
            </div>

            <div className="checkout-receipt-meta">
              <div>
                <span>Order Reference</span>
                <strong>{receiptData.reference}</strong>
              </div>

              <div>
                <span>Order Date</span>
                <strong>{receiptData.orderDate}</strong>
              </div>
            </div>

            <section className="checkout-receipt-section">
              <h3>Customer Details</h3>
              <p>
                <strong>Name:</strong> {receiptData.customer.fullName}
              </p>
              <p>
                <strong>Mobile / WhatsApp:</strong>{' '}
                {receiptData.customer.phone}
              </p>

              {receiptData.customer.email && (
                <p>
                  <strong>Email:</strong> {receiptData.customer.email}
                </p>
              )}

              <p>
                <strong>City:</strong> {receiptData.customer.city}
              </p>
              <p>
                <strong>Delivery Address:</strong>{' '}
                {receiptData.customer.address}
              </p>
            </section>

            <section className="checkout-receipt-section">
              <h3>Products Ordered</h3>

              <div className="checkout-receipt-table-wrap">
                <table className="checkout-receipt-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Line Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {receiptData.items.map((item, index) => (
                      <tr key={`${item.name}-${index}`}>
                        <td>
                          <strong>{item.name}</strong>

                          {item.variantLabel && (
                            <small>{item.variantLabel}</small>
                          )}

                          <small>{item.priceBasis}</small>
                        </td>

                        <td>
                          {item.quantity} {item.unitLabel}
                        </td>

                        <td>{formatPrice(item.unitPrice)}</td>
                        <td>{formatPrice(item.lineTotal)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="checkout-receipt-subtotal">
                <span>Product Subtotal</span>
                <strong>{formatPrice(receiptData.subtotal)}</strong>
              </div>
            </section>

            <section className="checkout-receipt-section checkout-receipt-bank-details">
              <h3>Bank Transfer Payment Details</h3>
              <p>
                <strong>Bank:</strong> Meezan Bank Limited
              </p>
              <p>
                <strong>Account Title:</strong> Raja Imran Yousaf
              </p>
              <p>
                <strong>IBAN:</strong> PK76MEZN0003360111492134
              </p>
              <p>
                <strong>Amount Payable:</strong>{' '}
                {formatPrice(receiptData.subtotal)}{' '}
                <small>
                  (product subtotal; delivery charges confirmed separately)
                </small>
              </p>
              <p>
                Please verify the account title before transferring. Your
                order remains awaiting full payment until VAULT KHAZANA
                verifies receipt of funds.
              </p>
              <p>
                <strong>Payment deadline:</strong> Complete the bank transfer
                within 48 hours of receiving this payment request.
              </p>
              <p>
                <strong>Transfer reference:</strong> Include your Order
                Reference in the bank transfer reference or notes field, where
                available. If your banking app does not provide this field, you
                may share the transaction receipt.
              </p>
              <p>
                A transaction receipt or screenshot alone is not confirmation
                of payment. Payment is confirmed only after the funds are
                verified in VAULT KHAZANA's bank account.
              </p>
              <p>{PAYMENT_EXPIRY_TEXT}</p>
            </section>

            <section className="checkout-receipt-section checkout-receipt-terms">
              <h3>Important Terms &amp; Conditions</h3>

              <ol>
                <li>
                  <strong>Advance payment:</strong> Full payment for the
                  products is required before dispatch.
                </li>

                <li>
                  <strong>Payment verification:</strong> Placing an order or
                  receiving this document does not mean payment has been
                  received. Payment is confirmed separately by VAULT KHAZANA
                  after funds are verified in its bank account.
                </li>

                <li>
                  <strong>Payment deadline:</strong> Bank-transfer payment
                  must be completed within 48 hours of the customer receiving
                  this payment request.
                </li>

                <li>
                  <strong>Transfer reference:</strong> Include the Order
                  Reference in the bank transfer reference or notes field,
                  where available. If unavailable, the customer may share the
                  transaction receipt. A screenshot or receipt alone is not
                  proof that funds have been received.
                </li>

                <li>
                  <strong>Late payment:</strong> If payment is not received
                  within 48 hours, VAULT KHAZANA may contact the customer to
                  confirm whether they still wish to proceed before taking
                  cancellation action, subject to applicable policies and
                  consumer protection requirements.
                </li>

                <li>
                  <strong>Dispatch:</strong> Products will be dispatched only
                  after full product payment is verified and product
                  availability is confirmed.
                </li>

                <li>
                  <strong>Shipping arrangements:</strong> Shipping availability,
                  arrangements and delivery charges will be confirmed
                  separately with the customer.
                </li>

                <li>
                  <strong>Order changes:</strong> Changes, cancellations,
                  refunds and other order issues are handled according to
                  VAULT KHAZANA's applicable policies and relevant consumer
                  protection requirements.
                </li>
              </ol>

              <p className="checkout-receipt-disclaimer">
                This document records the products requested and their product
                cost only. It is not proof of payment, dispatch or delivery.
              </p>
            </section>

            <footer className="checkout-receipt-footer">
              VAULT KHAZANA — Packaging &amp; Food-Service Supplies
            </footer>
          </section>

          <div className="checkout-receipt-actions no-print">
            <button
              type="button"
              className="checkout-submit-button"
              onClick={() => window.print()}
            >
              Print / Save as PDF
            </button>

            <button
              type="button"
              className="checkout-receipt-share-button"
              onClick={handleShareReceipt}
            >
              Share via WhatsApp
            </button>

            <Link to="/" className="checkout-primary-button">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <section className="checkout-empty">
            <p className="checkout-eyebrow">Checkout</p>
            <h1>Your Cart Is Empty</h1>

            <p>
              Add some products to your cart before proceeding to checkout.
            </p>

            <Link to="/" className="checkout-primary-button">
              Continue Shopping
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <p className="checkout-eyebrow">Secure Checkout</p>
          <h1>Complete Your Order</h1>
          <p>
            Enter your details to submit your order request. Full product
            payment is required before dispatch. For bank transfers, payment
            must be completed within 48 hours of receiving the payment request.
          </p>
        </div>

        {error && (
          <div
            ref={errorRef}
            className="checkout-error"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <div className="checkout-layout">
          <section className="checkout-card">
            <div className="checkout-card-header">
              <p className="checkout-step">01</p>
              <div>
                <h2>Customer Information</h2>
                <p>Where should we contact you?</p>
              </div>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit}>
              <div className="checkout-field">
                <label htmlFor="fullName">
                  Full Name <span>*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="phone">
                  Mobile / WhatsApp <span>*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="03XX XXXXXXX"
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="email">
                  Email <small>(optional)</small>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="city">
                  City <span>*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  autoComplete="address-level2"
                  required
                />
                <small>
                  We currently deliver only in Islamabad and Rawalpindi.
                </small>
              </div>

              <div className="checkout-field">
                <label htmlFor="address">
                  Delivery Address <span>*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Complete delivery address"
                  autoComplete="street-address"
                  rows="4"
                  required
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="notes">
                  Order Notes <small>(optional)</small>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions?"
                  rows="3"
                />
              </div>

              {hasBusinessOffer && (
                <div className="checkout-business-terms">
                  <h3>Business Offer Terms</h3>
                  <p>
                    Full payment for these business offers is required before
                    dispatch. Shipping arrangements will be confirmed separately.
                  </p>

                  <label className="checkout-business-confirmation">
                    <input
                      type="checkbox"
                      checked={advancePaymentConfirmed}
                      onChange={(event) =>
                        setAdvancePaymentConfirmed(event.target.checked)
                      }
                    />
                    <span>
                      I understand and accept the advance-payment and dispatch
                      terms for these business offers.
                    </span>
                  </label>
                </div>
              )}
            </form>
          </section>

          <section className="checkout-card checkout-summary-card">
            <div className="checkout-card-header">
              <p className="checkout-step">02</p>
              <div>
                <h2>Order Summary</h2>
                <p>Review your items before placing the order.</p>
              </div>
            </div>

            <div className="checkout-items">
              {cartItems.map((item) => {
                const quantity = Number(item.quantity) || 0;
                const unitPrice = getItemPrice(item);
                const lineTotal = unitPrice * quantity;
                const name = getItemName(item);
                const image = getItemImage(item);

                return (
                  <div
                    className="checkout-item"
                    key={item.lineId || item.productId}
                  >
                    <div className="checkout-item-image">
                      {image ? (
                        <img src={image} alt={name} />
                      ) : (
                        <div className="checkout-item-image-placeholder">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="checkout-item-details">
                      <h3>{name}</h3>

                      {item.variantLabel && <p>{item.variantLabel}</p>}

                      <p>
                        {quantity} {getItemUnitLabel(item)}
                      </p>

                      <small>
                        {formatPrice(unitPrice)} {getItemPriceBasis(item)}
                      </small>

                      {item.requiresAdvancePayment && (
                        <small>Advance payment required</small>
                      )}
                    </div>

                    <strong className="checkout-item-total">
                      {formatPrice(lineTotal)}
                    </strong>
                  </div>
                );
              })}
            </div>

            <div className="checkout-payment">
              <div className="checkout-payment-header">
                <span>Payment Terms</span>
              </div>

              <div className="checkout-payment-option">
                <span aria-hidden="true">✓</span>
                <span>
                  <strong>Full Advance Payment</strong>
                  <small>
                    Full payment for the products is required and must be
                    verified before dispatch. Complete bank-transfer payment
                    within 48 hours of receiving the payment request. Include
                    your Order Reference in the transfer reference field where
                    available. A transfer receipt alone does not confirm
                    payment. Payment instructions and shipping arrangements
                    will be confirmed with you.
                  </small>
                </span>
              </div>
            </div>

            <div className="checkout-totals">
              <div className="checkout-total-row checkout-grand-total">
                <span>Product Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
            </div>

            <p
              style={{
                margin: '16px 0 0',
                color: '#667085',
                fontSize: '13px',
                lineHeight: 1.6,
                textAlign: 'center'
              }}
            >
              Please review our{' '}
              <Link
                to="/shipping-policy"
                style={{
                  color: '#1F3A5C',
                  fontWeight: 700,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px'
                }}
              >
                Shipping &amp; Payment Policy
              </Link>{' '}
              before placing your order.
            </p>

            <button
              type="submit"
              form="checkout-form"
              className="checkout-submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting Order...' : 'Place Order'}
            </button>

            <Link to="/cart" className="checkout-back-link">
              ← Back to Cart
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;