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

// Risk prediction algorithm (matched with backend)
function predictRisk(data) {
  let risk = 0.0;
  const factors = [];

  // ---- AGE (weight 0.10) ----
  if (data.age >= 60) {
    risk += 0.10;
    factors.push("Age over 60");
  } else if (data.age >= 50) {
    risk += 0.07;
    factors.push("Age over 50");
  } else if (data.age >= 40) {
    risk += 0.04;
  }

  // ---- SEX (weight 0.03) ----
  if (data.sex === "M") {
    risk += 0.03;
    factors.push("Male sex");
  }

  // ---- CHEST PAIN TYPE (weight 0.15) ----
  if (data.chestPainType === "ASY") {
    risk += 0.15;
    factors.push("Asymptomatic chest pain");
  } else if (data.chestPainType === "ATA") {
    risk += 0.10;
  } else if (data.chestPainType === "NAP") {
    risk += 0.05;
  }

  // ---- BLOOD PRESSURE (weight 0.08) ----
  if (data.restingBP >= 150) {
    risk += 0.08;
    factors.push("High blood pressure");
  } else if (data.restingBP >= 130) {
    risk += 0.05;
    factors.push("Elevated blood pressure");
  }

  // ---- CHOLESTEROL (weight 0.08) ----
  if (data.cholesterol >= 260) {
    risk += 0.08;
    factors.push("High cholesterol");
  } else if (data.cholesterol >= 200) {
    risk += 0.05;
    factors.push("Borderline high cholesterol");
  }

  // ---- FASTING BS (weight 0.05) ----
  if (data.fastingBS === "1") {
    risk += 0.05;
    factors.push("Elevated fasting blood sugar");
  }

  // ---- RESTING ECG (weight 0.05) ----
  if (data.restingECG === "LVH") {
    risk += 0.05;
    factors.push("Left ventricular hypertrophy");
  } else if (data.restingECG === "ST") {
    risk += 0.03;
  }

  // ---- MAX HEART RATE (weight 0.04) ----
  if (data.maxHR < 120) {
    risk += 0.04;
    factors.push("Low maximum heart rate");
  } else if (data.maxHR < 140) {
    risk += 0.02;
  }

  // ---- EXERCISE ANGINA (weight 0.10) ----
  if (data.exerciseAngina === "Y") {
    risk += 0.10;
    factors.push("Exercise-induced angina");
  }

  // ---- OLDPEAK (weight 0.20) ----
  if (data.oldpeak >= 2) {
    risk += 0.20;
    factors.push("Significant ST depression");
  } else if (data.oldpeak >= 1) {
    risk += 0.12;
  } else if (data.oldpeak > 0) {
    risk += 0.05;
  }

  // ---- ST SLOPE (weight 0.25) ----
  if (data.stSlope === "Down") {
    risk += 0.25;
    factors.push("Downsloping ST segment");
  } else if (data.stSlope === "Flat") {
    risk += 0.18;
    factors.push("Flat ST slope");
  }

  // ---- Soft cap: realistic maximum probability ----
  risk = Math.min(risk, 0.95);

  // ---- Convert to percentage ----
  const riskScore = Math.round(risk * 100);

  // ---- Risk category ----
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
