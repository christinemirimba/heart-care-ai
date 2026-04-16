// Heart disease risk prediction model
// Based on the Heart Failure Prediction Dataset

interface HealthData {
  age: number;
  sex: string;
  chestPainType: string;
  restingBP: number;
  cholesterol: number;
  fastingBS: string;
  restingECG: string;
  maxHR: number;
  exerciseAngina: string;
  oldpeak: number;
  stSlope: string;
}

interface RiskResult {
  riskScore: number;
  riskLevel: "Low" | "Moderate" | "High";
  factors: string[];
}

export const cleanData = (formData: any): HealthData => {
  return {
    age: parseInt(formData.age),
    sex: formData.sex,
    chestPainType: formData.chestPainType,
    restingBP: parseInt(formData.restingBP),
    cholesterol: parseInt(formData.cholesterol),
    fastingBS: formData.fastingBS,
    restingECG: formData.restingECG,
    maxHR: parseInt(formData.maxHR),
    exerciseAngina: formData.exerciseAngina,
    oldpeak: parseFloat(formData.oldpeak),
    stSlope: formData.stSlope,
  };
};

export const predictRisk = (data: HealthData): RiskResult => {
  let riskScore = 0;
  const factors: string[] = [];

  // Age factor (max 20 points)
  if (data.age > 60) {
    riskScore += 20;
    factors.push("Age over 60");
  } else if (data.age > 50) {
    riskScore += 15;
    factors.push("Age over 50");
  } else if (data.age > 40) {
    riskScore += 10;
  }

  // Sex factor (max 10 points)
  if (data.sex === "M") {
    riskScore += 10;
    factors.push("Male sex");
  }

  // Chest pain type (max 20 points)
  if (data.chestPainType === "ASY") {
    riskScore += 20;
    factors.push("Asymptomatic chest pain");
  } else if (data.chestPainType === "ATA") {
    riskScore += 10;
  } else if (data.chestPainType === "NAP") {
    riskScore += 5;
  }

  // Blood pressure (max 15 points)
  if (data.restingBP > 140) {
    riskScore += 15;
    factors.push("High blood pressure");
  } else if (data.restingBP > 130) {
    riskScore += 10;
    factors.push("Elevated blood pressure");
  }

  // Cholesterol (max 15 points)
  if (data.cholesterol > 240) {
    riskScore += 15;
    factors.push("High cholesterol");
  } else if (data.cholesterol > 200) {
    riskScore += 10;
    factors.push("Borderline high cholesterol");
  }

  // Fasting blood sugar (max 10 points)
  if (data.fastingBS === "1") {
    riskScore += 10;
    factors.push("Elevated fasting blood sugar");
  }

  // Resting ECG (max 10 points)
  if (data.restingECG === "LVH") {
    riskScore += 10;
    factors.push("Left ventricular hypertrophy");
  } else if (data.restingECG === "ST") {
    riskScore += 5;
  }

  // Max heart rate (max 10 points)
  if (data.maxHR < 120) {
    riskScore += 10;
    factors.push("Low maximum heart rate");
  } else if (data.maxHR < 140) {
    riskScore += 5;
  }

  // Exercise angina (max 15 points)
  if (data.exerciseAngina === "Y") {
    riskScore += 15;
    factors.push("Exercise-induced angina");
  }

  // Oldpeak (max 15 points)
  if (data.oldpeak > 2) {
    riskScore += 15;
    factors.push("Significant ST depression");
  } else if (data.oldpeak > 1) {
    riskScore += 10;
  } else if (data.oldpeak > 0) {
    riskScore += 5;
  }

  // ST slope (max 15 points)
  if (data.stSlope === "Flat") {
    riskScore += 15;
    factors.push("Flat ST slope");
  } else if (data.stSlope === "Down") {
    riskScore += 10;
    factors.push("Downsloping ST segment");
  }

  // Cap at 100
  riskScore = Math.min(riskScore, 100);

  // Determine risk level
  let riskLevel: "Low" | "Moderate" | "High";
  if (riskScore < 30) {
    riskLevel = "Low";
  } else if (riskScore < 60) {
    riskLevel = "Moderate";
  } else {
    riskLevel = "High";
  }

  return { riskScore, riskLevel, factors };
};
