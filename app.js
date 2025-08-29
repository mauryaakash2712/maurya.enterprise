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
    ]
};

// Application State
let cart = JSON.parse(localStorage.getItem('mtechCart')) || [];
let currentView = 'home';
let filteredProducts = [];

// DOM Elements
const categoriesGrid = document.getElementById('categoriesGrid');
const featuredProducts = document.getElementById('featuredProducts');
const bestSellers = document.getElementById('bestSellers');
const cartCount = document.getElementById('cartCount');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productModal = document.getElementById('productModal');
const closeModal = document.getElementById('closeModal');
const productDetails = document.getElementById('productDetails');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkoutForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadCategories();
    loadFeaturedProducts();
    loadBestSellers();
    updateCartUI();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    closeModal.addEventListener('click', closeProductModal);
    closeCheckout.addEventListener('click', closeCheckoutModal);
    checkoutBtn.addEventListener('click', openCheckout);
    checkoutForm.addEventListener('submit', handleCheckout);
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeProductModal();
        }
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });
}

// Load Categories
function loadCategories() {
    categoriesGrid.innerHTML = '';
    appData.categories.forEach(category => {
        const categoryCard = createCategoryCard(category);
        categoriesGrid.appendChild(categoryCard);
    });
}

// Create Category Card
function createCategoryCard(category) {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
        <div class="category-icon">${category.image}</div>
        <h3 class="category-name">${category.name}</h3>
        <p class="category-count">${category.count} products</p>
    `;
    card.addEventListener('click', () => showCategoryProducts(category.id));
    return card;
}

// Load Featured Products
function loadFeaturedProducts() {
    const featured = appData.products.filter(product => product.featured);
    featuredProducts.innerHTML = '';
    featured.forEach(product => {
        const productCard = createProductCard(product);
        featuredProducts.appendChild(productCard);
    });
}

// Load Best Sellers
function loadBestSellers() {
    const bestSellerProducts = appData.products.filter(product => product.bestSeller);
    bestSellers.innerHTML = '';
    bestSellerProducts.forEach(product => {
        const productCard = createProductCard(product);
        bestSellers.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discount = product.originalPrice > product.price ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-brand">${product.brand}</p>
            <div class="product-rating">
                <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                <span>(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="current-price">$${product.price}</span>
                ${product.originalPrice > product.price ? 
                    `<span class="original-price">$${product.originalPrice}</span>
                     <span class="discount">${discount}% off</span>` : ''}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    `;
    
    card.addEventListener('click', (e) => {
        if (!e.target.classList.contains('add-to-cart')) {
            showProductDetails(product.id);
        }
    });
    
    return card;
}

// Show Category Products
function showCategoryProducts(categoryId) {
    const categoryProducts = appData.products.filter(product => product.category === categoryId);
    const category = appData.categories.find(cat => cat.id === categoryId);
    
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.categories').style.display = 'none';
    document.querySelector('.featured-products').style.display = 'none';
    document.querySelector('.best-sellers').style.display = 'none';
    
    let categorySection = document.getElementById('categorySection');
    if (!categorySection) {
        categorySection = document.createElement('section');
        categorySection.id = 'categorySection';
        categorySection.className = 'category-section';
        document.querySelector('.main').appendChild(categorySection);
    }
    
    categorySection.innerHTML = `
        <div class="container">
            <div class="category-header">
                <button class="back-btn" onclick="goHome()">← Back to Home</button>
                <h2 class="section-title">${category.name}</h2>
            </div>
            <div class="products-grid" id="categoryProducts"></div>
        </div>
    `;
    
    const categoryProductsGrid = document.getElementById('categoryProducts');
    categoryProducts.forEach(product => {
        const productCard = createProductCard(product);
        categoryProductsGrid.appendChild(productCard);
    });
    
    categorySection.style.display = 'block';
    currentView = 'category';
}

// Go Home
function goHome() {
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.categories').style.display = 'block';
    document.querySelector('.featured-products').style.display = 'block';
    document.querySelector('.best-sellers').style.display = 'block';
    
    const categorySection = document.getElementById('categorySection');
    if (categorySection) {
        categorySection.style.display = 'none';
    }
    
    const searchSection = document.getElementById('searchSection');
    if (searchSection) {
        searchSection.style.display = 'none';
    }
    
    currentView = 'home';
    
    // Update active nav link
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('[data-page="home"]').classList.add('active');
}

// Handle Navigation
function handleNavigation(e) {
    e.preventDefault();
    navLinks.forEach(link => link.classList.remove('active'));
    e.target.classList.add('active');
    
    if (e.target.dataset.page === 'home') {
        goHome();
    } else if (e.target.dataset.category) {
        showCategoryProducts(parseInt(e.target.dataset.category));
    }
}

// Handle Search
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;
    
    const searchResults = appData.products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    
    showSearchResults(query, searchResults);
}

// Show Search Results
function showSearchResults(query, results) {
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.categories').style.display = 'none';
    document.querySelector('.featured-products').style.display = 'none';
    document.querySelector('.best-sellers').style.display = 'none';
    
    const categorySection = document.getElementById('categorySection');
    if (categorySection) {
        categorySection.style.display = 'none';
    }
    
    let searchSection = document.getElementById('searchSection');
    if (!searchSection) {
        searchSection = document.createElement('section');
        searchSection.id = 'searchSection';
        searchSection.className = 'search-section';
        document.querySelector('.main').appendChild(searchSection);
    }
    
    searchSection.innerHTML = `
        <div class="container">
            <div class="search-header">
                <button class="back-btn" onclick="goHome()">← Back to Home</button>
                <h2 class="section-title">Search Results for "${query}"</h2>
                <p>${results.length} products found</p>
            </div>
            <div class="products-grid" id="searchResults"></div>
        </div>
    `;
    
    const searchResultsGrid = document.getElementById('searchResults');
    if (results.length === 0) {
        searchResultsGrid.innerHTML = `
            <div class="empty-state">
                <h3>No products found</h3>
                <p>Try searching with different keywords</p>
            </div>
        `;
    } else {
        results.forEach(product => {
            const productCard = createProductCard(product);
            searchResultsGrid.appendChild(productCard);
        });
    }
    
    searchSection.style.display = 'block';
    currentView = 'search';
}

// Show Product Details
function showProductDetails(productId) {
    const product = appData.products.find(p => p.id === productId);
    if (!product) return;
    
    const reviews = appData.reviews.filter(review => review.productId === productId);
    
    productDetails.innerHTML = `
        <div class="product-detail-content">
            <div class="product-images">
                <img src="${product.image}" alt="${product.name}" class="main-product-image">
            </div>
            <div class="product-info-detail">
                <h2>${product.name}</h2>
                <p class="brand">by ${product.brand}</p>
                <div class="rating">
                    <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5-Math.floor(product.rating))}</span>
                    <span>${product.rating} (${product.reviews} reviews)</span>
                </div>
                <div class="price-section">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <div class="description">
                    <h3>Description</h3>
                    <p>${product.description}</p>
                </div>
                <div class="specifications">
                    <h3>Specifications</h3>
                    <div class="specs-grid">
                        ${Object.entries(product.specifications).map(([key, value]) => 
                            `<div class="spec-item">
                                <strong>${key}:</strong> ${value}
                            </div>`
                        ).join('')}
                    </div>
                </div>
                <div class="actions">
                    <button class="add-to-cart-detail" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        </div>
        ${reviews.length > 0 ? `
            <div class="reviews-section">
                <h3>Customer Reviews</h3>
                <div class="reviews-list">
                    ${reviews.map(review => `
                        <div class="review">
                            <div class="review-header">
                                <strong>${review.user}</strong>
                                <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
                            </div>
                            <p>${review.comment}</p>
                            <small>${new Date(review.date).toLocaleDateString()}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : ''}
    `;
    
    productModal.style.display = 'block';
}

// Close Product Modal
function closeProductModal() {
    productModal.style.display = 'none';
}

// Add to Cart
function addToCart(productId) {
    const product = appData.products.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCart();
    showSuccessMessage('Product added to cart!');
}

// Update Cart UI
function updateCartUI() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity" value="${item.quantity}" min="1" 
                           onchange="updateQuantity(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
    }
}

// Update Quantity
function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCartUI();
        saveCart();
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCart();
}

// Save Cart
function saveCart() {
    localStorage.setItem('mtechCart', JSON.stringify(cart));
}

// Open Cart
function openCart() {
    cartSidebar.classList.add('open');
}

// Close Cart Sidebar
function closeCartSidebar() {
    cartSidebar.classList.remove('open');
}

// Open Checkout
function openCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Populate order summary
    const summaryItems = document.getElementById('summaryItems');
    const summaryTotal = document.getElementById('summaryTotal');
    
    summaryItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        summaryItems.appendChild(summaryItem);
        total += item.price * item.quantity;
    });
    
    summaryTotal.textContent = total.toFixed(2);
    
    closeCartSidebar();
    checkoutModal.style.display = 'block';
}

// Close Checkout Modal
function closeCheckoutModal() {
    checkoutModal.style.display = 'none';
}

// Handle Checkout
function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(checkoutForm);
    const orderData = {
        customer: {
            name: formData.get('customerName') || document.getElementById('customerName').value,
            email: formData.get('customerEmail') || document.getElementById('customerEmail').value,
            phone: formData.get('customerPhone') || document.getElementById('customerPhone').value,
            address: formData.get('customerAddress') || document.getElementById('customerAddress').value
        },
        paymentMethod: formData.get('paymentMethod') || document.getElementById('paymentMethod').value,
        items: [...cart],
        total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        orderDate: new Date().toISOString(),
        orderId: 'MTech-' + Date.now()
    };
    
    // Simulate order processing
    const placeOrderBtn = document.querySelector('.place-order-btn');
    placeOrderBtn.textContent = 'Processing...';
    placeOrderBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Order placed successfully! Order ID: ${orderData.orderId}`);
        cart = [];
        updateCartUI();
        saveCart();
        closeCheckoutModal();
        checkoutForm.reset();
        placeOrderBtn.textContent = 'Place Order';
        placeOrderBtn.disabled = false;
    }, 2000);
}

// Show Success Message
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.position = 'fixed';
    successDiv.style.top = '20px';
    successDiv.style.right = '20px';
    successDiv.style.zIndex = '9999';
    successDiv.style.padding = '1rem 2rem';
    successDiv.style.background = '#28a745';
    successDiv.style.color = 'white';
    successDiv.style.borderRadius = '6px';
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Additional utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '☆' : '') + 
           '☆'.repeat(emptyStars);
}

// Initialize search category dropdown
document.addEventListener('DOMContentLoaded', function() {
    const searchCategory = document.getElementById('searchCategory');
    if (searchCategory) {
        appData.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            searchCategory.appendChild(option);
        });
    }
});
