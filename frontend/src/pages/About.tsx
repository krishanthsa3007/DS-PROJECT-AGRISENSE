import React from 'react';
import {
  BrainCircuit, ChevronRight, Cpu, Database,
  FlaskConical, Layers, Leaf, ShieldCheck, Sprout
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <main className="w-full pt-28 pb-20 bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
        
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface">
            AgriSense <span className="text-primary font-light">AI</span>
          </h1>
          <p className="text-[16px] text-on-surface-variant max-w-2xl leading-relaxed mt-2">
            AI-powered decision support for precision agriculture, designed to enhance
            crop selection transparency through machine learning trained on real
            agricultural field data.
          </p>
        </div>

        {/* About Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <section className="bg-surface-container rounded-xl p-8 shadow-lg flex flex-col gap-4">
            <h2 className="text-xl font-bold text-on-surface">Problem Statement</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Farmers often select crops based on tradition or single-variable observations,
              overlooking complex interactions between soil nutrients and environmental
              factors. Sub-optimal crop selection can lead to diminished yields and
              resource inefficiency.
            </p>
          </section>

          <section className="bg-surface-container rounded-xl p-8 shadow-lg flex flex-col gap-4">
            <h2 className="text-xl font-bold text-on-surface">Proposed Solution</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              AgriSense AI applies supervised machine learning classification to analyze
              7 combined soil and weather parameters (N, P, K, Temperature, Humidity,
              pH, Rainfall) and recommend suitable crops based on patterns learned
              from training data.
            </p>
          </section>

          <section className="bg-surface-container rounded-xl p-8 shadow-lg flex flex-col gap-4">
            <h2 className="text-xl font-bold text-on-surface">Technology Stack</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">Built with a modern, full-stack architecture optimized for speed and clarity.</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {['React', 'TypeScript', 'Vite', 'FastAPI', 'Python', 'scikit-learn', 'pandas', 'Lucide React'].map(t => (
                <span key={t} className="px-2 py-1 bg-surface-container-low rounded text-[11px] font-medium text-outline uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* How it works workflow */}
        <section className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-lg">
          <h2 className="text-2xl font-bold text-on-surface mb-8">How AgriSense Works</h2>
          <div className="flex flex-col gap-6">
            {[
              { title: 'Collect Field Data',           desc: 'Enter soil macronutrients (N, P, K), soil pH, ambient temperature, relative humidity, and seasonal rainfall for your field.' },
              { title: 'Data Validation & Processing', desc: 'Inputs are validated, range-checked, and formatted into a structured feature vector ready for model inference.' },
              { title: 'ML Model Inference',           desc: 'A Random Forest classifier trained on 2,200 agricultural samples evaluates the feature vector against learned decision boundaries.' },
              { title: 'Crop Recommendation',          desc: 'The model returns a ranked prediction with confidence scores for the top crop matches given the submitted conditions.' },
              { title: 'Informed Decision',            desc: 'Farmers and agronomists use the recommendation as one data-driven input alongside local knowledge and professional advice.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                <div className="flex flex-col pt-1">
                  <h3 className="text-lg font-bold text-on-surface mb-1">{title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Flow */}
        <section className="bg-surface-container rounded-xl p-8 shadow-lg">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-on-surface">System Architecture</h2>
            <p className="text-sm text-on-surface-variant mt-2">End-to-end request flow from field data input to model recommendation output.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {[
              { label: 'React / Vite Frontend', sub: 'UI & Form State' },
              { label: 'FastAPI Backend',        sub: 'REST Endpoints' },
              { label: 'Preprocessing',         sub: 'DataFrame Vector' },
              { label: 'Random Forest Model',   sub: 'predict_proba()' },
              { label: 'Prediction Result',      sub: 'Top Crops & Confidence', highlight: true },
            ].map(({ label, sub, highlight }, i, arr) => (
              <React.Fragment key={label}>
                <div className={`flex flex-col items-center justify-center text-center p-4 rounded-xl min-w-[160px] h-[100px] ${highlight ? 'bg-primary/10' : 'bg-surface-container-low'}`}>
                  <span className={`text-[13px] font-bold mb-1 ${highlight ? 'text-primary' : 'text-on-surface'}`}>{label}</span>
                  <small className="text-[10px] uppercase tracking-widest text-outline">{sub}</small>
                </div>
                {i < arr.length - 1 && (
                  <div className="text-outline-variant hidden lg:block">
                    <ChevronRight size={24} />
                  </div>
                )}
                {i < arr.length - 1 && (
                  <div className="text-outline-variant lg:hidden rotate-90">
                    <ChevronRight size={24} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/10 rounded-xl p-10 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-on-surface mb-3">Analyze your field conditions</h2>
          <p className="text-[16px] text-on-surface-variant max-w-lg mb-8">
            Enter your soil and weather data to receive an instant AI-powered
            crop recommendation.
          </p>
          <button
            type="button"
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-on-primary font-bold text-[14px] hover:bg-primary-container transition-all shadow-lg"
            onClick={() => onNavigate('Recommendation')}
          >
            Start Field Analysis <ChevronRight size={18} className="ml-2" />
          </button>
        </section>
      </div>
    </main>
  );
};

export default AboutPage;
