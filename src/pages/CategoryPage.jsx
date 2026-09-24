import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getCategoryBySlug,
  getProductsByCategory
} from '../data/products';

function CategoryPage() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const products = category
    ? getProductsByCategory(category.id)
    : [];

  if (!category) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="not-found">
            <h1>Category Not Found</h1>
            <p>The category you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /*
   * CATEGORY PRODUCT CARD PRICING
   *
   * All pricing comes from the canonical selling structure
   * in products.js.
   *
   * Piece:
   * pricePerUnit = price of one piece
   *
   * Pack:
   * pricePerUnit = price of the complete pack
   * packSize = number of pieces in that pack
   *
   * Example:
   * Rs 250 / 100-piece pack
   * = Rs 2.50 per piece
   *
   * Kg:
   * pricePerUnit = price of one kg
   */
  const getDisplayPrice = (product) => {
    const sellingUnit = product.sellingUnit || 'piece';
    const packSize = product.packSize
      ? Number(product.packSize)
      : null;

    const pricePerUnit =
      Number(product.pricePerUnit) || 0;

    if (
      sellingUnit === 'pack' &&
      packSize
    ) {
      return pricePerUnit / packSize;
    }

    return pricePerUnit;
  };

  /*
   * Display unit for the reference price.
   */
  const getDisplayUnit = (product) => {
    const sellingUnit = product.sellingUnit || 'piece';

    if (sellingUnit === 'kg') {
      return 'kg';
    }

    return 'piece';
  };

  /*
   * Minimum-order display.
   *
   * For pack products, MOQ is expressed in pieces
   * when packSize is available.
   *
   * Example:
   * moq: 1
   * packSize: 100
   * → Minimum 100 pieces
   */
  const getMinimumOrderLabel = (product) => {
    const sellingUnit = product.sellingUnit || 'piece';
    const moq = Number(product.moq) || 1;
    const packSize = product.packSize
      ? Number(product.packSize)
      : null;

    if (
      sellingUnit === 'pack' &&
      packSize
    ) {
      const minimumPieces = moq * packSize;

      return `Minimum ${minimumPieces} pieces`;
    }

    if (sellingUnit === 'kg') {
      return `Minimum ${moq} ${
        moq === 1 ? 'kg' : 'kg'
      }`;
    }

    return `Minimum ${moq} ${
      moq === 1 ? 'piece' : 'pieces'
    }`;
  };

  return (
    <div className="category-page">

      {/* CATEGORY HEADER */}
      <div className="category-header">
        <div className="container">
          <div className="category-header-content">
            <span className="category-icon">
              {category.icon}
            </span>

            <h1>{category.name}</h1>

            <p>{category.description}</p>

            <span className="product-count">
              {products.length} product
              {products.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <section className="category-products">
        <div className="container">
          <div className="product-grid">

            {products.length > 0 ? (
              products.map((product) => {
                const displayPrice =
                  getDisplayPrice(product);

                const displayUnit =
                  getDisplayUnit(product);

                const minimumOrder =
                  getMinimumOrderLabel(product);

                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="product-card"
                  >
                    <div className="product-image">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                      />
                    </div>

                    <div className="product-info">

                      <p className="product-category">
                        {category.name}
                      </p>

                      <h3 className="product-name">
                        {product.name}
                      </h3>

                      <p className="product-price">
                        Rs{' '}
                        {displayPrice.toLocaleString(
                          'en-PK',
                          {
                            minimumFractionDigits:
                              displayUnit === 'piece'
                                ? 2
                                : 0,
                            maximumFractionDigits: 2
                          }
                        )}{' '}
                        <span>
                          per {displayUnit}
                        </span>
                      </p>

                      <p className="product-pack">
                        {minimumOrder}
                      </p>

                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="no-products">
                <p>
                  No products found in {category.name}
                </p>
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}

export default CategoryPage;