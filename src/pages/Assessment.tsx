import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthHeader } from "@/components/AuthHeader";
import { Footer } from "@/components/Footer";
import { Heart, Loader2, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cleanData, predictRisk } from "@/lib/predictRisk";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

const Assessment = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPainType: "",
    restingBP: "",
    cholesterol: "",
    fastingBS: "",
    restingECG: "",
    maxHR: "",
    exerciseAngina: "",
    oldpeak: "",
    stSlope: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const emptyFields = Object.entries(formData).filter(([_, value]) => !value);
    if (emptyFields.length > 0) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all fields before calculating risk.",
        variant: "destructive",
      });
      return;
    }

    setIsCalculating(true);

    try {
      // Step 1: Data Cleaning
      const cleanedData = cleanData(formData);
      
      // Step 2: Risk Prediction
      const prediction = predictRisk(cleanedData);
      
      // Step 3: Generate AI Recommendations
      toast({
        title: "Generating Recommendations",
        description: "AI is analyzing your health profile...",
      });

      const { data: recommendationsData, error: recommendationsError } = await supabase.functions.invoke(
        'generate-health-recommendations',
        {
          body: {
            healthData: cleanedData,
            riskScore: prediction.riskScore,
            riskLevel: prediction.riskLevel,
            factors: prediction.factors,
          }
        }
      );

      if (recommendationsError) {
        console.error("Recommendations error:", recommendationsError);
        throw new Error("Failed to generate recommendations");
      }

      const fullResult = {
        ...prediction,
        recommendations: recommendationsData.recommendations,
      };

      setResult(fullResult);
      
      // Step 4: Save to History ONLY after complete assessment with recommendations
      if (isAuthenticated) {
        const history = localStorage.getItem("heartcare_history");
        const historyArray = history ? JSON.parse(history) : [];
        
        const newEntry = {
          id: Date.now(),
          date: new Date().toISOString(),
          ...formData,
          riskScore: prediction.riskScore,
          riskLevel: prediction.riskLevel,
          factors: prediction.factors,
          recommendations: recommendationsData.recommendations,
          trend: historyArray.length > 0 && prediction.riskScore < historyArray[0].riskScore ? "down" : "up",
        };
        
        historyArray.unshift(newEntry);
        localStorage.setItem("heartcare_history", JSON.stringify(historyArray));
        
        toast({
          title: "Assessment Complete",
          description: "Your personalized recommendations are ready!",
        });
      }
    } catch (error) {
      console.error("Assessment error:", error);
      toast({
        title: "Error",
        description: "Failed to complete assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <AuthHeader />
      
      <div className="container py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">AI Risk Assessment</h1>
            <p className="text-muted-foreground">
              Input your current health parameters for an immediate AI-driven assessment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Health Parameters</CardTitle>
                  <CardDescription>
                    Please fill in all fields accurately for the best results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age (Years)</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="40"
                          value={formData.age}
                          onChange={(e) => handleInputChange("age", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sex">Sex</Label>
                        <Select value={formData.sex} onValueChange={(value) => handleInputChange("sex", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Male</SelectItem>
                            <SelectItem value="F">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="restingBP">Resting BP (mm Hg)</Label>
                        <Input
                          id="restingBP"
                          type="number"
                          placeholder="120"
                          value={formData.restingBP}
                          onChange={(e) => handleInputChange("restingBP", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cholesterol">Cholesterol (mg/dl)</Label>
                        <Input
                          id="cholesterol"
                          type="number"
                          placeholder="200"
                          value={formData.cholesterol}
                          onChange={(e) => handleInputChange("cholesterol", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fastingBS">Fasting Blood Sugar &gt; 120 mg/dl</Label>
                        <Select value={formData.fastingBS} onValueChange={(value) => handleInputChange("fastingBS", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No</SelectItem>
                            <SelectItem value="1">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="restingECG">Resting ECG</Label>
                        <Select value={formData.restingECG} onValueChange={(value) => handleInputChange("restingECG", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Normal">Normal</SelectItem>
                            <SelectItem value="ST">ST</SelectItem>
                            <SelectItem value="LVH">LVH</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maxHR">Max Heart Rate (bpm)</Label>
                        <Input
                          id="maxHR"
                          type="number"
                          placeholder="150"
                          value={formData.maxHR}
                          onChange={(e) => handleInputChange("maxHR", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="exerciseAngina">Exercise Induced Angina</Label>
                        <Select value={formData.exerciseAngina} onValueChange={(value) => handleInputChange("exerciseAngina", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="N">No</SelectItem>
                            <SelectItem value="Y">Yes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="oldpeak">Oldpeak (ST Depression)</Label>
                        <Input
                          id="oldpeak"
                          type="number"
                          step="0.1"
                          placeholder="0"
                          value={formData.oldpeak}
                          onChange={(e) => handleInputChange("oldpeak", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="stSlope">ST Slope</Label>
                        <Select value={formData.stSlope} onValueChange={(value) => handleInputChange("stSlope", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Up">Up</SelectItem>
                            <SelectItem value="Flat">Flat</SelectItem>
                            <SelectItem value="Down">Down</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="chestPainType">Chest Pain Type</Label>
                        <Select value={formData.chestPainType} onValueChange={(value) => handleInputChange("chestPainType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ATA">Atypical Angina</SelectItem>
                            <SelectItem value="NAP">Non-Anginal Pain</SelectItem>
                            <SelectItem value="ASY">Asymptomatic</SelectItem>
                            <SelectItem value="TA">Typical Angina</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isCalculating}>
                      {isCalculating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span className="hidden sm:inline">Analyzing...</span>
                          <span className="sm:hidden">Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <span className="hidden sm:inline">Calculate AI Risk Score</span>
                          <span className="sm:hidden">Calculate Risk Score</span>
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {result ? (
                <>
                  <Card className={`border-2 ${
                    result.riskLevel === "Low" 
                      ? "bg-green-500/5 border-green-500/30" 
                      : result.riskLevel === "Moderate"
                      ? "bg-yellow-500/5 border-yellow-500/30"
                      : "bg-red-500/5 border-red-500/30"
                  }`}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-4 rounded-full bg-background">
                          <Heart className={`h-12 w-12 fill-current ${
                            result.riskLevel === "Low" 
                              ? "text-green-500" 
                              : result.riskLevel === "Moderate"
                              ? "text-yellow-500"
                              : "text-red-500"
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl mb-2">
                            {result.riskScore}%
                          </h3>
                          <Badge className={
                            result.riskLevel === "Low" 
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                              : result.riskLevel === "Moderate"
                              ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                              : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                          }>
                            {result.riskLevel} Risk
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-4">
                            {result.riskLevel === "Low" 
                              ? "Your cardiovascular risk is low. Keep up the healthy lifestyle!" 
                              : result.riskLevel === "Moderate"
                              ? "Your cardiovascular risk is moderate. Consider lifestyle changes and consult a healthcare provider."
                              : "Your cardiovascular risk is high. Please consult a healthcare provider soon."}
                          </p>
                          {result.factors.length > 0 && (
                            <div className="mt-4 text-left">
                              <p className="text-sm font-medium mb-2">Key Risk Factors:</p>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {result.factors.map((factor: string, i: number) => (
                                  <li key={i}>• {factor}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {result.recommendations && (
                    <Card className="border-primary/20">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-primary" />
                          AI Recommendations
                        </CardTitle>
                        <CardDescription>
                          Personalized guidance based on your health profile
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <ReactMarkdown>{result.recommendations}</ReactMarkdown>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-4 rounded-full bg-background">
                        <Heart className="h-12 w-12 text-primary fill-primary animate-pulse" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Ready for your assessment</h3>
                        <p className="text-sm text-muted-foreground">
                          Complete the form to receive your risk score and personalized AI recommendations
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Assessment;
