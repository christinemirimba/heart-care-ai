EADME.md</path>
<content"># HeartCareAI - AI-Powered Cardiovascular Risk Assessment Platform

**A complete migration from React + TypeScript + Supabase to HTML/CSS/JS + FastAPI + SQLite**

## 🚀 Project Overview

HeartCareAI is an advanced cardiovascular risk assessment platform that uses artificial intelligence to provide personalized health insights. This project has been completely restructured from a React/TypeScript frontend with Supabase backend to a modern web stack using plain HTML/CSS/JavaScript frontend with FastAPI (Python) backend and SQLite database.

## 🏗️ Architecture

### Frontend (Plain HTML/CSS/JS)
- **HTML**: Semantic, accessible markup
- **CSS**: Custom CSS with HSL color system, responsive design, and dark/light themes
- **JavaScript**: Vanilla JS with modern ES6+ features, modular architecture
- **Features**: 
  - Responsive design (mobile & desktop)
  - Theme toggle (light/dark/system)
  - Toast notifications
  - Client-side form validation
  - Smooth animations and transitions

### Backend (FastAPI + SQLite)
- **FastAPI**: Modern Python web framework with automatic API documentation
- **SQLite**: Lightweight, file-based database
- **Features**:
  - JWT authentication
  - RESTful API endpoints
  - SQLAlchemy ORM
  - Password hashing with bcrypt
  - CORS support
  - Automatic API documentation

## 📁 Project Structure

```
heartcare-ai/
├── backend/                 # FastAPI Backend
│   ├── main.py             # Main application
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment configuration
│
├── frontend/              # Plain HTML/CSS/JS Frontend
│   ├── index.html         # Home page
│   ├── login.html         # Authentication
│   ├── signup.html        # User registration
│   ├── assessment.html    # AI risk assessment
│   ├── history.html       # Assessment history
│   ├── settings.html      # User settings
│   ├── about.html         # About page
│   ├── how-it-works.html  # Process explanation
│   ├── contact.html       # Contact form
│   ├── faq.html           # Frequently asked questions
│   ├── privacy.html       # Privacy policy
│   ├── css/
│   │   └── styles.css     # Main stylesheet
│   ├── js/
│   │   ├── main.js        # Core utilities
│   │   └── api.js         # API client
│   └── includes/
│       ├── header.html    # Shared header
│       └── footer.html    # Shared footer
```

## ✨ Features

### 🔐 Authentication System
- User registration and login
- JWT-based authentication
- Secure password hashing
- Session management
- Protected routes

### 🏥 AI Risk Assessment
- Comprehensive health data input form
- 11 health parameters assessment:
  - Age, Sex
  - Blood Pressure (Resting BP)
  - Cholesterol levels
  - Fasting Blood Sugar
  - Resting ECG
  - Maximum Heart Rate
  - Exercise-induced Angina
  - Oldpeak (ST Depression)
  - ST Slope
  - Chest Pain Type
- Real-time risk calculation
- AI-powered recommendations

### 📊 Risk Analysis
- **Risk Scoring**: 0-100% cardiovascular risk percentage
- **Risk Levels**: Low (0-30%), Moderate (30-60%), High (60-100%)
- **Factor Identification**: Key contributing risk factors
- **Trend Analysis**: Historical assessment tracking

### 🤖 AI Recommendations
- Personalized health recommendations
- Lifestyle modification suggestions
- Dietary guidance
- Exercise recommendations
- Medical consultation advice

### 📱 User Experience
- **Responsive Design**: Mobile-first approach
- **Theme Toggle**: Light/Dark/System themes
- **Loading States**: Smooth loading indicators
- **Toast Notifications**: User feedback system
- **Form Validation**: Client-side validation
- **Accessibility**: WCAG compliant design

### 💾 Data Management
- Secure SQLite database
- User-specific assessment history
- Data export capabilities
- Privacy-focused design

## 🛠️ Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js (for any frontend builds, optional)
- Modern web browser

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the FastAPI server:**
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **Access the API:**
   - API Base URL: `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - Alternative Documentation: `http://localhost:8000/redoc`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Serve the static files:**
   
   Using Python's built-in server:
   ```bash
   python -m http.server 8080
   ```
   
   Using Node.js http-server (if available):
   ```bash
   npx http-server -p 8080
   ```
   
   Using PHP (if available):
   ```bash
   php -S localhost:8080
   ```

3. **Access the application:**
   - Frontend: `http://localhost:8080`
   - Ensure backend is running on `http://localhost:8000`

## 🚀 Quick Start Guide

### 1. Start the Backend
```bash
cd backend
python main.py
```

### 2. Start the Frontend
```bash
cd frontend
python -m http.server 8080
```

### 3. Open the Application
- Navigate to `http://localhost:8080`
- Create an account or log in
- Complete your first AI risk assessment

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### Assessments
- `POST /assessment` - Create new assessment
- `GET /assessment/history` - Get user assessment history
- `DELETE /assessment/{id}` - Delete specific assessment

### Public
- `GET /` - API health check

## 🎨 Design System

### Color Palette
- **Primary**: HSL(170, 100%, 42%) - Teal green
- **Background**: HSL(0, 0%, 100%) - White (Light mode)
- **Foreground**: HSL(180, 30%, 15%) - Dark gray
- **Medical Colors**:
  - Dark: HSL(180, 45%, 12%)
  - Medium: HSL(180, 35%, 25%)
  - Light: HSL(170, 90%, 92%)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, etc.)
- **Font Sizes**: Responsive typography with proper hierarchy
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Multiple variants (primary, outline, ghost, etc.)
- **Forms**: Consistent styling with validation states
- **Navigation**: Sticky header with responsive mobile menu

## 🔒 Security Features

### Authentication
- JWT tokens with configurable expiration
- Secure password hashing using bcrypt
- Protected routes and API endpoints

### Data Protection
- SQL injection prevention via SQLAlchemy ORM
- Input validation and sanitization
- CORS configuration
- Environment variable protection

### Privacy
- No tracking cookies (optional analytics)
- Secure data transmission
- User data control and deletion rights

## 🧪 Testing

### Backend Testing
```bash
cd backend
pytest
```

### Frontend Testing
Manual testing recommended for:
- Authentication flows
- Form submissions
- Responsive design
- Theme switching
- Cross-browser compatibility

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- Collapsible navigation menu
- Touch-friendly buttons and forms
- Optimized form layouts
- Responsive typography

## 🌙 Theme System

Three theme modes available:
- **Light**: Clean, bright interface
- **Dark**: Easy on the eyes for low-light usage
- **System**: Automatically follows system preference

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use a production WSGI server like Gunicorn:
   ```bash
   gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

### Frontend Deployment
1. Serve static files from any web server
2. Configure CORS for production domain
3. Update API endpoints for production

### Database
- SQLite files should be backed up regularly
- For production, consider migrating to PostgreSQL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

**Christine Mirimba** - Founder & Lead Developer
- LinkedIn: [Christine Mirimba](https://www.linkedin.com/in/christine-mirimba-51202a26b/)
- Twitter: [@Tinnah_Mirimba](https://x.com/Tinnah_Mirimba)
- Instagram: [@christinemirimba](https://www.instagram.com/christinemirimba/?hl=en)

## 🏥 Medical Disclaimer

HeartCareAI is designed for informational and educational purposes only. The assessments and recommendations provided are not intended to replace professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers for medical decisions.

## 📞 Support

For support, email support@heartcareai.com or create an issue in this repository.

---

**© 2025 HeartCareAI. All rights reserved.**
