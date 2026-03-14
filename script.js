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

// ==================== JOB DATABASE ====================
// Constructed from the provided CSV data
const jobDatabase = [
    {
        job_role: "AI Engineer",
        required_skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "APIs", "Deployment", "Data Preprocessing", "Git", "Linux", "Optimization", "Critical Thinking", "Communication", "Problem Solving", "Collaboration", "Continuous Learning", "Analytical Thinking", "Creativity", "Adaptability"]
    },
    {
        job_role: "Android Developer",
        required_skills: ["Java", "Kotlin", "Android SDK", "XML", "REST APIs", "SQLite", "Firebase", "Git", "MVVM", "Debugging", "User Empathy", "Adaptability", "Attention to Detail", "Team Collaboration", "Time Management", "Problem Solving", "Communication", "Openness to Feedback"]
    },
    {
        job_role: "Application Developer",
        required_skills: ["Java", "Kotlin", "Swift", "C#", "OOP", "MVC", "REST APIs", "SQLite", "Git", "UI Frameworks", "Debugging", "Unit Testing", "SDKs", "Deployment", "Version Control", "Requirement Analysis", "Problem Solving", "Time Management", "Stakeholder Management", "Documentation", "Team Collaboration", "Adaptability", "Critical Thinking"]
    },
    {
        job_role: "AR/VR Developer",
        required_skills: ["C#", "Unity", "Unreal Engine", "3D Math", "Computer Graphics", "OpenXR", "Shader Programming", "Creativity", "User Testing", "Storytelling", "Patience", "Collaboration", "Adaptability", "Spatial Reasoning", "Communication"]
    },
    {
        job_role: "Automation Test Engineer",
        required_skills: ["Java", "Python", "Selenium", "TestNG", "PyTest", "API Testing", "CI/CD", "Analytical Thinking", "Attention to Detail", "Process Orientation", "Communication", "Persistence", "Problem Solving", "Collaboration", "Time Management"]
    },
    {
        job_role: "Backend Developer",
        required_skills: ["Java", "Python", "Node.js", "SQL", "MongoDB", "REST APIs", "Authentication", "DSA", "OOP", "Git", "Linux", "Microservices", "Docker", "API Security", "Debugging", "Systems Thinking", "Collaboration", "Documentation", "Problem Solving", "Analytical Thinking", "Communication", "Time Management", "Attention to Detail"]
    },
    {
        job_role: "Blockchain Developer",
        required_skills: ["Solidity", "JavaScript", "Blockchain", "Web3.js", "Ethereum", "Smart Contracts", "Cryptography", "Testing", "Git", "Integrity", "Transparency", "Research Orientation", "Security Mindset", "Communication", "Adaptability", "Critical Thinking", "Collaboration"]
    },
    {
        job_role: "Business Analyst",
        required_skills: ["SQL", "Excel", "Power BI", "Data Analysis", "Python", "Communication", "Stakeholder Management", "Critical Thinking", "Negotiation", "Requirement Elicitation", "Documentation", "Facilitation", "Problem Solving"]
    },
    {
        job_role: "Business Intelligence Analyst",
        required_skills: ["SQL", "Power BI", "Tableau", "Data Warehousing", "ETL", "Excel", "Python", "Data Modeling", "Reporting", "KPI Analysis", "Dashboards", "OLAP", "Business Metrics", "Data Storytelling", "Visualization", "Business Acumen", "Communication", "Critical Thinking", "Attention to Detail", "Collaboration", "Curiosity"]
    },
    {
        job_role: "Cloud Architect",
        required_skills: ["Cloud Platforms", "System Design", "Python", "Terraform", "Networking", "Security Architecture", "Kubernetes", "Docker", "CI/CD", "Scalability", "Strategic Thinking", "Communication", "Cost Management", "Leadership", "Negotiation", "Systems Design", "Collaboration", "Adaptability"]
    },
    {
        job_role: "Cloud Engineer",
        required_skills: ["Python", "AWS", "Azure", "GCP", "Linux", "Docker", "Kubernetes", "Terraform", "CI/CD", "Networking", "Monitoring", "Troubleshooting", "Collaboration", "Automation Mindset", "Documentation", "Adaptability", "Communication", "Problem Solving", "Continuous Learning"]
    },
    {
        job_role: "Computer Vision Engineer",
        required_skills: ["Python", "OpenCV", "CNN", "Image Processing", "TensorFlow", "PyTorch", "Data Augmentation", "Object Detection", "Image Classification", "Feature Extraction", "APIs", "Experimental Mindset", "Communication", "Critical Thinking", "Persistence", "Collaboration", "Creativity", "Patience", "Analytical Thinking"]
    },
    {
        job_role: "Cross-Platform App Developer",
        required_skills: ["Dart", "Flutter", "JavaScript", "React Native", "REST APIs", "State Management", "Firebase", "Git", "UI Design", "Adaptability", "Efficiency", "Problem Solving", "Attention to Detail", "Communication", "Time Management", "User Empathy", "Collaboration"]
    },
    {
        job_role: "Cybersecurity Engineer",
        required_skills: ["Python", "C", "Networking", "Linux", "Cryptography", "Malware Analysis", "Security Tools", "Scripting", "Firewalls", "IDS/IPS", "Vulnerability Analysis", "Incident Response", "Vigilance", "Communication", "Ethical Mindset", "Attention to Detail", "Problem Solving", "Adaptability", "Collaboration", "Analytical Thinking"]
    },
    {
        job_role: "Data Analyst",
        required_skills: ["SQL", "Python", "Excel", "Pandas", "NumPy", "Data Cleaning", "Visualization", "Power BI", "Tableau", "Statistics", "Reporting", "Dashboards", "ETL", "Documentation", "Curiosity", "Communication", "Storytelling", "Attention to Detail", "Critical Thinking", "Collaboration", "Problem Solving", "Time Management"]
    },
    {
        job_role: "Data Scientist",
        required_skills: ["Python", "R", "SQL", "Pandas", "NumPy", "Data Cleaning", "Visualization", "Statistics", "Machine Learning", "Scikit-learn", "Jupyter", "Feature Engineering", "APIs", "Model Evaluation", "Curiosity", "Storytelling", "Business Acumen", "Critical Thinking", "Collaboration", "Communication", "Experimental Mindset", "Adaptability"]
    },
    {
        job_role: "Deep Learning Engineer",
        required_skills: ["Python", "TensorFlow", "PyTorch", "Neural Networks", "CNN", "RNN", "Transformers", "CUDA", "GPU Computing", "Data Augmentation", "Model Optimization", "APIs", "Linux", "Curiosity", "Humility", "Technical Communication", "Rigor", "Persistence", "Collaboration", "Critical Thinking", "Continuous Learning"]
    },
    {
        job_role: "DeFi Engineer",
        required_skills: ["Solidity", "Ethereum", "Web3.js", "Cryptography", "Smart Contract Security", "Financial Protocols", "Security Awareness", "Transparency", "Innovation", "Critical Thinking", "Communication", "Adaptability", "Collaboration", "Research Orientation"]
    },
    {
        job_role: "DevOps Engineer",
        required_skills: ["Linux", "Python", "Bash", "Docker", "Kubernetes", "CI/CD", "Terraform", "Git", "Cloud Platforms", "Monitoring", "Collaboration", "Automation Mindset", "Calm Under Pressure", "Communication", "Problem Solving", "Adaptability", "Systems Thinking", "Continuous Learning"]
    },
    {
        job_role: "Digital Forensics Analyst",
        required_skills: ["Python", "Linux", "File Systems", "Memory Analysis", "Disk Forensics", "Malware Analysis", "Networking", "Cryptography", "Log Analysis", "Integrity", "Attention to Detail", "Methodical Thinking", "Communication", "Patience", "Objectivity", "Critical Thinking", "Documentation"]
    },
    {
        job_role: "Embedded Software Engineer",
        required_skills: ["C", "C++", "Embedded C", "Microcontrollers", "RTOS", "ARM", "UART", "SPI", "I2C", "Device Drivers", "Firmware", "Debugging", "Embedded Linux", "Memory Optimization", "Sensors", "Patience", "Precision", "Cross-functional Collaboration", "Logic", "Problem Solving", "Attention to Detail", "Communication", "Adaptability"]
    },
    {
        job_role: "Ethical Hacker",
        required_skills: ["Python", "Bash", "Networking", "Linux", "Penetration Testing", "Web Security", "SQL Injection", "Scripting", "Exploit Development", "Cryptography", "OSINT", "Curiosity", "Integrity", "Persistence", "Communication", "Creative Thinking", "Adaptability", "Attention to Detail", "Collaboration"]
    },
    {
        job_role: "Frontend Developer",
        required_skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Responsive Design", "Tailwind", "DOM", "REST APIs", "Git", "Web Performance", "Accessibility", "DevTools", "State Management", "Empathy", "Communication", "Creativity", "Openness to Feedback", "Attention to Detail", "Collaboration", "Problem Solving", "Adaptability"]
    },
    {
        job_role: "Full Stack Developer",
        required_skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "REST APIs", "MongoDB", "SQL", "Git", "JWT", "Docker", "Deployment", "API Integration", "Debugging", "Versatility", "Big Picture Thinking", "Adaptability", "Problem Solving", "Communication", "Time Management", "Collaboration", "Continuous Learning"]
    },
    {
        job_role: "Game Developer",
        required_skills: ["C++", "C#", "Unity", "Unreal Engine", "Game Physics", "Rendering", "Mathematics", "Animation", "Game AI", "Storytelling", "Resilience", "Creativity", "Collaboration", "Patience", "Adaptability", "User Empathy", "Openness to Feedback"]
    },
    {
        job_role: "Information Security Analyst",
        required_skills: ["Python", "SQL", "Linux", "Networking", "SIEM", "Vulnerability Management", "Risk Assessment", "Incident Response", "Security Monitoring", "Log Analysis", "Vigilance", "Communication", "Ethical Mindset", "Adaptability", "Problem Solving", "Collaboration", "Attention to Detail", "Analytical Thinking"]
    },
    {
        job_role: "Infrastructure Engineer",
        required_skills: ["Linux", "Networking", "Cloud Platforms", "Python", "Bash", "Docker", "Kubernetes", "Terraform", "Monitoring", "Reliability", "Troubleshooting", "Communication", "Collaboration", "Documentation", "Adaptability", "Problem Solving", "Systems Thinking"]
    },
    {
        job_role: "iOS Developer",
        required_skills: ["Swift", "Objective-C", "iOS SDK", "Xcode", "REST APIs", "Core Data", "Git", "MVC", "Debugging", "Design Sensibility", "Advocacy", "Attention to Detail", "Time Management", "Collaboration", "Problem Solving", "Communication", "User Empathy"]
    },
    {
        job_role: "IT Consultant",
        required_skills: ["Python", "SQL", "Cloud Platforms", "Networking", "System Design", "Client Management", "Communication", "Problem Solving", "Adaptability", "Business Acumen", "Negotiation", "Presentation Skills", "Analytical Thinking"]
    },
    {
        job_role: "Machine Learning Engineer",
        required_skills: ["Python", "Scikit-learn", "TensorFlow", "PyTorch", "DSA", "Machine Learning", "Model Deployment", "APIs", "Feature Engineering", "Docker", "Git", "Linux", "Statistics", "Experimental Mindset", "Communication", "Problem Solving", "Collaboration", "Continuous Learning", "Critical Thinking", "Adaptability", "Creativity"]
    },
    {
        job_role: "Metaverse Developer",
        required_skills: ["Unity", "Unreal", "C#", "C++", "3D Graphics", "Blockchain Basics", "Web3 Integration", "VR SDKs", "Visionary Thinking", "Creativity", "Collaboration", "Adaptability", "Storytelling", "User Empathy", "Communication", "Problem Solving"]
    },
    {
        job_role: "Network Engineer",
        required_skills: ["Networking", "TCP/IP", "Routing", "Switching", "Python", "Linux", "Network Automation", "Firewalls", "VLAN", "DNS", "DHCP", "Troubleshooting", "Documentation", "Communication", "Reliability", "Collaboration", "Problem Solving", "Adaptability", "Analytical Thinking"]
    },
    {
        job_role: "Network Security Engineer",
        required_skills: ["Networking", "Python", "Linux", "Firewalls", "IDS/IPS", "VPN", "Cryptography", "Network Monitoring", "SIEM", "Incident Response", "Vigilance", "Communication", "Threat Analysis", "Adaptability", "Collaboration", "Problem Solving", "Attention to Detail", "Ethical Mindset"]
    },
    {
        job_role: "NLP Engineer",
        required_skills: ["Python", "NLTK", "spaCy", "Transformers", "Tokenization", "Text Preprocessing", "Word Embeddings", "Deep Learning", "PyTorch", "TensorFlow", "APIs", "Git", "Linguistic Curiosity", "Critical Thinking", "Communication", "Collaboration", "Patience", "Analytical Thinking", "Creativity", "Continuous Learning"]
    },
    {
        job_role: "Penetration Tester",
        required_skills: ["Python", "Bash", "Linux", "Networking", "Metasploit", "Web Security", "SQL Injection", "Exploit Writing", "Vulnerability Scanners", "OSINT", "Creative Thinking", "Integrity", "Reporting", "Persistence", "Communication", "Adaptability", "Attention to Detail", "Collaboration"]
    },
    {
        job_role: "Performance Tester",
        required_skills: ["JMeter", "LoadRunner", "Performance Testing", "Python", "Java", "Monitoring", "Analytical Thinking", "Attention to Detail", "Patience", "Communication", "Problem Solving", "Collaboration", "Process Orientation", "Documentation"]
    },
    {
        job_role: "Platform Engineer",
        required_skills: ["Python", "Go", "Linux", "Kubernetes", "Docker", "Cloud Platforms", "Infrastructure as Code", "APIs", "Automation", "Service Orientation", "Strategic Thinking", "Communication", "Collaboration", "Automation Mindset", "Problem Solving", "Adaptability", "Documentation"]
    },
    {
        job_role: "Product Engineer",
        required_skills: ["Java", "Python", "System Design", "APIs", "Databases", "Cloud", "Business Acumen", "User-Centricity", "Collaboration", "Pragmatism", "Problem Solving", "Communication", "Creativity", "Adaptability"]
    },
    {
        job_role: "Product Manager",
        required_skills: ["SQL", "Data Analysis", "APIs Basics", "Agile Tools", "Product Analytics", "Leadership", "Communication", "Strategic Thinking", "Empathy", "Prioritization", "Negotiation", "Storytelling", "Stakeholder Management"]
    },
    {
        job_role: "Project Coordinator",
        required_skills: ["Excel", "SQL Basics", "Project Management Tools", "Reporting", "Documentation", "Organization", "Communication", "Time Management", "Adaptability", "Collaboration", "Attention to Detail", "Problem Solving", "Stakeholder Management"]
    },
    {
        job_role: "Quality Assurance Engineer",
        required_skills: ["Manual Testing", "Automation Basics", "Test Case Design", "Bug Tracking", "SQL", "Attention to Detail", "Communication", "Patience", "Critical Thinking", "Collaboration", "Empathy", "Process Orientation", "Problem Solving"]
    },
    {
        job_role: "Research Scientist (AI/ML)",
        required_skills: ["Python", "R", "Machine Learning", "Deep Learning", "Statistics", "Linear Algebra", "Probability", "Data Analysis", "Research Methods", "Model Evaluation", "Experimentation", "Git", "Curiosity", "Critical Thinking", "Communication", "Persistence", "Collaboration", "Creativity", "Rigor", "Continuous Learning"]
    },
    {
        job_role: "Site Reliability Engineer",
        required_skills: ["Python", "Go", "Linux", "Kubernetes", "Docker", "Monitoring", "Automation", "Incident Management", "CI/CD", "System Design", "Calm Under Pressure", "Systems Thinking", "Collaboration", "Communication", "Problem Solving", "Adaptability", "Automation Mindset", "Documentation"]
    },
    {
        job_role: "Smart Contract Developer",
        required_skills: ["Solidity", "Ethereum", "Web3.js", "Hardhat", "Cryptography", "Smart Contract Security", "Testing", "Precision", "Security Awareness", "Logical Thinking", "Communication", "Adaptability", "Attention to Detail", "Collaboration", "Integrity"]
    },
    {
        job_role: "SOC Analyst",
        required_skills: ["Python", "SIEM", "Log Analysis", "Linux", "Networking", "Incident Response", "Malware Analysis", "Threat Intelligence", "Scripting", "Vigilance", "Communication", "Stress Management", "Teamwork", "Analytical Thinking", "Attention to Detail", "Adaptability", "Documentation"]
    },
    {
        job_role: "Software Developer",
        required_skills: ["Java", "Python", "C#", "JavaScript", "SQL", "OOP", "Git", "REST APIs", "MVC", "Debugging", "Unit Testing", "Agile", "Linux", "CI/CD", "Version Control", "Logical Reasoning", "Teamwork", "Communication", "Problem Solving", "Adaptability", "Time Management", "Attention to Detail", "Continuous Learning"]
    },
    {
        job_role: "Software Engineer",
        required_skills: ["C", "C++", "Java", "Python", "DSA", "OOP", "Git", "SQL", "Operating Systems", "Computer Networks", "REST APIs", "Design Patterns", "Debugging", "Unit Testing", "Linux", "Problem Solving", "Collaboration", "Communication", "Adaptability", "Critical Thinking", "Time Management", "Attention to Detail", "Systems Thinking"]
    },
    {
        job_role: "Software Test Engineer",
        required_skills: ["Manual Testing", "Java", "Python", "Selenium", "Test Case Design", "Bug Tracking", "API Testing", "Attention to Detail", "Critical Thinking", "Communication", "Patience", "Collaboration", "Adaptability", "Process Orientation", "Empathy"]
    },
    {
        job_role: "System Programmer",
        required_skills: ["C", "C++", "Assembly", "Linux Kernel", "Memory Management", "Multithreading", "Process Management", "File Systems", "OS Internals", "GDB", "Shell Scripting", "Computer Architecture", "Networking", "Low-level APIs", "Precision", "Logical Thinking", "Patience", "Collaboration", "Problem Solving", "Documentation", "Attention to Detail", "Systems Thinking"]
    },
    {
        job_role: "Systems Analyst",
        required_skills: ["SQL", "System Design", "APIs", "Documentation", "Data Analysis", "Requirement Analysis", "Communication", "Critical Thinking", "Problem Solving", "Collaboration", "Stakeholder Management", "Adaptability"]
    },
    {
        job_role: "Technical Consultant",
        required_skills: ["Python", "SQL", "APIs", "Cloud Platforms", "System Design", "Client Management", "Communication", "Problem Solving", "Adaptability", "Presentation Skills", "Business Acumen", "Collaboration", "Analytical Thinking"]
    },
    {
        job_role: "Technical Product Manager",
        required_skills: ["SQL", "APIs", "System Design", "Data Analysis", "Agile", "Technical Acumen", "Communication", "Strategic Thinking", "Prioritization", "Empathy", "Leadership", "Negotiation", "Stakeholder Management"]
    },
    {
        job_role: "Technical Support Engineer",
        required_skills: ["Linux", "Windows", "Networking Basics", "Python", "SQL", "Troubleshooting", "Patience", "Communication", "Empathy", "Problem Solving", "Adaptability", "Active Listening", "Documentation", "Time Management"]
    },
    {
        job_role: "UI Designer",
        required_skills: ["HTML", "CSS", "Figma", "Adobe XD", "Responsive Design", "Visual Communication", "Empathy", "Creativity", "Collaboration", "Openness to Feedback", "Attention to Detail", "Problem Solving", "Advocacy"]
    },
    {
        job_role: "UI/UX Engineer",
        required_skills: ["HTML", "CSS", "JavaScript", "React", "Figma", "Accessibility", "Bridge-Building", "Empathy", "Technical Communication", "Collaboration", "Creativity", "Problem Solving", "Attention to Detail", "Adaptability"]
    },
    {
        job_role: "UX Designer",
        required_skills: ["Wireframing", "Prototyping", "User Research", "Figma", "Usability Testing", "User Empathy", "Research", "Communication", "Collaboration", "Critical Thinking", "Storytelling", "Openness to Feedback", "Problem Solving"]
    },
    {
        job_role: "Web Developer",
        required_skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "WordPress", "REST APIs", "Git", "Responsive Design", "Hosting", "SEO", "Debugging", "Web Security", "CMS", "Deployment", "Adaptability", "Problem Solving", "Communication", "Time Management", "Collaboration", "Attention to Detail", "Creativity", "Continuous Learning"]
    },
    {
        job_role: "Web3 Developer",
        required_skills: ["JavaScript", "Solidity", "Web3.js", "React", "Ethereum", "Wallet Integration", "APIs", "Decentralization Mindset", "Adaptability", "Communication", "Collaboration", "Security Awareness", "Critical Thinking", "Continuous Learning", "Transparency"]
    },
    {
        job_role: "Career Counselor",
        required_skills: ["Time Management", "Analytical Thinking", "Oracle", "Firebase", "Public Speaking", "Go", "Power BI", "Git", "Critical Thinking", "Bash", "Statistics", "Leadership", "Research Skills", "Redis", "Excel", "Google Cloud", "Negotiation", "GraphQL", "HTML", "Cassandra", "Communication"]
    },
    {
        job_role: "Content Writer",
        required_skills: ["Terraform", "Firewall Management", "Negotiation", "Research Skills", "Analysis", "Leadership", "Communication", "Azure", "Problem Solving", "Git", "Strategic Thinking", "Penetration Testing", "Power BI", "Collaboration"]
    },
    {
        job_role: "Event Manager",
        required_skills: ["Strategic Thinking", "Collaboration", "Decision Making", "Creativity", "Penetration Testing", "Time Management", "Firebase", "Empathy", "Communication", "Problem Solving"]
    },
    {
        job_role: "HR Recruiter",
        required_skills: ["Attention to Detail", "Collaboration", "Creativity", "Time Management", "Presentation Skills", "Research Skills", "Computer Vision", "Conflict Resolution", "Analytical Thinking", "Penetration Testing"]
    },
    {
        job_role: "Sales Executive",
        required_skills: ["Communication", "Teamwork", "Negotiation", "Power BI", "Excel", "Analytical Thinking", "Conflict Resolution", "Time Management", "Public Speaking"]
    }
];

// Add confidence scores (adjust as needed)
jobDatabase.forEach(job => {
    job.confidence = Math.min(99, 70 + Math.floor(Math.random() * 25));
});

// Popular skills for quick-add tags
const popularSkills = [
    'python', 'java', 'javascript', 'html', 'css', 'sql', 'mongodb', 'react',
    'node.js', 'machine learning', 'deep learning', 'tensorflow', 'pytorch',
    'data analysis', 'excel', 'git', 'docker', 'kubernetes', 'aws', 'azure',
    'linux', 'networking', 'security', 'android', 'ios', 'flutter', 'communication',
    'teamwork', 'problem solving', 'critical thinking', 'agile', 'c', 'c++', 'c#',
    'php', 'ruby', 'swift', 'kotlin', 'rust', 'go', 'data structures', 'algorithms'
];

// ==================== UTILITY FUNCTIONS ====================

function calculateMatch(userSkills, requiredSkills) {
    if (!userSkills.length || !requiredSkills.length) return 0;
    const userSet = new Set(userSkills.map(s => s.toLowerCase().trim()));
    let matchCount = 0;
    requiredSkills.forEach(reqSkill => {
        const reqLower = reqSkill.toLowerCase().trim();
        for (const userSkill of userSet) {
            if (userSkill === reqLower) {
                matchCount++;
                break;
            }
            if (reqLower.includes(' ') && userSkill.includes(' ') && userSkill === reqLower) {
                matchCount++;
                break;
            }
            if (reqLower.includes(userSkill) && userSkill.length > 2) {
                const words = reqLower.split(' ');
                if (words.some(word => word === userSkill)) {
                    matchCount++;
                    break;
                }
            }
            if (userSkill.includes(reqLower) && reqLower.length > 2) {
                const userWords = userSkill.split(' ');
                if (userWords.some(word => word === reqLower)) {
                    matchCount++;
                    break;
                }
            }
        }
    });
    return Math.round((matchCount / requiredSkills.length) * 100);
}

// Helper to format skill name for display (C -> C-programming, R -> R-programming)
function formatSkillName(skill) {
    if (skill.toLowerCase() === 'c') return 'C-programming';
    if (skill.toLowerCase() === 'r') return 'R-programming';
    return skill;
}

// ==================== MAIN ANALYSIS FUNCTION ====================

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
        // Parse user skills – split on commas OR semicolons, clean, and filter
        const userSkills = skills.split(/[;,]/)
            .map(s => s.trim().toLowerCase())
            .filter(s => {
                if (s.length === 1) {
                    // Keep only 'c' and 'r' as valid single-letter skills
                    return s === 'c' || s === 'r';
                }
                return s.length > 1;
            });

        const recommendations = jobDatabase.map(job => {
            const matchPercentage = calculateMatch(userSkills, job.required_skills);
            const matchingSkills = job.required_skills.filter(reqSkill => {
                const reqLower = reqSkill.toLowerCase();
                return userSkills.some(userSkill => {
                    if (userSkill === reqLower) return true;
                    if (reqLower.includes(' ') && userSkill.includes(' ') && userSkill === reqLower) return true;
                    if (reqLower.includes(userSkill) && userSkill.length > 2) {
                        const words = reqLower.split(' ');
                        return words.some(word => word === userSkill);
                    }
                    if (userSkill.includes(reqLower) && reqLower.length > 2) {
                        const userWords = userSkill.split(' ');
                        return userWords.some(word => word === reqLower);
                    }
                    return false;
                });
            });
            const skillsToLearn = job.required_skills.filter(s => !matchingSkills.includes(s));
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

        // --- FIX: Show all jobs that have at least one matching skill (match_percentage > 0) ---
        let filteredRecs = recommendations.filter(rec => rec.match_percentage > 0);
        filteredRecs.sort((a, b) => b.match_percentage - a.match_percentage);

        const limit = topN === '0' ? filteredRecs.length : Math.min(parseInt(topN), filteredRecs.length);
        currentRecommendations = filteredRecs.slice(0, limit);

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

// ==================== UI FUNCTIONS ====================

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

function displayResults(recommendations, inputSkills) {
    toggleSections(false);
    currentPage = 1;
    totalPages = Math.ceil(recommendations.length / itemsPerPage);
    updateResultsSummary(recommendations, inputSkills);
    addResultsControls();
    displayPaginatedRecommendations();
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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

function changeItemsPerPage(value) {
    itemsPerPage = parseInt(value);
    currentPage = 1;
    totalPages = Math.ceil(currentRecommendations.length / itemsPerPage);
    displayPaginatedRecommendations();
    updateResultsSummary(currentRecommendations, document.getElementById('skillsInput')?.value || '');
}

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
                        <i class="fas fa-check"></i> ${formatSkillName(skill)}
                    </span>`
                ).join('')}
                ${hasMoreMatching ? `
                    <span class="hidden-skills" id="hidden-matching-${index}" style="display: none;">
                        ${hiddenMatching.map(skill => 
                            `<span class="skill-badge matching">
                                <i class="fas fa-check"></i> ${formatSkillName(skill)}
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
                        <i class="fas fa-plus"></i> ${formatSkillName(skill)}
                    </span>`
                ).join('')}
                ${hasMoreMissing ? `
                    <span class="hidden-skills" id="hidden-missing-${index}" style="display: none;">
                        ${hiddenMissing.map(skill => 
                            `<span class="skill-badge missing">
                                <i class="fas fa-plus"></i> ${formatSkillName(skill)}
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

function addPaginationControls() {
    const existingControls = document.querySelector('.pagination-controls');
    if (existingControls) existingControls.remove();
    if (totalPages <= 1) return;
    const grid = document.getElementById('recommendationsGrid');
    const controls = document.createElement('div');
    controls.className = 'pagination-controls';
    controls.innerHTML = `
        <button class="pagination-btn" onclick="changePage('prev')" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
        <div class="page-info">Page ${currentPage} of ${totalPages}</div>
        <button class="pagination-btn" onclick="changePage('next')" ${currentPage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;
    grid.insertAdjacentElement('afterend', controls);
}

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

function viewJobDetails(jobRole) {
    const job = currentRecommendations.find(r => r.job_role === jobRole);
    if (job) showJobDetailsModal(job);
}

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
                            <i class="fas fa-check"></i> ${formatSkillName(skill)}
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
                            <i class="fas fa-plus"></i> ${formatSkillName(skill)}
                        </span>`
                    ).join('')}
                </div>
            </div>
            <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 15px;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                    <div><div style="font-weight: bold; color: var(--text-primary);">Total Skills</div><div style="color: var(--accent-blue); font-size: 1.5rem;">${job.total_required_skills}</div></div>
                    <div><div style="font-weight: bold; color: var(--text-primary);">Matched</div><div style="color: var(--success-color); font-size: 1.5rem;">${job.total_matching}</div></div>
                    <div><div style="font-weight: bold; color: var(--text-primary);">Progress</div><div style="color: var(--warning-color); font-size: 1.5rem;">${Math.round(job.total_matching/job.total_required_skills*100)}%</div></div>
                </div>
            </div>
            <button onclick="this.closest('.modal').remove()" style="width: 100%; margin-top: 25px; padding: 15px; background: var(--gradient-1); color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer;">
                Close
            </button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

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
                <html><head><title>Pixel2Predict - Career Recommendations</title><style>
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
                </style></head>
                <body>
                    <div class="header"><h1>Pixel2Predict Career Guidance System</h1><div class="institution">CT Institute of Engineering, Management and Technology | NAAC A</div><div class="date">Generated on: ${new Date().toLocaleString()}</div></div>
                    ${currentRecommendations.map(rec => `
                        <div class="job">
                            <h2>${rec.job_role}</h2>
                            <div class="match" style="background: ${rec.match_percentage > 70 ? '#4caf50' : rec.match_percentage > 40 ? '#ff9800' : '#f44336'}; color: white;">${rec.match_percentage}% Match</div>
                            <p><strong>AI Confidence:</strong> ${rec.confidence}%</p>
                            <div class="skills"><strong>Your Skills:</strong><br>${rec.matching_skills.map(s => `<span class="skill">${formatSkillName(s)}</span>`).join('')}</div>
                            <div class="skills"><strong>Skills to Learn:</strong><br>${rec.skills_to_learn.map(s => `<span class="skill">${formatSkillName(s)}</span>`).join('')}</div>
                            <p><strong>Progress:</strong> ${rec.total_matching}/${rec.total_required_skills} skills (${Math.round(rec.total_matching/rec.total_required_skills*100)}%)</p>
                        </div>
                    `).join('')}
                    <div class="footer"><p>Developed by Suman Krishna & Shivam Kumar Chaubey | CT Institute of Engineering, Management and Technology | NAAC A Accredited | © 2026 Pixel2Predict</p></div>
                </body></html>
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

function initializeSkillTags() {
    const tagsContainer = document.getElementById('skillTags');
    if (!tagsContainer) return;
    const displaySkills = popularSkills.slice(0, 20);
    tagsContainer.innerHTML = displaySkills.map(skill => {
        let displayText = skill;
        if (skill === 'c') displayText = 'c-programming';
        if (skill === 'r') displayText = 'r-programming';
        return `<span class="skill-tag" onclick="addSkill('${skill}')">
            <i class="fas fa-plus"></i> ${displayText}
        </span>`;
    }).join('');
}

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
    showNotification(`Added: ${skill === 'c' ? 'c-programming' : skill === 'r' ? 'r-programming' : skill}`, 'success');
}

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
        position: fixed; top: 20px; right: 20px; padding: 15px 25px; background: ${bgColor}; color: white;
        border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); z-index: 10001;
        display: flex; align-items: center; gap: 12px; animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);
    `;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'warning' ? 'fa-exclamation-triangle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentElement) notification.remove();
        }, 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSkillTags();

    // Add Enter key listener for the skills input
    const skillsInput = document.getElementById('skillsInput');
    if (skillsInput) {
        skillsInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();  // Prevent new line
                analyzeSkills();
            }
        });
    }
});

// Export functions to global scope
window.analyzeSkills = analyzeSkills;
window.resetSearch = resetSearch;
window.setViewMode = setViewMode;
window.changeItemsPerPage = changeItemsPerPage;
window.changePage = changePage;
window.viewJobDetails = viewJobDetails;
window.exportResults = exportResults;
window.scrollToTop = function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
window.toggleSkills = toggleSkills;
window.addSkill = addSkill;