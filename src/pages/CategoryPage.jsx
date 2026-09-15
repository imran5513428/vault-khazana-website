import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug, getProductsByCategory } from '../data/products';

function CategoryPage() {
  const { slug } = useParams();
  const category = getCategoryBySlug(slug);
  const products = category ? getProductsByCategory(category.id) : [];

  if (!category) {
    return (
      <div className="category-page">
        <div className="container">
          <div className="not-found">
            <h1>Category Not Found</h1>
            <p>The category you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      
      {/* CATEGORY HEADER */}
      <div className="category-header">
        <div className="container">
          <div className="category-header-content">
            <span className="category-icon">{category.icon}</span>
            <h1>{category.name}</h1>
            <p>{category.description}</p>
            <span className="product-count">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* PRODUCTS SECTION */}
      <section className="category-products">
        <div className="container">
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
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
              ))
            ) : (
              <div className="no-products">
                <p>No products found in {category.name}</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

export default CategoryPage;
