
/* ============================================
   VAULT KHAZANA - PRODUCT DATABASE
   All Products, Categories, Pricing
   ============================================ */

export const CATEGORIES = [
  {
    id: 'food-containers',
    name: 'Food Containers',
    slug: 'food-containers',
    description: 'Containers for meals, storage and takeaway.',
    icon: '📦',
    color: '#E67E22'
  },
  {
    id: 'cups-drinkware',
    name: 'Cups & Drinkware',
    slug: 'cups-drinkware',
    description: 'Everyday cups, glasses and drink packaging.',
    icon: '🥤',
    color: '#17A697'
  },
  {
    id: 'bags',
    name: 'Bags',
    slug: 'bags',
    description: 'Shopping and packaging bags in useful sizes.',
    icon: '🛍️',
    color: '#F39C12'
  },
  {
    id: 'foil-wrap',
    name: 'Foil & Wrap',
    slug: 'foil-wrap',
    description: 'Cling film, aluminium foil and food wrapping.',
    icon: '🌀',
    color: '#95A5A6'
  },
  {
    id: 'bakery-packaging',
    name: 'Bakery Packaging',
    slug: 'bakery-packaging',
    description: 'Packaging for cakes, desserts and bakery items.',
    icon: '🎂',
    color: '#E74C3C'
  },
  {
    id: 'disposable-cutlery',
    name: 'Disposable Cutlery',
    slug: 'disposable-cutlery',
    description: 'Practical disposables for serving and takeaway.',
    icon: '🍴',
    color: '#34495E'
  },
  {
    id: 'dips-sauce-cups',
    name: 'Dips & Sauce Cups',
    slug: 'dips-sauce-cups',
    description: 'Small cups for sauces, dips and condiments.',
    icon: '🥘',
    color: '#C0392B'
  },
  {
    id: 'tissues-kitchen',
    name: 'Tissues & Kitchen',
    slug: 'tissues-kitchen',
    description: 'Tissues, kitchen rolls and everyday supplies.',
    icon: '📄',
    color: '#27AE60'
  },
  {
    id: 'straws',
    name: 'Straws',
    slug: 'straws',
    description: 'Straws for drinks, cafés and takeaway.',
    icon: '🥤',
    color: '#2980B9'
  },
  {
    id: 'takeaway-packaging',
    name: 'Takeaway Packaging',
    slug: 'takeaway-packaging',
    description: 'Practical packaging for restaurants and delivery.',
    icon: '📦',
    color: '#D35400'
  }
];


export const PRODUCTS = [
  
  /* ===== FOOD CONTAINERS ===== */
  
  {
    id: 'h1-6x3-5',
    categoryId: 'food-containers',
    name: 'H1 Plastic Box with Folding Lid',
    slug: 'h1-plastic-box-6x3-5',
    dimensions: '6 × 3.5 × 2 inches',
    capacity: '500ml',
    price: 700,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent',
    model: 'H1',
    images: [
      'https://via.placeholder.com/400x400?text=H1+Container+1',
      'https://via.placeholder.com/400x400?text=H1+Container+2'
    ],
    overview: 'A practical clear plastic box designed for takeaway, delivery, and everyday food storage. The folding lid keeps the contents covered while making the box convenient to handle and use.',
    description: 'Perfect for small portions, condiments, biscuits, cakes, and frozen food items.',
    suitableFor: 'Condiments, biscuits, cakes, frozen food, and a wide range of other food items.',
    idealFor: 'Serving and delivering both savoury and sweet foods, while also being useful at home for storing individual portions and leftover food in the refrigerator.',
    recommendation: 'Best for small portions and single servings. Order in bulk (500+ pieces) for better wholesale rates.',
    inStock: true,
    stockCount: 500,
    rating: 4.5,
    reviews: 45
  },
  
  {
    id: 'h1-6x4',
    categoryId: 'food-containers',
    name: 'H1 Plastic Box with Folding Lid',
    slug: 'h1-plastic-box-6x4',
    dimensions: '6 × 4 × 2 inches',
    capacity: '650ml',
    price: 750,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent',
    model: 'H1',
    images: [
      'https://via.placeholder.com/400x400?text=H1+Container+3',
      'https://via.placeholder.com/400x400?text=H1+Container+4'
    ],
    overview: 'A practical clear plastic box designed for takeaway, delivery, and everyday food storage. The folding lid keeps the contents covered while making the box convenient to handle and use.',
    description: 'Ideal for medium portions of takeaway and delivery.',
    suitableFor: 'Condiments, biscuits, cakes, frozen food, and a wide range of other food items.',
    idealFor: 'Serving and delivering both savoury and sweet foods, while also being useful at home for storing individual portions and leftover food in the refrigerator.',
    recommendation: 'Great for restaurants and catering. Bulk ordering recommended.',
    inStock: true,
    stockCount: 500,
    rating: 4.6,
    reviews: 62
  },
  
  {
    id: 'h3',
    categoryId: 'food-containers',
    name: 'H3 Clear Food Storage Box — Folding Lid',
    slug: 'h3-clear-food-storage',
    dimensions: '8 × 5 × 2.5 inches',
    capacity: '1200ml',
    price: 1000,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent',
    model: 'H3',
    images: [
      'https://via.placeholder.com/400x400?text=H3+Container+1',
      'https://via.placeholder.com/400x400?text=H3+Container+2'
    ],
    overview: 'A larger clear food box with a practical folding lid, made for takeaway, delivery, and convenient food storage.',
    description: 'Perfect for medium-sized portions of meals and food items.',
    suitableFor: 'Condiments, biscuits, cakes, frozen food, and much more.',
    idealFor: 'Serving and delivering both savoury and sweet foods, portioning meals, and keeping leftover food stored in the refrigerator at home.',
    recommendation: 'Excellent choice for medium portions. Popular with restaurants and takeaways.',
    inStock: true,
    stockCount: 400,
    rating: 4.7,
    reviews: 78
  },
  
  {
    id: 'h6',
    categoryId: 'food-containers',
    name: 'H6 Clear Food Storage Box — Folding Lid',
    slug: 'h6-clear-food-storage',
    dimensions: '9 × 6 × 2.5 inches',
    capacity: '1600ml',
    price: 1300,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent',
    model: 'H6',
    images: [
      'https://via.placeholder.com/400x400?text=H6+Container+1',
      'https://via.placeholder.com/400x400?text=H6+Container+2'
    ],
    overview: 'A spacious clear food box with a convenient folding lid, designed for takeaway, delivery, and practical food storage.',
    description: 'Large capacity container for substantial portions.',
    suitableFor: 'Condiments, biscuits, cakes, frozen food, and much more.',
    idealFor: 'Takeaway and delivery of savoury and sweet foods, portioning meals, and storing leftover food in the refrigerator at home.',
    recommendation: 'Best seller for restaurants. Great for bulk orders above 500 pieces.',
    inStock: true,
    stockCount: 350,
    rating: 4.8,
    reviews: 124
  },
  
  {
    id: 'h9',
    categoryId: 'food-containers',
    name: 'H9 Clear Food Storage Box — Folding Lid',
    slug: 'h9-clear-food-storage',
    dimensions: '5 × 4 × 2 inches',
    capacity: '400ml',
    price: 550,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — clear plastic',
    shape: 'Rectangular',
    lid: 'Folding lid included',
    colour: 'Transparent',
    model: 'H9',
    images: [
      'https://via.placeholder.com/400x400?text=H9+Container+1',
      'https://via.placeholder.com/400x400?text=H9+Container+2'
    ],
    overview: 'A compact clear food box with a folding lid, suitable for takeaway, delivery, and everyday food storage.',
    description: 'Smallest option, perfect for small portions and condiments.',
    suitableFor: 'Condiments, biscuits, cakes, frozen food, and much more.',
    idealFor: 'Takeaway and delivery of savoury and sweet foods, portioning meals, and storing leftover food in the refrigerator at home.',
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
    dimensions: '200ml capacity',
    capacity: '200ml',
    price: 900,
    pack: '100 pieces',
    material: 'Polypropylene (PP) — disposable soft plastic',
    shape: 'Round',
    lid: 'Included',
    colour: 'Transparent',
    images: [
      'https://via.placeholder.com/400x400?text=200ml+Round+1',
      'https://via.placeholder.com/400x400?text=200ml+Round+2'
    ],
    overview: 'A lightweight clear round food container made from disposable PP, supplied with a lid for convenient takeaway, delivery, and food packing.',
    description: 'Perfect for small portions and condiments in round containers.',
    suitableFor: 'Chaat, sauces, fresh salad, condiments, kheer, and more.',
    idealFor: 'Takeaway, delivery, food packing, and convenient portioning.',
    recommendation: 'Great for desserts and small portions. Very affordable wholesale rates available.',
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
    dimensions: '300ml capacity',
    capacity: '300ml',
    price: 1000,
    pack: '50 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Round',
    lid: 'Included',
    colour: 'Transparent',
    images: [
      'https://via.placeholder.com/400x400?text=300ml+Round+1',
      'https://via.placeholder.com/400x400?text=300ml+Round+2'
    ],
    overview: 'A clear, round PP food container designed for convenient food packing, takeaway, and storage. The transparent body makes it easy to see the contents, while the included lid helps keep food covered during transport and storage.',
    description: 'Medium round container with clear visibility.',
    suitableFor: 'Desserts, fast food, soup, and other food items.',
    idealFor: 'Takeaway, food packing, transport, and food storage.',
    recommendation: 'Popular choice for dessert shops and fast food restaurants.',
    inStock: true,
    stockCount: 300,
    rating: 4.6,
    reviews: 87
  },
  
  {
    id: '450ml-r16',
    categoryId: 'food-containers',
    name: '450ml R16 Clear Round Food Container',
    slug: '450ml-r16-container',
    dimensions: '450ml capacity',
    capacity: '450ml',
    price: 2200,
    pack: '1000 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Round',
    lid: 'Included — separate lid',
    colour: 'Transparent',
    model: 'R16',
    images: [
      'https://via.placeholder.com/400x400?text=450ml+R16+1',
      'https://via.placeholder.com/400x400?text=450ml+R16+2'
    ],
    overview: 'A sturdy clear round container made from polypropylene (PP), designed for convenient takeaway, delivery, and food storage. Its practical shape makes it suitable for transporting both solid and semi-solid foods.',
    description: 'Perfect for curries, rice, and hot food items.',
    suitableFor: 'Rice, curries, frozen food, ice cream, brownies, mithai, and more.',
    idealFor: 'Takeaway, delivery, portioning, and refrigerator storage.',
    recommendation: 'Best seller for restaurants. Bulk pricing at 500+ pieces.',
    inStock: true,
    stockCount: 1200,
    rating: 4.9,
    reviews: 156
  },
  
  {
    id: '500ml-rectangular',
    categoryId: 'food-containers',
    name: '500ml Clear Rectangular Food Container',
    slug: '500ml-rectangular-container',
    dimensions: 'Approx. 7 × 4.75 × 1.5 inches',
    capacity: '500ml',
    price: 1350,
    pack: '50 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Rectangular',
    lid: 'Included',
    colour: 'Transparent',
    images: [
      'https://via.placeholder.com/400x400?text=500ml+Rect+1',
      'https://via.placeholder.com/400x400?text=500ml+Rect+2'
    ],
    overview: 'A clear rectangular PP food container designed for convenient takeaway, delivery, and everyday food storage. Its practical shape makes it suitable for transporting both solid and semi-solid foods.',
    description: 'Medium rectangular container, great for various food types.',
    suitableFor: 'Rice, curries, frozen food, ice cream, mithai, and more.',
    idealFor: 'Takeaway, delivery, portioning, and refrigerator storage.',
    recommendation: 'Versatile container suitable for many food types.',
    inStock: true,
    stockCount: 250,
    rating: 4.7,
    reviews: 73
  },
  
  {
    id: '750ml-rectangular',
    categoryId: 'food-containers',
    name: '750ml Clear Rectangular Food Container',
    slug: '750ml-rectangular-container',
    dimensions: 'Approx. 6.5 × 4.5 × 2.25 inches',
    capacity: '750ml',
    price: 825,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Rectangular',
    lid: 'Included',
    colour: 'Transparent',
    images: [
      'https://via.placeholder.com/400x400?text=750ml+Rect+1',
      'https://via.placeholder.com/400x400?text=750ml+Rect+2'
    ],
    overview: 'A clear rectangular PP food container with a practical lid, designed for takeaway, delivery, and convenient food storage. Its shape makes it suitable for carrying both solid and semi-solid foods.',
    description: 'Large rectangular container for generous portions.',
    suitableFor: 'Rice, curries, frozen food, ice cream, mithai, and more.',
    idealFor: 'Takeaway, delivery, portioning, and refrigerator storage.',
    recommendation: 'Great for family-sized portions and meal prep.',
    inStock: true,
    stockCount: 180,
    rating: 4.8,
    reviews: 64
  },
  
  {
    id: '1000ml-rectangular',
    categoryId: 'food-containers',
    name: '1000ml Clear Rectangular Food Container',
    slug: '1000ml-rectangular-container',
    dimensions: 'Approx. 7 × 4.75 × 2.5 inches',
    capacity: '1000ml',
    price: 875,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Rectangular',
    lid: 'Included',
    colour: 'Transparent',
    images: [
      'https://via.placeholder.com/400x400?text=1000ml+Rect+1',
      'https://via.placeholder.com/400x400?text=1000ml+Rect+2'
    ],
    overview: 'A spacious clear rectangular PP food container with a lid, designed for takeaway, delivery, and convenient food storage. Its practical shape is suitable for transporting both solid and semi-solid foods.',
    description: 'Extra-large rectangular container for big portions.',
    suitableFor: 'Rice, curries, frozen food, ice cream, and more.',
    idealFor: 'Takeaway, delivery, portioning, and refrigerator storage.',
    recommendation: 'Perfect for family orders and meal delivery.',
    inStock: true,
    stockCount: 150,
    rating: 4.7,
    reviews: 55
  },
  
  {
    id: '1500ml-square',
    categoryId: 'food-containers',
    name: '1500ml Clear Square Food Container',
    slug: '1500ml-square-container',
    dimensions: 'Approx. 6.25 × 6.25 × 3 inches',
    capacity: '1500ml',
    price: 1125,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Square',
    lid: 'Included — separate lid',
    colour: 'Transparent',
    images: [
      'https://via.placeholder.com/400x400?text=1500ml+Square+1',
      'https://via.placeholder.com/400x400?text=1500ml+Square+2'
    ],
    overview: 'A spacious clear square PP food container with a separate lid, designed for takeaway, delivery, and convenient food storage. Its generous capacity makes it suitable for both solid and semi-solid food portions.',
    description: 'Large square container for multiple servings.',
    suitableFor: 'Rice, curries, frozen food, ice cream, brownies, mithai, and more.',
    idealFor: 'Takeaway, delivery, portioning, and refrigerator storage.',
    recommendation: 'Excellent for catering and bulk orders.',
    inStock: true,
    stockCount: 120,
    rating: 4.8,
    reviews: 68
  },
  
  {
    id: '2000ml-square',
    categoryId: 'food-containers',
    name: '2000ml Clear Square Food Container',
    slug: '2000ml-square-container',
    dimensions: 'Approx. 8 × 8 × 3 inches',
    capacity: '2000ml',
    price: 660,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Square',
    lid: 'Included',
    colour: 'Transparent',
    images: [
      'https://via.placeholder.com/400x400?text=2000ml+Square+1',
      'https://via.placeholder.com/400x400?text=2000ml+Square+2'
    ],
    overview: 'A large-capacity clear square PP food container with a lid, designed for takeaway, delivery, and convenient food storage. Its spacious design is suitable for transporting both solid and semi-solid foods.',
    description: 'Extra-large square container, best for bulk portions.',
    suitableFor: 'Rice, curries, frozen food, ice cream, brownies, mithai, and more.',
    idealFor: 'Takeaway, delivery, portioning, and refrigerator storage.',
    recommendation: 'Popular for catering and restaurant bulk orders.',
    inStock: true,
    stockCount: 100,
    rating: 4.9,
    reviews: 81
  },
  
  {
    id: '3000ml-square',
    categoryId: 'food-containers',
    name: '3000ml Clear Square Food Container',
    slug: '3000ml-square-container',
    dimensions: 'Approx. 8 × 8 × 4 inches',
    capacity: '3000ml',
    price: 1875,
    pack: '25 pieces',
    material: 'Polypropylene (PP)',
    shape: 'Square',
    lid: 'Included',
    colour: 'Transparent',
    images: [
      'https://via.placeholder.com/400x400?text=3000ml+Square+1',
      'https://via.placeholder.com/400x400?text=3000ml+Square+2'
    ],
    overview: 'A high-capacity clear square PP food container with a lid, designed for takeaway, delivery, and practical food storage. Its generous size provides ample space for larger portions of both solid and semi-solid foods.',
    description: 'Maximum capacity square container for large catering needs.',
    suitableFor: 'Rice, curries, frozen food, ice cream, brownies, mithai, and more.',
    idealFor: 'Takeaway, delivery, portioning, and refrigerator storage.',
    recommendation: 'Best for large catering events and bulk restaurant orders.',
    inStock: true,
    stockCount: 80,
    rating: 5.0,
    reviews: 45
  }
];


/* ===== UTILITY FUNCTIONS ===== */

export function getProductById(productId) {
  return PRODUCTS.find(product => product.id === productId);
}

export function getProductsByCategory(categoryId) {
  return PRODUCTS.filter(product => product.categoryId === categoryId);
}

export function getCategoryById(categoryId) {
  return CATEGORIES.find(category => category.id === categoryId);
}

export function getCategoryBySlug(slug) {
  return CATEGORIES.find(category => category.slug === slug);
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

export function searchProducts(query) {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.dimensions.toLowerCase().includes(lowerQuery)
  );
}