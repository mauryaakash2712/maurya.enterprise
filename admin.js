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
