// HeartCareAI API Client
// Handles all API communication with FastAPI backend

const API_BASE_URL = 'http://localhost:8000';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('access_token');
  }

  // Get authorization headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Make authenticated API requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: 'GET',
      headers: this.getHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        // Token expired or invalid
        this.logout();
        throw new Error('Authentication required');
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Network error' }));
        throw new Error(errorData.detail || 'Request failed');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Authentication methods
  async signup(email, password, username) {
    const response = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, username })
    });
    
    // Store token
    this.token = response.access_token;
    localStorage.setItem('access_token', this.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }

  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    // Store token
    this.token = response.access_token;
    localStorage.setItem('access_token', this.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }

  async getCurrentUser() {
    return await this.request('/auth/me');
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Get current user from localStorage
  getCurrentUserFromStorage() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Assessment methods
  async createAssessment(assessmentData) {
    const response = await this.request('/assessment', {
      method: 'POST',
      body: JSON.stringify(assessmentData)
    });
    
    return response;
  }

  async getAssessmentHistory() {
    return await this.request('/assessment/history');
  }

  async deleteAssessment(assessmentId) {
    const response = await this.request(`/assessment/${assessmentId}`, {
      method: 'DELETE'
    });
    
    return response;
  }

  // Health data parsing and validation
  parseHealthData(formData) {
    const data = {};
    for (const [key, value] of formData.entries()) {
      // Convert numeric fields
      if (['age', 'restingBP', 'cholesterol', 'maxHR'].includes(key)) {
        data[key] = parseInt(value);
      } else if (['oldpeak'].includes(key)) {
        data[key] = parseFloat(value);
      } else {
        data[key] = value;
      }
    }
    return data;
  }

  validateAssessmentData(data) {
    const requiredFields = [
      'age', 'sex', 'chestPainType', 'restingBP', 'cholesterol',
      'fastingBS', 'restingECG', 'maxHR', 'exerciseAngina', 'oldpeak', 'stSlope'
    ];

    for (const field of requiredFields) {
      if (!data[field] || data[field] === '') {
        throw new Error(`Please fill in all fields`);
      }
    }

    // Validate numeric ranges
    if (data.age < 1 || data.age > 120) {
      throw new Error('Age must be between 1 and 120');
    }

    if (data.restingBP < 50 || data.restingBP > 300) {
      throw new Error('Blood pressure must be between 50 and 300 mmHg');
    }

    if (data.cholesterol < 50 || data.cholesterol > 600) {
      throw new Error('Cholesterol must be between 50 and 600 mg/dl');
    }

    if (data.maxHR < 60 || data.maxHR > 220) {
      throw new Error('Maximum heart rate must be between 60 and 220 bpm');
    }

    if (data.oldpeak < 0 || data.oldpeak > 10) {
      throw new Error('Oldpeak must be between 0 and 10');
    }

    return true;
  }
}

// Create global API client instance
const api = new ApiClient();

// Risk prediction algorithm (migrated from React)
function predictRisk(data) {
  let riskScore = 0;
  const factors = [];

  // Age factor (max 20 points)
  if (data.age > 60) {
    riskScore += 20;
    factors.push("Age over 60");
  } else if (data.age > 50) {
    riskScore += 15;
    factors.push("Age over 50");
  } else if (data.age > 40) {
    riskScore += 10;
  }

  // Sex factor (max 10 points)
  if (data.sex === "M") {
    riskScore += 10;
    factors.push("Male sex");
  }

  // Chest pain type (max 20 points)
  if (data.chestPainType === "ASY") {
    riskScore += 20;
    factors.push("Asymptomatic chest pain");
  } else if (data.chestPainType === "ATA") {
    riskScore += 10;
  } else if (data.chestPainType === "NAP") {
    riskScore += 5;
  }

  // Blood pressure (max 15 points)
  if (data.restingBP > 140) {
    riskScore += 15;
    factors.push("High blood pressure");
  } else if (data.restingBP > 130) {
    riskScore += 10;
    factors.push("Elevated blood pressure");
  }

  // Cholesterol (max 15 points)
  if (data.cholesterol > 240) {
    riskScore += 15;
    factors.push("High cholesterol");
  } else if (data.cholesterol > 200) {
    riskScore += 10;
    factors.push("Borderline high cholesterol");
  }

  // Fasting blood sugar (max 10 points)
  if (data.fastingBS === "1") {
    riskScore += 10;
    factors.push("Elevated fasting blood sugar");
  }

  // Resting ECG (max 10 points)
  if (data.restingECG === "LVH") {
    riskScore += 10;
    factors.push("Left ventricular hypertrophy");
  } else if (data.restingECG === "ST") {
    riskScore += 5;
  }

  // Max heart rate (max 10 points)
  if (data.maxHR < 120) {
    riskScore += 10;
    factors.push("Low maximum heart rate");
  } else if (data.maxHR < 140) {
    riskScore += 5;
  }

  // Exercise angina (max 15 points)
  if (data.exerciseAngina === "Y") {
    riskScore += 15;
    factors.push("Exercise-induced angina");
  }

  // Oldpeak (max 15 points)
  if (data.oldpeak > 2) {
    riskScore += 15;
    factors.push("Significant ST depression");
  } else if (data.oldpeak > 1) {
    riskScore += 10;
  } else if (data.oldpeak > 0) {
    riskScore += 5;
  }

  // ST slope (max 15 points)
  if (data.stSlope === "Flat") {
    riskScore += 15;
    factors.push("Flat ST slope");
  } else if (data.stSlope === "Down") {
    riskScore += 10;
    factors.push("Downsloping ST segment");
  }

  // Cap at 100
  riskScore = Math.min(riskScore, 100);

  // Determine risk level
  let riskLevel;
  if (riskScore < 30) {
    riskLevel = "Low";
  } else if (riskScore < 60) {
    riskLevel = "Moderate";
  } else {
    riskLevel = "High";
  }

  return { riskScore, riskLevel, factors };
}

// Helper functions
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getRiskColor(level) {
  switch (level) {
    case "Low":
      return "bg-green-500-10 text-green-500 hover-bg-green-500-20";
    case "Moderate":
      return "bg-yellow-500-10 text-yellow-500 hover-bg-yellow-500-20";
    case "High":
      return "bg-red-500-10 text-red-500 hover-bg-red-500-20";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getBorderColor(level) {
  switch (level) {
    case "Low":
      return "border-green-500-30";
    case "Moderate":
      return "border-yellow-500-30";
    case "High":
      return "border-red-500-30";
    default:
      return "border-border";
  }
}

function getBgColor(level) {
  switch (level) {
    case "Low":
      return "bg-green-500-5";
    case "Moderate":
      return "bg-yellow-500-5";
    case "High":
      return "bg-red-500-5";
    default:
      return "bg-muted";
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ApiClient, api, predictRisk, formatDate, getRiskColor, getBorderColor, getBgColor };
}
