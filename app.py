from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import pickle
import numpy as np

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models')

# Global variables
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
    """
    Parse skills from text input.
    Keeps valid single-letter skills: 'c' and 'r'.
    Splits on commas or semicolons.
    """
    if not skills_text or not isinstance(skills_text, str):
        return []
    skills_text = skills_text.lower()
    # Replace semicolons with commas, then split
    raw_skills = []
    for part in skills_text.replace(';', ',').split(','):
        part = part.strip()
        if part:
            raw_skills.append(part)
    # Filter out single characters except 'c' and 'r'
    valid_single = {'c', 'r'}
    skills = []
    for s in raw_skills:
        if len(s) == 1:
            if s in valid_single:
                skills.append(s)
        elif len(s) > 1:
            skills.append(s)
    return list(set(skills))

def predict_careers(skills_text, top_n=5, confidence_threshold=0.05):
    """Predict job roles based on skills using the ML model."""
    if model is None or vectorizer is None:
        return {"error": "Models not loaded"}
    skill_list = parse_skills(skills_text)
    skill_set = set(skill_list)
    vec = vectorizer.transform([skills_text.lower()])
    try:
        probabilities = model.predict_proba(vec)[0]
    except:
        pred_class = model.predict(vec)[0]
        probabilities = np.zeros(len(model.classes_))
        if hasattr(model, 'classes_'):
            class_idx = np.where(model.classes_ == pred_class)[0][0]
            probabilities[class_idx] = 1.0
        else:
            return {"error": "Prediction failed"}
    if classes is not None:
        model_classes = classes
    elif hasattr(model, 'classes_'):
        model_classes = model.classes_
    else:
        return {"error": "No class labels available"}
    valid_indices = np.where(probabilities >= confidence_threshold)[0]
    if len(valid_indices) == 0:
        valid_indices = np.argsort(probabilities)[::-1][:3]
    top_indices = valid_indices[np.argsort(probabilities[valid_indices])[::-1]][:top_n]
    recommendations = []
    for idx in top_indices:
        if idx >= len(model_classes):
            continue
        job = model_classes[idx]
        confidence = float(probabilities[idx])
        required_skills = job_skill_map.get(job, set()) if job_skill_map else set()
        matching_skills = sorted(list(skill_set & required_skills))
        missing_skills = sorted(list(required_skills - skill_set))
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
    try:
        data = request.get_json()
        skills = data.get('skills', '')
        top_n = int(data.get('top_n', 1))
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
    try:
        if job_skill_map:
            job_roles = sorted(list(job_skill_map.keys()))
        elif classes is not None:
            job_roles = sorted(list(classes))
        else:
            job_roles = []
        return jsonify({"success": True, "job_roles": job_roles, "total": len(job_roles)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "models_loaded": models_loaded,
        "total_job_roles": len(classes) if classes is not None else 0
    })

@app.route('/api/model-info', methods=['GET'])
def model_info():
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