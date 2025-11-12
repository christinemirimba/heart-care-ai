// Recommendations page functionality

// Check if user is authenticated
if (!Auth.requireAuth()) {
    // Redirect handled in requireAuth
}

const loadingState = document.getElementById('loadingState');
const recommendationsContent = document.getElementById('recommendationsContent');

// Get assessment ID from URL or session
const urlParams = new URLSearchParams(window.location.search);
const assessmentId = urlParams.get('id') || sessionStorage.getItem('currentAssessmentId');

if (!assessmentId) {
    HeartCareAI.showAlert('No assessment found. Please complete an assessment first.', 'error');
    setTimeout(() => {
        window.location.href = 'assessment.html';
    }, 2000);
} else {
    loadRecommendations(assessmentId);
}

async function loadRecommendations(assessmentId) {
    try {
        const data = await API.getRecommendations(assessmentId);
        displayRecommendations(data);
    } catch (error) {
        console.error('Error loading recommendations:', error);
        
        // Show fallback recommendations if API fails
        displayFallbackRecommendations();
    }
}

function displayRecommendations(data) {
    loadingState.style.display = 'none';
    recommendationsContent.style.display = 'block';

    // Update risk badge
    const riskBadge = document.getElementById('riskBadge');
    const riskLevel = data.riskLevel || 'Low Risk';
    riskBadge.textContent = riskLevel;
    riskBadge.className = `risk-badge ${riskLevel.toLowerCase().split(' ')[0]}`;

    // Update risk summary
    const riskSummary = document.getElementById('riskSummary');
    riskSummary.textContent = data.summary || 'Your assessment indicates a need for lifestyle modifications to improve cardiovascular health.';

    // Populate recommendations
    if (data.lifestyle) {
        populateCategory('lifestyleRecommendations', data.lifestyle);
    }
    if (data.nutrition) {
        populateCategory('nutritionRecommendations', data.nutrition);
    }
    if (data.exercise) {
        populateCategory('exerciseRecommendations', data.exercise);
    }
    if (data.medical) {
        populateCategory('medicalRecommendations', data.medical);
    }

    // Populate action plan
    if (data.actionPlan) {
        populateActionPlan(data.actionPlan);
    }
}

function displayFallbackRecommendations() {
    loadingState.style.display = 'none';
    recommendationsContent.style.display = 'block';

    const fallbackData = {
        riskLevel: 'Medium Risk',
        summary: 'Based on your assessment, we recommend focusing on lifestyle modifications and regular health monitoring.',
        lifestyle: [
            { priority: 'high', text: 'Quit smoking or avoid exposure to secondhand smoke' },
            { priority: 'high', text: 'Manage stress through meditation, yoga, or counseling' },
            { priority: 'medium', text: 'Maintain healthy sleep patterns (7-9 hours per night)' }
        ],
        nutrition: [
            { priority: 'high', text: 'Follow a heart-healthy diet rich in fruits, vegetables, and whole grains' },
            { priority: 'high', text: 'Limit sodium intake to less than 2,300mg per day' },
            { priority: 'medium', text: 'Reduce saturated fats and avoid trans fats' }
        ],
        exercise: [
            { priority: 'high', text: 'Aim for 150 minutes of moderate aerobic activity per week' },
            { priority: 'medium', text: 'Include strength training exercises twice a week' },
            { priority: 'low', text: 'Take regular breaks from sitting every hour' }
        ],
        medical: [
            { priority: 'high', text: 'Schedule regular check-ups with your healthcare provider' },
            { priority: 'medium', text: 'Monitor blood pressure and cholesterol levels regularly' },
            { priority: 'medium', text: 'Discuss medication options if lifestyle changes are insufficient' }
        ],
        actionPlan: [
            { week: 1, actions: 'Start tracking daily food intake and physical activity. Schedule doctor appointment.' },
            { week: 2, actions: 'Begin 30-minute walks 3 times per week. Reduce sodium in diet.' },
            { week: 3, actions: 'Increase exercise to 5 times per week. Implement stress management techniques.' },
            { week: 4, actions: 'Review progress. Adjust plan based on results. Schedule follow-up assessment.' }
        ]
    };

    displayRecommendations(fallbackData);
}

function populateCategory(elementId, recommendations) {
    const container = document.getElementById(elementId);
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            ${rec.priority ? `<div class="recommendation-priority ${rec.priority}">${rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority</div>` : ''}
            <p>${rec.text || rec}</p>
        </div>
    `).join('');
}

function populateActionPlan(actionPlan) {
    const timeline = document.getElementById('actionPlan');
    timeline.innerHTML = actionPlan.map((item, index) => `
        <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h4>Week ${item.week || index + 1}</h4>
                <p>${item.actions || item}</p>
            </div>
        </div>
    `).join('');
}
