// API Integration for HeartCareAI Backend

// Base API URL - Update this with your actual backend URL
const API_BASE_URL = window.location.origin.includes('localhost') 
    ? 'http://localhost:8080' 
    : 'https://heart-care-ai.vercel.app';

// API endpoints
const API_ENDPOINTS = {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ASSESSMENT: `${API_BASE_URL}/api/assessment`,
    RECOMMENDATIONS: `${API_BASE_URL}/api/recommendations`,
    HISTORY: `${API_BASE_URL}/api/history`,
    USER_PROFILE: `${API_BASE_URL}/api/user/profile`
};

// API Helper functions
const API = {
    // Get auth token from localStorage
    getToken() {
        return localStorage.getItem('authToken');
    },

    // Set auth token
    setToken(token) {
        localStorage.setItem('authToken', token);
    },

    // Remove auth token
    removeToken() {
        localStorage.removeItem('authToken');
    },

    // Make authenticated request
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(endpoint, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Authentication endpoints
    async login(email, password) {
        const data = await this.request(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (data.token) {
            this.setToken(data.token);
        }
        
        return data;
    },

    async signup(email, password, name) {
        const data = await this.request(API_ENDPOINTS.SIGNUP, {
            method: 'POST',
            body: JSON.stringify({ email, password, name })
        });
        
        if (data.token) {
            this.setToken(data.token);
        }
        
        return data;
    },

    async logout() {
        try {
            await this.request(API_ENDPOINTS.LOGOUT, { method: 'POST' });
        } finally {
            this.removeToken();
        }
    },

    // Assessment endpoints
    async submitAssessment(assessmentData) {
        return await this.request(API_ENDPOINTS.ASSESSMENT, {
            method: 'POST',
            body: JSON.stringify(assessmentData)
        });
    },

    async getRecommendations(assessmentId) {
        return await this.request(`${API_ENDPOINTS.RECOMMENDATIONS}/${assessmentId}`);
    },

    async getHistory() {
        return await this.request(API_ENDPOINTS.HISTORY);
    },

    async getUserProfile() {
        return await this.request(API_ENDPOINTS.USER_PROFILE);
    },

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.getToken();
    }
};

// Export API object
window.API = API;
