/* ============================================
   VAULT KHAZANA - AUTOMATIC PRODUCT IMAGES
   ============================================ */

/*
  PRODUCT IMAGE SYSTEM

  Each product has its own folder:

  src/assets/products/<product-folder>/

  Example:

  src/assets/products/750ml-rectangular/
    01.jpg
    side-view.jpg
    with-lid.jpg
    food-example.jpg
    pack.jpg

  RULES:

  01.jpg
    = Main product image

  Every other .jpg / .jpeg / .png / .webp file
    = Secondary product/gallery image

  Secondary images do NOT need numbered filenames.

  You can add or remove gallery images without
  changing products.js or ProductDetailPage.jsx.
*/


/* ============================================
   AUTOMATIC IMAGE DISCOVERY
   ============================================ */

const productImageFiles = import.meta.glob(
  '../assets/products/**/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);


/* ============================================
   GET ALL IMAGES FOR ONE PRODUCT
   ============================================ */

export const getProductImages = (
  productId,
  fallbackImages = []
) => {
  const folderPath = `../assets/products/${productId}/`;

  const productImages = Object.entries(productImageFiles)
    .filter(([path]) => path.startsWith(folderPath))
    .map(([path, imageUrl]) => ({
      path,
      imageUrl,
      filename: path.split('/').pop().toLowerCase(),
    }));


  /*
    MAIN IMAGE

    01.jpg is always treated as the main image.
  */

  const mainImage = productImages.find(
    ({ filename }) => filename === '01.jpg'
  );


  /*
    SECONDARY IMAGES

    Every other image is accepted automatically.

    Their filenames do NOT matter.
  */

  const secondaryImages = productImages
    .filter(
      ({ filename }) => filename !== '01.jpg'
    )
    .sort((a, b) =>
      a.filename.localeCompare(
        b.filename,
        undefined,
        {
          numeric: true,
          sensitivity: 'base',
        }
      )
    );


  /*
    FINAL ORDER

    01.jpg first
    ↓
    every other discovered image
  */

  if (mainImage) {
    return [
      mainImage.imageUrl,
      ...secondaryImages.map(
        ({ imageUrl }) => imageUrl
      ),
    ];
  }


  /*
    SAFETY FALLBACK
  */

  return fallbackImages;
};