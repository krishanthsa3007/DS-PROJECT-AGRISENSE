import React, { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Info } from 'lucide-react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/Home';
import RecommendationPage from './pages/Recommendation';
import SoilDataPage from './pages/SoilData';
import WeatherPage from './pages/Weather';
import InsightsPage from './pages/Insights';
import AboutPage from './pages/About';

// ─── API ──────────────────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: { 'Content-Type': 'application/json' },
});

const getApiErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const detail = (error as AxiosError<{ detail?: string | { msg?: string }[] }>)
      .response?.data?.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail))
      return detail.map(item => item.msg).filter(Boolean).join(', ') || fallback;
    if (error.response) return `API request failed (${error.response.status}).`;
    if (error.request)
      return 'No response from the prediction API. Confirm FastAPI is running at http://localhost:8000.';
  }
  return fallback;
};

// ─── TYPES & CONSTANTS ────────────────────────────────────────────────────────

export interface FieldDefinition {
  key: 'N' | 'P' | 'K' | 'temperature' | 'humidity' | 'ph' | 'rainfall';
  label: string;
  unit: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  icon: string;
  note: string;
  description: string;
  category: 'soil' | 'weather';
}

export const FIELDS: FieldDefinition[] = [
  {
    key: 'N', label: 'Nitrogen (N)', unit: 'kg/ha', defaultValue: 90,
    min: 0, max: 140, step: 1, icon: 'N',
    note: 'Essential for vegetative leaf & stem growth',
    description: 'Primary macronutrient supporting chlorophyll production and overall plant vigor.',
    category: 'soil',
  },
  {
    key: 'P', label: 'Phosphorus (P)', unit: 'kg/ha', defaultValue: 42,
    min: 5, max: 145, step: 1, icon: 'P',
    note: 'Critical for root development & flowering',
    description: 'Promotes early root establishment, seed development, and cellular energy transfer.',
    category: 'soil',
  },
  {
    key: 'K', label: 'Potassium (K)', unit: 'kg/ha', defaultValue: 43,
    min: 5, max: 205, step: 1, icon: 'K',
    note: 'Enhances disease resistance & water regulation',
    description: 'Regulates stomatal opening, enzyme activation, and drought tolerance.',
    category: 'soil',
  },
  {
    key: 'temperature', label: 'Temperature', unit: '°C', defaultValue: 24.5,
    min: 8, max: 50, step: 0.1, icon: '°C',
    note: 'Ambient seasonal temperature range',
    description: 'Thermal conditions influencing germination rates and metabolic process velocity.',
    category: 'weather',
  },
  {
    key: 'humidity', label: 'Relative Humidity', unit: '%', defaultValue: 78,
    min: 14, max: 100, step: 1, icon: '%',
    note: 'Atmospheric moisture level',
    description: 'Determines transpiration rates and vapor pressure deficit for foliage.',
    category: 'weather',
  },
  {
    key: 'ph', label: 'Soil pH', unit: 'pH', defaultValue: 6.4,
    min: 3.5, max: 10.0, step: 0.1, icon: 'pH',
    note: 'Soil acidity / alkalinity level',
    description: 'Governs nutrient availability and microbial ecosystem activity in the root zone.',
    category: 'soil',
  },
  {
    key: 'rainfall', label: 'Seasonal Rainfall', unit: 'mm', defaultValue: 210,
    min: 20, max: 300, step: 1, icon: 'mm',
    note: 'Annual / seasonal precipitation total',
    description: 'Primary water supply index determining soil moisture reserve capability.',
    category: 'weather',
  },
];

export type FieldKey = FieldDefinition['key'];

export interface PredictionResult {
  recommended_crop: string;
  confidence: number;
  top_predictions: { crop: string; probability: number }[];
  feature_importance: Record<string, number>;
  input: Record<string, number>;
}

export interface ModelMetadata {
  selected_model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  dataset_size: number;
  number_of_classes: number;
  training_samples: number;
  testing_samples: number;
  feature_names: string[];
  feature_importance: Record<string, number>;
  crop_classes?: string[];
}

export type Theme = 'system' | 'light' | 'dark';

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<string>('Home');

  // Form state: keeps string values to allow empty-field typing without forcing 0
  const [formState, setFormState] = useState<Record<FieldKey, string>>(
    () => Object.fromEntries(FIELDS.map(f => [f.key, String(f.defaultValue)])) as Record<FieldKey, string>
  );

  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [modelInfo, setModelInfo]               = useState<ModelMetadata | null>(null);
  const [modelComparison, setModelComparison]   = useState<Record<string, Record<string, number>>>({});
  const [metricTab, setMetricTab]               = useState<string>('f1_score');
  const [loading, setLoading]                   = useState<boolean>(false);
  const [errorMessage, setErrorMessage]         = useState<string>('');

  // ── Theme ──────────────────────────────────────────────────────────────────
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('agrisense-theme') as Theme) || 'system'
  );

  const resolvedTheme = useMemo<'light' | 'dark'>(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  // Sync system preference changes in real time
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (mq.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('agrisense-theme', theme);
  }, [resolvedTheme, theme]);

  // ── Initial data fetch ─────────────────────────────────────────────────────
  useEffect(() => {
    api
      .get('/api/health')
      .then(() => api.get('/api/model-info'))
      .then(res => setModelInfo(res.data))
      .catch(err =>
        setErrorMessage(
          getApiErrorMessage(
            err,
            'Prediction service unavailable. Ensure the backend FastAPI server is running at http://localhost:8000.'
          )
        )
      );

    api
      .get('/api/model-comparison')
      .then(res => setModelComparison(res.data))
      .catch(err =>
        console.warn('Model comparison could not be loaded:', getApiErrorMessage(err, 'Unknown error'))
      );
  }, []);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const navigateTo = (destination: string) => {
    setPage(destination);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Form handlers ──────────────────────────────────────────────────────────
  const handleInputChange = (key: FieldKey, rawVal: string) => {
    setFormState(prev => ({ ...prev, [key]: rawVal }));
  };

  const handlePresetData = () => {
    setFormState({
      N: '90', P: '42', K: '43',
      temperature: '24.5', humidity: '78', ph: '6.4', rainfall: '210',
    });
    setErrorMessage('');
  };

  const handleResetForm = () => {
    setFormState(
      Object.fromEntries(FIELDS.map(f => [f.key, String(f.defaultValue)])) as Record<FieldKey, string>
    );
    setPredictionResult(null);
    setErrorMessage('');
  };

  const handleAnalyzeField = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation
    const numericPayload: Record<string, number> = {};
    for (const f of FIELDS) {
      const strVal = formState[f.key]?.trim() ?? '';
      if (strVal === '') {
        setErrorMessage(`Please enter a valid numeric value for ${f.label}.`);
        return;
      }
      const numVal = Number(strVal);
      if (!Number.isFinite(numVal)) {
        setErrorMessage(`Invalid number format for ${f.label}.`);
        return;
      }
      numericPayload[f.key] = numVal;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/predict', numericPayload);
      setPredictionResult(response.data);
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, 'Failed to receive recommendation from API. Please verify backend status.')
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Derived state ──────────────────────────────────────────────────────────
  const activeImportance = predictionResult?.feature_importance || modelInfo?.feature_importance || {};

  // ── Page renderer ──────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (page) {
      case 'Recommendation':
        return (
          <RecommendationPage
            formState={formState}
            predictionResult={predictionResult}
            loading={loading}
            onInputChange={handleInputChange}
            onPresetData={handlePresetData}
            onReset={handleResetForm}
            onSubmit={handleAnalyzeField}
          />
        );
      case 'Soil Data':
        return (
          <SoilDataPage
            formState={formState}
            predictionResult={predictionResult}
          />
        );
      case 'Weather':
        return (
          <WeatherPage
            formState={formState}
            predictionResult={predictionResult}
          />
        );
      case 'Model Insights':
        return (
          <InsightsPage
            modelInfo={modelInfo}
            modelComparison={modelComparison}
            activeImportance={activeImportance}
            metricTab={metricTab}
            onMetricTabChange={setMetricTab}
          />
        );
      case 'About':
        return <AboutPage onNavigate={navigateTo} />;
      default:
        return (
          <HomePage
            modelInfo={modelInfo}
            modelComparison={modelComparison}
            activeImportance={activeImportance}
            onNavigate={navigateTo}
          />
        );
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Header
        page={page}
        theme={theme}
        onNavigate={navigateTo}
        onThemeChange={setTheme}
      />

      {/* Global error banner */}
      {errorMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] max-w-lg w-[calc(100%-2rem)]" role="alert">
          <div className="bg-error-container border border-error/30 text-on-error-container px-4 py-3 rounded-lg shadow-lg flex items-start gap-3">
            <Info size={20} className="shrink-0 mt-0.5 text-error" aria-hidden="true" />
            <span className="text-sm font-medium leading-relaxed">{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col w-full">
        {renderPage()}
      </div>

      <Footer onNavigate={navigateTo} />
    </div>
  );
}
