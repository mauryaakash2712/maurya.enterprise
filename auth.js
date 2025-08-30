// Enhanced Customer Authentication System with Email Integration - auth.js

class EnhancedCustomerAuthSystem {
    constructor() {
        this.currentUser = null;
        this.otpData = null;
        this.sessionTimeout = null;
        this.emailService = new EmailService();
        this.smsService = new SMSService();
        this.init();
    }

    init() {
        this.loadSession();
        this.setupEventListeners();
        this.updateUI();
        
        // Auto-login if remember me is active
        if (localStorage.getItem('mtechRememberMe') === 'true') {
            this.autoLogin();
        }
        
        console.log('Enhanced Customer Authentication System initialized');
    }

    setupEventListeners() {
        // Form submissions
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const otpForm = document.getElementById('otpForm');
        const forgotPasswordForm = document.getElementById('forgotPasswordForm');
        const profileForm = document.getElementById('profileForm');
        const settingsForm = document.getElementById('settingsForm');

        if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        if (registerForm) registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        if (otpForm) otpForm.addEventListener('submit', (e) => this.handleOTPVerification(e));
        if (forgotPasswordForm) forgotPasswordForm.addEventListener('submit', (e) => this.handleForgotPassword(e));
        if (profileForm) profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
        if (settingsForm) settingsForm.addEventListener('submit', (e) => this.handleSettingsUpdate(e));

        // Button clicks
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
        const accountBtn = document.getElementById('accountBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const myAccountLink = document.getElementById('myAccountLink');

        if (loginBtn) loginBtn.addEventListener('click', () => this.showLoginModal());
        if (registerBtn) registerBtn.addEventListener('click', () => this.showRegisterModal());
        if (accountBtn) accountBtn.addEventListener('click', () => this.showUserAccount());
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());
        if (myAccountLink) myAccountLink.addEventListener('click', (e) => { e.preventDefault(); this.showUserAccount(); });

        // Password strength checker
        const registerPassword = document.getElementById('registerPassword');
        if (registerPassword) {
            registerPassword.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
        }

        // OTP input handling
        this.setupOTPInputs();
        
        // Account tabs
        this.setupAccountTabs();

        // Close modals on outside click
        window.addEventListener('click', (e) => this.handleModalClicks(e));
    }

    // === ENHANCED REGISTRATION SYSTEM ===
    async handleRegister(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            email: document.getElementById('registerEmail').value.trim().toLowerCase(),
            mobile: document.getElementById('countryCode').value + document.getElementById('registerMobile').value.trim(),
            password: document.getElementById('registerPassword').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            dateOfBirth: document.getElementById('dateOfBirth').value || null,
            gender: document.getElementById('gender').value || null,
            agreeTerms: document.getElementById('agreeTerms').checked,
            newsletter: document.getElementById('newsletter').checked
        };

        // Validation
        if (!this.validateRegistration(formData)) {
            return;
        }

        try {
            // Check if user already exists
            const existingUsers = this.getStoredUsers();
            
            if (existingUsers.find(u => u.email === formData.email)) {
                this.showToast('Email already registered. Please use a different email or sign in.', 'error');
                return;
            }

            if (existingUsers.find(u => u.mobile === formData.mobile)) {
                this.showToast('Mobile number already registered. Please use a different number or sign in.', 'error');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now(),
                firstName: formData.firstName,
                lastName: formData.lastName,
                fullName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                mobile: formData.mobile,
                password: this.hashPassword(formData.password),
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                newsletter: formData.newsletter,
                verified: false,
                emailVerified: false,
                mobileVerified: false,
                registrationDate: new Date().toISOString(),
                lastLogin: null,
                loginCount: 0,
                status: 'active',
                addresses: [],
                preferences: {
                    emailNotifications: true,
                    smsNotifications: true,
                    promotionalEmails: formData.newsletter
                },
                orderHistory: [],
                wishlist: [],
                cart: []
            };

            // Save user to storage
            const users = this.getStoredUsers();
            users.push(newUser);
            this.saveUsers(users);

            // Send welcome email
            await this.emailService.sendWelcomeEmail(newUser);

            // Send OTP for mobile verification
            await this.smsService.sendOTP(formData.mobile, 'registration', newUser);
            
            this.showToast('Registration successful! Please verify your mobile number. Welcome email sent!', 'success');
            this.closeRegisterModal();

            // Log registration activity
            this.logUserActivity(newUser.id, 'account_created', 'User registered successfully');

        } catch (error) {
            console.error('Registration error:', error);
            this.showToast('Registration failed. Please try again.', 'error');
        }
    }

    // === ENHANCED LOGIN SYSTEM ===
    async handleLogin(e) {
        e.preventDefault();
        
        const identifier = document.getElementById('loginIdentifier').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (!identifier || !password) {
            this.showToast('Please fill in all fields', 'error');
            return;
        }

        try {
            const users = this.getStoredUsers();
            
            // Find user by email or mobile
            const user = users.find(u => 
                u.email === identifier.toLowerCase() || 
                u.mobile === identifier ||
                u.mobile.endsWith(identifier) // Allow partial mobile matching
            );

            if (!user) {
                this.showToast('Account not found. Please check your email/mobile number or register.', 'error');
                this.logSecurityEvent('failed_login', { identifier, reason: 'user_not_found' });
                return;
            }

            // Verify password
            if (!this.verifyPassword(password, user.password)) {
                this.showToast('Invalid password. Please try again.', 'error');
                this.logSecurityEvent('failed_login', { identifier, reason: 'invalid_password' });
                return;
            }

            // Check if account is verified
            if (!user.verified && !user.mobileVerified) {
                this.showToast('Please verify your mobile number first.', 'error');
                await this.smsService.sendOTP(user.mobile, 'verification', user);
                return;
            }

            // Login successful
            user.lastLogin = new Date().toISOString();
            user.loginCount = (user.loginCount || 0) + 1;
            
            // Update user in storage
            const userIndex = users.findIndex(u => u.id === user.id);
            users[userIndex] = user;
            this.saveUsers(users);

            // Send login notification email
            await this.emailService.sendLoginNotification(user);

            // Set current user and session
            this.currentUser = user;
            this.setSession(rememberMe);
            
            // Update UI
            this.updateUI();
            this.closeLoginModal();
            
            this.showToast(`Welcome back, ${user.firstName}!`, 'success');
            
            // Log activity
            this.logUserActivity(user.id, 'login', 'User logged in successfully');

        } catch (error) {
            console.error('Login error:', error);
            this.showToast('Login failed. Please try again.', 'error');
        }
    }

    // === ENHANCED OTP SYSTEM ===
    async sendOTP(mobile, type, userData = null) {
        try {
            const otp = await this.smsService.sendOTP(mobile, type, userData);
            this.showOtpModal(mobile, type);
            this.startOTPCountdown();

            // Log OTP generation
            if (userData) {
                this.logUserActivity(userData.id, 'otp_sent', `OTP sent for ${type}`);
            }
        } catch (error) {
            console.error('OTP send error:', error);
            this.showToast('Failed to send OTP. Please try again.', 'error');
        }
    }

    handleOTPVerification(e) {
        e.preventDefault();
        
        if (!this.otpData && !this.smsService.otpData) {
            this.showToast('OTP session expired. Please request a new OTP.', 'error');
            return;
        }

        // Get OTP from inputs
        const otpInputs = document.querySelectorAll('.otp-input');
        const enteredOTP = Array.from(otpInputs).map(input => input.value).join('');

        if (enteredOTP.length !== 6 || !/^\d{6}$/.test(enteredOTP)) {
            this.showToast('Please enter a valid 6-digit OTP', 'error');
            return;
        }

        // Verify OTP through SMS service
        const verified = this.smsService.verifyOTP(enteredOTP);
        
        if (!verified) {
            this.shakeOTPInputs();
            return;
        }

        // OTP verified successfully
        this.handleOTPSuccess();
    }

    async handleOTPSuccess() {
        const { type, userData } = this.smsService.otpData;
        
        if (type === 'registration' && userData) {
            // Mark user as verified
            const users = this.getStoredUsers();
            const userIndex = users.findIndex(u => u.id === userData.id);
            
            if (userIndex !== -1) {
                users[userIndex].verified = true;
                users[userIndex].mobileVerified = true;
                this.saveUsers(users);
                
                // Send confirmation email
                await this.emailService.sendVerificationConfirmation(users[userIndex]);
                
                this.showToast('Mobile number verified! Confirmation email sent.', 'success');
                this.logUserActivity(userData.id, 'mobile_verified', 'Mobile number verified successfully');
            }
        } else if (type === 'verification') {
            // Update existing user verification status
            const users = this.getStoredUsers();
            const userIndex = users.findIndex(u => u.id === userData.id);
            
            if (userIndex !== -1) {
                users[userIndex].verified = true;
                users[userIndex].mobileVerified = true;
                this.saveUsers(users);
                
                this.showToast('Mobile number verified successfully!', 'success');
                this.logUserActivity(userData.id, 'mobile_verified', 'Mobile number verified');
            }
        }

        this.smsService.clearOTP();
        this.closeOtpModal();
    }

    // === ENHANCED PROFILE MANAGEMENT ===
    async handleProfileUpdate(e) {
        e.preventDefault();
        
        if (!this.currentUser) return;

        const updatedData = {
            firstName: document.getElementById('profileFirstName').value.trim(),
            lastName: document.getElementById('profileLastName').value.trim(),
            email: document.getElementById('profileEmail').value.trim().toLowerCase(),
            mobile: document.getElementById('profileMobile').value.trim(),
            dateOfBirth: document.getElementById('profileDOB').value || null,
            gender: document.getElementById('profileGender').value || null
        };

        // Validation
        if (!updatedData.firstName || !updatedData.lastName || !updatedData.email || !updatedData.mobile) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        if (!this.isValidEmail(updatedData.email)) {
            this.showToast('Please enter a valid email address', 'error');
            return;
        }

        try {
            // Update user data
            const users = this.getStoredUsers();
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            
            if (userIndex !== -1) {
                users[userIndex] = {
                    ...users[userIndex],
                    ...updatedData,
                    fullName: `${updatedData.firstName} ${updatedData.lastName}`
                };
                
                this.saveUsers(users);
                this.currentUser = users[userIndex];
                this.updateUI();
                
                // Send profile update confirmation email
                await this.emailService.sendProfileUpdateConfirmation(this.currentUser);
                
                this.showToast('Profile updated successfully! Confirmation email sent.', 'success');
                this.logUserActivity(this.currentUser.id, 'profile_updated', 'User updated profile information');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            this.showToast('Failed to update profile. Please try again.', 'error');
        }
    }

    // === SOCIAL LOGIN INTEGRATION ===
    async loginWithGoogle() {
        try {
            // Initialize Google OAuth (placeholder - requires actual Google OAuth setup)
            if (typeof google !== 'undefined' && google.accounts) {
                // Real Google OAuth integration
                this.initializeGoogleOAuth();
            } else {
                this.showToast('Google login is being set up. Please use email/mobile login for now.', 'info');
            }
        } catch (error) {
            console.error('Google login error:', error);
            this.showToast('Google login temporarily unavailable. Please try email/mobile login.', 'error');
        }
    }

    async loginWithFacebook() {
        try {
            // Initialize Facebook OAuth (placeholder - requires actual Facebook OAuth setup)
            if (typeof FB !== 'undefined') {
                // Real Facebook OAuth integration
                this.initializeFacebookOAuth();
            } else {
                this.showToast('Facebook login is being set up. Please use email/mobile login for now.', 'info');
            }
        } catch (error) {
            console.error('Facebook login error:', error);
            this.showToast('Facebook login temporarily unavailable. Please try email/mobile login.', 'error');
        }
    }

    initializeGoogleOAuth() {
        // Placeholder for Google OAuth initialization
        // In production, you would integrate with Google OAuth 2.0
        this.showToast('Google OAuth integration in progress. Contact admin for setup.', 'info');
    }

    initializeFacebookOAuth() {
        // Placeholder for Facebook OAuth initialization
        // In production, you would integrate with Facebook Login
        this.showToast('Facebook OAuth integration in progress. Contact admin for setup.', 'info');
    }

    // === REST OF THE EXISTING METHODS (keeping all original functionality) ===
    getStoredUsers() {
        return JSON.parse(localStorage.getItem('mtechUsers')) || [];
    }

    saveUsers(users) {
        localStorage.setItem('mtechUsers', JSON.stringify(users));
        this.saveCustomerDatabase(users);
    }

    saveCustomerDatabase(users) {
        const customerDatabase = users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            email: user.email,
            mobile: user.mobile,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
            newsletter: user.newsletter,
            verified: user.verified,
            emailVerified: user.emailVerified,
            mobileVerified: user.mobileVerified,
            registrationDate: user.registrationDate,
            lastLogin: user.lastLogin,
            loginCount: user.loginCount,
            status: user.status,
            totalOrders: user.orderHistory ? user.orderHistory.length : 0,
            totalSpent: user.orderHistory ? user.orderHistory.reduce((sum, order) => sum + (order.total || 0), 0) : 0,
            preferences: user.preferences
        }));
        
        localStorage.setItem('mtechCustomerDatabase', JSON.stringify(customerDatabase));
    }

    // Keep all existing methods for validation, session management, UI updates, etc.
    validateRegistration(data) {
        if (!data.firstName || data.firstName.length < 2) {
            this.showToast('Please enter a valid first name (at least 2 characters)', 'error');
            return false;
        }

        if (!data.lastName || data.lastName.length < 2) {
            this.showToast('Please enter a valid last name (at least 2 characters)', 'error');
            return false;
        }

        if (!this.isValidEmail(data.email)) {
            this.showToast('Please enter a valid email address', 'error');
            return false;
        }

        if (!this.isValidMobile(data.mobile)) {
            this.showToast('Please enter a valid mobile number', 'error');
            return false;
        }

        if (data.password.length < 8) {
            this.showToast('Password must be at least 8 characters long', 'error');
            return false;
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
            this.showToast('Password must contain at least one uppercase letter, one lowercase letter, and one number', 'error');
            return false;
        }

        if (data.password !== data.confirmPassword) {
            this.showToast('Passwords do not match', 'error');
            return false;
        }

        if (!data.agreeTerms) {
            this.showToast('Please agree to the Terms of Service and Privacy Policy', 'error');
            return false;
        }

        return true;
    }

    hashPassword(password) {
        return btoa(password + 'mtech_salt_2025');
    }

    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidMobile(mobile) {
        const mobileRegex = /^\+\d{1,3}\d{7,14}$/;
        return mobileRegex.test(mobile);
    }

    // Keep all existing UI methods, session management, utility functions, etc.
    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userWelcome = document.getElementById('userWelcome');
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');

        if (this.currentUser) {
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) userMenu.style.display = 'block';
            
            if (userWelcome) userWelcome.textContent = `Hi, ${this.currentUser.firstName}`;
            if (userName) userName.textContent = this.currentUser.fullName;
            if (userEmail) userEmail.textContent = this.currentUser.email;
        } else {
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    // Keep all other existing methods...
    // [All other methods from the original auth.js remain the same]

    showToast(message, type = 'success') {
        document.querySelectorAll('.toast').forEach(toast => toast.remove());
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}-toast`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 10000;
            padding: 1rem 2rem; border-radius: 8px; font-weight: 500;
            max-width: 400px; word-wrap: break-word;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease-out;
            ${type === 'success' ? 'background: #d4edda; color: #155724; border-left: 4px solid #28a745;' : 
              type === 'error' ? 'background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545;' :
              'background: #cce5ff; color: #004085; border-left: 4px solid #007bff;'}
        `;
        
        document.body.appendChild(toast);
        setTimeout(() => toast.parentElement && toast.remove(), 5000);
        toast.addEventListener('click', () => toast.remove());
    }

    // Add all remaining methods from original implementation...
    [/* All other methods remain the same */]
}

// Email Service Class
class EmailService {
    constructor() {
        this.apiEndpoint = 'https://api.emailservice.com/send'; // Replace with actual service
        this.apiKey = 'your-email-service-api-key'; // Replace with actual API key
    }

    async sendWelcomeEmail(user) {
        const emailData = {
            to: user.email,
            subject: 'Welcome to MTech - Your Account is Created!',
            html: this.generateWelcomeEmailHTML(user),
            from: 'welcome@maurya.enterprises'
        };

        return this.sendEmail(emailData);
    }

    async sendLoginNotification(user) {
        const emailData = {
            to: user.email,
            subject: 'MTech Account Login Detected',
            html: this.generateLoginNotificationHTML(user),
            from: 'security@maurya.enterprises'
        };

        return this.sendEmail(emailData);
    }

    async sendVerificationConfirmation(user) {
        const emailData = {
            to: user.email,
            subject: 'MTech Account Verified Successfully',
            html: this.generateVerificationHTML(user),
            from: 'verify@maurya.enterprises'
        };

        return this.sendEmail(emailData);
    }

    async sendProfileUpdateConfirmation(user) {
        const emailData = {
            to: user.email,
            subject: 'MTech Profile Updated',
            html: this.generateProfileUpdateHTML(user),
            from: 'account@maurya.enterprises'
        };

        return this.sendEmail(emailData);
    }

    async sendEmail(emailData) {
        try {
            // In demo mode, log email instead of sending
            console.log('📧 EMAIL SENT:', emailData);
            
            // Store email for admin viewing
            const emails = JSON.parse(localStorage.getItem('mtechEmailsSent')) || [];
            emails.unshift({
                ...emailData,
                timestamp: new Date().toISOString(),
                id: Date.now()
            });
            localStorage.setItem('mtechEmailsSent', JSON.stringify(emails.slice(0, 100)));
            
            return { success: true, message: 'Email sent successfully' };
        } catch (error) {
            console.error('Email send error:', error);
            return { success: false, error: error.message };
        }
    }

    generateWelcomeEmailHTML(user) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); color: white; padding: 2rem; text-align: center;">
                    <h1>Welcome to MTech!</h1>
                    <p>by Maurya Enterprises</p>
                </div>
                <div style="padding: 2rem; background: #f8f9fa;">
                    <h2>Hello ${user.firstName}!</h2>
                    <p>Thank you for joining MTech, your trusted destination for premium electronics.</p>
                    <p>Your account has been successfully created with the following details:</p>
                    <ul>
                        <li><strong>Name:</strong> ${user.fullName}</li>
                        <li><strong>Email:</strong> ${user.email}</li>
                        <li><strong>Mobile:</strong> ${user.mobile}</li>
                    </ul>
                    <p>Please verify your mobile number to complete your account setup.</p>
                    <div style="text-align: center; margin: 2rem 0;">
                        <a href="https://maurya.enterprises" style="background: #ff6b35; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 5px;">Start Shopping</a>
                    </div>
                </div>
                <div style="background: #2c3e50; color: white; padding: 1rem; text-align: center;">
                    <p>&copy; 2025 MTech by Maurya Enterprises. All rights reserved.</p>
                </div>
            </div>
        `;
    }

    generateLoginNotificationHTML(user) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #007bff; color: white; padding: 1rem; text-align: center;">
                    <h2>Login Notification</h2>
                </div>
                <div style="padding: 2rem;">
                    <p>Hello ${user.firstName},</p>
                    <p>Your MTech account was accessed on ${new Date().toLocaleString()}.</p>
                    <p>If this wasn't you, please contact our support team immediately.</p>
                    <p>Thank you for choosing MTech!</p>
                </div>
            </div>
        `;
    }

    generateVerificationHTML(user) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #28a745; color: white; padding: 1rem; text-align: center;">
                    <h2>✅ Account Verified!</h2>
                </div>
                <div style="padding: 2rem;">
                    <p>Congratulations ${user.firstName}!</p>
                    <p>Your MTech account has been successfully verified. You can now enjoy all features of our platform.</p>
                    <div style="text-align: center; margin: 2rem 0;">
                        <a href="https://maurya.enterprises" style="background: #28a745; color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 5px;">Start Shopping</a>
                    </div>
                </div>
            </div>
        `;
    }

    generateProfileUpdateHTML(user) {
        return `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #ffc107; color: #333; padding: 1rem; text-align: center;">
                    <h2>Profile Updated</h2>
                </div>
                <div style="padding: 2rem;">
                    <p>Hello ${user.firstName},</p>
                    <p>Your MTech profile has been successfully updated.</p>
                    <p>If you didn't make these changes, please contact our support team.</p>
                </div>
            </div>
        `;
    }
}

// SMS Service Class
class SMSService {
    constructor() {
        this.apiEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json';
        this.apiKey = 'your-twilio-api-key'; // Replace with actual Twilio credentials
        this.otpData = null;
    }

    async sendOTP(mobile, type, userData) {
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        
        this.otpData = {
            otp: otp,
            mobile: mobile,
            type: type,
            userData: userData,
            timestamp: Date.now(),
            attempts: 0,
            maxAttempts: 3
        };

        // In demo mode, show OTP in console and alert
        console.log(`📱 SMS OTP for ${mobile}: ${otp}`);
        
        // Show demo alert
        setTimeout(() => {
            alert(`🔔 SMS RECEIVED\n\nMTech Verification Code: ${otp}\n\nFrom: MTech-Maurya\nTime: ${new Date().toLocaleTimeString()}\n\n⚠️ Demo Mode: In production, this will be sent as real SMS`);
        }, 1000);

        // In production, replace with actual SMS API call:
        /*
        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(this.apiKey)}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'To': mobile,
                    'From': '+1234567890', // Your Twilio number
                    'Body': `MTech Verification Code: ${otp}. Valid for 5 minutes. Do not share this code.`
                })
            });
            
            if (!response.ok) throw new Error('SMS send failed');
            
            return { success: true, otp: otp };
        } catch (error) {
            console.error('SMS send error:', error);
            throw error;
        }
        */

        return { success: true, otp: otp };
    }

    verifyOTP(enteredOTP) {
        if (!this.otpData) {
            customerAuth.showToast('OTP session expired. Please request a new OTP.', 'error');
            return false;
        }

        this.otpData.attempts++;
        
        if (this.otpData.attempts > this.otpData.maxAttempts) {
            customerAuth.showToast('Too many failed attempts. Please request a new OTP.', 'error');
            this.otpData = null;
            return false;
        }

        if (enteredOTP !== this.otpData.otp) {
            const remaining = this.otpData.maxAttempts - this.otpData.attempts;
            customerAuth.showToast(`Invalid OTP. ${remaining} attempt(s) remaining.`, 'error');
            return false;
        }

        return true;
    }

    clearOTP() {
        this.otpData = null;
    }
}

// Initialize enhanced customer authentication system
let customerAuth;

document.addEventListener('DOMContentLoaded', function() {
    customerAuth = new EnhancedCustomerAuthSystem();
    
    // Make functions globally accessible for onclick handlers
    window.showLoginModal = () => customerAuth.showLoginModal();
    window.showRegisterModal = () => customerAuth.showRegisterModal();
    window.closeLoginModal = () => customerAuth.closeLoginModal();
    window.closeRegisterModal = () => customerAuth.closeRegisterModal();
    window.closeOtpModal = () => customerAuth.closeOtpModal();
    window.closeUserAccountModal = () => customerAuth.closeUserAccountModal();
    window.closeForgotPasswordModal = () => customerAuth.closeForgotPasswordModal();
    window.showForgotPassword = () => customerAuth.showForgotPassword();
    window.togglePassword = (id) => customerAuth.togglePassword(id);
    window.loginWithGoogle = () => customerAuth.loginWithGoogle();
    window.loginWithFacebook = () => customerAuth.loginWithFacebook();
    window.registerWithGoogle = () => customerAuth.registerWithGoogle();
    window.registerWithFacebook = () => customerAuth.registerWithFacebook();
    window.deleteAccount = () => customerAuth.deleteAccount();
    window.showTerms = () => customerAuth.showTerms();
    window.showPrivacy = () => customerAuth.showPrivacy();
    window.showAddAddress = () => customerAuth.showAddAddress();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnhancedCustomerAuthSystem, EmailService, SMSService };
}
