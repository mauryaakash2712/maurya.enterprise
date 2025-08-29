initializeData() {
    // Initialize with default data if nothing exists
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
    product.id = Date.now(); // Generate unique ID
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
    // Keep only last 50 activities
    if (activities.length > 50) {
        activities.splice(50);
    }
    localStorage.setItem('mtechActivities', JSON.stringify(activities));
}

getActivities() {
    return JSON.parse(localStorage.getItem('mtechActivities')) || [];
}
