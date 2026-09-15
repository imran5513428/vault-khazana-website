import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, PRODUCTS } from '../data/products';
import './pages.css';

function HomePage() {
  
  // Get featured products (best sellers)
  const featuredProducts = PRODUCTS.filter(p => p.rating >= 4.7).slice(0, 8);
  
  // Get products by category for variety section
  const containerProducts = PRODUCTS.filter(p => p.categoryId === 'food-containers').slice(0, 6);

  return (
    <div className="home-page">
      
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-container">
          
          <div className="hero-content">
            <p className="hero-eyebrow">Packaging & Food-Service Supplies</p>
            
            <h1 className="hero-title">
              Everything your business needs,
              <span className="hero-accent"> in one place.</span>
            </h1>
            
            <p className="hero-description">
              From food containers and takeaway cups to bags, wraps, cutlery and more — find everyday quality supplies for your restaurant, bakery, café, or business. Trusted nationwide delivery across Pakistan.
            </p>
            
            <div className="hero-actions">
              <Link to="/" className="hero-button hero-button-primary">
                Shop Products
                <span className="button-arrow">→</span>
              </Link>
              
              <Link to="/" className="hero-button hero-button-secondary">
                Wholesale Supply
              </Link>
            </div>
            
            {/* TRUST INDICATORS */}
            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-icon">🚚</span>
                <span>Nationwide Delivery</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✓</span>
                <span>Quality Guaranteed</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">💰</span>
                <span>Best Prices</span>
              </div>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="hero-visual">
            <div className="hero-placeholder">
              <div className="placeholder-content">
                <span className="placeholder-icon">📦</span>
                <p>Quality Packaging Supplies</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="section section-categories">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Explore the Khazana</p>
            <h2>Packaging for every need</h2>
            <p>
              Browse practical packaging and food-service supplies
              for restaurants, bakeries, cafés, caterers and businesses.
            </p>
          </div>

          <div className="category-grid">
            {CATEGORIES.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="category-card"
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-desc">{category.description}</p>
                <span className="category-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      {featuredProducts.length > 0 && (
        <section className="section section-featured">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Best Sellers</p>
              <h2>Trusted by thousands</h2>
              <p>
                Our most popular products loved by restaurants,
                bakeries, and businesses across Pakistan.
              </p>
            </div>

            <div className="product-grid">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-card"
                >
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <p className="product-category">{product.categoryId}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">Rs {product.price.toLocaleString()}</p>
                    <p className="product-pack">per {product.pack}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FOOD CONTAINERS SECTION */}
      {containerProducts.length > 0 && (
        <section className="section section-containers">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">Popular Category</p>
              <h2>Food Containers</h2>
              <p>
                Our comprehensive range of food containers
                suitable for any need.
              </p>
            </div>

            <div className="product-grid">
              {containerProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-card"
                >
                  <div className="product-image">
                    <img src={product.images[0]} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <p className="product-category">{product.categoryId}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">Rs {product.price.toLocaleString()}</p>
                    <p className="product-pack">per {product.pack}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE US SECTION */}
      <section className="section section-benefits bg-light">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Why Choose Us</p>
            <h2>Trusted quality disposables</h2>
            <p>
              Here's what makes VAULT KHAZANA different
            </p>
          </div>

          <div className="benefits-grid">
            
            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3>Nationwide Delivery</h3>
              <p>
                Fast, reliable shipping to any corner of Pakistan.
                Order today, get delivered quickly.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">✓</div>
              <h3>Quality Guaranteed</h3>
              <p>
                Same quality your local shop sells, now available online.
                All products tested and verified.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3>Best Prices</h3>
              <p>
                Direct from stock means no middleman markup.
                Get wholesale rates on bulk orders.
              </p>
            </div>

            <div className="benefit-card">
              <div className="benefit-icon">📞</div>
              <h3>Easy Support</h3>
              <p>
                Reach us on WhatsApp or phone for bulk orders,
                special requests, or any questions.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* WHOLESALE SECTION */}
      <section className="section section-wholesale">
        <div className="container">
          <div className="wholesale-content">
            <p className="eyebrow">For Businesses</p>
            <h2>Buying in bulk?</h2>
            <p>
              Get the quantities, packaging options and support
              your business needs — whether you're ordering for
              a restaurant, bakery, café or growing operation.
            </p>
            <a href="/" className="btn btn-primary btn-lg">
              Get Wholesale Quote
            </a>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="section section-how-it-works bg-light">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Simple Process</p>
            <h2>How it works</h2>
          </div>

          <div className="steps-grid">
            
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Browse</h3>
              <p>Explore our wide range of packaging solutions</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Choose</h3>
              <p>Select the products and quantities you need</p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Order</h3>
              <p>Add to cart and proceed to secure checkout</p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Receive</h3>
              <p>Fast delivery to your location across Pakistan</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="section section-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Not sure which product is right for you?</h2>
            <p>
              Our team is here to help. Get in touch with any questions
              or for personalized recommendations.
            </p>
            <a href="/" className="btn btn-accent btn-lg">
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

export default HomePage;
