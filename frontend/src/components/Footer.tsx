import React from 'react';
import { Leaf } from 'lucide-react';

const NAV_ITEMS = ['Home', 'Recommendation', 'Soil Data', 'Weather', 'Model Insights', 'About'];

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-surface-container-lowest text-on-surface-variant pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-on-surface">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <Leaf size={18} />
              </div>
              <span className="text-[16px] font-bold tracking-tight">AgriSense</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              AI-powered decision support for precision agriculture and crop
              suitability analysis. Turning soil data into intelligent guidance.
            </p>
            <p className="text-[11px] uppercase tracking-wider text-outline font-semibold mt-2">Dataset: Crop Recommendation Dataset (Kaggle)</p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-bold uppercase tracking-wider text-outline">Navigation</span>
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map(item => (
                <button 
                  key={item} 
                  type="button" 
                  onClick={() => onNavigate(item)}
                  className="text-sm font-medium hover:text-primary text-left transition-colors w-fit"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack Column */}
          <div className="flex flex-col gap-4">
            <span className="text-[12px] font-bold uppercase tracking-wider text-outline">Built With</span>
            <div className="flex flex-col gap-3 text-sm font-medium">
              <span>React & TypeScript</span>
              <span>FastAPI & Python</span>
              <span>scikit-learn Random Forest</span>
              <span>Vite & Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-[11px] text-outline font-medium text-center sm:text-left">
          <p className="max-w-2xl">
            Disclaimer: AgriSense provides machine-learning-based decision support and should
            not replace professional agricultural advice or certified soil laboratory testing.
          </p>
          <span className="uppercase tracking-widest whitespace-nowrap">v2.0 · Precision Agronomy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
