from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import sys
from model_loader import model

app = Flask(__name__, static_folder='../', static_url_path='')
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return send_from_directory('../', 'index.html')

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('../css', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('../js', path)

@app.route('/api/predict', methods=['POST'])
def predict():
    """Endpoint to get career recommendations"""
    try:
        data = request.get_json()
        skills = data.get('skills', '')
        top_n = int(data.get('top_n', 5))
        
        if not skills:
            return jsonify({"error": "No skills provided"}), 400
        
        recommendations = model.predict(skills, top_n=top_n)
        
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
        job_roles = model.get_all_job_roles()
        return jsonify({
            "success": True,
            "job_roles": job_roles
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/job-details/<job_role>', methods=['GET'])
def get_job_details(job_role):
    """Get details for a specific job role"""
    try:
        skills = model.get_skills_for_job(job_role)
        similar_jobs = model.get_similar_jobs(job_role)
        
        return jsonify({
            "success": True,
            "job_role": job_role,
            "required_skills": skills,
            "similar_jobs": similar_jobs,
            "total_skills": len(skills)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model_loaded": True,
        "total_job_roles": len(model.get_all_job_roles())
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)