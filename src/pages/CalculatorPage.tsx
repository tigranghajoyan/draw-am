import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import { useT } from '@/i18n/context';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ApartmentConfigurator from '@/components/calculator/ApartmentConfigurator';
import CalculatorCategorySection from '@/components/calculator/CalculatorCategorySection';
import CalculatorSummary from '@/components/calculator/CalculatorSummary';
import { calculatorCategories, quantityRules, packageDefinitions } from '@/data/calculator';
import { pages } from '@/data/pages';
import { DEFAULT_APARTMENT } from '@/utils/calculatorDefaults';
import type { CalculatorItemState, ApartmentDetails, PackageType, PackageDefinition, ServiceType } from '@/types';

function computePackageStates(
  details: ApartmentDetails,
  packageId: PackageType,
): Record<string, CalculatorItemState> {
  if (packageId === 'individual') return {};

  const pkg = packageDefinitions.find((p) => p.id === packageId);
  if (!pkg) return {};

  const states: Record<string, CalculatorItemState> = {};
  for (const category of calculatorCategories) {
    for (const item of category.items) {
      const rule = quantityRules[item.id];
      const costs = pkg.itemCosts[item.id];
      states[item.id] = {
        quantity: rule ? rule(details) : 0,
        materialCostOverride: costs ? costs.materialCost : null,
        serviceCostOverride: costs ? costs.serviceCost : null,
      };
    }
  }
  return states;
}

export default function CalculatorPage() {
  const t = useT();
  const [serviceType, setServiceType] = useState<ServiceType>('interior');
  const [itemStates, setItemStates] = useState<Record<string, CalculatorItemState>>({});
  const [apartmentDetails, setApartmentDetails] = useState<ApartmentDetails>(DEFAULT_APARTMENT);
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [designCostOverride, setDesignCostOverride] = useState<number | null>(null);

  const filteredCategories = useMemo(
    () => calculatorCategories.filter((c) => c.serviceType === serviceType),
    [serviceType],
  );

  const currentPkg: PackageDefinition | undefined = selectedPackage
    ? packageDefinitions.find((p) => p.id === selectedPackage)
    : undefined;
  const designCostPerSqm = designCostOverride ?? currentPkg?.designCostPerSqm ?? 0;
  const designTotal = selectedPackage ? apartmentDetails.area * designCostPerSqm : 0;

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(calculatorCategories.map((c) => c.id)),
  );

  // Reset expanded categories when service type changes
  useEffect(() => {
    setExpandedCategories(new Set(filteredCategories.map((c) => c.id)));
  }, [serviceType, filteredCategories]);

  const handleToggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const handleItemChange = useCallback((itemId: string, state: CalculatorItemState) => {
    setItemStates((prev) => ({ ...prev, [itemId]: state }));
  }, []);

  const handlePackageSelect = useCallback(
    (pkg: PackageType) => {
      setSelectedPackage(pkg);
      if (pkg === 'individual') {
        // Preserve current values
        return;
      }
      setItemStates(computePackageStates(apartmentDetails, pkg));
    },
    [apartmentDetails],
  );

  const handleApartmentDetailsChange = useCallback(
    (details: ApartmentDetails) => {
      setApartmentDetails(details);
      if (selectedPackage && selectedPackage !== 'individual') {
        setItemStates(computePackageStates(details, selectedPackage));
      }
    },
    [selectedPackage],
  );

  const handleReset = useCallback(() => {
    setItemStates({});
    setApartmentDetails(DEFAULT_APARTMENT);
    setSelectedPackage(null);
    setDesignCostOverride(null);
    setServiceType('interior');
  }, []);

  const ctaRef = useRef<HTMLElement>(null);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setCtaVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageHero
        title={t('calculator.hero.title')}
        subtitle={t('calculator.hero.subtitle')}
        backgroundImage={pages.calculator.heroImage}
      />

      {/* Service Type Toggle */}
      <section className="bg-white pt-20 pb-4 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <SectionHeading
              label={t('calculator.serviceType.label')}
              title={t('calculator.serviceType.title')}
              centered
            />
            <div className="flex justify-center mt-8">
              <div className="inline-flex border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setServiceType('architectural')}
                  className={`px-6 sm:px-10 py-3 sm:py-4 font-heading text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                    serviceType === 'architectural'
                      ? 'bg-charcoal-darker text-white'
                      : 'bg-white text-charcoal hover:bg-gray-50'
                  }`}
                >
                  {t('calculator.serviceType.architectural')}
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('interior')}
                  className={`px-6 sm:px-10 py-3 sm:py-4 font-heading text-xs sm:text-sm uppercase tracking-wider transition-all cursor-pointer ${
                    serviceType === 'interior'
                      ? 'bg-charcoal-darker text-white'
                      : 'bg-white text-charcoal hover:bg-gray-50'
                  }`}
                >
                  {t('calculator.serviceType.interior')}
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro Section */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <p className="text-charcoal leading-relaxed text-center max-w-3xl mx-auto">
              {serviceType === 'architectural'
                ? t('calculator.intro.bodyArch')
                : t('calculator.intro.body')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Apartment Configurator */}
      <ApartmentConfigurator
        apartmentDetails={apartmentDetails}
        onApartmentDetailsChange={handleApartmentDetailsChange}
        selectedPackage={selectedPackage}
        onPackageSelect={handlePackageSelect}
        designCostOverride={designCostOverride}
        onDesignCostOverrideChange={setDesignCostOverride}
      />

      {/* Calculator Sections */}
      <section className="bg-offwhite py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-3">
          {filteredCategories.map((category) => (
            <CalculatorCategorySection
              key={category.id}
              category={category}
              expanded={expandedCategories.has(category.id)}
              onToggle={() => handleToggleCategory(category.id)}
              itemStates={itemStates}
              onItemChange={handleItemChange}
            />
          ))}
        </div>
      </section>

      {/* Summary */}
      <CalculatorSummary
        categories={filteredCategories}
        itemStates={itemStates}
        designTotal={designTotal}
        onReset={handleReset}
        hidden={ctaVisible}
      />

      {/* CTA Section */}
      <section ref={ctaRef} className="bg-white py-20 px-6 pb-40">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-bold uppercase tracking-wider text-charcoal-darker">
              {t('calculator.cta.title')}
            </h2>
            <p className="mt-4 text-charcoal leading-relaxed">
              {t('calculator.cta.body')}
            </p>
            <LocaleLink
              to="/contact"
              className="inline-block mt-8 px-8 py-3 bg-charcoal-darker text-white uppercase tracking-wider font-heading hover:bg-charcoal-dark transition-colors"
            >
              {t('calculator.cta.button')}
            </LocaleLink>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
