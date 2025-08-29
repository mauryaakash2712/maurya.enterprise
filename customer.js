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
                "name": "Sony WH-1000XM5",
                "brand": "Sony",
                "category": 4,
                "price": 349,
                "originalPrice": 399,
                "rating": 4.8,
                "reviews": 1123,
                "image": "https://via.placeholder.com/300x300?text=Sony+WH-1000XM5",
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
            }
        ];
        localStorage.setItem('mtechProducts', JSON.stringify(defaultProducts));
    }

    this.updateCategoryCounts();
}

getCategories() {
    return JSON.parse(localStorage.getItem('mtechCategories')) || [];
}

getProducts() {
    return JSON.parse(localStorage.getItem('mtechProducts')) || [];
}

updateCategoryCounts() {
    const categories = this.getCategories();
    const products = this.getProducts();
    
    categories.forEach(category => {
        category.count = products.filter(product => product.category === category.id).length;
    });
    
    localStorage.setItem('mtechCategories', JSON.stringify(categories));
}
