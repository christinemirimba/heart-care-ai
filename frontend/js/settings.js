// Settings page functionality

// Check if user is authenticated
if (!Auth.requireAuth()) {
    // Redirect handled in requireAuth
}

// Tab switching
const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsPanels = document.querySelectorAll('.settings-panel');

settingsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetPanel = tab.dataset.tab;
        
        // Remove active class from all tabs and panels
        settingsTabs.forEach(t => t.classList.remove('active'));
        settingsPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        document.getElementById(targetPanel).classList.add('active');
    });
});

// Profile form
const profileForm = document.getElementById('profileForm');
profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dateOfBirth: document.getElementById('dateOfBirth').value
    };
    
    try {
        // API call would go here
        HeartCareAI.showAlert('Profile updated successfully!', 'success');
    } catch (error) {
        HeartCareAI.showAlert('Failed to update profile', 'error');
    }
});

// Password form
const passwordForm = document.getElementById('passwordForm');
passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    
    if (newPassword !== confirmPassword) {
        HeartCareAI.showAlert('New passwords do not match', 'error');
        return;
    }
    
    if (!HeartCareAI.validatePassword(newPassword)) {
        HeartCareAI.showAlert('Password must be at least 8 characters', 'error');
        return;
    }
    
    try {
        // API call would go here
        HeartCareAI.showAlert('Password updated successfully!', 'success');
        passwordForm.reset();
    } catch (error) {
        HeartCareAI.showAlert('Failed to update password', 'error');
    }
});

// Dark mode toggle in preferences
const darkModeToggle = document.getElementById('darkModeToggle');
const currentTheme = document.documentElement.getAttribute('data-theme');
darkModeToggle.checked = currentTheme === 'dark';

darkModeToggle.addEventListener('change', (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update main theme toggle icon
    const mainThemeToggle = document.getElementById('themeToggle');
    if (mainThemeToggle) {
        const icon = mainThemeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }
    }
});

// Load user profile data
loadUserProfile();

async function loadUserProfile() {
    try {
        const user = await API.getUserProfile();
        
        if (user) {
            document.getElementById('fullName').value = user.name || '';
            document.getElementById('email').value = user.email || '';
            document.getElementById('phone').value = user.phone || '';
            document.getElementById('dateOfBirth').value = user.dateOfBirth || '';
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}
