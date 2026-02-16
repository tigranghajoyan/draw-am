import { ChevronDown, Box } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CalculatorCategory, CalculatorItemState } from '@/types';
import CalculatorItemCard from './CalculatorItemCard';
import { useLocale, useT } from '@/i18n/context';
import { formatNumber } from '@/utils/formatNumber';
import { DEFAULT_ITEM_STATE } from '@/utils/calculatorDefaults';
import { categoryIcons } from '@/utils/categoryIcons';

interface CalculatorCategorySectionProps {
  category: CalculatorCategory;
  expanded: boolean;
  onToggle: () => void;
  itemStates: Record<string, CalculatorItemState>;
  onItemChange: (itemId: string, state: CalculatorItemState) => void;
}

function getIcon(iconKey: string): LucideIcon {
  return categoryIcons[iconKey] ?? Box;
}

export default function CalculatorCategorySection({
  category,
  expanded,
  onToggle,
  itemStates,
  onItemChange,
}: CalculatorCategorySectionProps) {
  const locale = useLocale();
  const t = useT();
  const activeCount = category.items.filter(
    (item) => (itemStates[item.id]?.quantity ?? 0) > 0,
  ).length;

  const subtotal = category.items.reduce((sum, item) => {
    const s = itemStates[item.id] ?? DEFAULT_ITEM_STATE;
    const mat = s.materialCostOverride ?? item.defaultMaterialCost;
    const svc = s.serviceCostOverride ?? item.defaultServiceCost;
    return sum + s.quantity * (mat + svc);
  }, 0);

  const Icon = getIcon(category.icon);

  return (
    <div>
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 bg-charcoal-darker text-white px-5 py-4 hover:bg-charcoal-dark transition-colors cursor-pointer"
      >
        <Icon size={20} />
        <span className="font-heading font-bold text-sm uppercase tracking-wider flex-1 text-left">
          {category.name[locale]}
        </span>
        {activeCount > 0 && (
          <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {activeCount}
          </span>
        )}
        {subtotal > 0 && (
          <span className="font-heading text-sm tracking-wider">
            {formatNumber(subtotal, locale)}
          </span>
        )}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Items */}
      <div
        className={`grid transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          expanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          {/* Column headers — desktop only */}
          <div className="hidden sm:flex items-center gap-4 px-4 py-2 text-[11px] font-heading uppercase tracking-wider text-charcoal/60">
            {/* Image spacer */}
            <div className="md:w-[120px] md:min-w-[120px]" />
            <div className="flex-1 flex items-center gap-4">
              <div className="md:w-44 md:min-w-44" />
              <div className="flex-1 grid grid-cols-3 gap-3">
                <span>{t('calculator.quantity')}</span>
                <span>{t('calculator.materials')}</span>
                <span>{t('calculator.services')}</span>
              </div>
              <div className="md:w-28 md:min-w-28 text-right">
                <span>{t('calculator.total')}</span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100 py-3">
            {category.items.map((item, index) => (
              <CalculatorItemCard
                key={item.id}
                item={item}
                state={itemStates[item.id] ?? DEFAULT_ITEM_STATE}
                onChange={(state) => onItemChange(item.id, state)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
