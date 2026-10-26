import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { getProductById } from '../data/products';
import '../styles/cart.css';

const BAG_OPTIONS = [
  { value: '18x24', label: '18 × 24 in — approx. 50 pieces' },
  { value: '20x30', label: '20 × 30 in — approx. 40 pieces' },
  { value: '24x36', label: '24 × 36 in — approx. 25 pieces' },
  { value: '30x50', label: '30 × 50 in — approx. 12–13 pieces' }
];

const ROTI_WARMER_ID = 'insulated-roti-chapati-warmer';
const ROTI_WARMER_FIRST_PRICE = 190;
const ROTI_WARMER_ADDITIONAL_PRICE = 180;

function formatPrice(value) {
  return Math.round(Number(value) || 0).toLocaleString('en-PK');
}

function getItemName(item) {
  return item.isSpecialOffer
    ? item.displayName || item.product?.name || 'Special offer'
    : item.product?.name || 'Product';
}

function getPackSize(product) {
  if (product?.packSize) return product.packSize;

  const packText = String(product?.pack || '');
  const match = packText.match(/(\d+)\s*pieces?/i);

  return match ? Number(match[1]) : null;
}

function getSellingUnit(item) {
  return item.sellingUnit || item.product?.sellingUnit || 'piece';
}

function getUnitLabel(item) {
  const sellingUnit = getSellingUnit(item);

  if (sellingUnit === 'pack') return 'packs';
  if (sellingUnit === 'kg') return 'kg';
  if (sellingUnit === 'carton') return 'cartons';
  if (sellingUnit === 'roll') return 'rolls';
  if (sellingUnit === 'set') return 'sets';

  return 'pieces';
}

function getQuantityUnit(item, quantity) {
  const sellingUnit = getSellingUnit(item);
  const singular = Number(quantity) === 1;

  if (sellingUnit === 'kg') return 'kg';
  if (sellingUnit === 'pack') return singular ? 'pack' : 'packs';
  if (sellingUnit === 'carton') return singular ? 'carton' : 'cartons';
  if (sellingUnit === 'roll') return singular ? 'roll' : 'rolls';
  if (sellingUnit === 'set') return singular ? 'set' : 'sets';

  return singular ? 'piece' : 'pieces';
}

function getPriceBasis(item) {
  const price = Number(
    item.pricePerUnit ?? item.product?.pricePerUnit ?? item.product?.price
  ) || 0;

  if (item.isSpecialOffer) {
    if (item.priceBasis) {
      return `Rs ${formatPrice(price)} ${item.priceBasis}`;
    }

    return `Rs ${formatPrice(price)} per ${item.sellingUnit || 'unit'}`;
  }

  const product = item.product;
  const sellingUnit = getSellingUnit(item);
  const packSize = getPackSize(product);

  if (product?.id === ROTI_WARMER_ID) {
    return 'First piece Rs 190 · Each additional piece Rs 180';
  }

  if (sellingUnit === 'roll') {
    return `Rs ${formatPrice(price)} / roll`;
  }

  if (sellingUnit === 'pack') {
    return packSize
      ? `Rs ${formatPrice(price)} / pack of ${packSize} pieces`
      : `Rs ${formatPrice(price)} / pack`;
  }

  if (sellingUnit === 'set') {
    return `Rs ${formatPrice(price)} / ${
      product?.pack ? `set of ${product.pack}` : 'set'
    }`;
  }

  if (sellingUnit === 'kg') {
    return `Rs ${formatPrice(price)} / kg`;
  }

  if (sellingUnit === 'carton') {
    return `Rs ${formatPrice(price)} / carton`;
  }

  return `Rs ${formatPrice(price)} / piece`;
}

/**
 * Calculates the cart line total.
 * The special first-piece/additional-piece pricing applies only
 * to the Insulated Roti & Chapati Warmer.
 * All other products keep their existing pricing behaviour.
 */
function getItemSubtotal(item, quantity) {
  const qty = Number(quantity) || 0;

  if (qty <= 0) return 0;

  if (
    !item.isSpecialOffer &&
    item.product?.id === ROTI_WARMER_ID
  ) {
    return (
      ROTI_WARMER_FIRST_PRICE +
      (qty - 1) * ROTI_WARMER_ADDITIONAL_PRICE
    );
  }

  const pricePerUnit = item.isSpecialOffer
    ? Number(item.pricePerUnit) || 0
    : Number(
        item.pricePerUnit ??
          item.product?.pricePerUnit ??
          item.product?.price
      ) || 0;

  return pricePerUnit * qty;
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
  const sellingUnit = getSellingUnit(item);
  const moq = Number(product?.moq) || 1;
  const step = Number(product?.step) || 1;
  const packSize = getPackSize(product);
  const minimumUnit = getQuantityUnit(item, moq);

  if (product?.id === ROTI_WARMER_ID) {
    return 'First piece Rs 190; each additional piece Rs 180. Minimum 1 piece.';
  }

  if (sellingUnit === 'roll') {
    return `Sold by the roll · Minimum ${moq} ${minimumUnit}`;
  }

  if (sellingUnit === 'pack') {
    return packSize
      ? `1 pack = ${packSize} pieces`
      : `Minimum ${moq} ${minimumUnit}`;
  }

  if (sellingUnit === 'set') {
    return `Sold as ${
      product?.pack ? `a set of ${product.pack}` : 'a set'
    } · Minimum ${moq} ${minimumUnit}`;
  }

  if (sellingUnit === 'kg') {
    return `Minimum ${moq} kg`;
  }

  if (sellingUnit === 'carton') {
    return `Sold by the carton · Minimum ${moq} ${minimumUnit}`;
  }

  if (step > 1) {
    return `Minimum ${moq} ${minimumUnit} • Add in quantities of ${step}`;
  }

  return `Minimum ${moq} ${minimumUnit}`;
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
    sellingUnit: getSellingUnit(item)
  };
}

function validateQuantity(quantity, item) {
  const rules = getItemRules(item);
  const value = Number(quantity);

  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    return 'Please enter a valid whole-number quantity.';
  }

  const unit = getQuantityUnit(item, rules.moq);

  if (value < rules.moq) {
    return `Minimum order is ${rules.moq} ${unit}.`;
  }

  if ((value - rules.moq) % rules.step !== 0) {
    const stepUnit = getQuantityUnit(item, rules.step);
    return `Quantity must increase in steps of ${rules.step} ${stepUnit}.`;
  }

  return '';
}

function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const addOfferToCart = useCartStore((state) => state.addOfferToCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const getQuantityError = useCartStore(
    (state) => state.getQuantityError
  );

  const [draftQuantities, setDraftQuantities] = useState({});
  const [quantityErrors, setQuantityErrors] = useState({});
  const [additionalBagSize, setAdditionalBagSize] = useState('20x30');
  const [bagAddMessage, setBagAddMessage] = useState('');
  const [bagAddError, setBagAddError] = useState('');

  const cartItemsWithDetails = items
    .map((item) => {
      const product = getProductById(item.productId);

      if (!product) return null;

      const completeItem = {
        ...item,
        product
      };

      return {
        ...completeItem,
        subtotal: getItemSubtotal(
          { ...completeItem, product },
          item.quantity
        )
      };
    })
    .filter(Boolean);

  const cartTotal = cartItemsWithDetails.reduce(
    (total, item) => total + item.subtotal,
    0
  );

  // This creates a WhatsApp draft only; it does not place an order.
  const whatsappCartMessage = [
    'Hello VAULT KHAZANA, I have a question about my cart:',
    '',
    ...cartItemsWithDetails.map((item, index) => {
      const itemName = getItemName(item);
      const option = item.variantLabel
        ? ` — ${item.variantLabel}`
        : '';
      const quantityUnit = getQuantityUnit(item, item.quantity);

      const pricingNote =
        !item.isSpecialOffer &&
        item.product?.id === ROTI_WARMER_ID
          ? ' | First piece Rs 190; each additional piece Rs 180'
          : '';

      return `${index + 1}. ${itemName}${option} | Quantity: ${item.quantity} ${quantityUnit}${pricingNote} | Subtotal: Rs ${formatPrice(item.subtotal)}`;
    }),
    '',
    `Subtotal before delivery: Rs ${formatPrice(cartTotal)}`,
    'Please confirm availability and delivery charges for Rawalpindi/Islamabad.'
  ].join('\n');

  const whatsappCartUrl =
    `https://wa.me/923335513428?text=${encodeURIComponent(whatsappCartMessage)}`;

  const getItemKey = (item) => item.lineId || item.productId;

  const getItemQuantityError = (item, quantity) => {
    if (item.isSpecialOffer) {
      return validateQuantity(quantity, item);
    }

    return getQuantityError(
      item.productId,
      quantity,
      item.variantKey || null
    );
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

  const handleAddAnotherBagSize = () => {
    setBagAddMessage('');
    setBagAddError('');

    const product = getProductById('off-white-waste-bags');

    if (!product) {
      setBagAddError('Garbage-bag information is temporarily unavailable.');
      return;
    }

    const selectedOption = BAG_OPTIONS.find(
      (option) => option.value === additionalBagSize
    );

    const result = addOfferToCart({
      productId: 'off-white-waste-bags',
      variantKey: additionalBagSize,
      variantLabel: selectedOption?.label || additionalBagSize,
      displayName: 'Garbage Bags',
      quantity: 1,
      unitPrice: 525,
      sellingUnit: 'kg',
      priceBasis: 'per kg',
      offerType: 'everyday',
      image: product.images?.[0] || '',
      moq: 1,
      step: 1,
      requiresAdvancePayment: false
    });

    if (!result?.success) {
      setBagAddError(
        result?.error || 'Unable to add this bag size. Please try again.'
      );
      return;
    }

    setBagAddMessage(
      `${selectedOption?.label || additionalBagSize} added to your cart.`
    );
  };

  const handleClearCart = () => {
    const confirmed = window.confirm(
      'Are you sure you want to remove all products from your cart?'
    );

    if (confirmed) {
      clearCart();
      setDraftQuantities({});
      setQuantityErrors({});
      setBagAddMessage('');
      setBagAddError('');
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

  const hasGarbageBagOffer = cartItemsWithDetails.some(
    (item) =>
      item.isSpecialOffer &&
      item.productId === 'off-white-waste-bags'
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
            {hasGarbageBagOffer && (
              <div
                className="cart-business-offer-notice"
                style={{ marginBottom: '20px' }}
              >
                <h3 style={{ marginTop: 0 }}>
                  Add another garbage-bag size
                </h3>

                <p>
                  Choose another size without leaving your cart.
                  Each size has its own quantity and subtotal.
                </p>

                <p>
                  <strong>Rs 525 per kg</strong>
                </p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <label htmlFor="additional-garbage-bag-size">
                    Bag size
                  </label>

                  <select
                    id="additional-garbage-bag-size"
                    value={additionalBagSize}
                    onChange={(event) => {
                      setAdditionalBagSize(event.target.value);
                      setBagAddMessage('');
                      setBagAddError('');
                    }}
                    style={{
                      flex: '1 1 220px',
                      minWidth: 0,
                      padding: '10px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      background: '#fff',
                      color: '#1F3A5C'
                    }}
                  >
                    {BAG_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddAnotherBagSize}
                  >
                    Add 1 kg
                  </button>
                </div>

                {bagAddError && (
                  <p role="alert" style={{ marginBottom: 0 }}>
                    {bagAddError}
                  </p>
                )}

                {bagAddMessage && (
                  <p role="status" style={{ marginBottom: 0 }}>
                    {bagAddMessage}
                  </p>
                )}
              </div>
            )}

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

              <div
                style={{
                  marginTop: '16px',
                  padding: '14px',
                  border: '1px solid #ead7b4',
                  borderRadius: '8px',
                  background: '#fffaf1'
                }}
              >
                <strong style={{ color: '#1F3A5C' }}>
                  Before you order
                </strong>
                <p style={{ margin: '6px 0 8px', lineHeight: 1.6 }}>
                  We deliver in Rawalpindi and Islamabad. Delivery charges
                  start from Rs. 150. COD eligibility and payment arrangements
                  depend on your delivery address and service.
                </p>
                <Link
                  to="/shipping-policy"
                  style={{
                    color: '#1F3A5C',
                    fontWeight: 600,
                    textDecoration: 'underline'
                  }}
                >
                  View Shipping &amp; Payment Policy →
                </Link>
              </div>

              <div className="summary-actions">
                <a
                  href={whatsappCartUrl}
                  className="btn btn-secondary btn-lg btn-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask about this cart on WhatsApp
                </a>

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