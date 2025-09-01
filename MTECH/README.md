# 🤖 MTech - Full Stack Electronics Store

A comprehensive full-stack electronics e-commerce platform for **MTech** by **Maurya Enterprises**, built with modern web technologies. This project features both frontend (HTML, CSS, JavaScript) and backend (Node.js, Express, SQLite) code for a complete online electronics store.

## 🌟 Features

### Frontend Features
- **Modern Responsive Design** - Clean, professional UI optimized for all devices
- **Product Catalog** - Comprehensive product listings with search and filtering
- **Shopping Cart** - Full cart functionality with add/remove items
- **User Authentication** - Login/register system with session management  
- **Product Details** - Detailed product pages with specifications and reviews
- **Category Navigation** - Organized product categories (Arduino, Raspberry Pi, Sensors, etc.)
- **Real-time Search** - Instant search with auto-suggestions
- **Mobile-First Design** - Optimized for mobile and tablet devices

### Backend Features
- **RESTful API** - Complete REST API with proper HTTP methods
- **User Authentication** - JWT-based authentication and authorization
- **Product Management** - Full CRUD operations for products
- **Order Processing** - Complete order management system
- **Shopping Cart API** - Persistent cart functionality
- **Review System** - Customer reviews and ratings
- **Database Management** - SQLite database with proper relationships
- **Security** - Rate limiting, input validation, and CORS protection

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with flexbox and grid
- **Vanilla JavaScript** - ES6+ features for interactivity
- **Font Awesome** - Icons and visual elements

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **SQLite** - Lightweight database
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/maurya-enterprises/mtech.git
cd mtech
```

### 2. Backend Setup
```bash
# Install backend dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

### 3. Database Setup
```bash
# Initialize the database (run once)
node -e "const DB = require('./database.js'); new DB().initialize();"
```

### 4. Start the Backend Server
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:3000`

### 5. Frontend Setup
The frontend files are already ready to use. Simply open `index.html` in your browser or serve it using a web server:

```bash
# Using Python (if available)
python3 -m http.server 3001

# Using Node.js http-server (install globally first)
npm install -g http-server
http-server . -p 3001
```

The frontend will be available at `http://localhost:3001`

## 📊 Database Schema

The application uses SQLite with the following main tables:

- **users** - User accounts and profiles
- **categories** - Product categories
- **products** - Product catalog with specifications
- **cart_items** - Shopping cart items
- **orders** - Customer orders
- **order_items** - Individual order line items
- **reviews** - Product reviews and ratings
- **coupons** - Discount codes and promotions

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories

### Shopping Cart
- `GET /api/cart` - Get cart items (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:itemId` - Update cart item (protected)
- `DELETE /api/cart/:itemId` - Remove cart item (protected)

### Orders
- `GET /api/orders` - Get user orders (protected)
- `POST /api/orders` - Create new order (protected)

### Reviews
- `GET /api/products/:id/reviews` - Get product reviews
- `POST /api/products/:id/reviews` - Add product review (protected)

## 🏗️ Project Structure

```
mtech/
├── frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # CSS styles
│   └── app.js              # Frontend JavaScript
├── backend/
│   ├── server.js           # Main Express server
│   ├── database.js         # Database setup and migrations
│   ├── middleware.js       # Authentication and security
│   ├── package.json        # Dependencies and scripts
│   └── .env.example        # Environment configuration template
├── database/
│   └── mtech_store.db      # SQLite database file
└── README.md               # This file
```

## 🛒 Sample Products

The application comes with sample data including:

- **Arduino UNO R3** - Original Arduino microcontroller board
- **Raspberry Pi 4 8GB** - Single-board computer for advanced projects
- **ESP32 DevKit** - WiFi and Bluetooth development board
- **HC-SR04 Sensor** - Ultrasonic distance sensor
- **SG90 Servo Motor** - Micro servo for robotics projects
- **DHT22 Sensor** - Temperature and humidity sensor
- **L293D Motor Driver** - DC motor driver IC
- **Arduino Starter Kit** - Complete beginner kit

## 🎨 Design Inspiration

The design is inspired by professional electronics e-commerce platforms:

- Clean, modern interface with professional color scheme
- Product-focused layout with clear categorization
- Technical specifications prominently displayed
- Mobile-responsive design for all devices
- Easy navigation and search functionality

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt for secure password storage
- **Rate Limiting** - Prevent API abuse and brute force attacks
- **Input Validation** - Sanitize and validate user inputs
- **CORS Protection** - Controlled cross-origin requests
- **Helmet Security** - Various security headers

## 📱 Mobile Optimization

- **Responsive Design** - Adapts to all screen sizes
- **Touch-Friendly** - Large buttons and touch targets
- **Mobile Menu** - Collapsible navigation for mobile
- **Fast Loading** - Optimized images and code
- **Progressive Enhancement** - Works without JavaScript

## 🧪 Testing

To test the API endpoints:

```bash
# Test user registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test product listing
curl http://localhost:3000/api/products

# Test search
curl "http://localhost:3000/api/products?search=arduino"
```

## 🔧 Configuration

### Environment Variables (.env)
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=mtech-secret-key-maurya-enterprises
DB_PATH=./database/mtech_store.db
FRONTEND_URL=http://localhost:3001
```

### Features Toggle
You can enable/disable features in the frontend by modifying `app.js`:
```javascript
const config = {
    enableWishlist: true,
    enableReviews: true,
    enableCoupons: true,
    enableGuestCheckout: false
};
```

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables
3. Push to Heroku git repository

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend assets
2. Configure API base URL for production
3. Deploy to your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Robu.in** - Inspiration for design and functionality
- **Arduino Community** - For the amazing open-source hardware
- **Express.js Team** - For the excellent web framework
- **Font Awesome** - For the beautiful icons

## 📞 Support

For support and questions:
- Email: support@mtech.com
- GitHub Issues: [Create an issue](https://github.com/maurya-enterprises/mtech/issues)

## 📝 Copyright

**© 2025 Maurya Enterprises. All rights reserved.**

MTech is a trademark of Maurya Enterprises. This software is developed and maintained by Maurya Enterprises for the electronics and maker community.

---

**Made with ❤️ by Maurya Enterprises for the electronics and maker community**
