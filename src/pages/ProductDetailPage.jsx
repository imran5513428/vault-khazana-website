import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { getProductById, getCategoryById } from '../data/products';

function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const quantity = useCartStore((state) => state.getQuantity(id));

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-not-found">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const category = getCategoryById(product.categoryId);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product.id);
      setIsAdding(false);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }, 300);
  };

  return (
    <div className="product-detail-page">
      
      {/* BREADCRUMB */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to={`/category/${category?.slug}`}>
              {category?.name || 'Products'}
            </Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* PRODUCT DETAIL */}
      <section className="product-detail-section">
        <div className="container">
          <div className="product-detail-grid">
            
            {/* IMAGE GALLERY */}
            <div className="product-gallery">
              <div className="main-image">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                />
              </div>
              <div className="thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT INFO */}
            <div className="product-info">
              
              <p className="product-category">
                {category?.name || 'Product'}
              </p>

              <h1 className="product-title">
                {product.name}
              </h1>

              <p className="product-dimensions">
                {product.dimensions}
              </p>

              {/* RATING */}
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="review-count">({product.reviews} reviews)</span>
              </div>

              {/* PRICING */}
              <div className="product-pricing-section">
                <p className="product-price">
                  Rs {product.price.toLocaleString()}
                </p>
                <p className="product-pack-info">
                  per {product.pack}
                </p>
              </div>

              {/* STOCK STATUS */}
              <div className="stock-status">
                {product.inStock ? (
                  <span className="in-stock">
                    ✓ In Stock ({product.stockCount} available)
                  </span>
                ) : (
                  <span className="out-of-stock">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* ADD TO CART */}
              <div className="add-to-cart-section">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={`btn btn-accent btn-lg add-to-cart-btn ${isAdded ? 'added' : ''}`}
                >
                  {isAdding && <span className="spinner"></span>}
                  {!isAdding && !isAdded && `🛒 Add to Cart`}
                  {isAdded && `✓ Added to Cart!`}
                </button>
                {quantity > 0 && (
                  <p className="cart-qty">
                    {quantity} item{quantity > 1 ? 's' : ''} in cart
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="product-section">
                <h2>About this product</h2>
                <p>{product.overview}</p>
              </div>

              {/* DETAILS */}
              <div className="product-section">
                <h2>Product Details</h2>
                <dl className="details-list">
                  <dt>Dimensions</dt>
                  <dd>{product.dimensions}</dd>
                  
                  {product.capacity && (
                    <>
                      <dt>Capacity</dt>
                      <dd>{product.capacity}</dd>
                    </>
                  )}
                  
                  {product.material && (
                    <>
                      <dt>Material</dt>
                      <dd>{product.material}</dd>
                    </>
                  )}
                  
                  {product.shape && (
                    <>
                      <dt>Shape</dt>
                      <dd>{product.shape}</dd>
                    </>
                  )}
                  
                  {product.colour && (
                    <>
                      <dt>Colour</dt>
                      <dd>{product.colour}</dd>
                    </>
                  )}
                  
                  {product.lid && (
                    <>
                      <dt>Lid</dt>
                      <dd>{product.lid}</dd>
                    </>
                  )}
                  
                  <dt>Pack Size</dt>
                  <dd>{product.pack}</dd>
                </dl>
              </div>

              {/* SUITABLE FOR */}
              <div className="product-section">
                <h2>Suitable for</h2>
                <p>{product.suitableFor}</p>
              </div>

              {/* IDEAL FOR */}
              <div className="product-section">
                <h2>Ideal for</h2>
                <p>{product.idealFor}</p>
              </div>

              {/* RECOMMENDATION */}
              {product.recommendation && (
                <div className="product-section recommendation">
                  <strong>💡 Our Recommendation</strong>
                  <p>{product.recommendation}</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default ProductDetailPage;
