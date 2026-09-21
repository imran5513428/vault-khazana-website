const getProductImages = (imageSlug, imageCount = 3) => {
  const images = [
    `${import.meta.env.BASE_URL}images/${imageSlug}-main.jpg`,
    `${import.meta.env.BASE_URL}images/${imageSlug}-food.jpg`,
    `${import.meta.env.BASE_URL}images/${imageSlug}-open.jpg`
  ];

  if (imageCount >= 6) {
    images.push(
      `${import.meta.env.BASE_URL}images/${imageSlug}-detail.jpg`,
      `${import.meta.env.BASE_URL}images/${imageSlug}-use.jpg`,
      `${import.meta.env.BASE_URL}images/${imageSlug}-pack.jpg`
    );
  }

  return images;
};

export const CATEGORIES = [
  {
    id: 'food-containers',
    name: 'Food Containers',
    slug: 'food-containers',
    icon: '📦',
    description: 'Premium food storage and takeaway containers'
  },
  {
    id: 'dips-sauce-cups',
    name: 'Dips & Sauce Cups',
    slug: 'dips-sauce-cups',
    icon: '🥣',
    description: 'Convenient cups for sauces, dips and condiments'
  },
  {
    id: 'bakery-packaging',
    name: 'Bakery Packaging',
    slug: 'bakery-packaging',
    icon: '🧁',
    description: 'Packaging for cakes, pastries and bakery products'
  },
  {
    id: 'cups-drinkware',
    name: 'Cups & Drinkware',
    slug: 'cups-drinkware',
    icon: '🥤',
    description: 'Cups and drinkware for hot and cold beverages'
  },
  {
    id: 'bags',
    name: 'Bags',
    slug: 'bags',
    icon: '🛍️',
    description: 'Practical bags for takeaway and food service'
  },
  {
    id: 'foil-wrap',
    name: 'Foil & Wrap',
    slug: 'foil-wrap',
    icon: '🧻',
    description: 'Foil, cling film and wrapping supplies'
  },
  {
    id: 'tissues-kitchen',
    name: 'Tissues & Kitchen',
    slug: 'tissues-kitchen',
    icon: '🧻',
    description: 'Tissues and everyday kitchen essentials'
  },
  {
    id: 'disposable-cutlery',
    name: 'Disposable Cutlery',
    slug: 'disposable-cutlery',
    icon: '🍴',
    description: 'Convenient disposable spoons, forks and knives'
  },
  {
    id: 'takeaway-packaging',
    name: 'Takeaway Packaging',
    slug: 'takeaway-packaging',
    icon: '🥡',
    description: 'Packaging solutions for takeaway food'
  },
  {
    id: 'aluminum-containers',
    name: 'Aluminum Containers',
    slug: 'aluminum-containers',
    icon: '🥡',
    description: 'Food-grade aluminum containers with lids for takeaway, baking and food storage'
  },
  {
    id: 'straws',
    name: 'Straws',
    slug: 'straws',
    icon: '🥤',
    description: 'Straws for beverages and food service'
  }
];

export const PRODUCTS = [
  {
    id: 'h1-6x3-5',
    categoryId: 'food-containers',
    name: 'H1 Box 6×3.5×2in',
    slug: 'h1-6x3-5-clear-food-storage',
    imageSlug: 'h1-plastic-box-folding-lid',
    dimensions: '6 × 3.5 × 2 inches',
    capacity: '350ml',
    price: 700,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent',
    model: 'H1',
    overview: 'Professional-grade clear food storage box perfect for takeaway and food service businesses.',
    description: 'Versatile medium box for various food items.',
    suitableFor: 'Bakery items, pastries, sandwiches, fresh foods, and general food storage.',
    idealFor: 'Restaurants, cafés, bakeries, and food delivery services.',
    recommendation: 'Best seller. Excellent for professional food service.',
    inStock: true,
    stockCount: 1200,
    rating: 4.8,
    reviews: 156
  },

  {
    id: 'h1-6x4',
    categoryId: 'food-containers',
    name: 'H1 Box 6×4×2in',
    slug: 'h1-6x4-clear-food-storage',
    imageSlug: 'h1-plastic-box-folding-lid',
    dimensions: '6 × 4 × 2 inches',
    capacity: '400ml',
    price: 750,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent',
    overview: 'Larger H1 variant for bigger portions and mixed items.',
    description: 'Spacious rectangular box with folding lid.',
    suitableFor: 'Larger portions, combo meals, mixed foods.',
    idealFor: 'Premium food packaging and catering.',
    recommendation: 'Popular for premium packaging.',
    inStock: true,
    stockCount: 900,
    rating: 4.7,
    reviews: 124
  },

  {
    id: 'h3',
    categoryId: 'food-containers',
    name: 'H3 Box 8×5×2.5in',
    slug: 'h3-clear-food-storage',
    imageSlug: 'h3-plastic-box-folding-lid',
    dimensions: '8 × 5 × 2.5 inches',
    capacity: '550ml',
    price: 1000,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent',
    overview: 'Large rectangular food box ideal for complete meal portions.',
    description: 'Perfect for larger meals and bulk food items.',
    suitableFor: 'Full meals, large portions, biryani, rice dishes.',
    idealFor: 'Meal delivery, catering, fine dining packaging.',
    recommendation: 'Premium option for upscale food service.',
    inStock: true,
    stockCount: 750,
    rating: 4.9,
    reviews: 203
  },

  {
    id: 'h6',
    categoryId: 'food-containers',
    name: 'H6 Box 9×6×2.5in',
    slug: 'h6-clear-food-storage',
    imageSlug: 'h6-plastic-box-folding-lid',
    dimensions: '9 × 6 × 2.5 inches',
    capacity: '750ml',
    price: 1300,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent',
    overview: 'Extra-large rectangular box for bulk food items and catering.',
    description: 'Largest rectangular option in the H-series.',
    suitableFor: 'Large platters, bulk orders, catering portions.',
    idealFor: 'Catering companies, event food service.',
    recommendation: 'Essential for catering operations.',
    inStock: true,
    stockCount: 600,
    rating: 4.8,
    reviews: 89
  },

  {
    id: 'h9',
    categoryId: 'food-containers',
    name: 'H9 Clear Food Storage Box — Folding Lid',
    slug: 'h9-clear-food-storage',
    imageSlug: 'h9-plastic-box-folding-lid',
    dimensions: '5 × 4 × 2 inches',
    capacity: '400ml',
    price: 550,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent