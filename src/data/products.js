
import {
  CATEGORIES as ORIGINAL_CATEGORIES,
  PRODUCTS as ORIGINAL_PRODUCTS
} from './products-original';

const foodServiceImage =
  `${import.meta.env.BASE_URL}images/category-food-service-essentials.jpg`;

const foodServiceProducts = [
  {
    id: 'green-disposable-hair-caps',
    categoryId: 'food-service-essentials',
    name: 'Green Disposable Hair Caps — Pack of 100',
    slug: 'green-disposable-hair-caps-pack-100',
    imageSlug: 'category-food-service-essentials',
    price: 250,
    pack: 'Pack of 100 caps',
    sellingUnit: 'pack',
    moq: 1,
    step: 1,
    packSize: 100,
    pricePerUnit: 250,
    material: 'Lightweight disposable material',
    colour: 'Green',
    overview:
      'Lightweight green disposable hair caps with an elasticated edge for convenient hair coverage.',
    description:
      'A practical choice for food preparation, catering and other settings where hair coverage is required.',
    suitableFor: 'Food preparation, catering and general hygiene routines.',
    idealFor: 'Restaurants, food businesses, catering teams and home kitchens.',
    inStock: true,
    images: [foodServiceImage]
  },
  {
    id: 'wooden-bbq-shashlik-skewers',
    categoryId: 'food-service-essentials',
    name: 'Wooden BBQ & Shashlik Skewers — Pack of 30',
    slug: 'wooden-bbq-shashlik-skewers-pack-30',
    imageSlug: 'category-food-service-essentials',
    price: 90,
    pack: 'Pack of 30 skewers',
    sellingUnit: 'pack',
    moq: 1,
    step: 1,
    packSize: 30,
    pricePerUnit: 90,
    material: 'Wood',
    variants: [
      {
        id: '6-inch',
        label: '6 inches',
        dimensions: '6 inches',
        price: 90,
        pricePerUnit: 3
      },
      {
        id: '8-inch',
        label: '8 inches',
        dimensions: '8 inches',
        price: 110,
        pricePerUnit: 110 / 30
      },
      {
        id: '10-inch',
        label: '10 inches',
        dimensions: '10 inches',
        price: 130,
        pricePerUnit: 130 / 30
      },
      {
        id: '12-inch',
        label: '12 inches',
        dimensions: '12 inches',
        price: 170,
        pricePerUnit: 170 / 30
      }
    ],
    overview:
      'Wooden skewers for BBQ, shashlik, kebabs and food presentation.',
    description:
      'A convenient pack of 30 wooden skewers, available in 6, 8, 10 and 12-inch sizes.',
    suitableFor: 'BBQ, shashlik, kebabs, grilling and food presentation.',
    idealFor: 'Restaurants, caterers, BBQ stalls and home cooking.',
    inStock: true,
    images: [foodServiceImage]
  },
  {
    id: 'silicone-cleaning-gloves',
    categoryId: 'food-service-essentials',
    name: 'Reusable Silicone Cleaning Gloves with Scrubber',
    slug: 'reusable-silicone-cleaning-gloves-scrubber',
    imageSlug: 'category-food-service-essentials',
    price: 230,
    pack: '1 pair',
    sellingUnit: 'piece',
    moq: 1,
    step: 1,
    packSize: null,
    pricePerUnit: 230,
    material: 'Silicone',
    overview:
      'Reusable cleaning gloves with built-in scrubber surfaces for everyday cleaning tasks.',
    description:
      'Suitable for dishwashing, kitchen cleaning and a variety of household cleaning tasks. Follow the manufacturer’s care and temperature instructions.',
    suitableFor:
      'Dishwashing, kitchen surfaces, bathroom cleaning, washing produce and general household cleaning.',
    idealFor: 'Homes, kitchens and cleaning routines.',
    inStock: true,
    images: [foodServiceImage]
  },
  {
    id: 'mini-sauce-condiment-bottles',
    categoryId: 'food-service-essentials',
    name: 'Mini Sauce & Condiment Bottles — Pack of 2',
    slug: 'mini-sauce-condiment-bottles-pack-2',
    imageSlug: 'category-food-service-essentials',
    price: 120,
    pack: 'Pack of 2 bottles — 100ml each',
    sellingUnit: 'pack',
    moq: 1,
    step: 1,
    packSize: 2,
    pricePerUnit: 120,
    capacity: '100ml per bottle',
    material: 'Clear refillable bottle',
    overview:
      'Compact refillable bottles for storing and serving sauces and condiments.',
    description:
      'A pack of two 100ml bottles with caps for sauces, dressings, oil, vinegar and other suitable condiments.',
    suitableFor: 'Sauces, dressings, oil, vinegar and condiments.',
    idealFor: 'Lunchboxes, picnics, travel, cafés and food service.',
    inStock: true,
    images: [foodServiceImage]
  },
  {
    id: 'elastic-food-storage-covers',
    categoryId: 'food-service-essentials',
    name: 'Elastic Food Storage Covers — Pack of 100',
    slug: 'elastic-food-storage-covers-pack-100',
    imageSlug: 'category-food-service-essentials',
    price: 220,
    pack: 'Pack of 100 covers',
    sellingUnit: 'pack',
    moq: 1,
    step: 1,
    packSize: 100,
    pricePerUnit: 220,
    material: 'Transparent flexible covering with elastic edge',
    overview:
      'Flexible covers with elastic edges to help cover bowls, dishes and containers.',
    description:
      'Useful for covering prepared food and leftovers. Confirm the manufacturer's instructions before using with heat or in a microwave.',
    suitableFor: 'Bowls, dishes, containers and food storage.',
    idealFor: 'Home kitchens, catering and food preparation.',
    inStock: true,
    images: [foodServiceImage]
  },
  {
    id: 'small-hand-face-towels',
    categoryId: 'food-service-essentials',
    name: 'Small Hand & Face Towels — Set of 6',
    slug: 'small-hand-face-towels-set-6',
    imageSlug: 'category-food-service-essentials',
    price: 220,
    pack: 'Set of 6 towels',
    sellingUnit: 'pack',
    moq: 1,
    step: 1,
    packSize: 6,
    pricePerUnit: 220,
    dimensions: 'Approximately 15 × 12 inches each',
    overview:
      'A practical set of six small towels for everyday hand and face care.',
    description:
      'Compact towels suitable for everyday personal use and convenient placement in bathrooms or kitchens.',
    suitableFor: 'Hand drying, face care and everyday household use.',
    idealFor: 'Homes, guest bathrooms and everyday personal care.',
    inStock: true,
    images: [foodServiceImage]
  }
];

export const CATEGORIES = ORIGINAL_CATEGORIES;

export const PRODUCTS = [
  ...ORIGINAL_PRODUCTS,
  ...foodServiceProducts
];

export const getProductById = (productId) =>
  PRODUCTS.find((product) => product.id === productId);

export const getProductsByCategory = (categoryId) =>
  PRODUCTS.filter((product) => product.categoryId === categoryId);

export const getCategoryById = (categoryId) =>
  CATEGORIES.find((category) => category.id === categoryId);

export const getCategoryBySlug = (slug) =>
  CATEGORIES.find((category) => category.slug === slug);

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(price));

export const searchProducts = (query) => {
  const lowerQuery = String(query || '').toLowerCase();

  return PRODUCTS.filter(
    (product) =>
      (product.name || '').toLowerCase().includes(lowerQuery) ||
      (product.description || '').toLowerCase().includes(lowerQuery) ||
      (product.overview || '').toLowerCase().includes(lowerQuery)
  );
};
