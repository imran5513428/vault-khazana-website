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
  const [quantityError, setQuantityError] = useState('');

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const cartQuantity = useCartStore((state) =>
    state.getQuantity(id)
  );

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

  /*
   * PRODUCT SELLING RULES
   *
   * These values come directly from products.js.
   * No category rules are hard-coded here.
   */
  const sellingUnit = product.sellingUnit || 'piece';
  const moq = Number(product.moq) || 1;
  const step = Number(product.step) || 1;
  const packSize = product.packSize
    ? Number(product.packSize)
    : null;
  const pricePerUnit = Number(product.pricePerUnit) || 0;

  /*
   * Start at the product's actual minimum order quantity.
   *
   * Food Containers / Aluminum:
   * 50 → 75 → 100 → 125...
   *
   * Cutlery:
   * 1 → 2 → 3 packs...
   */
  const [selectedQuantity, setSelectedQuantity] = useState(moq);

  const mainImage = product.images?.[0];

  const displayedImage =
    product.images?.[selectedImage] || mainImage;

  /*
   * UNLIMITED PRODUCT IMAGE SYSTEM
   *
   * products.js controls the number of images.
   */
  const galleryImages = product.images || [];

  // Other products from the same category
  const relatedProducts = getProductsByCategory(
    product.categoryId
  ).filter(
    (relatedProduct) => relatedProduct.id !== product.id
  );

  /*
   * Quantity label shown to the customer.
   */
  const getQuantityLabel = (value) => {
    if (sellingUnit === 'kg') {
      return `${value} kg`;
    }

    if (sellingUnit === 'pack') {
      const packLabel = value === 1 ? 'pack' : 'packs';

      if (packSize) {
        const totalPieces = value * packSize;

        return `${value} ${packLabel} (${totalPieces} pieces)`;
      }

      return `${value} ${packLabel}`;
    }

    return `${value} pieces`;
  };

  /*
   * Price/unit label.
   */
  const getUnitLabel = () => {
    if (sellingUnit === 'kg') {
      return 'kg';
    }

    if (sellingUnit === 'pack') {
      return 'pack';
    }

    return 'piece';
  };

  /*
   * Add quantity according to the product's step.
   */
  const increaseQuantity = () => {
    setQuantityError('');
    setSelectedQuantity((current) => current + step);
  };

  /*
   * Reduce quantity according to the product's step.
   *
   * MOQ is the lower limit.
   * The Remove action in the cart is used to delete
   * the product completely.
   */
  const decreaseQuantity = () => {
    setQuantityError('');

    setSelectedQuantity((current) => {
      const next = current - step;

      return next < moq ? moq : next;
    });
  };

  /*
   * Direct quantity entry.
   *
   * Only valid quantities are accepted.
   *
   * Example for MOQ 50 / step 25:
   * 50, 75, 100, 125 = valid
   * 51, 52, 74, 76 = invalid
   */
  const handleQuantityChange = (event) => {
    const value = event.target.value;

    if (value === '') {
      setQuantityError('');
      return;
    }

    const numericValue = Number(value);

    if (!Number.isInteger(numericValue)) {
      setQuantityError('Please enter a whole number.');
      return;
    }

    if (numericValue < moq) {
      setQuantityError(
        `Minimum order is ${moq} ${
          sellingUnit === 'kg'
            ? 'kg'
            : sellingUnit === 'pack'
            ? 'pack'
            : 'pieces'
        }.`
      );
      return;
    }

    if ((numericValue - moq) % step !== 0) {
      setQuantityError(
        step > 1
          ? `Please use quantities of ${moq}, ${moq + step}, ${
              moq + step * 2
            }, and so on.`
          : 'Please enter a valid quantity.'
      );
      return;
    }

    setQuantityError('');
    setSelectedQuantity(numericValue);
  };

  const handleAddToCart = () => {
    setQuantityError('');
    setIsAdding(true);

    setTimeout(() => {
      const result = addToCart(
        product.id,
        selectedQuantity
      );

      setIsAdding(false);

      if (!result?.success) {
        setQuantityError(
          result?.error ||
            'Unable to add this product to the cart.'
        );
        return;
      }

      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 300);
  };

  const handleMainImageSwipe = (direction) => {
    const totalImages = product.images?.length || 0;

    if (totalImages <= 1) return;

    setSelectedImage((current) => {
      if (direction === 'next') {
        return current === totalImages - 1
          ? 0
          : current + 1;
      }

      return current === 0
        ? totalImages - 1
        : current - 1;
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
      current === 0
        ? galleryImages.length - 1
        : current - 1
    );

    setSelectedImage((current) =>
      current === 0
        ? galleryImages.length - 1
        : current - 1
    );
  };

  const showNextSecondary = () => {
    if (galleryImages.length === 0) return;

    setSecondarySlide((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
    );

    setSelectedImage((current) =>
      current === galleryImages.length - 1
        ? 0
        : current + 1
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

    const distanceX =
      touchEndX - touchStartX.current;
    const distanceY =
      touchEndY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(distanceX) < 50) return;

    if (Math.abs(distanceX) <= Math.abs(distanceY)) {
      return;
    }

    if (distanceX < 0) {
      showNextSecondary();
    } else {
      showPreviousSecondary();
    }
  };

  const currentSecondaryImage =
    galleryImages[secondarySlide];

  /*
   * DISPLAY PRICE
   *
   * For fixed-size packs such as paper cups:
   *
   * pricePerUnit = full pack price
   * packSize = number of pieces in the pack
   *
   * Example:
   * Rs 450 / 100 pieces
   * = Rs 4.50 per piece
   *
   * The cart still uses the full pack price.
   */
  const displayUnitPrice =
    sellingUnit === 'pack' && packSize
      ? pricePerUnit / packSize
      : pricePerUnit;

  const packPrice = pricePerUnit;

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

                  if (Math.abs(distanceX) < 50) {
                    return;
                  }

                  if (
                    Math.abs(distanceX) <=
                    Math.abs(distanceY)
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

              {/* UNLIMITED IMAGE GALLERY */}

              {galleryImages.length > 1 && (
                <div className="thumbnails">
                  {galleryImages.map((image, index) => {
                    const isMainImage =
                      image === mainImage;

                    return (
                      <button
                        key={`${image}-${index}`}
                        className={`thumbnail ${
                          image ===
                          product.images[selectedImage]
                            ? 'active'
                            : ''
                        }`}
                        onClick={() =>
                          handleGallerySelect(image)
                        }
                        aria-label={
                          isMainImage
                            ? 'View main product image'
                            : `View product image ${
                                index + 1
                              }`
                        }
                      >
                        <img
                          src={image}
                          alt={
                            isMainImage
                              ? `${product.name} main image`
                              : `${product.name} image ${
                                  index + 1
                                }`
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
                        onClick={() => {
                          setSecondarySlide(index);
                          setSelectedImage(index);
                        }}
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

              {product.dimensions && (
                <p className="product-dimensions">
                  {product.dimensions}
                </p>
              )}

              {product.rating && product.reviews && (
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
              )}

              <div className="product-pricing-section">

                <p className="product-price">
                  Rs{' '}
                  {displayUnitPrice.toLocaleString(
                    'en-PK',
                    {
                      minimumFractionDigits:
                        sellingUnit === 'pack' &&
                        packSize
                          ? 2
                          : 0,
                      maximumFractionDigits: 2
                    }
                  )}
                </p>

                <p className="product-pack-info">
                  per{' '}
                  {sellingUnit === 'pack' && packSize
                    ? 'piece'
                    : getUnitLabel()}
                </p>

                {sellingUnit === 'pack' &&
                  packSize && (
                    <p className="product-unit-price">
                      {packSize} pieces = Rs{' '}
                      {packPrice.toLocaleString(
                        'en-PK',
                        {
                          maximumFractionDigits: 2
                        }
                      )}
                    </p>
                  )}

              </div>

              {/* ===== STOCK STATUS ===== */}

              <div className="stock-status">
                {product.inStock ? (
                  <span className="in-stock">
                    ✓ In Stock
                  </span>
                ) : (
                  <span className="out-of-stock">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* ===== QUANTITY + ADD TO CART ===== */}

              <div className="add-to-cart-section">

                <div className="product-quantity-section">

                  <label
                    htmlFor="product-quantity"
                    className="quantity-label"
                  >
                    Quantity
                  </label>

                  <div className="quantity-controls">

                    <button
                      type="button"
                      className="qty-btn"
                      onClick={decreaseQuantity}
                      disabled={
                        selectedQuantity <= moq ||
                        isAdding ||
                        !product.inStock
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <input
                      id="product-quantity"
                      type="number"
                      value={selectedQuantity}
                      onChange={handleQuantityChange}
                      min={moq}
                      step={step}
                      inputMode="numeric"
                      className="qty-input"
                      disabled={
                        isAdding || !product.inStock
                      }
                      aria-describedby={
                        quantityError
                          ? 'quantity-error'
                          : undefined
                      }
                    />

                    <button
                      type="button"
                      className="qty-btn"
                      onClick={increaseQuantity}
                      disabled={
                        isAdding || !product.inStock
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                  </div>

                  <p className="quantity-help">
                    Minimum: {getQuantityLabel(moq)}
                    {step > 1 &&
                      ` • Add in steps of ${step}`}
                  </p>

                  {quantityError && (
                    <p
                      id="quantity-error"
                      className="quantity-error"
                      role="alert"
                    >
                      {quantityError}
                    </p>
                  )}

                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={
                    !product.inStock ||
                    isAdding ||
                    Boolean(quantityError)
                  }
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

                  {isAdded &&
                    '✓ Added to Cart!'}
                </button>

                {cartQuantity > 0 && (
                  <p className="cart-qty">
                    {getQuantityLabel(cartQuantity)} in cart
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

                  {product.dimensions && (
                    <>
                      <dt>Dimensions</dt>
                      <dd>{product.dimensions}</dd>
                    </>
                  )}

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
                  <strong>
                    💡 Our Recommendation
                  </strong>
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
              <p className="eyebrow">
                More from {category?.name}
              </p>

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
              {relatedProducts.map(
                (relatedProduct) => (
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
                        src={
                          relatedProduct.images?.[0]
                        }
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
                        Rs{' '}
                        {Number(
                          relatedProduct.pricePerUnit ??
                            relatedProduct.price ??
                            0
                        ).toLocaleString('en-PK', {
                          maximumFractionDigits: 2
                        })}
                      </p>

                      <p className="product-pack">
                        per{' '}
                        {relatedProduct.sellingUnit ===
                        'kg'
                          ? 'kg'
                          : relatedProduct.sellingUnit ===
                            'pack'
                          ? 'pack'
                          : 'piece'}
                      </p>
                    </div>
                  </Link>
                )
              )}

            </div>

          </div>
        </section>
      )}

    </div>
  );
}

export default ProductDetailPage;