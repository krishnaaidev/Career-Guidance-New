// ========================================
// Pixel2Predict - Career Guidance System
// Developed by: Suman Krishna & Shivam Kumar Chaubey
// CT Institute of Engineering, Management and Technology
// ========================================

// Global Variables
let currentRecommendations = [];
let currentPage = 1;
let itemsPerPage = 5;
let viewMode = 'grid';
let totalPages = 1;

// Comprehensive Job Skills Database
const jobDatabase = [
    {
        job_role: "Data Scientist",
        required_skills: ["python", "r", "sql", "machine learning", "statistics", "data visualization", "pandas", "numpy", "scikit-learn", "deep learning", "big data", "hadoop", "spark", "data mining", "communication"],
        confidence: 98
    },
    {
        job_role: "Machine Learning Engineer",
        required_skills: ["python", "tensorflow", "pytorch", "machine learning", "deep learning", "nlp", "computer vision", "data structures", "algorithms", "statistics", "probability", "linear algebra", "calculus", "model deployment", "apis"],
        confidence: 97
    },
    {
        job_role: "Software Developer",
        required_skills: ["java", "python", "c++", "javascript", "data structures", "algorithms", "git", "sql", "problem solving", "oop", "debugging", "unit testing", "agile", "communication", "teamwork"],
        confidence: 95
    },
    {
        job_role: "Data Analyst",
        required_skills: ["sql", "excel", "python", "r", "tableau", "power bi", "data visualization", "statistics", "data cleaning", "data wrangling", "communication", "critical thinking", "reporting", "presentation"],
        confidence: 96
    },
    {
        job_role: "AI Engineer",
        required_skills: ["python", "tensorflow", "pytorch", "keras", "machine learning", "deep learning", "neural networks", "nlp", "computer vision", "reinforcement learning", "data structures", "algorithms", "probability"],
        confidence: 97
    },
    {
        job_role: "Backend Developer",
        required_skills: ["python", "java", "node.js", "sql", "mongodb", "apis", "rest", "graphql", "git", "docker", "linux", "data structures", "algorithms", "system design", "debugging"],
        confidence: 94
    },
    {
        job_role: "Frontend Developer",
        required_skills: ["html", "css", "javascript", "react", "angular", "vue", "typescript", "responsive design", "git", "webpack", "ui/ux", "cross-browser compatibility", "debugging", "teamwork"],
        confidence: 93
    },
    {
        job_role: "Full Stack Developer",
        required_skills: ["html", "css", "javascript", "react", "node.js", "python", "sql", "mongodb", "git", "rest apis", "docker", "aws", "data structures", "algorithms", "problem solving"],
        confidence: 94
    },
    {
        job_role: "DevOps Engineer",
        required_skills: ["linux", "python", "bash", "docker", "kubernetes", "jenkins", "git", "aws", "azure", "ci/cd", "terraform", "ansible", "monitoring", "networking", "security"],
        confidence: 92
    },
    {
        job_role: "Cloud Architect",
        required_skills: ["aws", "azure", "gcp", "docker", "kubernetes", "terraform", "networking", "security", "python", "linux", "system design", "microservices", "devops", "cost optimization"],
        confidence: 91
    },
    {
        job_role: "Cybersecurity Analyst",
        required_skills: ["networking", "linux", "python", "security", "firewalls", "ids/ips", "vulnerability assessment", "penetration testing", "incident response", "risk management", "cryptography", "siem"],
        confidence: 90
    },
    {
        job_role: "Mobile Developer",
        required_skills: ["java", "kotlin", "swift", "android", "ios", "flutter", "react native", "mobile ui", "git", "rest apis", "firebase", "sqlite", "problem solving", "debugging"],
        confidence: 89
    },
    {
        job_role: "Database Administrator",
        required_skills: ["sql", "mysql", "postgresql", "mongodb", "oracle", "database design", "performance tuning", "backup recovery", "security", "linux", "python", "automation", "monitoring"],
        confidence: 88
    },
    {
        job_role: "Network Engineer",
        required_skills: ["networking", "tcp/ip", "routing", "switching", "firewalls", "vpn", "linux", "python", "cisco", "network security", "troubleshooting", "monitoring", "documentation"],
        confidence: 87
    },
    {
        job_role: "QA Tester",
        required_skills: ["manual testing", "automation testing", "selenium", "java", "python", "test cases", "bug tracking", "jira", "sql", "agile", "attention to detail", "communication", "critical thinking"],
        confidence: 86
    },
    {
        job_role: "Business Analyst",
        required_skills: ["sql", "excel", "data analysis", "requirements gathering", "documentation", "communication", "stakeholder management", "critical thinking", "problem solving", "agile", "visio", "presentation"],
        confidence: 85
    },
    {
        job_role: "Project Manager",
        required_skills: ["project management", "agile", "scrum", "leadership", "communication", "risk management", "budgeting", "scheduling", "team management", "stakeholder management", "jira", "microsoft project"],
        confidence: 84
    },
    {
        job_role: "Product Manager",
        required_skills: ["product strategy", "market research", "user research", "analytics", "communication", "leadership", "agile", "roadmap planning", "stakeholder management", "prioritization", "problem solving"],
        confidence: 83
    },
    {
        job_role: "UX Designer",
        required_skills: ["ui/ux", "user research", "wireframing", "prototyping", "figma", "adobe xd", "sketch", "usability testing", "interaction design", "information architecture", "visual design", "communication"],
        confidence: 88
    },
    {
        job_role: "Technical Writer",
        required_skills: ["technical writing", "documentation", "communication", "writing", "editing", "api documentation", "markdown", "git", "research", "attention to detail", "organization", "time management"],
        confidence: 82
    }
];

// Skill Tags Data
const popularSkills = [
    'python', 'java', 'javascript', 'html', 'css', 'sql', 'mongodb',
    'react', 'node.js', 'machine learning', 'deep learning', 'tensorflow',
    'pytorch', 'data analysis', 'statistics', 'excel', 'tableau', 'power bi',
    'git', 'docker', 'kubernetes', 'aws', 'azure', 'linux', 'networking',
    'security', 'android', 'ios', 'flutter', 'communication', 'teamwork',
    'problem solving', 'critical thinking', 'agile', 'scrum', 'jira',
    'c++', 'c#', 'php', 'ruby', 'swift', 'kotlin', 'rust', 'go',
    'data structures', 'algorithms', 'oop', 'rest apis', 'graphql',
    'firebase', 'mysql', 'postgresql', 'redis', 'elasticsearch',
    'nginx', 'apache', 'jenkins', 'terraform', 'ansible', 'prometheus',
    'grafana', 'splunk', 'hadoop', 'spark', 'kafka', 'airflow'
];

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    initializeSkillTags();
    initializeEventListeners();
    updateStats();
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    // Initialize Typed.js
    if (typeof Typed !== 'undefined') {
        new Typed('.typing', {
            strings: ['Career Path', 'Job Role', 'Future', 'Dream Job'],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }
    
    // Initialize Particles
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('Particles loaded');
        });
    }
});

// Initialize Skill Tags
function initializeSkillTags() {
    const tagsContainer = document.getElementById('skillTags');
    if (!tagsContainer) return;

    const displaySkills = popularSkills.slice(0, 20);
    
    tagsContainer.innerHTML = displaySkills.map(skill => 
        `<span class="skill-tag" onclick="addSkill('${skill}')">
            <i class="fas fa-plus"></i> ${skill}
        </span>`
    ).join('');
}

// Initialize Event Listeners
function initializeEventListeners() {
    const skillsInput = document.getElementById('skillsInput');
    if (skillsInput) {
        skillsInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                analyzeSkills();
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', scrollToTop);
    }

    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    // Form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
}

// Handle Scroll
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    if (window.scrollY > 300) {
        backToTop?.classList.add('show');
    } else {
        backToTop?.classList.remove('show');
    }

    updateActiveNavLink();
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Toggle Mobile Navigation
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    const navToggle = document.getElementById('navToggle');
    
    navLinks?.classList.toggle('show');
    navToggle?.classList.toggle('active');
}

// Smooth Scroll
function smoothScroll(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        document.querySelector('.nav-links')?.classList.remove('show');
        document.getElementById('navToggle')?.classList.remove('active');
    }
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Update Stats
function updateStats() {
    const totalJobs = document.getElementById('totalJobs');
    const totalSkills = document.getElementById('totalSkills');
    
    if (totalJobs) totalJobs.textContent = jobDatabase.length + '+';
    if (totalSkills) totalSkills.textContent = popularSkills.length + '+';
}

// Add Skill from Tag
function addSkill(skill) {
    const input = document.getElementById('skillsInput');
    if (!input) return;

    const currentSkills = input.value.trim();
    const skills = currentSkills ? currentSkills.split(',').map(s => s.trim().toLowerCase()) : [];
    
    if (!skills.includes(skill.toLowerCase())) {
        skills.push(skill);
        input.value = skills.join(', ');
    }
    
    input.focus();
    showNotification(`Added: ${skill}`, 'success');
}

// Calculate Match Percentage - FIXED: Prevents "r" from matching with "learning"
function calculateMatch(userSkills, requiredSkills) {
    if (!userSkills.length || !requiredSkills.length) return 0;
    
    const userSet = new Set(userSkills.map(s => s.toLowerCase().trim()));
    let matchCount = 0;
    
    requiredSkills.forEach(reqSkill => {
        const reqSkillLower = reqSkill.toLowerCase().trim();
        
        // Check for exact matches first
        for (const userSkill of userSet) {
            // Exact match
            if (userSkill === reqSkillLower) {
                matchCount++;
                break;
            }
            
            // Handle multi-word skills (e.g., "machine learning")
            if (reqSkillLower.includes(' ') && userSkill.includes(' ')) {
                if (userSkill === reqSkillLower) {
                    matchCount++;
                    break;
                }
            }
            
            // Handle cases where user skill is part of required skill
            // But prevent single letters from matching (like 'r' matching with 'learning')
            if (reqSkillLower.includes(userSkill) && userSkill.length > 2) {
                // Only count if it's a significant part (more than 2 chars)
                // And ensure it's a word boundary match
                const words = reqSkillLower.split(' ');
                if (words.some(word => word === userSkill)) {
                    matchCount++;
                    break;
                }
            }
            
            // Handle cases where required skill is part of user skill
            if (userSkill.includes(reqSkillLower) && reqSkillLower.length > 2) {
                const userWords = userSkill.split(' ');
                if (userWords.some(word => word === reqSkillLower)) {
                    matchCount++;
                    break;
                }
            }
        }
    });
    
    return Math.round((matchCount / requiredSkills.length) * 100);
}

// Analyze Skills
async function analyzeSkills() {
    const skillsInput = document.getElementById('skillsInput');
    const skills = skillsInput?.value.trim();
    const topN = document.getElementById('topN')?.value || '5';

    if (!skills) {
        showNotification('Please enter your skills', 'warning');
        skillsInput?.focus();
        return;
    }

    if (skills.length < 3) {
        showNotification('Please enter at least 3 characters', 'warning');
        skillsInput?.focus();
        return;
    }

    toggleSections(true);

    try {
        // Parse user skills - clean and filter
        const userSkills = skills.split(',')
            .map(s => s.trim().toLowerCase())
            .filter(s => s.length > 1); // Filter out single characters like 'r'
        
        const recommendations = jobDatabase.map(job => {
            const matchPercentage = calculateMatch(userSkills, job.required_skills);
            
            const matchingSkills = job.required_skills.filter(reqSkill => {
                const reqLower = reqSkill.toLowerCase();
                return userSkills.some(userSkill => {
                    // Exact match
                    if (userSkill === reqLower) return true;
                    
                    // Multi-word match
                    if (reqLower.includes(' ') && userSkill.includes(' ')) {
                        return userSkill === reqLower;
                    }
                    
                    // Word boundary match (prevent 'r' matching with 'learning')
                    if (reqLower.includes(userSkill) && userSkill.length > 2) {
                        const words = reqLower.split(' ');
                        return words.some(word => word === userSkill);
                    }
                    
                    return false;
                });
            });
            
            const skillsToLearn = job.required_skills.filter(reqSkill => 
                !matchingSkills.includes(reqSkill)
            );
            
            return {
                job_role: job.job_role,
                confidence: job.confidence,
                match_percentage: matchPercentage,
                matching_skills: matchingSkills,
                skills_to_learn: skillsToLearn,
                total_required_skills: job.required_skills.length,
                total_matching: matchingSkills.length
            };
        });
        
        const sortedRecs = recommendations
            .filter(rec => rec.match_percentage > 10)
            .sort((a, b) => b.match_percentage - a.match_percentage);
        
        const limit = topN === '0' ? sortedRecs.length : Math.min(parseInt(topN), sortedRecs.length);
        currentRecommendations = sortedRecs.slice(0, limit);
        
        if (currentRecommendations.length > 0) {
            displayResults(currentRecommendations, skills);
            showNotification(`Found ${currentRecommendations.length} career matches!`, 'success');
        } else {
            showNotification('No matches found. Try different skills.', 'warning');
            toggleSections(false);
        }
        
    } catch (error) {
        console.error('Analysis failed:', error);
        showNotification('Error analyzing skills', 'error');
        toggleSections(false);
    }
}

// Toggle Sections
function toggleSections(loading) {
    const inputSection = document.querySelector('.input-section');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    
    if (loading) {
        if (inputSection) inputSection.style.display = 'none';
        if (loadingSection) loadingSection.style.display = 'flex';
        if (resultsSection) resultsSection.style.display = 'none';
        
        animateLoadingText();
    } else {
        if (inputSection) inputSection.style.display = 'block';
        if (loadingSection) loadingSection.style.display = 'none';
        if (resultsSection) resultsSection.style.display = 'block';
    }
}

// Animate Loading Text
function animateLoadingText() {
    const phrases = [
        'Analyzing your skills...',
        'Matching with job roles...',
        'Calculating compatibility...',
        'Pixel2Predict AI at work...',
        'Almost there...'
    ];
    
    let index = 0;
    const loadingElement = document.querySelector('.typing-loading');
    if (!loadingElement) return;
    
    const interval = setInterval(() => {
        if (index < phrases.length) {
            loadingElement.textContent = phrases[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, 800);
}

// Display Results
function displayResults(recommendations, inputSkills) {
    toggleSections(false);
    
    currentPage = 1;
    totalPages = Math.ceil(recommendations.length / itemsPerPage);
    
    updateResultsSummary(recommendations, inputSkills);
    addResultsControls();
    displayPaginatedRecommendations();
    
    document.getElementById('results')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Update Results Summary
function updateResultsSummary(recommendations, inputSkills) {
    const summary = document.getElementById('resultsSummary');
    if (!summary) return;
    
    summary.innerHTML = `
        <div class="summary-content" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
            <div>
                <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                <strong>${recommendations.length}</strong> career matches found
                <span class="recommendation-count" style="background: var(--accent-blue); color: white; padding: 3px 10px; border-radius: 20px; font-size: 0.8rem; margin-left: 10px;">
                    Page ${currentPage} of ${totalPages}
                </span>
            </div>
            <div style="color: var(--text-secondary);">
                <i class="fas fa-tag"></i> "${inputSkills.substring(0, 50)}${inputSkills.length > 50 ? '...' : ''}"
            </div>
        </div>
    `;
}

// Add Results Controls
function addResultsControls() {
    const controls = document.getElementById('resultsControls');
    if (!controls) return;
    
    controls.innerHTML = `
        <div class="view-toggle">
            <button class="view-btn ${viewMode === 'grid' ? 'active' : ''}" onclick="setViewMode('grid')">
                <i class="fas fa-th-large"></i> Grid
            </button>
            <button class="view-btn ${viewMode === 'list' ? 'active' : ''}" onclick="setViewMode('list')">
                <i class="fas fa-list"></i> List
            </button>
        </div>
        
        <div class="items-per-page">
            <select class="glass-select" onchange="changeItemsPerPage(this.value)">
                <option value="5" ${itemsPerPage === 5 ? 'selected' : ''}>5 per page</option>
                <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10 per page</option>
                <option value="15" ${itemsPerPage === 15 ? 'selected' : ''}>15 per page</option>
                <option value="20" ${itemsPerPage === 20 ? 'selected' : ''}>20 per page</option>
            </select>
        </div>
    `;
}

// Set View Mode
function setViewMode(mode) {
    viewMode = mode;
    const grid = document.getElementById('recommendationsGrid');
    if (grid) {
        grid.className = `recommendations-grid ${viewMode}-view`;
    }
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(mode)) {
            btn.classList.add('active');
        }
    });
    
    displayPaginatedRecommendations();
}

// Change Items Per Page
function changeItemsPerPage(value) {
    itemsPerPage = parseInt(value);
    currentPage = 1;
    totalPages = Math.ceil(currentRecommendations.length / itemsPerPage);
    displayPaginatedRecommendations();
    updateResultsSummary(currentRecommendations, document.getElementById('skillsInput')?.value || '');
}

// Display Paginated Recommendations
function displayPaginatedRecommendations() {
    const grid = document.getElementById('recommendationsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    grid.className = `recommendations-grid ${viewMode}-view`;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, currentRecommendations.length);
    const paginatedRecs = currentRecommendations.slice(startIndex, endIndex);
    
    paginatedRecs.forEach((rec, idx) => {
        const globalIndex = startIndex + idx;
        const card = createRecommendationCard(rec, globalIndex);
        grid.appendChild(card);
    });
    
    addPaginationControls();
}

// Create Recommendation Card with Expandable Skills
function createRecommendationCard(rec, index) {
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 50).toString());
    card.id = `rec-card-${index}`;
    
    let badgeColor = '#10b981';
    if (rec.match_percentage < 30) badgeColor = '#ef4444';
    else if (rec.match_percentage < 50) badgeColor = '#f59e0b';
    else if (rec.match_percentage < 70) badgeColor = '#f97316';
    
    const initialMatching = rec.matching_skills.slice(0, 5);
    const hiddenMatching = rec.matching_skills.slice(5);
    const hasMoreMatching = hiddenMatching.length > 0;
    
    const initialMissing = rec.skills_to_learn.slice(0, 5);
    const hiddenMissing = rec.skills_to_learn.slice(5);
    const hasMoreMissing = hiddenMissing.length > 0;
    
    card.innerHTML = `
        <div class="card-header">
            <h3>
                <i class="fas fa-briefcase" style="color: var(--accent-blue);"></i>
                ${rec.job_role}
            </h3>
            <span class="match-badge" style="background: ${badgeColor}">
                ${rec.match_percentage}% Match
            </span>
        </div>
        
        <div class="confidence-bar">
            <div class="confidence-fill" style="width: ${rec.confidence}%"></div>
        </div>
        
        <div class="skills-section">
            <h4>
                <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                Your Skills (${rec.matching_skills.length})
            </h4>
            <div class="skills-list" id="matching-skills-${index}">
                ${initialMatching.map(skill => 
                    `<span class="skill-badge matching">
                        <i class="fas fa-check"></i> ${skill}
                    </span>`
                ).join('')}
                
                ${hasMoreMatching ? `
                    <span class="hidden-skills" id="hidden-matching-${index}" style="display: none;">
                        ${hiddenMatching.map(skill => 
                            `<span class="skill-badge matching">
                                <i class="fas fa-check"></i> ${skill}
                            </span>`
                        ).join('')}
                    </span>
                    <button class="more-btn" onclick="toggleSkills(${index}, 'matching')" id="matching-more-${index}">
                        +${hiddenMatching.length} more
                    </button>
                ` : ''}
                
                ${rec.matching_skills.length === 0 ? 
                    '<p style="color: var(--text-secondary);">No direct matches</p>' : ''}
            </div>
        </div>
        
        <div class="skills-section">
            <h4>
                <i class="fas fa-graduation-cap" style="color: var(--warning-color);"></i>
                Skills to Learn (${rec.skills_to_learn.length})
            </h4>
            <div class="skills-list" id="missing-skills-${index}">
                ${initialMissing.map(skill => 
                    `<span class="skill-badge missing">
                        <i class="fas fa-plus"></i> ${skill}
                    </span>`
                ).join('')}
                
                ${hasMoreMissing ? `
                    <span class="hidden-skills" id="hidden-missing-${index}" style="display: none;">
                        ${hiddenMissing.map(skill => 
                            `<span class="skill-badge missing">
                                <i class="fas fa-plus"></i> ${skill}
                            </span>`
                        ).join('')}
                    </span>
                    <button class="more-btn" onclick="toggleSkills(${index}, 'missing')" id="missing-more-${index}">
                        +${hiddenMissing.length} more
                    </button>
                ` : ''}
            </div>
        </div>
        
        <div class="card-footer">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="tooltip" data-tooltip="AI Model Confidence">
                    <i class="fas fa-chart-line"></i> 
                    ${rec.confidence}% Confidence
                </span>
                <span class="tooltip" data-tooltip="Skills Matched / Total Required">
                    <i class="fas fa-tasks"></i> 
                    ${rec.total_matching}/${rec.total_required_skills}
                </span>
                <button class="details-btn" onclick="viewJobDetails('${rec.job_role}')" 
                        style="background: none; border: none; color: var(--accent-blue); cursor: pointer;">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Toggle Skills Visibility
function toggleSkills(index, type) {
    const hiddenDiv = document.getElementById(`hidden-${type}-${index}`);
    const moreBtn = document.getElementById(`${type}-more-${index}`);
    
    if (!hiddenDiv || !moreBtn) return;
    
    if (hiddenDiv.style.display === 'none') {
        hiddenDiv.style.display = 'inline';
        moreBtn.textContent = 'Show less';
        moreBtn.classList.add('expanded');
    } else {
        hiddenDiv.style.display = 'none';
        const count = type === 'matching' 
            ? currentRecommendations[index]?.matching_skills.length - 5
            : currentRecommendations[index]?.skills_to_learn.length - 5;
        moreBtn.textContent = `+${count} more`;
        moreBtn.classList.remove('expanded');
    }
}

// Add Pagination Controls
function addPaginationControls() {
    const existingControls = document.querySelector('.pagination-controls');
    if (existingControls) {
        existingControls.remove();
    }
    
    if (totalPages <= 1) return;
    
    const grid = document.getElementById('recommendationsGrid');
    const controls = document.createElement('div');
    controls.className = 'pagination-controls';
    
    controls.innerHTML = `
        <button class="pagination-btn" onclick="changePage('prev')" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
        
        <div class="page-info">
            Page ${currentPage} of ${totalPages}
        </div>
        
        <button class="pagination-btn" onclick="changePage('next')" ${currentPage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    grid.insertAdjacentElement('afterend', controls);
}

// Change Page
function changePage(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    
    displayPaginatedRecommendations();
    updateResultsSummary(currentRecommendations, document.getElementById('skillsInput')?.value || '');
    
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
}

// View Job Details
function viewJobDetails(jobRole) {
    const job = currentRecommendations.find(r => r.job_role === jobRole);
    if (job) {
        showJobDetailsModal(job);
    }
}

// Show Job Details Modal
function showJobDetailsModal(job) {
    const existingModal = document.querySelector('.modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="this.closest('.modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            
            <h2 style="margin-bottom: 20px; color: var(--accent-blue);">
                <i class="fas fa-briefcase"></i> ${job.job_role}
            </h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: bold; color: var(--success-color);">
                        ${job.match_percentage}%
                    </div>
                    <div style="color: var(--text-secondary);">Match Score</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 15px; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: bold; color: var(--accent-blue);">
                        ${job.confidence}%
                    </div>
                    <div style="color: var(--text-secondary);">AI Confidence</div>
                </div>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h3 style="margin-bottom: 15px; color: var(--success-color);">
                    <i class="fas fa-check-circle"></i> Your Matching Skills (${job.matching_skills.length})
                </h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; max-height: 200px; overflow-y: auto; padding: 10px;">
                    ${job.matching_skills.map(skill => 
                        `<span style="background: rgba(16,185,129,0.1); color: var(--success-color); padding: 8px 15px; border-radius: 30px; font-size: 0.95rem;">
                            <i class="fas fa-check"></i> ${skill}
                        </span>`
                    ).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h3 style="margin-bottom: 15px; color: var(--warning-color);">
                    <i class="fas fa-graduation-cap"></i> Skills to Develop (${job.skills_to_learn.length})
                </h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; max-height: 200px; overflow-y: auto; padding: 10px;">
                    ${job.skills_to_learn.map(skill => 
                        `<span style="background: rgba(245,158,11,0.1); color: var(--warning-color); padding: 8px 15px; border-radius: 30px; font-size: 0.95rem;">
                            <i class="fas fa-plus"></i> ${skill}
                        </span>`
                    ).join('')}
                </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 15px;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                    <div>
                        <div style="font-weight: bold; color: var(--text-primary);">Total Skills</div>
                        <div style="color: var(--accent-blue); font-size: 1.5rem;">${job.total_required_skills}</div>
                    </div>
                    <div>
                        <div style="font-weight: bold; color: var(--text-primary);">Matched</div>
                        <div style="color: var(--success-color); font-size: 1.5rem;">${job.total_matching}</div>
                    </div>
                    <div>
                        <div style="font-weight: bold; color: var(--text-primary);">Progress</div>
                        <div style="color: var(--warning-color); font-size: 1.5rem;">${Math.round(job.total_matching/job.total_required_skills*100)}%</div>
                    </div>
                </div>
            </div>
            
            <button onclick="this.closest('.modal').remove()" 
                    style="width: 100%; margin-top: 25px; padding: 15px; background: var(--gradient-1); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// Export Results
function exportResults(format = 'csv') {
    if (currentRecommendations.length === 0) {
        showNotification('No results to export', 'warning');
        return;
    }
    
    let content = '';
    let filename = '';
    let type = '';
    
    switch(format) {
        case 'csv':
            content = 'Job Role,Match %,Confidence %,Matching Skills,Skills to Learn,Match Ratio\n';
            currentRecommendations.forEach(rec => {
                content += `"${rec.job_role}",${rec.match_percentage},${rec.confidence},"${rec.matching_skills.join('; ')}","${rec.skills_to_learn.join('; ')}",${rec.total_matching}/${rec.total_required_skills}\n`;
            });
            filename = `Pixel2Predict-Career-${new Date().toISOString().split('T')[0]}.csv`;
            type = 'text/csv';
            break;
            
        case 'json':
            content = JSON.stringify({
                generated_by: "Pixel2Predict Career Guidance System",
                developers: ["Suman Krishna", "Shivam Kumar Chaubey"],
                institution: "CT Institute of Engineering, Management and Technology",
                accreditation: "NAAC A",
                date: new Date().toISOString(),
                recommendations: currentRecommendations
            }, null, 2);
            filename = `Pixel2Predict-Career-${new Date().toISOString().split('T')[0]}.json`;
            type = 'application/json';
            break;
            
        case 'print':
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Pixel2Predict - Career Recommendations</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; max-width: 1200px; margin: 0 auto; }
                        h1 { color: #2a7de1; text-align: center; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .institution { color: #666; font-size: 0.9rem; }
                        .date { color: #888; margin-bottom: 30px; }
                        .job { margin: 30px 0; padding: 20px; border: 1px solid #2a7de1; border-radius: 8px; }
                        .job h2 { color: #2a7de1; margin-top: 0; }
                        .match { display: inline-block; padding: 5px 15px; border-radius: 20px; font-weight: bold; }
                        .skills { margin: 15px 0; }
                        .skill { display: inline-block; margin: 3px; padding: 3px 10px; background: #f0f0f0; border-radius: 15px; font-size: 0.9rem; }
                        .footer { margin-top: 50px; text-align: center; font-size: 0.8rem; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Pixel2Predict Career Guidance System</h1>
                        <div class="institution">CT Institute of Engineering, Management and Technology | NAAC A</div>
                        <div class="date">Generated on: ${new Date().toLocaleString()}</div>
                    </div>
                    ${currentRecommendations.map(rec => `
                        <div class="job">
                            <h2>${rec.job_role}</h2>
                            <div class="match" style="background: ${rec.match_percentage > 70 ? '#4caf50' : rec.match_percentage > 40 ? '#ff9800' : '#f44336'}; color: white;">
                                ${rec.match_percentage}% Match
                            </div>
                            <p><strong>AI Confidence:</strong> ${rec.confidence}%</p>
                            <div class="skills">
                                <strong>Your Skills:</strong><br>
                                ${rec.matching_skills.map(s => `<span class="skill">${s}</span>`).join('')}
                            </div>
                            <div class="skills">
                                <strong>Skills to Learn:</strong><br>
                                ${rec.skills_to_learn.map(s => `<span class="skill">${s}</span>`).join('')}
                            </div>
                            <p><strong>Progress:</strong> ${rec.total_matching}/${rec.total_required_skills} skills (${Math.round(rec.total_matching/rec.total_required_skills*100)}%)</p>
                        </div>
                    `).join('')}
                    <div class="footer">
                        <p>Developed by Suman Krishna & Shivam Kumar Chaubey</p>
                        <p>CT Institute of Engineering, Management and Technology | NAAC A Accredited</p>
                        <p>© 2026 Pixel2Predict. All rights reserved.</p>
                    </div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
            return;
    }
    
    const blob = new Blob([content], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification(`Exported ${currentRecommendations.length} recommendations!`, 'success');
}

// Reset Search
function resetSearch() {
    const input = document.getElementById('skillsInput');
    if (input) input.value = '';
    
    document.getElementById('results').style.display = 'none';
    document.querySelector('.input-section').style.display = 'block';
    
    document.getElementById('resultsControls').innerHTML = '';
    document.querySelector('.pagination-controls')?.remove();
    
    currentRecommendations = [];
    currentPage = 1;
    
    document.querySelector('.input-section')?.scrollIntoView({ behavior: 'smooth' });
    
    showNotification('Ready for new search!', 'info');
}

// Handle Contact Form Submit
function handleContactSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } else {
            showNotification('Error sending message. Please try again.', 'error');
        }
    })
    .catch(error => {
        showNotification('Error sending message. Please try again.', 'error');
    });
}

// Handle Newsletter Submit
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Subscribed successfully!', 'success');
            form.reset();
        } else {
            showNotification('Error subscribing. Please try again.', 'error');
        }
    })
    .catch(error => {
        showNotification('Error subscribing. Please try again.', 'error');
    });
}

// Show Notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let bgColor;
    switch(type) {
        case 'success': bgColor = 'rgba(16,185,129,0.95)'; break;
        case 'warning': bgColor = 'rgba(245,158,11,0.95)'; break;
        case 'error': bgColor = 'rgba(239,68,68,0.95)'; break;
        default: bgColor = 'rgba(42,125,225,0.95)';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${bgColor};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
    `;
    
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                       type === 'warning' ? 'fa-exclamation-triangle' : 
                       type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Export functions to global scope
window.addSkill = addSkill;
window.analyzeSkills = analyzeSkills;
window.resetSearch = resetSearch;
window.setViewMode = setViewMode;
window.changeItemsPerPage = changeItemsPerPage;
window.changePage = changePage;
window.viewJobDetails = viewJobDetails;
window.exportResults = exportResults;
window.scrollToTop = scrollToTop;
window.toggleSkills = toggleSkills;