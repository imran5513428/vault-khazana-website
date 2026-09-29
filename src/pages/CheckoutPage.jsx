import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { getProductById } from '../data/products';
import '../styles/checkout.css';

function formatPrice(value) {
  return Number(value || 0).toLocaleString();
}

function getPriceBasis(product) {
  const sellingUnit = product?.sellingUnit || 'piece';
  const packSize = product?.packSize;

  if (sellingUnit === 'pack') {
    if (packSize) {
      return `Rs ${formatPrice(product.pricePerUnit)} / pack of ${packSize}`;
    }

    return `Rs ${formatPrice(product.pricePerUnit)} / pack`;
  }

  if (sellingUnit === 'kg') {
    return `Rs ${formatPrice(product.pricePerUnit)} / kg`;
  }

  return `Rs ${formatPrice(product.pricePerUnit)} / piece`;
}

function getUnitLabel(product, quantity = 1) {
  const sellingUnit = product?.sellingUnit || 'piece';

  if (sellingUnit === 'pack') {
    return quantity === 1 ? 'pack' : 'packs';
  }

  if (sellingUnit === 'kg') {
    return 'kg';
  }

  return quantity === 1 ? 'piece' : 'pieces';
}

function createOrderReference() {
  const now = new Date();

  const datePart =
    now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0');

  const randomPart = Math.floor(1000 + Math.random() * 9000);

  return `VK-${datePart}-${randomPart}`;
}

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

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [orderReference, setOrderReference] = useState('');

  const cartItemsWithDetails = items
    .map((item) => {
      const product = getProductById(item.productId);

      if (!product) return null;

      const quantity = Number(item.quantity) || 0;
      const pricePerUnit = Number(product.pricePerUnit) || 0;
      const subtotal = pricePerUnit * quantity;

      return {
        ...item,
        product,
        quantity,
        pricePerUnit,
        subtotal
      };
    })
    .filter(Boolean);

  const cartTotal = cartItemsWithDetails.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value
    }));

    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });

    setSubmitError('');
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = 'Please enter your mobile / WhatsApp number.';
    }

    if (!formData.city.trim()) {
      nextErrors.city = 'Please enter your city.';
    }

    if (!formData.address.trim()) {
      nextErrors.address = 'Please enter your complete delivery address.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const buildOrderDetails = (reference) => {
    const productLines = cartItemsWithDetails.map((item) => {
      const product = item.product;

      return [
        `${product.name}`,
        `Quantity: ${item.quantity} ${getUnitLabel(
          product,
          item.quantity
        )}`,
        `Price: Rs ${formatPrice(item.pricePerUnit)} per ${
          product.sellingUnit === 'pack'
            ? 'pack'
            : product.sellingUnit === 'kg'
              ? 'kg'
              : 'piece'
        }`,
        `Subtotal: Rs ${formatPrice(item.subtotal)}`
      ].join(' | ');
    });

    return [
      `Order Reference: ${reference}`,
      '',
      'CUSTOMER INFORMATION',
      `Name: ${formData.fullName.trim()}`,
      `Mobile / WhatsApp: ${formData.phone.trim()}`,
      `Email: ${formData.email.trim() || 'Not provided'}`,
      `City: ${formData.city.trim()}`,
      `Delivery Address: ${formData.address.trim()}`,
      '',
      'ORDER DETAILS',
      ...productLines,
      '',
      `Order Subtotal: Rs ${formatPrice(cartTotal)}`,
      'Delivery Charges: To be confirmed based on delivery location',
      'Payment Method: Cash on Delivery',
      `Order Total Before Delivery: Rs ${formatPrice(cartTotal)}`,
      '',
      `Customer Notes: ${formData.notes.trim() || 'None'}`
    ].join('\n');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (cartItemsWithDetails.length === 0) {
      setSubmitError(
        'Your cart is empty. Please add products before placing an order.'
      );
      return;
    }

    if (!validateForm()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const reference = createOrderReference();
    const orderDetails = buildOrderDetails(reference);

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key:
              '9fe0b2ca-fd3e-420d-ba1f-e762054a6adb',

            subject: `New VAULT KHAZANA Order - ${reference}`,

            from_name: 'VAULT KHAZANA Website',

            name: formData.fullName.trim(),

            phone: formData.phone.trim(),

            email: formData.email.trim(),

            city: formData.city.trim(),

            address: formData.address.trim(),

            payment_method: 'Cash on Delivery',

            order_reference: reference,

            order_subtotal: `Rs ${formatPrice(cartTotal)}`,

            delivery_charges:
              'To be confirmed based on delivery location',

            order_total_before_delivery:
              `Rs ${formatPrice(cartTotal)}`,

            order_details: orderDetails,

            notes: formData.notes.trim() || 'None',

            botcheck: ''
          })
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Unable to submit your order.'
        );
      }

      clearCart();
      setOrderReference(reference);
    } catch (error) {
      setSubmitError(
        error.message ||
          'Something went wrong while submitting your order. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderReference) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-success">
            <div className="checkout-success-icon" aria-hidden="true">
              ✓
            </div>

            <p className="checkout-eyebrow">
              Order Received
            </p>

            <h1>Thank You!</h1>

            <p className="checkout-success-message">
              Your order has been submitted successfully.
              We will contact you to confirm your order and
              delivery charges.
            </p>

            <div className="order-reference-card">
              <span>Order Reference</span>
              <strong>{orderReference}</strong>
            </div>

            <div className="checkout-cod-note">
              <strong>Payment: Cash on Delivery</strong>
              <p>
                Your delivery charges and final order total
                will be confirmed with you before dispatch.
              </p>
            </div>

            <div className="checkout-success-actions">
              <Link
                to="/"
                className="btn btn-primary btn-lg"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItemsWithDetails.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-empty">
            <h1>Your Cart is Empty</h1>

            <p>
              Please add products to your cart before
              proceeding to checkout.
            </p>

            <Link
              to="/"
              className="btn btn-primary btn-lg"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">

        <div className="checkout-header">
          <p className="checkout-eyebrow">
            VAULT KHAZANA
          </p>

          <h1>Checkout</h1>

          <p>
            Enter your delivery details to place your
            order.
          </p>
        </div>

        {submitError && (
          <div
            className="checkout-error"
            role="alert"
          >
            <strong>Order could not be submitted.</strong>
            <span>{submitError}</span>
          </div>
        )}

        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          noValidate
        >

          <div className="checkout-layout">

            <div className="checkout-main">

              <section className="checkout-card">

                <div className="checkout-card-header">
                  <h2>Customer Information</h2>
                  <p>
                    We need these details to confirm and
                    deliver your order.
                  </p>
                </div>

                <div className="checkout-fields">

                  <div className="form-field">
                    <label htmlFor="fullName">
                      Full Name <span>*</span>
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className={
                        errors.fullName
                          ? 'form-input form-input-error'
                          : 'form-input'
                      }
                      aria-invalid={Boolean(
                        errors.fullName
                      )}
                      aria-describedby={
                        errors.fullName
                          ? 'fullName-error'
                          : undefined
                      }
                    />

                    {errors.fullName && (
                      <p
                        id="fullName-error"
                        className="form-error"
                        role="alert"
                      >
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
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
                      inputMode="tel"
                      className={
                        errors.phone
                          ? 'form-input form-input-error'
                          : 'form-input'
                      }
                      aria-invalid={Boolean(
                        errors.phone
                      )}
                      aria-describedby={
                        errors.phone
                          ? 'phone-error'
                          : undefined
                      }
                    />

                    {errors.phone && (
                      <p
                        id="phone-error"
                        className="form-error"
                        role="alert"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">
                      Email
                      <small>Optional</small>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      inputMode="email"
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="city">
                      City <span>*</span>
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      autoComplete="address-level2"
                      className={
                        errors.city
                          ? 'form-input form-input-error'
                          : 'form-input'
                      }
                      aria-invalid={Boolean(
                        errors.city
                      )}
                      aria-describedby={
                        errors.city
                          ? 'city-error'
                          : undefined
                      }
                    />

                    {errors.city && (
                      <p
                        id="city-error"
                        className="form-error"
                        role="alert"
                      >
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div className="form-field form-field-full">
                    <label htmlFor="address">
                      Complete Delivery Address <span>*</span>
                    </label>

                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House / street / area / landmark"
                      autoComplete="street-address"
                      rows="4"
                      className={
                        errors.address
                          ? 'form-input form-textarea form-input-error'
                          : 'form-input form-textarea'
                      }
                      aria-invalid={Boolean(
                        errors.address
                      )}
                      aria-describedby={
                        errors.address
                          ? 'address-error'
                          : undefined
                      }
                    />

                    {errors.address && (
                      <p
                        id="address-error"
                        className="form-error"
                        role="alert"
                      >
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="form-field form-field-full">
                    <label htmlFor="notes">
                      Order Notes
                      <small>Optional</small>
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Any special delivery instructions?"
                      rows="3"
                      className="form-input form-textarea"
                    />
                  </div>

                </div>

              </section>

              <section className="checkout-card">

                <div className="checkout-card-header">
                  <h2>Payment Method</h2>
                </div>

                <div className="payment-option payment-option-selected">

                  <div className="payment-radio">
                    <span aria-hidden="true"></span>
                  </div>

                  <div className="payment-details">
                    <strong>
                      Cash on Delivery
                    </strong>

                    <p>
                      Pay when your order is delivered.
                    </p>
                  </div>

                </div>

                <p className="payment-coming-soon">
                  Online payment options will be added
                  later.
                </p>

              </section>

            </div>

            <aside className="checkout-sidebar">

              <section className="checkout-card order-summary-card">

                <div className="checkout-card-header">
                  <h2>Your Order</h2>

                  <p>
                    {cartItemsWithDetails.length}{' '}
                    {cartItemsWithDetails.length === 1
                      ? 'product'
                      : 'products'}
                  </p>
                </div>

                <div className="checkout-order-items">

                  {cartItemsWithDetails.map((item) => {
                    const product = item.product;

                    return (
                      <div
                        key={item.productId}
                        className="checkout-order-item"
                      >

                        <div className="checkout-item-image">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt=""
                            />
                          ) : (
                            <div className="checkout-item-placeholder">
                              No image
                            </div>
                          )}
                        </div>

                        <div className="checkout-item-details">

                          <Link
                            to={`/product/${item.productId}`}
                            className="checkout-item-name"
                          >
                            {product.name}
                          </Link>

                          <p className="checkout-item-quantity">
                            Qty: {item.quantity}{' '}
                            {getUnitLabel(
                              product,
                              item.quantity
                            )}
                          </p>

                          <p className="checkout-item-price">
                            {getPriceBasis(product)}
                          </p>

                        </div>

                        <strong className="checkout-item-subtotal">
                          Rs {formatPrice(item.subtotal)}
                        </strong>

                      </div>
                    );
                  })}

                </div>

                <div className="checkout-summary-divider"></div>

                <div className="checkout-summary-row">
                  <span>Subtotal</span>
                  <strong>
                    Rs {formatPrice(cartTotal)}
                  </strong>
                </div>

                <div className="checkout-summary-row">
                  <span>Delivery</span>
                  <span className="checkout-delivery-note">
                    To be confirmed
                  </span>
                </div>

                <div className="checkout-summary-divider"></div>

                <div className="checkout-total-row">
                  <span>Order Total</span>
                  <strong>
                    Rs {formatPrice(cartTotal)}
                  </strong>
                </div>

                <p className="checkout-total-note">
                  Delivery charges will be confirmed
                  according to your delivery location.
                </p>

                <button
                  type="submit"
                  className="btn btn-accent btn-lg checkout-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? 'Submitting Order...'
                    : 'Place Order'}
                </button>

                <Link
                  to="/cart"
                  className="checkout-back-link"
                >
                  ← Back to Cart
                </Link>

              </section>

            </aside>

          </div>

        </form>

      </div>
    </div>
  );
}

export default CheckoutPage;