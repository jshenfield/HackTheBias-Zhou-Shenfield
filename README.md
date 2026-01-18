

#  HushHire

**Filter the noise. Silence the bias.**

HushHire is a bias-aware resume processing system built for the **“Hack the Bias”** hackathon under the theme **“Noise & Silence.”**
It identifies resume documents, removes bias-inducing signals, and produces fair, structured outputs for human or automated review.

The project includes:

* 🌐 A **web application** for interactive, single-resume processing
* 🖥️ A **desktop application** for batch, offline resume auditing
* 🧠 An **ML + LLM pipeline** that separates *signal* from *noise*

---

## 🎯 Problem Statement

Hiring systems are often influenced by:

* Names, locations, and photos
* Company prestige and school brand
* Resume writing style over actual capability

At the same time, **non-resume documents (“noise”)** can pollute automated pipelines.

**HushHire addresses both.**

---

## 💡 Core Idea

> **Filter the noise. Silence the bias.**

HushHire introduces a **two-stage pipeline**:

1. **Noise Filtering (Mandatory)**
   A machine-learning classifier detects whether a PDF is actually a resume.

2. **Bias Removal (User-Selected Mode)**

   * **Partial mode:** removes identity and location bias while preserving wording
   * **Full mode:** summarizes experience into a bias-reduced, structured format

---

## 🧠 System Architecture

```
PDF Input
   ↓
Resume vs Noise Classifier (SVM)
   ↓
Bias Removal Pipeline
   ├─ Partial: anonymization (verbatim)
   └─ Full: bias-free AI summary
   ↓
Structured + Human-Readable Output
```

---

## ⚙️ Features

### ✅ Noise Detection (Mandatory)

* Uses an in-house **SVM + TF-IDF** model
* Prevents non-resume PDFs from entering the pipeline

### ✅ Two Bias-Removal Modes

* **Remove name & location bias**

  * Preserves original wording
  * Replaces organizations with generic categories
* **Remove all bias (AI summary)**

  * Rewrites responsibilities into concise, neutral summaries
  * Focuses on skills, experience, and impact

### ✅ Generic Organization Normalization

Replaces brand and prestige signals with neutral categories:

* technology company
* hospital
* university
* student organization
* government organization
* nonprofit organization
* etc.

### ✅ Output Formats

* **JSON** (structured, machine-readable)
* **Markdown** (clean, human-readable)

---

## 🌐 Web Application

### Tech Stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **Backend:** FastAPI
* **ML:** scikit-learn
* **LLM:** OpenAI API

### Web Workflow

1. Upload a PDF
2. Resume vs noise detection
3. Select bias-removal mode
4. View results in a two-pane interface

### Key UX Decisions

* Noise filtering is **always on**
* Progress pipeline is always visible
* Results appear in a dedicated workspace (no layout jumping)

---

## 🖥️ Desktop Application (PyQt5)

### Why a Desktop App?

* Enables **batch processing**
* Keeps resumes **local and private**
* Useful for HR audits, research, and compliance

### Desktop Features

* Select a folder containing PDFs
* Automatically processes all PDFs
* Creates `hushhire_output/` inside the same folder
* Outputs `.json` and `.md` files per resume
* Live progress and status table

### Output Example

```
resumes/
├─ alice.pdf
├─ bob.pdf
└─ hushhire_output/
   ├─ alice.json
   ├─ alice.md
   ├─ bob.json
   └─ bob.md
```

---

## 📁 Repository Structure

```
HackTheBias-Zhou-Shenfield/
├─ frontend/            # Next.js web app
├─ backend/             # FastAPI backend
├─ desktop_app/         # PyQt5 desktop app
│  ├─ main.py
│  ├─ ui.py
│  ├─ workers/
│  ├─ services/
│  ├─ model/
│  └─ prompts/
└─ README.md
```

---

## 🚀 Running the Project

### Web App (Development)

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

---

### Desktop App (Development)

```bash
cd desktop_app
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

---

## 🏗️ Building the Desktop App (Windows)

Using **PyInstaller**:

```powershell
pyinstaller --onefile --windowed --name HushHire ^
  --hidden-import sklearn ^
  --hidden-import sklearn.svm ^
  --hidden-import sklearn.feature_extraction.text ^
  --add-data "model;model" ^
  --add-data "prompts;prompts" ^
  --add-data ".env;." ^
  main.py
```

Result:

```
dist/HushHire.exe
```

---

## ⚖️ Bias & Ethics Considerations

HushHire is designed with the following principles:

* **Bias mitigation, not bias masking**
* **No prestige inference**
* **Clear separation between signal and noise**
* **Transparency through structured output**
* **User choice between preservation and abstraction**

---

## 🏆 Hackathon Alignment

**Theme:** Hack the Bias
**Prompt:** Noise and Silence

HushHire:

* Silences bias-inducing signals
* Filters non-resume noise
* Surfaces meaningful signal fairly

---

## 📌 Future Improvements

* PDF/HTML report generation
* Side-by-side before/after comparison
* Explainability metadata (what was removed)
* Offline summarization fallback
* macOS `.app` build

---

## 👥 Team

Built by **Jack Shenfield & John Zhou**   
for Hack the Bias Hackathon

---

## 📄 License

This project is provided for hackathon and educational purposes.

---

