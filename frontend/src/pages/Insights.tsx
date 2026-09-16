import React from 'react';
import { Activity, Database } from 'lucide-react';
import InfluenceMap from '../components/InfluenceMap';
import type { ModelMetadata } from '../App';

interface InsightsPageProps {
  modelInfo: ModelMetadata | null;
  modelComparison: Record<string, Record<string, number>>;
  activeImportance: Record<string, number>;
  metricTab: string;
  onMetricTabChange: (tab: string) => void;
}

const formatPct = (v: number) => `${(v * 100).toFixed(1)}%`;

const InsightsPage: React.FC<InsightsPageProps> = ({
  modelInfo,
  modelComparison,
  activeImportance,
  metricTab,
  onMetricTabChange,
}) => {
  const METRIC_TABS: [string, string][] = [
    ['f1_score', 'F1 Score'],
    ['accuracy', 'Accuracy'],
    ['precision', 'Precision'],
    ['recall', 'Recall'],
  ];

  return (
    <main className="w-full pt-28 pb-20 bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-8">
        
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight mb-4">Model Evaluation & Analytics</h1>
          <p className="text-[16px] text-on-surface-variant max-w-2xl leading-relaxed">
            Verified performance metrics, comparative algorithm benchmarks, and feature
            decision influence maps from the trained classification model.
          </p>
        </div>

        {/* Model Summary Cards */}
        {modelInfo && (
          <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: 'Selected Model',  value: modelInfo.selected_model, sub: 'Ensemble Classifier' },
              { title: 'Accuracy',        value: formatPct(modelInfo.accuracy),   sub: 'Validation Set' },
              { title: 'Precision',       value: formatPct(modelInfo.precision),  sub: 'Weighted Precision' },
              { title: 'Recall',          value: formatPct(modelInfo.recall),     sub: 'Weighted Sensitivity' },
              { title: 'F1 Score',        value: formatPct(modelInfo.f1_score),   sub: 'Harmonic Mean', highlight: true },
            ].map(({ title, value, sub, highlight }) => (
              <div key={title} className={`p-5 rounded-xl flex flex-col ${highlight ? 'bg-primary/10' : 'bg-surface-container'}`}>
                <span className="text-sm font-semibold text-on-surface-variant mb-1">{title}</span>
                <strong className={`text-2xl font-bold ${highlight ? 'text-primary' : 'text-on-surface'} mb-1`}>{value}</strong>
                <small className="text-[11px] text-outline font-medium uppercase tracking-wider">{sub}</small>
              </div>
            ))}
          </section>
        )}

        {/* Dataset Info */}
        {modelInfo && (
          <section className="bg-surface-container rounded-xl p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold text-on-surface">Dataset Overview</h2>
                <p className="text-sm text-on-surface-variant">Training data composition and split information.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Samples',    value: modelInfo.dataset_size?.toLocaleString() ?? '—', sub: 'Validated records' },
                { label: 'Crop Classes',     value: modelInfo.number_of_classes ?? '—',              sub: 'Unique crop types' },
                { label: 'Training Samples', value: modelInfo.training_samples?.toLocaleString() ?? '—', sub: '80% split' },
                { label: 'Testing Samples',  value: modelInfo.testing_samples?.toLocaleString()  ?? '—', sub: '20% split' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="flex flex-col pl-4">
                  <span className="text-sm font-semibold text-on-surface-variant">{label}</span>
                  <span className="text-xl font-bold text-on-surface my-1">{value}</span>
                  <span className="text-[11px] text-outline font-medium uppercase tracking-wider">{sub}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Algorithm Benchmark */}
          <section className="bg-surface-container rounded-xl p-8 shadow-lg">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-xl font-bold text-on-surface">Algorithm Benchmark Comparison</h2>
              <p className="text-sm text-on-surface-variant">Evaluation of multiple classification models trained on the agricultural dataset.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8 bg-surface-container-lowest p-1.5 rounded-lg w-fit">
              {METRIC_TABS.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`px-4 py-1.5 rounded text-[13px] font-semibold transition-colors ${metricTab === key ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant hover:bg-surface-container'}`}
                  onClick={() => onMetricTabChange(key)}
                  aria-pressed={metricTab === key}
                >
                  {label}
                </button>
              ))}
            </div>

            {Object.keys(modelComparison).length === 0 ? (
              <p className="text-sm text-on-surface-variant italic">
                Model comparison data is not available. Ensure the backend is running.
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                {Object.entries(modelComparison)
                  .sort(([, a], [, b]) => (b[metricTab] ?? 0) - (a[metricTab] ?? 0))
                  .map(([algoName, metricsObj], idx) => {
                    const scoreVal = metricsObj[metricTab] ?? 0;
                    return (
                      <div className="flex flex-col gap-2" key={algoName}>
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span className={`font-bold ${idx === 0 ? 'text-primary' : 'text-on-surface'}`}>{algoName}</span>
                          <span className="text-on-surface-variant">{formatPct(scoreVal)}</span>
                        </div>
                        <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden" role="progressbar" aria-valuenow={scoreVal * 100} aria-valuemin={0} aria-valuemax={100}>
                          <div className={`h-full ${idx === 0 ? 'bg-primary' : 'bg-tertiary/70'}`} style={{ width: formatPct(scoreVal) }} />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </section>

          {/* Feature Importance */}
          <section className="bg-surface-container rounded-xl p-8 shadow-lg">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-xl font-bold text-on-surface">Model Influence Map</h2>
              <p className="text-sm text-on-surface-variant">Relative feature weights derived from trained Random Forest decision tree splits.</p>
            </div>
            <InfluenceMap importance={activeImportance} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default InsightsPage;
