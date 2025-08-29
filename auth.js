/* Authentication Styles (auth.css) */

/* Auth Modal Styles */
.auth-modal {
    max-width: 450px;
    margin: 2% auto;
}

.auth-container {
    padding: 2rem;
}

.auth-container h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    font-weight: 600;
}

.auth-form {
    margin-bottom: 1.5rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    background: white;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary-color);
}

.password-container {
    position: relative;
}

.toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: #666;
    padding: 4px;
}

.toggle-password:hover {
    color: var(--primary-color);
}

/* Mobile Input */
.mobile-input {
    display: flex;
    gap: 0.5rem;
}

.country-code {
    min-width: 120px;
    flex-shrink: 0;
}

/* Password Strength Indicator */
.password-strength {
    margin-top: 0.5rem;
}

.strength-bar {
    height: 4px;
    background: #eee;
    border-radius: 2px;
    margin-bottom: 0.25rem;
    position: relative;
    overflow: hidden;
}

.strength-bar::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background: #ff6b35;
    transition: width 0.3s ease, background-color 0.3s ease;
}

.strength-bar.weak::after {
    width: 33%;
    background: #ff4757;
}

.strength-bar.medium::after {
    width: 66%;
    background: #ffa502;
}

.strength-bar.strong::after {
    width: 100%;
    background: #2ed573;
}

.strength-text {
    font-size: 0.8rem;
    color: #666;
}

/* Form Options */
.form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem 0;
    flex-wrap: wrap;
    gap: 1rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9rem;
}

.checkbox-label input[type="checkbox"] {
    width: auto;
    margin: 0;
}

.forgot-password {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
}

.forgot-password:hover {
    text-decoration: underline;
}

/* Auth Buttons */
.auth-btn {
    width: 100%;
    padding: 14px 20px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 0.5rem;
}

.auth-btn.primary {
    background: var(--primary-color);
    color: white;
}

.auth-btn.primary:hover {
    background: #e55a2b;
    transform: translateY(-1px);
}

.auth-btn.secondary {
    background: #6c757d;
    color: white;
}

.auth-btn.secondary:hover {
    background: #545b62;
}

.auth-btn.danger {
    background: #dc3545;
    color: white;
}

.auth-btn.danger:hover {
    background: #c82333;
}

.auth-btn.admin-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.auth-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Header Auth Buttons */
.auth-buttons {
    display: flex;
    gap: 0.5rem;
}

.login-btn, .register-btn {
    padding: 8px 16px;
    border: 2px solid var(--primary-color);
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.login-btn {
    background: white;
    color: var(--primary-color);
}

.login-btn:hover {
    background: var(--primary-color);
    color: white;
}

.register-btn {
    background: var(--primary-color);
    color: white;
}

.register-btn:hover {
    background: white;
    color: var(--primary-color);
}

/* User Menu */
.user-menu {
    position: relative;
}

.user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    min-width: 250px;
    z-index: 1000;
    display: none;
}

.user-menu:hover .user-dropdown,
.user-dropdown:hover {
    display: block;
}

.user-info {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-avatar {
    width: 40px;
    height: 40px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
}

.user-name {
    font-weight: 600;
    color: var(--text-color);
}

.user-email {
    font-size: 0.8rem;
    color: #666;
}

.dropdown-menu {
    padding: 0.5rem 0;
}

.dropdown-menu a {
    display: block;
    padding: 0.75rem 1rem;
    color: var(--text-color);
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.dropdown-menu a:hover {
    background: var(--light-gray);
}

/* Social Login */
.auth-divider {
    text-align: center;
    margin: 1.5rem 0;
    position: relative;
}

.auth-divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border-color);
}

.auth-divider span {
    background: white;
    color: #666;
    padding: 0 1rem;
    font-size: 0.9rem;
}

.social-login {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.social-btn {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: white;
    color: var(--text-color);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}

.google-btn:hover {
    border-color: #db4437;
    background: #db4437;
    color: white;
}

.facebook-btn:hover {
    border-color: #4267B2;
    background: #4267B2;
    color: white;
}

.social-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--text-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.8rem;
}

/* Auth Switch */
.auth-switch {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #666;
}

.auth-switch a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}

.auth-switch a:hover {
    text-decoration: underline;
}

/* Admin Auth Styles */
.admin-auth {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
}

.admin-header {
    text-align: center;
    margin-bottom: 2rem;
}

.admin-header h2 {
    color: white;
    margin-bottom: 0.5rem;
}

.admin-header p {
    opacity: 0.9;
    font-size: 0.9rem;
}

.admin-help {
    margin-top: 2rem;
    padding: 1rem;
    background: rgba(255,255,255,0.1);
    border-radius: 8px;
    font-size: 0.85rem;
}

.admin-help h4 {
    margin-bottom: 0.5rem;
    color: white;
}

.admin-help code {
    background: rgba(255,255,255,0.2);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
}

/* Admin Login Screen */
.admin-login-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
}

.admin-login-container {
    width: 100%;
    max-width: 500px;
}

.admin-login-card {
    background: white;
    border-radius: 16px;
    padding: 3rem;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.admin-logo {
    text-align: center;
    margin-bottom: 3rem;
}

.admin-logo h1 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
    font-size: 2rem;
}

.admin-logo p {
    color: #666;
    font-size: 0.9rem;
}

.admin-login-form .form-group {
    margin-bottom: 1.5rem;
}

.admin-access-btn {
    width: 100%;
    padding: 16px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.admin-access-btn:hover {
    transform: translateY(-2px);
}

.admin-info {
    margin-top: 2rem;
}

.security-notice, .default-credentials {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: 8px;
}

.security-notice {
    background: #e3f2fd;
    border-left: 4px solid #2196F3;
}

.default-credentials {
    background: #fff3e0;
    border-left: 4px solid #ff9800;
}

.security-notice h4, .default-credentials h4 {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.security-notice ul {
    margin: 0;
    padding-left: 1.2rem;
    font-size: 0.8rem;
}

.default-credentials code {
    background: rgba(255,152,0,0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
}

.back-to-store {
    text-align: center;
    margin-top: 2rem;
}

.back-to-store a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
}

/* Admin User Section */
.admin-user-section {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.admin-user-info {
    text-align: right;
    color: white;
}

.admin-user-name {
    display: block;
    font-weight: 600;
    font-size: 1rem;
}

.admin-login-time {
    display: block;
    font-size: 0.8rem;
    opacity: 0.8;
}

/* OTP Styles */
.otp-container {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 2rem 0;
}

.otp-input {
    width: 50px !important;
    height: 50px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    border: 2px solid var(--border-color);
    border-radius: 8px;
}

.otp-input:focus {
    border-color: var(--primary-color);
}

.otp-resend {
    text-align: center;
    margin-top: 1rem;
}

.countdown {
    font-size: 0.8rem;
    color: #666;
    margin-top: 0.5rem;
}

/* Account Modal */
.account-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
}

.account-tabs {
    display: flex;
    border-bottom: 2px solid var(--border-color);
    margin-bottom: 2rem;
    gap: 0;
}

.tab-btn {
    padding: 1rem 2rem;
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 500;
    color: #666;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
}

.tab-btn.active,
.tab-btn:hover {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
}

.tab-panel {
    display: none;
}

.tab-panel.active {
    display: block;
}

.profile-form, .settings-form {
    max-width: 500px;
}

.orders-list, .addresses-list {
    max-height: 400px;
    overflow-y: auto;
}

.order-item, .address-item {
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    margin-bottom: 1rem;
}

.settings-section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
}

.settings-section h4 {
    margin-bottom: 1rem;
    color: var(--text-color);
}

.preference-item {
    margin-bottom: 0.75rem;
}

.danger-zone {
    border-color: #dc3545;
    background: rgba(220,53,69,0.05);
}

/* Session Warning */
.session-warning {
    text-align: center;
    padding: 2rem;
}

.session-warning h3 {
    color: #ff6b35;
    margin-bottom: 1rem;
}

.session-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}

/* Settings Grid */
.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.settings-card {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 2rem;
}

.settings-card h3 {
    margin-bottom: 1.5rem;
    color: var(--text-color);
}

.security-options, .data-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.data-actions button {
    margin-bottom: 0.5rem;
}

/* Customer Table */
.customers-table-container {
    overflow-x: auto;
}

/* Responsive Design */
@media (max-width: 768px) {
    .auth-modal {
        margin: 5% auto;
        max-width: 95%;
    }
    
    .auth-container {
        padding: 1.5rem;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .form-options {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .social-login {
        gap: 0.5rem;
    }
    
    .admin-login-card {
        padding: 2rem;
    }
    
    .admin-user-section {
        flex-direction: column;
        gap: 1rem;
    }
    
    .admin-user-info {
        text-align: center;
    }
    
    .account-tabs {
        flex-wrap: wrap;
    }
    
    .tab-btn {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
    }
    
    .settings-grid {
        grid-template-columns: 1fr;
    }
    
    .otp-container {
        gap: 0.25rem;
    }
    
    .otp-input {
        width: 40px !important;
        height: 40px;
        font-size: 1.2rem;
    }
}

@media (max-width: 480px) {
    .auth-buttons {
        gap: 0.25rem;
    }
    
    .login-btn, .register-btn {
        padding: 6px 12px;
        font-size: 0.8rem;
    }
    
    .user-dropdown {
        min-width: 200px;
        right: -50px;
    }
}

/* Animation Classes */
.fade-in {
    animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.shake {
    animation: shake 0.5s ease-in-out;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

/* Success/Error Messages */
.success-toast {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.error-toast {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
}

.toast {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    z-index: 10000;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
