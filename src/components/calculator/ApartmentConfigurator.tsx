import { Minus, Plus, Wallet, Gem, SlidersHorizontal, Check } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { ApartmentDetails, PackageType } from '@/types';
import { packageDefinitions } from '@/data/calculator';
import { useT, useLocale } from '@/i18n/context';
import { formatNumber } from '@/utils/formatNumber';

interface ApartmentConfiguratorProps {
  apartmentDetails: ApartmentDetails;
  onApartmentDetailsChange: (details: ApartmentDetails) => void;
  selectedPackage: PackageType | null;
  onPackageSelect: (pkg: PackageType) => void;
  designCostOverride: number | null;
  onDesignCostOverrideChange: (v: number | null) => void;
}

const packageIcons = {
  wallet: Wallet,
  gem: Gem,
  'sliders-horizontal': SlidersHorizontal,
} as const;

function Stepper({
  value,
  onChange,
  min = 1,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  label: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-heading uppercase tracking-wider text-charcoal-dark mb-3 text-center">
        {label}
      </label>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-11 h-11 flex items-center justify-center border border-gray-300 hover:bg-charcoal-darker hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          <Minus size={14} />
        </button>
        <span className="font-heading font-bold text-2xl text-charcoal-darker w-8 text-center">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          className="w-11 h-11 flex items-center justify-center border border-gray-300 hover:bg-charcoal-darker hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

function StepIndicator({ canSelectPackage }: { canSelectPackage: boolean }) {
  return (
    <div className="flex items-center justify-center gap-0 my-10">
      {/* Step 1 circle — always active */}
      <div className="w-9 h-9 rounded-full bg-charcoal-darker text-white flex items-center justify-center font-heading font-bold text-sm">
        1
      </div>
      {/* Connecting line */}
      <div className="w-16 sm:w-24 h-0.5 relative">
        <div className="absolute inset-0 bg-gray-200" />
        <div
          className={`absolute inset-y-0 left-0 bg-charcoal-darker transition-all duration-500 ${
            canSelectPackage ? 'w-full' : 'w-0'
          }`}
        />
      </div>
      {/* Step 2 circle */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-sm transition-colors duration-500 ${
          canSelectPackage
            ? 'bg-charcoal-darker text-white'
            : 'bg-gray-200 text-charcoal/40'
        }`}
      >
        2
      </div>
    </div>
  );
}

export default function ApartmentConfigurator({
  apartmentDetails,
  onApartmentDetailsChange,
  selectedPackage,
  onPackageSelect,
  designCostOverride,
  onDesignCostOverrideChange,
}: ApartmentConfiguratorProps) {
  const t = useT();
  const locale = useLocale();
  const canSelectPackage = apartmentDetails.area > 0;

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Step 1 — Your Apartment */}
        <ScrollReveal>
          <SectionHeading label={t('calculator.step1.label')} title={t('calculator.step1.title')} centered />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {/* Area input */}
            <div>
              <label htmlFor="calc-area" className="block text-[11px] font-heading uppercase tracking-wider text-charcoal-dark mb-3 text-center">
                {t('calculator.area')}
              </label>
              <div className="relative">
                <input
                  id="calc-area"
                  type="number"
                  min="0"
                  value={apartmentDetails.area || ''}
                  onChange={(e) => {
                    const num = parseFloat(e.target.value);
                    onApartmentDetailsChange({
                      ...apartmentDetails,
                      area: isNaN(num) || num < 0 ? 0 : num,
                    });
                  }}
                  placeholder="0"
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-colors font-heading font-bold text-2xl text-charcoal-darker text-center pr-14"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/50 font-heading text-sm">
                  {t('calculator.sqmUnit')}
                </span>
              </div>
            </div>

            {/* Rooms stepper */}
            <Stepper
              label={t('calculator.rooms')}
              value={apartmentDetails.rooms}
              onChange={(v) =>
                onApartmentDetailsChange({ ...apartmentDetails, rooms: v })
              }
              min={1}
            />

            {/* Bathrooms stepper */}
            <Stepper
              label={t('calculator.bathrooms')}
              value={apartmentDetails.bathrooms}
              onChange={(v) =>
                onApartmentDetailsChange({ ...apartmentDetails, bathrooms: v })
              }
              min={1}
            />
          </div>
        </ScrollReveal>

        {/* Step progress indicator */}
        <StepIndicator canSelectPackage={canSelectPackage} />

        {/* Step 2 — Choose Your Package */}
        <ScrollReveal>
          <div className={canSelectPackage ? '' : 'opacity-40 pointer-events-none'}>
            <SectionHeading label={t('calculator.step2.label')} title={t('calculator.step2.title')} centered />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {packageDefinitions.map((pkg) => {
                const isSelected = selectedPackage === pkg.id;
                const Icon = packageIcons[pkg.icon as keyof typeof packageIcons];

                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => onPackageSelect(pkg.id)}
                    className={`relative p-8 text-center transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? 'border-2 border-accent bg-accent/5 shadow-lg'
                        : 'border border-gray-200 hover:shadow-md'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    )}
                    {Icon && (
                      <Icon
                        size={32}
                        className="mx-auto mb-4 text-charcoal-dark"
                      />
                    )}
                    <h3 className="font-heading font-bold text-lg uppercase tracking-wider text-charcoal-darker">
                      {pkg.name[locale]}
                    </h3>
                    <p className="mt-2 text-sm text-charcoal leading-relaxed">
                      {pkg.description[locale]}
                    </p>
                    <p className="mt-3 text-xs font-heading uppercase tracking-wider text-charcoal-dark">
                      {t('calculator.designPerSqm')}: {formatNumber(pkg.designCostPerSqm, locale)}
                    </p>
                    {pkg.id === 'individual' && isSelected && (
                      <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                        <label className="block text-[11px] font-heading uppercase tracking-wider text-charcoal-dark mb-1">
                          {t('calculator.designPerSqm')}
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={designCostOverride ?? pkg.designCostPerSqm}
                          onChange={(e) => {
                            const num = parseFloat(e.target.value);
                            onDesignCostOverrideChange(isNaN(num) || num < 0 ? null : num);
                          }}
                          className="w-full px-3 py-2 bg-white border border-gray-300 focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-none transition-colors font-heading text-sm text-charcoal-darker text-center"
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
