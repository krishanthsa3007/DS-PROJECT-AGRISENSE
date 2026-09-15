You are an expert full-stack developer, machine learning engineer,
data scientist, and UI/UX designer.

Build a complete, functional Data Science + Machine Learning web
application called:

AGRISENSE AI

Subtitle:

"Intelligent Crop Recommendation for Precision Agriculture"

This is a college-level Data Science project.

The project must combine:

Machine Learning
+
Data Science
+
React frontend
+
FastAPI backend
+
Professional dark agricultural UI

============================================================
1. CORE OBJECTIVE
============================================================

The PRIMARY and NON-NEGOTIABLE purpose of this project is:

AI/ML-based CROP RECOMMENDATION.

The system should recommend the most suitable crop based on
soil and environmental conditions.

The core user workflow is:

User enters field conditions
        ↓
Data validation
        ↓
Machine Learning model
        ↓
Crop prediction
        ↓
Prediction probability
        ↓
Top alternative crops
        ↓
Feature importance / model explanation
        ↓
Agricultural recommendation

The core input features should be:

1. Nitrogen (N)
2. Phosphorus (P)
3. Potassium (K)
4. Temperature
5. Humidity
6. Soil pH
7. Rainfall

The target:

Crop / Crop Label

DO NOT replace the ML crop recommendation system with
hardcoded recommendations.

DO NOT create a frontend-only simulation.

DO NOT use fake prediction values.

============================================================
2. REFERENCE PROJECT
============================================================

Use the following GitHub repository as a conceptual reference:

https://github.com/KDS2383/earth-bloom-precision-agri

Study its overall concept and agricultural application structure.

The reference project includes concepts such as:

- Crop recommendation
- Soil information
- Weather information
- Agricultural analytics
- Precision agriculture
- Dashboard-style UI

IMPORTANT:

Do NOT clone the project.

Do NOT copy its source code.

Do NOT copy its branding.

Do NOT copy its exact UI.

Do NOT use "EarthBloom" as the project name.

Create an ORIGINAL application inspired by the same general
precision-agriculture concept.

The final UI should feel like a modern agricultural analytics
platform rather than a clone.

============================================================
3. PROJECT NAME AND BRANDING
============================================================

Project name:

AgriSense AI

Use an original agricultural + AI visual identity.

Possible branding concept:

leaf / crop / field + AI/data visualization.

Do not use copyrighted logos.

The visual identity should communicate:

Agriculture
+
Artificial Intelligence
+
Data Science
+
Precision Farming

============================================================
4. DATASET REQUIREMENTS
============================================================

The project MUST use a real publicly available dataset.

DO NOT generate a fake dataset.

DO NOT create synthetic training data merely to make the
accuracy higher.

The dataset may come from:

- Kaggle
- UCI Machine Learning Repository
- Government open-data portals
- Other reputable open agricultural-data sources

The dataset source must be documented in README.md.

============================================================
5. DATASET SELECTION PRINCIPLE
============================================================

Do NOT select a dataset simply because it gives a high accuracy.

Select a dataset based on:

1. Relevance to crop recommendation
2. Data quality
3. Number of samples
4. Number of crop classes
5. Feature availability
6. Data completeness
7. Reliability of the source
8. Documentation
9. Licensing / usage permission
10. Suitability for supervised machine learning

The preferred feature structure is:

N
P
K
temperature
humidity
ph
rainfall
label

However, if the selected legitimate dataset uses different
column names, create a clean preprocessing/mapping layer rather
than changing the original dataset.

============================================================
6. DATASET PROVIDED BY USER
============================================================

The user will place the chosen dataset inside:

backend/data/

For example:

backend/data/Crop_recommendation.csv

The application should use the provided dataset.

DO NOT automatically download a random dataset from the internet.

DO NOT replace the user's dataset.

DO NOT overwrite the dataset.

If the dataset is missing, display a clear setup error explaining:

"Place the crop recommendation CSV inside backend/data/"

The dataset source should be documented in README.md.

README must include:

- Dataset name
- Dataset source
- Dataset URL
- Dataset size
- Features
- Target
- Number of classes
- License information if available
- Any preprocessing performed

============================================================
7. DATA SCIENCE PIPELINE
============================================================

The project must clearly demonstrate a complete Data Science
workflow.

The pipeline is:

DATA COLLECTION
        ↓
DATA VALIDATION
        ↓
DATA CLEANING
        ↓
EXPLORATORY DATA ANALYSIS
        ↓
FEATURE / TARGET SEPARATION
        ↓
TRAIN / TEST SPLIT
        ↓
MODEL TRAINING
        ↓
MODEL EVALUATION
        ↓
MODEL COMPARISON
        ↓
BEST MODEL SELECTION
        ↓
MODEL SERIALIZATION
        ↓
API PREDICTION
        ↓
WEB VISUALIZATION

Do not skip the Data Science component.

============================================================
8. DATA VALIDATION
============================================================

The training script must check:

- Missing values
- Duplicate rows
- Invalid numerical values
- Incorrect data types
- Class distribution
- Feature ranges
- Number of samples
- Number of classes

Print a clear dataset summary during training.

Example:

Dataset loaded successfully

Samples: XXXX
Features: 7
Classes: XX

Missing values: 0
Duplicate rows: XX

============================================================
9. DATA PREPROCESSING
============================================================

Implement appropriate preprocessing.

Depending on the dataset:

- Handle missing values appropriately
- Handle duplicates appropriately
- Encode the target labels
- Scale features when required by the algorithm

IMPORTANT:

Do not blindly apply scaling to every model.

For example:

Logistic Regression and KNN may benefit from scaling.

Decision Trees and Random Forest generally do not require
feature scaling.

Use scikit-learn Pipelines where appropriate.

============================================================
10. TRAIN / TEST SPLIT
============================================================

Use:

80% training
20% testing

Use stratification where appropriate.

Use a fixed random_state for reproducibility.

Example:

random_state = 42

============================================================
11. MACHINE LEARNING MODELS
============================================================

Train and compare multiple classification algorithms.

At minimum:

1. Logistic Regression
2. Decision Tree
3. Random Forest
4. K-Nearest Neighbors

Optionally include:

5. Support Vector Machine

Do NOT assume Random Forest is automatically the best model.

Actually train and evaluate the models.

============================================================
12. MODEL EVALUATION
============================================================

Evaluate every model using:

- Accuracy
- Precision
- Recall
- F1-score

Use appropriate averaging such as:

macro
or
weighted

depending on the dataset's class distribution.

Generate a comparison table:

Model
Accuracy
Precision
Recall
F1-score

Example:

Model              Accuracy    Precision    Recall    F1
-----------------------------------------------------------
Logistic Regression
Decision Tree
Random Forest
KNN

Use the actual calculated values.

DO NOT hardcode metrics.

DO NOT invent metrics.

============================================================
13. BEST MODEL SELECTION
============================================================

Select the best model based on actual evaluation results.

If Random Forest performs best, use Random Forest.

If another model performs better, use that model.

The final model selection must be data-driven.

If Random Forest is selected, use a sensible configuration.

For example:

n_estimators = 200

Make important parameters configurable.

Do not unnecessarily use thousands of trees.

============================================================
14. MODEL SERIALIZATION
============================================================

Save the selected model using joblib.

Location:

backend/models/crop_model.joblib

Also save:

backend/models/model_metadata.json

Metadata should include:

- Selected model
- Accuracy
- Precision
- Recall
- F1-score
- Feature names
- Crop classes
- Dataset size
- Train/test sizes
- Random state
- Training date

Also save model comparison metrics.

============================================================
15. FEATURE IMPORTANCE
============================================================

If the selected model supports feature importance,
calculate and store feature importance.

For example:

Nitrogen
Phosphorus
Potassium
Temperature
Humidity
pH
Rainfall

If the selected algorithm does not naturally support
feature importance, do not fabricate it.

Instead use an appropriate explainability method or clearly
state that feature importance is unavailable.

The frontend should visualize the available feature importance
information.

============================================================
16. PREDICTION CONFIDENCE
============================================================

When the selected model supports probability prediction,
return class probabilities.

Show:

Recommended Crop
+
Confidence
+
Top 3 predictions

Example:

Rice — 94.2%
Maize — 3.1%
Jute — 1.4%

These numbers MUST come from:

model.predict_proba()

or an appropriate equivalent.

Never fabricate confidence values.

If the model does not provide probabilities, clearly communicate
that probability output is unavailable rather than inventing it.

============================================================
17. BACKEND TECHNOLOGY
============================================================

Use:

Python
FastAPI
Pydantic
pandas
numpy
scikit-learn
joblib
Uvicorn

Do NOT use:

Streamlit
Flask
Django

============================================================
18. BACKEND STRUCTURE
============================================================

Create:

backend/
│
├── app/
│   ├── main.py
│   │
│   ├── routes/
│   │   ├── prediction.py
│   │   ├── model.py
│   │   └── health.py
│   │
│   ├── schemas/
│   │   └── prediction.py
│   │
│   ├── services/
│   │   ├── predictor.py
│   │   └── model_service.py
│   │
│   └── utils/
│
├── data/
│   └── Crop_recommendation.csv
│
├── models/
│   ├── crop_model.joblib
│   ├── model_metadata.json
│   └── model_metrics.json
│
├── train_model.py
├── evaluate_model.py
├── requirements.txt
└── README.md

============================================================
19. FASTAPI ENDPOINTS
============================================================

Create:

GET /api/health

Returns:

{
    "status": "healthy"
}

------------------------------------------------------------

GET /api/model-info

Returns:

- model name
- accuracy
- precision
- recall
- F1
- dataset size
- number of classes
- feature names

------------------------------------------------------------

GET /api/model-comparison

Returns actual evaluation results for all trained models.

------------------------------------------------------------

POST /api/predict

Request:

{
    "N": 90,
    "P": 42,
    "K": 43,
    "temperature": 24.5,
    "humidity": 78,
    "ph": 6.4,
    "rainfall": 210
}

Response should include:

{
    "recommended_crop": "rice",
    "confidence": 0.942,
    "top_predictions": [],
    "feature_importance": {},
    "input": {}
}

Use Pydantic validation.

============================================================
20. INPUT VALIDATION
============================================================

Validate:

Nitrogen
Phosphorus
Potassium
Temperature
Humidity
pH
Rainfall

Reject:

- Missing values
- Non-numeric values
- Negative nutrient values
- Humidity outside reasonable bounds
- pH outside 0-14
- Invalid rainfall
- Other clearly impossible values

However, avoid overly restrictive agricultural assumptions
unless justified by the dataset.

Return useful validation errors.

============================================================
21. FRONTEND TECHNOLOGY
============================================================

Use:

React
TypeScript
Vite
Tailwind CSS
React Router
Axios
Lucide React
Recharts

Do NOT use Streamlit.

============================================================
22. FRONTEND STRUCTURE
============================================================

Create:

frontend/
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── MetricCard.tsx
│   │   ├── InputField.tsx
│   │   ├── PredictionCard.tsx
│   │   ├── ProbabilityChart.tsx
│   │   ├── FeatureImportanceChart.tsx
│   │   ├── ModelMetrics.tsx
│   │   ├── LoadingState.tsx
│   │   └── ErrorState.tsx
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Recommendation.tsx
│   │   ├── SoilData.tsx
│   │   ├── Weather.tsx
│   │   ├── ModelInsights.tsx
│   │   └── About.tsx
│   │
│   ├── services/
│   │   ├── api.ts
│   │   └── weatherService.ts
│   │
│   ├── types/
│   │   └── prediction.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
└── package.json

============================================================
23. UI DESIGN
============================================================

The UI should be INSPIRED by the general visual language of:

EarthBloom precision agriculture project

but must be ORIGINAL.

Do not reproduce the exact layout.

The application should look like:

Modern AI dashboard
+
Precision agriculture platform
+
Professional SaaS analytics application

============================================================
24. DARK THEME
============================================================

The application must use a dark theme by default.

Visual direction:

Dark charcoal / near-black background

Dark green secondary surfaces

Agricultural green accent

Subtle lime highlights

Off-white text

Muted gray-green secondary text

Use green strategically.

Do NOT make everything green.

Avoid excessive neon.

Avoid excessive glassmorphism.

Avoid excessive animations.

The design should feel:

Professional
Technical
Clean
Modern
Agricultural
Data-driven

============================================================
25. NAVIGATION
============================================================

Create a responsive navbar.

Brand:

AgriSense AI

Navigation:

Home
Recommendation
Soil Data
Weather
Model Insights
About

Use Lucide icons.

Desktop:

horizontal navigation

Mobile:

hamburger menu

============================================================
26. HOME PAGE
============================================================

Hero title:

"Smarter Crop Decisions with AI"

Subtitle:

"Analyze soil and environmental conditions to discover the crop
best suited to your field."

Primary CTA:

"Get Crop Recommendation"

Secondary CTA:

"Explore Model"

Below hero show:

AI Crop Recommendation
Soil Analytics
Environmental Insights
Model Explainability

Then:

HOW IT WORKS

Input Field Data
        ↓
Validate Data
        ↓
Machine Learning Model
        ↓
Probability Analysis
        ↓
Crop Recommendation

============================================================
27. RECOMMENDATION PAGE
============================================================

This is the PRIMARY page.

Use a sophisticated two-column layout.

LEFT:

FIELD INPUTS

Nitrogen
Phosphorus
Potassium
Temperature
Humidity
Soil pH
Rainfall

Each input should include:

- label
- unit
- validation
- tooltip/help text

Primary button:

"Analyze Field"

RIGHT:

Prediction panel.

Before prediction show:

"Enter field conditions to generate an AI recommendation."

During prediction:

Show a short professional loading sequence:

Validating field data...
Analyzing environmental conditions...
Generating crop recommendation...

Then show results.

============================================================
28. PREDICTION RESULT
============================================================

Display a prominent result card.

Example:

RECOMMENDED CROP

Rice

94.2%

Model Confidence

Then:

WHY THIS RECOMMENDATION?

Explain that the model identifies patterns in the submitted
soil and environmental conditions that are associated with the
predicted crop in the training dataset.

Do NOT claim the model is a replacement for an agricultural expert.

============================================================
29. TOP ALTERNATIVES
============================================================

Display the top 3 predictions.

Example:

Rice       94.2%
Maize       2.8%
Jute        1.7%

Use elegant horizontal probability bars.

============================================================
30. FIELD SUMMARY
============================================================

Show the submitted values:

Nitrogen
Phosphorus
Potassium
Temperature
Humidity
pH
Rainfall

Use compact metric cards.

============================================================
31. MODEL EXPLANATION
============================================================

Display:

"What influenced the model?"

Use a horizontal bar chart for feature importance
when available.

Example:

Humidity       ███████████
Rainfall       █████████
Nitrogen       ███████
Temperature    █████
pH             ████

Use actual model-derived values.

============================================================
32. SOIL DATA PAGE
============================================================

Create an agricultural soil analytics page.

Display:

Nitrogen
Phosphorus
Potassium
pH

Use:

metric cards
progress indicators
simple visualizations

Show the latest values from the user's last prediction if
available.

Do not claim these values come from physical sensors.

============================================================
33. WEATHER PAGE
============================================================

Create a weather/environment page.

The CORE crop recommendation system must NOT depend on an
external weather API.

Initially allow:

Temperature
Humidity
Rainfall

to be entered manually or displayed from the latest prediction.

Also create the architecture for optional weather API support.

============================================================
34. OPTIONAL WEATHER API
============================================================

External weather integration is OPTIONAL.

Do NOT require an API key for the core application.

If implemented, isolate it inside:

frontend/src/services/weatherService.ts

Use environment variables for API keys.

Example:

VITE_WEATHER_API_KEY=

Do not hardcode API keys.

The application should continue to work even if the weather API
is unavailable.

The manual input workflow must remain functional.

============================================================
35. MODEL INSIGHTS PAGE
============================================================

This page must demonstrate the Data Science component.

Display:

Best Model
Accuracy
Precision
Recall
F1-score

Then:

MODEL COMPARISON

Table:

Model
Accuracy
Precision
Recall
F1

Include:

Logistic Regression
Decision Tree
Random Forest
KNN

Use actual values generated during training.

============================================================
36. DATASET INFORMATION
============================================================

Display:

Dataset source
Number of samples
Number of features
Number of crop classes

Feature list:

N
P
K
Temperature
Humidity
pH
Rainfall

Target:

Crop

Also explain:

"The model learns relationships between environmental/soil
conditions and crop labels from the training dataset."

============================================================
37. MODEL INSIGHTS
============================================================

Show:

Feature importance

Model performance

Dataset statistics

Class count

Training samples

Testing samples

This page should make it obvious that the project is a genuine
Data Science application.

============================================================
38. ABOUT PAGE
============================================================

Include:

PROBLEM STATEMENT

Farmers must consider soil nutrients and environmental
conditions when selecting crops. Selecting an unsuitable crop
can reduce productivity and inefficiently use resources.

PROPOSED SOLUTION

AgriSense AI applies supervised machine learning to recommend
a suitable crop based on soil and environmental features.

TECHNOLOGY STACK

Python
Pandas
NumPy
Scikit-learn
FastAPI
React
TypeScript
Tailwind CSS

============================================================
39. LOCAL NETWORK SUPPORT
============================================================

The application must NOT use Streamlit.

It must run as:

React frontend
+
FastAPI backend

Frontend must listen on:

0.0.0.0:5173

Configure Vite accordingly.

Backend must listen on:

0.0.0.0:8000

Run:

uvicorn app.main:app --host 0.0.0.0 --port 8000

The frontend should be accessible locally through:

http://localhost:5173

and through another device on the same network using:

http://<HOST-PC-IP>:5173

The backend should be accessible through:

http://<HOST-PC-IP>:8000

============================================================
40. API CONFIGURATION
============================================================

Do NOT hardcode localhost throughout the frontend.

Create:

frontend/.env.example

with:

VITE_API_URL=http://localhost:8000

Use the environment variable in Axios.

For LAN usage:

VITE_API_URL=http://<HOST-PC-IP>:8000

Document this clearly.

============================================================
41. CORS
============================================================

Configure FastAPI CORS.

Allow local development:

http://localhost:5173
http://127.0.0.1:5173

Document how to allow the LAN frontend address.

============================================================
42. ERROR HANDLING
============================================================

If backend is unavailable:

Display:

"Prediction service is unavailable."

Do not crash the application.

If prediction fails:

Show a clean error message.

Do not expose Python stack traces.

If dataset is missing:

Display a clear backend startup/training message.

============================================================
43. LOADING STATES
============================================================

Use:

Skeleton loaders
Spinners
Progress states

Prediction loading should communicate:

Validating
Analyzing
Predicting

Keep animations subtle.

============================================================
44. RESPONSIVE DESIGN
============================================================

Support:

Desktop
Laptop
Tablet
Mobile

The recommendation page should become a single-column layout
on smaller screens.

Charts must remain readable.

Navigation must become a mobile menu.

============================================================
45. ACCESSIBILITY
============================================================

Use:

Semantic HTML
Proper labels
Keyboard navigation
ARIA labels where appropriate
Good contrast

============================================================
46. PROJECT FILES
============================================================

Create:

README.md

docs/
├── architecture.md
├── ml_pipeline.md
└── api.md

backend/
├── requirements.txt
├── train_model.py
└── evaluate_model.py

frontend/
└── package.json

Also create:

.env.example

.gitignore

============================================================
47. WINDOWS STARTUP
============================================================

Because the primary development environment is Windows,
provide commands compatible with Windows.

Backend:

cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

Train:

python train_model.py

Run:

uvicorn app.main:app --host 0.0.0.0 --port 8000

Frontend:

cd frontend

npm install

npm run dev -- --host 0.0.0.0

============================================================
48. OPTIONAL STARTUP SCRIPTS
============================================================

If practical, create:

start_backend.bat
start_frontend.bat

These should simplify startup but should not be required.

============================================================
49. SECURITY
============================================================

Do not commit:

API keys
passwords
secrets
tokens

Use:

.env

for local secrets.

Provide:

.env.example

with placeholder values.

============================================================
50. CODE QUALITY
============================================================

Use modular architecture.

Do NOT place everything inside:

App.tsx

Do NOT create giant Python files.

Use reusable components.

Use meaningful names.

Use TypeScript types.

Use Pydantic models.

Keep business logic separate from API routes.

Keep ML logic separate from FastAPI routes.

============================================================
51. NO FAKE FEATURES
============================================================

Every major UI feature must have real functionality.

"Analyze Field"
→ real API request
→ real ML model
→ real prediction

"Model Insights"
→ real trained model metrics

"Feature Importance"
→ real model-derived information

"Reset"
→ reset form

Navigation
→ actual React routes

Do not create empty buttons.

============================================================
52. NO FAKE ACCURACY
============================================================

Never hardcode:

99%
98%
95%

or any other performance number.

All metrics must come from actual model evaluation.

============================================================
53. NO FAKE AGRICULTURAL CLAIMS
============================================================

Do not say:

"This crop will definitely produce the highest yield."

Instead say:

"The model predicts this crop as the most suitable among the
classes represented in the training dataset."

Clearly state that the system is a decision-support tool and
not a substitute for professional agricultural advice.

============================================================
54. FUTURE EXTENSIONS
============================================================

Document these as future improvements rather than making the
initial project unnecessarily complex:

1. Real-time weather API
2. Soil sensor integration
3. SoilGrids / soil-data integration
4. Crop disease detection
5. Leaf-image CNN
6. Yield prediction
7. Irrigation recommendation
8. Satellite imagery
9. Geographic field mapping
10. Historical prediction tracking

The current implementation must remain focused on:

CROP RECOMMENDATION.

============================================================
55. FINAL ARCHITECTURE
============================================================

The final architecture should be:

                  AGRISENSE AI
                       │
                       ▼
              ┌─────────────────┐
              │ React + Vite    │
              │ TypeScript      │
              │ Tailwind CSS    │
              └────────┬────────┘
                       │
                       │ HTTP / JSON
                       ▼
              ┌─────────────────┐
              │ FastAPI         │
              │ REST API        │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Prediction      │
              │ Service         │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Scikit-learn   │
              │ Trained Model  │
              └────────┬────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Crop Prediction │
              │ Probability     │
              │ Explanation     │
              └─────────────────┘

============================================================
56. DEVELOPMENT PROCESS
============================================================

Build the project in the following order:

PHASE 1
Project structure

PHASE 2
Dataset loading and validation

PHASE 3
ML training pipeline

PHASE 4
Model comparison and evaluation

PHASE 5
Model serialization

PHASE 6
FastAPI backend

PHASE 7
API testing

PHASE 8
React frontend

PHASE 9
Dark agricultural UI

PHASE 10
Frontend/backend integration

PHASE 11
Model insights visualization

PHASE 12
Responsive design

PHASE 13
LAN configuration

PHASE 14
Final testing

Do not move to the next major phase while the previous phase
contains unresolved errors.

============================================================
57. FINAL TESTING REQUIREMENTS
============================================================

Before declaring the project complete:

1. Confirm dataset loads.
2. Confirm preprocessing works.
3. Confirm all models train.
4. Confirm metrics are generated.
5. Confirm best model is selected.
6. Confirm model is saved.
7. Confirm FastAPI starts.
8. Confirm /api/health works.
9. Confirm /api/model-info works.
10. Confirm /api/model-comparison works.
11. Confirm /api/predict works.
12. Confirm frontend starts.
13. Confirm frontend communicates with backend.
14. Confirm crop prediction works.
15. Confirm invalid inputs are handled.
16. Confirm backend failure is handled.
17. Confirm charts render.
18. Confirm responsive layout.
19. Confirm LAN configuration.
20. Confirm README instructions work.

============================================================
58. FINAL DELIVERABLE
============================================================

Deliver a complete working project.

The final project must contain:

✓ Real dataset support
✓ Data preprocessing
✓ EDA/statistics
✓ Multiple ML models
✓ Model comparison
✓ Best-model selection
✓ Saved trained model
✓ FastAPI backend
✓ React frontend
✓ Dark agricultural UI
✓ Crop recommendation
✓ Prediction probability
✓ Top-3 alternatives
✓ Feature importance
✓ Model metrics
✓ Responsive design
✓ LAN support
✓ Documentation
✓ Optional weather API architecture

Do not leave major TODOs.

Do not use placeholder predictions.

Do not use fake datasets.

Do not use fake model metrics.

Do not use Streamlit.

The finished system must actually be capable of taking:

N
P
K
Temperature
Humidity
pH
Rainfall

and returning a machine-learning-based crop recommendation.

============================================================
59. FINAL PROJECT PHILOSOPHY
============================================================

The application should look impressive, but the ML system is
more important than visual effects.

Prioritize:

1. Correctness
2. Real machine learning
3. Data quality
4. Explainability
5. Clean architecture
6. Good UX
7. Visual polish

The final project should be something that can be demonstrated
to a college faculty member as a genuine Data Science project,
not merely a frontend agriculture dashboard.