const sqlite3 = require('sqlite3').verbose();
const path = require('path');

/**
 * MTech Database Manager - Maurya Enterprises
 * Copyright © 2025 Maurya Enterprises. All rights reserved.
 */
class DatabaseManager {
    constructor(dbPath = './database/mtech_store.db') {
        this.dbPath = dbPath;
        this.db = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Error connecting to MTech database:', err.message);
                    reject(err);
                } else {
                    console.log('Connected to MTech SQLite database');
                    resolve();
                }
            });
        });
    }

    async initialize() {
        await this.connect();
        await this.createTables();
        await this.insertSampleData();
    }

    createTables() {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                // Enable foreign keys
                this.db.run('PRAGMA foreign_keys = ON');

                // Users table
                this.db.run(`CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    phone TEXT,
                    address TEXT,
                    city TEXT,
                    state TEXT,
                    postal_code TEXT,
                    country TEXT DEFAULT 'India',
                    email_verified BOOLEAN DEFAULT 0,
                    is_admin BOOLEAN DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`);

                // Categories table
                this.db.run(`CREATE TABLE IF NOT EXISTS categories (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    description TEXT,
                    icon TEXT,
                    parent_id TEXT,
                    sort_order INTEGER DEFAULT 0,
                    is_active BOOLEAN DEFAULT 1,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (parent_id) REFERENCES categories (id)
                )`);

                // Products table
                this.db.run(`CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    slug TEXT UNIQUE,
                    sku TEXT UNIQUE,
                    category_id TEXT NOT NULL,
                    price DECIMAL(10,2) NOT NULL,
                    original_price DECIMAL(10,2),
                    cost_price DECIMAL(10,2),
                    description TEXT,
                    specifications TEXT, -- JSON string
                    images TEXT, -- JSON array of image URLs
                    rating DECIMAL(3,2) DEFAULT 0,
                    reviews_count INTEGER DEFAULT 0,
                    stock_quantity INTEGER DEFAULT 0,
                    min_stock_level INTEGER DEFAULT 10,
                    weight DECIMAL(8,2),
                    dimensions TEXT, -- JSON object with length, width, height
                    is_featured BOOLEAN DEFAULT 0,
                    is_active BOOLEAN DEFAULT 1,
                    meta_title TEXT,
                    meta_description TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (category_id) REFERENCES categories (id)
                )`);

                // Shopping cart table
                this.db.run(`CREATE TABLE IF NOT EXISTS cart_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    product_id INTEGER,
                    quantity INTEGER DEFAULT 1,
                    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
                )`);

                // Wishlist table
                this.db.run(`CREATE TABLE IF NOT EXISTS wishlist_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
                    UNIQUE(user_id, product_id)
                )`);

                // Orders table
                this.db.run(`CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_number TEXT UNIQUE NOT NULL,
                    user_id INTEGER NOT NULL,
                    status TEXT DEFAULT 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled
                    payment_status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
                    payment_method TEXT,
                    payment_id TEXT,
                    subtotal DECIMAL(10,2) NOT NULL,
                    tax_amount DECIMAL(10,2) DEFAULT 0,
                    shipping_amount DECIMAL(10,2) DEFAULT 0,
                    discount_amount DECIMAL(10,2) DEFAULT 0,
                    total_amount DECIMAL(10,2) NOT NULL,
                    currency TEXT DEFAULT 'INR',
                    shipping_address TEXT,
                    billing_address TEXT,
                    notes TEXT,
                    tracking_number TEXT,
                    shipped_at DATETIME,
                    delivered_at DATETIME,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users (id)
                )`);

                // Order items table
                this.db.run(`CREATE TABLE IF NOT EXISTS order_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    product_name TEXT NOT NULL,
                    product_sku TEXT,
                    quantity INTEGER NOT NULL,
                    unit_price DECIMAL(10,2) NOT NULL,
                    total_price DECIMAL(10,2) NOT NULL,
                    FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
                    FOREIGN KEY (product_id) REFERENCES products (id)
                )`);

                // Reviews table
                this.db.run(`CREATE TABLE IF NOT EXISTS reviews (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    product_id INTEGER NOT NULL,
                    user_id INTEGER NOT NULL,
                    order_id INTEGER,
                    rating INTEGER CHECK(rating >= 1 AND rating <= 5) NOT NULL,
                    title TEXT,
                    comment TEXT,
                    is_verified_purchase BOOLEAN DEFAULT 0,
                    is_approved BOOLEAN DEFAULT 1,
                    helpful_votes INTEGER DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
                    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                    FOREIGN KEY (order_id) REFERENCES orders (id),
                    UNIQUE(product_id, user_id, order_id)
                )`);

                // Coupons/Discounts table
                this.db.run(`CREATE TABLE IF NOT EXISTS coupons (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    code TEXT UNIQUE NOT NULL,
                    name TEXT NOT NULL,
                    type TEXT NOT NULL, -- percentage, fixed_amount, free_shipping
                    value DECIMAL(10,2) NOT NULL,
                    min_order_amount DECIMAL(10,2) DEFAULT 0,
                    max_discount_amount DECIMAL(10,2),
                    usage_limit INTEGER,
                    usage_count INTEGER DEFAULT 0,
                    user_limit INTEGER DEFAULT 1,
                    starts_at DATETIME,
                    expires_at DATETIME,
                    is_active BOOLEAN DEFAULT 1,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`);

                // Settings table for store configuration
                this.db.run(`CREATE TABLE IF NOT EXISTS settings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    key TEXT UNIQUE NOT NULL,
                    value TEXT,
                    type TEXT DEFAULT 'string', -- string, number, boolean, json
                    description TEXT,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`);

                // Inventory transactions table
                this.db.run(`CREATE TABLE IF NOT EXISTS inventory_transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    product_id INTEGER NOT NULL,
                    transaction_type TEXT NOT NULL, -- purchase, sale, adjustment, return
                    quantity_change INTEGER NOT NULL,
                    quantity_after INTEGER NOT NULL,
                    reference_id INTEGER, -- order_id for sales, purchase_order_id for purchases
                    notes TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (product_id) REFERENCES products (id)
                )`);

                // Email log table
                this.db.run(`CREATE TABLE IF NOT EXISTS email_logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    to_email TEXT NOT NULL,
                    subject TEXT NOT NULL,
                    template TEXT,
                    status TEXT DEFAULT 'pending', -- pending, sent, failed
                    error_message TEXT,
                    sent_at DATETIME,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )`);

                console.log('MTech database tables created successfully');
                resolve();
            });
        });
    }

    async insertSampleData() {
        // Insert sample categories
        const categories = [
            ['arduino', 'Arduino', 'Microcontroller boards and compatible products', '🔧', null, 1],
            ['raspberry-pi', 'Raspberry Pi', 'Single-board computers and accessories', '🥧', null, 2],
            ['sensors', 'Sensors', 'Various sensors for measuring physical quantities', '📡', null, 3],
            ['motors', 'Motors & Actuators', 'DC motors, servo motors, stepper motors', '⚙️', null, 4],
            ['electronic-components', 'Electronic Components', 'Resistors, capacitors, ICs, and more', '🔌', null, 5],
            ['development-boards', 'Development Boards', 'Microcontroller development boards', '💻', null, 6],
            ['kits', 'Starter Kits', 'Complete kits for learning and projects', '📦', null, 7],
            ['iot', 'IoT Modules', 'Internet of Things modules and WiFi boards', '🌐', null, 8]
        ];

        for (const cat of categories) {
            await this.runQuery('INSERT OR IGNORE INTO categories (id, name, description, icon, parent_id, sort_order) VALUES (?, ?, ?, ?, ?, ?)', cat);
        }

        // Insert sample products
        const products = [
            [1, 'Arduino UNO R3 Original', 'arduino-uno-r3-original', 'MTH-ARD-UNO-R3', 'arduino', 1844.00, 2000.00, 1200.00, 
             'The Arduino UNO R3 is a microcontroller board based on the ATmega328P. It has 14 digital input/output pins, 6 analog inputs, a 16 MHz ceramic resonator, a USB connection, a power jack, an ICSP header, and a reset button.',
             JSON.stringify({microcontroller: 'ATmega328P', voltage: '5V', digitalPins: '14', analogPins: '6', clockSpeed: '16 MHz', flash: '32KB', sram: '2KB', eeprom: '1KB'}),
             JSON.stringify(['https://images.unsplash.com/photo-1553406830-ef2513450d76?w=300']), 4.8, 342, 156, 10, 25.0, JSON.stringify({length: 68.6, width: 53.4, height: 1.5}), 1],

            [2, 'Raspberry Pi 4 Model B 8GB', 'raspberry-pi-4-model-b-8gb', 'MTH-RPI-4B-8GB', 'raspberry-pi', 8500.00, null, 6800.00,
             'The Raspberry Pi 4 Model B is the newest Raspberry Pi computer made, and the Pi Foundation knows you can always make a good thing better! This Pi model now features BCM2711 quad-core Cortex-A72.',
             JSON.stringify({processor: 'Quad-core ARM Cortex-A72', ram: '8GB LPDDR4', storage: 'microSD', connectivity: 'Wi-Fi 802.11ac, Bluetooth 5.0, Gigabit Ethernet', ports: '2x micro-HDMI, 4x USB', gpio: '40-pin'}),
             JSON.stringify(['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300']), 4.9, 289, 89, 5, 46.0, JSON.stringify({length: 85, width: 56, height: 17}), 1],

            [3, 'ESP32 DevKit V1 WiFi + Bluetooth', 'esp32-devkit-v1-wifi-bluetooth', 'MTH-ESP32-DEVKIT-V1', 'development-boards', 650.00, null, 450.00,
             'The ESP32 is a series of low cost, low power system on a chip microcontrollers with integrated Wi-Fi and dual-mode Bluetooth.',
             JSON.stringify({processor: 'Dual-core Tensilica LX6', frequency: '240MHz', flash: '4MB', ram: '520KB', wifi: '802.11 b/g/n', bluetooth: 'v4.2 BR/EDR and BLE', gpio: '30'}),
             JSON.stringify(['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300']), 4.7, 456, 245, 20, 8.0, JSON.stringify({length: 55, width: 28, height: 7}), 1],

            [4, 'HC-SR04 Ultrasonic Sensor', 'hc-sr04-ultrasonic-sensor', 'MTH-HC-SR04', 'sensors', 85.00, null, 45.00,
             'The HC-SR04 ultrasonic sensor uses sonar to determine distance to an object like bats do. It offers excellent non-contact range detection.',
             JSON.stringify({range: '2cm - 400cm', accuracy: '3mm', voltage: '5V DC', current: '15mA', angle: '15°', frequency: '40MHz'}),
             JSON.stringify(['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300']), 4.6, 567, 389, 50, 8.5, JSON.stringify({length: 45, width: 20, height: 15}), 0],

            [5, 'SG90 Micro Servo Motor', 'sg90-micro-servo-motor', 'MTH-SERVO-SG90', 'motors', 120.00, null, 75.00,
             'Tiny and lightweight with high output power. This servo can rotate approximately 180 degrees (90 in each direction).',
             JSON.stringify({weight: '9g', torque: '1.8kg/cm', speed: '0.1s/60°', voltage: '4.8V - 6V', gear: 'Plastic', bearing: 'Top Ball'}),
             JSON.stringify(['https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300']), 4.5, 234, 456, 25, 9.0, JSON.stringify({length: 22.2, width: 11.8, height: 22.2}), 0]
        ];

        for (const product of products) {
            await this.runQuery(`INSERT OR IGNORE INTO products 
                (id, name, slug, sku, category_id, price, original_price, cost_price, description, specifications, images, rating, reviews_count, stock_quantity, min_stock_level, weight, dimensions, is_featured) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, product);
        }

        // Insert sample settings
        const settings = [
            ['store_name', 'MTech', 'string', 'Store name'],
            ['store_email', 'contact@mtech.com', 'string', 'Store contact email'],
            ['store_phone', '+91-98765-43210', 'string', 'Store contact phone'],
            ['currency', 'INR', 'string', 'Default currency'],
            ['tax_rate', '18', 'number', 'Default tax rate percentage'],
            ['free_shipping_threshold', '500', 'number', 'Minimum order value for free shipping'],
            ['shipping_charge', '50', 'number', 'Default shipping charge'],
            ['store_address', 'Electronics Market, Delhi, India', 'string', 'Store physical address'],
            ['company_name', 'Maurya Enterprises', 'string', 'Company legal name'],
            ['copyright_notice', '© 2025 Maurya Enterprises. All rights reserved.', 'string', 'Copyright notice']
        ];

        for (const setting of settings) {
            await this.runQuery('INSERT OR IGNORE INTO settings (key, value, type, description) VALUES (?, ?, ?, ?)', setting);
        }

        console.log('MTech sample data inserted successfully');
    }

    runQuery(query, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(query, params, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.db.close((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('MTech database connection closed');
                    resolve();
                }
            });
        });
    }
}

module.exports = DatabaseManager;
