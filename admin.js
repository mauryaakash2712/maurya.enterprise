// Complete Admin Panel JavaScript - admin.js

// Admin Data Manager
class AdminDataManager {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        if (!localStorage.getItem('mtechCategories')) {
            const defaultCategories = [
                {"id": 1, "name": "Smartphones", "image": "📱", "count": 0},
                {"id": 2, "name": "Laptops", "image": "💻", "count": 0},
                {"id": 3, "name": "Tablets", "image": "📱", "count": 0},
                {"id": 4, "name": "Audio", "image": "🎧", "count": 0},
                {"id": 5, "name": "Gaming", "image": "🎮", "count": 0},
                {"id": 6, "name": "Accessories", "image": "🔌", "count": 0}
            ];
            localStorage.setItem('mtechCategories', JSON.stringify(defaultCategories));
        }

        if (!localStorage.getItem('mtechProducts')) {
            const defaultProducts = [
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
                    "description": "The most advanced iPhone ever with titanium design, A17 Pro chip, and professional camera system.",
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
                    "description": "Premium Android smartphone with S Pen, advanced AI features, and exceptional camera capabilities.",
                    "inStock": true,
                    "featured": true,
                    "bestSeller": true
                }
            ];
            localStorage.setItem('mtechProducts', JSON.stringify(defaultProducts));
        }

        if (!localStorage.getItem('mtechOrders')) {
            localStorage.setItem('mtechOrders', JSON.stringify([]));
        }

        this.updateCategoryCounts();
    }

    getCategories() {
        return JSON.parse(localStorage.getItem('mtechCategories')) || [];
    }

    getProducts() {
        return JSON.parse(localStorage.getItem('mtechProducts')) || [];
    }

    getOrders() {
        return JSON.parse(localStorage.getItem('mtechOrders')) || [];
    }

    getUsers() {
        return JSON.parse(localStorage.getItem('mtechUsers')) || [];
    }

    saveProducts(products) {
        localStorage.setItem('mtechProducts', JSON.stringify(products));
        this.updateCategoryCounts();
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = Date.now();
        products.push(product);
        this.saveProducts(products);
        return product.id;
    }

    updateCategoryCounts() {
        const categories = this.getCategories();
        const products = this.getProducts();
        
        categories.forEach(category => {
            category.count = products.filter(product => product.category === category.id).length;
        });
        
        localStorage.setItem('mtechCategories', JSON.stringify(categories));
    }
}

const adminDataManager = new AdminDataManager();

// Customer Management Variables
let allCustomers = [];
let filteredCustomers = [];
let selectedCustomers = [];
let currentCustomer = null;

// Initialize admin app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin app loading...');
    initializeAdminApp();
});

function initializeAdminApp() {
    // Set login time
    document.getElementById('loginTime').textContent = new Date().toLocaleString();
    
    setupAdminNavigation();
    loadDashboard();
    console.log('Admin app initialized successfully');
}

// Setup navigation
function setupAdminNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('Navigation clicked:', this.dataset.section);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.admin-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const sectionId = this.dataset.section;
            const section = document.getElementById(sectionId);
            
            if (section) {
                section.classList.add('active');
                console.log('Showing section:', sectionId);
                
                // Load section-specific content
                switch(sectionId) {
                    case 'dashboard':
                        loadDashboard();
                        break;
                    case 'products':
                        loadProducts();
                        break;
                    case 'add-product':
                        loadAddProductForm();
                        break;
                    case 'categories':
                        loadCategories();
                        break;
                    case 'orders':
                        loadOrders();
                        break;
                    case 'customers':
                        initializeCustomerManagement();
                        break;
                    case 'settings':
                        loadSettings();
                        break;
                }
            } else {
                console.error('Section not found:', sectionId);
            }
        });
    });
}

// Load dashboard
function loadDashboard() {
    const products = adminDataManager.getProducts();
    const categories = adminDataManager.getCategories();
    const users = adminDataManager.getUsers();
    const orders = adminDataManager.getOrders();

    // Update stats
    const totalProducts = document.getElementById('totalProducts');
    const totalCategories = document.getElementById('totalCategories');
    const totalCustomers = document.getElementById('totalCustomers');
    const totalOrders = document.getElementById('totalOrders');

    if (totalProducts) totalProducts.textContent = products.length;
    if (totalCategories) totalCategories.textContent = categories.length;
    if (totalCustomers) totalCustomers.textContent = users.length;
    if (totalOrders) totalOrders.textContent = orders.length;

    // Load recent activity
    loadRecentActivity();
    
    console.log('Dashboard loaded');
}

function loadRecentActivity() {
    const recentActivity = document.getElementById('recentActivity');
    if (!recentActivity) return;
    
    const activities = JSON.parse(localStorage.getItem('mtechUserActivities')) || [];
    const recentActivities = activities.slice(0, 10);
    
    if (recentActivities.length === 0) {
        recentActivity.innerHTML = '<p>No recent activity found.</p>';
        return;
    }
    
    recentActivity.innerHTML = recentActivities.map(activity => `
        <div class="activity-item">
            <div class="activity-time">${new Date(activity.timestamp).toLocaleString()}</div>
            <div class="activity-description">${activity.details}</div>
        </div>
    `).join('');
}

// Load add product form
function loadAddProductForm() {
    console.log('Loading Add Product form');
    
    // Populate category dropdown
    const categorySelect = document.getElementById('productCategory');
    if (categorySelect) {
        const categories = adminDataManager.getCategories();
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    }
    
    // Setup form submission
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        // Remove existing event listeners
        addProductForm.replaceWith(addProductForm.cloneNode(true));
        const newForm = document.getElementById('addProductForm');
        
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddProduct();
        });
    }
}

// Handle add product
function handleAddProduct() {
    console.log('Handling add product');
    
    // Get form data
    const name = document.getElementById('productName')?.value?.trim();
    const brand = document.getElementById('productBrand')?.value?.trim();
    const category = document.getElementById('productCategory')?.value;
    const price = document.getElementById('productPrice')?.value;
    const description = document.getElementById('productDescription')?.value?.trim();
    
    // Validation
    if (!name || !brand || !category || !price || !description) {
        showAdminMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Create product object
    const product = {
        name: name,
        brand: brand,
        category: parseInt(category),
        price: parseFloat(price),
        originalPrice: parseFloat(document.getElementById('productOriginalPrice')?.value) || null,
        rating: parseFloat(document.getElementById('productRating')?.value) || 4.5,
        reviews: parseInt(document.getElementById('productReviews')?.value) || 0,
        image: document.getElementById('productImage')?.value?.trim() || 'https://via.placeholder.com/300x300?text=Product+Image',
        description: description,
        inStock: document.getElementById('productInStock')?.checked || true,
        featured: document.getElementById('productFeatured')?.checked || false,
        bestSeller: document.getElementById('productBestSeller')?.checked || false
    };
    
    try {
        // Add product
        const productId = adminDataManager.addProduct(product);
        
        // Show success message
        showAdminMessage(`Product "${product.name}" added successfully!`, 'success');
        
        // Reset form
        document.getElementById('addProductForm').reset();
        
        // Reload dashboard
        loadDashboard();
        
        console.log('Product added successfully:', productId);
        
    } catch (error) {
        console.error('Error adding product:', error);
        showAdminMessage('Error adding product. Please try again.', 'error');
    }
}

// Load other sections
function loadProducts() {
    console.log('Loading products section');
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const products = adminDataManager.getProducts();
    const categories = adminDataManager.getCategories();
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p>No products found. <a href="#" onclick="showAddProduct()">Add your first product</a></p>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => {
        const category = categories.find(cat => cat.id === product.category);
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-brand">${product.brand}</p>
                    <p class="product-category">${category ? category.name : 'Unknown Category'}</p>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-actions">
                        <button onclick="editProduct(${product.id})" class="admin-btn secondary">Edit</button>
                        <button onclick="deleteProduct(${product.id})" class="admin-btn danger">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function loadCategories() {
    console.log('Loading categories section');
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;
    
    const categories = adminDataManager.getCategories();
    
    categoriesGrid.innerHTML = categories.map(category => `
        <div class="category-card">
            <div class="category-icon">${category.image}</div>
            <h3>${category.name}</h3>
            <p>${category.count} products</p>
            <div class="category-actions">
                <button onclick="editCategory(${category.id})" class="admin-btn secondary">Edit</button>
                <button onclick="deleteCategory(${category.id})" class="admin-btn danger">Delete</button>
            </div>
        </div>
    `).join('');
}

function loadOrders() {
    console.log('Loading orders section');
    const ordersList = document.getElementById('ordersList');
    if (!ordersList) return;
    
    const orders = adminDataManager.getOrders();
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders found.</p>';
        return;
    }
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <h4>Order #${order.id}</h4>
                <span class="order-status">${order.status || 'Processing'}</span>
            </div>
            <p><strong>Customer:</strong> ${order.customer?.name || 'Unknown'}</p>
            <p><strong>Total:</strong> $${order.total || '0.00'}</p>
            <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
            <div class="order-actions">
                <button onclick="viewOrder(${order.id})" class="admin-btn secondary">View</button>
                <button onclick="updateOrderStatus(${order.id})" class="admin-btn primary">Update Status</button>
            </div>
        </div>
    `).join('');
}

function loadSettings() {
    console.log('Loading settings section');
}

// === CUSTOMER MANAGEMENT SYSTEM ===

// Initialize Customer Management
function initializeCustomerManagement() {
    loadCustomers();
    setupCustomerEventListeners();
    console.log('Customer management initialized');
}

function setupCustomerEventListeners() {
    // Search input
    const searchInput = document.getElementById('customerSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchCustomers, 300));
    }
    
    // Customer details modal tabs
    const customerTabs = document.querySelectorAll('.customer-details-tabs .tab-btn');
    customerTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            switchCustomerTab(this.dataset.tab);
        });
    });
    
    // Bulk email form
    const bulkEmailForm = document.getElementById('bulkEmailForm');
    if (bulkEmailForm) {
        bulkEmailForm.addEventListener('submit', handleBulkEmail);
    }
}

// Load Customers from Storage
function loadCustomers() {
    try {
        // Get customers from the customer database created by authentication system
        const customerDatabase = JSON.parse(localStorage.getItem('mtechCustomerDatabase')) || [];
        const userActivities = JSON.parse(localStorage.getItem('mtechUserActivities')) || [];
        const orders = JSON.parse(localStorage.getItem('mtechOrders')) || [];
        
        // Enhance customer data with additional calculations
        allCustomers = customerDatabase.map(customer => {
            // Calculate customer metrics
            const customerOrders = orders.filter(order => 
                order.customer && (
                    order.customer.email === customer.email ||
                    order.customer.id === customer.id
                )
            );
            
            const totalSpent = customerOrders.reduce((sum, order) => sum + (order.total || 0), 0);
            const averageOrderValue = customerOrders.length > 0 ? totalSpent / customerOrders.length : 0;
            
            // Get recent activities
            const customerActivities = userActivities.filter(activity => activity.userId === customer.id);
            const lastActivity = customerActivities.length > 0 ? customerActivities[0].timestamp : null;
            
            // Calculate days since registration
            const regDate = new Date(customer.registrationDate);
            const daysSinceReg = Math.floor((Date.now() - regDate.getTime()) / (1000 * 60 * 60 * 24));
            
            return {
                ...customer,
                totalOrders: customerOrders.length,
                totalSpent: totalSpent,
                averageOrderValue: averageOrderValue,
                lastActivity: lastActivity,
                daysSinceRegistration: daysSinceReg,
                recentOrders: customerOrders.sort((a, b) => new Date(b.orderDate || b.date) - new Date(a.orderDate || a.date)).slice(0, 5),
                isNewCustomer: daysSinceReg <= 30,
                isActive: lastActivity && (Date.now() - new Date(lastActivity).getTime()) <= (30 * 24 * 60 * 60 * 1000) // Active if logged in within 30 days
            };
        });
        
        filteredCustomers = [...allCustomers];
        updateCustomerStats();
        renderCustomersTable();
        loadCustomerActivities();
        
    } catch (error) {
        console.error('Error loading customers:', error);
        showAdminMessage('Error loading customer data', 'error');
    }
}

// Update Customer Statistics
function updateCustomerStats() {
    const totalCustomers = allCustomers.length;
    const verifiedCustomers = allCustomers.filter(c => c.verified || c.mobileVerified).length;
    const newCustomers = allCustomers.filter(c => c.isNewCustomer).length;
    const activeCustomers = allCustomers.filter(c => c.isActive).length;
    
    // Update stat displays
    const totalCustomersCount = document.getElementById('totalCustomersCount');
    const verifiedCustomersCount = document.getElementById('verifiedCustomersCount');
    const newCustomersCount = document.getElementById('newCustomersCount');
    const activeCustomersCount = document.getElementById('activeCustomersCount');
    
    if (totalCustomersCount) totalCustomersCount.textContent = totalCustomers;
    if (verifiedCustomersCount) verifiedCustomersCount.textContent = verifiedCustomers;
    if (newCustomersCount) newCustomersCount.textContent = newCustomers;
    if (activeCustomersCount) activeCustomersCount.textContent = activeCustomers;
}

// Render Customers Table
function renderCustomersTable() {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;
    
    if (filteredCustomers.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 2rem;">
                    <div class="empty-state">
                        <h3>No customers found</h3>
                        <p>No customers match your current filters.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredCustomers.map(customer => `
        <tr class="customer-row" data-customer-id="${customer.id}">
            <td>
                <input type="checkbox" class="customer-checkbox" value="${customer.id}" onchange="toggleCustomerSelection(${customer.id})">
            </td>
            <td>
                <div class="customer-info">
                    <div class="customer-avatar-small">${getCustomerInitials(customer.fullName || customer.firstName + ' ' + customer.lastName)}</div>
                    <div class="customer-details">
                        <div class="customer-name">${customer.fullName || customer.firstName + ' ' + customer.lastName}</div>
                        <div class="customer-meta">ID: ${customer.id}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="email-cell">
                    <span class="email-text">${customer.email}</span>
                    ${customer.emailVerified ? '<span class="verified-badge">✓</span>' : ''}
                </div>
            </td>
            <td>
                <div class="mobile-cell">
                    <span class="mobile-text">${formatMobile(customer.mobile)}</span>
                    ${customer.mobileVerified ? '<span class="verified-badge">✓</span>' : ''}
                </div>
            </td>
            <td>
                <div class="date-cell">
                    <span class="date-text">${formatDate(customer.registrationDate)}</span>
                    <span class="date-meta">${customer.daysSinceRegistration} days ago</span>
                </div>
            </td>
            <td>
                <div class="date-cell">
                    <span class="date-text">${customer.lastLogin ? formatDate(customer.lastLogin) : 'Never'}</span>
                    ${customer.lastLogin ? `<span class="date-meta">${getTimeAgo(customer.lastLogin)}</span>` : ''}
                </div>
            </td>
            <td>
                <div class="status-badges">
                    <span class="status-badge ${customer.status || 'active'}">${getStatusDisplay(customer)}</span>
                    ${customer.isNewCustomer ? '<span class="badge new">NEW</span>' : ''}
                    ${customer.isActive ? '<span class="badge active">ACTIVE</span>' : ''}
                </div>
            </td>
            <td>
                <div class="orders-cell">
                    <span class="orders-count">${customer.totalOrders}</span>
                    <span class="orders-meta">orders</span>
                </div>
            </td>
            <td>
                <div class="amount-cell">
                    <span class="amount-text">$${customer.totalSpent.toFixed(2)}</span>
                    ${customer.averageOrderValue > 0 ? `<span class="amount-meta">avg: $${customer.averageOrderValue.toFixed(2)}</span>` : ''}
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewCustomerDetails(${customer.id})" title="View Details">👁️</button>
                    <button class="action-btn edit-btn" onclick="editCustomer(${customer.id})" title="Edit">✏️</button>
                    <button class="action-btn email-btn" onclick="emailSingleCustomer(${customer.id})" title="Send Email">✉️</button>
                    <button class="action-btn ${customer.status === 'active' ? 'disable-btn' : 'enable-btn'}" 
                            onclick="toggleCustomerStatus(${customer.id})" 
                            title="${customer.status === 'active' ? 'Disable' : 'Enable'}">
                        ${customer.status === 'active' ? '🚫' : '✅'}
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Customer Search
function searchCustomers() {
    const searchTerm = document.getElementById('customerSearch').value.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredCustomers = [...allCustomers];
    } else {
        filteredCustomers = allCustomers.filter(customer => {
            return (
                customer.firstName.toLowerCase().includes(searchTerm) ||
                customer.lastName.toLowerCase().includes(searchTerm) ||
                (customer.fullName && customer.fullName.toLowerCase().includes(searchTerm)) ||
                customer.email.toLowerCase().includes(searchTerm) ||
                (customer.mobile && customer.mobile.includes(searchTerm)) ||
                customer.id.toString().includes(searchTerm)
            );
        });
    }
    
    renderCustomersTable();
}

// Filter Customers
function filterCustomers() {
    const statusFilter = document.getElementById('customerStatus').value;
    let filtered = [...allCustomers];
    
    switch (statusFilter) {
        case 'verified':
            filtered = filtered.filter(c => c.verified || c.mobileVerified);
            break;
        case 'unverified':
            filtered = filtered.filter(c => !c.verified && !c.mobileVerified);
            break;
        case 'active':
            filtered = filtered.filter(c => c.isActive);
            break;
        case 'inactive':
            filtered = filtered.filter(c => !c.isActive);
            break;
        default:
            // All customers
            break;
    }
    
    filteredCustomers = filtered;
    renderCustomersTable();
}

// Sort Customers
function sortCustomers() {
    const sortBy = document.getElementById('customerSort').value;
    
    switch (sortBy) {
        case 'newest':
            filteredCustomers.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
            break;
        case 'oldest':
            filteredCustomers.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate));
            break;
        case 'name':
            filteredCustomers.sort((a, b) => (a.fullName || a.firstName).localeCompare(b.fullName || b.firstName));
            break;
        case 'name-desc':
            filteredCustomers.sort((a, b) => (b.fullName || b.firstName).localeCompare(a.fullName || a.firstName));
            break;
        case 'login':
            filteredCustomers.sort((a, b) => {
                const aDate = a.lastLogin ? new Date(a.lastLogin) : new Date(0);
                const bDate = b.lastLogin ? new Date(b.lastLogin) : new Date(0);
                return bDate - aDate;
            });
            break;
        case 'orders':
            filteredCustomers.sort((a, b) => b.totalOrders - a.totalOrders);
            break;
        default:
            break;
    }
    
    renderCustomersTable();
}

// Clear Filters
function clearCustomerFilters() {
    document.getElementById('customerSearch').value = '';
    document.getElementById('customerStatus').value = 'all';
    document.getElementById('customerSort').value = 'newest';
    filteredCustomers = [...allCustomers];
    renderCustomersTable();
}

// Customer Selection
function toggleCustomerSelection(customerId) {
    const index = selectedCustomers.indexOf(customerId);
    if (index > -1) {
        selectedCustomers.splice(index, 1);
    } else {
        selectedCustomers.push(customerId);
    }
    
    updateBulkActions();
    updateSelectAllCheckbox();
}

function toggleSelectAllCustomers() {
    const selectAll = document.getElementById('selectAllCustomers').checked;
    const checkboxes = document.querySelectorAll('.customer-checkbox');
    
    if (selectAll) {
        selectedCustomers = filteredCustomers.map(c => c.id);
    } else {
        selectedCustomers = [];
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll;
    });
    
    updateBulkActions();
}

function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('selectAllCustomers');
    if (selectedCustomers.length === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedCustomers.length === filteredCustomers.length) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
    }
}

function updateBulkActions() {
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');
    
    if (selectedCustomers.length > 0) {
        bulkActions.style.display = 'flex';
        selectedCount.textContent = selectedCustomers.length;
    } else {
        bulkActions.style.display = 'none';
    }
}

// View Customer Details
function viewCustomerDetails(customerId) {
    const customer = allCustomers.find(c => c.id === customerId);
    if (!customer) return;
    
    currentCustomer = customer;
    populateCustomerDetails(customer);
    document.getElementById('customerDetailsModal').style.display = 'block';
}

function populateCustomerDetails(customer) {
    // Header information
    document.getElementById('customerName').textContent = customer.fullName || `${customer.firstName} ${customer.lastName}`;
    document.getElementById('customerEmail').textContent = customer.email;
    
    // Badges
    const verifiedBadge = document.getElementById('verifiedBadge');
    const activeBadge = document.getElementById('activeBadge');
    
    verifiedBadge.style.display = (customer.verified || customer.mobileVerified) ? 'inline' : 'none';
    activeBadge.style.display = customer.isActive ? 'inline' : 'none';
    
    // Overview tab
    document.getElementById('detailsFullName').textContent = customer.fullName || `${customer.firstName} ${customer.lastName}`;
    document.getElementById('detailsEmail').textContent = customer.email;
    document.getElementById('detailsMobile').textContent = formatMobile(customer.mobile);
    document.getElementById('detailsGender').textContent = customer.gender ? capitalizeFirst(customer.gender) : 'Not specified';
    
    // Account information
    document.getElementById('detailsRegDate').textContent = formatDate(customer.registrationDate);
    document.getElementById('detailsLastLogin').textContent = customer.lastLogin ? formatDate(customer.lastLogin) : 'Never';
    document.getElementById('detailsStatus').textContent = getStatusDisplay(customer);
    document.getElementById('detailsMobileVerified').textContent = customer.mobileVerified ? 'Yes' : 'No';
}

function switchCustomerTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.customer-details-tabs .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab panels
    document.querySelectorAll('.customer-tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

// Load Customer Activities for Main Page
function loadCustomerActivities() {
    const activities = JSON.parse(localStorage.getItem('mtechUserActivities')) || [];
    const recentActivities = activities
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
    
    const activitiesList = document.getElementById('customerActivitiesList');
    if (!activitiesList) return;
    
    if (recentActivities.length === 0) {
        activitiesList.innerHTML = '<div class="activity-item"><p>No customer activities yet.</p></div>';
        return;
    }
    
    activitiesList.innerHTML = recentActivities.map(activity => {
        const customer = allCustomers.find(c => c.id === activity.userId);
        const customerName = customer ? customer.fullName || `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
        
        return `
            <div class="activity-item">
                <div class="activity-avatar">${customer ? getCustomerInitials(customerName) : '?'}</div>
                <div class="activity-content">
                    <div class="activity-text">
                        <strong>${customerName}</strong> ${getActivityDescription(activity.action, activity.details)}
                    </div>
                    <div class="activity-time">${getTimeAgo(activity.timestamp)}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Export Functions
function exportCustomers() {
    const customersToExport = selectedCustomers.length > 0 
        ? allCustomers.filter(c => selectedCustomers.includes(c.id))
        : filteredCustomers;
    
    if (customersToExport.length === 0) {
        showAdminMessage('No customers to export', 'error');
        return;
    }
    
    const csvContent = generateCustomerCSV(customersToExport);
    downloadCSV(csvContent, `customers-export-${new Date().toISOString().split('T')[0]}.csv`);
    showAdminMessage(`Exported ${customersToExport.length} customers successfully`, 'success');
}

function generateCustomerCSV(customers) {
    const headers = [
        'ID', 'First Name', 'Last Name', 'Email', 'Mobile', 'Gender', 'Date of Birth',
        'Registration Date', 'Last Login', 'Login Count', 'Status', 'Email Verified',
        'Mobile Verified', 'Total Orders', 'Total Spent', 'Newsletter'
    ];
    
    const rows = customers.map(customer => [
        customer.id,
        customer.firstName,
        customer.lastName,
        customer.email,
        customer.mobile,
        customer.gender || '',
        customer.dateOfBirth || '',
        customer.registrationDate,
        customer.lastLogin || '',
        customer.loginCount || 0,
        customer.status || 'active',
        customer.emailVerified ? 'Yes' : 'No',
        customer.mobileVerified ? 'Yes' : 'No',
        customer.totalOrders,
        customer.totalSpent.toFixed(2),
        customer.newsletter ? 'Yes' : 'No'
    ]);
    
    return [headers, ...rows].map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ).join('\n');
}

// Bulk Actions
function bulkEmailCustomers() {
    if (selectedCustomers.length === 0) {
        showAdminMessage('Please select customers first', 'error');
        return;
    }
    
    document.getElementById('bulkEmailModal').style.display = 'block';
}

function handleBulkEmail(e) {
    e.preventDefault();
    
    const subject = document.getElementById('emailSubject').value.trim();
    const message = document.getElementById('emailMessage').value.trim();
    
    if (!subject || !message) {
        showAdminMessage('Please fill in all fields', 'error');
        return;
    }
    
    // In a real application, you would send this to your email service
    console.log('Bulk email to be sent:', {
        recipients: selectedCustomers,
        subject: subject,
        message: message
    });
    
    showAdminMessage(`Email queued for ${selectedCustomers.length} customers`, 'success');
    closeBulkEmailModal();
    
    // Log the bulk email action
    selectedCustomers.forEach(customerId => {
        const activities = JSON.parse(localStorage.getItem('mtechUserActivities')) || [];
        activities.unshift({
            id: Date.now() + Math.random(),
            userId: customerId,
            action: 'bulk_email_sent',
            details: `Bulk email: ${subject}`,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('mtechUserActivities', JSON.stringify(activities));
    });
}

function bulkDeleteCustomers() {
    if (selectedCustomers.length === 0) {
        showAdminMessage('Please select customers first', 'error');
        return;
    }
    
    const confirmation = confirm(
        `Are you sure you want to delete ${selectedCustomers.length} customer(s)? ` +
        'This action cannot be undone and will also delete all associated data.'
    );
    
    if (!confirmation) return;
    
    try {
        // Remove customers from all storage locations
        const users = JSON.parse(localStorage.getItem('mtechUsers')) || [];
        const customerDatabase = JSON.parse(localStorage.getItem('mtechCustomerDatabase')) || [];
        const activities = JSON.parse(localStorage.getItem('mtechUserActivities')) || [];
        
        // Filter out deleted customers
        const filteredUsers = users.filter(user => !selectedCustomers.includes(user.id));
        const filteredCustomerDb = customerDatabase.filter(customer => !selectedCustomers.includes(customer.id));
        const filteredActivities = activities.filter(activity => !selectedCustomers.includes(activity.userId));
        
        // Save updated data
        localStorage.setItem('mtechUsers', JSON.stringify(filteredUsers));
        localStorage.setItem('mtechCustomerDatabase', JSON.stringify(filteredCustomerDb));
        localStorage.setItem('mtechUserActivities', JSON.stringify(filteredActivities));
        
        showAdminMessage(`Successfully deleted ${selectedCustomers.length} customers`, 'success');
        
        // Reset selection and reload data
        selectedCustomers = [];
        loadCustomers();
        updateBulkActions();
        
    } catch (error) {
        console.error('Error deleting customers:', error);
        showAdminMessage('Error deleting customers', 'error');
    }
}

// Individual Customer Actions
function editCustomer(customerId) {
    showAdminMessage('Customer editing feature coming soon!', 'info');
}

function emailSingleCustomer(customerId) {
    const customer = allCustomers.find(c => c.id === customerId);
    if (customer) {
        selectedCustomers = [customerId];
        bulkEmailCustomers();
    }
}

function toggleCustomerStatus(customerId) {
    const customer = allCustomers.find(c => c.id === customerId);
    if (!customer) return;
    
    const newStatus = customer.status === 'active' ? 'inactive' : 'active';
    
    try {
        // Update in all storage locations
        const users = JSON.parse(localStorage.getItem('mtechUsers')) || [];
        const customerDatabase = JSON.parse(localStorage.getItem('mtechCustomerDatabase')) || [];
        
        // Update users array
        const userIndex = users.findIndex(u => u.id === customerId);
        if (userIndex !== -1) {
            users[userIndex].status = newStatus;
            localStorage.setItem('mtechUsers', JSON.stringify(users));
        }
        
        // Update customer database
        const customerIndex = customerDatabase.findIndex(c => c.id === customerId);
        if (customerIndex !== -1) {
            customerDatabase[customerIndex].status = newStatus;
            localStorage.setItem('mtechCustomerDatabase', JSON.stringify(customerDatabase));
        }
        
        showAdminMessage(`Customer ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`, 'success');
        loadCustomers();
        
    } catch (error) {
        console.error('Error updating customer status:', error);
        showAdminMessage('Error updating customer status', 'error');
    }
}

// === UTILITY FUNCTIONS ===

// Utility Functions
function getCustomerInitials(name) {
    if (!name) return '??';
    const names = name.split(' ');
    return names.length >= 2 
        ? (names[0][0] + names[1][0]).toUpperCase()
        : name.substring(0, 2).toUpperCase();
}

function formatMobile(mobile) {
    if (!mobile) return 'Not provided';
    // Format as +XX XXXXX XXXXX
    if (mobile.length > 10) {
        const countryCode = mobile.substring(0, mobile.length - 10);
        const number = mobile.substring(mobile.length - 10);
        return `${countryCode} ${number.substring(0, 5)} ${number.substring(5)}`;
    }
    return mobile;
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function getTimeAgo(dateString) {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

function getStatusDisplay(customer) {
    const status = customer.status || 'active';
    const displayStatus = capitalizeFirst(status);
    
    if (!customer.verified && !customer.mobileVerified) {
        return 'Unverified';
    }
    
    return displayStatus;
}

function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getActivityDescription(action, details) {
    const descriptions = {
        'account_created': 'created their account',
        'login': 'logged in',
        'logout': 'logged out',
        'profile_updated': 'updated their profile',
        'mobile_verified': 'verified their mobile number',
        'password_changed': 'changed their password',
        'order_placed': 'placed an order',
        'status_changed': details || 'status was changed',
        'bulk_email_sent': details || 'received a bulk email'
    };
    return descriptions[action] || details || action;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

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

function showAdminMessage(message, type = 'info') {
    // Remove existing messages
    document.querySelectorAll('.admin-toast').forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `admin-toast ${type}-toast`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 10000;
        padding: 1rem 2rem; border-radius: 8px; font-weight: 500;
        max-width: 400px; word-wrap: break-word;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        ${type === 'success' ? 'background: #d4edda; color: #155724; border-left: 4px solid #28a745;' : 
          type === 'error' ? 'background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545;' :
          'background: #cce5ff; color: #004085; border-left: 4px solid #007bff;'}
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// Modal Functions
function closeCustomerDetailsModal() {
    document.getElementById('customerDetailsModal').style.display = 'none';
    currentCustomer = null;
}

function closeBulkEmailModal() {
    document.getElementById('bulkEmailModal').style.display = 'none';
    document.getElementById('bulkEmailForm').reset();
}

// Refresh customers data
function refreshCustomers() {
    loadCustomers();
    showAdminMessage('Customer data refreshed', 'success');
}

function refreshDashboard() {
    loadDashboard();
    showAdminMessage('Dashboard data refreshed', 'success');
}

// Export data
function exportData() {
    showAdminMessage('Export feature coming soon!', 'info');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Helper functions for form management
function resetAddProductForm() {
    const form = document.getElementById('addProductForm');
    if (form) {
        form.reset();
        // Reset checkboxes to default state
        document.getElementById('productInStock').checked = true;
        document.getElementById('productFeatured').checked = false;
        document.getElementById('productBestSeller').checked = false;
    }
}

function resetForm() {
    resetAddProductForm();
}

function previewProduct() {
    showAdminMessage('Product preview feature coming soon!', 'info');
}

// Product management functions
function editProduct(productId) {
    showAdminMessage('Product editing feature coming soon!', 'info');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const products = adminDataManager.getProducts();
        const filteredProducts = products.filter(p => p.id !== productId);
        adminDataManager.saveProducts(filteredProducts);
        loadProducts();
        loadDashboard();
        showAdminMessage('Product deleted successfully', 'success');
    }
}

function showAddProduct() {
    // Switch to add product section
    document.querySelectorAll('.admin-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === 'add-product') {
            link.classList.add('active');
        }
    });
    
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById('add-product').classList.add('active');
    loadAddProductForm();
}

// Category management functions
function editCategory(categoryId) {
    showAdminMessage('Category editing feature coming soon!', 'info');
}

function deleteCategory(categoryId) {
    showAdminMessage('Category deletion feature coming soon!', 'info');
}

function addCategory() {
    showAdminMessage('Add category feature coming soon!', 'info');
}

// Order management functions
function viewOrder(orderId) {
    showAdminMessage('Order viewing feature coming soon!', 'info');
}

function updateOrderStatus(orderId) {
    showAdminMessage('Order status update feature coming soon!', 'info');
}

function exportOrders() {
    showAdminMessage('Order export feature coming soon!', 'info');
}

function exportProducts() {
    showAdminMessage('Product export feature coming soon!', 'info');
}

// Global access functions
window.searchCustomers = searchCustomers;
window.filterCustomers = filterCustomers;
window.sortCustomers = sortCustomers;
window.clearCustomerFilters = clearCustomerFilters;
window.toggleCustomerSelection = toggleCustomerSelection;
window.toggleSelectAllCustomers = toggleSelectAllCustomers;
window.viewCustomerDetails = viewCustomerDetails;
window.editCustomer = editCustomer;
window.emailSingleCustomer = emailSingleCustomer;
window.toggleCustomerStatus = toggleCustomerStatus;
window.exportCustomers = exportCustomers;
window.bulkEmailCustomers = bulkEmailCustomers;
window.bulkDeleteCustomers = bulkDeleteCustomers;
window.closeCustomerDetailsModal = closeCustomerDetailsModal;
window.closeBulkEmailModal = closeBulkEmailModal;
window.refreshCustomers = refreshCustomers;
window.refreshDashboard = refreshDashboard;
