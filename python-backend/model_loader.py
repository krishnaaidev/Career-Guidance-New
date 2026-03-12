import pickle
import numpy as np
import re

class CareerGuidanceModel:
    def __init__(self, model_path='../models/'):
        """Load all model components"""
        try:
            # Try loading the complete model first
            with open(f'{model_path}/career_guidance_complete.pkl', 'rb') as f:
                components = pickle.load(f)
                self.model = components['model']
                self.vectorizer = components['vectorizer']
                self.label_encoder = components['label_encoder']
                self.job_skill_map = components['job_skill_map']
                print("✅ Loaded complete model package")
        except:
            # Fall back to individual components
            with open(f'{model_path}/job_recommender_model.pkl', 'rb') as f:
                self.model = pickle.load(f)
            with open(f'{model_path}/vectorizer.pkl', 'rb') as f:
                self.vectorizer = pickle.load(f)
            with open(f'{model_path}/label_encoder.pkl', 'rb') as f:
                self.label_encoder = pickle.load(f)
            with open(f'{model_path}/job_skill_map.pkl', 'rb') as f:
                self.job_skill_map = pickle.load(f)
            print("✅ Loaded individual model components")
        
        # Get class names
        self.classes = self.label_encoder.classes_
        
    def parse_skills(self, skills_text):
        """Parse skills from text input"""
        if not skills_text or not isinstance(skills_text, str):
            return []
        
        # Convert to lowercase
        skills_text = skills_text.lower()
        
        # Split by comma first
        if ',' in skills_text:
            skills = [s.strip() for s in skills_text.split(',')]
        else:
            # If no commas, split by spaces but preserve common multi-word skills
            words = skills_text.split()
            skills = []
            i = 0
            while i < len(words):
                # Check for common multi-word skills
                if i < len(words) - 1:
                    two_word = f"{words[i]} {words[i+1]}"
                    three_word = f"{words[i]} {words[i+1]} {words[i+2]}" if i < len(words) - 2 else None
                    
                    # Common multi-word skills to preserve
                    common_multi = [
                        'machine learning', 'deep learning', 'data science', 'artificial intelligence',
                        'web development', 'mobile development', 'cloud computing', 'project management',
                        'business analysis', 'quality assurance', 'devops engineer', 'data analysis',
                        'security analysis', 'network security', 'software engineering', 'full stack',
                        'front end', 'back end', 'react native', 'tensor flow', 'py torch',
                        'natural language processing', 'computer vision', 'augmented reality',
                        'virtual reality', 'block chain', 'smart contract', 'ethical hacking',
                        'penetration testing', 'incident response', 'system design', 'rest api'
                    ]
                    
                    if two_word in common_multi:
                        skills.append(two_word)
                        i += 2
                        continue
                    elif three_word and three_word in common_multi:
                        skills.append(three_word)
                        i += 3
                        continue
                
                skills.append(words[i])
                i += 1
        
        return list(set(skills))  # Remove duplicates
    
    def predict(self, skills_text, top_n=5, confidence_threshold=0.05):
        """Predict job roles based on skills"""
        
        # Parse skills
        skill_list = self.parse_skills(skills_text)
        skill_set = set(skill_list)
        
        # Vectorize input
        vec = self.vectorizer.transform([skills_text.lower()])
        
        # Get probabilities
        try:
            probabilities = self.model.predict_proba(vec)[0]
        except:
            # Fallback if predict_proba fails
            pred_class = self.model.predict(vec)[0]
            probabilities = np.zeros(len(self.model.classes_))
            probabilities[pred_class] = 1.0
        
        # Get indices above threshold
        valid_indices = np.where(probabilities >= confidence_threshold)[0]
        
        if len(valid_indices) == 0:
            # Take top 3 if none above threshold
            valid_indices = np.argsort(probabilities)[::-1][:3]
        
        # Sort by probability
        top_indices = valid_indices[np.argsort(probabilities[valid_indices])[::-1]][:top_n]
        
        recommendations = []
        
        for idx in top_indices:
            job = self.classes[idx]
            confidence = float(probabilities[idx])
            
            # Get required skills
            required_skills = self.job_skill_map.get(job, set())
            
            # Calculate matching and missing skills
            matching_skills = sorted(list(skill_set & required_skills))
            missing_skills = sorted(list(required_skills - skill_set))
            
            # Calculate match percentage
            if required_skills:
                match_percentage = (len(matching_skills) / len(required_skills)) * 100
            else:
                match_percentage = 0
            
            recommendations.append({
                "job_role": job,
                "confidence": round(confidence * 100, 1),
                "match_percentage": round(match_percentage, 1),
                "matching_skills": matching_skills[:10],  # Limit to 10
                "skills_to_learn": missing_skills[:10],   # Limit to 10
                "total_required_skills": len(required_skills),
                "total_matching": len(matching_skills)
            })
        
        return recommendations
    
    def get_all_job_roles(self):
        """Get all available job roles"""
        return sorted(list(self.job_skill_map.keys()))
    
    def get_skills_for_job(self, job_role):
        """Get skills required for a specific job"""
        return sorted(list(self.job_skill_map.get(job_role, [])))
    
    def get_similar_jobs(self, job_role, n=5):
        """Find similar jobs based on skill overlap"""
        target_skills = self.job_skill_map.get(job_role, set())
        
        similarities = []
        for job, skills in self.job_skill_map.items():
            if job != job_role:
                overlap = len(target_skills & skills)
                if overlap > 0:
                    similarities.append((job, overlap))
        
        similarities.sort(key=lambda x: x[1], reverse=True)
        return [{"job": job, "common_skills": count} for job, count in similarities[:n]]

# Create global model instance
model = CareerGuidanceModel()