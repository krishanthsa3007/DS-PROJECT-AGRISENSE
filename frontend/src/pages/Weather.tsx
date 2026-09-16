import React from 'react';
import { CloudRain, Info } from 'lucide-react';
import { FIELDS, type FieldKey, type PredictionResult } from '../App';

interface WeatherPageProps {
  formState: Record<FieldKey, string>;
  predictionResult: PredictionResult | null;
}

const WeatherPage: React.FC<WeatherPageProps> = ({ formState, predictionResult }) => {
  const weatherFields = FIELDS.filter(f => f.category === 'weather');

  return (
    <main className="w-full pt-28 pb-20 bg-surface text-on-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-on-surface tracking-tight mb-4">Weather & Microclimate</h1>
          <p className="text-[16px] text-on-surface-variant max-w-2xl leading-relaxed mb-6">
            Analysis of ambient temperature, relative humidity, and rainfall indices
            submitted for field evaluation.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-low text-sm text-outline font-medium">
            <Info size={16} className="text-primary" />
            Displaying submitted environmental values.
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherFields.map(field => {
            const rawVal = predictionResult?.input[field.key] ?? Number(formState[field.key]);
            const pctFill = Number.isNaN(rawVal)
              ? 0
              : Math.min(100, Math.max(0, (rawVal / field.max) * 100));

            return (
              <div className="bg-surface-container rounded-xl p-6 flex flex-col shadow-lg" key={field.key}>
                <h3 className="font-semibold text-on-surface mb-2">{field.label}</h3>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold tracking-tight text-on-surface">
                    {Number.isNaN(rawVal) ? '—' : rawVal}
                  </span>
                  <span className="text-sm font-medium text-on-surface-variant">{field.unit}</span>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex-1">
                  {field.description}
                </p>

                <div className="pt-4">
                  <div className="flex justify-between text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
                    <span>Relative Range</span>
                    <span>{pctFill.toFixed(0)}% Index</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden" role="progressbar" aria-valuenow={pctFill} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full bg-info" style={{ width: `${pctFill}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default WeatherPage;
