# HeartCareAI - AI-Powered Cardiovascular Risk Assessment Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

HeartCareAI is an advanced web application that leverages artificial intelligence and machine learning to assess cardiovascular disease risk. The platform provides personalized health recommendations based on individual health parameters and medical data.

## 🌟 Features

### Core Functionality
- **AI-Powered Risk Assessment**: Machine learning model trained on clinical data to predict heart disease probability
- **Personalized Recommendations**: Generative AI (Gemini) provides tailored health advice based on your unique profile
- **Assessment History Tracking**: Monitor your cardiovascular health trends over time
- **Real Authentication**: Secure user authentication system with email/password signup and login
- **Responsive Design**: Fully responsive interface that works seamlessly on desktop, tablet, and mobile devices

### User Interface
- **Tabbed Assessment Interface**: Separate tabs for health assessment and AI recommendations
- **Mobile-Friendly Navigation**: Hamburger menu for mobile devices and dropdown menus for desktop
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Interactive Dashboard**: Track assessment history with visual trends and insights

## 🏗️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development for better code quality
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **shadcn/ui**: High-quality, accessible UI components
- **Radix UI**: Unstyled, accessible component primitives
- **React Router**: Client-side routing for single-page application
- **React Markdown**: Render AI recommendations in formatted markdown

### Backend & Cloud
- **Lovable Cloud**: Fully managed backend infrastructure powered by Supabase
- **PostgreSQL**: Robust relational database for user data
- **Edge Functions**: Serverless functions for AI integration
- **Row Level Security (RLS)**: Database-level security policies

### AI & Machine Learning
- **Custom ML Model**: Trained on heart disease clinical dataset
- **Gemini API**: Google's Generative AI for personalized health recommendations
- **Real-time Analysis**: Instant risk calculations with detailed factor analysis

### DevOps & Tools
- **Git**: Version control
- **ESLint**: Code linting and quality checks
- **TypeScript**: Static type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** - [Download](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- TypeScript and types
- Tailwind CSS and plugins
- shadcn/ui components
- Supabase client
- And all other dependencies

### 3. Environment Setup

The project uses Lovable Cloud, which automatically configures your backend. The `.env` file is pre-configured with:

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=<your-project-id>
```

**Note**: These variables are automatically managed. Do not edit the `.env` file manually.

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### 6. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
heartcare-ai/
├── public/                    # Static assets
│   ├── data/                 # ML model training data
│   └── robots.txt            # SEO configuration
├── src/
│   ├── assets/               # Images and media files
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AuthHeader.tsx   # Authenticated user header
│   │   ├── Header.tsx       # Public pages header
│   │   ├── Footer.tsx       # Site footer
│   │   ├── MobileNav.tsx    # Mobile navigation menu
│   │   └── ...
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── hooks/               # Custom React hooks
│   │   ├── use-toast.ts    # Toast notifications
│   │   └── use-mobile.tsx  # Mobile detection
│   ├── lib/                 # Utility functions
│   │   ├── predictRisk.ts  # ML risk prediction logic
│   │   └── utils.ts        # Helper functions
│   ├── pages/               # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── Login.tsx       # Login page
│   │   ├── Signup.tsx      # Registration page
│   │   ├── Assessment.tsx  # Risk assessment form
│   │   ├── History.tsx     # Assessment history
│   │   ├── Settings.tsx    # User settings
│   │   └── ...
│   ├── integrations/        # External service integrations
│   │   └── supabase/       # Supabase client & types
│   ├── App.tsx              # Main app component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles & design tokens
├── supabase/                # Backend configuration
│   ├── config.toml         # Supabase configuration
│   └── functions/          # Edge functions
│       ├── generate-health-recommendations/
│       └── send-contact-email/
├── index.html              # HTML entry point
├── vite.config.ts         # Vite configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies

```

## 🎨 Design System

HeartCareAI uses a custom design system built with Tailwind CSS and HSL color tokens. All colors are semantic and support both light and dark modes.

### Color Tokens
- `--primary`: Main brand color (teal)
- `--secondary`: Secondary UI elements
- `--muted`: Subtle backgrounds and text
- `--accent`: Emphasis and highlights
- `--destructive`: Error states
- `--medical-*`: Healthcare-specific theme colors

### Key Design Principles
- **Semantic tokens**: Use design system variables instead of hard-coded colors
- **Responsive design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG 2.1 AA compliant components
- **Consistent spacing**: Based on Tailwind's spacing scale
- **Typography**: System font stack for optimal performance

## 🔐 Authentication

HeartCareAI implements secure authentication with the following features:

### User Registration
1. Navigate to `/signup`
2. Enter email and password
3. Auto-confirm is enabled (no email verification required in development)
4. Automatic profile creation in database

### User Login
1. Navigate to `/login`
2. Enter credentials
3. Session persisted in local storage
4. Protected routes require authentication

### Security Features
- **Row Level Security (RLS)**: Database-level access control
- **Secure session management**: JWT-based authentication
- **Password hashing**: Bcrypt encryption
- **Protected routes**: Authentication guards on sensitive pages

## 🧠 ML Risk Assessment

### How It Works

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

### Model Training
The ML model is trained on the UCI Heart Disease dataset containing clinical data from 918 patients with 11 features.

## 🤖 AI Recommendations

HeartCareAI uses Google's Gemini Pro model to generate personalized health recommendations:

### What It Analyzes
- Your specific health parameters
- Calculated risk score and level
- Identified risk factors
- Medical knowledge base

### Recommendation Categories
- **Lifestyle modifications**: Diet, exercise, stress management
- **Medical considerations**: When to see a doctor
- **Preventive measures**: Long-term health strategies
- **Risk factor management**: Targeted interventions

### Technical Implementation
- Serverless Edge Function for API calls
- Structured prompt engineering for medical accuracy
- Markdown formatting for readable output
- Error handling and fallbacks

## 📊 Assessment History

Track your cardiovascular health over time:
- **Historical records**: All past assessments saved
- **Trend analysis**: Visual indicators for improving/worsening risk
- **Detailed view**: Access past recommendations
- **Data persistence**: Stored securely in your profile

## 🌐 Deployment

HeartCareAI can be deployed to any static hosting service:

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm run build
# Upload dist folder to Netlify
```

#### GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from dist folder
```

### Custom Domain

To connect a custom domain:
1. Navigate to Project → Settings → Domains in Lovable
2. Click "Connect Domain"
3. Follow DNS configuration instructions
4. Note: Requires a paid Lovable plan

## 🔧 Configuration

### Tailwind Configuration
Customize the design system in `tailwind.config.ts`:
```typescript
export default {
  theme: {
    extend: {
      colors: {
        // Add custom colors
      }
    }
  }
}
```

### TypeScript Configuration
Strict mode enabled in `tsconfig.json` for type safety.

### Vite Configuration
Custom configuration in `vite.config.ts` for:
- Path aliases (`@/` for `src/`)
- Build optimizations
- Development server settings

## 🧪 Development Workflow

### Adding New Components

1. Create component in `src/components/`:
```tsx
// src/components/MyComponent.tsx
import { Button } from "@/components/ui/button";

export const MyComponent = () => {
  return <Button>Click me</Button>;
};
```

2. Import and use:
```tsx
import { MyComponent } from "@/components/MyComponent";
```

### Adding New Pages

1. Create page in `src/pages/`:
```tsx
// src/pages/MyPage.tsx
export default function MyPage() {
  return <div>My Page</div>;
}
```

2. Add route in `src/App.tsx`:
```tsx
<Route path="/my-page" element={<MyPage />} />
```

### Using shadcn/ui Components

Install new components:
```bash
npx shadcn-ui@latest add [component-name]
```

Example:
```bash
npx shadcn-ui@latest add dialog
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: npm install fails
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Reinstall
npm install
```

**Issue**: TypeScript errors
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

**Issue**: Port 5173 already in use
```bash
# Kill process using port
lsof -ti:5173 | xargs kill -9
# Or specify different port
npm run dev -- --port 3000
```

**Issue**: Authentication not working
- Check that auto-confirm email is enabled in Lovable Cloud settings
- Verify environment variables are correctly set
- Check browser console for detailed error messages

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Follow TypeScript best practices
- Use semantic HTML
- Follow the existing component structure
- Write meaningful commit messages
- Add comments for complex logic

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
## 👥 Team

**Christine Mirimba** - Founder & Lead Developer
- LinkedIn: [Christine Mirimba](https://www.linkedin.com/in/christine-mirimba-51202a26b/)
- Twitter: [@Tinnah_Mirimba](https://x.com/Tinnah_Mirimba)
- Instagram: [@christinemirimba](https://www.instagram.com/christinemirimba/?hl=en)


## 🙏 Acknowledgments

- **UCI Machine Learning Repository**: Heart Disease dataset
- **Google Gemini**: AI recommendations API
- **shadcn/ui**: Beautiful UI components
- **Radix UI**: Accessible primitives
## 📞 Support

For support and questions:
- **Community**: [Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Contact Page**: Use the in-app contact form

## 🗺️ Roadmap

### Upcoming Features
- [ ] Export assessment reports as PDF
- [ ] Integration with wearable devices
- [ ] Multi-language support
- [ ] Advanced data visualization charts
- [ ] Social features (share anonymized data)
- [ ] Telemedicine integration
- [ ] Mobile app (React Native)

## ⚠️ Medical Disclaimer

HeartCareAI is an educational and informational tool. It is **NOT** a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers regarding medical conditions and treatment options.

The risk assessments and recommendations provided are based on statistical models and should not be used as the sole basis for medical decisions.

## 📈 Version History

### v1.0.0 (Current)
- Initial release
- Core risk assessment functionality
- AI-powered recommendations
- User authentication
- Assessment history tracking
- Responsive design
- Mobile navigation

---

**Built with  love ❤️
