const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'mtech-secret-key-maurya-enterprises';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const db = new sqlite3.Database(':memory:');

// Initialize database tables
db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Products table
    db.run(`CREATE TABLE products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        original_price DECIMAL(10,2),
        image TEXT,
        rating DECIMAL(3,2) DEFAULT 0,
        reviews_count INTEGER DEFAULT 0,
        description TEXT,
        specifications TEXT,
        in_stock BOOLEAN DEFAULT 1,
        stock_count INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Categories table
    db.run(`CREATE TABLE categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        icon TEXT,
        product_count INTEGER DEFAULT 0
    )`);

    // Shopping cart table
    db.run(`CREATE TABLE cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product_id INTEGER,
        quantity INTEGER DEFAULT 1,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    )`);

    // Orders table
    db.run(`CREATE TABLE orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        total_amount DECIMAL(10,2),
        status TEXT DEFAULT 'pending',
        shipping_address TEXT,
        payment_method TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // Order items table
    db.run(`CREATE TABLE order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        price DECIMAL(10,2),
        FOREIGN KEY (order_id) REFERENCES orders (id),
        FOREIGN KEY (product_id) REFERENCES products (id)
    )`);

    // Reviews table
    db.run(`CREATE TABLE reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        user_id INTEGER,
        rating INTEGER CHECK(rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products (id),
        FOREIGN KEY (user_id) REFERENCES users (id)
    )`);

    // Insert sample data
    insertSampleData();
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Sample data insertion
function insertSampleData() {
    // Insert categories
    const categories = [
        ['arduino', 'Arduino', '🔧', 45],
        ['raspberry-pi', 'Raspberry Pi', '🥧', 23],
        ['sensors', 'Sensors', '📡', 89],
        ['motors', 'Motors', '⚙️', 34],
        ['electronic-components', 'Components', '🔌', 156],
        ['development-boards', 'Dev Boards', '💻', 67],
        ['kits', 'Starter Kits', '📦', 28],
        ['iot', 'IoT Modules', '🌐', 42]
    ];

    categories.forEach(cat => {
        db.run('INSERT INTO categories (id, name, icon, product_count) VALUES (?, ?, ?, ?)', cat);
    });

    // Insert sample products
    const products = [
        [1, 'Arduino UNO R3 Original', 'arduino', 1844.00, 2000.00, 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=300', 4.8, 342, 'The Arduino UNO R3 is a microcontroller board based on the ATmega328P', JSON.stringify({microcontroller: 'ATmega328P', voltage: '5V', digitalPins: '14', analogPins: '6', clockSpeed: '16 MHz'}), 1, 156],
        [2, 'Raspberry Pi 4 Model B 8GB', 'raspberry-pi', 8500.00, null, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300', 4.9, 289, 'Latest Raspberry Pi 4 with 8GB RAM for advanced computing projects', JSON.stringify({ram: '8GB LPDDR4', processor: 'Quad-core ARM Cortex-A72', connectivity: 'Wi-Fi, Bluetooth, Gigabit Ethernet', ports: '2x micro-HDMI, 4x USB'}), 1, 89],
        [3, 'ESP32 DevKit V1 WiFi + Bluetooth', 'development-boards', 650.00, null, 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300', 4.7, 456, 'ESP32 development board with WiFi and Bluetooth capabilities', JSON.stringify({processor: 'Dual-core Tensilica LX6', frequency: '240MHz', wifi: '802.11 b/g/n', bluetooth: 'v4.2 BR/EDR and BLE'}), 1, 245],
        [4, 'HC-SR04 Ultrasonic Sensor', 'sensors', 85.00, null, 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300', 4.6, 567, 'Ultrasonic distance sensor for Arduino and other microcontrollers', JSON.stringify({range: '2cm - 400cm', accuracy: '3mm', voltage: '5V DC', current: '15mA'}), 1, 389],
        [5, 'SG90 Micro Servo Motor', 'motors', 120.00, null, 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300', 4.5, 234, '9g micro servo motor for robotics and automation projects', JSON.stringify({weight: '9g', torque: '1.8kg/cm', speed: '0.1s/60°', voltage: '4.8V - 6V'}), 1, 456],
        [6, 'DHT22 Temperature Humidity Sensor', 'sensors', 280.00, null, 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300', 4.7, 312, 'High precision digital temperature and humidity sensor', JSON.stringify({temperature: '-40°C to +125°C', humidity: '0-100% RH', accuracy: '±0.5°C, ±2% RH', interface: 'Digital'}), 1, 178],
        [7, 'L293D Motor Driver IC', 'electronic-components', 45.00, null, 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300', 4.4, 445, 'Dual H-bridge motor driver for controlling DC motors', JSON.stringify({channels: '2', voltage: '4.5V - 36V', current: '600mA per channel', package: '16-pin DIP'}), 1, 567],
        [8, 'Arduino Starter Kit Complete', 'kits', 3500.00, 4000.00, 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300', 4.9, 189, 'Complete Arduino starter kit with components and project guide', JSON.stringify({includes: 'Arduino UNO, Breadboard, LEDs, Resistors, Sensors', projects: '15+ guided projects', components: '100+ pieces', guide: 'English manual included'}), 1, 67]
    ];

    products.forEach(product => {
        db.run('INSERT INTO products (id, name, category, price, original_price, image, rating, reviews_count, description, specifications, in_stock, stock_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', product);
    });
}

// API Routes

// Get all products with optional filtering and search
app.get('/api/products', (req, res) => {
    const { category, search, sort, limit, offset } = req.query;
    let query = 'SELECT * FROM products WHERE in_stock = 1';
    const params = [];

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    if (search) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    // Sorting
    switch (sort) {
        case 'price_low':
            query += ' ORDER BY price ASC';
            break;
        case 'price_high':
            query += ' ORDER BY price DESC';
            break;
        case 'rating':
            query += ' ORDER BY rating DESC';
            break;
        case 'newest':
            query += ' ORDER BY created_at DESC';
            break;
        default:
            query += ' ORDER BY rating DESC';
    }

    if (limit) {
        query += ' LIMIT ?';
        params.push(parseInt(limit));

        if (offset) {
            query += ' OFFSET ?';
            params.push(parseInt(offset));
        }
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Parse specifications JSON
        const products = rows.map(row => ({
            ...row,
            specifications: JSON.parse(row.specifications || '{}')
        }));

        res.json({ products });
    });
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;

    db.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!row) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const product = {
            ...row,
            specifications: JSON.parse(row.specifications || '{}')
        };

        res.json({ product });
    });
});

// Get all categories
app.get('/api/categories', (req, res) => {
    db.all('SELECT * FROM categories', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ categories: rows });
    });
});

// User registration
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [name, email, hashedPassword], 
            function(err) {
                if (err) {
                    if (err.code === 'SQLITE_CONSTRAINT') {
                        return res.status(400).json({ error: 'Email already exists' });
                    }
                    return res.status(500).json({ error: err.message });
                }

                const token = jwt.sign({ userId: this.lastID, email }, JWT_SECRET);
                res.json({ 
                    message: 'User registered successfully',
                    token,
                    user: { id: this.lastID, name, email }
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// User login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        try {
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
            res.json({ 
                message: 'Login successful',
                token,
                user: { id: user.id, name: user.name, email: user.email }
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    });
});

// Get user profile (protected route)
app.get('/api/auth/profile', authenticateToken, (req, res) => {
    db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', 
        [req.user.userId], 
        (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ user });
        }
    );
});

// Add item to cart (protected route)
app.post('/api/cart', authenticateToken, (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.userId;

    // Check if item already exists in cart
    db.get('SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?', 
        [userId, productId], 
        (err, existingItem) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (existingItem) {
                // Update quantity
                db.run('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?', 
                    [quantity, existingItem.id], 
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        res.json({ message: 'Cart updated successfully' });
                    }
                );
            } else {
                // Add new item
                db.run('INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)', 
                    [userId, productId, quantity], 
                    (err) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        res.json({ message: 'Item added to cart' });
                    }
                );
            }
        }
    );
});

// Get cart items (protected route)
app.get('/api/cart', authenticateToken, (req, res) => {
    const userId = req.user.userId;

    const query = `
        SELECT ci.*, p.name, p.price, p.image, p.in_stock
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = ?
    `;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ cartItems: rows });
    });
});

// Update cart item quantity (protected route)
app.put('/api/cart/:itemId', authenticateToken, (req, res) => {
    const { quantity } = req.body;
    const itemId = req.params.itemId;
    const userId = req.user.userId;

    db.run('UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?', 
        [quantity, itemId, userId], 
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Cart item updated' });
        }
    );
});

// Remove item from cart (protected route)
app.delete('/api/cart/:itemId', authenticateToken, (req, res) => {
    const itemId = req.params.itemId;
    const userId = req.user.userId;

    db.run('DELETE FROM cart_items WHERE id = ? AND user_id = ?', 
        [itemId, userId], 
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Item removed from cart' });
        }
    );
});

// Create order (protected route)
app.post('/api/orders', authenticateToken, (req, res) => {
    const { shippingAddress, paymentMethod } = req.body;
    const userId = req.user.userId;

    // Get cart items
    const cartQuery = `
        SELECT ci.*, p.price
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = ?
    `;

    db.all(cartQuery, [userId], (err, cartItems) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        // Calculate total
        const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create order
        db.run('INSERT INTO orders (user_id, total_amount, shipping_address, payment_method) VALUES (?, ?, ?, ?)', 
            [userId, totalAmount, shippingAddress, paymentMethod], 
            function(err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                const orderId = this.lastID;

                // Add order items
                const orderItemsPromises = cartItems.map(item => {
                    return new Promise((resolve, reject) => {
                        db.run('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', 
                            [orderId, item.product_id, item.quantity, item.price], 
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                });

                Promise.all(orderItemsPromises)
                    .then(() => {
                        // Clear cart
                        db.run('DELETE FROM cart_items WHERE user_id = ?', [userId], (err) => {
                            if (err) {
                                return res.status(500).json({ error: err.message });
                            }

                            res.json({ 
                                message: 'Order created successfully',
                                orderId: orderId,
                                totalAmount: totalAmount
                            });
                        });
                    })
                    .catch(error => {
                        res.status(500).json({ error: 'Failed to create order items' });
                    });
            }
        );
    });
});

// Get user orders (protected route)
app.get('/api/orders', authenticateToken, (req, res) => {
    const userId = req.user.userId;

    const query = `
        SELECT o.*, 
               GROUP_CONCAT(p.name || ' x' || oi.quantity) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE o.user_id = ?
        GROUP BY o.id
        ORDER BY o.created_at DESC
    `;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ orders: rows });
    });
});

// Add product review (protected route)
app.post('/api/products/:id/reviews', authenticateToken, (req, res) => {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    const userId = req.user.userId;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    db.run('INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)', 
        [productId, userId, rating, comment], 
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Update product rating and review count
            updateProductRating(productId);

            res.json({ message: 'Review added successfully' });
        }
    );
});

// Get product reviews
app.get('/api/products/:id/reviews', (req, res) => {
    const productId = req.params.id;

    const query = `
        SELECT r.*, u.name as user_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.product_id = ?
        ORDER BY r.created_at DESC
    `;

    db.all(query, [productId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json({ reviews: rows });
    });
});

// Helper function to update product rating
function updateProductRating(productId) {
    const query = `
        SELECT AVG(rating) as avg_rating, COUNT(*) as review_count
        FROM reviews
        WHERE product_id = ?
    `;

    db.get(query, [productId], (err, result) => {
        if (!err && result) {
            db.run('UPDATE products SET rating = ?, reviews_count = ? WHERE id = ?', 
                [result.avg_rating, result.review_count, productId]
            );
        }
    });
}

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`MTech API Server running on port ${PORT}`);
    console.log('© 2025 Maurya Enterprises. All rights reserved.');
});

module.exports = app;
