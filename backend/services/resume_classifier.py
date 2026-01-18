# services/resume_classifier.py

import joblib
from pathlib import Path

MODEL_PATH = Path("models/resume_classifier_svm.joblib")

class ResumeClassifier:
    def __init__(self):
        # Load once at startup
        self.model = joblib.load(MODEL_PATH)

    def predict(self, text: str) -> bool:
        """
        Returns:
            True  -> resume
            False -> noise
        """
        if not text or not text.strip():
            return False

        prediction = self.model.predict([text])[0]

        # Ensure strict boolean
        return bool(prediction)


# Singleton instance (important for performance)
classifier = ResumeClassifier()
