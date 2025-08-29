// Fixed Admin.js - Clean Version
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

saveCategories(categories) {
    localStorage.setItem('mtechCategories', JSON.stringify(categories));
    this.updateCategoryCounts();
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
    this.logActivity(`Added new product: ${product.name}`);
    return product.id;
}

updateProduct(productId, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id == productId);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct, id: productId };
        this.saveProducts(products);
        this.logActivity(`Updated product: ${products[index].name}`);
        return true;
    }
    return false;
}

deleteProduct(productId) {
    const products = this.getProducts();
    const product = products.find(p => p.id == productId);
    if (product) {
        const filteredProducts = products.filter(p => p.id != productId);
        this.saveProducts(filteredProducts);
        this.logActivity(`Deleted product: ${product.name}`);
        return true;
    }
    return false;
}

addCategory(category) {
    const categories = this.getCategories();
    category.id = Date.now();
    category.count = 0;
    categories.push(category);
    this.saveCategories(categories);
    this.logActivity(`Added new category: ${category.name}`);
    return category.id;
}

deleteCategory(categoryId) {
    const categories = this.getCategories();
    const category = categories.find(c => c.id == categoryId);
    if (category) {
        const filteredCategories = categories.filter(c => c.id != categoryId);
        this.saveCategories(filteredCategories);
        this.logActivity(`Deleted category: ${category.name}`);
        return true;
    }
    return false;
}

updateCategoryCounts() {
    const categories = this.getCategories();
    const products = this.getProducts();
    
    categories.forEach(category => {
        category.count = products.filter(product => product.category === category.id).length;
    });
    
    localStorage.setItem('mtechCategories', JSON.stringify(categories));
}

logActivity(message) {
    const activities = JSON.parse(localStorage.getItem('mtechActivities')) || [];
    activities.unshift({
        message,
        timestamp: new Date().toISOString()
    });
    if (activities.length > 50) {
        activities.splice(50);
    }
    localStorage.setItem('mtechActivities', JSON.stringify(activities));
}

getActivities() {
    return JSON.parse(localStorage.getItem('mtechActivities')) || [];
}

}
const adminDataManager = new AdminDataManager();
let currentEditingProductId = null;
document.addEventListener('DOMContentLoaded', function() {
console.log('Admin app loading...');
initializeAdminApp();
});
function initializeAdminApp() {
setupAdminEventListeners();
loadDashboard();
loadProductsTable();
loadCategoriesGrid();
loadOrders();
loadCustomers();
populateProductForm();
console.log('Admin app initialized successfully');
}
function setupAdminEventListeners() {
const adminNavLinks = document.querySelectorAll('.admin-nav-link');
adminNavLinks.forEach(link => {
link.addEventListener('click', handleAdminNavigation);
});
const addProductForm = document.getElementById('addProductForm');
if (addProductForm) {
    addProductForm.addEventListener('submit', handleAddProduct);
}

const addCategoryForm = document.getElementById('addCategoryForm');
if (addCategoryForm) {
    addCategoryForm.addEventListener('submit', handleAddCategory);
}

const editProductForm = document.getElementById('editProductForm');
if (editProductForm) {
    editProductForm.addEventListener('submit', handleEditProduct);
}

}
function handleAdminNavigation(e) {
e.preventDefault();
document.querySelectorAll('.admin-nav-link').forEach(link => {
    link.classList.remove('active');
});
e.target.classList.add('active');

document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.remove('active');
});

const sectionId = e.target.dataset.section;
const section = document.getElementById(sectionId);
if (section) {
    section.classList.add('active');
    
    switch(sectionId) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'products':
            loadProductsTable();
            break;
        case 'categories':
            loadCategoriesGrid();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'customers':
            loadCustomers();
            break;
        case 'add-product':
            populateProductForm();
            break;
    }
}

}
function loadDashboard() {
const products = adminDataManager.getProducts();
const categories = adminDataManager.getCategories();
const users = adminDataManager.getUsers();
const orders = adminDataManager.getOrders();
const activities = adminDataManager.getActivities();
document.getElementById('totalProducts').textContent = products.length;
document.getElementById('totalCategories').textContent = categories.length;
document.getElementById('totalCustomers').textContent = users.length;
document.getElementById('totalOrders').textContent = orders.length;

const recentActivity = document.getElementById('recentActivity');
if (recentActivity) {
    if (activities.length === 0) {
        recentActivity.innerHTML = '<p>No recent activities</p>';
    } else {
        recentActivity.innerHTML = activities.slice(0, 10).map(activity => `
            <div class="activity-item">
                <p>${activity.message}</p>
                <small class="activity-time">${new Date(activity.timestamp).toLocaleString()}</small>
            </div>
        `).join('');
    }
}

}
function loadProductsTable() {
const products = adminDataManager.getProducts();
const categories = adminDataManager.getCategories();
const tbody = document.getElementById('productsTableBody');
if (!tbody) return;

if (products.length === 0) {
    tbody.innerHTML = `
        <tr>
            <td colspan="8" style="text-align: center; padding: 2rem;">
                <p>No products found. Add your first product!</p>
            </td>
        </tr>
    `;
    return;
}

tbody.innerHTML = products.map(product => {
    const category = categories.find(c => c.id === product.category);
    return `
        <tr>
            <td><img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/50x50?text=No+Image'"></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${category ? category.name : 'Unknown'}</td>
            <td>$${product.price}</td>
            <td>${product.inStock ? 'In Stock' : 'Out of Stock'}</td>
            <td>${product.featured ? 'Yes' : 'No'}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})">Edit</button>
                <button class="action-btn toggle-btn" onclick="toggleProductStock(${product.id})">${product.inStock ? 'Disable' : 'Enable'}</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        </tr>
    `;
}).join('');

}
function loadCategoriesGrid() {
const categories = adminDataManager.getCategories();
const grid = document.getElementById('adminCategoriesGrid');
if (!grid) return;

if (categories.length === 0) {
    grid.innerHTML = '<p>No categories found. Add your first category!</p>';
    return;
}

grid.innerHTML = categories.map(category => `
    <div class="admin-category-card">
        <div class="category-icon" style="font-size: 2rem; margin-bottom: 1rem;">${category.image}</div>
        <h3>${category.name}</h3>
        <p>${category.count} products</p>
        <div class="category-actions">
            <button class="action-btn delete-btn" onclick="deleteCategory(${category.id})">Delete</button>
        </div>
    </div>
`).join('');

}
function loadOrders() {
const orders = adminDataManager.getOrders();
const container = document.getElementById('ordersContainer');
if (!container) return;

if (orders.length === 0) {
    container.innerHTML = '<p>No orders yet. Orders will appear here when customers make purchases.</p>';
    return;
}

container.innerHTML = orders.map(order => `
    <div class="order-card" style="background: white; border: 1px solid #ddd; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
        <div class="order-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3>Order #${order.orderId}</h3>
            <span class="order-total" style="font-size: 1.2rem; font-weight: bold; color: #ff6b35;">$${order.total.toFixed(2)}</span>
        </div>
        <div class="order-details" style="margin-bottom: 1rem;">
            <p><strong>Customer:</strong> ${order.customer.name}</p>
            <p><strong>Email:</strong> ${order.customer.email}</p>
            <p><strong>Phone:</strong> ${order.customer.phone}</p>
            <p><strong>Payment:</strong> ${order.paymentMethod}</p>
            <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
        </div>
        <div class="order-items">
            <h4>Items:</h4>
            <ul style="list-style: none; padding: 0;">
                ${order.items.map(item => `
                    <li style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    </div>
`).join('');

}
function loadCustomers() {
const users = adminDataManager.getUsers();
const orders = adminDataManager.getOrders();
const tbody = document.getElementById('customersTableBody');
if (!tbody) return;

if (users.length === 0) {
    tbody.innerHTML = `
        <tr>
            <td colspan="7" style="text-align: center; padding: 2rem;">
                <p>No customers registered yet.</p>
            </td>
        </tr>
    `;
    return;
}

tbody.innerHTML = users.map(user => {
    const userOrders = orders.filter(order => order.customer.email === user.email);
    return `
        <tr>
            <td>${user.firstName} ${user.lastName}</td>
            <td>${user.email}</td>
            <td>${user.mobile || 'N/A'}</td>
            <td>${new Date(user.registrationDate).toLocaleDateString()}</td>
            <td>${userOrders.length}</td>
            <td><span style="color: ${user.verified ? 'green' : 'red'}">${user.verified ? 'Active' : 'Unverified'}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="viewCustomerDetails('${user.id}')">View</button>
            </td>
        </tr>
    `;
}).join('');

}
function populateProductForm() {
const categories = adminDataManager.getCategories();
const categorySelect = document.getElementById('productCategory');
const editCategorySelect = document.getElementById('editProductCategory');
if (categorySelect) {
    categorySelect.innerHTML = '<option value="">Select Category</option>' + 
        categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
}

if (editCategorySelect) {
    editCategorySelect.innerHTML = '<option value="">Select Category</option>' + 
        categories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
}

}
function handleAddProduct(e) {
e.preventDefault();
const formData = {
    name: document.getElementById('productName').value.trim(),
    brand: document.getElementById('productBrand').value.trim(),
    category: parseInt(document.getElementById('productCategory').value),
    price: parseFloat(document.getElementById('productPrice').value),
    originalPrice: parseFloat(document.getElementById('productOriginalPrice').value) || null,
    rating: parseFloat(document.getElementById('productRating').value) || 4.5,
    reviews: parseInt(document.getElementById('productReviews').value) || 0,
    image: document.getElementById('productImage').value.trim() || 'https://via.placeholder.com/300x300?text=Product+Image',
    description: document.getElementById('productDescription').value.trim(),
    inStock: document.getElementById('productInStock').checked,
    featured: document.getElementById('productFeatured').checked,
    bestSeller: document.getElementById('productBestSeller').checked
};

const specRows = document.querySelectorAll('#specificationsContainer .spec-row');
const specifications = {};
specRows.forEach(row => {
    const nameInput = row.querySelector('.spec-name');
    const valueInput = row.querySelector('.spec-value');
    if (nameInput.value.trim() && valueInput.value.trim()) {
        specifications[nameInput.value.trim()] = valueInput.value.trim();
    }
});

if (Object.keys(specifications).length > 0) {
    formData.specifications = specifications;
}

if (!formData.name || !formData.brand || !formData.category || !formData.price || !formData.description) {
    showMessage('Please fill in all required fields', 'error');
    return;
}

try {
    const productId = adminDataManager.addProduct(formData);
    showMessage(`Product "${formData.name}" added successfully!`, 'success');
    
    document.getElementById('addProductForm').reset();
    resetSpecifications();
    
    loadDashboard();
    loadProductsTable();
    
} catch (error) {
    console.error('Error adding product:', error);
    showMessage('Error adding product. Please try again.', 'error');
}

}
function handleAddCategory(e) {
e.preventDefault();
const categoryData = {
    name: document.getElementById('categoryName').value.trim(),
    image: document.getElementById('categoryIcon').value.trim() || '📦'
};

if (!categoryData.name) {
    showMessage('Please enter a category name', 'error');
    return;
}

try {
    adminDataManager.addCategory(categoryData);
    showMessage(`Category "${categoryData.name}" added successfully!`, 'success');
    
    document.getElementById('addCategoryForm').reset();
    closeAddCategoryModal();
    
    loadCategoriesGrid();
    populateProductForm();
    loadDashboard();
    
} catch (error) {
    console.error('Error adding category:', error);
    showMessage('Error adding category. Please try again.', 'error');
}

}
function editProduct(productId) {
const products = adminDataManager.getProducts();
const product = products.find(p => p.id == productId);
if (!product) {
    showMessage('Product not found', 'error');
    return;
}

currentEditingProductId = productId;

document.getElementById('editProductId').value = productId;
document.getElementById('editProductName').value = product.name;
document.getElementById('editProductBrand').value = product.brand;
document.getElementById('editProductCategory').value = product.category;
document.getElementById('editProductPrice').value = product.price;
document.getElementById('editProductDescription').value = product.description;

document.getElementById('editProductModal').style.display = 'block';

}
function handleEditProduct(e) {
e.preventDefault();
const productId = parseInt(document.getElementById('editProductId').value);
const updatedData = {
    name: document.getElementById('editProductName').value.trim(),
    brand: document.getElementById('editProductBrand').value.trim(),
    category: parseInt(document.getElementById('editProductCategory').value),
    price: parseFloat(document.getElementById('editProductPrice').value),
    description: document.getElementById('editProductDescription').value.trim()
};

if (!updatedData.name || !updatedData.brand || !updatedData.category || !updatedData.price || !updatedData.description) {
    showMessage('Please fill in all required fields', 'error');
    return;
}

try {
    adminDataManager.updateProduct(productId, updatedData);
    showMessage('Product updated successfully!', 'success');
    
    closeEditProductModal();
    loadProductsTable();
    loadDashboard();
    
} catch (error) {
    console.error('Error updating product:', error);
    showMessage('Error updating product. Please try again.', 'error');
}

}
function toggleProductStock(productId) {
const products = adminDataManager.getProducts();
const product = products.find(p => p.id == productId);
if (!product) return;

product.inStock = !product.inStock;
adminDataManager.saveProducts(products);
adminDataManager.logActivity(`${product.inStock ? 'Enabled' : 'Disabled'} stock for: ${product.name}`);

loadProductsTable();
loadDashboard();
showMessage(`Product ${product.inStock ? 'enabled' : 'disabled'} successfully`, 'success');

}
function deleteProduct(productId) {
if (!confirm('Are you sure you want to delete this product?')) {
return;
}
try {
    adminDataManager.deleteProduct(productId);
    showMessage('Product deleted successfully!', 'success');
    loadProductsTable();
    loadDashboard();
} catch (error) {
    console.error('Error deleting product:', error);
    showMessage('Error deleting product. Please try again.', 'error');
}

}
function deleteCategory(categoryId) {
const products = adminDataManager.getProducts();
const productsInCategory = products.filter(p => p.category == categoryId);
if (productsInCategory.length > 0) {
    showMessage(`Cannot delete category. It has ${productsInCategory.length} products.`, 'error');
    return;
}

if (!confirm('Are you sure you want to delete this category?')) {
    return;
}

try {
    adminDataManager.deleteCategory(categoryId);
    showMessage('Category deleted successfully!', 'success');
    loadCategoriesGrid();
    populateProductForm();
    loadDashboard();
} catch (error) {
    console.error('Error deleting category:', error);
    showMessage('Error deleting category. Please try again.', 'error');
}

}
function addSpecification() {
const container = document.getElementById('specificationsContainer');
const specRow = document.createElement('div');
specRow.className = 'spec-row';
specRow.innerHTML = <input type="text" placeholder="Specification name" class="spec-name"> <input type="text" placeholder="Specification value" class="spec-value"> <button type="button" onclick="removeSpecification(this)" class="remove-spec-btn">Remove</button>;
container.appendChild(specRow);
}
function removeSpecification(button) {
button.parentElement.remove();
}
function resetSpecifications() {
const container = document.getElementById('specificationsContainer');
container.innerHTML = <div class="spec-row"> <input type="text" placeholder="Specification name" class="spec-name"> <input type="text" placeholder="Specification value" class="spec-value"> <button type="button" onclick="removeSpecification(this)" class="remove-spec-btn">Remove</button> </div>;
}
function showAddProduct() {
handleAdminNavigation({preventDefault: () => {}, target: {dataset: {section: 'add-product'}, classList: {add: () => {}}}});
document.querySelector('[data-section="add-product"]').classList.add('active');
}
function showAddCategory() {
document.getElementById('addCategoryModal').style.display = 'block';
}
function closeAddCategoryModal() {
document.getElementById('addCategoryModal').style.display = 'none';
}
function closeEditProductModal() {
document.getElementById('editProductModal').style.display = 'none';
currentEditingProductId = null;
}
function resetForm() {
document.getElementById('addProductForm').reset();
resetSpecifications();
}
function exportData() {
const data = {
categories: adminDataManager.getCategories(),
products: adminDataManager.getProducts(),
orders: adminDataManager.getOrders(),
users: adminDataManager.getUsers(),
activities: adminDataManager.getActivities(),
exportDate: new Date().toISOString()
};
const dataStr = JSON.stringify(data, null, 2);
const dataBlob = new Blob([dataStr], {type: 'application/json'});

const link = document.createElement('a');
link.href = URL.createObjectURL(dataBlob);
link.download = 'mtech-data-export.json';
link.click();

showMessage('Data exported successfully!', 'success');

}
function viewCustomerDetails(userId) {
const users = adminDataManager.getUsers();
const user = users.find(u => u.id == userId);
if (user) {
alert(Customer Details:\n\nName: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\nMobile: ${user.mobile}\nRegistered: ${new Date(user.registrationDate).toLocaleDateString()}\nStatus: ${user.verified ? 'Verified' : 'Unverified'});
}
}
function showMessage(message, type = 'success') {
const messageDiv = document.createElement('div');
messageDiv.className = ${type}-message;
messageDiv.textContent = message;
messageDiv.style.cssText = position: fixed; top: 20px; right: 20px; z-index: 9999; padding: 1rem 2rem; border-radius: 6px; font-weight: 500; ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'};
document.body.appendChild(messageDiv);
setTimeout(() => messageDiv.remove(), 5000);

}
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.deleteCategory = deleteCategory;
window.toggleProductStock = toggleProductStock;
window.addSpecification = addSpecification;
window.removeSpecification = removeSpecification;
window.resetForm = resetForm;
window.showAddProduct = showAddProduct;
window.showAddCategory = showAddCategory;
window.closeAddCategoryModal = closeAddCategoryModal;
window.closeEditProductModal = closeEditProductModal;
window.exportData = exportData;
window.viewCustomerDetails = viewCustomerDetails;
// Enhanced JavaScript for Add Product Section

// Character counters and form validation
function setupEnhancedProductForm() {
    // Character counters
    setupCharacterCounters();
    
    // Specification category switching
    setupSpecificationTabs();
    
    // Variant toggles
    setupVariantToggles();
    
    // Image preview
    setupImagePreviews();
    
    // Form validation
    setupFormValidation();
    
    console.log('Enhanced product form initialized');
}

// Character counter functionality
function setupCharacterCounters() {
    const counters = [
        { inputId: 'productShortDescription', counterId: 'shortDescCounter', maxLength: 200 },
        { inputId: 'productMetaTitle', counterId: 'metaTitleCounter', maxLength: 60 },
        { inputId: 'productMetaDescription', counterId: 'metaDescCounter', maxLength: 160 }
    ];

    counters.forEach(({ inputId, counterId, maxLength }) => {
        const input = document.getElementById(inputId);
        const counter = document.getElementById(counterId);
        
        if (input && counter) {
            input.addEventListener('input', function() {
                const length = this.value.length;
                counter.textContent = length;
                
                // Update counter styling based on length
                const counterElement = counter.parentElement;
                counterElement.classList.remove('warning', 'danger');
                
                if (length > maxLength * 0.8) {
                    counterElement.classList.add('warning');
                }
                if (length > maxLength) {
                    counterElement.classList.add('danger');
                }
            });
        }
    });
}

// Specification tabs functionality
function setupSpecificationTabs() {
    const tabButtons = document.querySelectorAll('.spec-category-btn');
    const tabPanels = document.querySelectorAll('.spec-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active panel
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === `${category}-specs`) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// Add specification to specific category
function addSpecificationToCategory(category) {
    const container = document.querySelector(`#${category}-specs .spec-grid`);
    if (!container) return;
    
    const specRow = document.createElement('div');
    specRow.className = 'spec-row';
    specRow.innerHTML = `
        <input type="text" placeholder="Specification name" class="spec-name">
        <input type="text" placeholder="Specification value" class="spec-value">
        <button type="button" onclick="removeSpecification(this)" class="remove-spec-btn">×</button>
    `;
    container.appendChild(specRow);
}

// Enhanced remove specification
function removeSpecification(button) {
    const specRow = button.closest('.spec-row');
    if (specRow) {
        specRow.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => specRow.remove(), 300);
    }
}

// Variant toggles
function setupVariantToggles() {
    const colorVariants = document.getElementById('hasColorVariants');
    const sizeVariants = document.getElementById('hasSizeVariants');
    const customVariants = document.getElementById('hasCustomVariants');
    const variantsDetails = document.getElementById('variantsDetails');
    const colorVariantsSection = document.getElementById('colorVariants');
    
    const toggles = [colorVariants, sizeVariants, customVariants];
    
    toggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('change', function() {
                const hasAnyVariant = toggles.some(t => t.checked);
                
                if (variantsDetails) {
                    variantsDetails.style.display = hasAnyVariant ? 'block' : 'none';
                }
                
                if (colorVariantsSection && toggle === colorVariants) {
                    colorVariantsSection.style.display = this.checked ? 'block' : 'none';
                }
            });
        }
    });
}

// Image preview functionality
function setupImagePreviews() {
    const mainImage = document.getElementById('productMainImage');
    const preview = document.getElementById('mainImagePreview');
    
    if (mainImage && preview) {
        mainImage.addEventListener('input', function() {
            const url = this.value.trim();
            if (url && isValidImageUrl(url)) {
                showImagePreview(url, preview);
            } else {
                preview.innerHTML = '<p>Enter a valid image URL to see preview</p>';
            }
        });
    }
}

// Show image preview
function showImagePreview(url, container) {
    const img = document.createElement('img');
    img.src = url;
    img.onload = function() {
        container.innerHTML = '';
        container.appendChild(img);
    };
    img.onerror = function() {
        container.innerHTML = '<p style="color: #dc3545;">Invalid image URL or image not accessible</p>';
    };
}

// Validate image URL
function isValidImageUrl(url) {
    try {
        new URL(url);
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    } catch {
        return false;
    }
}

// Add image row for additional images
function addImageRow() {
    const container = document.getElementById('additionalImages');
    if (!container) return;
    
    const existingRows = container.querySelectorAll('.image-input-row').length;
    if (existingRows >= 8) {
        showMessage('Maximum 8 additional images allowed', 'warning');
        return;
    }
    
    const row = document.createElement('div');
    row.className = 'image-input-row';
    row.innerHTML = `
        <input type="url" placeholder="Image URL" class="additional-image-url">
        <button type="button" onclick="addImageRow()" class="add-btn">+</button>
        <button type="button" onclick="removeImageRow(this)" class="remove-btn">×</button>
    `;
    container.appendChild(row);
}

// Remove image row
function removeImageRow(button) {
    const row = button.closest('.image-input-row');
    if (row) {
        row.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => row.remove(), 300);
    }
}

// Add color variant
function addColorVariant() {
    const container = document.querySelector('.color-variants');
    if (!container) return;
    
    const row = document.createElement('div');
    row.className = 'color-variant-row';
    row.innerHTML = `
        <input type="text" placeholder="Color name (e.g., Space Black)" class="color-name">
        <input type="color" class="color-picker" value="#000000">
        <input type="number" placeholder="Additional price" class="color-price" step="0.01">
        <button type="button" onclick="removeVariantRow(this)" class="remove-btn">×</button>
    `;
    container.appendChild(row);
}

// Remove variant row
function removeVariantRow(button) {
    const row = button.closest('.color-variant-row');
    if (row) {
        row.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => row.remove(), 300);
    }
}

// Text formatting for description
function formatText(format) {
    const textarea = document.getElementById('productDescription');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = '';
    
    switch (format) {
        case 'bold':
            formattedText = `**${selectedText}**`;
            break;
        case 'italic':
            formattedText = `*${selectedText}*`;
            break;
        case 'list':
            formattedText = selectedText.split('\n').map(line => line.trim() ? `• ${line.trim()}` : line).join('\n');
            break;
    }
    
    if (formattedText) {
        textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start, start + formattedText.length);
    }
}

// Add template text
function addTemplate(type) {
    const textarea = document.getElementById('productDescription');
    if (!textarea) return;
    
    let template = '';
    
    switch (type) {
        case 'features':
            template = `
**Key Features:**
• Premium build quality and design
• Advanced performance capabilities
• User-friendly interface
• Comprehensive warranty coverage

**What's in the Box:**
• Main product
• User manual
• Warranty card
• Accessories (as applicable)

**Technical Support:**
Our technical support team is available to help with any questions or issues you may have.
            `.trim();
            break;
    }
    
    if (template) {
        const cursorPos = textarea.selectionStart;
        textarea.value = textarea.value.substring(0, cursorPos) + template + textarea.value.substring(cursorPos);
        textarea.focus();
    }
}

// Form validation
function setupFormValidation() {
    const form = document.getElementById('addProductForm');
    if (!form) return;
    
    // Real-time validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearValidation);
    });
    
    // Price validation
    const priceFields = ['productPrice', 'productOriginalPrice', 'productCostPrice'];
    priceFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', validatePrice);
        }
    });
    
    // Stock validation
    const stockField = document.getElementById('productStock');
    if (stockField) {
        stockField.addEventListener('input', validateStock);
    }
}

// Validate individual field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');
    
    // Remove existing validation
    clearValidation(event);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(fieldGroup, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(fieldGroup, 'Please enter a valid email address');
        return false;
    }
    
    // URL validation
    if (field.type === 'url' && value && !isValidUrl(value)) {
        showFieldError(fieldGroup, 'Please enter a valid URL');
        return false;
    }
    
    // Success state
    showFieldSuccess(fieldGroup);
    return true;
}

// Clear validation styles
function clearValidation(event) {
    const fieldGroup = event.target.closest('.form-group');
    if (fieldGroup) {
        fieldGroup.classList.remove('success', 'error');
        const existingMessage = fieldGroup.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
}

// Show field error
function showFieldError(fieldGroup, message) {
    fieldGroup.classList.add('error');
    fieldGroup.classList.remove('success');
    
    const existingMessage = fieldGroup.querySelector('.validation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageElement = document.createElement('div');
    messageElement.className = 'validation-message error';
    messageElement.textContent = message;
    fieldGroup.appendChild(messageElement);
}

// Show field success
function showFieldSuccess(fieldGroup) {
    fieldGroup.classList.add('success');
    fieldGroup.classList.remove('error');
    
    const existingMessage = fieldGroup.querySelector('.validation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Validate price fields
function validatePrice(event) {
    const field = event.target;
    const value = parseFloat(field.value);
    const fieldGroup = field.closest('.form-group');
    
    if (field.value && (isNaN(value) || value < 0)) {
        showFieldError(fieldGroup, 'Please enter a valid price (must be 0 or greater)');
    } else if (field.value) {
        showFieldSuccess(fieldGroup);
    }
}

// Validate stock field
function validateStock(event) {
    const field = event.target;
    const value = parseInt(field.value);
    const fieldGroup = field.closest('.form-group');
    
    if (field.value && (isNaN(value) || value < 0)) {
        showFieldError(fieldGroup, 'Please enter a valid stock quantity (must be 0 or greater)');
    } else if (field.value) {
        showFieldSuccess(fieldGroup);
    }
}

// Utility validation functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Preview product functionality
function previewProduct() {
    const formData = collectFormData();
    if (!formData) return;
    
    // Create preview modal
    showProductPreview(formData);
}

// Collect all form data
function collectFormData() {
    const form = document.getElementById('addProductForm');
    if (!form) return null;
    
    // Validate required fields first
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            const fieldGroup = field.closest('.form-group');
            showFieldError(fieldGroup, 'This field is required');
            isValid = false;
        }
    });
    
    if (!isValid) {
        showMessage('Please fill in all required fields', 'error');
        return null;
    }
    
    // Collect form data
    const formData = {
        // Basic information
        name: document.getElementById('productName').value.trim(),
        brand: document.getElementById('productBrand').value.trim(),
        model: document.getElementById('productModel').value.trim(),
        sku: document.getElementById('productSKU').value.trim(),
        
        // Category
        category: parseInt(document.getElementById('productCategory').value),
        subCategory: document.getElementById('productSubCategory').value.trim(),
        tags: document.getElementById('productTags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
        condition: document.getElementById('productCondition').value,
        
        // Description
        shortDescription: document.getElementById('productShortDescription').value.trim(),
        description: document.getElementById('productDescription').value.trim(),
        highlights: document.getElementById('productHighlights').value.trim(),
        warranty: document.getElementById('productWarranty').value.trim(),
        
        // Specifications
        specifications: collectSpecifications(),
        
        // Images
        mainImage: document.getElementById('productMainImage').value.trim(),
        additionalImages: collectAdditionalImages(),
        video: document.getElementById('productVideo').value.trim(),
        
        // Pricing
        price: parseFloat(document.getElementById('productPrice').value),
        originalPrice: parseFloat(document.getElementById('productOriginalPrice').value) || null,
        costPrice: parseFloat(document.getElementById('productCostPrice').value) || null,
        stock: parseInt(document.getElementById('productStock').value) || 0,
        minStock: parseInt(document.getElementById('productMinStock').value) || 0,
        stockStatus: document.getElementById('productStockStatus').value,
        
        // SEO
        metaTitle: document.getElementById('productMetaTitle').value.trim(),
        metaDescription: document.getElementById('productMetaDescription').value.trim(),
        rating: parseFloat(document.getElementById('productRating').value) || 4.5,
        reviews: parseInt(document.getElementById('productReviews').value) || 0,
        
        // Status
        visible: document.getElementById('productVisible').checked,
        searchable: document.getElementById('productSearchable').checked,
        inStock: document.getElementById('productInStock').checked,
        featured: document.getElementById('productFeatured').checked,
        bestSeller: document.getElementById('productBestSeller').checked,
        newArrival: document.getElementById('productNewArrival').checked,
        onSale: document.getElementById('productOnSale').checked,
        freeShipping: document.getElementById('productFreeShipping').checked,
        limitedOffer: document.getElementById('productLimitedOffer').checked
    };
    
    return formData;
}

// Collect specifications from all categories
function collectSpecifications() {
    const specifications = {};
    const specRows = document.querySelectorAll('.spec-row');
    
    specRows.forEach(row => {
        const nameInput = row.querySelector('.spec-name');
        const valueInput = row.querySelector('.spec-value');
        
        if (nameInput && valueInput && nameInput.value.trim() && valueInput.value.trim()) {
            specifications[nameInput.value.trim()] = valueInput.value.trim();
        }
    });
    
    return specifications;
}

// Collect additional images
function collectAdditionalImages() {
    const images = [];
    const imageInputs = document.querySelectorAll('.additional-image-url');
    
    imageInputs.forEach(input => {
        if (input.value.trim() && isValidImageUrl(input.value.trim())) {
            images.push(input.value.trim());
        }
    });
    
    return images;
}

// Show product preview
function showProductPreview(data) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            <h2>Product Preview</h2>
            <div class="product-preview-content">
                <div class="preview-image">
                    <img src="${data.mainImage}" alt="${data.name}" style="max-width: 300px; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/300x300?text=Preview+Image'">
                </div>
                <div class="preview-details">
                    <h3>${data.name}</h3>
                    <p><strong>Brand:</strong> ${data.brand}</p>
                    <p><strong>Price:</strong> $${data.price}${data.originalPrice ? ` <span style="text-decoration: line-through;">$${data.originalPrice}</span>` : ''}</p>
                    <p><strong>Short Description:</strong> ${data.shortDescription}</p>
                    <div><strong>Description:</strong><br>${data.description.replace(/\n/g, '<br>')}</div>
                    ${Object.keys(data.specifications).length > 0 ? `
                        <div><strong>Specifications:</strong><br>
                            ${Object.entries(data.specifications).map(([key, value]) => `${key}: ${value}`).join('<br>')}
                        </div>
                    ` : ''}
                </div>
            </div>
            <div style="margin-top: 2rem; text-align: center;">
                <button onclick="this.closest('.modal').remove()" class="admin-btn secondary">Close Preview</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Save as draft
function saveDraft() {
    const formData = collectFormData();
    if (!formData) return;
    
    // Save to localStorage as draft
    const drafts = JSON.parse(localStorage.getItem('mtechProductDrafts')) || [];
    const draftData = {
        ...formData,
        id: Date.now(),
        draftDate: new Date().toISOString()
    };
    
    drafts.push(draftData);
    localStorage.setItem('mtechProductDrafts', JSON.stringify(drafts));
    
    showMessage('Product saved as draft successfully!', 'success');
}

// Upload image (placeholder function)
function uploadImage(type) {
    showMessage('Image upload feature - integrate with your preferred image hosting service', 'info');
}

// Initialize enhanced form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupEnhancedProductForm();
});

// Global function assignments
window.addSpecificationToCategory = addSpecificationToCategory;
window.removeSpecification = removeSpecification;
window.addImageRow = addImageRow;
window.removeImageRow = removeImageRow;
window.addColorVariant = addColorVariant;
window.removeVariantRow = removeVariantRow;
window.formatText = formatText;
window.addTemplate = addTemplate;
window.previewProduct = previewProduct;
window.saveDraft = saveDraft;
window.uploadImage = uploadImage;
