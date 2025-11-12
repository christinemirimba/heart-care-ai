// HeartCareAI Main JavaScript Utilities
// Global utilities and functionality

// Theme management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'system';
    this.init();
  }

  init() {
    // Apply saved theme or system preference
    this.applyTheme();
    
    // Add theme toggle button to all pages
    this.createThemeToggle();
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (this.theme === 'system') {
          this.applyTheme();
        }
      });
    }
  }

  applyTheme() {
    const root = document.documentElement;
    
    if (this.theme === 'dark') {
      root.classList.add('dark');
    } else if (this.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }

  toggleTheme() {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else if (this.theme === 'dark') {
      this.theme = 'system';
    } else {
      this.theme = 'light';
    }
    
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
    this.updateToggleButton();
  }

  createThemeToggle() {
    // Remove existing toggle if present
    const existingToggle = document.getElementById('theme-toggle');
    if (existingToggle) {
      existingToggle.remove();
    }

    // Create theme toggle button
    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.className = 'theme-toggle';
    toggle.innerHTML = this.getThemeIcon();
    toggle.title = 'Toggle theme';
    
    toggle.addEventListener('click', () => this.toggleTheme());
    
    document.body.appendChild(toggle);
    this.updateToggleButton();
  }

  getThemeIcon() {
    switch (this.theme) {
      case 'light':
        return '🌙';
      case 'dark':
        return '☀️';
      case 'system':
        return '💻';
      default:
        return '💻';
    }
  }

  updateToggleButton() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.innerHTML = this.getThemeIcon();
    }
  }
}

// Toast notification system
class ToastManager {
  constructor() {
    this.toasts = [];
    this.container = this.createContainer();
  }

  createContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = `
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1000;
        pointer-events: none;
      `;
      document.body.appendChild(container);
    }
    return container;
  }

  show(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.cssText = `
      pointer-events: auto;
      margin-bottom: 0.5rem;
      max-width: 400px;
      padding: 1rem;
      background-color: hsl(var(--background));
      border: 1px solid hsl(var(--border));
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      animation: slideIn 0.3s ease-out;
    `;

    // Set type-specific colors
    if (type === 'success') {
      toast.style.borderColor = 'rgb(34, 197, 94)';
    } else if (type === 'error') {
      toast.style.borderColor = 'rgb(239, 68, 68)';
    }

    toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        ${this.getIcon(type)}
        <span>${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" 
                style="margin-left: auto; background: none; border: none; cursor: pointer; opacity: 0.6;">
          ×
        </button>
      </div>
    `;

    this.container.appendChild(toast);
    this.toasts.push(toast);

    // Auto-remove after duration
    setTimeout(() => {
      this.remove(toast);
    }, duration);

    return toast;
  }

  remove(toast) {
    if (toast && toast.parentNode) {
      toast.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        toast.remove();
        this.toasts = this.toasts.filter(t => t !== toast);
      }, 300);
    }
  }

  getIcon(type) {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  }

  success(message, duration) {
    return this.show(message, 'success', duration);
  }

  error(message, duration) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

// Authentication utilities
class AuthManager {
  constructor() {
    this.user = this.getUserFromStorage();
  }

  getUserFromStorage() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.user = null;
    window.location.href = 'login.html';
  }

  getUser() {
    if (!this.user) {
      this.user = this.getUserFromStorage();
    }
    return this.user;
  }
}

// Loading spinner utilities
class LoadingManager {
  static show(message = 'Loading...') {
    // Remove existing spinner
    const existing = document.getElementById('loading-spinner');
    if (existing) {
      existing.remove();
    }

    const spinner = document.createElement('div');
    spinner.id = 'loading-spinner';
    spinner.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      ">
        <div style="
          background-color: hsl(var(--background));
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          text-align: center;
        ">
          <div class="loading-spinner" style="
            border: 2px solid hsl(var(--muted));
            border-top: 2px solid hsl(var(--primary));
            width: 2rem;
            height: 2rem;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
          "></div>
          <p>${message}</p>
        </div>
      </div>
    `;

    document.body.appendChild(spinner);
    return spinner;
  }

  static hide() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
      spinner.remove();
    }
  }
}

// Utility functions
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Simple markdown parser for recommendations
function parseMarkdown(text) {
  return text
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    .replace(/(\n<li>.*<\/li>\n)/gims, '<ul>$1</ul>')
    .replace(/\n/g, '<br>');
}

// Navigation utilities
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentPage || 
        (currentPage === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Form utilities
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showFormError(formId, message) {
  const form = document.getElementById(formId);
  let errorDiv = form.querySelector('.form-error');
  
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
      color: rgb(239, 68, 68);
      font-size: 0.875rem;
      margin-top: 0.5rem;
    `;
    form.appendChild(errorDiv);
  }
  
  errorDiv.textContent = message;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme manager
  window.themeManager = new ThemeManager();
  
  // Initialize toast manager
  window.toastManager = new ToastManager();
  
  // Initialize auth manager
  window.authManager = new AuthManager();
  
  // Set active navigation
  setActiveNavLink();
  
  // Add CSS for slideOut animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

// Global utilities
window.HeartCareAI = {
  themeManager: null,
  toastManager: null,
  authManager: null,
  loadingManager: LoadingManager,
  utils: {
    formatDate,
    formatDateTime,
    parseMarkdown,
    validateEmail,
    validatePassword,
    showFormError
  }
};
