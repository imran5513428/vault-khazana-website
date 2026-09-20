import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import {
  getProductById,
  getCategoryById,
  getProductsByCategory
} from '../data/products';

function ProductDetailPage() {
  const { id } = useParams();
  const product = getProductById(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [secondarySlide, setSecondarySlide] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

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

  const mainImage = product.images?.[0];
  const displayedImage =
    product.images?.[selectedImage] || mainImage;

  const secondaryImages = product.images?.slice(1, 6) || [];

  // Other products from the same category, excluding the current product
  const relatedProducts = getProductsByCategory(product.categoryId).filter(
    (relatedProduct) => relatedProduct.id !== product.id
  );

  // Gallery order:
  // Secondary 1 → Secondary 2 → Secondary 3 → Secondary 4 → MAIN → Secondary 5
  const galleryImages = [
    secondaryImages[0],
    secondaryImages[1],
    secondaryImages[2],
    secondaryImages[3],
    mainImage,
    secondaryImages[4]
  ].filter(Boolean);

  const handleAddToCart = () => {
    setIsAdding(true);

    setTimeout(() => {
      addToCart(product.id);
      setIsAdding(false);
      setIsAdded(true);

      setTimeout(() => setIsAdded(false), 2000);
    }, 300);
  };

  const handleMainImageSwipe = (direction) => {
    const totalImages = product.images?.length || 0;

    if (totalImages <= 1) return;

    setSelectedImage((current) => {
      if (direction === 'next') {
        return current === totalImages - 1 ? 0 : current + 1;
      }

      return current === 0 ? totalImages - 1 : current - 1;
    });
  };

  const handleGallerySelect = (image) => {
    const originalIndex = product.images.findIndex(
      (productImage) => productImage === image
    );

    const galleryIndex = galleryImages.findIndex(
      (galleryImage) => galleryImage === image
    );

    if (originalIndex >= 0) {
      setSelectedImage(originalIndex);
    }

    if (galleryIndex >= 0) {
      setSecondarySlide(galleryIndex);
    }
  };

  const showPreviousSecondary = () => {
    if (galleryImages.length === 0) return;

    setSecondarySlide((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  };

  const showNextSecondary = () => {
    if (galleryImages.length === 0) return;

    setSecondarySlide((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const distanceX = touchEndX - touchStartX.current;
    const distanceY = touchEndY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(distanceX) < 50) return;
    if (Math.abs(distanceX) <= Math.abs(distanceY)) return;

    if (distanceX < 0) {
      showNextSecondary();
    } else {
      showPreviousSecondary();
    }
  };

  const currentSecondaryImage = galleryImages[secondarySlide];

  return (
    <div className="product-detail-page">

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

      <section className="product-detail-section">
        <div className="container">

          <div className="product-detail-grid">

            {/* ===== PRODUCT GALLERY ===== */}

            <div className="product-gallery">

              {/* MAIN PRODUCT IMAGE */}

              <div
                className="main-image"
                onTouchStart={(event) => {
                  touchStartX.current =
                    event.touches[0].clientX;
                  touchStartY.current =
                    event.touches[0].clientY;
                }}
                onTouchEnd={(event) => {
                  if (
                    touchStartX.current === null ||
                    touchStartY.current === null
                  ) {
                    return;
                  }

                  const touchEndX =
                    event.changedTouches[0].clientX;
                  const touchEndY =
                    event.changedTouches[0].clientY;

                  const distanceX =
                    touchEndX - touchStartX.current;
                  const distanceY =
                    touchEndY - touchStartY.current;

                  touchStartX.current = null;
                  touchStartY.current = null;

                  if (Math.abs(distanceX) < 50) return;
                  if (
                    Math.abs(distanceX) <= Math.abs(distanceY)
                  ) {
                    return;
                  }

                  if (distanceX < 0) {
                    handleMainImageSwipe('next');
                  } else {
                    handleMainImageSwipe('previous');
                  }
                }}
              >
                <img
                  src={displayedImage}
                  alt={product.name}
                />
              </div>

              {/* SIX-IMAGE GALLERY ROW */}

              {galleryImages.length > 1 && (
                <div className="thumbnails">
                  {galleryImages.map((image, index) => {
                    const isMainImage = image === mainImage;

                    return (
                      <button
                        key={`${image}-${index}`}
                        className={`thumbnail ${
                          image === product.images[selectedImage]
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          handleGallerySelect(image)
                        }
                        aria-label={
                          isMainImage
                            ? 'View main product image'
                            : `View product image ${index + 1}`
                        }
                      >
                        <img
                          src={image}
                          alt={
                            isMainImage
                              ? `${product.name} main image`
                              : `${product.name} image ${index + 1}`
                          }
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ===== SECONDARY IMAGE SLIDE ===== */}

              {currentSecondaryImage && (
                <div className="secondary-image-showcase">

                  <button
                    type="button"
                    className="secondary-slide-arrow secondary-slide-prev"
                    onClick={showPreviousSecondary}
                    aria-label="Previous product image"
                  >
                    ‹
                  </button>

                  <div
                    className="secondary-slide-image"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <img
                      src={currentSecondaryImage}
                      alt={`${product.name} gallery image ${
                        secondarySlide + 1
                      }`}
                    />
                  </div>

                  <button
                    type="button"
                    className="secondary-slide-arrow secondary-slide-next"
                    onClick={showNextSecondary}
                    aria-label="Next product image"
                  >
                    ›
                  </button>

                  <div className="secondary-slide-indicator">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        className={
                          secondarySlide === index
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          setSecondarySlide(index)
                        }
                        aria-label={`Show gallery image ${
                          index + 1
                        }`}
                      />
                    ))}
                  </div>

                </div>
              )}

            </div>

            {/* ===== PRODUCT INFORMATION ===== */}

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

              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`star ${
                        i < Math.floor(product.rating)
                          ? 'filled'
                          : ''
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                <span className="review-count">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="product-pricing-section">
                <p className="product-price">
                  Rs {product.price.toLocaleString()}
                </p>

                <p className="product-pack-info">
                  per {product.pack}
                </p>
              </div>

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

              <div className="add-to-cart-section">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                  className={`btn btn-accent btn-lg add-to-cart-btn ${
                    isAdded ? 'added' : ''
                  }`}
                >
                  {isAdding && (
                    <span className="spinner"></span>
                  )}

                  {!isAdding &&
                    !isAdded &&
                    '🛒 Add to Cart'}

                  {isAdded && '✓ Added to Cart!'}
                </button>

                {quantity > 0 && (
                  <p className="cart-qty">
                    {quantity} item
                    {quantity > 1 ? 's' : ''} in cart
                  </p>
                )}
              </div>

              <div className="product-section">
                <h2>About this product</h2>
                <p>{product.overview}</p>
              </div>

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

              <div className="product-section">
                <h2>Suitable for</h2>
                <p>{product.suitableFor}</p>
              </div>

              <div className="product-section">
                <h2>Ideal for</h2>
                <p>{product.idealFor}</p>
              </div>

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

      {/* ===== RELATED PRODUCTS ===== */}

      {relatedProducts.length > 0 && (
        <section className="section related-products-section">
          <div className="container">

            <div className="section-heading">
              <p className="eyebrow">More from {category?.name}</p>
              <h2>You May Also Like</h2>
              <p>
                Explore other products from this category.
              </p>
            </div>

            <div
              className="related-products-track"
              style={{
                display: 'flex',
                gap: '20px',
                overflowX: 'auto',
                overflowY: 'hidden',
                paddingBottom: '12px',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="product-card"
                  style={{
                    flex: '0 0 260px'
                  }}
                >
                  <div className="product-image">
                    <img
                      src={relatedProduct.images?.[0]}
                      alt={relatedProduct.name}
                    />
                  </div>

                  <div className="product-info">
                    <p className="product-category">
                      {category?.name}
                    </p>

                    <h3 className="product-name">
                      {relatedProduct.name}
                    </h3>

                    <p className="product-price">
                      Rs {relatedProduct.price.toLocaleString()}
                    </p>

                    <p className="product-pack">
                      per {relatedProduct.pack}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

    </div>
  );
}

export default ProductDetailPage;