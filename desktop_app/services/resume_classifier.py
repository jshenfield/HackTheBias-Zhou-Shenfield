import joblib
from utils.path_helper import resource_path

model = joblib.load(
    resource_path("model/resume_classifier_svm.joblib")
)

def is_resume(text: str) -> bool:
    return bool(model.predict([text])[0])
