import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Target, Users, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1">
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About HeartCareAI</h1>
              <p className="text-lg text-muted-foreground">
                Revolutionizing cardiovascular health through artificial intelligence
              </p>
            </div>

            <div className="prose prose-lg max-w-none mb-16">
              <p className="text-muted-foreground leading-relaxed">
                HeartCareAI is an intelligent web-based platform that uses machine learning to predict heart disease risk in real time. 
                Built on cutting-edge AI technology, our platform provides accessible, affordable, and actionable cardiovascular health insights.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to democratize preventive healthcare by making advanced cardiac risk assessment available to everyone, 
                anywhere, at any time. We combine the power of artificial intelligence with medical expertise to deliver personalized 
                health predictions with over 98% accuracy.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Our Mission</h3>
                    <p className="text-sm text-muted-foreground">
                      To prevent heart disease through early detection and personalized insights
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Lightbulb className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Our Vision</h3>
                    <p className="text-sm text-muted-foreground">
                      A world where everyone has access to advanced cardiovascular health monitoring
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">Our Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Empowering individuals to take control of their heart health proactively
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Market Opportunity</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>• Global Preventive Health Tech Market: <strong>$280B+</strong> (by 2030)</p>
                  <p>• Cardiac Diagnostics AI Market: Growing at <strong>20% CAGR</strong></p>
                  <p>• Target: Hospitals, Clinics, Wellness Platforms, and Individual Users</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
