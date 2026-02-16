import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import { useT, useLocale } from '@/i18n/context';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/data/projects';

export default function ProjectDetailPage() {
  const t = useT();
  const locale = useLocale();
  const { slug } = useParams<{ slug: string }>();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const project = useMemo(
    () => projects.find((p) => p.slug === slug),
    [slug],
  );

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    // Prefer same category, then fill with others
    const others = projects.filter((p) => p.slug !== project.slug);
    const sameCategory = others.filter(
      (p) => p.category.en === project.category.en,
    );
    const rest = others.filter(
      (p) => p.category.en !== project.category.en,
    );
    return [...sameCategory, ...rest].slice(0, 3);
  }, [project]);

  // Reset selected image when navigating to a different project
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [slug]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailRef.current) return;
    const active = thumbnailRef.current.querySelector('[data-active="true"]');
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedImageIndex]);

  // Not found
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <h1 className="text-4xl font-heading font-bold text-charcoal-darker uppercase tracking-wider">
          {t('project.notFound.title')}
        </h1>
        <p className="mt-4 text-charcoal leading-relaxed max-w-md">
          {t('project.notFound.body')}
        </p>
        <LocaleLink
          to="/"
          className="mt-8 inline-block px-8 py-3 border-2 border-charcoal-darker text-charcoal-darker uppercase tracking-wider font-heading hover:bg-charcoal-darker hover:text-white transition-colors"
        >
          {t('project.notFound.cta')}
        </LocaleLink>
      </div>
    );
  }

  const galleryImages = project.gallery.length > 0 ? project.gallery : [project.image];
  const categoryLabel = (project.subcategory ?? project.category)[locale];

  const metadataCards = [
    { label: t('project.details.year'), value: String(project.year) },
    { label: t('project.details.location'), value: project.location },
    { label: t('project.details.category'), value: project.category[locale] },
    { label: t('project.details.status'), value: project.status[locale] },
  ];

  return (
    <div className="pt-22">
      {/* Metadata bar */}
      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {metadataCards.map((card) => (
            <div key={card.label} className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-charcoal font-heading">{card.label}:</span>
              <span className="font-heading font-medium text-charcoal-darker">{card.value}</span>
            </div>
          ))}
          {project.visualization && (
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-charcoal font-heading">{t('project.details.visualization')}:</span>
              <span className="font-heading font-medium text-charcoal-darker">{project.visualization}</span>
            </div>
          )}
        </div>
      </section>

      {/* Section A: Gallery */}
      <section className="px-4 md:px-6 bg-white">
        {/* Desktop: side-by-side | Mobile: stacked */}
        <div className="flex flex-col md:flex-row gap-4 md:h-[70vh]">
          {/* Main image */}
          <div className="flex-[4] min-h-[50vh] md:min-h-0 bg-offwhite flex items-center justify-center">
            <img
              src={galleryImages[selectedImageIndex]}
              alt={`${project.title} — ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div
            ref={thumbnailRef}
            className="flex md:flex-col flex-row flex-[1] gap-2 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden md:h-full scrollbar-hide"
          >
            {galleryImages.map((img, index) => (
              <button
                key={index}
                data-active={index === selectedImageIndex}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 aspect-square w-16 md:w-auto md:h-[calc((100%-2rem)/4.5)] border-2 transition-opacity ${
                  index === selectedImageIndex
                    ? 'border-charcoal-darker opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${project.title} thumbnail ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Section B: Description */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <p className="text-charcoal leading-relaxed">
          {project.fullDescription[locale]}
        </p>
      </section>

      {/* Section C: Info */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <ScrollReveal>
          {/* Subcategory / Category label */}
          <p className="text-xs uppercase tracking-widest text-charcoal font-heading mb-4">
            {categoryLabel}
          </p>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-darker uppercase tracking-wider">
            {project.title}
          </h1>

        </ScrollReveal>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-sm uppercase tracking-widest text-charcoal font-heading mb-6">
            {t('project.related.label')}
          </h2>
          <div className="space-y-4">
            {relatedProjects.map((rel) => (
              <LocaleLink
                key={rel.slug}
                to={`/projects/${rel.slug}`}
                className="block group"
              >
                <p className="text-charcoal-darker font-heading font-medium group-hover:underline">
                  {rel.title}
                </p>
                <p className="text-sm text-charcoal">
                  {rel.year} &middot; {t('project.related.similar')}
                </p>
              </LocaleLink>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
