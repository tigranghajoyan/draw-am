import { useT } from '@/i18n/context';
import PageHero from '@/components/ui/PageHero';
import { Instagram } from 'lucide-react';
import { company } from '@/data/company';
import { pages } from '@/data/pages';

const INSTAGRAM_URL = company.socialLinks.find((l) => l.platform === 'instagram')?.url ?? '#';

export default function BlogPage() {
  const t = useT();

  return (
    <>
      <PageHero
        title={t('instagram.hero.title')}
        subtitle={t('instagram.hero.subtitle')}
        backgroundImage={pages.blog.heroImage}
      />

      <section className="bg-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center py-12">
          <Instagram className="w-16 h-16 mx-auto text-charcoal-darker" />
          <h2 className="font-heading font-bold text-2xl md:text-3xl uppercase tracking-wider text-charcoal-darker mt-6">
            {t('instagram.follow.title')}
          </h2>
          <p className="text-charcoal leading-relaxed mt-4">
            {t('instagram.follow.body')}
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-charcoal-darker text-white font-heading text-sm uppercase tracking-wider hover:bg-charcoal transition-colors duration-200"
          >
            <Instagram className="w-4 h-4" />
            {t('instagram.follow.cta')}
          </a>
        </div>
      </section>
    </>
  );
}
