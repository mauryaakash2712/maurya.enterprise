# 🚀 MTech Deployment Guide

This guide covers deploying the MTech electronics store application by Maurya Enterprises to various platforms.

## 🌐 Frontend Deployment

### Netlify Deployment

1. **Build the frontend** (if needed):
   ```bash
   # No build step needed for vanilla HTML/CSS/JS
   # Just ensure all files are in the root directory
   ```

2. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command: (none needed)
   - Set publish directory: `./` (root)
   - Configure environment variables for API URL

3. **Configure API Base URL**:
   ```javascript
   // In app.js, update the API_BASE_URL for production
   const API_BASE_URL = process.env.NODE_ENV === 'production' 
     ? 'https://mtech-api.herokuapp.com/api'
     : 'http://localhost:3000/api';
   ```

### Vercel Deployment

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variables** in Vercel dashboard

## 🖥️ Backend Deployment

### Heroku Deployment

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create Heroku app**:
   ```bash
   heroku create mtech-api
   ```

3. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=mtech-super-secret-maurya-enterprises-2025
   heroku config:set PORT=80
   ```

4. **Create Procfile**:
   ```
   web: node server.js
   ```

5. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy MTech to Heroku"
   git push heroku main
   ```

### Digital Ocean Deployment

1. **Create Droplet** with Node.js
2. **Install dependencies**:
   ```bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

3. **Clone and setup**:
   ```bash
   git clone https://github.com/maurya-enterprises/mtech.git
   cd mtech
   npm install
   ```

4. **Start with PM2**:
   ```bash
   pm2 start server.js --name "mtech-api"
   pm2 startup
   pm2 save
   ```

5. **Configure Nginx** (optional):
   ```nginx
   server {
       listen 80;
       server_name mtech.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Railway Deployment

1. **Connect GitHub repository** to Railway
2. **Set environment variables** in Railway dashboard
3. **Deploy automatically** from GitHub

## 📊 Database Deployment

### SQLite (Development)
- Local file-based database
- Included in the repository
- Suitable for development and small deployments

### PostgreSQL (Production)

1. **Install PostgreSQL adapter**:
   ```bash
   npm install pg
   ```

2. **Update database.js** for PostgreSQL:
   ```javascript
   const { Pool } = require('pg');
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL,
     ssl: process.env.NODE_ENV === 'production'
   });
   ```

3. **Set DATABASE_URL** environment variable

### MongoDB (Alternative)

1. **Install MongoDB adapter**:
   ```bash
   npm install mongoose
   ```

2. **Update models** for MongoDB schema
3. **Set MONGODB_URI** environment variable

## 🔧 Production Optimizations

### Frontend Optimizations

1. **Minify CSS and JavaScript**:
   ```bash
   npm install -g clean-css-cli uglify-js
   cleancss -o style.min.css style.css
   uglifyjs app.js -o app.min.js
   ```

2. **Optimize images**:
   - Use WebP format when possible
   - Compress images
   - Implement lazy loading

3. **Enable CDN** for static assets

### Backend Optimizations

1. **Enable compression**:
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Add caching headers**:
   ```javascript
   app.use(express.static('public', {
     maxAge: '1d'
   }));
   ```

3. **Use clustering**:
   ```javascript
   const cluster = require('cluster');
   const numCPUs = require('os').cpus().length;

   if (cluster.isMaster) {
     for (let i = 0; i < numCPUs; i++) {
       cluster.fork();
     }
   } else {
     app.listen(PORT);
   }
   ```

## 📈 Monitoring and Analytics

### Error Tracking
```bash
npm install sentry
```

### Performance Monitoring
```bash
npm install @newrelic/newrelic
```

### Health Checks
```javascript
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'MTech API',
    company: 'Maurya Enterprises',
    timestamp: new Date().toISOString() 
  });
});
```

## 🔒 Security in Production

1. **Use HTTPS everywhere**
2. **Set secure headers**:
   ```javascript
   app.use(helmet({
     hsts: {
       maxAge: 31536000,
       includeSubDomains: true,
       preload: true
     }
   }));
   ```

3. **Environment secrets**:
   - Never commit sensitive data
   - Use proper environment variable management
   - Rotate secrets regularly

4. **Rate limiting**:
   ```javascript
   const rateLimit = require('express-rate-limit');
   app.use(rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100,
     message: 'Too many requests from this IP - MTech API'
   }));
   ```

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database setup and migrations run
- [ ] HTTPS certificate installed
- [ ] Domain name configured (mtech.com)
- [ ] Error tracking setup
- [ ] Monitoring configured
- [ ] Backup strategy implemented
- [ ] CI/CD pipeline configured
- [ ] Performance testing completed
- [ ] Security scan performed

## 🌍 Domain Configuration

### DNS Settings
```
A     @     Your-Server-IP
A     www   Your-Server-IP
CNAME api   mtech-api.herokuapp.com
```

### SSL Certificate
```bash
# Using Let's Encrypt
sudo certbot --nginx -d mtech.com -d www.mtech.com
```

## 📱 Mobile App Deployment (Future)

Consider these platforms for mobile app deployment:
- **React Native** for cross-platform mobile app
- **Flutter** for high-performance mobile experience
- **Ionic** for web-to-mobile conversion

## 🚀 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: MTech Deployment
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "mtech-api"
          heroku_email: "admin@mtech.com"
```

## 📞 Deployment Support

For deployment assistance:
- **Email**: devops@mtech.com
- **Technical Support**: +91-98765-43210
- **GitHub Issues**: Create deployment-related issues

---

**© 2025 Maurya Enterprises. All rights reserved.**

**Need help with deployment? Contact our technical team at Maurya Enterprises!**
