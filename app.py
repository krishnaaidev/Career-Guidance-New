from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sys
import pickle
import numpy as np
import re

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Model paths
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models')

# Global variables for model components
model = None
vectorizer = None
label_encoder = None
job_skill_map = None
classes = None

def load_models():
    """Load all model components"""
    global model, vectorizer, label_encoder, job_skill_map, classes
    
    try:
        print("📦 Loading model from:", MODEL_PATH)
        
        # Try loading the complete model first
        complete_model_path = os.path.join(MODEL_PATH, 'career_guidance_complete.pkl')
        if os.path.exists(complete_model_path):
            with open(complete_model_path, 'rb') as f:
                components = pickle.load(f)
                model = components.get('model')
                vectorizer = components.get('vectorizer')
                label_encoder = components.get('label_encoder')
                job_skill_map = components.get('job_skill_map')
            print("✅ Loaded complete model package")
        else:
            # Fall back to individual components
            model_path = os.path.join(MODEL_PATH, 'job_recommender_model.pkl')
            vectorizer_path = os.path.join(MODEL_PATH, 'vectorizer.pkl')
            encoder_path = os.path.join(MODEL_PATH, 'label_encoder.pkl')
            map_path = os.path.join(MODEL_PATH, 'job_skill_map.pkl')
            
            with open(model_path, 'rb') as f:
                model = pickle.load(f)
            with open(vectorizer_path, 'rb') as f:
                vectorizer = pickle.load(f)
            with open(encoder_path, 'rb') as f:
                label_encoder = pickle.load(f)
            with open(map_path, 'rb') as f:
                job_skill_map = pickle.load(f)
            print("✅ Loaded individual model components")
        
        # Get class names
        if label_encoder:
            classes = label_encoder.classes_
        elif hasattr(model, 'classes_'):
            classes = model.classes_
        else:
            classes = list(job_skill_map.keys()) if job_skill_map else []
        
        print(f"✅ Model loaded successfully with {len(classes)} job roles")
        return True
        
    except Exception as e:
        print(f"❌ Error loading models: {e}")
        return False

def parse_skills(skills_text):
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
    
    # Filter out single characters
    return list(set([s for s in skills if len(s) > 1]))

def predict_careers(skills_text, top_n=5, confidence_threshold=0.05):
    """Predict job roles based on skills"""
    
    if model is None or vectorizer is None:
        return {"error": "Models not loaded"}
    
    # Parse skills
    skill_list = parse_skills(skills_text)
    skill_set = set(skill_list)
    
    # Vectorize input
    vec = vectorizer.transform([skills_text.lower()])
    
    # Get probabilities
    try:
        probabilities = model.predict_proba(vec)[0]
    except:
        # Fallback if predict_proba fails
        pred_class = model.predict(vec)[0]
        probabilities = np.zeros(len(model.classes_))
        if hasattr(model, 'classes_'):
            class_idx = np.where(model.classes_ == pred_class)[0][0]
            probabilities[class_idx] = 1.0
        else:
            return {"error": "Prediction failed"}
    
    # Get class labels
    if classes is not None:
        model_classes = classes
    elif hasattr(model, 'classes_'):
        model_classes = model.classes_
    else:
        return {"error": "No class labels available"}
    
    # Get indices above threshold
    valid_indices = np.where(probabilities >= confidence_threshold)[0]
    
    if len(valid_indices) == 0:
        # Take top 3 if none above threshold
        valid_indices = np.argsort(probabilities)[::-1][:3]
    
    # Sort by probability
    top_indices = valid_indices[np.argsort(probabilities[valid_indices])[::-1]][:top_n]
    
    recommendations = []
    
    for idx in top_indices:
        if idx >= len(model_classes):
            continue
            
        job = model_classes[idx]
        confidence = float(probabilities[idx])
        
        # Get required skills
        required_skills = job_skill_map.get(job, set()) if job_skill_map else set()
        
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
            "matching_skills": matching_skills[:10],
            "skills_to_learn": missing_skills[:10],
            "total_required_skills": len(required_skills),
            "total_matching": len(matching_skills)
        })
    
    return recommendations

# Load models at startup
print("🚀 Starting application...")
models_loaded = load_models()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/style.css')
def serve_css():
    return send_from_directory('.', 'style.css')

@app.route('/script.js')
def serve_js():
    return send_from_directory('.', 'script.js')

@app.route('/particles.json')
def serve_particles():
    return send_from_directory('.', 'particles.json')

@app.route('/api/predict', methods=['POST'])
def predict():
    """Endpoint to get career recommendations"""
    try:
        data = request.get_json()
        skills = data.get('skills', '')
        top_n = int(data.get('top_n', 5))
        
        if not skills:
            return jsonify({"error": "No skills provided"}), 400
        
        if not models_loaded:
            return jsonify({"error": "Models not loaded. Please check server logs."}), 503
        
        recommendations = predict_careers(skills, top_n=top_n)
        
        if isinstance(recommendations, dict) and "error" in recommendations:
            return jsonify(recommendations), 500
        
        return jsonify({
            "success": True,
            "recommendations": recommendations,
            "input_skills": skills
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/job-roles', methods=['GET'])
def get_job_roles():
    """Get all available job roles"""
    try:
        if job_skill_map:
            job_roles = sorted(list(job_skill_map.keys()))
        elif classes is not None:
            job_roles = sorted(list(classes))
        else:
            job_roles = []
        
        return jsonify({
            "success": True,
            "job_roles": job_roles,
            "total": len(job_roles)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "models_loaded": models_loaded,
        "total_job_roles": len(classes) if classes is not None else 0
    })

@app.route('/api/model-info', methods=['GET'])
def model_info():
    """Get model information"""
    return jsonify({
        "models_loaded": models_loaded,
        "total_job_roles": len(classes) if classes is not None else 0,
        "vectorizer_loaded": vectorizer is not None,
        "encoder_loaded": label_encoder is not None,
        "skill_map_loaded": job_skill_map is not None
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"🌐 Server starting on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=False)