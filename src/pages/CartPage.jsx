import React from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { getProductById } from '../data/products';

function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const cartItemsWithDetails = items.map(item => ({
    ...item,
    product: getProductById(item.productId),
    subtotal: (getProductById(item.productId)?.price || 0) * item.quantity
  })).filter(item => item.product);

  const cartTotal = cartItemsWithDetails.reduce((total, item) => total + item.subtotal, 0);

  if (cartItemsWithDetails.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h1>Your Cart is Empty</h1>
            <p>No products added yet. Start shopping to add items to your cart.</p>
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
        
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-grid">
          
          {/* CART ITEMS */}
          <div className="cart-items">
            
            {cartItemsWithDetails.map((item) => (
              <div key={item.productId} className="cart-item">
                
                <div className="item-image">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                  />
                </div>

                <div className="item-details">
                  <Link
                    to={`/product/${item.productId}`}
                    className="item-name"
                  >
                    {item.product.name}
                  </Link>
                  <p className="item-specs">
                    {item.product.dimensions}
                  </p>
                  <p className="item-price">
                    Rs {item.product.price.toLocaleString()}
                  </p>
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="qty-btn"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                    className="qty-input"
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-subtotal">
                  <p className="subtotal-label">Subtotal</p>
                  <p className="subtotal-amount">
                    Rs {item.subtotal.toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="item-remove"
                  aria-label="Remove from cart"
                >
                  🗑️
                </button>

              </div>
            ))}

            {/* CLEAR CART BUTTON */}
            <button
              onClick={clearCart}
              className="btn btn-secondary btn-sm clear-cart-btn"
            >
              Clear Cart
            </button>

          </div>

          {/* CART SUMMARY */}
          <div className="cart-summary">
            
            <div className="summary-card">
              
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rs {cartTotal.toLocaleString()}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span className="shipping-label">Calculated at checkout</span>
              </div>

              <div className="summary-row tax-row">
                <span>Tax</span>
                <span className="tax-label">As per location</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <span>Rs {cartTotal.toLocaleString()}</span>
              </div>

              <div className="summary-actions">
                <Link to="/checkout" className="btn btn-accent btn-lg btn-block">
                  Proceed to Checkout
                </Link>
                <Link to="/" className="btn btn-secondary btn-lg btn-block">
                  Continue Shopping
                </Link>
              </div>

              <div className="trust-badges">
                <p>✓ Secure checkout</p>
                <p>✓ Multiple payment options</p>
                <p>✓ Nationwide delivery</p>
              </div>

            </div>

            {/* PROMO CODE */}
            <div className="promo-card">
              <h3>Have a promo code?</h3>
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="promo-input"
                  disabled
                />
                <button className="btn btn-sm" disabled>
                  Apply
                </button>
              </div>
              <p className="promo-note">
                Promo codes coming soon
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default CartPage;
