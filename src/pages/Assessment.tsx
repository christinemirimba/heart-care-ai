import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, User } from "lucide-react";

const Assessment = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement ML prediction logic
    console.log("Assessment data:", formData);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
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

                    <Button type="submit" className="w-full" size="lg">
                      <span className="hidden sm:inline">Calculate AI Risk Score</span>
                      <span className="sm:hidden">Calculate Risk Score</span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-background">
                      <Heart className="h-12 w-12 text-primary fill-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Input your data and click 'Calculate'</h3>
                      <p className="text-sm text-muted-foreground">
                        to see your personalized AI prediction.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm font-medium mb-1">Guest User</p>
                      <p className="text-xs text-muted-foreground">
                        Sign up to save your assessment history
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Assessment;
