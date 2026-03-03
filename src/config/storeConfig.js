// Configuration file for easy modifications
// Change these values to customize your StixNVibes store

export const STORE_CONFIG = {
  // Material Options & Pricing
  materials: {
    paper: {
      name: 'Paper Stickers',
      multiplier: 1,        // Change pricing multiplier here
      icon: '📄',
      description: 'Premium paper material with vibrant colors. Basic water resistance.'
    },
    vinyl: {
      name: 'Vinyl Stickers', 
      multiplier: 1.6,      // Change pricing multiplier here
      icon: '💧',
      description: 'Durable vinyl material that\'s waterproof and tear-resistant. Perfect for outdoor use.'
    }
    // Add new materials here:
    // newMaterial: {
    //   name: 'New Material',
    //   multiplier: 2.0,
    //   icon: '🔥',
    //   description: 'Description here'
    // }
  },

  // Contact Information
  contact: {
    whatsappNumber: '917744020601',  // Change WhatsApp number here
    businessName: 'Stix N Vibes',
    email: 'hello@stixnvibes.com',
    instagram: 'stixnvibes'
  },

  // Store Settings
  store: {
    // Homepage trending products limit
    trendingLimit: 8,
    
    // Recommendations limit
    recommendationsLimit: 4,
    
    // Default currency
    currency: '₹',
    
    // Shipping info
    shippingDays: '7-10 days',
    processingDays: '3-5 business days',
    
    // Featured collection limit on homepage
    featuredCollectionsLimit: 6
  },

  // Default Collection Discounts (can be overridden per collection)
  collectionDiscounts: {
    small: 10,    // 3-4 items
    medium: 15,   // 5-6 items
    large: 20,    // 7+ items
    limited: 25   // Limited edition bonus
  },

  // Product Display Settings
  productDisplay: {
    // Products per page
    itemsPerPage: 12,
    
    // Grid columns for different screens
    gridCols: {
      mobile: 2,
      tablet: 3,
      desktop: 4
    },
    
    // Show popularity scores
    showPopularity: false,
    
    // Show "New" badge for items newer than X days
    newItemDays: 14
  },

  // Search & Filter Settings
  search: {
    // Minimum characters for search
    minChars: 2,
    
    // Search result limits
    productLimit: 20,
    collectionLimit: 10,
    
    // Enable fuzzy search
    fuzzySearch: true
  },

  // UI Theme Colors (easy to modify)
  colors: {
    primary: '#e92932',      // Main brand color
    secondary: '#42c4ef',    // Secondary brand color
    accent: '#974e52',       // Accent color
    background: '#fcf8f8',   // Background color
    text: '#1b0e0f',         // Main text color
    textLight: '#974e52'     // Light text color
  },

  // Feature Flags (enable/disable features easily)
  features: {
    // Show collections page
    enableCollections: true,
    
    // Show individual products in collections page
    enableIndividualInCollections: true,
    
    // Show recommendations
    enableRecommendations: true,
    
    // Show trending section
    enableTrending: true,
    
    // Show category filters
    enableCategoryFilters: true,
    
    // Show material selection upfront
    enableMaterialPreview: true,
    
    // Show popularity badges
    enablePopularityBadges: false,
    
    // Enable search functionality
    enableSearch: true,
    
    // Show "New" badges
    enableNewBadges: true,
    
    // Enable cart persistence
    enableCartPersistence: true
  }
};

// Easy pricing calculator
export const calculatePrice = (basePrice, material = 'paper') => {
  const multiplier = STORE_CONFIG.materials[material]?.multiplier || 1;
  return Math.round(basePrice * multiplier);
};

// Easy discount calculator for collections
export const calculateCollectionDiscount = (itemCount, isLimited = false) => {
  if (isLimited) return STORE_CONFIG.collectionDiscounts.limited;
  if (itemCount >= 7) return STORE_CONFIG.collectionDiscounts.large;
  if (itemCount >= 5) return STORE_CONFIG.collectionDiscounts.medium;
  return STORE_CONFIG.collectionDiscounts.small;
};

// Utility to get material options for UI
export const getMaterialOptions = () => {
  return Object.entries(STORE_CONFIG.materials).map(([key, material]) => ({
    id: key,
    ...material
  }));
};

export default STORE_CONFIG;
