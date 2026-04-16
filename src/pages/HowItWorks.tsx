import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, Brain, BarChart, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Step 1: Input Your Health Data",
      description: "Provide essential health metrics through our secure, user-friendly form. We collect information about your age, blood pressure, cholesterol levels, and other cardiovascular indicators.",
    },
    {
      icon: Brain,
      title: "Step 2: AI Analysis",
      description: "Our advanced machine learning algorithms, trained on thousands of medical records, analyze your data to identify patterns and risk factors with over 98% accuracy.",
    },
    {
      icon: BarChart,
      title: "Step 3: Risk Assessment",
      description: "Receive a comprehensive risk score with detailed breakdowns showing which factors contribute most to your cardiovascular health status.",
    },
    {
      icon: CheckCircle,
      title: "Step 4: Personalized Recommendations",
      description: "Get actionable insights and recommendations tailored to your unique health profile, including lifestyle modifications and preventive measures.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1">
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                How It <span className="text-primary">Works</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our simple 4-step process delivers accurate cardiovascular risk assessments in seconds
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {steps.map((step, index) => (
                <Card key={index} className="border-border/50 hover:border-primary/50 transition-all">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className="p-4 rounded-full bg-primary/10">
                          <step.icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
