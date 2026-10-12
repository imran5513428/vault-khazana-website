
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { getProductById } from '../data/products';
import '../styles/cart.css';

function formatPrice(value) {
  return Math.round(Number(value) || 0).toLocaleString('en-PK');
}

function getItemName(item) {
  return item.isSpecialOffer
    ? item.displayName || item.product?.name || 'Special offer'
    : item.product?.name || 'Product';
}

function getUnitLabel(item) {
  const sellingUnit = item.sellingUnit || item.product?.sellingUnit || 'piece';

  if (sellingUnit === 'pack') return 'pack(s)';
  if (sellingUnit === 'kg') return 'kg';
  if (sellingUnit === 'carton') return 'carton(s)';

  return 'piece(s)';
}

function getPriceBasis(item) {
  if (item.isSpecialOffer) {
    if (item.priceBasis) {
      return `Rs ${formatPrice(item.pricePerUnit)} ${item.priceBasis}`;
    }

    return `Rs ${formatPrice(item.pricePerUnit)} per ${item.sellingUnit || 'unit'}`;
  }

  const product = item.product;
  const sellingUnit = product?.sellingUnit || 'piece';
  const packSize = product?.packSize;
  const price = Number(product?.pricePerUnit) || 0;

  if (sellingUnit === 'pack') {
    return packSize
      ? `Rs ${formatPrice(price)} / pack of ${packSize}`
      : `Rs ${formatPrice(price)} / pack`;
  }

  if (sellingUnit === 'kg') {
    return `Rs ${formatPrice(price)} / kg`;
  }

  return `Rs ${formatPrice(price)} / piece`;
}

function getQuantityDescription(item) {
  if (item.isSpecialOffer) {
    if (item.sellingUnit === 'carton') {
      return 'Sold by the carton';
    }

    if (item.sellingUnit === 'kg') {
      return 'Sold by the kilogram';
    }

    return item.variantLabel || 'Special offer';
  }

  const product = item.product;
  const sellingUnit = product?.sellingUnit || 'piece';
  const moq = Number(product?.moq) || 1;
  const step = Number(product?.step) || 1;
  const packSize = product?.packSize;

  if (sellingUnit === 'pack') {
    return packSize
      ? `1 pack = ${packSize} pieces`
      : `Minimum ${moq} pack(s)`;
  }

  if (sellingUnit === 'kg') {
    return `Minimum ${moq} kg`;
  }

  if (step > 1) {
    return `Minimum ${moq} pieces • Add in quantities of ${step}`;
  }

  return `Minimum ${moq} pieces`;
}

function getItemRules(item) {
  if (item.isSpecialOffer) {
    return {
      moq: Number(item.moq) || 1,
      step: Number(item.step) || 1,
      sellingUnit: item.sellingUnit || 'piece'
    };
  }

  return {
    moq: Number(item.product?.moq) || 1,
    step: Number(item.product?.step) || 1,
    sellingUnit: item.product?.sellingUnit || 'piece'
  };
}

function validateQuantity(quantity, item) {
  const rules = getItemRules(item);
  const value = Number(quantity);

  if (!Number.isFinite(value)) {
    return 'Please enter a valid quantity.';
  }

  if (value < rules.moq) {
    if (rules.sellingUnit === 'kg') {
      return `Minimum order is ${rules.moq} kg.`;
    }

    if (rules.sellingUnit === 'carton') {
      return `Minimum order is ${rules.moq} carton(s).`;
    }

    return `Minimum order is ${rules.moq} piece(s).`;
  }

  if ((value - rules.moq) % rules.step !== 0) {
    const unit =
      rules.sellingUnit === 'kg'
        ? 'kg'
        : rules.sellingUnit === 'carton'
          ? 'carton(s)'
          : rules.sellingUnit === 'pack'
            ? 'pack(s)'
            : 'piece(s)';

    return `Quantity must increase in steps of ${rules.step} ${unit}.`;
  }

  return '';
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

      const completeItem = {
        ...item,
        product
      };

      const pricePerUnit = item.isSpecialOffer
        ? Number(item.pricePerUnit) || 0
        : Number(product.pricePerUnit) || 0;

      return {
        ...completeItem,
        subtotal: pricePerUnit * Number(item.quantity || 0)
      };
    })
    .filter(Boolean);

  const cartTotal = cartItemsWithDetails.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  const getItemKey = (item) => item.lineId || item.productId;

  const getItemQuantityError = (item, quantity) => {
    if (item.isSpecialOffer) {
      return validateQuantity(quantity, item);
    }

    return getQuantityError(item.productId, quantity);
  };

  const handleQuantityChange = (item, value) => {
    const key = getItemKey(item);

    setDraftQuantities((current) => ({
      ...current,
      [key]: value
    }));

    if (value === '') {
      setQuantityErrors((current) => ({
        ...current,
        [key]: 'Please enter a quantity.'
      }));
      return;
    }

    const error = getItemQuantityError(item, Number(value));

    if (error) {
      setQuantityErrors((current) => ({
        ...current,
        [key]: error
      }));
      return;
    }

    const updated = updateQuantity(key, Number(value));

    if (!updated) {
      setQuantityErrors((current) => ({
        ...current,
        [key]: 'Unable to update this quantity. Please try again.'
      }));
      return;
    }

    setQuantityErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });

    setDraftQuantities((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleQuantityBlur = (item) => {
    const key = getItemKey(item);
    const draftValue = draftQuantities[key];

    if (draftValue === undefined) return;

    if (draftValue === '') {
      setQuantityErrors((current) => ({
        ...current,
        [key]: 'Please enter a quantity.'
      }));
      return;
    }

    const error = getItemQuantityError(item, Number(draftValue));

    if (error) {
      setQuantityErrors((current) => ({
        ...current,
        [key]: error
      }));

      setDraftQuantities((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });

      return;
    }

    const updated = updateQuantity(key, Number(draftValue));

    if (!updated) {
      setQuantityErrors((current) => ({
        ...current,
        [key]: 'Unable to update this quantity. Please try again.'
      }));
      return;
    }

    setDraftQuantities((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });

    setQuantityErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleDecrease = (item) => {
    const key = getItemKey(item);
    const rules = getItemRules(item);
    const newQuantity = Number(item.quantity) - rules.step;

    if (newQuantity < rules.moq) return;

    const error = getItemQuantityError(item, newQuantity);

    if (error) {
      setQuantityErrors((current) => ({
        ...current,
        [key]: error
      }));
      return;
    }

    updateQuantity(key, newQuantity);
  };

  const handleIncrease = (item) => {
    const key = getItemKey(item);
    const rules = getItemRules(item);
    const newQuantity = Number(item.quantity) + rules.step;
    const error = getItemQuantityError(item, newQuantity);

    if (error) {
      setQuantityErrors((current) => ({
        ...current,
        [key]: error
      }));
      return;
    }

    updateQuantity(key, newQuantity);
  };

  const handleClearCart = () => {
    const confirmed = window.confirm(
      'Are you sure you want to remove all products from your cart?'
    );

    if (confirmed) {
      clearCart();
      setDraftQuantities({});
      setQuantityErrors({});
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

  const hasBusinessOffers = cartItemsWithDetails.some(
    (item) =>
      item.isSpecialOffer &&
      item.requiresAdvancePayment
  );

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

        {hasBusinessOffers && (
          <div className="cart-business-offer-notice" role="note">
            <strong>Business Offer terms</strong>
            <p>
              Advance payment only. Delivery charges are extra and
              will be confirmed after you submit your order.
              Business Offers are available in Rawalpindi and Islamabad only.
            </p>
          </div>
        )}

        <div className="cart-grid">

          <div className="cart-items">

            {cartItemsWithDetails.map((item) => {
              const product = item.product;
              const itemKey = getItemKey(item);
              const rules = getItemRules(item);
              const itemName = getItemName(item);
              const image = item.isSpecialOffer
                ? item.image || product.images?.[0]
                : product.images?.[0];

              const hasQuantityError =
                Boolean(quantityErrors[itemKey]);

              const draftValue =
                draftQuantities[itemKey] !== undefined
                  ? draftQuantities[itemKey]
                  : item.quantity;

              return (
                <div
                  key={itemKey}
                  className="cart-item"
                >

                  <div className="item-image">
                    {image ? (
                      <img src={image} alt={itemName} />
                    ) : (
                      <div className="item-image-placeholder">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="item-details">

                    {item.isSpecialOffer ? (
                      <p className="item-name">
                        {itemName}
                      </p>
                    ) : (
                      <Link
                        to={`/product/${item.productId}`}
                        className="item-name"
                      >
                        {itemName}
                      </Link>
                    )}

                    {item.variantLabel && (
                      <p className="item-specs">
                        {item.variantLabel}
                      </p>
                    )}

                    {!item.isSpecialOffer && product.dimensions && (
                      <p className="item-specs">
                        {product.dimensions}
                      </p>
                    )}

                    <p className="item-price">
                      {getPriceBasis(item)}
                    </p>

                    <p className="item-selling-info">
                      {getQuantityDescription(item)}
                    </p>

                    {item.requiresAdvancePayment && (
                      <p className="item-selling-info">
                        Advance payment only · Rawalpindi & Islamabad
                      </p>
                    )}

                  </div>

                  <div className="item-controls">

                    <div className="item-quantity">

                      <span className="quantity-label">
                        Quantity ({getUnitLabel(item)})
                      </span>

                      <div className="quantity-control">

                        <button
                          type="button"
                          onClick={() => handleDecrease(item)}
                          className="qty-btn"
                          aria-label={`Decrease quantity of ${itemName}`}
                          disabled={Number(item.quantity) <= rules.moq}
                        >
                          −
                        </button>

                        <input
                          type="number"
                          value={draftValue}
                          onChange={(event) =>
                            handleQuantityChange(item, event.target.value)
                          }
                          onBlur={() => handleQuantityBlur(item)}
                          className={`qty-input ${
                            hasQuantityError ? 'qty-input-error' : ''
                          }`}
                          min={rules.moq}
                          step={rules.step}
                          inputMode="numeric"
                          aria-label={`Quantity for ${itemName}`}
                          aria-invalid={hasQuantityError}
                        />

                        <button
                          type="button"
                          onClick={() => handleIncrease(item)}
                          className="qty-btn"
                          aria-label={`Increase quantity of ${itemName}`}
                        >
                          +
                        </button>

                      </div>

                      {quantityErrors[itemKey] && (
                        <p className="quantity-error" role="alert">
                          {quantityErrors[itemKey]}
                        </p>
                      )}

                    </div>

                    <div className="item-subtotal">
                      <p className="subtotal-label">Subtotal</p>
                      <p className="subtotal-amount">
                        Rs {formatPrice(item.subtotal)}
                      </p>
                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(itemKey)}
                    className="item-remove"
                    aria-label={`Remove ${itemName} from cart`}
                  >
                    🗑️
                  </button>

                </div>
              );
            })}

            <div className="cart-actions">
              <Link to="/" className="btn btn-secondary">
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
                <span>Rs {formatPrice(cartTotal)}</span>
              </div>

              <div className="summary-row">
                <span>Delivery</span>
                <span className="shipping-label">
                  Calculated after order details
                </span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total before delivery</span>
                <span>Rs {formatPrice(cartTotal)}</span>
              </div>

              <p className="summary-note">
                Delivery charges and the final total will be confirmed
                after your delivery details are provided.
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
