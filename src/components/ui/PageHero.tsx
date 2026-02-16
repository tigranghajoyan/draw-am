interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

function buildSrcSet(url: string): string | undefined {
  // Only works with Unsplash URLs that have w= param
  if (!url.includes('unsplash.com')) return undefined;
  const base = url.replace(/[?&]w=\d+/, '');
  const sep = base.includes('?') ? '&' : '?';
  return [640, 1280, 1920].map((w) => `${base}${sep}w=${w} ${w}w`).join(', ');
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
}: PageHeroProps) {
  const srcSet = buildSrcSet(backgroundImage);

  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={backgroundImage}
        srcSet={srcSet}
        sizes="100vw"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl uppercase tracking-widest font-heading font-bold text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
