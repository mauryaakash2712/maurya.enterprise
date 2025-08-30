// Complete Customer Authentication System - auth.js

class CustomerAuthSystem {
    constructor() {
        this.currentUser = null;
        this.otpData = null;
        this.sessionTimeout = null;
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
        
        console.log('Customer Authentication System initialized');
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

    // === REGISTRATION SYSTEM ===
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

            // Send OTP for mobile verification
            this.sendOTP(formData.mobile, 'registration', newUser);
            
            this.showToast('Registration successful! Please verify your mobile number.', 'success');
            this.closeRegisterModal();

            // Log registration activity
            this.logUserActivity(newUser.id, 'account_created', 'User registered successfully');

        } catch (error) {
            console.error('Registration error:', error);
            this.showToast('Registration failed. Please try again.', 'error');
        }
    }

    validateRegistration(data) {
        // Name validation
        if (!data.firstName || data.firstName.length < 2) {
            this.showToast('Please enter a valid first name (at least 2 characters)', 'error');
            return false;
        }

        if (!data.lastName || data.lastName.length < 2) {
            this.showToast('Please enter a valid last name (at least 2 characters)', 'error');
            return false;
        }

        // Email validation
        if (!this.isValidEmail(data.email)) {
            this.showToast('Please enter a valid email address', 'error');
            return false;
        }

        // Mobile validation
        if (!this.isValidMobile(data.mobile)) {
            this.showToast('Please enter a valid mobile number', 'error');
            return false;
        }

        // Password validation
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

        // Terms validation
        if (!data.agreeTerms) {
            this.showToast('Please agree to the Terms of Service and Privacy Policy', 'error');
            return false;
        }

        return true;
    }

    // === LOGIN SYSTEM ===
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
                this.sendOTP(user.mobile, 'verification', user);
                return;
            }

            // Login successful
            user.lastLogin = new Date().toISOString();
            user.loginCount = (user.loginCount || 0) + 1;
            
            // Update user in storage
            const userIndex = users.findIndex(u => u.id === user.id);
            users[userIndex] = user;
            this.saveUsers(users);

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

    // === OTP SYSTEM ===
    sendOTP(mobile, type, userData = null) {
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

        // In production, integrate with SMS service (Twilio, AWS SNS, etc.)
        console.log(`OTP for ${mobile}: ${otp}`);
        
        // Show OTP modal
        this.showOtpModal(mobile, type);
        
        // For demo, show OTP in alert (remove in production)
        setTimeout(() => {
            alert(`Demo OTP for ${mobile}: ${otp}\n\nNote: In production, this will be sent via SMS.`);
        }, 1000);
        
        // Start countdown
        this.startOTPCountdown();

        // Log OTP generation
        if (userData) {
            this.logUserActivity(userData.id, 'otp_sent', `OTP sent for ${type}`);
        }
    }

    handleOTPVerification(e) {
        e.preventDefault();
        
        if (!this.otpData) {
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

        // Check attempts
        this.otpData.attempts++;
        
        if (this.otpData.attempts > this.otpData.maxAttempts) {
            this.showToast('Too many failed attempts. Please request a new OTP.', 'error');
            this.otpData = null;
            this.closeOtpModal();
            return;
        }

        // Verify OTP
        if (enteredOTP !== this.otpData.otp) {
            const remaining = this.otpData.maxAttempts - this.otpData.attempts;
            this.showToast(`Invalid OTP. ${remaining} attempt(s) remaining.`, 'error');
            this.shakeOTPInputs();
            return;
        }

        // OTP verified successfully
        this.handleOTPSuccess();
    }

    handleOTPSuccess() {
        const { type, userData } = this.otpData;
        
        if (type === 'registration' && userData) {
            // Mark user as verified
            const users = this.getStoredUsers();
            const userIndex = users.findIndex(u => u.id === userData.id);
            
            if (userIndex !== -1) {
                users[userIndex].verified = true;
                users[userIndex].mobileVerified = true;
                this.saveUsers(users);
                
                this.showToast('Mobile number verified! Your account is now active.', 'success');
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

        this.otpData = null;
        this.closeOtpModal();
    }

    startOTPCountdown() {
        let timeLeft = 300; // 5 minutes
        const countdownElement = document.getElementById('otpCountdown');
        
        const countdown = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            if (countdownElement) {
                countdownElement.innerHTML = `Resend OTP in ${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                if (countdownElement) {
                    countdownElement.innerHTML = '<a href="#" onclick="customerAuth.resendOTP()" style="color: var(--primary-color);">Resend OTP</a>';
                }
            }
            
            timeLeft--;
        }, 1000);
    }

    resendOTP() {
        if (this.otpData) {
            this.sendOTP(this.otpData.mobile, this.otpData.type, this.otpData.userData);
            this.showToast('OTP resent successfully', 'success');
        }
    }

    // === DATA STORAGE & MANAGEMENT ===
    getStoredUsers() {
        return JSON.parse(localStorage.getItem('mtechUsers')) || [];
    }

    saveUsers(users) {
        localStorage.setItem('mtechUsers', JSON.stringify(users));
        
        // Also save to a separate customer database for admin access
        this.saveCustomerDatabase(users);
    }

    saveCustomerDatabase(users) {
        // Create a sanitized version for admin access (without passwords)
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

    logUserActivity(userId, action, details) {
        const activities = JSON.parse(localStorage.getItem('mtechUserActivities')) || [];
        
        activities.unshift({
            id: Date.now(),
            userId: userId,
            action: action,
            details: details,
            timestamp: new Date().toISOString(),
            ip: 'localhost', // In production, get real IP
            userAgent: navigator.userAgent
        });
        
        // Keep only last 500 activities
        if (activities.length > 500) {
            activities.splice(500);
        }
        
        localStorage.setItem('mtechUserActivities', JSON.stringify(activities));
    }

    logSecurityEvent(event, data) {
        const securityLogs = JSON.parse(localStorage.getItem('mtechSecurityLogs')) || [];
        
        securityLogs.unshift({
            id: Date.now(),
            event: event,
            data: data,
            timestamp: new Date().toISOString(),
            ip: 'localhost',
            userAgent: navigator.userAgent
        });
        
        // Keep only last 100 security events
        if (securityLogs.length > 100) {
            securityLogs.splice(100);
        }
        
        localStorage.setItem('mtechSecurityLogs', JSON.stringify(securityLogs));
    }

    // === SESSION MANAGEMENT ===
    setSession(rememberMe = false) {
        const sessionData = {
            user: {
                id: this.currentUser.id,
                firstName: this.currentUser.firstName,
                lastName: this.currentUser.lastName,
                fullName: this.currentUser.fullName,
                email: this.currentUser.email,
                mobile: this.currentUser.mobile,
                verified: this.currentUser.verified
            },
            timestamp: Date.now()
        };

        sessionStorage.setItem('mtechUserSession', JSON.stringify(sessionData));
        
        if (rememberMe) {
            localStorage.setItem('mtechRememberMe', 'true');
            localStorage.setItem('mtechUserRemember', JSON.stringify({
                userId: this.currentUser.id,
                expires: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
            }));
        }
    }

    loadSession() {
        const sessionData = sessionStorage.getItem('mtechUserSession');
        if (sessionData) {
            const { user, timestamp } = JSON.parse(sessionData);
            
            // Check if session is still valid (24 hours)
            if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
                // Get full user data from storage
                const users = this.getStoredUsers();
                const fullUser = users.find(u => u.id === user.id);
                
                if (fullUser) {
                    this.currentUser = fullUser;
                    return true;
                }
            } else {
                this.clearSession();
            }
        }
        return false;
    }

    autoLogin() {
        const rememberData = localStorage.getItem('mtechUserRemember');
        if (rememberData) {
            const { userId, expires } = JSON.parse(rememberData);
            
            if (Date.now() < expires) {
                const users = this.getStoredUsers();
                const user = users.find(u => u.id === userId);
                
                if (user) {
                    this.currentUser = user;
                    this.setSession(true);
                    return true;
                }
            } else {
                localStorage.removeItem('mtechUserRemember');
                localStorage.removeItem('mtechRememberMe');
            }
        }
        return false;
    }

    clearSession() {
        sessionStorage.removeItem('mtechUserSession');
        this.currentUser = null;
    }

    logout() {
        if (this.currentUser) {
            this.logUserActivity(this.currentUser.id, 'logout', 'User logged out');
        }

        this.currentUser = null;
        this.clearSession();
        localStorage.removeItem('mtechRememberMe');
        localStorage.removeItem('mtechUserRemember');
        
        this.updateUI();
        this.showToast('Logged out successfully', 'success');
        
        // Close any open account modals
        this.closeUserAccountModal();
    }

    // === USER INTERFACE ===
    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userWelcome = document.getElementById('userWelcome');
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');

        if (this.currentUser) {
            // Show logged in state
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) userMenu.style.display = 'block';
            
            if (userWelcome) userWelcome.textContent = `Hi, ${this.currentUser.firstName}`;
            if (userName) userName.textContent = this.currentUser.fullName;
            if (userEmail) userEmail.textContent = this.currentUser.email;
        } else {
            // Show logged out state
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
        }
    }

    // === PROFILE MANAGEMENT ===
    handleProfileUpdate(e) {
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
                
                this.showToast('Profile updated successfully!', 'success');
                this.logUserActivity(this.currentUser.id, 'profile_updated', 'User updated profile information');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            this.showToast('Failed to update profile. Please try again.', 'error');
        }
    }

    handleSettingsUpdate(e) {
        e.preventDefault();
        
        if (!this.currentUser) return;

        const preferences = {
            emailNotifications: document.getElementById('emailNotifications').checked,
            smsNotifications: document.getElementById('smsNotifications').checked,
            promotionalEmails: document.getElementById('promotionalEmails').checked
        };

        try {
            const users = this.getStoredUsers();
            const userIndex = users.findIndex(u => u.id === this.currentUser.id);
            
            if (userIndex !== -1) {
                users[userIndex].preferences = { ...users[userIndex].preferences, ...preferences };
                this.saveUsers(users);
                this.currentUser = users[userIndex];
                
                this.showToast('Settings updated successfully!', 'success');
                this.logUserActivity(this.currentUser.id, 'settings_updated', 'User updated account settings');
            }
        } catch (error) {
            console.error('Settings update error:', error);
            this.showToast('Failed to update settings. Please try again.', 'error');
        }
    }

    loadUserAccountData() {
        if (!this.currentUser) return;
        
        // Populate profile form
        document.getElementById('profileFirstName').value = this.currentUser.firstName || '';
        document.getElementById('profileLastName').value = this.currentUser.lastName || '';
        document.getElementById('profileEmail').value = this.currentUser.email || '';
        document.getElementById('profileMobile').value = this.currentUser.mobile || '';
        document.getElementById('profileDOB').value = this.currentUser.dateOfBirth || '';
        document.getElementById('profileGender').value = this.currentUser.gender || '';
        
        // Load preferences
        if (this.currentUser.preferences) {
            const prefs = this.currentUser.preferences;
            document.getElementById('emailNotifications').checked = prefs.emailNotifications || false;
            document.getElementById('smsNotifications').checked = prefs.smsNotifications || false;
            document.getElementById('promotionalEmails').checked = prefs.promotionalEmails || false;
        }
        
        // Load orders
        this.loadUserOrders();
    }

    loadUserOrders() {
        if (!this.currentUser) return;
        
        const orders = JSON.parse(localStorage.getItem('mtechOrders')) || [];
        const userOrders = orders.filter(order => 
            order.customer && (
                order.customer.email === this.currentUser.email ||
                order.customer.id === this.currentUser.id
            )
        );
        
        const ordersList = document.getElementById('userOrdersList');
        if (ordersList) {
            if (userOrders.length === 0) {
                ordersList.innerHTML = '<p>No orders found. <a href="#" onclick="customerAuth.closeUserAccountModal()">Start shopping!</a></p>';
            } else {
                ordersList.innerHTML = userOrders.map(order => `
                    <div class="order-item">
                        <div class="order-header">
                            <h4>Order #${order.orderId || order.id}</h4>
                            <span class="order-total">$${(order.total || 0).toFixed(2)}</span>
                        </div>
                        <p><strong>Date:</strong> ${new Date(order.orderDate || order.date).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> ${order.status || 'Processing'}</p>
                        <p><strong>Items:</strong> ${(order.items || []).length} item(s)</p>
                    </div>
                `).join('');
            }
        }
    }

    // === UTILITY FUNCTIONS ===
    hashPassword(password) {
        // Simple hash for demo - use bcrypt in production
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
        // Mobile should start with country code and have 7-15 digits
        const mobileRegex = /^\+\d{1,3}\d{7,14}$/;
        return mobileRegex.test(mobile);
    }

    checkPasswordStrength(password) {
        const strengthIndicator = document.getElementById('passwordStrength');
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        
        if (!strengthIndicator || !strengthBar || !strengthText) return;
        
        strengthIndicator.style.display = 'block';
        
        let strength = 0;
        let text = 'Very Weak';
        
        // Length check
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        
        // Character variety checks
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Update strength indicator
        strengthBar.className = 'strength-bar';
        
        if (strength >= 5) {
            strengthBar.classList.add('strong');
            text = 'Strong';
        } else if (strength >= 3) {
            strengthBar.classList.add('medium');
            text = 'Medium';
        } else if (strength >= 1) {
            strengthBar.classList.add('weak');
            text = 'Weak';
        }
        
        strengthText.textContent = `Password strength: ${text}`;
    }

    setupOTPInputs() {
        const otpInputs = document.querySelectorAll('.otp-input');
        
        otpInputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                // Auto-move to next input
                if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
                
                // Only allow numbers
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
            
            input.addEventListener('keydown', (e) => {
                // Move to previous input on backspace
                if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                    otpInputs[index - 1].focus();
                }
            });
        });
    }

    setupAccountTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Update active tab button
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Show target panel
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                    if (panel.id === targetTab) {
                        panel.classList.add('active');
                    }
                });
                
                // Load tab-specific content
                if (targetTab === 'profile') {
                    this.loadUserAccountData();
                } else if (targetTab === 'orders') {
                    this.loadUserOrders();
                }
            });
        });
    }

    // === MODAL MANAGEMENT ===
    showLoginModal() {
        document.getElementById('loginModal').style.display = 'block';
        this.closeRegisterModal();
        this.closeForgotPasswordModal();
    }

    closeLoginModal() {
        document.getElementById('loginModal').style.display = 'none';
        this.resetForm('loginForm');
    }

    showRegisterModal() {
        document.getElementById('registerModal').style.display = 'block';
        this.closeLoginModal();
        this.closeForgotPasswordModal();
    }

    closeRegisterModal() {
        document.getElementById('registerModal').style.display = 'none';
        this.resetForm('registerForm');
        
        // Hide password strength indicator
        const strengthIndicator = document.getElementById('passwordStrength');
        if (strengthIndicator) {
            strengthIndicator.style.display = 'none';
        }
    }

    showOtpModal(mobile, type) {
        const modal = document.getElementById('otpModal');
        const message = document.getElementById('otpMessage');
        
        if (modal && message) {
            const maskedMobile = mobile.replace(/(\+\d{1,3})\d+(\d{2})/, '$1****$2');
            let messageText = `Enter the 6-digit code sent to ${maskedMobile}`;
            
            if (type === 'registration') {
                messageText = `Verify your mobile number to complete registration\n${messageText}`;
            } else if (type === 'reset') {
                messageText = `Password reset verification\n${messageText}`;
            }
            
            message.textContent = messageText;
            modal.style.display = 'block';
        }
    }

    closeOtpModal() {
        const modal = document.getElementById('otpModal');
        if (modal) {
            modal.style.display = 'none';
            this.resetOTPInputs();
        }
    }

    showUserAccount() {
        const modal = document.getElementById('userAccountModal');
        if (modal && this.currentUser) {
            this.loadUserAccountData();
            modal.style.display = 'block';
        } else if (!this.currentUser) {
            this.showLoginModal();
        }
    }

    closeUserAccountModal() {
        const modal = document.getElementById('userAccountModal');
        if (modal) modal.style.display = 'none';
    }

    showForgotPassword() {
        document.getElementById('forgotPasswordModal').style.display = 'block';
        this.closeLoginModal();
    }

    closeForgotPasswordModal() {
        document.getElementById('forgotPasswordModal').style.display = 'none';
        this.resetForm('forgotPasswordForm');
    }

    handleModalClicks(e) {
        const modals = [
            'loginModal', 'registerModal', 'otpModal', 
            'userAccountModal', 'forgotPasswordModal'
        ];
        
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // === HELPER FUNCTIONS ===
    resetForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
        }
    }

    resetOTPInputs() {
        const otpInputs = document.querySelectorAll('.otp-input');
        otpInputs.forEach(input => input.value = '');
        if (otpInputs.length > 0) otpInputs[0].focus();
    }

    shakeOTPInputs() {
        const container = document.querySelector('.otp-container');
        if (container) {
            container.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => container.style.animation = '', 500);
        }
    }

    togglePassword(inputId) {
        const input = document.getElementById(inputId);
        const button = input.parentElement.querySelector('.toggle-password');
        
        if (input.type === 'password') {
            input.type = 'text';
            button.textContent = '🙈';
        } else {
            input.type = 'password';
            button.textContent = '👁️';
        }
    }

    showToast(message, type = 'success') {
        // Remove existing toasts
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
            ${type === 'success' ? 'background: #d4edda; color: #155724; border-left: 4px solid #28a745;' : 'background: #f8d7da; color: #721c24; border-left: 4px solid #dc3545;'}
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
        
        // Click to dismiss
        toast.addEventListener('click', () => toast.remove());
    }

    // === SOCIAL LOGIN PLACEHOLDERS ===
    loginWithGoogle() {
        this.showToast('Google login integration required. Please contact support.', 'error');
    }

    loginWithFacebook() {
        this.showToast('Facebook login integration required. Please contact support.', 'error');
    }

    registerWithGoogle() {
        this.showToast('Google registration integration required. Please contact support.', 'error');
    }

    registerWithFacebook() {
        this.showToast('Facebook registration integration required. Please contact support.', 'error');
    }

    // === FORGOT PASSWORD ===
    handleForgotPassword(e) {
        e.preventDefault();
        this.showToast('Forgot password feature coming soon!', 'info');
    }

    // === DELETE ACCOUNT ===
    deleteAccount() {
        if (!this.currentUser) return;
        
        const confirmation = prompt(
            'This action cannot be undone. All your data will be permanently deleted.\n\n' +
            'Type "DELETE" to confirm account deletion:'
        );
        
        if (confirmation === 'DELETE') {
            const users = this.getStoredUsers();
            const filteredUsers = users.filter(u => u.id !== this.currentUser.id);
            this.saveUsers(filteredUsers);
            
            this.logUserActivity(this.currentUser.id, 'account_deleted', 'User deleted their account');
            this.logout();
            
            this.showToast('Your account has been permanently deleted.', 'success');
        } else if (confirmation !== null) {
            this.showToast('Account deletion cancelled.', 'error');
        }
    }

    // === ADDITIONAL FEATURES ===
    showTerms() {
        this.showToast('Terms of Service - Feature coming soon!', 'success');
    }

    showPrivacy() {
        this.showToast('Privacy Policy - Feature coming soon!', 'success');
    }

    showAddAddress() {
        this.showToast('Add Address - Feature coming soon!', 'success');
    }
}

// Initialize customer authentication system
let customerAuth;

document.addEventListener('DOMContentLoaded', function() {
    customerAuth = new CustomerAuthSystem();
    
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
    module.exports = CustomerAuthSystem;
}
