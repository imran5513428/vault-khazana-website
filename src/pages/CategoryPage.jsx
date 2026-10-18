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

  const getDisplayUnit = (product) => {
    const sellingUnit = product.sellingUnit || 'piece';
    const packSize = product.packSize
      ? Number(product.packSize)
      : null;

    if (sellingUnit === 'kg' || sellingUnit === 'weight') {
      return 'kg';
    }

    // Custom unit for Everyday Shopping Bags
    if (sellingUnit === '250g') {
      return '250g';
    }

    // Legacy pack products that have packSize → show per piece
    if (sellingUnit === 'pack' && packSize) {
      return 'piece';
    }

    // New pack products without packSize → show per pack
    if (sellingUnit === 'pack') {
      return 'pack';
    }

    if (sellingUnit === 'pair') {
      return 'pair';
    }

    if (sellingUnit === 'set') {
      return 'set';
    }

    return 'piece';
  };

  const getMinimumOrderLabel = (product) => {
    const sellingUnit = product.sellingUnit || 'piece';
    const moq = Number(product.moq) || 1;
    const packSize = product.packSize
      ? Number(product.packSize)
      : null;

    if (sellingUnit === 'pack' && packSize) {
      const minimumPieces = moq * packSize;
      return `Minimum ${minimumPieces} pieces`;
    }

    if (sellingUnit === 'kg' || sellingUnit === 'weight') {
      return `Minimum ${moq} kg`;
    }

    if (sellingUnit === '250g') {
      return `Minimum ${moq} × 250g`;
    }

    if (sellingUnit === 'pack') {
      return `Minimum ${moq} ${moq === 1 ? 'pack' : 'packs'}`;
    }

    if (sellingUnit === 'pair') {
      return `Minimum ${moq} ${moq === 1 ? 'pair' : 'pairs'}`;
    }

    if (sellingUnit === 'set') {
      return `Minimum ${moq} ${moq === 1 ? 'set' : 'sets'}`;
    }

    return `Minimum ${moq} ${moq === 1 ? 'piece' : 'pieces'}`;
  };

  return (
    <div className="category-page">
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

      <section className="category-products">
        <div className="container">
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => {
                const displayPrice = getDisplayPrice(product);
                const displayUnit = getDisplayUnit(product);
                const minimumOrder = getMinimumOrderLabel(product);

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
                              displayUnit === 'piece' ? 2 : 0,
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