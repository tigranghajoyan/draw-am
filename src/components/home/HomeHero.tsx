import { ChevronDown } from 'lucide-react';
import DecorativeBorder from '@/components/ui/DecorativeBorder';
import Button from '@/components/ui/Button';
import { useT } from '@/i18n/context';
import { pages } from '@/data/pages';

function buildSrcSet(url: string): string | undefined {
  if (!url.includes('unsplash.com')) return undefined;
  const base = url.replace(/[?&]w=\d+/, '');
  const sep = base.includes('?') ? '&' : '?';
  return [640, 1280, 1920].map((w) => `${base}${sep}w=${w} ${w}w`).join(', ');
}

export default function HomeHero() {
  const t = useT();
  const heroImage = pages.home.heroImage;
  const srcSet = buildSrcSet(heroImage);

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroImage}
        srcSet={srcSet}
        sizes="100vw"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white p-12 md:p-20">
        <DecorativeBorder />

        <h1 className="text-5xl md:text-6xl lg:text-7xl uppercase tracking-[0.3em] font-heading font-bold">
          {t('home.hero.title')}
        </h1>

        <p className="text-lg md:text-xl tracking-widest uppercase text-white/80 mt-4">
          {t('home.hero.subtitle')}
        </p>

        <div className="mt-8">
          <Button variant="outline" size="lg" href="/projects">
            {t('home.hero.cta')}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-6 h-6 text-white animate-bounce" />
      </div>
    </section>
  );
}
