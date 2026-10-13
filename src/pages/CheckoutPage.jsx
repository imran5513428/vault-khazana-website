
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { getProductById } from '../data/products';
import '../styles/checkout.css';

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
  const [submittedBusinessOffer, setSubmittedBusinessOffer] =
    useState(false);

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
        'At the moment, we deliver only in Islamabad and Rawalpindi.'
      );
      return;
    }

    if (hasBusinessOffer && !advancePaymentConfirmed) {
      setError(
        'Please confirm that you understand the advance-payment and delivery-charge terms for business offers.'
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
          item.variantLabel ? `Selected option: ${item.variantLabel}` : null,
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

    const paymentMethod = hasBusinessOffer
      ? 'Advance payment required for business offers; payment arrangements to be confirmed'
      : 'Payment method to be confirmed based on delivery arrangement';

    const orderNotes = [
      formData.notes.trim(),
      hasBusinessOffer
        ? 'Customer confirmed business-offer terms. Advance payment is required. Delivery charges are extra and will be confirmed based on delivery area and order quantity.'
        : 'Delivery charge and payment method must be confirmed with the customer before dispatch.'
    ]
      .filter(Boolean)
      .join('\n');

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
      delivery_charges: 'Extra; to be confirmed based on area and quantity',
      order_total_before_delivery: formatPrice(subtotal),
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

      setSubmittedBusinessOffer(hasBusinessOffer);
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

  if (orderReference) {
    return (
      <main className="checkout-page">
        <div className="checkout-container">
          <section className="checkout-success">
            <div className="checkout-success-icon" aria-hidden="true">
              ✓
            </div>

            <p className="checkout-eyebrow">Order Received</p>
            <h1>Thank You!</h1>

            <p className="checkout-success-text">
              Your order has been submitted successfully. We will contact you
              to confirm your order and delivery charges.
            </p>

            <div className="checkout-reference">
              <span>Order Reference</span>
              <strong>{orderReference}</strong>
            </div>

            <div className="checkout-success-details">
              {submittedBusinessOffer ? (
                <>
                  <p>
                    <strong>Payment:</strong> Advance payment required for
                    business offers
                  </p>
                  <p>
                    We will contact you to confirm payment arrangements and
                    delivery charges before dispatch.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Payment:</strong> To be confirmed
                  </p>
                  <p>
                    We’ll confirm the payment method and delivery charges with
                    you before dispatch.
                  </p>
                </>
              )}
            </div>

            <Link to="/" className="checkout-primary-button">
              Continue Shopping
            </Link>
          </section>
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
            Enter your details and we will contact you to confirm your order.
          </p>
        </div>

        {error && (
          <div className="checkout-error" role="alert">
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
                    Advance payment is required for F1 and F3 carton offers.
                    Delivery charges are extra and will be confirmed based on
                    your delivery area and order quantity.
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
                      I understand and accept the advance-payment and delivery
                      charge terms for these business offers.
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

                      {item.variantLabel && (
                        <p>{item.variantLabel}</p>
                      )}

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
                <span>Payment Method</span>
              </div>

              <div className="checkout-payment-option">
                <span aria-hidden="true">✓</span>
                <span>
                  <strong>
                    {hasBusinessOffer
                      ? 'Advance Payment'
                      : 'Confirmed Before Dispatch'}
                  </strong>
                  <small>
                    {hasBusinessOffer
                      ? 'Advance payment is required for business offers. We will contact you to confirm arrangements.'
                      : 'COD may be available with our own or trusted rider. Third-party courier orders may require advance payment. We’ll confirm with you before dispatch.'}
                  </small>
                </span>
              </div>
            </div>

            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <div className="checkout-total-row">
                <span>Delivery</span>
                <strong>Extra — to be confirmed</strong>
              </div>

              <div className="checkout-total-row checkout-grand-total">
                <span>Total before delivery</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
            </div>

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
