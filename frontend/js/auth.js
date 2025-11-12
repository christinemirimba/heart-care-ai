// Authentication Helper Functions

// Check if user is logged in and redirect if needed
function requireAuth() {
    if (!window.api.isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Redirect to home if already logged in
function redirectIfAuthenticated() {
    if (window.api.isAuthenticated()) {
        window.location.href = 'assessment.html';
        return true;
    }
    return false;
}

// Get user data from token (simple JWT decode)
function getUserFromToken() {
    const token = window.api.getToken();
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch (e) {
        console.error('Error decoding token:', e);
        return null;
    }
}

// Update UI based on auth state
function updateAuthUI() {
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    if (window.api.isAuthenticated()) {
        const user = getUserFromToken();
        navActions.innerHTML = `
            <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme">
                <span class="theme-icon">🌙</span>
            </button>
            <a href="assessment.html" class="nav-link">Assessment</a>
            <a href="history.html" class="nav-link">History</a>
            <a href="settings.html" class="nav-link">Settings</a>
            <button id="logoutBtn" class="btn btn-ghost">Logout</button>
        `;

        // Re-initialize theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const icon = themeToggle.querySelector('.theme-icon');
            if (icon) {
                icon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
            }
            
            themeToggle.addEventListener('click', () => {
                const theme = document.documentElement.getAttribute('data-theme');
                const newTheme = theme === 'light' ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
            });
        }

        // Add logout handler
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                try {
                    await window.api.logout();
                    window.location.href = 'index.html';
                } catch (error) {
                    console.error('Logout error:', error);
                    window.api.removeToken();
                    window.location.href = 'index.html';
                }
            });
        }
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    const loginBtn = document.getElementById('login-btn');
    const loginBtnText = document.getElementById('login-btn-text');
    const loginSpinner = document.getElementById('login-spinner');
    
    // Show loading state
    loginBtn.disabled = true;
    loginBtnText.textContent = 'Logging in...';
    loginSpinner.classList.remove('hidden');
    
    try {
        await window.api.login(email, password);
        
        // Success - redirect to assessment
        window.toastManager.success('Welcome back! You have successfully logged in.');
        setTimeout(() => {
            window.location.href = 'assessment.html';
        }, 1000);
        
    } catch (error) {
        console.error('Login error:', error);
        
        let errorMessage = 'Please check your credentials and try again.';
        if (error.message.toLowerCase().includes('invalid') ||
            error.message.toLowerCase().includes('credentials')) {
            errorMessage = 'Invalid email or password. Please try again.';
        } else {
            errorMessage = error.message;
        }
        
        window.toastManager.error(errorMessage);
    } finally {
        // Reset button state
        loginBtn.disabled = false;
        loginBtnText.textContent = 'Log In';
        loginSpinner.classList.add('hidden');
    }
}

// Handle signup form submission
async function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    // Validation
    if (password !== confirmPassword) {
        window.toastManager.error('Passwords do not match');
        return;
    }
    
    if (!window.utils.validateEmail(email)) {
        window.toastManager.error('Please enter a valid email address');
        return;
    }
    
    if (!window.utils.validatePassword(password)) {
        window.toastManager.error('Password must be at least 6 characters long');
        return;
    }
    
    const signupBtn = document.getElementById('signup-btn');
    const signupBtnText = document.getElementById('signup-btn-text');
    const signupSpinner = document.getElementById('signup-spinner');
    
    // Show loading state
    signupBtn.disabled = true;
    signupBtnText.textContent = 'Creating account...';
    signupSpinner.classList.remove('hidden');
    
    try {
        await window.api.signup(email, password, username);
        
        // Success - redirect to assessment
        window.toastManager.success('Account created successfully! Welcome to HeartCareAI!');
        setTimeout(() => {
            window.location.href = 'assessment.html';
        }, 1500);
        
    } catch (error) {
        console.error('Signup error:', error);
        
        let errorMessage = 'Failed to create account. Please try again.';
        if (error.message.toLowerCase().includes('email already')) {
            errorMessage = 'Email is already registered. Please use a different email or login.';
        } else if (error.message.toLowerCase().includes('username')) {
            errorMessage = 'Username is already taken. Please choose a different username.';
        } else {
            errorMessage = error.message;
        }
        
        window.toastManager.error(errorMessage);
    } finally {
        // Reset button state
        signupBtn.disabled = false;
        signupBtnText.textContent = 'Create Account';
        signupSpinner.classList.add('hidden');
    }
}

// Load header and footer for auth pages
function loadHeaderFooter() {
    // Load header
    fetch('includes/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-placeholder').innerHTML = html;
            setTimeout(() => {
                if (window.updateAuthUI) {
                    window.updateAuthUI();
                }
            }, 100);
        })
        .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', updateAuthUI);

// For auth pages, setup form handlers
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loadHeaderFooter();
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        loadHeaderFooter();
        signupForm.addEventListener('submit', handleSignup);
    }
});

// Export auth utilities
window.Auth = {
    requireAuth,
    redirectIfAuthenticated,
    getUserFromToken,
    updateAuthUI
};
