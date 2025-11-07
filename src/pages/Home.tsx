import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { Brain, Zap, Lock, Users, BarChart3, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-medical.jpg";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Advanced ML algorithms with 98%+ accuracy for comprehensive cardiovascular risk analysis.",
    },
    {
      icon: Zap,
      title: "Real-Time",
      description: "Instant risk assessment and personalized recommendations in under 3 seconds.",
    },
    {
      icon: Lock,
      title: "Secure",
      description: "HIPAA-compliant with end-to-end encryption ensuring complete data privacy and security.",
    },
    {
      icon: Users,
      title: "Patient-Centered",
      description: "Personalized insights tailored to individual health profiles and medical history.",
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Forecast potential cardiovascular risks with predictive modeling.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Round-the-clock availability for real-time assessments and health monitoring.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Input Your Health Data",
      description: "Provide your health metrics including age, blood pressure, cholesterol levels, and lifestyle factors through our secure form.",
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our advanced machine learning algorithms analyze your data against thousands of medical records to identify risk patterns.",
    },
    {
      number: "03",
      title: "Risk Assessment",
      description: "Receive a comprehensive cardiovascular risk score with detailed breakdowns of contributing factors and risk levels.",
    },
    {
      number: "04",
      title: "Personalized Recommendations",
      description: "Get tailored lifestyle modifications, preventive measures, and follow-up recommendations based on your unique profile.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Medical technology background" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-medical-dark/95 to-medical-medium/90" />
        </div>
        
        <div className="relative container py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Advanced Heart Health Prediction Powered by AI
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Get personalized cardiovascular risk assessments in seconds. Our AI analyzes your health data to provide accurate predictions and actionable insights for a healthier heart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/signup")}
                className="text-lg px-8 shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Assessment
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate("/how-it-works")}
                className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">HeartCareAI?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced technology makes comprehensive care for cardiovascular health monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our simple 4-step process is a hassle-free, more informed you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex gap-6">
                  <div className="text-7xl font-bold text-primary/10 leading-none">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate("/signup")} className="px-8">
              Start Your Assessment
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
