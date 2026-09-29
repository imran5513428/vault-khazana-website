import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { getProductById } from '../data/products';
import '../styles/checkout.css';

const formatPrice = (value) => {
  return `Rs ${Math.round(Number(value) || 0).toLocaleString('en-PK')}`;
};

const getPriceBasis = (product) => {
  if (!product) return 'Price';

  if (product.sellingUnit === 'pack' && product.packSize) {
    return `per pack of ${product.packSize}`;
  }

  if (product.sellingUnit === 'kg') {
    return 'per kg';
  }

  return 'per piece';
};

const getUnitLabel = (product) => {
  if (!product) return 'pieces';

  if (product.sellingUnit === 'pack') {
    return product.packSize
      ? `pack${product.packSize > 1 ? 's' : ''}`
      : 'pack';
  }

  if (product.sellingUnit === 'kg') {
    return 'kg';
  }

  return 'pieces';
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

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderReference, setOrderReference] = useState('');

  const cartItems = items
    .map((item) => {
      const product = getProductById(item.productId);

      if (!product) return null;

      return {
        ...item,
        product
      };
    })
    .filter(Boolean);

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.product.pricePerUnit) || 0;
    const quantity = Number(item.quantity) || 0;

    return total + price * quantity;
  }, 0);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));
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

    const reference = createOrderReference();

    const orderDetails = cartItems
      .map((item, index) => {
        const product = item.product;
        const quantity = Number(item.quantity) || 0;
        const unitPrice = Number(product.pricePerUnit) || 0;
        const lineTotal = unitPrice * quantity;

        return [
          `${index + 1}. ${product.name}`,
          `Quantity: ${quantity} ${getUnitLabel(product)}`,
          `Price: ${formatPrice(unitPrice)} ${getPriceBasis(product)}`,
          `Subtotal: ${formatPrice(lineTotal)}`
        ].join(' | ');
      })
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
      payment_method: 'Cash on Delivery',
      order_reference: reference,
      order_subtotal: formatPrice(subtotal),
      delivery_charges: 'To be confirmed',
      order_total_before_delivery: formatPrice(subtotal),
      order_details: orderDetails,
      notes: formData.notes.trim(),
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
              <p>
                <strong>Payment:</strong> Cash on Delivery
              </p>

              <p>
                Your delivery charges and final order total will be confirmed
                with you before dispatch.
              </p>
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

          {/* CUSTOMER INFORMATION */}
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

            </form>
          </section>

          {/* ORDER SUMMARY */}
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
                const product = item.product;
                const quantity = Number(item.quantity) || 0;
                const unitPrice = Number(product.pricePerUnit) || 0;
                const lineTotal = unitPrice * quantity;

                return (
                  <div
                    className="checkout-item"
                    key={item.productId}
                  >
                    <div className="checkout-item-image">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                        />
                      ) : (
                        <div className="checkout-item-image-placeholder">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="checkout-item-details">
                      <h3>{product.name}</h3>

                      <p>
                        {quantity} {getUnitLabel(product)}
                      </p>

                      <small>
                        {formatPrice(unitPrice)} {getPriceBasis(product)}
                      </small>
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

              <label className="checkout-payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked
                  readOnly
                />

                <span>
                  <strong>Cash on Delivery</strong>
                  <small>
                    Pay when your order is delivered.
                  </small>
                </span>
              </label>
            </div>

            <div className="checkout-totals">

              <div className="checkout-total-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <div className="checkout-total-row">
                <span>Delivery</span>
                <strong>To be confirmed</strong>
              </div>

              <div className="checkout-total-row checkout-grand-total">
                <span>Total</span>
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

            <Link
              to="/cart"
              className="checkout-back-link"
            >
              ← Back to Cart
            </Link>

          </section>

        </div>
      </div>
    </main>
  );
}

export default CheckoutPage;