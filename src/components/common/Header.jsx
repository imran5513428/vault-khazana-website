import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import { CATEGORIES } from '../../data/products';
import './header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const cartCount = useCartStore((state) => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  });

  return (
    <header className="site-header">
      <div className="header-container">

        {/* LOGO */}
        <Link
          to="/"
          className="header-logo"
          aria-label="VAULT KHAZANA Home"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/vault-khazana-logo-light.png`}
            alt="VAULT KHAZANA"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="header-nav desktop-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <div className="nav-dropdown">
            <button className="nav-link dropdown-toggle">
              Categories ▼
            </button>

            <div className="dropdown-menu">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="dropdown-item"
                >
                  {category.icon} {category.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/" className="nav-link">
            Wholesale
          </Link>

          <Link to="/" className="nav-link">
            About
          </Link>
        </nav>

        {/* HEADER ACTIONS */}
        <div className="header-actions">
          <button
            className="search-btn"
            aria-label="Search"
          >
            🔍
          </button>

          <Link
            to="/cart"
            className="cart-link"
          >
            <span className="cart-icon">🛒</span>

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <button
            className="mobile-nav-link dropdown-toggle"
            onClick={() =>
              setActiveDropdown(
                activeDropdown === 'categories'
                  ? null
                  : 'categories'
              )
            }
          >
            Categories{' '}
            {activeDropdown === 'categories' ? '▲' : '▼'}
          </button>

          {activeDropdown === 'categories' && (
            <div className="mobile-dropdown">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="mobile-dropdown-item"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.icon} {category.name}
                </Link>
              ))}
            </div>
          )}

          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Wholesale
          </Link>

          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;