import { AuthHeader } from "@/components/AuthHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingDown, TrendingUp } from "lucide-react";

const History = () => {
  // Mock data - will be replaced with real data from backend
  const assessments = [
    {
      id: 1,
      date: "2024-11-05",
      riskLevel: "Low",
      riskScore: 12,
      trend: "down",
    },
    {
      id: 2,
      date: "2024-10-20",
      riskLevel: "Moderate",
      riskScore: 35,
      trend: "up",
    },
    {
      id: 3,
      date: "2024-10-01",
      riskLevel: "Low",
      riskScore: 18,
      trend: "down",
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "Moderate":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "High":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AuthHeader />

      <div className="flex-1 bg-gradient-to-b from-muted/30 to-background">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Assessment History</h1>
              <p className="text-muted-foreground">
                Track your cardiovascular health assessments over time
              </p>
            </div>

            <div className="space-y-4">
              {assessments.map((assessment) => (
                <Card key={assessment.id} className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        {new Date(assessment.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardTitle>
                      <Badge className={getRiskColor(assessment.riskLevel)}>
                        {assessment.riskLevel} Risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Risk Score</p>
                        <p className="text-2xl font-bold">{assessment.riskScore}%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {assessment.trend === "down" ? (
                          <TrendingDown className="h-5 w-5 text-green-500" />
                        ) : (
                          <TrendingUp className="h-5 w-5 text-yellow-500" />
                        )}
                        <span className="text-sm text-muted-foreground">
                          {assessment.trend === "down" ? "Improving" : "Monitor closely"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {assessments.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No assessment history yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete your first assessment to start tracking your health
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default History;
