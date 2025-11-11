-- Create assessments table to store user-specific health assessments
CREATE TABLE public.assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  age INTEGER NOT NULL,
  sex TEXT NOT NULL,
  chest_pain_type TEXT NOT NULL,
  resting_bp INTEGER NOT NULL,
  cholesterol INTEGER NOT NULL,
  fasting_bs INTEGER NOT NULL,
  resting_ecg TEXT NOT NULL,
  max_hr INTEGER NOT NULL,
  exercise_angina TEXT NOT NULL,
  oldpeak DECIMAL NOT NULL,
  st_slope TEXT NOT NULL,
  risk_score INTEGER NOT NULL,
  risk_level TEXT NOT NULL,
  factors TEXT[] NOT NULL,
  recommendations TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own assessments" 
ON public.assessments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own assessments" 
ON public.assessments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments" 
ON public.assessments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assessments" 
ON public.assessments 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX idx_assessments_user_id ON public.assessments(user_id);
CREATE INDEX idx_assessments_created_at ON public.assessments(created_at DESC);