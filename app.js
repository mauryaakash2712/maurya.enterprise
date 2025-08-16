// Application Data
const appData = {
  "categories": [
    {"id": 1, "name": "Smartphones", "image": "📱", "count": 25},
    {"id": 2, "name": "Laptops", "image": "💻", "count": 18},
    {"id": 3, "name": "Tablets", "image": "📱", "count": 12},
    {"id": 4, "name": "Audio", "image": "🎧", "count": 20},
    {"id": 5, "name": "Gaming", "image": "🎮", "count": 15},
    {"id": 6, "name": "Accessories", "image": "🔌", "count": 30}
  ],
  "products": [
    {
      "id": 1,
      "name": "iPhone 15 Pro Max",
      "brand": "Apple",
      "category": 1,
      "price": 1199,
      "originalPrice": 1299,
      "rating": 4.8,
      "reviews": 1247,
      "image": "https://via.placeholder.com/300x300?text=iPhone+15+Pro",
      "images": ["https://via.placeholder.com/500x500?text=iPhone+15+1", "https://via.placeholder.com/500x500?text=iPhone+15+2", "https://via.placeholder.com/500x500?text=iPhone+15+3"],
      "description": "The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system.",
      "specifications": {
        "Display": "6.7-inch Super Retina XDR",
        "Processor": "A17 Pro chip",
        "Storage": "256GB",
        "Camera": "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
        "Battery": "Up to 29 hours video playback",
        "OS": "iOS 17"
      },
      "inStock": true,
      "featured": true,
      "bestSeller": true
    },
    {
      "id": 2,
      "name": "Samsung Galaxy S24 Ultra",
      "brand": "Samsung",
      "category": 1,
      "price": 1099,
      "originalPrice": 1199,
      "rating": 4.7,
      "reviews": 892,
      "image": "https://via.placeholder.com/300x300?text=Galaxy+S24+Ultra",
      "images": ["https://via.placeholder.com/500x500?text=Galaxy+S24+1", "https://via.placeholder.com/500x500?text=Galaxy+S24+2"],
      "description": "Premium Android smartphone with S Pen, advanced AI features, and exceptional camera capabilities.",
      "specifications": {
        "Display": "6.8-inch Dynamic AMOLED 2X",
        "Processor": "Snapdragon 8 Gen 3",
        "Storage": "256GB",
        "Camera": "200MP Main, 12MP Ultra Wide, 10MP Telephoto",
        "Battery": "5000mAh",
        "OS": "Android 14"
      },
      "inStock": true,
      "featured": true,
      "bestSeller": true
    },
    {
      "id": 3,
      "name": "MacBook Pro 16-inch M3",
      "brand": "Apple",
      "category": 2,
      "price": 2499,
      "originalPrice": 2699,
      "rating": 4.9,
      "reviews": 567,
      "image": "https://via.placeholder.com/300x300?text=MacBook+Pro+M3",
      "images": ["https://via.placeholder.com/500x500?text=MacBook+1", "https://via.placeholder.com/500x500?text=MacBook+2"],
      "description": "Professional laptop with M3 chip, stunning Liquid Retina XDR display, and all-day battery life.",
      "specifications": {
        "Display": "16.2-inch Liquid Retina XDR",
        "Processor": "Apple M3 chip",
        "Memory": "18GB unified memory",
        "Storage": "512GB SSD",
        "Graphics": "12-core GPU",
        "Battery": "Up to 22 hours"
      },
      "inStock": true,
      "featured": true,
      "bestSeller": false
    },
    {
      "id": 4,
      "name": "Dell XPS 13 Plus",
      "brand": "Dell",
      "category": 2,
      "price": 1299,
      "originalPrice": 1499,
      "rating": 4.5,
      "reviews": 234,
      "image": "https://via.placeholder.com/300x300?text=Dell+XPS+13",
      "images": ["https://via.placeholder.com/500x500?text=Dell+XPS+1", "https://via.placeholder.com/500x500?text=Dell+XPS+2"],
      "description": "Ultra-thin Windows laptop with stunning 13.4-inch display and premium build quality.",
      "specifications": {
        "Display": "13.4-inch InfinityEdge",
        "Processor": "Intel Core i7-1360P",
        "Memory": "16GB LPDDR5",
        "Storage": "512GB SSD",
        "Graphics": "Intel Iris Xe",
        "Weight": "2.73 lbs"
      },
      "inStock": true,
      "featured": false,
      "bestSeller": true
    },
    {
      "id": 5,
      "name": "iPad Pro 12.9-inch",
      "brand": "Apple",
      "category": 3,
      "price": 1099,
      "originalPrice": 1199,
      "rating": 4.6,
      "reviews": 445,
      "image": "https://via.placeholder.com/300x300?text=iPad+Pro+12.9",
      "images": ["https://via.placeholder.com/500x500?text=iPad+1", "https://via.placeholder.com/500x500?text=iPad+2"],
      "description": "The most advanced iPad with M2 chip, stunning Liquid Retina XDR display, and pro cameras.",
      "specifications": {
        "Display": "12.9-inch Liquid Retina XDR",
        "Processor": "Apple M2 chip",
        "Storage": "128GB",
        "Camera": "12MP Wide, 10MP Ultra Wide",
        "Battery": "Up to 10 hours",
        "Connectivity": "Wi-Fi 6E"
      },
      "inStock": true,
      "featured": true,
      "bestSeller": false
    },
    {
      "id": 6,
      "name": "Sony WH-1000XM5",
      "brand": "Sony",
      "category": 4,
      "price": 349,
      "originalPrice": 399,
      "rating": 4.8,
      "reviews": 1123,
      "image": "https://via.placeholder.com/300x300?text=Sony+WH-1000XM5",
      "images": ["https://via.placeholder.com/500x500?text=Sony+1", "https://via.placeholder.com/500x500?text=Sony+2"],
      "description": "Premium wireless noise canceling headphones with exceptional sound quality and comfort.",
      "specifications": {
        "Driver": "30mm",
        "Frequency Response": "4 Hz - 40 kHz",
        "Battery": "Up to 30 hours",
        "Charging": "USB-C, Quick charge",
        "Connectivity": "Bluetooth 5.2",
        "Weight": "8.8 oz"
      },
      "inStock": true,
      "featured": true,
      "bestSeller": true
    },
    {
      "id": 7,
      "name": "PlayStation 5",
      "brand": "Sony",
      "category": 5,
      "price": 499,
      "originalPrice": 499,
      "rating": 4.7,
      "reviews": 2341,
      "image": "https://via.placeholder.com/300x300?text=PlayStation+5",
      "images": ["https://via.placeholder.com/500x500?text=PS5+1", "https://via.placeholder.com/500x500?text=PS5+2"],
      "description": "Next-generation gaming console with lightning-fast loading and stunning graphics.",
      "specifications": {
        "CPU": "AMD Zen 2",
        "GPU": "AMD RDNA 2",
        "Memory": "16GB GDDR6",
        "Storage": "825GB SSD",
        "Optical": "4K UHD Blu-ray",
        "Audio": "3D Audio"
      },
      "inStock": false,
      "featured": true,
      "bestSeller": true
    },
    {
      "id": 8,
      "name": "AirPods Pro (3rd Gen)",
      "brand": "Apple",
      "category": 4,
      "price": 249,
      "originalPrice": 279,
      "rating": 4.6,
      "reviews": 867,
      "image": "https://via.placeholder.com/300x300?text=AirPods+Pro",
      "images": ["https://via.placeholder.com/500x500?text=AirPods+1", "https://via.placeholder.com/500x500?text=AirPods+2"],
      "description": "Premium wireless earbuds with active noise cancellation and spatial audio.",
      "specifications": {
        "Driver": "Custom high-excursion driver",
        "Chip": "H2 chip",
        "Battery": "Up to 6 hours (ANC on)",
        "Case Battery": "Up to 30 hours total",
        "Charging": "Lightning, MagSafe, Qi",
        "Water Resistance": "IPX4"
      },
      "inStock": true,
      "featured": false,
      "bestSeller": true
    }
  ],
  "reviews": [
    {"productId": 1, "user": "John D.", "rating": 5, "comment": "Amazing phone with incredible camera quality!", "date": "2024-08-10"},
    {"productId": 1, "user": "Sarah M.", "rating": 4, "comment": "Great performance, battery life could be better.", "date": "2024-08-05"},
    {"productId": 2, "user": "Mike R.", "rating": 5, "comment": "Best Android phone I've ever owned. S Pen is fantastic!", "date": "2024-08-08"},
    {"productId": 3, "user": "Lisa K.", "rating": 5, "comment": "Perfect for professional work. M3 chip is incredibly fast.", "date": "2024-08-12"},
    {"productId": 6, "user": "David L.", "rating": 5, "comment": "Excellent noise cancellation and sound quality.", "date": "2024-08-07"}
  ],
  "deals": [
    {"productId": 1, "discount": 8, "endsAt": "2024-08-20"},
    {"productId": 2, "discount": 8, "endsAt": "2024-08-18"},
    {"productId": 3, "discount": 7, "endsAt": "2024-08-25"},
    {"productId": 6, "discount": 13, "endsAt": "2024-08-22"}
  ]
};

// Application State
let currentUser = null;
let cart = [];
let currentPage = 'home';
let currentCategory = null;
let currentProduct = null;
let filters = {
  category: null,
  priceRange: 3000,
  brands: [],
  rating: null,
  sort: 'default'
};

// Utility Functions
function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }
  
  if (hasHalfStar) {
    stars += '☆';
  }
  
  const remaining = 5 - Math.ceil(rating);
  for (let i = 0; i < remaining; i++) {
    stars += '☆';
  }
  
  return stars;
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const messageEl = toast.querySelector('.toast-message');
  
  messageEl.textContent = message;
  toast.className = `toast ${type}`;
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.add('hidden');
  });
  
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.remove('hidden');
    currentPage = pageId;
  }
}

// Product Functions
function getProductById(id) {
  return appData.products.find(p => p.id === parseInt(id));
}

function getProductsByCategory(categoryId) {
  return appData.products.filter(p => p.category === parseInt(categoryId));
}

function getBestSellers() {
  return appData.products.filter(p => p.bestSeller);
}

function getFeaturedProducts() {
  return appData.products.filter(p => p.featured);
}

function getDealsProducts() {
  const dealProductIds = appData.deals.map(d => d.productId);
  return appData.products.filter(p => dealProductIds.includes(p.id));
}

function filterProducts(products) {
  let filtered = [...products];
  
  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(p => p.category === parseInt(filters.category));
  }
  
  // Filter by price range
  filtered = filtered.filter(p => p.price <= filters.priceRange);
  
  // Filter by brands
  if (filters.brands.length > 0) {
    filtered = filtered.filter(p => filters.brands.includes(p.brand));
  }
  
  // Filter by rating
  if (filters.rating) {
    filtered = filtered.filter(p => p.rating >= parseFloat(filters.rating));
  }
  
  // Sort products
  switch (filters.sort) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  
  return filtered;
}

function searchProducts(query) {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  return appData.products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  );
}

// Render Functions
function renderProductCard(product) {
  const discount = appData.deals.find(d => d.productId === product.id);
  const discountPercent = discount ? discount.discount : 0;
  
  return `
    <div class="product-card" data-product-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      ${!product.inStock ? '<div class="out-of-stock">Out of Stock</div>' : ''}
      <div class="product-content">
        <div class="product-brand">${product.brand}</div>
        <h4 class="product-name">${product.name}</h4>
        <div class="product-rating">
          <div class="stars">${generateStars(product.rating)}</div>
          <span class="rating-text">(${product.reviews})</span>
        </div>
        <div class="product-pricing">
          <span class="current-price">${formatPrice(product.price)}</span>
          ${product.originalPrice > product.price ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
          ${discountPercent > 0 ? `<span class="discount">${discountPercent}% off</span>` : ''}
        </div>
        ${product.inStock ? `<button class="btn btn--primary quick-add-btn" data-product-id="${product.id}">Add to Cart</button>` : ''}
      </div>
    </div>
  `;
}

function renderCategoryCard(category) {
  return `
    <div class="category-card" data-category-id="${category.id}">
      <div class="category-icon">${category.image}</div>
      <h4 class="category-name">${category.name}</h4>
      <div class="category-count">${category.count} products</div>
    </div>
  `;
}

function renderCartItem(item) {
  const product = getProductById(item.productId);
  if (!product) return '';
  
  return `
    <div class="cart-item" data-product-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h4>${product.name}</h4>
        <div class="cart-item-price">${formatPrice(product.price)}</div>
        <div class="quantity-controls">
          <button class="quantity-btn" data-action="decrease">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" data-action="increase">+</button>
        </div>
        <div class="cart-actions">
          <button class="remove-btn" data-action="remove">Remove</button>
        </div>
      </div>
      <div class="cart-item-total">
        ${formatPrice(product.price * item.quantity)}
      </div>
    </div>
  `;
}

function renderReview(review) {
  return `
    <div class="review-item">
      <div class="review-header">
        <span class="review-user">${review.user}</span>
        <span class="review-date">${review.date}</span>
      </div>
      <div class="review-rating">
        <div class="stars">${generateStars(review.rating)}</div>
      </div>
      <div class="review-comment">${review.comment}</div>
    </div>
  `;
}

// Page Rendering Functions
function renderHomepage() {
  // Render categories
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (categoriesGrid) {
    categoriesGrid.innerHTML = appData.categories.map(renderCategoryCard).join('');
  }
  
  // Render best sellers
  const bestSellersGrid = document.getElementById('bestSellersGrid');
  if (bestSellersGrid) {
    const bestSellers = getBestSellers().slice(0, 4);
    bestSellersGrid.innerHTML = bestSellers.map(renderProductCard).join('');
  }
  
  // Render deals
  const dealsGrid = document.getElementById('dealsGrid');
  if (dealsGrid) {
    const deals = getDealsProducts().slice(0, 4);
    dealsGrid.innerHTML = deals.map(renderProductCard).join('');
  }
}

function renderProductListing(categoryId = null) {
  const products = categoryId ? getProductsByCategory(categoryId) : appData.products;
  const filtered = filterProducts(products);
  
  // Update title
  const category = appData.categories.find(c => c.id === parseInt(categoryId));
  const title = category ? category.name : 'All Products';
  const categoryTitleEl = document.getElementById('categoryTitle');
  if (categoryTitleEl) {
    categoryTitleEl.textContent = title;
  }
  
  // Render products
  const productsGrid = document.getElementById('productsGrid');
  if (productsGrid) {
    productsGrid.innerHTML = filtered.map(renderProductCard).join('');
  }
  
  // Render brand filters
  const brands = [...new Set(products.map(p => p.brand))];
  const brandFilters = document.getElementById('brandFilters');
  if (brandFilters) {
    brandFilters.innerHTML = brands.map(brand => 
      `<label><input type="checkbox" value="${brand}" ${filters.brands.includes(brand) ? 'checked' : ''}> ${brand}</label>`
    ).join('');
  }
  
  showPage('productListing');
}

function renderProductDetail(productId) {
  const product = getProductById(productId);
  if (!product) return;
  
  currentProduct = product;
  
  // Update breadcrumb
  const category = appData.categories.find(c => c.id === product.category);
  const categoryLink = document.querySelector('.category-link');
  const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
  if (categoryLink && breadcrumbCurrent) {
    categoryLink.textContent = category.name;
    breadcrumbCurrent.textContent = product.name;
  }
  
  // Update product info
  const mainProductImage = document.getElementById('mainProductImage');
  const productTitle = document.getElementById('productTitle');
  const productBrand = document.getElementById('productBrand');
  const productStars = document.getElementById('productStars');
  const ratingCount = document.getElementById('ratingCount');
  const currentPrice = document.getElementById('currentPrice');
  const originalPrice = document.getElementById('originalPrice');
  const discountPercent = document.getElementById('discountPercent');
  
  if (mainProductImage) mainProductImage.src = product.images[0];
  if (productTitle) productTitle.textContent = product.name;
  if (productBrand) productBrand.textContent = product.brand;
  if (productStars) productStars.innerHTML = generateStars(product.rating);
  if (ratingCount) ratingCount.textContent = `(${product.reviews} reviews)`;
  if (currentPrice) currentPrice.textContent = formatPrice(product.price);
  
  if (product.originalPrice > product.price) {
    if (originalPrice) {
      originalPrice.textContent = formatPrice(product.originalPrice);
      originalPrice.style.display = 'inline';
    }
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    if (discountPercent) {
      discountPercent.textContent = `${discount}% off`;
      discountPercent.style.display = 'inline';
    }
  } else {
    if (originalPrice) originalPrice.style.display = 'none';
    if (discountPercent) discountPercent.style.display = 'none';
  }
  
  // Update description
  const productDescription = document.getElementById('productDescription');
  if (productDescription) {
    productDescription.textContent = product.description;
  }
  
  // Update specifications
  const specsTable = document.getElementById('specificationsTable');
  if (specsTable) {
    specsTable.innerHTML = Object.entries(product.specifications).map(([key, value]) => 
      `<tr><td>${key}</td><td>${value}</td></tr>`
    ).join('');
  }
  
  // Update thumbnails
  const thumbnails = document.getElementById('imageThumbnails');
  if (thumbnails) {
    thumbnails.innerHTML = product.images.map((img, index) => 
      `<img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">`
    ).join('');
  }
  
  // Update reviews
  const productReviews = appData.reviews.filter(r => r.productId === product.id);
  const reviewsContainer = document.getElementById('reviewsContainer');
  if (reviewsContainer) {
    reviewsContainer.innerHTML = productReviews.length > 0 ? 
      productReviews.map(renderReview).join('') : 
      '<p>No reviews yet.</p>';
  }
  
  showPage('productDetail');
}

function renderCart() {
  const cartItems = document.getElementById('cartItems');
  
  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart"><h3>Your cart is empty</h3><p>Start shopping to add items to your cart.</p></div>';
    } else {
      cartItems.innerHTML = cart.map(renderCartItem).join('');
    }
  }
  
  updateCartSummary();
  showPage('shoppingCart');
}

function renderCheckout() {
  const checkoutItems = document.getElementById('checkoutItems');
  if (checkoutItems) {
    checkoutItems.innerHTML = cart.map(item => {
      const product = getProductById(item.productId);
      return `
        <div class="checkout-item">
          <span>${product.name} x${item.quantity}</span>
          <span>${formatPrice(product.price * item.quantity)}</span>
        </div>
      `;
    }).join('');
  }
  
  updateCheckoutTotal();
  showPage('checkout');
}

function renderSearchResults(query, results) {
  const searchQuery = document.getElementById('searchQuery');
  const resultsCount = document.getElementById('resultsCount');
  const searchResultsGrid = document.getElementById('searchResultsGrid');
  
  if (searchQuery) searchQuery.textContent = query;
  if (resultsCount) resultsCount.textContent = `${results.length} results found`;
  
  if (searchResultsGrid) {
    searchResultsGrid.innerHTML = results.length > 0 ? 
      results.map(renderProductCard).join('') : 
      '<div class="empty-results"><h3>No products found</h3><p>Try adjusting your search terms.</p></div>';
  }
  
  showPage('searchResults');
}

// Cart Functions
function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product || !product.inStock) return;
  
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  
  updateCartUI();
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  updateCartUI();
  showToast('Item removed from cart');
}

function updateCartQuantity(productId, newQuantity) {
  const item = cart.find(item => item.productId === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQuantity;
      updateCartUI();
    }
  }
}

function updateCartUI() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
  
  if (currentPage === 'shoppingCart') {
    renderCart();
  }
}

function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;
  
  const elements = {
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartTax: document.getElementById('cartTax'),
    cartShipping: document.getElementById('cartShipping'),
    cartTotal: document.getElementById('cartTotal')
  };
  
  if (elements.cartSubtotal) elements.cartSubtotal.textContent = formatPrice(subtotal);
  if (elements.cartTax) elements.cartTax.textContent = formatPrice(tax);
  if (elements.cartShipping) elements.cartShipping.textContent = shipping === 0 ? 'Free' : formatPrice(shipping);
  if (elements.cartTotal) elements.cartTotal.textContent = formatPrice(total);
}

function updateCheckoutTotal() {
  const subtotal = cart.reduce((sum, item) => {
    const product = getProductById(item.productId);
    return sum + (product.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;
  
  const checkoutTotal = document.getElementById('checkoutTotal');
  if (checkoutTotal) {
    checkoutTotal.textContent = formatPrice(total);
  }
}

// Search Function
function handleSearch() {
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    const query = searchInput.value.trim();
    
    if (query) {
      const results = searchProducts(query);
      renderSearchResults(query, results);
    }
  }
}

// Navigation Functions
function navigateHome() {
  showPage('homepage');
  renderHomepage();
  
  // Update navigation active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === 'home') {
      link.classList.add('active');
    }
  });
}

function navigateToCategory(categoryId) {
  currentCategory = parseInt(categoryId);
  filters.category = currentCategory;
  renderProductListing(categoryId);
  
  // Update navigation active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.category === categoryId) {
      link.classList.add('active');
    }
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize search categories
  const searchCategory = document.querySelector('.search-category');
  if (searchCategory) {
    searchCategory.innerHTML = '<option value="">All Categories</option>' + 
      appData.categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
  }
  
  // Logo click navigation
  document.querySelector('.logo').addEventListener('click', function(e) {
    e.preventDefault();
    navigateHome();
  });
  
  // Search functionality
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-input');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }
  
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }
  
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const page = this.dataset.page;
      const category = this.dataset.category;
      
      if (page === 'home') {
        navigateHome();
      } else if (category) {
        navigateToCategory(category);
      }
    });
  });
  
  // Delegated event listener for dynamic content
  document.body.addEventListener('click', function(e) {
    // Product card clicks
    const productCard = e.target.closest('.product-card');
    if (productCard && !e.target.classList.contains('quick-add-btn')) {
      e.preventDefault();
      const productId = productCard.dataset.productId;
      renderProductDetail(parseInt(productId));
      return;
    }
    
    // Category card clicks
    const categoryCard = e.target.closest('.category-card');
    if (categoryCard) {
      e.preventDefault();
      const categoryId = categoryCard.dataset.categoryId;
      navigateToCategory(categoryId);
      return;
    }
    
    // Quick add to cart buttons
    if (e.target.classList.contains('quick-add-btn')) {
      e.preventDefault();
      e.stopPropagation();
      const productId = parseInt(e.target.dataset.productId);
      addToCart(productId);
      return;
    }
    
    // Continue shopping links
    if (e.target.classList.contains('continue-shopping')) {
      e.preventDefault();
      navigateHome();
      return;
    }
    
    // Breadcrumb navigation
    if (e.target.classList.contains('breadcrumb-link')) {
      e.preventDefault();
      const page = e.target.dataset.page;
      if (page === 'home') {
        navigateHome();
      }
      return;
    }
    
    // Product detail image thumbnails
    const thumbnail = e.target.closest('.thumbnail');
    if (thumbnail) {
      const index = parseInt(thumbnail.dataset.index);
      const mainImage = document.getElementById('mainProductImage');
      if (mainImage && currentProduct) {
        mainImage.src = currentProduct.images[index];
        
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
      }
      return;
    }
    
    // Cart item controls
    const cartItem = e.target.closest('.cart-item');
    if (cartItem) {
      const productId = parseInt(cartItem.dataset.productId);
      const action = e.target.dataset.action;
      
      if (action === 'increase') {
        const currentQuantity = parseInt(cartItem.querySelector('.quantity-display').textContent);
        updateCartQuantity(productId, currentQuantity + 1);
      } else if (action === 'decrease') {
        const currentQuantity = parseInt(cartItem.querySelector('.quantity-display').textContent);
        updateCartQuantity(productId, currentQuantity - 1);
      } else if (action === 'remove') {
        removeFromCart(productId);
      }
      return;
    }
  });
  
  // Cart functionality
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      renderCart();
    });
  }
  
  const addToCartBtn = document.getElementById('addToCartBtn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      if (currentProduct) {
        const quantitySelect = document.getElementById('quantitySelect');
        const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
        addToCart(currentProduct.id, quantity);
      }
    });
  }
  
  // Checkout
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      if (cart.length > 0) {
        renderCheckout();
      }
    });
  }
  
  // Checkout form
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate order processing
      showToast('Order placed successfully!', 'success');
      cart = [];
      updateCartUI();
      
      setTimeout(() => {
        navigateHome();
      }, 2000);
    });
  }
  
  // Filters
  const priceRange = document.getElementById('priceRange');
  if (priceRange) {
    priceRange.addEventListener('input', function() {
      filters.priceRange = parseInt(this.value);
      const priceDisplay = document.getElementById('priceRangeDisplay');
      if (priceDisplay) {
        priceDisplay.textContent = `$0 - $${filters.priceRange}`;
      }
      
      if (currentPage === 'productListing') {
        renderProductListing(currentCategory);
      }
    });
  }
  
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      filters.sort = this.value;
      
      if (currentPage === 'productListing') {
        renderProductListing(currentCategory);
      }
    });
  }
  
  // Brand and rating filters - delegated event listeners
  document.addEventListener('change', function(e) {
    if (e.target.type === 'checkbox' && e.target.closest('.brand-filters')) {
      const brand = e.target.value;
      if (e.target.checked) {
        filters.brands.push(brand);
      } else {
        filters.brands = filters.brands.filter(b => b !== brand);
      }
      
      if (currentPage === 'productListing') {
        renderProductListing(currentCategory);
      }
    }
    
    if (e.target.type === 'checkbox' && e.target.closest('.rating-filters')) {
      filters.rating = e.target.checked ? parseFloat(e.target.value) : null;
      
      if (currentPage === 'productListing') {
        renderProductListing(currentCategory);
      }
    }
  });
  
  const clearFilters = document.getElementById('clearFilters');
  if (clearFilters) {
    clearFilters.addEventListener('click', function() {
      filters = {
        category: currentCategory,
        priceRange: 3000,
        brands: [],
        rating: null,
        sort: 'default'
      };
      
      const priceRange = document.getElementById('priceRange');
      const priceDisplay = document.getElementById('priceRangeDisplay');
      const sortSelect = document.getElementById('sortSelect');
      
      if (priceRange) priceRange.value = 3000;
      if (priceDisplay) priceDisplay.textContent = '$0 - $3000';
      if (sortSelect) sortSelect.value = 'default';
      
      document.querySelectorAll('.brand-filters input').forEach(input => input.checked = false);
      document.querySelectorAll('.rating-filters input').forEach(input => input.checked = false);
      
      renderProductListing(currentCategory);
    });
  }
  
  // Authentication modal
  const accountBtn = document.getElementById('accountBtn');
  const authModal = document.getElementById('authModal');
  const closeAuthModal = document.getElementById('closeAuthModal');
  const authForm = document.getElementById('authForm');
  
  if (accountBtn && authModal) {
    accountBtn.addEventListener('click', function() {
      authModal.classList.remove('hidden');
    });
  }
  
  if (closeAuthModal && authModal) {
    closeAuthModal.addEventListener('click', function() {
      authModal.classList.add('hidden');
    });
  }
  
  if (authForm && authModal) {
    authForm.addEventListener('submit', function(e) {
      e.preventDefault();
      authModal.classList.add('hidden');
      showToast('Signed in successfully!');
    });
  }
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const nav = document.querySelector('.nav');
      if (nav) {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
      }
    });
  }
  
  // Initialize homepage
  renderHomepage();
  showPage('homepage');
});