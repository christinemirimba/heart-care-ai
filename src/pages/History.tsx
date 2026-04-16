import { AuthHeader } from "@/components/AuthHeader";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingDown, TrendingUp, AlertCircle, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

const History = () => {
  const [assessments, setAssessments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssessments = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error loading assessments:", error);
        } else if (data) {
          // Transform database format to component format
          const transformedData = data.map((assessment) => ({
            id: assessment.id,
            date: assessment.created_at,
            age: assessment.age.toString(),
            sex: assessment.sex,
            chestPainType: assessment.chest_pain_type,
            restingBP: assessment.resting_bp.toString(),
            cholesterol: assessment.cholesterol.toString(),
            fastingBS: assessment.fasting_bs.toString(),
            restingECG: assessment.resting_ecg,
            maxHR: assessment.max_hr.toString(),
            exerciseAngina: assessment.exercise_angina,
            oldpeak: assessment.oldpeak.toString(),
            stSlope: assessment.st_slope,
            riskScore: assessment.risk_score,
            riskLevel: assessment.risk_level,
            factors: assessment.factors,
            recommendations: assessment.recommendations,
            trend: "up", // Default trend
          }));

          // Calculate trends based on previous assessment
          for (let i = 0; i < transformedData.length; i++) {
            if (i < transformedData.length - 1) {
              transformedData[i].trend = 
                transformedData[i].riskScore < transformedData[i + 1].riskScore ? "down" : "up";
            }
          }

          setAssessments(transformedData);
        }
      }
      setIsLoading(false);
    };

    loadAssessments();
  }, []);

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
                    <div className="flex items-center justify-between mb-4">
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

                    {assessment.recommendations && (
                      <Collapsible>
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full">
                            <Sparkles className="h-4 w-4 mr-2" />
                            View AI Recommendations
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4">
                          <div className="prose prose-sm max-w-none dark:prose-invert p-4 bg-muted/30 rounded-lg">
                            <ReactMarkdown>{assessment.recommendations}</ReactMarkdown>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {isLoading ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Loading your assessment history...
                  </p>
                </CardContent>
              </Card>
            ) : assessments.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    No assessment history yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Complete an assessment to see your trends!
                  </p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default History;
