// Assessment page functionality

// Check if user is authenticated
if (!Auth.requireAuth()) {
    // Redirect handled in requireAuth
}

const assessmentForm = document.getElementById('assessmentForm');
const submitBtn = document.getElementById('submitBtn');
const resultsSection = document.getElementById('resultsSection');

let currentAssessmentId = null;

assessmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(assessmentForm);
    const assessmentData = {
        age: parseInt(formData.get('age')),
        gender: formData.get('gender'),
        restingBP: parseInt(formData.get('restingBP')),
        cholesterol: parseInt(formData.get('cholesterol')),
        fastingBS: parseInt(formData.get('fastingBS')),
        maxHR: parseInt(formData.get('maxHR')),
        chestPain: formData.get('chestPain'),
        restingECG: formData.get('restingECG'),
        exerciseAngina: formData.get('exerciseAngina') === 'on',
        smoking: formData.get('smoking'),
        exercise: formData.get('exercise')
    };

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> Analyzing...';

    try {
        // Submit assessment to API
        const response = await API.submitAssessment(assessmentData);
        
        // Store assessment ID
        currentAssessmentId = response.id || response.assessmentId;
        
        // Store in session for recommendations page
        if (currentAssessmentId) {
            sessionStorage.setItem('currentAssessmentId', currentAssessmentId);
        }

        // Display results
        displayResults(response);
        
        // Scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        HeartCareAI.showAlert('Assessment completed successfully!', 'success');
    } catch (error) {
        console.error('Assessment error:', error);
        HeartCareAI.showAlert(error.message || 'Failed to submit assessment. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Analyze Risk';
    }
});

function displayResults(data) {
    resultsSection.style.display = 'block';

    // Calculate risk percentage (0-100)
    const riskPercentage = data.riskScore || calculateRiskPercentage(data);
    
    // Update risk score circle
    const riskScoreCircle = document.getElementById('riskScoreCircle');
    const riskPercentageEl = document.getElementById('riskPercentage');
    const riskLevelEl = document.getElementById('riskLevel');
    
    riskScoreCircle.style.setProperty('--risk-percentage', riskPercentage);
    riskPercentageEl.textContent = `${Math.round(riskPercentage)}%`;
    
    // Determine risk level
    let riskLevel = 'Low Risk';
    let riskClass = 'low';
    
    if (riskPercentage >= 70) {
        riskLevel = 'High Risk';
        riskClass = 'high';
    } else if (riskPercentage >= 40) {
        riskLevel = 'Medium Risk';
        riskClass = 'medium';
    }
    
    riskLevelEl.textContent = riskLevel;
    riskLevelEl.className = `risk-level ${riskClass}`;

    // Display details
    const resultsDetails = document.getElementById('resultsDetails');
    resultsDetails.innerHTML = `
        <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Key Findings</h3>
        <ul style="list-style: none; padding: 0;">
            ${data.findings ? data.findings.map(finding => `
                <li style="padding: 0.75rem 0; border-bottom: 1px solid var(--border-color);">
                    <strong>${finding.title}:</strong> ${finding.description}
                </li>
            `).join('') : `
                <li style="padding: 0.75rem 0;">
                    Your assessment has been analyzed. Click below to view personalized recommendations.
                </li>
            `}
        </ul>
    `;

    // Update recommendations link
    if (currentAssessmentId) {
        const viewRecommendationsBtn = document.getElementById('viewRecommendationsBtn');
        viewRecommendationsBtn.href = `recommendations.html?id=${currentAssessmentId}`;
    }
}

function calculateRiskPercentage(data) {
    // Simple risk calculation algorithm
    let risk = 0;
    
    // Age factor
    if (data.age) {
        if (data.age > 65) risk += 20;
        else if (data.age > 50) risk += 15;
        else if (data.age > 40) risk += 10;
    }
    
    // Blood pressure
    if (data.restingBP) {
        if (data.restingBP > 140) risk += 15;
        else if (data.restingBP > 130) risk += 10;
    }
    
    // Cholesterol
    if (data.cholesterol) {
        if (data.cholesterol > 240) risk += 15;
        else if (data.cholesterol > 200) risk += 10;
    }
    
    // Blood sugar
    if (data.fastingBS) {
        if (data.fastingBS > 125) risk += 15;
        else if (data.fastingBS > 100) risk += 10;
    }
    
    // Lifestyle factors
    if (data.smoking === 'current') risk += 20;
    else if (data.smoking === 'former') risk += 10;
    
    if (data.exercise === 'none') risk += 15;
    else if (data.exercise === '1-2') risk += 5;
    
    if (data.exerciseAngina) risk += 10;
    
    return Math.min(risk, 100);
}
