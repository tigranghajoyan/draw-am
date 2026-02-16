import LocaleLink from '@/components/ui/LocaleLink';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Counter from '@/components/ui/Counter';
import { services } from '@/data/services';
import { team } from '@/data/team';
import { aboutData } from '@/data/about';
import { useT, useLocale } from '@/i18n/context';
import {
  Compass,
  Lightbulb,
  Layers,
  Wrench,
  Puzzle,
  MessageCircle,
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

export default function AboutPage() {
  const t = useT();
  const locale = useLocale();
  const featuredServices = services.slice(0, 3);

  return (
    <>
      {/* Page Hero */}
      <PageHero
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
        backgroundImage={aboutData.heroImage}
      />

      {/* Philosophy Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label={t('about.philosophy.label')} title={t('about.philosophy.title')} />
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
            <ScrollReveal>
              <div className="space-y-4">
                <p className="text-charcoal leading-relaxed font-body">
                  {t('about.philosophy.body1')}
                </p>
                <p className="text-charcoal leading-relaxed font-body">
                  {t('about.philosophy.body2')}
                </p>
                <p className="text-charcoal leading-relaxed font-body">
                  {t('about.philosophy.body3')}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="aspect-[4/3] overflow-hidden rounded-sm shadow">
                <img
                  src={aboutData.philosophyImage}
                  alt="Architectural detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-charcoal-darker py-20 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {aboutData.stats.map((stat) => (
                <div key={stat.key}>
                  <Counter end={stat.value} />
                  <p className="text-white/70 uppercase tracking-wider text-sm font-heading mt-3">
                    {t(stat.key)}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label={t('about.expertise.label')}
            title={t('about.expertise.title')}
            centered
          />
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {featuredServices.map((service, index) => {
              const IconComponent = iconMap[service.icon];
              return (
                <ScrollReveal key={service.title[locale]} delay={index * 150}>
                  <div className="p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                    {IconComponent && (
                      <IconComponent size={32} className="text-charcoal" />
                    )}
                    <h3 className="font-heading font-bold text-lg uppercase tracking-wider mt-4">
                      {service.title[locale]}
                    </h3>
                    <p className="text-charcoal mt-2 leading-relaxed font-body">
                      {service.description[locale]}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <LocaleLink
              to="/services"
              className="inline-block border border-charcoal text-charcoal px-8 py-3 uppercase tracking-widest text-sm font-heading hover:bg-charcoal hover:text-white transition-colors"
            >
              {t('about.expertise.cta')}
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-offwhite py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label={t('about.team.label')}
            title={t('about.team.title')}
            centered
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 100}>
                <div className="group overflow-hidden">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="font-heading font-bold text-lg uppercase tracking-wider">
                      {member.name}
                    </h3>
                    <p className="text-charcoal text-sm mt-1">{member.role[locale]}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
