const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

/**
 * MTech API Middleware - Maurya Enterprises
 * Copyright © 2025 Maurya Enterprises. All rights reserved.
 */

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
    authenticateToken(req, res, () => {
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        next();
    });
};

// Rate limiting middleware
const createRateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
    return rateLimit({
        windowMs: windowMs, // 15 minutes by default
        max: max, // limit each IP to 100 requests per windowMs
        message: {
            error: 'Too many requests from this IP, please try again later.'
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
};

// Different rate limits for different endpoints
const authRateLimit = createRateLimit(15 * 60 * 1000, 5); // 5 attempts per 15 minutes for auth
const apiRateLimit = createRateLimit(15 * 60 * 1000, 100); // 100 requests per 15 minutes for API
const strictRateLimit = createRateLimit(60 * 1000, 10); // 10 requests per minute for sensitive operations

// Security middleware
const securityMiddleware = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", "https://cdnjs.cloudflare.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
    crossOriginEmbedderPolicy: false
});

// Input validation middleware
const validateProductInput = (req, res, next) => {
    const { name, category, price } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Product name is required' });
    }

    if (!category || typeof category !== 'string') {
        return res.status(400).json({ error: 'Product category is required' });
    }

    if (!price || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Valid product price is required' });
    }

    next();
};

const validateUserInput = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required' });
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Valid email is required' });
    }

    if (req.method === 'POST' && (!password || typeof password !== 'string' || password.length < 6)) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    next();
};

// Email validation helper
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('MTech API Error:', err.stack);

    if (err.type === 'entity.too.large') {
        return res.status(413).json({ error: 'File too large' });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
    }

    if (err.code === 'SQLITE_CONSTRAINT') {
        return res.status(409).json({ error: 'Resource already exists' });
    }

    res.status(500).json({ error: 'Internal server error' });
};

// Request logging middleware
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] MTech API: ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next();
};

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:3001', 
            'https://mtech.com',
            'https://www.mtech.com',
            process.env.FRONTEND_URL
        ].filter(Boolean);

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = {
    authenticateToken,
    authenticateAdmin,
    authRateLimit,
    apiRateLimit,
    strictRateLimit,
    securityMiddleware,
    validateProductInput,
    validateUserInput,
    errorHandler,
    requestLogger,
    corsOptions
};
