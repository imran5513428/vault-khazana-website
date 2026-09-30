import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import { CATEGORIES, PRODUCTS } from '../../data/products';
import './header.css';

/* ============================================
   FLEXIBLE PRODUCT SEARCH
   Automatically searches current and future
   products added to PRODUCTS.
   ============================================ */

const normalizeSearchText = (value) => {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[×x]/g, 'x')
    .replace(/(\d)\s+(ml|oz|kg|g|mm|cm|in|inch|inches)\b/g, '$1$2')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
};

const getSearchableProductText = (product) => {
  const category = CATEGORIES.find(
    (item) => item.id === product.categoryId
  );

  return normalizeSearchText(
    [
      product.id,
      product.name,
      product.slug,
      product.categoryId,
      category?.name,
      product.description,
      product.overview,
      product.material,
      product.shape,
      product.lid,
      product.colour,
      product.capacity,
      product.dimensions,
      product.suitableFor,
      product.idealFor,
      product.recommendation,
      product.model,
      product.sellingUnit,
      product.pack,
      product.pricePerUnit,
      product.unitPrice,
      product.packPrice
    ]
      .filter(
        (value) =>
          value !== undefined &&
          value !== null &&
          String(value).trim() !== ''
      )
      .join(' ')
  );
};

const searchProductsFlexibly = (query) => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  const queryWords = normalizedQuery.split(/\s+/).filter(Boolean);

  return PRODUCTS
    .map((product) => {
      const searchableText = getSearchableProductText(product);
      const nameText = normalizeSearchText(product.name);
      const idText = normalizeSearchText(product.id);
      const category = CATEGORIES.find(
        (item) => item.id === product.categoryId
      );
      const categoryText = normalizeSearchText(category?.name);

      let score = 0;

      if (searchableText.includes(normalizedQuery)) {
        score += 20;
      }

      if (nameText.includes(normalizedQuery)) {
        score += 50;
      }

      if (idText === normalizedQuery) {
        score += 100;
      } else if (idText.includes(normalizedQuery)) {
        score += 70;
      }

      if (categoryText.includes(normalizedQuery)) {
        score += 15;
      }

      queryWords.forEach((word) => {
        if (nameText.includes(word)) {
          score += 20;
        }

        if (idText.includes(word)) {
          score += 30;
        }

        if (categoryText.includes(word)) {
          score += 8;
        }

        if (searchableText.includes(word)) {
          score += 5;
        }
      });

      const allWordsMatch = queryWords.every((word) =>
        searchableText.includes(word)
      );

      if (!allWordsMatch) {
        return null;
      }

      return {
        product,
        score
      };
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.product.name.localeCompare(b.product.name);
    })
    .slice(0, 8);
};

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartCount = useCartStore((state) =>
    state.getCartCount()
  );

  const searchResults = useMemo(
    () => searchProductsFlexibly(searchQuery),
    [searchQuery]
  );

  useEffect(() => {
    if (!searchOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
  };

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
            <button
              type="button"
              className="nav-link dropdown-toggle"
            >
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
            type="button"
            className={`search-btn ${
              searchOpen ? 'search-btn-active' : ''
            }`}
            aria-label={searchOpen ? 'Close search' : 'Search'}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((current) => !current);
              setSearchQuery('');
            }}
          >
            {searchOpen ? '✕' : '🔍'}
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
            type="button"
            className="mobile-menu-btn"
            onClick={() =>
              setMobileMenuOpen(!mobileMenuOpen)
            }
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* SEARCH PANEL */}
      {searchOpen && (
        <div className="header-search-panel">
          <div className="header-search-container">
            <div className="header-search-input-wrap">
              <span
                className="header-search-icon"
                aria-hidden="true"
              >
                🔍
              </span>

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search products, sizes, materials..."
                aria-label="Search products"
                autoFocus
              />

              {searchQuery && (
                <button
                  type="button"
                  className="header-search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {searchQuery.trim() && (
              <div className="header-search-results">
                {searchResults.length > 0 ? (
                  <>
                    <p className="header-search-result-count">
                      {searchResults.length === 1
                        ? '1 product found'
                        : `${searchResults.length} products found`}
                    </p>

                    {searchResults.map(({ product }) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="header-search-result"
                        onClick={closeSearch}
                      >
                        <div className="header-search-result-image">
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0]}
                              alt=""
                            />
                          ) : (
                            <span>📦</span>
                          )}
                        </div>

                        <div className="header-search-result-content">
                          <strong>{product.name}</strong>

                          <span>
                            {CATEGORIES.find(
                              (category) =>
                                category.id ===
                                product.categoryId
                            )?.name || 'Product'}
                          </span>

                          {product.capacity && (
                            <small>
                              {product.capacity}
                            </small>
                          )}
                        </div>

                        <span className="header-search-arrow">
                          →
                        </span>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div className="header-search-empty">
                    <strong>No products found</strong>
                    <p>
                      Try a product name, size, material or
                      category.
                    </p>
                  </div>
                )}
              </div>
            )}

            {!searchQuery.trim() && (
              <div className="header-search-hint">
                <span>Search by</span>
                <strong>
                  product name, size, material, category or code
                </strong>
              </div>
            )}
          </div>
        </div>
      )}

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
            type="button"
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
            {activeDropdown === 'categories'
              ? '▲'
              : '▼'}
          </button>

          {activeDropdown === 'categories' && (
            <div className="mobile-dropdown">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="mobile-dropdown-item"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
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