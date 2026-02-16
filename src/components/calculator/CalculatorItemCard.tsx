import type { CalculatorWorkItem, CalculatorItemState } from '@/types';
import { useT, useLocale } from '@/i18n/context';
import { formatNumber } from '@/utils/formatNumber';

interface CalculatorItemCardProps {
  item: CalculatorWorkItem;
  state: CalculatorItemState;
  onChange: (state: CalculatorItemState) => void;
  index: number;
}

export default function CalculatorItemCard({
  item,
  state,
  onChange,
  index,
}: CalculatorItemCardProps) {
  const t = useT();
  const locale = useLocale();
  const materialCost = state.materialCostOverride ?? item.defaultMaterialCost;
  const serviceCost = state.serviceCostOverride ?? item.defaultServiceCost;
  const total = state.quantity * (materialCost + serviceCost);
  const isActive = state.quantity > 0;

  const handleQuantity = (value: string) => {
    const num = parseFloat(value);
    onChange({ ...state, quantity: isNaN(num) || num < 0 ? 0 : num });
  };

  const handleMaterialOverride = (value: string) => {
    if (value === '') {
      onChange({ ...state, materialCostOverride: null });
      return;
    }
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) {
      onChange({ ...state, materialCostOverride: num });
    }
  };

  const handleServiceOverride = (value: string) => {
    if (value === '') {
      onChange({ ...state, serviceCostOverride: null });
      return;
    }
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) {
      onChange({ ...state, serviceCostOverride: num });
    }
  };

  const inputClass =
    'w-full px-3 py-2 bg-white border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-colors font-body text-charcoal-darker text-sm';

  return (
    <div
      className={`flex flex-col md:flex-row transition-shadow duration-300 ${
        isActive
          ? 'bg-accent/5 border-l-3 border-l-accent'
          : index % 2 === 1
            ? 'bg-gray-50/50'
            : 'bg-white'
      }`}
    >
      {/* Image */}
      <div className="md:w-[120px] md:min-w-[120px] h-48 md:h-auto overflow-hidden">
        <img
          src={item.image}
          alt={item.name[locale]}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Info & Inputs */}
      <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center gap-4">
        {/* Name & unit info */}
        <div className="md:w-44 md:min-w-44">
          <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-charcoal-darker">
            {item.name[locale]}
          </h4>
          <span className="inline-block mt-1 text-[11px] font-heading uppercase tracking-wider text-charcoal bg-offwhite px-2 py-0.5 rounded-full">
            {item.unit}
          </span>
          <p className="text-xs text-charcoal/60 mt-0.5">
            {t('calculator.default') + ': '}{formatNumber(item.defaultMaterialCost, locale)} + {formatNumber(item.defaultServiceCost, locale)}
          </p>
        </div>

        {/* Input fields */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="sm:hidden block text-[11px] font-heading uppercase tracking-wider text-charcoal-dark mb-1">
              {t('calculator.quantity')}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={state.quantity || ''}
              onChange={(e) => handleQuantity(e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>
          <div>
            <label className="sm:hidden block text-[11px] font-heading uppercase tracking-wider text-charcoal-dark mb-1">
              {t('calculator.materials')}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={state.materialCostOverride ?? ''}
              onChange={(e) => handleMaterialOverride(e.target.value)}
              placeholder={formatNumber(item.defaultMaterialCost, locale)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="sm:hidden block text-[11px] font-heading uppercase tracking-wider text-charcoal-dark mb-1">
              {t('calculator.services')}
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={state.serviceCostOverride ?? ''}
              onChange={(e) => handleServiceOverride(e.target.value)}
              placeholder={formatNumber(item.defaultServiceCost, locale)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Total */}
        <div className="md:w-28 md:min-w-28 text-right">
          <p className="text-[11px] font-heading uppercase tracking-wider text-charcoal-dark">
            {t('calculator.total')}
          </p>
          <p className="font-heading font-bold text-lg text-charcoal-darker">
            {formatNumber(total, locale)}
          </p>
        </div>
      </div>
    </div>
  );
}
