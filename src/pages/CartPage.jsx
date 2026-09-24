import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { getProductById } from '../data/products';
import '../styles/cart.css';

function formatPrice(value) {
  return Number(value || 0).toLocaleString();
}

function getUnitLabel(product, quantity = 1) {
  const sellingUnit = product?.sellingUnit || 'piece';
  const packSize = product?.packSize;

  if (sellingUnit === 'pack') {
    return quantity === 1 ? 'pack' : 'packs';
  }

  if (sellingUnit === 'kg') {
    return quantity === 1 ? 'kg' : 'kg';
  }

  return quantity === 1 ? 'piece' : 'pieces';
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

function getQuantityDescription(product) {
  const sellingUnit = product?.sellingUnit || 'piece';
  const moq = Number(product?.moq) || 1;
  const step = Number(product?.step) || 1;
  const packSize = product?.packSize;

  if (sellingUnit === 'pack') {
    if (packSize) {
      return `1 pack = ${packSize} pieces`;
    }

    return `Minimum ${moq} pack${moq === 1 ? '' : 's'}`;
  }

  if (sellingUnit === 'kg') {
    return `Minimum ${moq} kg`;
  }

  if (step > 1) {
    return `Minimum ${moq} pieces • Add in quantities of ${step}`;
  }

  return `Minimum ${moq} pieces`;
}

function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getQuantityError = useCartStore(
    (state) => state.getQuantityError
  );

  const [draftQuantities, setDraftQuantities] = useState({});
  const [quantityErrors, setQuantityErrors] = useState({});

  const cartItemsWithDetails = items
    .map((item) => {
      const product = getProductById(item.productId);

      if (!product) return null;

      const pricePerUnit = Number(product.pricePerUnit) || 0;
      const subtotal = pricePerUnit * item.quantity;

      return {
        ...item,
        product,
        subtotal
      };
    })
    .filter(Boolean);

  const cartTotal = cartItemsWithDetails.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const handleQuantityChange = (productId, value) => {
    setDraftQuantities((current) => ({
      ...current,
      [productId]: value
    }));

    if (value === '') {
      setQuantityErrors((current) => ({
        ...current,
        [productId]: 'Please enter a quantity.'
      }));
      return;
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      setQuantityErrors((current) => ({
        ...current,
        [productId]: 'Please enter a valid quantity.'
      }));
      return;
    }

    const error = getQuantityError(productId, numericValue);

    if (error) {
      setQuantityErrors((current) => ({
        ...current,
        [productId]: error
      }));
      return;
    }

    setQuantityErrors((current) => {
      const next = { ...current };
      delete next[productId];
      return next;
    });

    updateQuantity(productId, numericValue);

    setDraftQuantities((current) => {
      const next = { ...current };
      delete next[productId];
      return next;
    });
  };

  const handleQuantityBlur = (productId) => {
    const draftValue = draftQuantities[productId];

    if (draftValue === undefined) return;

    if (draftValue === '') {
      setQuantityErrors((current) => ({
        ...current,
        [productId]: 'Please enter a quantity.'
      }));
      return;
    }

    const numericValue = Number(draftValue);
    const error = getQuantityError(productId, numericValue);

    if (error) {
      setQuantityErrors((current) => ({
        ...current,
        [productId]: error
      }));

      setDraftQuantities((current) => {
        const next = { ...current };
        delete next[productId];
        return next;
      });

      return;
    }

    updateQuantity(productId, numericValue);

    setDraftQuantities((current) => {
      const next = { ...current };
      delete next[productId];
      return next;
    });

    setQuantityErrors((current) => {
      const next = { ...current };
      delete next[productId];
      return next;
    });
  };

  const handleDecrease = (item) => {
    const product = item.product;
    const moq = Number(product.moq) || 1;
    const step = Number(product.step) || 1;

    const newQuantity = item.quantity - step;

    if (newQuantity < moq) return;

    const error = getQuantityError(item.productId, newQuantity);

    if (error) {
      setQuantityErrors((current) => ({
        ...current,
        [item.productId]: error
      }));
      return;
    }

    updateQuantity(item.productId, newQuantity);
  };

  const handleIncrease = (item) => {
    const step = Number(item.product.step) || 1;
    const newQuantity = item.quantity + step;

    const error = getQuantityError(item.productId, newQuantity);

    if (error) {
      setQuantityErrors((current) => ({
        ...current,
        [item.productId]: error
      }));
      return;
    }

    updateQuantity(item.productId, newQuantity);
  };

  const handleClearCart = () => {
    const confirmed = window.confirm(
      'Are you sure you want to remove all products from your cart?'
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (cartItemsWithDetails.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h1>Your Cart is Empty</h1>

            <p>
              No products added yet. Start shopping to add items
              to your cart.
            </p>

            <Link to="/" className="btn btn-primary btn-lg">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">

        <div className="cart-header">
          <div>
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-count">
              {cartItemsWithDetails.length}{' '}
              {cartItemsWithDetails.length === 1
                ? 'product'
                : 'products'}
            </p>
          </div>
        </div>

        <div className="cart-grid">

          <div className="cart-items">

            {cartItemsWithDetails.map((item) => {
              const product = item.product;

              const moq = Number(product.moq) || 1;
              const step = Number(product.step) || 1;

              const hasQuantityError =
                Boolean(quantityErrors[item.productId]);

              const draftValue =
                draftQuantities[item.productId] !== undefined
                  ? draftQuantities[item.productId]
                  : item.quantity;

              return (
                <div
                  key={item.productId}
                  className="cart-item"
                >

                  <div className="item-image">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                      />
                    ) : (
                      <div className="item-image-placeholder">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="item-details">

                    <Link
                      to={`/product/${item.productId}`}
                      className="item-name"
                    >
                      {product.name}
                    </Link>

                    {product.dimensions && (
                      <p className="item-specs">
                        {product.dimensions}
                      </p>
                    )}

                    <p className="item-price">
                      {getPriceBasis(product)}
                    </p>

                    <p className="item-selling-info">
                      {getQuantityDescription(product)}
                    </p>

                  </div>

                  <div className="item-controls">

                    <div className="item-quantity">

                      <span className="quantity-label">
                        Quantity
                      </span>

                      <div className="quantity-control">

                        <button
                          type="button"
                          onClick={() => handleDecrease(item)}
                          className="qty-btn"
                          aria-label={`Decrease quantity of ${product.name}`}
                          disabled={item.quantity <= moq}
                        >
                          −
                        </button>

                        <input
                          type="number"
                          value={draftValue}
                          onChange={(event) =>
                            handleQuantityChange(
                              item.productId,
                              event.target.value
                            )
                          }
                          onBlur={() =>
                            handleQuantityBlur(item.productId)
                          }
                          className={`qty-input ${
                            hasQuantityError
                              ? 'qty-input-error'
                              : ''
                          }`}
                          min={moq}
                          step={step}
                          inputMode="numeric"
                          aria-label={`Quantity for ${product.name}`}
                          aria-invalid={hasQuantityError}
                        />

                        <button
                          type="button"
                          onClick={() => handleIncrease(item)}
                          className="qty-btn"
                          aria-label={`Increase quantity of ${product.name}`}
                        >
                          +
                        </button>

                      </div>

                      {quantityErrors[item.productId] && (
                        <p
                          className="quantity-error"
                          role="alert"
                        >
                          {quantityErrors[item.productId]}
                        </p>
                      )}

                    </div>

                    <div className="item-subtotal">

                      <p className="subtotal-label">
                        Subtotal
                      </p>

                      <p className="subtotal-amount">
                        Rs {formatPrice(item.subtotal)}
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFromCart(item.productId)
                    }
                    className="item-remove"
                    aria-label={`Remove ${product.name} from cart`}
                  >
                    🗑️
                  </button>

                </div>
              );
            })}

            <div className="cart-actions">
              <Link
                to="/"
                className="btn btn-secondary"
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                onClick={handleClearCart}
                className="btn btn-secondary clear-cart-btn"
              >
                Clear Cart
              </button>
            </div>

          </div>

          <aside className="cart-summary">

            <div className="summary-card">

              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>
                  Rs {formatPrice(cartTotal)}
                </span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span className="shipping-label">
                  Calculated at checkout
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span>
                  Rs {formatPrice(cartTotal)}
                </span>
              </div>

              <p className="summary-note">
                Final delivery charges and total will be
                confirmed at checkout after delivery details
                are provided.
              </p>

              <div className="summary-actions">

                <Link
                  to="/checkout"
                  className="btn btn-accent btn-lg btn-block"
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/"
                  className="btn btn-secondary btn-lg btn-block"
                >
                  Continue Shopping
                </Link>

              </div>

            </div>

            <div className="promo-card">

              <h3>Have a promo code?</h3>

              <div className="promo-input-group">

                <input
                  type="text"
                  placeholder="Enter code"
                  className="promo-input"
                  disabled
                  aria-label="Promo code"
                />

                <button
                  type="button"
                  className="btn btn-sm"
                  disabled
                >
                  Apply
                </button>

              </div>

              <p className="promo-note">
                Promo codes coming soon
              </p>

            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

export default CartPage;