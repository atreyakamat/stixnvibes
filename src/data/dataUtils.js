// Data utility functions for managing products and collections

import productsData from './products.json';
import collectionsData from './collections.json';

// Get all individual products
export const getAllProducts = () => {
  return productsData;
};

// Get all collections
export const getAllCollections = () => {
  return collectionsData;
};

// Get products by category
export const getProductsByCategory = (category) => {
  return productsData.filter(product => product.category === category);
};

// Get products by tag
export const getProductsByTag = (tag) => {
  return productsData.filter(product => product.tags.includes(tag));
};

// Get products that belong to a specific collection
export const getProductsInCollection = (collectionId) => {
  const collection = collectionsData.find(c => c.id === collectionId);
  if (!collection) return [];
  
  return collection.stickers.map(stickerId => 
    productsData.find(product => product.id === stickerId)
  ).filter(Boolean);
};

// Get collections that contain a specific product
export const getCollectionsForProduct = (productId) => {
  return collectionsData.filter(collection => 
    collection.stickers.includes(productId)
  );
};

// Get trending products (top 10 by popularity)
export const getTrendingProducts = (limit = 10) => {
  return productsData
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

// Get products by price range
export const getProductsByPriceRange = (minPrice, maxPrice) => {
  return productsData.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
};

// Get featured collections (limited edition first, then by date)
export const getFeaturedCollections = () => {
  return collectionsData.sort((a, b) => {
    if (a.isLimited && !b.isLimited) return -1;
    if (!a.isLimited && b.isLimited) return 1;
    return new Date(b.releaseDate) - new Date(a.releaseDate);
  });
};

// Search products by title or description
export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return productsData.filter(product =>
    product.title.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Search collections by title or description
export const searchCollections = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return collectionsData.filter(collection =>
    collection.title.toLowerCase().includes(lowercaseQuery) ||
    collection.description.toLowerCase().includes(lowercaseQuery) ||
    collection.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Get product recommendations based on categories and tags
export const getRecommendedProducts = (baseProduct, limit = 4) => {
  const sameCategory = productsData.filter(p => 
    p.id !== baseProduct.id && p.category === baseProduct.category
  );
  
  const sameTags = productsData.filter(p => 
    p.id !== baseProduct.id && 
    p.tags.some(tag => baseProduct.tags.includes(tag))
  );
  
  // Combine and deduplicate
  const recommended = [...new Set([...sameCategory, ...sameTags])];
  
  // Sort by popularity and return limited results
  return recommended
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

// Calculate collection savings
export const getCollectionSavings = (collectionId) => {
  const collection = collectionsData.find(c => c.id === collectionId);
  if (!collection) return 0;
  
  const individualTotal = collection.stickers.reduce((total, stickerId) => {
    const product = productsData.find(p => p.id === stickerId);
    return total + (product ? product.price : 0);
  }, 0);
  
  return individualTotal - collection.price;
};

// Get all unique categories
export const getAllCategories = () => {
  const categories = productsData.map(product => product.category);
  return [...new Set(categories)];
};

// Get all unique tags
export const getAllTags = () => {
  const tags = productsData.flatMap(product => product.tags);
  return [...new Set(tags)];
};

// Data validation helpers
export const validateProductData = () => {
  const issues = [];
  
  // Check for duplicate product IDs
  const productIds = productsData.map(p => p.id);
  const duplicateIds = productIds.filter((id, index) => productIds.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    issues.push(`Duplicate product IDs: ${duplicateIds.join(', ')}`);
  }
  
  // Check for missing product references in collections
  collectionsData.forEach(collection => {
    collection.stickers.forEach(stickerId => {
      if (!productsData.find(p => p.id === stickerId)) {
        issues.push(`Collection "${collection.title}" references missing product: ${stickerId}`);
      }
    });
  });
  
  return issues;
};

// Export data for backward compatibility
export const productsDataLegacy = productsData;
export const collectionsDataLegacy = collectionsData;
