# HeartCareAI Frontend - Vanilla HTML/CSS/JS

A fully functional frontend implementation of HeartCareAI using only vanilla HTML5, CSS3, and JavaScript (no frameworks).

## 🚀 Features

- ✅ **Complete UI** - All pages from the original React app
- ✅ **API Integration** - Ready to connect to existing backend
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Dark/Light Theme** - Toggle between themes with localStorage persistence
- ✅ **Authentication Flow** - Login, signup, and protected routes
- ✅ **Assessment System** - Complete health risk assessment form
- ✅ **Recommendations Engine** - AI-powered personalized recommendations
- ✅ **History Tracking** - View and filter past assessments
- ✅ **Settings Panel** - User profile, security, and preferences
- ✅ **Contact Form** - Get in touch with support
- ✅ **Static Hosting Ready** - Deploy to any static host (Vercel, Netlify, etc.)

## 📁 Project Structure

```
frontend/
├── index.html              # Home page
├── login.html             # Login page
├── signup.html            # Sign up page
├── assessment.html        # Risk assessment form
├── recommendations.html   # AI recommendations
├── history.html           # Assessment history
├── settings.html          # User settings
├── contact.html           # Contact form
├── about.html             # About page
├── how-it-works.html      # How it works page
├── css/
│   ├── styles.css         # Main styles
│   ├── theme.css          # Dark/light theme
│   ├── auth.css           # Authentication pages
│   ├── assessment.css     # Assessment page
│   ├── recommendations.css # Recommendations page
│   ├── history.css        # History page
│   ├── settings.css       # Settings page
│   └── contact.css        # Contact page
└── js/
    ├── main.js            # Main app logic
    ├── theme.js           # Theme toggle
    ├── api.js             # API integration
    ├── auth.js            # Authentication helpers
    ├── assessment.js      # Assessment logic
    ├── recommendations.js # Recommendations logic
    ├── history.js         # History logic
    └── settings.js        # Settings logic
```

## 🔧 Configuration

### API Integration

Update the API base URL in `js/api.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url.com';
```

Or for local development:

```javascript
const API_BASE_URL = 'http://localhost:8080';
```

### API Endpoints

The frontend expects these backend endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/assessment` - Submit health assessment
- `GET /api/recommendations/:id` - Get recommendations
- `GET /api/history` - Get assessment history
- `GET /api/user/profile` - Get user profile

## 🎨 Design System

The design uses CSS custom properties for theming:

```css
:root {
  --primary-color: #14b8a6;      /* Teal primary */
  --primary-dark: #0d9488;        /* Darker teal */
  --bg-primary: #ffffff;          /* Light background */
  --text-primary: #1e293b;        /* Dark text */
  /* ... more variables */
}
```

Dark theme overrides these in `[data-theme="dark"]` selector.

## 🚀 Deployment

### Option 1: Vercel

1. Push to GitHub
2. Import project in Vercel
3. Set build settings:
   - Build Command: (leave empty)
   - Output Directory: `frontend`
4. Deploy!

### Option 2: Netlify

1. Drag and drop the `frontend` folder to Netlify
2. Or connect GitHub repo and set publish directory to `frontend`

### Option 3: Any Static Host

Upload all files in the `frontend` folder to your web server.

## 🔐 Authentication

The app uses JWT tokens stored in localStorage:

```javascript
// Login
const { token } = await API.login(email, password);
localStorage.setItem('authToken', token);

// Check auth
const isAuthenticated = API.isAuthenticated();

// Logout
await API.logout();
localStorage.removeItem('authToken');
```

## 🎯 Key Features Implementation

### Theme Toggle
- Uses `localStorage` to persist theme preference
- Updates `data-theme` attribute on `<html>` element
- CSS variables automatically update for dark mode

### Protected Routes
- `auth.js` provides `requireAuth()` helper
- Call at top of protected pages
- Redirects to login if not authenticated

### Form Validation
- Built-in HTML5 validation
- Custom JavaScript validation for complex rules
- Real-time feedback on errors

### API Integration
- Centralized in `api.js`
- Automatic token management
- Error handling with user-friendly messages

## 📱 Responsive Design

Mobile breakpoints:
- 768px: Tablet
- 480px: Mobile

Mobile menu:
- Hamburger icon
- Slide-out navigation
- Touch-friendly buttons

## 🔒 Security

- XSS protection via input sanitization
- CSRF protection (implement on backend)
- Secure password requirements (min 8 chars)
- HTTPS recommended for production
- No sensitive data in localStorage (only JWT)

## 🧪 Testing

Open `index.html` in a browser or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve frontend

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📝 Notes

- **No Build Process**: Everything is vanilla - no webpack, no babel, no npm
- **Modern Browsers**: Uses ES6+ features (arrow functions, async/await, etc.)
- **Progressive Enhancement**: Core features work without JavaScript
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## 🆘 Support

For issues or questions:
- Check the [Contact page](contact.html)
- Email: support@heartcareai.com
- GitHub Issues: [Your repo link]

## 📄 License

All rights reserved © 2025 HeartCareAI

---

**Note:** This frontend is designed to work with your existing HeartCareAI backend. Make sure to update the API URLs and endpoints to match your backend configuration.
