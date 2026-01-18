import joblib

model = joblib.load("model/resume_classifier_svm.joblib")

def is_resume(text: str) -> bool:
    return bool(model.predict([text])[0])
