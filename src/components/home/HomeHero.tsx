import { ChevronDown } from 'lucide-react';
import DecorativeBorder from '@/components/ui/DecorativeBorder';
import Button from '@/components/ui/Button';
import { useT } from '@/i18n/context';

const YOUTUBE_VIDEO_ID = 'Tr0dWseqmwk';

export default function HomeHero() {
  const t = useT();

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`}
          title="Background video"
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full min-h-full aspect-video"
          style={{ border: 'none' }}
        />
      </div>

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
