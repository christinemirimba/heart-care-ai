// Authentication Helper Functions

// Check if user is logged in and redirect if needed
function requireAuth() {
    if (!API.isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Redirect to home if already logged in
function redirectIfAuthenticated() {
    if (API.isAuthenticated()) {
        window.location.href = 'assessment.html';
        return true;
    }
    return false;
}

// Get user data from token (simple JWT decode)
function getUserFromToken() {
    const token = API.getToken();
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

    if (API.isAuthenticated()) {
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
                    await API.logout();
                    window.location.href = 'index.html';
                } catch (error) {
                    console.error('Logout error:', error);
                    API.removeToken();
                    window.location.href = 'index.html';
                }
            });
        }
    }
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', updateAuthUI);

// Export auth utilities
window.Auth = {
    requireAuth,
    redirectIfAuthenticated,
    getUserFromToken,
    updateAuthUI
};
