import React, { useEffect, useRef, useState } from 'react';
import {
  Activity, ArrowRight, BarChart3, BrainCircuit, CheckCircle2,
  CloudRain, Cpu, Database, FlaskConical, Sun,
  Layers, Leaf, ShieldCheck, Sparkles, Sprout
} from 'lucide-react';
import InfluenceMap from '../components/InfluenceMap';
import type { ModelMetadata } from '../App';

interface HomePageProps {
  modelInfo: ModelMetadata | null;
  modelComparison: Record<string, Record<string, number>>;
  activeImportance: Record<string, number>;
  onNavigate: (page: string) => void;
}

const formatPct = (v: number) => `${(v * 100).toFixed(1)}%`;

const HERO_IMAGES = [
  '/agrisense-assets/hero-soil.jpg',
  '/agrisense-assets/hero-seed.jpg',
  '/agrisense-assets/hero-growth.jpg',
  '/agrisense-assets/hero-crop.jpg',
  '/agrisense-assets/hero-field.jpg',
];

const HomePage: React.FC<HomePageProps> = ({
  modelInfo,
  modelComparison,
  activeImportance,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const datasetSize = typeof modelInfo?.dataset_size === 'number' ? modelInfo.dataset_size : null;
  const cropClassCount = typeof modelInfo?.number_of_classes === 'number' ? modelInfo.number_of_classes : null;
  const featureCount = Array.isArray(modelInfo?.feature_names) ? modelInfo.feature_names.length : null;
  const evaluatedModelsCount = Object.keys(modelComparison).length || 4;

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full pt-28 bg-surface text-on-surface flex flex-col" ref={containerRef as React.RefObject<HTMLElement>}>
      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden bg-surface pb-16">
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Narrative Column */}
            <div className="lg:col-span-6 flex flex-col gap-6 z-10">
              <h1 className="text-4xl lg:text-5xl font-bold text-on-surface tracking-tight leading-[1.12] max-w-xl">
                Understand the field. <br /><span className="font-normal text-tertiary">Grow with confidence.</span>
              </h1>
              <p className="text-[16px] leading-relaxed text-on-surface-variant max-w-lg">
                AI-powered precision agriculture for grounded decisions. Observe soil biological dynamics, hyper-local microclimates, and dynamic crop health across every acre.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-primary text-on-primary font-semibold text-[13px] hover:bg-primary-container transition-all shadow-md"
                  onClick={() => onNavigate('Recommendation')}
                >
                  <BarChart3 size={18} className="mr-2" aria-hidden="true" />
                  Analyze your field
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface hover:bg-surface-container-high transition-colors font-medium text-[13px]"
                  onClick={() => document.getElementById('how-it-works-sec')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore AgriSense
                </button>
              </div>
            </div>

            {/* 5-Stage Narrative Stage Viewer (Inside existing hero image container) */}
            <div className="lg:col-span-6 flex flex-col gap-4 mt-8 lg:mt-0">
              <div className="relative w-full rounded-xl bg-surface-container overflow-hidden shadow-xl aspect-[16/11]">
                <div className="relative w-full h-full bg-surface-container-lowest">
                  {HERO_IMAGES.map((src, idx) => {
                    const altTexts = [
                      "Hands holding fertile soil",
                      "Seed germination",
                      "Young crop growth",
                      "Mature crop",
                      "Agricultural field"
                    ];
                    return (
                    <div 
                      key={src}
                      className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                      <img
                        src={src}
                        alt={altTexts[idx]}
                        loading="eager"
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-linear ${currentSlide === idx ? 'scale-[1.03]' : 'scale-100'}`}
                        style={{ transformOrigin: 'center' }}
                      />
                    </div>
                  )})}
                  {/* Subtle fade overlay at the bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent pointer-events-none z-10"></div>
                </div>
              </div>

              {/* Stage Navigation Cards */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['SOIL', 'SEED', 'GROWTH', 'CROP', 'FIELD'].map((stage, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <div
                      key={stage}
                      className={`flex-1 min-w-[70px] py-2.5 px-1 text-center rounded-lg text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'bg-[#239B56] text-white dark:text-black' : 'bg-[#2ECC71] text-white dark:text-black'}`}
                    >
                      {stage}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="w-full bg-surface-container-lowest py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              { value: datasetSize ? datasetSize.toLocaleString() : '2,200', label: 'Dataset Samples' },
              { value: cropClassCount ?? 22, label: 'Crop Classes' },
              { value: featureCount ?? 7, label: 'Input Features' },
              { value: evaluatedModelsCount, label: 'Models Evaluated' },
              { value: modelInfo ? formatPct(modelInfo.f1_score) : '99.5%', label: 'Best F1 Score', highlight: true },
            ].map(({ value, label, highlight }) => (
              <div key={label} className={`flex flex-col p-4 rounded-lg ${highlight ? 'bg-primary/10' : 'bg-surface-container'}`}>
                <strong className={`text-2xl font-bold ${highlight ? 'text-primary' : 'text-on-surface'}`}>{value}</strong>
                <span className="text-sm text-on-surface-variant font-medium mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIELD INTELLIGENCE — YOUR FIELD, MEASURED ── */}
      <section className="w-full bg-surface-container-low py-16" id="field-intelligence">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col mb-8 gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Your Field, Measured</h2>
            <p className="text-[14px] text-on-surface-variant max-w-xl leading-relaxed">
              Real environmental and soil data combined to give you precise, actionable agricultural insights.
            </p>
          </div>

          {/* Clean Aerial Photo */}
          <div className="relative w-full rounded-xl overflow-hidden bg-surface-container shadow-xl flex flex-col">
            <div className="relative h-[380px] sm:h-[480px] md:h-[580px] w-full bg-surface-container-lowest">
              <img 
                alt="Agricultural field" 
                className="w-full h-full object-cover" 
                src="/agrisense-assets/your-field.jpg" 
              />
            </div>
            
            {/* Meaningful Metrics Below Photo */}
            <div className="bg-surface-container p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[12px] font-bold uppercase tracking-wider text-on-surface">Field Parameters</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {[
                  { label: 'Nitrogen (N)', value: '90 kg/ha' },
                  { label: 'Phosphorus (P)', value: '42 kg/ha' },
                  { label: 'Potassium (K)', value: '43 kg/ha' },
                  { label: 'Temperature', value: '24.5°C' },
                  { label: 'Humidity', value: '78%' },
                  { label: 'Soil pH', value: '6.4' },
                  { label: 'Rainfall', value: '210 mm' }
                ].map((metric) => (
                  <div key={metric.label} className="p-3 rounded-lg bg-surface-container-high flex flex-col gap-1">
                    <div className="text-outline text-[11px] font-medium tracking-wide">
                      {metric.label}
                    </div>
                    <div className="text-[16px] font-bold text-on-surface mt-1">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW / PIPELINE ── */}
      <section className="w-full py-16 bg-surface" id="how-it-works-sec">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-on-surface">From Field Conditions to Intelligent Recommendations</h2>
            <p className="text-on-surface-variant leading-relaxed">
              AgriSense uses machine learning to analyze seven critical soil and environmental parameters, identifying the most suitable crop class from a comprehensive training dataset.
            </p>
            <div className="grid gap-4 mt-4">
              {[
                { title: 'Data Inputs', desc: 'Real-time readings for N, P, K, pH, temperature, humidity, and rainfall.' },
                { title: 'ML Analysis', desc: 'A trained classifier processes the data to find patterns associated with high yield.' },
                { title: 'Recommendation', desc: 'Returns the most optimal crop with a confidence score and alternatives.' }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col pt-1">
                  <h4 className="font-bold text-on-surface mb-1">{step.title}</h4>
                  <p className="text-sm text-on-surface-variant">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-8">
            <h3 className="text-lg font-bold text-on-surface mb-6 text-center">Feature Importance Analysis</h3>
            <InfluenceMap importance={activeImportance} />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full py-20 bg-surface text-center flex flex-col items-center justify-center px-4 md:px-8">
        <div className="relative w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl">
          <img src="/agrisense-assets/ready-analysis.png" alt="" role="presentation" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07130E]/90 via-[#13251B]/70 to-[#07130E]/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[#0A1711]/50 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 py-16 px-6 md:px-12 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to analyze your field?</h2>
            <p className="text-[#B7C2B8] mb-8 max-w-lg font-medium">
              Enter your soil metrics and environmental conditions to get a data-driven crop recommendation.
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-[#8FBE63] text-[#002404] font-bold text-[14px] hover:bg-[#a5d575] transition-all shadow-lg shadow-black/20"
              onClick={() => onNavigate('Recommendation')}
            >
              Get Recommendation <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

    </main>
  );
};

export default HomePage;
