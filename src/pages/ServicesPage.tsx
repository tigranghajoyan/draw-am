import LocaleLink from '@/components/ui/LocaleLink';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { services } from '@/data/services';
import { processSteps } from '@/data/process';
import { pages } from '@/data/pages';
import { useT, useLocale } from '@/i18n/context';
import {
  Compass,
  Lightbulb,
  Layers,
  Wrench,
  Puzzle,
  MessageCircle,
  Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  compass: Compass,
  lightbulb: Lightbulb,
  layers: Layers,
  wrench: Wrench,
  puzzle: Puzzle,
  'message-circle': MessageCircle,
};

export default function ServicesPage() {
  const t = useT();
  const locale = useLocale();

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title={t('services.hero.title')}
        subtitle={t('services.hero.subtitle')}
        backgroundImage={pages.services.heroImage}
      />

      {/* Services Intro */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            label={t('services.intro.label')}
            title={t('services.intro.title')}
            centered
          />
          <p className="max-w-3xl mx-auto text-center text-charcoal leading-relaxed mt-6">
            {t('services.intro.body')}
          </p>
        </div>
      </section>

      {/* Services + Process Side-by-Side */}
      <section className="bg-offwhite py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left — Services */}
          <div>
            <div className="border-b border-charcoal-darker/10 pb-6">
              <SectionHeading
                label={t('services.intro.label')}
                title={t('services.intro.title')}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.icon];
                return (
                  <ScrollReveal key={service.title[locale]} delay={index * 100}>
                    <div className="bg-white border-t-2 border-charcoal-dark p-6 shadow-sm hover:shadow-md transition-shadow">
                      {IconComponent && (
                        <IconComponent size={28} className="text-charcoal-dark" />
                      )}
                      <h3 className="font-heading font-bold text-base uppercase tracking-wider mt-4">
                        {service.title[locale]}
                      </h3>
                      <p className="text-charcoal mt-3 leading-relaxed">
                        {service.description[locale]}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {service.features[locale].map((feature: string) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-xs text-charcoal"
                          >
                            <Check
                              size={14}
                              className="shrink-0 mt-0.5 text-charcoal-dark"
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Right — Process */}
          <div className="lg:border-l lg:border-charcoal-darker/10 lg:pl-12">
            <div className="border-b border-charcoal-darker/10 pb-6">
              <SectionHeading
                label={t('process.intro.label')}
                title={t('process.intro.title')}
              />
            </div>
            <div className="mt-8">
              {processSteps.map((step, index) => (
                <ScrollReveal key={step.number} delay={index * 100}>
                  <div className="flex gap-4 md:gap-6">
                    {/* Number column */}
                    <div className="w-16 shrink-0 flex flex-col items-center">
                      <span className="text-5xl md:text-6xl font-heading font-bold text-charcoal-darker/20 leading-none">
                        {String(step.number).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Connecting line + content */}
                    <div
                      className={`flex-1 border-l-2 border-charcoal-darker/20 pl-4 md:pl-6 ${
                        index < processSteps.length - 1 ? 'pb-10' : 'pb-0'
                      }`}
                    >
                      <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-charcoal-darker">
                        {step.title[locale]}
                      </h3>
                      <p className="text-charcoal leading-relaxed mt-2">
                        {step.description[locale]}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-charcoal-darker py-20 px-6 text-white text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            {t('process.cta.title')}
          </h2>
          <LocaleLink
            to="/contact"
            className="inline-block mt-8 border border-white text-white px-8 py-3 uppercase tracking-widest text-sm font-heading hover:bg-white hover:text-charcoal-darker transition-colors"
          >
            {t('process.cta.button')}
          </LocaleLink>
        </ScrollReveal>
      </section>
    </>
  );
}
