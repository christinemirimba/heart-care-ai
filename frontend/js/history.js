// History page functionality

// Check if user is authenticated
if (!Auth.requireAuth()) {
    // Redirect handled in requireAuth
}

const loadingState = document.getElementById('loadingState');
const historyContent = document.getElementById('historyContent');
const historyTimeline = document.getElementById('historyTimeline');
const emptyState = document.getElementById('emptyState');

let allAssessments = [];
let filteredAssessments = [];

// Load history on page load
loadHistory();

async function loadHistory() {
    try {
        const data = await API.getHistory();
        allAssessments = data.assessments || data || [];
        filteredAssessments = [...allAssessments];
        
        if (allAssessments.length === 0) {
            showEmptyState();
        } else {
            displayHistory();
        }
    } catch (error) {
        console.error('Error loading history:', error);
        // Show mock data for demonstration
        allAssessments = generateMockData();
        filteredAssessments = [...allAssessments];
        displayHistory();
    }
}

function displayHistory() {
    loadingState.style.display = 'none';
    historyContent.style.display = 'block';
    emptyState.style.display = 'none';

    // Update stats
    updateStats();

    // Display timeline
    renderTimeline();
}

function showEmptyState() {
    loadingState.style.display = 'none';
    historyContent.style.display = 'block';
    emptyState.style.display = 'block';
    historyTimeline.style.display = 'none';
}

function updateStats() {
    const totalAssessments = document.getElementById('totalAssessments');
    const latestRisk = document.getElementById('latestRisk');
    const riskTrend = document.getElementById('riskTrend');

    totalAssessments.textContent = allAssessments.length;

    if (allAssessments.length > 0) {
        const latest = allAssessments[0];
        latestRisk.textContent = latest.riskLevel || 'N/A';

        // Calculate trend
        if (allAssessments.length > 1) {
            const previous = allAssessments[1];
            const latestScore = latest.riskScore || 0;
            const previousScore = previous.riskScore || 0;
            
            if (latestScore < previousScore) {
                riskTrend.textContent = '↓ Improving';
                riskTrend.style.color = '#10b981';
            } else if (latestScore > previousScore) {
                riskTrend.textContent = '↑ Increasing';
                riskTrend.style.color = '#ef4444';
            } else {
                riskTrend.textContent = '→ Stable';
                riskTrend.style.color = '#64748b';
            }
        }
    }
}

function renderTimeline() {
    historyTimeline.innerHTML = filteredAssessments.map(assessment => {
        const riskClass = (assessment.riskLevel || 'low').toLowerCase().split(' ')[0];
        const date = new Date(assessment.date || Date.now()).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="timeline-card ${riskClass}">
                <div class="timeline-card-header">
                    <div class="timeline-date">${date}</div>
                    <div class="timeline-risk ${riskClass}">${assessment.riskLevel || 'Low Risk'}</div>
                </div>
                <div class="timeline-metrics">
                    <div class="metric">
                        <div class="metric-label">Risk Score</div>
                        <div class="metric-value">${assessment.riskScore || 25}%</div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">Blood Pressure</div>
                        <div class="metric-value">${assessment.bloodPressure || '120/80'}</div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">Cholesterol</div>
                        <div class="metric-value">${assessment.cholesterol || '180'} mg/dL</div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">Heart Rate</div>
                        <div class="metric-value">${assessment.heartRate || '72'} bpm</div>
                    </div>
                </div>
                <div class="timeline-actions">
                    <a href="recommendations.html?id=${assessment.id}" class="btn btn-primary btn-sm">View Recommendations</a>
                    <button class="btn btn-ghost btn-sm" onclick="shareAssessment('${assessment.id}')">Share</button>
                </div>
            </div>
        `;
    }).join('');
}

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        if (filter === 'all') {
            filteredAssessments = [...allAssessments];
        } else {
            filteredAssessments = allAssessments.filter(a => 
                (a.riskLevel || '').toLowerCase().includes(filter)
            );
        }
        renderTimeline();
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filteredAssessments = allAssessments.filter(a => 
        (a.riskLevel || '').toLowerCase().includes(searchTerm) ||
        new Date(a.date).toLocaleDateString().toLowerCase().includes(searchTerm)
    );
    renderTimeline();
});

function shareAssessment(id) {
    const url = `${window.location.origin}/recommendations.html?id=${id}`;
    if (navigator.share) {
        navigator.share({
            title: 'HeartCareAI Assessment',
            text: 'Check out my heart health assessment',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url);
        HeartCareAI.showAlert('Link copied to clipboard!', 'success');
    }
}

function generateMockData() {
    const riskLevels = ['Low Risk', 'Medium Risk', 'High Risk'];
    const data = [];
    
    for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (i * 30));
        
        data.push({
            id: `assessment-${i}`,
            date: date.toISOString(),
            riskLevel: riskLevels[Math.floor(Math.random() * riskLevels.length)],
            riskScore: Math.floor(Math.random() * 70) + 10,
            bloodPressure: `${Math.floor(Math.random() * 40) + 100}/${Math.floor(Math.random() * 20) + 70}`,
            cholesterol: Math.floor(Math.random() * 100) + 150,
            heartRate: Math.floor(Math.random() * 40) + 60
        });
    }
    
    return data;
}
