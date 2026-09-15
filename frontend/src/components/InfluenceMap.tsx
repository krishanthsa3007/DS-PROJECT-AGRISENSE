import React, { useMemo } from 'react';
import { Info } from 'lucide-react';
import { FIELDS } from '../App';

interface InfluenceMapProps {
  importance: Record<string, number>;
}

const formatFeatureLabel = (key: string): string =>
  FIELDS.find(f => f.key === key)?.label ?? key;

const InfluenceMap: React.FC<InfluenceMapProps> = ({ importance }) => {
  const ranked = useMemo(
    () => Object.entries(importance).sort((a, b) => b[1] - a[1]),
    [importance]
  );

  const total = useMemo(
    () => ranked.reduce((sum, [, val]) => sum + val, 0) || 1,
    [ranked]
  );

  if (!ranked.length) {
    return (
      <div className="bg-surface-container-low rounded-xl border border-outline-variant/30 p-8 flex items-center justify-center min-h-[180px]">
        <p className="text-on-surface-variant italic text-sm">Feature importance data is not yet loaded.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Feature importance by model input">
        {ranked.map(([name, value], index) => {
          const pctVal = (value / total) * 100;
          const feature = FIELDS.find(f => f.key === name);
          
          return (
            <article key={name} className="bg-surface-container rounded-lg border border-outline-variant/30 p-4 flex flex-col transition-colors hover:border-outline-variant/50 hover:bg-surface-container-high">

              <h3 className="text-[13px] font-bold text-on-surface mb-1">{formatFeatureLabel(name)}</h3>
              
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs text-on-surface-variant">Weight</span>
                <strong className="text-lg font-bold text-primary">{pctVal.toFixed(1)}%</strong>
              </div>
              
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden mb-2" role="progressbar" aria-valuenow={pctVal} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full bg-primary" style={{ width: `${pctVal}%` }} />
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex items-start gap-3 p-4 rounded-lg bg-surface-container-low border border-outline-variant/30 text-[12px] text-on-surface-variant leading-relaxed">
        <Info size={16} className="text-outline shrink-0 mt-0.5" />
        <p>
          Feature importance reflects how strongly each input contributed to the model's
          decision process during training. It does not imply direct biological causation.
        </p>
      </div>
    </div>
  );
};

export default InfluenceMap;
