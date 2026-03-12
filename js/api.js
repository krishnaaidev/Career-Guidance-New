// ========================================
// Career Guidance System - API Service
// Developed by: Suman Krishna & Shivam Kumar Chaubey
// CT Institute of Engineering, Management and Technology
// ========================================

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'
    : 'https://your-api-url.com/api'; // Replace with your deployed API URL

const ApiService = {
    // Health check
    async checkHealth() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.log('API health check failed, using mock data');
            return null;
        }
    },

    // Get career recommendations
    async getRecommendations(skills, topN = 5) {
        try {
            const response = await fetch(`${API_BASE_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    skills: skills,
                    top_n: topN
                }),
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API call failed:', error);
            // Return mock data structure for offline mode
            return {
                success: false,
                recommendations: [],
                error: error.message
            };
        }
    },

    // Get all job roles
    async getAllJobRoles() {
        try {
            const response = await fetch(`${API_BASE_URL}/job-roles`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors'
            });
            
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch job roles:', error);
            return { success: false, job_roles: [] };
        }
    },

    // Get job details
    async getJobDetails(jobRole) {
        try {
            const response = await fetch(`${API_BASE_URL}/job-details/${encodeURIComponent(jobRole)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors'
            });
            
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch job details:', error);
            return { success: false };
        }
    }
};

// Export for use in main.js
window.ApiService = ApiService;