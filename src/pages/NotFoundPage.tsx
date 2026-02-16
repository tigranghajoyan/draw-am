import LocaleLink from '@/components/ui/LocaleLink';
import { useT } from '@/i18n/context';

export default function NotFoundPage() {
  const t = useT();

  return (
    <section className="min-h-screen flex items-center justify-center bg-charcoal-darker text-white">
      <div className="text-center px-6">
        <h1 className="text-8xl md:text-9xl font-heading font-bold tracking-wider">
          404
        </h1>
        <p className="text-xl md:text-2xl uppercase tracking-widest text-white/60 mt-4">
          {t('notFound.title')}
        </p>
        <p className="text-white/40 mt-4 max-w-md mx-auto">
          {t('notFound.body')}
        </p>
        <LocaleLink
          to="/"
          className="inline-block mt-8 px-8 py-4 border-2 border-white text-white uppercase tracking-wider font-heading font-medium text-sm hover:bg-white hover:text-charcoal-darker transition-all duration-300"
        >
          {t('notFound.cta')}
        </LocaleLink>
      </div>
    </section>
  );
}
