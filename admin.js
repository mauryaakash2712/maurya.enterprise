// Quick Fix for Admin Navigation - Replace your admin.js with this working version

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

// Initialize admin app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin app loading...');
    initializeAdminApp();
});

function initializeAdminApp() {
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
                        loadCustomers();
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

    console.log('Dashboard loaded');
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
        alert('Please fill in all required fields');
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
        alert(`Product "${product.name}" added successfully!`);
        
        // Reset form
        document.getElementById('addProductForm').reset();
        
        // Reload dashboard
        loadDashboard();
        
        console.log('Product added successfully:', productId);
        
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product. Please try again.');
    }
}

// Load other sections (simplified)
function loadProducts() {
    console.log('Loading products section');
}

function loadCategories() {
    console.log('Loading categories section');
}

function loadOrders() {
    console.log('Loading orders section');
}

function loadCustomers() {
    console.log('Loading customers section');
}
