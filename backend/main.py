from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from sqlalchemy.sql import func
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
import os
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

# Logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./heartcare.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Security configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 8  # 8 days

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Security
security = HTTPBearer()

# FastAPI app
app = FastAPI(
    title="HeartCareAI API",
    description="Advanced cardiovascular risk assessment powered by AI",
    version="2.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database models
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    assessments = relationship("Assessment", back_populates="user")

class Assessment(Base):
    __tablename__ = "assessments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    age = Column(Integer, nullable=False)
    sex = Column(String, nullable=False)
    chest_pain_type = Column(String, nullable=False)
    resting_bp = Column(Integer, nullable=False)
    cholesterol = Column(Integer, nullable=False)
    fasting_bs = Column(String, nullable=False)
    resting_ecg = Column(String, nullable=False)
    max_hr = Column(Integer, nullable=False)
    exercise_angina = Column(String, nullable=False)
    oldpeak = Column(Float, nullable=False)
    st_slope = Column(String, nullable=False)
    risk_score = Column(Integer, nullable=False)
    risk_level = Column(String, nullable=False)
    factors = Column(Text, nullable=True)  # JSON string of factors
    recommendations = Column(Text, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="assessments")

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    username: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

class AssessmentRequest(BaseModel):
    age: int
    sex: str
    chest_pain_type: str
    resting_bp: int
    cholesterol: int
    fasting_bs: str
    resting_ecg: str
    max_hr: int
    exercise_angina: str
    oldpeak: float
    st_slope: str

class AssessmentResponse(BaseModel):
    id: int
    risk_score: int
    risk_level: str
    factors: List[str]
    recommendations: str
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

class AssessmentListResponse(BaseModel):
    id: int
    created_at: datetime
    risk_score: int
    risk_level: str
    factors: List[str]
    recommendations: str
    
    model_config = ConfigDict(from_attributes=True)

# Utility functions
def create_db_and_tables():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user

# Risk prediction logic
def predict_risk(data: dict) -> dict:
    """Risk prediction algorithm based on heart disease indicators"""
    risk_score = 0
    factors = []
    
    # Age factor (max 20 points)
    if data["age"] > 60:
        risk_score += 20
        factors.append("Age over 60")
    elif data["age"] > 50:
        risk_score += 15
        factors.append("Age over 50")
    elif data["age"] > 40:
        risk_score += 10
    
    # Sex factor (max 10 points)
    if data["sex"] == "M":
        risk_score += 10
        factors.append("Male sex")
    
    # Chest pain type (max 20 points)
    if data["chest_pain_type"] == "ASY":
        risk_score += 20
        factors.append("Asymptomatic chest pain")
    elif data["chest_pain_type"] == "ATA":
        risk_score += 10
    elif data["chest_pain_type"] == "NAP":
        risk_score += 5
    
    # Blood pressure (max 15 points)
    if data["resting_bp"] > 140:
        risk_score += 15
        factors.append("High blood pressure")
    elif data["resting_bp"] > 130:
        risk_score += 10
        factors.append("Elevated blood pressure")
    
    # Cholesterol (max 15 points)
    if data["cholesterol"] > 240:
        risk_score += 15
        factors.append("High cholesterol")
    elif data["cholesterol"] > 200:
        risk_score += 10
        factors.append("Borderline high cholesterol")
    
    # Fasting blood sugar (max 10 points)
    if data["fasting_bs"] == "1":
        risk_score += 10
        factors.append("Elevated fasting blood sugar")
    
    # Resting ECG (max 10 points)
    if data["resting_ecg"] == "LVH":
        risk_score += 10
        factors.append("Left ventricular hypertrophy")
    elif data["resting_ecg"] == "ST":
        risk_score += 5
    
    # Max heart rate (max 10 points)
    if data["max_hr"] < 120:
        risk_score += 10
        factors.append("Low maximum heart rate")
    elif data["max_hr"] < 140:
        risk_score += 5
    
    # Exercise angina (max 15 points)
    if data["exercise_angina"] == "Y":
        risk_score += 15
        factors.append("Exercise-induced angina")
    
    # Oldpeak (max 15 points)
    if data["oldpeak"] > 2:
        risk_score += 15
        factors.append("Significant ST depression")
    elif data["oldpeak"] > 1:
        risk_score += 10
    elif data["oldpeak"] > 0:
        risk_score += 5
    
    # ST slope (max 15 points)
    if data["st_slope"] == "Flat":
        risk_score += 15
        factors.append("Flat ST slope")
    elif data["st_slope"] == "Down":
        risk_score += 10
        factors.append("Downsloping ST segment")
    
    # Cap at 100
    risk_score = min(risk_score, 100)
    
    # Determine risk level
    if risk_score < 30:
        risk_level = "Low"
    elif risk_score < 60:
        risk_level = "Moderate"
    else:
        risk_level = "High"
    
    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "factors": factors
    }

def generate_recommendations(risk_score: int, risk_level: str, factors: List[str]) -> str:
    """Generate AI-powered recommendations based on risk assessment"""
    recommendations = []
    
    # Base recommendations by risk level
    if risk_level == "Low":
        recommendations.append("## Excellent! Your cardiovascular health looks good 🎉")
        recommendations.append("### Keep up the great work:")
        recommendations.append("- Maintain regular exercise (150 minutes/week)")
        recommendations.append("- Continue a balanced diet rich in fruits and vegetables")
        recommendations.append("- Keep regular health check-ups")
        recommendations.append("- Stay hydrated and get adequate sleep")
    elif risk_level == "Moderate":
        recommendations.append("## Moderate Risk - Lifestyle Improvements Needed ⚠️")
        recommendations.append("### Consider these lifestyle changes:")
        recommendations.append("- Increase physical activity to at least 30 minutes daily")
        recommendations.append("- Reduce sodium intake to less than 2,300mg/day")
        recommendations.append("- Incorporate heart-healthy foods (omega-3 fatty acids)")
        recommendations.append("- Monitor blood pressure regularly")
        recommendations.append("- Consider stress management techniques")
    else:
        recommendations.append("## High Risk - Immediate Action Required 🚨")
        recommendations.append("### Urgent recommendations:")
        recommendations.append("- **Schedule an appointment with a cardiologist immediately**")
        recommendations.append("- Implement comprehensive lifestyle changes")
        recommendations.append("- Monitor all vital signs regularly")
        recommendations.append("- Consider medication under medical supervision")
        recommendations.append("- Adopt a strict heart-healthy diet")
    
    # Factor-specific recommendations
    for factor in factors:
        if "blood pressure" in factor.lower():
            recommendations.append("### Blood Pressure Management:")
            recommendations.append("- Limit alcohol consumption")
            recommendations.append("- Practice relaxation techniques")
            recommendations.append("- Monitor BP daily")
        elif "cholesterol" in factor.lower():
            recommendations.append("### Cholesterol Control:")
            recommendations.append("- Reduce saturated and trans fats")
            recommendations.append("- Increase fiber intake")
            recommendations.append("- Consider plant stanols/sterols")
        elif "exercise" in factor.lower():
            recommendations.append("### Exercise Guidelines:")
            recommendations.append("- Start with low-impact activities")
            recommendations.append("- Consult physician before intense exercise")
            recommendations.append("- Monitor heart rate during activity")
        elif "blood sugar" in factor.lower():
            recommendations.append("### Blood Sugar Management:")
            recommendations.append("- Monitor carbohydrate intake")
            recommendations.append("- Consider diabetes screening")
            recommendations.append("- Maintain healthy weight")
    
    recommendations.append("### General Heart Health Tips:")
    recommendations.append("- Don't smoke or use tobacco")
    recommendations.append("- Limit processed foods")
    recommendations.append("- Maintain healthy weight")
    recommendations.append("- Manage stress effectively")
    recommendations.append("- Get adequate sleep (7-9 hours)")
    
    return "\n\n".join(recommendations)

# API Routes

@app.get("/")
async def root():
    return {"message": "HeartCareAI API is running", "version": "2.0.0"}

@app.post("/auth/signup", response_model=TokenResponse)
async def signup(user_create: UserCreate, db: Session = Depends(get_db)):
    # Check if user exists
    existing_user = db.query(User).filter(User.email == user_create.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    existing_username = db.query(User).filter(User.username == user_create.username).first()
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Create new user
    hashed_password = get_password_hash(user_create.password)
    db_user = User(
        email=user_create.email,
        username=user_create.username,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(db_user.id)}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse.from_orm(db_user)
    }

@app.post("/auth/login", response_model=TokenResponse)
async def login(login_request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_request.email).first()
    if not user or not verify_password(login_request.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": UserResponse.from_orm(user)
    }

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return UserResponse.from_orm(current_user)

@app.post("/assessment", response_model=AssessmentResponse)
async def create_assessment(
    assessment_request: AssessmentRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Convert assessment data to dict
        data = assessment_request.dict()
        data["resting_bp"] = assessment_request.resting_bp
        data["chest_pain_type"] = assessment_request.chest_pain_type
        data["max_hr"] = assessment_request.max_hr
        data["fasting_bs"] = assessment_request.fasting_bs
        data["resting_ecg"] = assessment_request.resting_ecg
        data["exercise_angina"] = assessment_request.exercise_angina
        data["st_slope"] = assessment_request.st_slope
        
        # Predict risk
        prediction = predict_risk(data)
        
        # Generate recommendations
        recommendations = generate_recommendations(
            prediction["risk_score"],
            prediction["risk_level"],
            prediction["factors"]
        )
        
        # Save to database
        db_assessment = Assessment(
            user_id=current_user.id,
            age=assessment_request.age,
            sex=assessment_request.sex,
            chest_pain_type=assessment_request.chest_pain_type,
            resting_bp=assessment_request.resting_bp,
            cholesterol=assessment_request.cholesterol,
            fasting_bs=assessment_request.fasting_bs,
            resting_ecg=assessment_request.resting_ecg,
            max_hr=assessment_request.max_hr,
            exercise_angina=assessment_request.exercise_angina,
            oldpeak=assessment_request.oldpeak,
            st_slope=assessment_request.st_slope,
            risk_score=prediction["risk_score"],
            risk_level=prediction["risk_level"],
            factors=str(prediction["factors"]),  # Store as JSON string
            recommendations=recommendations
        )
        
        db.add(db_assessment)
        db.commit()
        db.refresh(db_assessment)
        
        return AssessmentResponse.from_orm(db_assessment)
        
    except Exception as e:
        logger.error(f"Assessment creation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/assessment/history", response_model=List[AssessmentListResponse])
async def get_assessment_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    assessments = db.query(Assessment).filter(
        Assessment.user_id == current_user.id
    ).order_by(Assessment.created_at.desc()).all()
    
    # Parse factors from JSON string
    formatted_assessments = []
    for assessment in assessments:
        assessment_dict = AssessmentListResponse.from_orm(assessment).dict()
        try:
            # Parse factors from string representation
            factors_str = assessment.factors
            if factors_str:
                import ast
                factors_list = ast.literal_eval(factors_str)
                assessment_dict["factors"] = factors_list
            else:
                assessment_dict["factors"] = []
        except:
            assessment_dict["factors"] = []
        
        formatted_assessments.append(AssessmentListResponse(**assessment_dict))
    
    return formatted_assessments

@app.delete("/assessment/{assessment_id}")
async def delete_assessment(
    assessment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    assessment = db.query(Assessment).filter(
        Assessment.id == assessment_id,
        Assessment.user_id == current_user.id
    ).first()
    
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    db.delete(assessment)
    db.commit()
    
    return {"message": "Assessment deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)