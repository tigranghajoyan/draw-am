import { useState, useMemo } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import type { CalculatorCategory, CalculatorItemState } from '@/types';
import { useT, useLocale } from '@/i18n/context';
import { formatNumber } from '@/utils/formatNumber';
import { DEFAULT_ITEM_STATE } from '@/utils/calculatorDefaults';

interface CalculatorSummaryProps {
  categories: CalculatorCategory[];
  itemStates: Record<string, CalculatorItemState>;
  designTotal: number;
  onReset: () => void;
  hidden?: boolean;
}


export default function CalculatorSummary({
  categories,
  itemStates,
  designTotal,
  onReset,
  hidden,
}: CalculatorSummaryProps) {
  const t = useT();
  const locale = useLocale();
  const [showToast, setShowToast] = useState(false);

  const constructionTotal = useMemo(() => {
    let total = 0;
    for (const category of categories) {
      for (const item of category.items) {
        const s = itemStates[item.id] ?? DEFAULT_ITEM_STATE;
        const mat = s.materialCostOverride ?? item.defaultMaterialCost;
        const svc = s.serviceCostOverride ?? item.defaultServiceCost;
        total += s.quantity * (mat + svc);
      }
    }
    return total;
  }, [categories, itemStates]);

  const grandTotal = designTotal + constructionTotal;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 bg-charcoal-darker text-white px-4 sm:px-6 py-4 sm:py-6 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] transition-transform duration-300${hidden ? ' translate-y-full' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 items-end">
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60 mb-1">
              {t('calculator.design')}
            </p>
            <p className="font-heading font-bold text-lg sm:text-xl tracking-wider">
              {formatNumber(designTotal, locale)}
            </p>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60 mb-1">
              {t('calculator.construction')}
            </p>
            <p className="font-heading font-bold text-lg sm:text-xl tracking-wider">
              {formatNumber(constructionTotal, locale)}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 border-t border-white/20 pt-3 sm:border-0 sm:pt-0">
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/60 mb-1">
              {t('calculator.grandTotal')}
            </p>
            <p className="font-heading font-bold text-2xl sm:text-3xl tracking-wider">
              {formatNumber(grandTotal, locale)}
            </p>
          </div>
          <div className="col-span-2 sm:col-span-1 flex justify-end gap-3">
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/30 hover:bg-white hover:text-charcoal-darker active:scale-95 transition-all font-heading text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              <RotateCcw size={16} />
              {t('calculator.reset')}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
              }}
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/30 hover:bg-white hover:text-charcoal-darker active:scale-95 transition-all font-heading text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
            >
              <Download size={16} />
              {showToast ? t('calculator.downloadSoon') : t('calculator.download')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
