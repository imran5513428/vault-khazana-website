const getProductImages = (imageSlug) => [
  `${import.meta.env.BASE_URL}images/${imageSlug}.jpg`
];

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
    id: 'thermopore',
    name: 'Thermopore',
    slug: 'thermopore',
    icon: '📦',
    description: 'Insulated thermopore packaging solutions'
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
    colour: 'Transparent',
    overview: 'Compact clear food box with folding lid, ideal for small portions and condiments.',
    description: 'Smallest option, perfect for small portions and condiments.',
    suitableFor: 'Condiments, biscuits, cakes, frozen food, and much more.',
    idealFor: 'Takeaway and delivery of savoury and sweet foods, portioning meals.',
    recommendation: 'Budget-friendly option. Popular for small businesses and home use.',
    inStock: true,
    stockCount: 600,
    rating: 4.4,
    reviews: 38
  },

  {
    id: '200ml-disposable',
    categoryId: 'food-containers',
    name: '200ml Clear Round Disposable Food Container',
    slug: '200ml-round-container',
    imageSlug: '200ml-disposable-round-container',
    dimensions: '200ml capacity',
    capacity: '200ml',
    price: 900,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — disposable soft plastic',
    shape: 'Round',
    lid: 'Included',
    colour: 'Transparent',
    overview: 'Lightweight clear round food container made from disposable PP, supplied with lid.',
    description: 'Perfect for small portions and condiments in round containers.',
    suitableFor: 'Chaat, sauces, fresh salad, condiments, kheer, and more.',
    idealFor: 'Takeaway, delivery, food packing, and convenient portioning.',
    recommendation: 'Great for desserts and small portions. Very affordable wholesale rates.',
    inStock: true,
    stockCount: 800,
    rating: 4.5,
    reviews: 92
  },

  {
    id: '300ml-round',
    categoryId: 'food-containers',
    name: '300ml Clear Round Food Container',
    slug: '300ml-round-container',
    imageSlug: '300ml-clear-round-container',
    dimensions: '300ml capacity',
    capacity: '300ml',
    price: 1000,
    pack: '50 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Round',
    lid: 'Included',
    colour: 'Transparent',
    overview: 'Medium round container perfect for sauces, dips, and small meals.',
    description: 'Versatile round container for multiple uses.',
    suitableFor: 'Curries, gravies, desserts, fresh fruits.',
    idealFor: 'Food delivery and restaurant packaging.',
    recommendation: 'Excellent value for medium portions.',
    inStock: true,
    stockCount: 700,
    rating: 4.6,
    reviews: 78
  },

  {
    id: '450ml-r16',
    categoryId: 'food-containers',
    name: '450ml R16 Clear Round Food Container',
    slug: '450ml-r16-round-container',
    imageSlug: '450ml-r16-clear-round-container',
    dimensions: '450ml capacity',
    capacity: '450ml',
    price: 2200,
    pack: '1000 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Round',
    lid: 'Included',
    colour: 'Transparent',
    overview: 'Popular R16 round container for bulk food service operations.',
    description: 'Professional round container, bulk pricing available.',
    suitableFor: 'Noodles, rice, curries, assembled meals.',
    idealFor: 'High-volume food service and delivery.',
    recommendation: 'Best value for bulk orders.',
    inStock: true,
    stockCount: 1000,
    rating: 4.7,
    reviews: 145
  },

  {
    id: '500ml-rectangular',
    categoryId: 'food-containers',
    name: '500ml Clear Rectangular Food Container',
    slug: '500ml-rectangular-container',
    imageSlug: '500ml-clear-rectangular-container',
    dimensions: '500ml capacity',
    capacity: '500ml',
    price: 1350,
    pack: '50 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Rectangular',
    lid: 'Included',
    colour: 'Transparent',
    overview: 'Medium rectangular container perfect for mixed food items and complete meals.',
    description: 'Rectangular option for organized food packaging.',
    suitableFor: 'Mixed meals, sandwich boxes, salads.',
    idealFor: 'Meal prep, catering, food delivery.',
    recommendation: 'Professional appearance, great for premium packaging.',
    inStock: true,
    stockCount: 550,
    rating: 4.8,
    reviews: 103
  },

  {
    id: '750ml-rectangular',
    categoryId: 'food-containers',
    name: '750ml Clear Rectangular Food Container',
    slug: '750ml-rectangular-container',
    imageSlug: '750ml-clear-rectangular-container',
    dimensions: '750ml capacity',
    capacity: '750ml',
    price: 825,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Rectangular',
    lid: 'Included',
    colour: 'Transparent',
    overview: 'Large rectangular container for generous portions and complete meals.',
    description: 'Premium rectangular option for larger portions.',
    suitableFor: 'Large portions, multi-item meals, family servings.',
    idealFor: 'Premium meal delivery, special occasions.',
    recommendation: 'Premium packaging for upscale food service.',
    inStock: true,
    stockCount: 400,
    rating: 4.9,
    reviews: 67
  },

  {
    id: '1000ml-rectangular',
    categoryId: 'food-containers',
    name: '1000ml Clear Rectangular Food Container',
    slug: '1000ml-rectangular-container',
    imageSlug: '1000ml-clear-rectangular-container',
    dimensions: '1000ml capacity',
    capacity: '1000ml',
    price: 875,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Rectangular',
    lid: 'Included',
    colour: 'Transparent',
    overview: 'Extra-large rectangular container for bulk and family-size portions.',
    description: 'Large rectangular for substantial meals.',
    suitableFor: 'Family meals, bulk orders, catering portions.',
    idealFor: 'Family food delivery, catering.',
    recommendation: 'Best for family-size orders.',
    inStock: true,
    stockCount: 350,
    rating: 4.7,
    reviews: 54
  },

  {
    id: '1500ml-square',
    categoryId: 'food-containers',
    name: '1500ml Clear Square Food Container',
    slug: '1500ml-square-container',
    imageSlug: '1500ml-clear-square-container',
    dimensions: '1500ml capacity',
    capacity: '1500ml',
    price: 1125,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Square',
    lid: 'Included',
    colour: 'Transparent',
    overview: 'Large square container with efficient space utilization for catering.',
    description: 'Square design for optimized packing and storage.',
    suitableFor: 'Large portions, catering, bulk food service.',
    idealFor: 'Catering companies, event food service.',
    recommendation: 'Efficient for large-scale food service.',
    inStock: true,
    stockCount: 300,
    rating: 4.8,
    reviews: 41
  },

  {
    id: '2000ml-square',
    categoryId: 'food-containers',
    name: '2000ml Clear Square Food Container',
    slug: '2000ml-square-container',
    imageSlug: '2000ml-clear-square-container',
    dimensions: '2000ml capacity',
    capacity: '2000ml',
    price: 660,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Square',
    lid: 'Included',
    colour: 'Transparent',
    overview: 'Extra-large square container for maximum capacity and bulk operations.',
    description: 'Largest square container for substantial volumes.',
    suitableFor: 'Bulk food items, large catering portions.',
    idealFor: 'Large-scale catering, institutional food service.',
    recommendation: 'Essential for high-volume operations.',
    inStock: true,
    stockCount: 250,
    rating: 4.6,
    reviews: 28
  },

  {
    id: '3000ml-square',
    categoryId: 'food-containers',
    name: '3000ml Clear Square Food Container',
    slug: '3000ml-square-container',
    imageSlug: '3000ml-clear-square-container',
    dimensions: '3000ml capacity',
    capacity: '3000ml',
    price: 1875,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Square',
    lid: 'Included',
    colour: 'Transparent',
    overview: 'Massive square container for institutional and industrial food storage.',
    description: 'Industrial-size container for bulk operations.',
    suitableFor: 'Industrial food service, bulk storage, catering.',
    idealFor: 'Large institutions, industrial food service.',
    recommendation: 'For large-scale operations only.',
    inStock: true,
    stockCount: 200,
    rating: 4.5,
    reviews: 15
  }
];
PRODUCTS.forEach((product) => {
  product.images = getProductImages(product.imageSlug);
});
/* ===== UTILITY FUNCTIONS ===== */

export const getProductById = (productId) => {
  return PRODUCTS.find((product) => product.id === productId);
};

export const getProductsByCategory = (categoryId) => {
  return PRODUCTS.filter((product) => product.categoryId === categoryId);
};

export const getCategoryById = (categoryId) => {
  return CATEGORIES.find((category) => category.id === categoryId);
};

export const getCategoryBySlug = (slug) => {
  return CATEGORIES.find((category) => category.slug === slug);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.overview.toLowerCase().includes(lowerQuery)
  );
};