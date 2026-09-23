# SkyOps – AI-Powered Aviation Operations Platform

> **Academic Research Prototype (IDP – Semester 3)**  
> *Data Honesty Notice: All flight rosters, tail numbers, schedules, and delays are generated via reproducible simulation. SkyOps is a decision-support prototype and does not claim to represent live airport systems or superior commercial performance.*

SkyOps is an integrated aviation operations decision-support system designed to empower human operators across the full decision lifecycle:
$$\text{MONITOR} \longrightarrow \text{PREDICT} \longrightarrow \text{DETECT} \longrightarrow \text{RECOMMEND} \longrightarrow \text{SIMULATE} \longrightarrow \text{APPROVE}$$

---

## 1. Synthetic Data Generation Logic (`backend/generate_data.py`)

To ensure scientific rigor without relying on expensive or non-reproducible proprietary airport data feeds, flight operations data is generated using documented, domain-informed aviation rules with a fixed random seed (`seed = 42`).

### Generation Features & Domain Rules:
1. **Rotational Delay Propagation ($0.58 \times \text{previous\_delay}$)**: Downstream flights operated by late-arriving tail numbers inherit rotational ground delays.
2. **Temporal Peak Congestion ($+9.0\text{ min}$)**: Applied during standard hub rush banks:
   - Morning peak: 07:00 – 10:00
   - Evening peak: 17:00 – 21:00
3. **Weather Severity Index ($16.0 \times \text{weather\_severity}$)**: Modeled via Beta distribution ($\alpha=1.5, \beta=5.0$) reflecting low base probability of severe convective thunderstorms, fog, or high crosswinds.
4. **Origin Hub Congestion Index ($12.0 \times \text{origin\_congestion}$)**: Tailored to origin airports (e.g. BOM: 0.85, DEL: 0.75, LHR: 0.90, SIN: 0.40).
5. **Weekend Surge ($+4.0\text{ min}$)**: Travel volume spikes on Fridays and Sundays.
6. **Apron Movement Density ($0.35 \times \max(0, \text{hourly\_traffic} - 15)$)**: Hourly runway and taxiway occupancy load.
7. **Carrier Turnaround Bias**: Baseline airline turnaround variances (e.g., Wide-body international turns require 90m buffer vs 45m for domestic narrow-body).
8. **Stochastic Ground Handling Noise**: Gaussian noise $\mathcal{N}(0, 5.0\text{ min})$ representing apron baggage handling, fueling, and ATC hold variations.

### Reproducibility Command:
```bash
python backend/generate_data.py
```

---

## 2. Machine Learning Architecture (`backend/train_model.py`)

- **Binary Classification (Delay $\ge$ 15 min)**: `RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)` evaluated against a `DummyClassifier(strategy='most_frequent')` baseline.
- **Continuous Delay Regression (Minutes)**: `RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)` evaluated against a `DummyRegressor(strategy='mean')` baseline.
- **Held-Out Split**: 80% Train ($4,000$ records) / 20% Held-out Test ($1,000$ records).
- **Real Feature Importances**: Extracted directly from tree node Gini splits (`feature_importances_`) rather than subjective estimates.
- **Metrics Endpoint**: Published via `GET /api/metrics`. If the ML service is offline, the web app explicitly displays: *"Metrics unavailable – start the ML service"*.

---

## 3. Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, Lenis (Landing page only), Recharts, React Router v7.
- **Backend / ML**: Python 3.11, FastAPI, Uvicorn, Scikit-learn, Pandas, NumPy, Joblib.
- **Database & Auth**: Supabase PostgreSQL + Auth (with seamless local mock store fallback when offline or unconfigured).
- **Dual-Mode Engine Indicator**: Status chips in the app top bar show live status:
  - `ML service: connected / mock mode`
  - `Supabase: connected / mock mode`
  Every prediction and recommendation explicitly tags the producing engine (`ml_service` vs `mock_engine`).

---

## 4. Quick Start Instructions

### A. Frontend Setup
```bash
# Install dependencies
npm install

# Run Vite dev server
npm run dev
```
Open `http://localhost:5173` in your browser.

### B. Python ML Microservice Setup
```bash
# Install Python dependencies
pip install fastapi uvicorn scikit-learn pandas

# Train model & evaluate held-out test metrics
python backend/train_model.py

# Start FastAPI service
python backend/main.py
```
The ML service runs at `http://localhost:8000`.

### C. Environment Variables (`.env`)
```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_DEMO_MODE=true
VITE_ML_SERVICE_URL=http://localhost:8000
```
*(When `VITE_DEMO_MODE=true`, 1-click demo login buttons for Operator, Operations Manager, and Admin appear on the sign-in card).*

---

## 5. Design System

- **Page 1: Sign-In Landing (`/`)**: Sky-blue atmospheric gradient with realistic volumetric clouds, white airliner centerpiece, 4 floating telemetry thumbnails, 6-stage decision pipeline, frosted-glass sign-in card, and research gap context (Screenshot 1 LuxFly style).
- **Page 2: Home (`/home`)**: Golden dusk sky, floating pill navbar, operations search bar with route autocomplete, seeded airline marquee, staggered attention cards, airport KPI summary, and pending recommendations (Screenshot 2 Genesis style).
- **Operations App (`/app/*`)**: Enterprise dark navy theme (`#0B1220` base, `#111A2E` cards, `#3B82F6` accent) for serious airport apron decision support.

