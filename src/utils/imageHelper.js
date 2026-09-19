/**
 * Image Helper - Centralized image path management
 * Scalable for all product categories
 * Works with GitHub Pages deployment
 */

export const getImagePath = (imageSlug) => {
  return `${import.meta.env.BASE_URL}images/${imageSlug}.jpg`;
};

export const getProductImages = (imageSlug) => {
  return {
    hero: getImagePath(`${imageSlug}-main`),
    product: getImagePath(`${imageSlug}-food`),
    detail: getImagePath(`${imageSlug}-open`)
  };
};

/**
 * Background color for all product images
 * Change this ONE place to update all product cards site-wide
 */
export const PRODUCT_IMAGE_STYLES = {
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '300px',
  overflow: 'hidden'
};
