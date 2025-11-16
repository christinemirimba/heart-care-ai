# HeartCareAI - AI-Powered Cardiovascular Risk Assessment Platform

## 🚀 Project Overview

HeartCareAI is an advanced web application that leverages artificial intelligence and machine learning to assess cardiovascular disease risk. The platform provides personalized health recommendations based on individual health parameters and medical data.

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
heart-care-ai/
├── backend/                 # FastAPI Backend
│   ├── main.py             # Main application
│   ├── requirements.txt    # Python dependencies
│   ├── heartcare.db        # SQLite database (auto-generated)
│   └── .env                # Environment configuration
│
├── frontend/               # Plain HTML/CSS/JS Frontend
│   ├── index.html          # Home page
│   ├── login.html          # Authentication
│   ├── signup.html         # User registration
│   ├── assessment.html     # AI risk assessment
│   ├── history.html        # Assessment history
│   ├── settings.html       # User settings
│   ├── about.html          # About page
│   ├── how-it-works.html   # Process explanation
│   ├── contact.html        # Contact form
│   ├── faq.html            # Frequently asked questions
│   ├── privacy.html        # Privacy policy
│   ├── recommendations.html # AI recommendations page
│   ├── css/
│   │   ├── styles.css      # Main stylesheet
│   │   ├── auth.css        # Authentication page styles
│   │   ├── assessment.css  # Assessment page styles
│   │   ├── contact.css     # Contact page styles
│   │   ├── history.css     # History page styles
│   │   ├── how-it-works.css # How it works page styles
│   │   ├── recommendations.css # Recommendations page styles
│   │   ├── settings.css    # Settings page styles
│   │   └── theme.css       # Theme system styles
│   ├── js/
│   │   ├── main.js         # Core utilities and theme management
│   │   ├── api.js          # API client and risk prediction
│   │   ├── auth.js         # Authentication logic
│   │   ├── assessment.js   # Assessment form handling
│   │   ├── history.js      # Assessment history management
│   │   ├── recommendations.js # AI recommendations display
│   │   ├── settings.js     # User settings management
│   │   └── theme.js        # Theme toggle functionality
│   └── includes/
│       ├── header.html     # Shared header component
│       └── footer.html     # Shared footer component
├── public/
│   ├── placeholder.svg     # Placeholder image (unused)
│   ├── robots.txt          # Search engine crawling rules
│   └── data/
│       ├── favicon.ico     # Website favicon
│       └── heart.csv       # Heart failure prediction dataset
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```


## ✨ Features

### 🔐 Authentication System
- User registration and login
- JWT-based authentication
- Secure password hashing
- Session management
- Protected routes


### 🧠 ML Risk Assessment 
- How It Works
1. **Data Input**: User enters 11 health parameters:
   - Age, Sex, Chest Pain Type
   - Resting Blood Pressure, Cholesterol
   - Fasting Blood Sugar, Resting ECG
   - Max Heart Rate, Exercise Angina
   - Oldpeak (ST Depression), ST Slope

2. **Data Cleaning**: Normalize and validate input data

3. **Risk Prediction**: ML model calculates risk score (0-100%)

4. **Risk Classification**:
   - **Low Risk**: 0-33%
   - **Moderate Risk**: 34-66%
   - **High Risk**: 67-100%

5. **AI Recommendations**: Gemini API generates personalized advice

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

  
### Model Training
The ML model is trained on the UCI Heart Disease dataset containing clinical data from 918 patients with 11 features.

### 📊 Assessment History

Track your cardiovascular health over time:
- **Historical records**: All past assessments saved
- **Trend analysis**: Visual indicators for improving/worsening risk
- **Detailed view**: Access past recommendations
- **Data persistence**: Stored securely in your profile


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
- **Python 3.8+** (Download from [python.org](https://python.org))
- **Modern web browser** (Chrome, Firefox, Safari, Edge)
- **Git** (for cloning the repository)

### Quick Setup (3 Steps)

#### Step 1: Clone and Navigate
```bash
git clone <repository-url>
cd heart-care-ai
```

#### Step 2: Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
```

**Edit the `.env` file with your configuration:**
```env
ENVIRONMENT=development
SECRET_KEY=your-secret-key-here-make-it-long-and-secure
DATABASE_URL=sqlite:///./heartcare.db
GEMINI_API_KEY=your-gemini-api-key
RESEND_API_KEY=your-resend-api-key
ALLOWED_HOSTS=http://localhost:8080,http://127.0.0.1:8080
CONTACT_EMAIL=contact@heartcareai.com
BUSINESS_EMAIL=your-email@example.com
```

#### Step 3: Start the Application
**Terminal 1 - Start Backend:**
```bash
cd backend
python main.py
```
The backend will start at: `http://localhost:8000`

**Terminal 2 - Start Frontend:**
```bash
# In a new terminal
cd frontend
python -m http.server 8080
```
The frontend will be available at: `http://localhost:8080`

### Detailed Setup Instructions

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   
   **On Windows:**
   ```bash
   venv\Scripts\activate
   ```
   
   **On macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```

4. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt

   OR 
   install one by one using command line

   ```

5. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

6. **Edit `.env` file** with your configuration (see template above)

7. **Run the FastAPI server:**
   ```bash
   python main.py
   ```
   
   Or using uvicorn directly:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

8. **Verify backend is running:**
   - API Base URL: `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`
   - Alternative Documentation: `http://localhost:8000/redoc`
   - Health Check: `http://localhost:8000/health`

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Serve the static files:**
   
   **Option A - Python's built-in server:**
   ```bash
   python -m http.server 8080
   ```
   
   **Option B - Node.js http-server:**
   ```bash
   npx http-server -p 8080
   ```
   
   **Option C - PHP built-in server:**
   ```bash
   php -S localhost:8080
   ```

3. **Access the application:**
   - Frontend: `http://localhost:8080`
   - Ensure backend is running on `http://localhost:8000`

### Alternative: Serve Everything from Backend

**Note:** The backend is NOT currently configured to serve frontend files directly. This setup requires additional static file serving configuration in FastAPI. For now, use the separate servers approach described above.

## 🚀 Quick Start Guide

### Method 1: Full Backend Integration (Recommended)
```bash
cd backend
python main.py
```
Open browser to: `http://localhost:8000`

### Method 2: Separate Frontend and Backend
**Terminal 1:**
```bash
cd backend
python main.py
```

**Terminal 2:**
```bash
cd frontend
python -m http.server 8080
```

Open browser to: `http://localhost:8080`

## 📡 API Endpoints

### Health Check
- `GET /health` - System health status

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user info

### Assessments
- `POST /assessment` - Create and save AI risk assessment
- `GET /assessment/history` - Get user assessment history
- `DELETE /assessment/{assessment_id}` - Delete specific assessment

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

### Environment Variables for Production
```env
ENVIRONMENT=production
SECRET_KEY=your-production-secret-key
DATABASE_URL=sqlite:///./heartcare.db
GEMINI_API_KEY=your-gemini-api-key
RESEND_API_KEY=your-resend-api-key
ALLOWED_HOSTS=https://your-domain.com
CONTACT_EMAIL=contact@heartcareai.com
BUSINESS_EMAIL=your-email@example.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

**Backend not starting:**
- Check Python version (3.8+ required)
- Ensure all dependencies are installed: `pip install -r requirements.txt`
- Check environment variables in `.env` file

**Frontend not loading:**
- Ensure backend is running on port 8000
- Check browser console for errors
- Verify CORS settings in backend

**Authentication issues:**
- Clear browser cookies and localStorage
- Check JWT_SECRET_KEY in environment variables
- Verify API endpoints are accessible

**Database issues:**
- Check SQLite file permissions
- Ensure `heartcare.db` is in the correct location
- Run database migrations if needed

### Getting Help
- **Documentation**: Check `/docs` endpoint for API documentation
- **Logs**: Check backend console for error messages
- **Browser DevTools**: Use F12 to check network requests and console errors

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
