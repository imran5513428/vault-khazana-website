
/* ============================================
   VAULT KHAZANA - AUTOMATIC PRODUCT IMAGES
   ============================================ */

/*
  Automatically finds all images inside:

  src/assets/products/<product-id>/

  Example:
  src/assets/products/h9/
    01.jpg
    02.jpg
    03.jpg
    04.jpg
    05.jpg

  01.jpg = main image
  Remaining images = product gallery

  Adding more numbered images requires NO code changes.
*/

const productImageFiles = import.meta.glob(
  '../assets/products/**/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

export const getProductImages = (productId, fallbackImages = []) => {
  const folderPath = `../assets/products/${productId}/`;

  const images = Object.entries(productImageFiles)
    .filter(([path]) => path.startsWith(folderPath))
    .sort(([pathA], [pathB]) => {
      const getNumber = (path) => {
        const filename = path.split('/').pop();
        const match = filename.match(/^(\d+)/);
        return match ? Number(match[1]) : Infinity;
      };

      return getNumber(pathA) - getNumber(pathB);
    })
    .map(([, imageUrl]) => imageUrl);

  /*
    If this product does not yet have a new image folder,
    continue using its existing image system.
  */
  return images.length > 0 ? images : fallbackImages;
};