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
                
