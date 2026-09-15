import React, { useState } from 'react';
import {
  BrainCircuit, CloudRain, Layers,
  RotateCcw, CheckCircle2, ChevronRight, Activity, Sprout, ShieldCheck, Leaf
} from 'lucide-react';
import { FIELDS, type FieldKey, type PredictionResult } from '../App';

interface RecommendationPageProps {
  formState: Record<FieldKey, string>;
  predictionResult: PredictionResult | null;
  loading: boolean;
  onInputChange: (key: FieldKey, value: string) => void;
  onPresetData: () => void;
  onReset: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const formatPct = (v: number) => `${(v * 100).toFixed(1)}%`;

const LOADING_MESSAGES = [
  'Collecting field data…',
  'Analyzing soil conditions…',
  'Evaluating environmental factors…',
  'Running ML classification…',
  'Generating recommendation…',
];

const RecommendationPage: React.FC<RecommendationPageProps> = ({
  formState,
  predictionResult,
  loading,
  onInputChange,
  onPresetData,
  onReset,
  onSubmit,
}) => {
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  React.useEffect(() => {
    if (!loading) { setLoadingMsgIdx(0); return; }
    const interval = setInterval(() => {
      setLoadingMsgIdx(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 900);
    return () => clearInterval(interval);
  }, [loading]);

  const soilFields   = FIELDS.filter(f => f.category === 'soil');
  const weatherFields = FIELDS.filter(f => f.category === 'weather');

  return (
    <main className="w-full pt-28 pb-20 bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant/50 w-fit mb-4">
            <BrainCircuit size={13} className="text-primary" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-on-surface-variant">AI Field Analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight mb-4">Crop Recommendation Engine</h1>
          <p className="text-[16px] text-on-surface-variant max-w-2xl leading-relaxed">
            Enter your field's soil nutrients and environmental parameters to generate
            an AI-powered crop recommendation.
          </p>
        </div>

        {/* Step progress */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          {['Soil Conditions', 'Environment', 'Analyze', 'Recommendation'].map((label, i) => {
            const done = predictionResult && i < 3;
            const active = !predictionResult && !loading
              ? i < 2
              : loading
              ? i === 2
              : i === 3;
            return (
              <React.Fragment key={label}>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${active ? 'bg-primary/10 border-primary/30 text-primary' : done ? 'bg-surface-container border-outline-variant/50 text-on-surface' : 'bg-surface-container border-outline-variant/20 text-on-surface-variant'}`}>
                  <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-[11px] font-bold">
                    {done ? <CheckCircle2 size={12} className="text-primary" /> : i + 1}
                  </span>
                  <span className="text-[12px] font-semibold">{label}</span>
                </div>
                {i < 3 && <ChevronRight size={14} className="text-outline-variant" />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── INPUT PANEL ── */}
          <form className="lg:col-span-7 bg-surface-container rounded-xl border border-outline-variant/30 p-6 shadow-lg flex flex-col gap-8" onSubmit={onSubmit} noValidate>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-on-surface">Analyze Your Field</h2>
                <span className="text-sm text-on-surface-variant">7 metrics required</span>
              </div>
              <div className="flex gap-2">
                <button type="button" className="px-3 py-1.5 rounded-lg border border-outline-variant/50 text-sm font-medium hover:bg-surface-container-high transition-colors" onClick={onPresetData}>
                  Preset
                </button>
                <button type="button" className="px-3 py-1.5 rounded-lg border border-transparent text-sm font-medium text-error hover:bg-error/10 transition-colors flex items-center gap-1.5" onClick={onReset}>
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>

            {/* Soil Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
                <Layers size={18} className="text-tertiary" />
                <h3 className="font-semibold text-on-surface">Soil Parameters</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {soilFields.map(field => (
                  <div className="flex flex-col gap-1.5" key={field.key}>
                    <div className="flex justify-between items-center text-sm font-medium text-on-surface-variant">
                      <label htmlFor={`input-${field.key}`}>{field.label}</label>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-surface-container-high text-outline">{field.unit}</span>
                    </div>
                    <input
                      id={`input-${field.key}`}
                      type="number"
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      value={formState[field.key]}
                      onChange={e => onInputChange(field.key, e.target.value)}
                      placeholder={String(field.defaultValue)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
                    />
                    <span className="text-[11px] text-outline mt-0.5">{field.note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-outline-variant/20">
                <CloudRain size={18} className="text-info" />
                <h3 className="font-semibold text-on-surface">Environmental Parameters</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weatherFields.map(field => (
                  <div className="flex flex-col gap-1.5" key={field.key}>
                    <div className="flex justify-between items-center text-sm font-medium text-on-surface-variant">
                      <label htmlFor={`input-${field.key}`}>{field.label}</label>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-surface-container-high text-outline">{field.unit}</span>
                    </div>
                    <input
                      id={`input-${field.key}`}
                      type="number"
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      value={formState[field.key]}
                      onChange={e => onInputChange(field.key, e.target.value)}
                      placeholder={String(field.defaultValue)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-outline"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/20">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-lg bg-primary text-on-primary font-bold text-[14px] hover:bg-primary-container transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Activity size={18} className="animate-pulse" /> : <BrainCircuit size={18} />}
                {loading ? 'Processing...' : 'Run Analysis'}
              </button>
            </div>
          </form>

          {/* ── RESULT PANEL ── */}
          <div className="lg:col-span-5 relative">
            {!predictionResult && !loading && (
              <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 border-dashed p-10 flex flex-col items-center justify-center text-center h-[500px]">
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-outline mb-4">
                  <Sprout size={28} />
                </div>
                <h3 className="text-lg font-semibold text-on-surface mb-2">Awaiting Data</h3>
                <p className="text-sm text-on-surface-variant max-w-xs">Fill in your field metrics and run analysis to get recommendations.</p>
              </div>
            )}

            {loading && (
              <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-10 flex flex-col items-center justify-center text-center h-[500px]">
                <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-surface-container-high rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <Leaf size={24} className="text-primary animate-pulse" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Analyzing Field</h3>
                <p className="text-sm text-on-surface-variant max-w-xs animate-pulse">{LOADING_MESSAGES[loadingMsgIdx]}</p>
              </div>
            )}

            {predictionResult && !loading && (() => {
              const cropName = predictionResult.recommended_crop.toLowerCase();
              const cropImage = `/crop-images/${cropName}.jpg`;

              const cropDescriptions: Record<string, string> = {
                apple: 'Apple is a perennial fruit crop that generally performs best in suitable temperatures, well-drained soil and adequate moisture. Proper irrigation and appropriate soil conditions support healthy growth and yield.',
                rice: 'Rice is a water-demanding cereal crop that performs well under suitable warm temperatures, adequate moisture and appropriate soil conditions.',
                banana: 'Banana requires a warm, humid climate and well-drained loamy soils with high organic matter for optimal growth and fruit production.',
                wheat: 'Wheat is a robust cereal grain that thrives in temperate climates with moderate rainfall and well-drained soils.',
                maize: 'Maize requires warm weather and substantial sunlight, performing best in nutrient-rich, well-aerated soils.',
                cotton: 'Cotton is a major fiber crop that favors warm climates with a long frost-free period and plenty of sunshine.',
                mango: 'Mango thrives in tropical and subtropical climates, requiring distinct wet and dry seasons for optimal flowering and fruit development.',
                grapes: 'Grapes require a temperate climate with warm, dry summers and cool winters, performing best in well-drained soils.',
                watermelon: 'Watermelon is a warm-season crop that needs full sun and well-drained sandy loam soils for vigorous vine growth and fruit set.',
              };

              const cropDescription = cropDescriptions[cropName] || `${predictionResult.recommended_crop.charAt(0).toUpperCase() + predictionResult.recommended_crop.slice(1)} performs best under the specific temperature, moisture, and soil nutrient profile you provided. Ensure proper agronomic practices to support healthy growth and maximize yield.`;

              return (
              <div className="bg-surface-container rounded-xl border border-primary/40 shadow-xl overflow-hidden flex flex-col">
                <div className="bg-surface-container-highest border-b border-outline-variant/30 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
                    <CheckCircle2 size={16} /> Result Ready
                  </div>
                </div>
                
                <div className="flex flex-col items-center border-b border-outline-variant/20 relative overflow-hidden">
                  <div className="w-full h-40 relative">
                    <img 
                      src={cropImage} 
                      alt={`${predictionResult.recommended_crop} crop`} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/agrisense-assets/hero-crop.jpg'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
                  </div>
                  
                  <div className="px-8 pb-8 pt-2 flex flex-col items-center w-full relative z-10 -mt-6">
                    <span className="text-[12px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-1">Optimal Crop</span>
                    <h2 className="text-4xl font-bold text-primary capitalize mb-4">{predictionResult.recommended_crop}</h2>
                    
                    <div className="w-full max-w-[240px] mb-6">
                      <div className="flex justify-between text-xs font-semibold text-on-surface-variant mb-1.5">
                        <span>Model Confidence</span>
                        <span className="text-primary">{formatPct(predictionResult.confidence)}</span>
                      </div>
                      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: formatPct(predictionResult.confidence) }}></div>
                      </div>
                    </div>
                    
                    <div className="w-full border-t border-outline-variant/30 pt-6 mt-2 text-center">
                      <h4 className="text-[11px] font-bold text-outline uppercase tracking-wider mb-2">About this crop</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        {cropDescription}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-surface-container-low">
                  <h4 className="text-[11px] font-bold text-outline uppercase tracking-wider mb-4">Viable Alternatives</h4>
                  <div className="flex flex-col gap-3">
                    {predictionResult.top_predictions.slice(1, 4).map((pred, idx) => (
                      <div key={pred.crop} className="flex items-center gap-4">
                        <div className="w-6 text-center text-outline-variant font-mono text-xs">0{idx + 2}</div>
                        <div className="flex-1">
                          <div className="flex justify-between text-sm font-medium mb-1">
                            <span className="text-on-surface capitalize">{pred.crop}</span>
                            <span className="text-on-surface-variant">{formatPct(pred.probability)}</span>
                          </div>
                          <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full bg-tertiary/70" style={{ width: formatPct(pred.probability) }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              );
            })()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RecommendationPage;
