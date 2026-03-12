# model_loader.py - Kept for compatibility
# The main loading logic is now in app.py

import pickle
import os

class CareerGuidanceModel:
    def __init__(self, model_path='models/'):
        """Initialize with model path"""
        self.model_path = model_path
        self.model = None
        self.vectorizer = None
        self.label_encoder = None
        self.job_skill_map = None
        
    def load(self):
        """Load all model components"""
        try:
            # Try complete model first
            complete_path = os.path.join(self.model_path, 'career_guidance_complete.pkl')
            if os.path.exists(complete_path):
                with open(complete_path, 'rb') as f:
                    components = pickle.load(f)
                    self.model = components.get('model')
                    self.vectorizer = components.get('vectorizer')
                    self.label_encoder = components.get('label_encoder')
                    self.job_skill_map = components.get('job_skill_map')
                return True
            
            # Try individual components
            model_path = os.path.join(self.model_path, 'job_recommender_model.pkl')
            vec_path = os.path.join(self.model_path, 'vectorizer.pkl')
            enc_path = os.path.join(self.model_path, 'label_encoder.pkl')
            map_path = os.path.join(self.model_path, 'job_skill_map.pkl')
            
            if all(os.path.exists(p) for p in [model_path, vec_path, enc_path, map_path]):
                with open(model_path, 'rb') as f:
                    self.model = pickle.load(f)
                with open(vec_path, 'rb') as f:
                    self.vectorizer = pickle.load(f)
                with open(enc_path, 'rb') as f:
                    self.label_encoder = pickle.load(f)
                with open(map_path, 'rb') as f:
                    self.job_skill_map = pickle.load(f)
                return True
            
            return False
        except Exception as e:
            print(f"Error loading model: {e}")
            return False