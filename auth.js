// Complete Authentication System (auth.js) - Fixed Version
class AuthManager {
constructor() {
this.currentUser = null;
this.adminUser = null;
this.sessionTimeout = null;
this.otpData = null;
this.initializeAuth();
}
initializeAuth() {
    this.loadSession();
    this.setupEventListeners();
    this.updateAuthUI();
    
    if (localStorage.getItem('mtechRememberMe') === 'true') {
        this.autoLogin();
    }

    if (sessionStorage.getItem('mtechAdminSession')) {
        this.loadAdminSession();
    }

    console.log('Authentication system initialized');
}

setupEventListeners() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const accountBtn = document.getElementById('accountBtn');
    
    if (loginBtn) loginBtn.addEventListener('click', () => this.showLoginModal());
    if (registerBtn) registerBtn.addEventListener('click', () => this.showRegisterModal());
    if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    if (registerForm) registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    if (logoutBtn) logoutBtn.addEventListener('click', () => this.logout());
    if (accountBtn) accountBtn.addEventListener('click', () => this.showUserAccount());

    const adminAccessForm = document.getElementById('adminAccessForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminAccessForm) adminAccessForm.addEventListener('submit', (e) => this.handleAdminLogin(e));
    if (adminLoginForm) adminLoginForm.addEventListener('submit', (e) => this.handleAdminLogin(e));

    const otpForm = document.getElementById('otpForm');
    if (otpForm) otpForm.addEventListener('submit', (e) => this.handleOTPVerification(e));

    const registerPassword = document.getElementById('registerPassword');
    if (registerPassword) {
        registerPassword.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
    }

    this.setupOTPInputs();
    this.setupAccountTabs();

    window.addEventListener('click', (e) => this.handleModalClicks(e));
}

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
        const users = JSON.parse(localStorage.getItem('mtechUsers')) || [];
        
        const user = users.find(u => 
            u.email === identifier || 
            u.mobile === identifier ||
            (u.mobile && u.mobile.includes(identifier))
        );

        if (!user) {
            this.showToast('User not found', 'error');
            return;
        }

        if (user.password !== this.hashPassword(password)) {
            this.showToast('Invalid password', 'error');
            return;
        }

        if (!user.verified) {
            this.showToast('Please verify your account first', 'error');
            this.sendOTP(user.mobile, 'verification');
            return;
        }

        this.currentUser = user;
        this.currentUser.lastLogin = new Date().toISOString();
        
        const userIndex = users.findIndex(u => u.id === user.id);
        users[userIndex] = this.currentUser;
        localStorage.setItem('mtechUsers', JSON.stringify(users));

        this.setSession(rememberMe);
        this.updateAuthUI();
        this.closeLoginModal();
        
        this.showToast(`Welcome back, ${user.firstName}!`, 'success');
        this.logUserActivity('login', 'User logged in successfully');

    } catch (error) {
        console.error('Login error:', error);
        this.showToast('Login failed. Please try again.', 'error');
    }
}

async handleRegister(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('registerEmail').value.trim().toLowerCase(),
        mobile: document.getElementById('countryCode').value + document.getElementById('registerMobile').value.trim(),
        password: document.getElementById('registerPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        agreeTerms: document.getElementById('agreeTerms').checked,
        newsletter: document.getElementById('newsletter').checked
    };

    if (!this.validateRegistration(formData)) {
        return;
    }

    try {
        const users = JSON.parse(localStorage.getItem('mtechUsers')) || [];
        
        if (users.find(u => u.email === formData.email)) {
            this.showToast('Email already registered', 'error');
            return;
        }

        if (users.find(u => u.mobile === formData.mobile)) {
            this.showToast('Mobile number already registered', 'error');
            return;
        }

        const newUser = {
            id: Date.now(),
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobile,
            password: this.hashPassword(formData.password),
            verified: false,
            newsletter: formData.newsletter,
            registrationDate: new Date().toISOString(),
            addresses: [],
            preferences: {
                emailNotifications: true,
                smsNotifications: true,
                promotionalEmails: formData.newsletter
            }
        };

        users.push(newUser);
        localStorage.setItem('mtechUsers', JSON.stringify(users));

        this.sendOTP(formData.mobile, 'registration', newUser);
        
        this.showToast('Registration successful! Please verify your mobile number.', 'success');
        this.closeRegisterModal();

    } catch (error) {
        console.error('Registration error:', error);
        this.showToast('Registration failed. Please try again.', 'error');
    }
}

validateRegistration(data) {
    if (!data.firstName || !data.lastName) {
        this.showToast('Please enter your full name', 'error');
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

    if (data.password !== data.confirmPassword) {
        this.showToast('Passwords do not match', 'error');
        return false;
    }

    if (!data.agreeTerms) {
        this.showToast('Please agree to the Terms of Service', 'error');
        return false;
    }

    return true;
}

async handleAdminLogin(e) {
    e.preventDefault();
    
    let username, password, secretKey, remember;
    
    if (document.getElementById('adminUser')) {
        username = document.getElementById('adminUser').value.trim();
        password = document.getElementById('adminPass').value;
        secretKey = document.getElementById('adminSecret').value.trim();
        remember = document.getElementById('rememberDevice').checked;
    } else {
        username = document.getElementById('adminUsername').value.trim();
        password = document.getElementById('adminPassword').value;
        secretKey = document.getElementById('adminSecretKey').value.trim();
        remember = document.getElementById('adminRemember').checked;
    }

    if (!username || !password) {
        this.showToast('Please fill in all required fields', 'error');
        return;
    }

    try {
        const adminCreds = this.getAdminCredentials();
        
        if (username !== adminCreds.username) {
            this.showToast('Invalid admin username', 'error');
            this.logSecurityEvent('failed_admin_login', { username, ip: 'localhost' });
            return;
        }

        if (password !== adminCreds.password) {
            this.showToast('Invalid admin password', 'error');
            this.logSecurityEvent('failed_admin_login', { username, ip: 'localhost' });
            return;
        }

        if (adminCreds.requireSecretKey && secretKey !== adminCreds.secretKey) {
            this.showToast('Invalid secret key', 'error');
            this.logSecurityEvent('failed_admin_login', { username, reason: 'invalid_secret_key' });
            return;
        }

        this.adminUser = {
            username: username,
            loginTime: new Date().toISOString(),
            sessionId: this.generateSessionId()
        };

        this.setAdminSession(remember);
        
        if (window.location.pathname.includes('admin.html')) {
            this.showAdminInterface();
        } else {
            window.location.href = 'admin.html';
        }
        
        this.showToast('Admin login successful', 'success');
        this.logSecurityEvent('admin_login_success', { username });

    } catch (error) {
        console.error('Admin login error:', error);
        this.showToast('Admin login failed. Please try again.', 'error');
    }
}

getAdminCredentials() {
    const defaultCreds = {
        username: 'admin',
        password: 'MTech@123',
        secretKey: 'SecureKey2025',
        requireSecretKey: false
    };

    const savedCreds = localStorage.getItem('mtechAdminCredentials');
    return savedCreds ? JSON.parse(savedCreds) : defaultCreds;
}

setAdminSession(remember = false) {
    const sessionData = {
        adminUser: this.adminUser,
        timestamp: Date.now(),
        remember: remember
    };

    sessionStorage.setItem('mtechAdminSession', JSON.stringify(sessionData));
    
    if (remember) {
        localStorage.setItem('mtechAdminRemember', JSON.stringify({
            username: this.adminUser.username,
            expires: Date.now() + (7 * 24 * 60 * 60 * 1000)
        }));
    }

    this.setAdminTimeout();
}

showAdminInterface() {
    const loginScreen = document.getElementById('adminLoginScreen');
    const adminInterface = document.getElementById('adminInterface');
    
    if (loginScreen) loginScreen.style.display = 'none';
    if (adminInterface) adminInterface.style.display = 'block';
    
    const adminUserName = document.getElementById('adminUserName');
    const adminLoginTime = document.getElementById('adminLoginTime');
    
    if (adminUserName) adminUserName.textContent = this.adminUser.username;
    if (adminLoginTime) adminLoginTime.textContent = `Logged in: ${new Date(this.adminUser.loginTime).toLocaleString()}`;
}

adminLogout() {
    sessionStorage.removeItem('mtechAdminSession');
    localStorage.removeItem('mtechAdminRemember');
    
    if (this.sessionTimeout) {
        clearTimeout(this.sessionTimeout);
    }

    this.adminUser = null;
    
    if (window.location.pathname.includes('admin.html')) {
        const loginScreen = document.getElementById('adminLoginScreen');
        const adminInterface = document.getElementById('adminInterface');
        
        if (loginScreen) loginScreen.style.display = 'flex';
        if (adminInterface) adminInterface.style.display = 'none';
    } else {
        window.location.href = 'customer.html';
    }
    
    this.showToast('Admin logged out successfully', 'success');
}

sendOTP(mobile, type, userData = null) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    this.otpData = {
        otp: otp,
        mobile: mobile,
        type: type,
        userData: userData,
        timestamp: Date.now(),
        attempts: 0
    };

    console.log(`OTP for ${mobile}: ${otp}`);
    
    this.showOtpModal(mobile, type);
    
    setTimeout(() => {
        alert(`Demo OTP for ${mobile}: ${otp}`);
    }, 1000);
    
    this.startOTPCountdown();
}

handleOTPVerification(e) {
    e.preventDefault();
    
    if (!this.otpData) {
        this.showToast('OTP session expired. Please request a new OTP.', 'error');
        return;
    }

    const otpInputs = document.querySelectorAll('.otp-input');
    const enteredOTP = Array.from(otpInputs).map(input => input.value).join('');

    if (enteredOTP.length !== 6) {
        this.showToast('Please enter complete OTP', 'error');
        return;
    }

    this.otpData.attempts++;
    if (this.otpData.attempts > 3) {
        this.showToast('Too many failed attempts. Please request a new OTP.', 'error');
        this.otpData = null;
        this.closeOtpModal();
        return;
    }

    if (enteredOTP !== this.otpData.otp) {
        this.showToast(`Invalid OTP. ${4 - this.otpData.attempts} attempts remaining.`, 'error');
        this.shakeOTPInputs();
        return;
    }

    this.handleOTPSuccess();
}

handleOTPSuccess() {
    const { type, userData } = this.otpData;
    
    if (type === 'registration' && userData) {
        const users = JSON.parse(localStorage.getItem('mtechUsers')) || [];
        const userIndex = users.findIndex(u => u.id === userData.id);
        
        if (userIndex !== -1) {
            users[userIndex].verified = true;
            localStorage.setItem('mtechUsers', JSON.stringify(users));
            
            this.showToast('Mobile number verified! You can now login.', 'success');
        }
    } else if (type === 'verification') {
        this.showToast('Account verified successfully!', 'success');
    } else if (type === 'reset') {
        this.showPasswordResetForm();
        return;
    }

    this.otpData = null;
    this.closeOtpModal();
}

startOTPCountdown() {
    let timeLeft = 300;
    const countdownElement = document.getElementById('otpCountdown');
    
    const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        if (countdownElement) {
            countdownElement.textContent = `Resend OTP in ${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            if (countdownElement) {
                countdownElement.innerHTML = '<a href="#" onclick="authManager.resendOTP()">Resend OTP</a>';
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

setSession(rememberMe = false) {
    const sessionData = {
        user: this.currentUser,
        timestamp: Date.now()
    };

    sessionStorage.setItem('mtechUserSession', JSON.stringify(sessionData));
    
    if (rememberMe) {
        localStorage.setItem('mtechRememberMe', 'true');
        localStorage.setItem('mtechUserRemember', JSON.stringify({
            userId: this.currentUser.id,
            expires: Date.now() + (30 * 24 * 60 * 60 * 1000)
        }));
    }
}

loadSession() {
    const sessionData = sessionStorage.getItem('mtechUserSession');
    if (sessionData) {
        const { user, timestamp } = JSON.parse(sessionData);
        
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            this.currentUser = user;
            return true;
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
            const users = JSON.parse(localStorage.getItem('mtechUsers')) || [];
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

loadAdminSession() {
    const sessionData = sessionStorage.getItem('mtechAdminSession');
    if (sessionData) {
        const { adminUser, timestamp } = JSON.parse(sessionData);
        
        if (Date.now() - timestamp < 30 * 60 * 1000) {
            this.adminUser = adminUser;
            if (window.location.pathname.includes('admin.html')) {
                this.showAdminInterface();
            }
            this.setAdminTimeout();
            return true;
        } else {
            this.clearAdminSession();
        }
    }
    
    const rememberData = localStorage.getItem('mtechAdminRemember');
    if (rememberData) {
        const { username, expires } = JSON.parse(rememberData);
        
        if (Date.now() < expires) {
            this.adminUser = {
                username: username,
                loginTime: new Date().toISOString(),
                sessionId: this.generateSessionId()
            };
            this.setAdminSession(true);
            return true;
        } else {
            localStorage.removeItem('mtechAdminRemember');
        }
    }
    
    return false;
}

setAdminTimeout() {
    if (this.sessionTimeout) {
        clearTimeout(this.sessionTimeout);
    }

    const warningTimeout = setTimeout(() => {
        this.showSessionWarning();
    }, 25 * 60 * 1000);

    this.sessionTimeout = setTimeout(() => {
        this.adminLogout();
        this.showToast('Session expired for security', 'error');
    }, 30 * 60 * 1000);
}

showSessionWarning() {
    const modal = document.getElementById('sessionWarningModal');
    if (modal) {
        modal.style.display = 'block';
        
        let timeLeft = 5 * 60;
        const countdown = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            
            const countdownElement = document.getElementById('sessionCountdown');
            if (countdownElement) {
                countdownElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                modal.style.display = 'none';
            }
            
            timeLeft--;
        }, 1000);
    }
}

extendSession() {
    this.setAdminSession(false);
    const modal = document.getElementById('sessionWarningModal');
    if (modal) modal.style.display = 'none';
    this.showToast('Session extended successfully', 'success');
}

clearSession() {
    sessionStorage.removeItem('mtechUserSession');
    this.currentUser = null;
}

clearAdminSession() {
    sessionStorage.removeItem('mtechAdminSession');
    this.adminUser = null;
    if (this.sessionTimeout) {
        clearTimeout(this.sessionTimeout);
    }
}

updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userWelcome = document.getElementById('userWelcome');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');

    if (this.currentUser) {
        if (authButtons) authButtons.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        
        if (userWelcome) userWelcome.textContent = `Hi, ${this.currentUser.firstName}`;
        if (userName) userName.textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
        if (userEmail) userEmail.textContent = this.currentUser.email;
    } else {
        if (authButtons) authButtons.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
    }
}

showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    this.closeRegisterModal();
}

closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    this.resetForm('loginForm');
}

showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
    this.closeLoginModal();
}

closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
    this.resetForm('registerForm');
}

showAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        window.location.href = 'admin.html';
    }
}

closeAdminLoginModal() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.style.display = 'none';
        this.resetForm('adminLoginForm');
    }
}

showOtpModal(mobile, type) {
    const modal = document.getElementById('otpModal');
    const message = document.getElementById('otpMessage');
    
    if (modal && message) {
        const maskedMobile = mobile.replace(/(\d{2})\d+(\d{2})/, '$1****$2');
        message.textContent = `Enter the 6-digit code sent to ${maskedMobile}`;
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
    if (modal) {
        this.loadUserAccountData();
        modal.style.display = 'block';
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
}

handleModalClicks(e) {
    const modals = [
        'loginModal', 'registerModal', 'adminLoginModal', 
        'otpModal', 'userAccountModal', 'forgotPasswordModal'
    ];
    
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const button = input.parentElement.querySelector('.toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        if (button) button.textContent = '🙈';
    } else {
        input.type = 'password';
        if (button) button.textContent = '👁️';
    }
}

checkPasswordStrength(password) {
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 0;
    let text = 'Weak';
    
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    strengthBar.className = 'strength-bar';
    
    if (strength >= 4) {
        strengthBar.classList.add('strong');
        text = 'Strong';
    } else if (strength >= 2) {
        strengthBar.classList.add('medium');
        text = 'Medium';
    } else {
        strengthBar.classList.add('weak');
        text = 'Weak';
    }
    
    strengthText.textContent = `Password strength: ${text}`;
}

setupOTPInputs() {
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
}

resetOTPInputs() {
    const otpInputs = document.querySelectorAll('.otp-input');
    otpInputs.forEach(input => input.value = '');
    if (otpInputs.length > 0) otpInputs[0].focus();
}

shakeOTPInputs() {
    const container = document.querySelector('.otp-container');
    if (container) {
        container.classList.add('shake');
        setTimeout(() => container.classList.remove('shake'), 500);
    }
}

setupAccountTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
            
            this.loadTabContent(targetTab);
        });
    });
}

loadTabContent(tabId) {
    switch(tabId) {
        case 'orders':
            this.loadUserOrders();
            break;
        case 'addresses':
            this.loadUserAddresses();
            break;
        default:
            break;
    }
}

loadUserAccountData() {
    if (!this.currentUser) return;
    
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        document.getElementById('profileFirstName').value = this.currentUser.firstName || '';
        document.getElementById('profileLastName').value = this.currentUser.lastName || '';
        document.getElementById('profileEmail').value = this.currentUser.email || '';
        document.getElementById('profileMobile').value = this.currentUser.mobile || '';
    }
    
    if (this.currentUser.preferences) {
        const prefs = this.currentUser.preferences;
        const emailNotifications = document.getElementById('emailNotifications');
        const smsNotifications = document.getElementById('smsNotifications');
        const promotionalEmails = document.getElementById('promotionalEmails');
        
        if (emailNotifications) emailNotifications.checked = prefs.emailNotifications;
        if (smsNotifications) smsNotifications.checked = prefs.smsNotifications;
        if (promotionalEmails) promotionalEmails.checked = prefs.promotionalEmails;
    }
}

loadUserOrders() {
    if (!this.currentUser) return;
    
    const orders = JSON.parse(localStorage.getItem('mtechOrders')) || [];
    const userOrders = orders.filter(order => 
        order.customer.email === this.currentUser.email
    );
    
    const ordersList = document.getElementById('userOrdersList');
    if (ordersList) {
        if (userOrders.length === 0) {
            ordersList.innerHTML = '<p>No orders found. Start shopping!</p>';
        } else {
            ordersList.innerHTML = userOrders.map(order => `
                <div class="order-item">
                    <div class="order-header">
                        <h4>Order #${order.orderId}</h4>
                        <span class="order-total">$${order.total.toFixed(2)}</span>
                    </div>
                    <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> Processing</p>
                    <p><strong>Items:</strong> ${order.items.length} item(s)</p>
                </div>
            `).join('');
        }
    }
}

resetForm(formId) {
    const form = document.getElementById(formId);
    if (form) form.reset();
}

isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

isValidMobile(mobile) {
    const mobileRegex = /^\+\d{1,3}\d{7,14}$/;
    return mobileRegex.test(mobile);
}

hashPassword(password) {
    return btoa(password + 'mtech_salt_2025');
}

generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}-toast`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        padding: 1rem 2rem; border-radius: 6px; font-weight: 500;
        ${type === 'success' ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

logUserActivity(action, details) {
    const activities = JSON.parse(localStorage.getItem('mtechUserActivities')) || [];
    
    activities.unshift({
        userId: this.currentUser?.id,
        action: action,
        details: details,
        timestamp: new Date().toISOString(),
        ip: 'localhost'
    });
    
    if (activities.length > 100) {
        activities.splice(100);
    }
    
    localStorage.setItem('mtechUserActivities', JSON.stringify(activities));
}

logSecurityEvent(event, data) {
    const securityLogs = JSON.parse(localStorage.getItem('mtechSecurityLogs')) || [];
    
    securityLogs.unshift({
        event: event,
        data: data,
        timestamp: new Date().toISOString()
    });
    
    if (securityLogs.length > 50) {
        securityLogs.splice(50);
    }
    
    localStorage.setItem('mtechSecurityLogs', JSON.stringify(securityLogs));
}

logout() {
    this.currentUser = null;
    this.clearSession();
    localStorage.removeItem('mtechRememberMe');
    localStorage.removeItem('mtechUserRemember');
    
    this.updateAuthUI();
    this.showToast('Logged out successfully', 'success');
    
    const modal = document.getElementById('userAccountModal');
    if (modal && modal.style.display === 'block') {
        this.closeUserAccountModal();
    }
}

loginWithGoogle() {
    this.showToast('Google login integration required', 'error');
}

loginWithFacebook() {
    this.showToast('Facebook login integration required', 'error');
}

registerWithGoogle() {
    this.showToast('Google registration integration required', 'error');
}

registerWithFacebook() {
    this.showToast('Facebook registration integration required', 'error');
}

}
let authManager;
document.addEventListener('DOMContentLoaded', function() {
authManager = new AuthManager();
window.showAdminLogin = () => authManager.showAdminLogin();
window.showLoginModal = () => authManager.showLoginModal();
window.showRegisterModal = () => authManager.showRegisterModal();
window.closeLoginModal = () => authManager.closeLoginModal();
window.closeRegisterModal = () => authManager.closeRegisterModal();
window.closeAdminLoginModal = () => authManager.closeAdminLoginModal();
window.closeOtpModal = () => authManager.closeOtpModal();
window.closeUserAccountModal = () => authManager.closeUserAccountModal();
window.closeForgotPasswordModal = () => authManager.closeForgotPasswordModal();
window.showForgotPassword = () => authManager.showForgotPassword();
window.togglePassword = (id) => authManager.togglePassword(id);
window.resendOTP = () => authManager.resendOTP();
window.extendSession = () => authManager.extendSession();
window.adminLogout = () => authManager.adminLogout();
window.loginWithGoogle = () => authManager.loginWithGoogle();
window.loginWithFacebook = () => authManager.loginWithFacebook();
window.registerWithGoogle = () => authManager.registerWithGoogle();
window.registerWithFacebook = () => authManager.registerWithFacebook();

});
if (typeof module !== 'undefined' && module.exports) {
module.exports = AuthManager;
}
