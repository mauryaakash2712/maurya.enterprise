// MTech Electronics Store - Frontend Application
// Copyright © 2025 Maurya Enterprises. All rights reserved.

// Application Data
const appData = {
  products: [
    {
      id: 1,
      name: "Arduino UNO R3 Original",
      category: "arduino",
      price: 1844.00,
      originalPrice: 2000.00,
      image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=300",
      rating: 4.8,
      reviews: 342,
      description: "The Arduino UNO R3 is a microcontroller board based on the ATmega328P. It's the perfect board for learning electronics and programming.",
      specifications: {
        microcontroller: "ATmega328P",
        voltage: "5V",
        digitalPins: "14",
        analogPins: "6",
        clockSpeed: "16 MHz"
      },
      inStock: true,
      stockCount: 156
    },
    {
      id: 2,
      name: "Raspberry Pi 4 Model B 8GB",
      category: "raspberry-pi",
      price: 8500.00,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300",
      rating: 4.9,
      reviews: 289,
      description: "Latest Raspberry Pi 4 with 8GB RAM for advanced computing projects. Perfect for IoT, media centers, and learning programming.",
      specifications: {
        ram: "8GB LPDDR4",
        processor: "Quad-core ARM Cortex-A72",
        connectivity: "Wi-Fi, Bluetooth, Gigabit Ethernet",
        ports: "2x micro-HDMI, 4x USB"
      },
      inStock: true,
      stockCount: 89
    },
    {
      id: 3,
      name: "ESP32 DevKit V1 WiFi + Bluetooth",
      category: "development-boards",
      price: 650.00,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300",
      rating: 4.7,
      reviews: 456,
      description: "ESP32 development board with WiFi and Bluetooth capabilities. Ideal for IoT projects and wireless communication.",
      specifications: {
        processor: "Dual-core Tensilica LX6",
        frequency: "240MHz",
        wifi: "802.11 b/g/n",
        bluetooth: "v4.2 BR/EDR and BLE"
      },
      inStock: true,
      stockCount: 245
    },
    {
      id: 4,
      name: "HC-SR04 Ultrasonic Sensor",
      category: "sensors",
      price: 85.00,
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300",
      rating: 4.6,
      reviews: 567,
      description: "Ultrasonic distance sensor for Arduino and other microcontrollers. Perfect for distance measurement projects.",
      specifications: {
        range: "2cm - 400cm",
        accuracy: "3mm",
        voltage: "5V DC",
        current: "15mA"
      },
      inStock: true,
      stockCount: 389
    },
    {
      id: 5,
      name: "SG90 Micro Servo Motor",
      category: "motors",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300",
      rating: 4.5,
      reviews: 234,
      description: "9g micro servo motor for robotics and automation projects. High torque and precision control.",
      specifications: {
        weight: "9g",
        torque: "1.8kg/cm",
        speed: "0.1s/60°",
        voltage: "4.8V - 6V"
      },
      inStock: true,
      stockCount: 456
    },
    {
      id: 6,
      name: "DHT22 Temperature Humidity Sensor",
      category: "sensors",
      price: 280.00,
      image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300",
      rating: 4.7,
      reviews: 312,
      description: "High precision digital temperature and humidity sensor for environmental monitoring projects.",
      specifications: {
        temperature: "-40°C to +125°C",
        humidity: "0-100% RH",
        accuracy: "±0.5°C, ±2% RH",
        interface: "Digital"
      },
      inStock: true,
      stockCount: 178
    },
    {
      id: 7,
      name: "L293D Motor Driver IC",
      category: "electronic-components",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300",
      rating: 4.4,
      reviews: 445,
      description: "Dual H-bridge motor driver for controlling DC motors. Essential for robotics projects.",
      specifications: {
        channels: "2",
        voltage: "4.5V - 36V",
        current: "600mA per channel",
        package: "16-pin DIP"
      },
      inStock: true,
      stockCount: 567
    },
    {
      id: 8,
      name: "Arduino Starter Kit Complete",
      category: "kits",
      price: 3500.00,
      originalPrice: 4000.00,
      image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300",
      rating: 4.9,
      reviews: 189,
      description: "Complete Arduino starter kit with components and project guide. Perfect for beginners and students.",
      specifications: {
        includes: "Arduino UNO, Breadboard, LEDs, Resistors, Sensors",
        projects: "15+ guided projects",
        components: "100+ pieces",
        guide: "English manual included"
      },
      inStock: true,
      stockCount: 67
    }
  ],
  categories: [
    {id: "arduino", name: "Arduino", icon: "🔧", count: 45},
    {id: "raspberry-pi", name: "Raspberry Pi", icon: "🥧", count: 23},
    {id: "sensors", name: "Sensors", icon: "📡", count: 89},
    {id: "motors", name: "Motors", icon: "⚙️", count: 34},
    {id: "electronic-components", name: "Components", icon: "🔌", count: 156},
    {id: "development-boards", name: "Dev Boards", icon: "💻", count: 67},
    {id: "kits", name: "Starter Kits", icon: "📦", count: 28},
    {id: "iot", name: "IoT Modules", icon: "🌐", count: 42}
  ],
  featuredProducts: [1, 2, 3, 8],
  user: {
    id: null,
    name: "",
    email: "",
    isLoggedIn: false
  },
  cart: [],
  orders: []
};

// Application State
let currentPage = 'home';
let currentProducts = [...appData.products];
let currentFilters = {
  category: '',
  search: '',
  sort: 'rating'
};

// Configuration
const config = {
  API_BASE_URL: 'http://localhost:3000/api',
  ITEMS_PER_PAGE: 12,
  enableWishlist: true,
  enableReviews: true,
  enableCoupons: true,
  enableGuestCheckout: false
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  setupEventListeners();
  loadInitialData();
});

function initializeApp() {
  console.log('MTech Electronics Store - Initializing...');

  // Load cart from localStorage
  const savedCart = localStorage.getItem('mtech_cart');
  if (savedCart) {
    appData.cart = JSON.parse(savedCart);
    updateCartCount();
  }

  // Load user from localStorage
  const savedUser = localStorage.getItem('mtech_user');
  if (savedUser) {
    appData.user = JSON.parse(savedUser);
    updateUserInterface();
  }

  // Set initial page
  showPage('home');
}

function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');

  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        handleSearch();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
  }

  // Cart functionality
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', showCartModal);
  }

  // User functionality
  const userBtn = document.getElementById('userBtn');
  if (userBtn) {
    userBtn.addEventListener('click', handleUserAction);
  }

  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  // Category and sort filters
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');

  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleCategoryFilter);
  }

  if (sortFilter) {
    sortFilter.addEventListener('change', handleSortFilter);
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
  }

  // Form submissions
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const contactForm = document.getElementById('contactForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }

  // Close modals on outside click
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      closeModal(event.target.id);
    }
  });

  // Close modals on escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const openModal = document.querySelector('.modal.show');
      if (openModal) {
        closeModal(openModal.id);
      }
    }
  });
}

function loadInitialData() {
  loadCategories();
  loadFeaturedProducts();
  loadAllProducts();
}

// Page Navigation
function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => page.classList.remove('active'));

  // Show selected page
  const targetPage = document.getElementById(pageId + 'Page');
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = pageId;

    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => link.classList.remove('active'));

    const activeNavLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }

    // Close mobile menu
    closeMobileMenu();

    // Load page-specific data
    if (pageId === 'products') {
      loadAllProducts();
    } else if (pageId === 'categories') {
      loadDetailedCategories();
    }
  }
}

// Product Loading Functions
function loadCategories() {
  const categoriesGrid = document.getElementById('categoriesGrid');
  if (!categoriesGrid) return;

  categoriesGrid.innerHTML = '';

  appData.categories.forEach(category => {
    const categoryCard = createCategoryCard(category);
    categoriesGrid.appendChild(categoryCard);
  });

  // Also populate category filter dropdown
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    appData.categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categoryFilter.appendChild(option);
    });
  }
}

function loadFeaturedProducts() {
  const featuredGrid = document.getElementById('featuredProductsGrid');
  if (!featuredGrid) return;

  featuredGrid.innerHTML = '';

  const featuredProducts = appData.products.filter(product => 
    appData.featuredProducts.includes(product.id)
  );

  featuredProducts.forEach(product => {
    const productCard = createProductCard(product);
    featuredGrid.appendChild(productCard);
  });
}

function loadAllProducts() {
  const productsGrid = document.getElementById('allProductsGrid');
  if (!productsGrid) return;

  productsGrid.innerHTML = '';

  // Apply filters
  let filteredProducts = [...appData.products];

  if (currentFilters.category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category === currentFilters.category
    );
  }

  if (currentFilters.search) {
    const searchTerm = currentFilters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (currentFilters.sort) {
      case 'price_low':
        return a.price - b.price;
      case 'price_high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return b.rating - a.rating;
    }
  });

  currentProducts = filteredProducts;

  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });

  // Show no products message if empty
  if (filteredProducts.length === 0) {
    const noProducts = document.createElement('div');
    noProducts.className = 'no-products';
    noProducts.innerHTML = `
      <div class="no-products-content">
        <i class="fas fa-search"></i>
        <h3>No products found</h3>
        <p>Try adjusting your search criteria or browse our categories</p>
        <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
      </div>
    `;
    productsGrid.appendChild(noProducts);
  }
}

function loadDetailedCategories() {
  const detailedGrid = document.getElementById('detailedCategoriesGrid');
  if (!detailedGrid) return;

  detailedGrid.innerHTML = '';

  appData.categories.forEach(category => {
    const categoryProducts = appData.products.filter(p => p.category === category.id);
    const detailedCard = createDetailedCategoryCard(category, categoryProducts);
    detailedGrid.appendChild(detailedCard);
  });
}

// Card Creation Functions
function createCategoryCard(category) {
  const card = document.createElement('div');
  card.className = 'category-card';
  card.innerHTML = `
    <div class="category-icon">${category.icon}</div>
    <h3 class="category-name">${category.name}</h3>
    <p class="category-count">${category.count} items</p>
  `;

  card.addEventListener('click', () => {
    currentFilters.category = category.id;
    showPage('products');
    updateFiltersUI();
    loadAllProducts();
  });

  return card;
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      ${discount > 0 ? `<div class="product-badge">${discount}% OFF</div>` : ''}
      ${!product.inStock ? '<div class="product-badge out-of-stock">Out of Stock</div>' : ''}
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <div class="product-rating">
        ${createStarRating(product.rating)}
        <span class="rating-count">(${product.reviews})</span>
      </div>
      <p class="product-description">${product.description.substring(0, 100)}...</p>
      <div class="product-price">
        <span class="current-price">₹${product.price.toFixed(2)}</span>
        ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toFixed(2)}</span>` : ''}
      </div>
      <div class="product-actions">
        <button class="btn btn-primary" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
          <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
        <button class="btn btn-outline" onclick="showProductDetails(${product.id})">
          <i class="fas fa-eye"></i> View Details
        </button>
      </div>
    </div>
  `;

  return card;
}

function createDetailedCategoryCard(category, products) {
  const card = document.createElement('div');
  card.className = 'category-detailed-card';

  const sampleProducts = products.slice(0, 3);

  card.innerHTML = `
    <div class="category-header">
      <div class="category-icon">${category.icon}</div>
      <div class="category-info">
        <h3>${category.name}</h3>
        <p>${products.length} products available</p>
      </div>
    </div>
    <div class="category-products">
      ${sampleProducts.map(product => `
        <div class="category-product-item">
          <img src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <h4>${product.name}</h4>
            <span class="price">₹${product.price.toFixed(2)}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="category-actions">
      <button class="btn btn-primary" onclick="browseCategory('${category.id}')">
        Browse All ${category.name}
      </button>
    </div>
  `;

  return card;
}

function createStarRating(rating) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push('<i class="fas fa-star"></i>');
  }

  if (hasHalfStar) {
    stars.push('<i class="fas fa-star-half-alt"></i>');
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push('<i class="far fa-star"></i>');
  }

  return `<div class="stars">${stars.join('')}</div>`;
}

// Search and Filter Functions
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput ? searchInput.value.trim() : '';

  currentFilters.search = searchTerm;

  if (currentPage !== 'products') {
    showPage('products');
  }

  loadAllProducts();
}

function handleCategoryFilter() {
  const categoryFilter = document.getElementById('categoryFilter');
  currentFilters.category = categoryFilter ? categoryFilter.value : '';
  loadAllProducts();
}

function handleSortFilter() {
  const sortFilter = document.getElementById('sortFilter');
  currentFilters.sort = sortFilter ? sortFilter.value : 'rating';
  loadAllProducts();
}

function clearFilters() {
  currentFilters = {
    category: '',
    search: '',
    sort: 'rating'
  };

  updateFiltersUI();
  loadAllProducts();
}

function updateFiltersUI() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');

  if (searchInput) searchInput.value = currentFilters.search;
  if (categoryFilter) categoryFilter.value = currentFilters.category;
  if (sortFilter) sortFilter.value = currentFilters.sort;
}

function browseCategory(categoryId) {
  currentFilters.category = categoryId;
  showPage('products');
  updateFiltersUI();
  loadAllProducts();
}

// Shopping Cart Functions
function addToCart(productId) {
  const product = appData.products.find(p => p.id === productId);
  if (!product || !product.inStock) return;

  const existingItem = appData.cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    appData.cart.push({
      productId: productId,
      quantity: 1,
      addedAt: new Date().toISOString()
    });
  }

  saveCartToLocalStorage();
  updateCartCount();
  showToast(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
  const index = appData.cart.findIndex(item => item.productId === productId);
  if (index > -1) {
    const product = appData.products.find(p => p.id === productId);
    appData.cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCartCount();
    loadCartItems();
    showToast(`${product.name} removed from cart`, 'info');
  }
}

function updateCartItemQuantity(productId, quantity) {
  const item = appData.cart.find(item => item.productId === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCartToLocalStorage();
      updateCartCount();
      loadCartItems();
    }
  }
}

function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
    const totalItems = appData.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem('mtech_cart', JSON.stringify(appData.cart));
}

function showCartModal() {
  loadCartItems();
  showModal('cartModal');
}

function loadCartItems() {
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  if (!cartItemsContainer || !cartTotal) return;

  if (appData.cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
      </div>
    `;
    cartTotal.textContent = '0.00';
    return;
  }

  let total = 0;
  cartItemsContainer.innerHTML = '';

  appData.cart.forEach(cartItem => {
    const product = appData.products.find(p => p.id === cartItem.productId);
    if (!product) return;

    const itemTotal = product.price * cartItem.quantity;
    total += itemTotal;

    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';
    cartItemElement.innerHTML = `
      <div class="cart-item-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="cart-item-info">
        <h4 class="cart-item-name">${product.name}</h4>
        <p class="cart-item-price">₹${product.price.toFixed(2)} each</p>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn" onclick="updateCartItemQuantity(${product.id}, ${cartItem.quantity - 1})">-</button>
        <span class="quantity">${cartItem.quantity}</span>
        <button class="quantity-btn" onclick="updateCartItemQuantity(${product.id}, ${cartItem.quantity + 1})">+</button>
      </div>
      <div class="cart-item-total">
        <span>₹${itemTotal.toFixed(2)}</span>
        <button class="remove-btn" onclick="removeFromCart(${product.id})" title="Remove item">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Product Details
function showProductDetails(productId) {
  const product = appData.products.find(p => p.id === productId);
  if (!product) return;

  const modalTitle = document.getElementById('productModalTitle');
  const modalContent = document.getElementById('productModalContent');

  if (modalTitle) {
    modalTitle.textContent = product.name;
  }

  if (modalContent) {
    modalContent.innerHTML = `
      <div class="product-detail-layout">
        <div class="product-detail-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
          <div class="product-rating">
            ${createStarRating(product.rating)}
            <span class="rating-count">(${product.reviews} reviews)</span>
          </div>
          <div class="product-price">
            <span class="current-price">₹${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <div class="product-description">
            <p>${product.description}</p>
          </div>
          <div class="product-stock">
            ${product.inStock ? 
              `<span class="in-stock"><i class="fas fa-check"></i> In Stock (${product.stockCount} available)</span>` :
              '<span class="out-of-stock"><i class="fas fa-times"></i> Out of Stock</span>'
            }
          </div>
          <div class="product-specifications">
            <h4>Specifications:</h4>
            <ul>
              ${Object.entries(product.specifications).map(([key, value]) => 
                `<li><strong>${key}:</strong> ${value}</li>`
              ).join('')}
            </ul>
          </div>
          <div class="product-actions">
            <button class="btn btn-primary btn-large" onclick="addToCart(${product.id}); closeModal('productModal')" ${!product.inStock ? 'disabled' : ''}>
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  showModal('productModal');
}

// User Authentication
function handleUserAction() {
  if (appData.user.isLoggedIn) {
    showUserMenu();
  } else {
    showLoginModal();
  }
}

function showLoginModal() {
  showModal('loginModal');
}

function showRegisterModal() {
  closeModal('loginModal');
  showModal('registerModal');
}

function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  // Simple validation for demo
  if (email && password) {
    // Simulate successful login
    appData.user = {
      id: 1,
      name: email.split('@')[0],
      email: email,
      isLoggedIn: true
    };

    saveUserToLocalStorage();
    updateUserInterface();
    closeModal('loginModal');
    showToast('Login successful!', 'success');
  } else {
    showToast('Please fill in all fields', 'error');
  }
}

function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!name || !email || !password || !confirmPassword) {
    showToast('Please fill in all fields', 'error');
    return;
  }

  if (password !== confirmPassword) {
    showToast('Passwords do not match', 'error');
    return;
  }

  // Simulate successful registration
  appData.user = {
    id: 1,
    name: name,
    email: email,
    isLoggedIn: true
  };

  saveUserToLocalStorage();
  updateUserInterface();
  closeModal('registerModal');
  showToast('Registration successful!', 'success');
}

function logout() {
  appData.user = {
    id: null,
    name: "",
    email: "",
    isLoggedIn: false
  };

  localStorage.removeItem('mtech_user');
  updateUserInterface();
  showToast('Logged out successfully', 'info');
}

function saveUserToLocalStorage() {
  localStorage.setItem('mtech_user', JSON.stringify(appData.user));
}

function updateUserInterface() {
  const userBtn = document.getElementById('userBtn');
  if (userBtn) {
    if (appData.user.isLoggedIn) {
      userBtn.innerHTML = `<i class="fas fa-user-check"></i>`;
      userBtn.title = `Logged in as ${appData.user.name}`;
    } else {
      userBtn.innerHTML = `<i class="fas fa-user"></i>`;
      userBtn.title = 'Login';
    }
  }
}

function showUserMenu() {
  // Simple user menu implementation
  const options = ['Profile', 'Orders', 'Logout'];
  const choice = prompt(`Hello ${appData.user.name}!

Choose an option:
1. Profile
2. Orders
3. Logout`);

  if (choice === '3') {
    logout();
  }
}

// Contact Form
function handleContactForm(event) {
  event.preventDefault();

  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value;

  if (name && email && subject && message) {
    // Simulate form submission
    showToast('Message sent successfully! We will get back to you soon.', 'success');
    event.target.reset();
  } else {
    showToast('Please fill in all fields', 'error');
  }
}

// Modal Functions
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }
}

// Mobile Menu
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('show');
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('show');
  }
}

// Toast Notifications
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
      hideToast();
    }, 3000);
  }
}

function hideToast() {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.className = 'toast';
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function formatPrice(price) {
  return `₹${price.toFixed(2)}`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-IN');
}

// Loading States
function showLoading() {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    spinner.classList.add('show');
  }
}

function hideLoading() {
  const spinner = document.getElementById('loadingSpinner');
  if (spinner) {
    spinner.classList.remove('show');
  }
}

// Error Handling
window.addEventListener('error', function(event) {
  console.error('MTech App Error:', event.error);
  showToast('An error occurred. Please refresh the page.', 'error');
});

console.log('MTech Electronics Store - Frontend loaded successfully!');
console.log('© 2025 Maurya Enterprises. All rights reserved.');