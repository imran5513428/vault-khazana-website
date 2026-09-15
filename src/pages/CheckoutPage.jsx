import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutPage() {
  return (
    <div className="checkout-page">
      <div className="container">
        
        <div className="checkout-coming-soon">
          <div className="coming-soon-content">
            <h1>🛒 Checkout</h1>
            <p>The checkout and payment system will be implemented soon.</p>
            <p>This includes:</p>
            <ul>
              <li>Shipping address form</li>
              <li>Payment method selection (Stripe, Jazz Cash, COD)</li>
              <li>Order confirmation</li>
              <li>Order tracking</li>
            </ul>
            <Link to="/cart" className="btn btn-primary">
              ← Back to Cart
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CheckoutPage;
