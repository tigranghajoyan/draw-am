import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import { useT, useLocale } from '@/i18n/context';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { projects } from '@/data/projects';
import type { ProjectGallery } from '@/types';

type GallerySection = 'renders' | 'construction' | 'completed' | 'plans';

const SECTION_KEYS: GallerySection[] = ['renders', 'construction', 'completed', 'plans'];

function isStructuredGallery(g: string[] | ProjectGallery): g is ProjectGallery {
  return !Array.isArray(g);
}

export default function ProjectDetailPage() {
  const t = useT();
  const locale = useLocale();
  const { slug } = useParams<{ slug: string }>();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<GallerySection>('renders');
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const project = useMemo(
    () => projects.find((p) => p.slug === slug),
    [slug],
  );

  const relatedProjects = useMemo(() => {
    if (!project) return [];
    const others = projects.filter((p) => p.slug !== project.slug);
    const sameCategory = others.filter(
      (p) => p.category.en === project.category.en,
    );
    const rest = others.filter(
      (p) => p.category.en !== project.category.en,
    );
    return [...sameCategory, ...rest].slice(0, 3);
  }, [project]);

  // Build section images map
  const sectionImages = useMemo(() => {
    if (!project) return {} as Record<GallerySection, string[]>;
    const g = project.gallery;
    if (isStructuredGallery(g)) {
      return {
        renders: g.renders ?? [],
        construction: g.construction ?? [],
        completed: g.completed ?? [],
        plans: g.plans ?? [],
      };
    }
    // Flat array — treat all as renders
    return {
      renders: g.length > 0 ? g : [project.image],
      construction: [],
      completed: [],
      plans: [],
    };
  }, [project]);

  // Available sections (non-empty or has iframe3d for plans)
  const availableSections = useMemo(() => {
    return SECTION_KEYS.filter((key) => {
      if (key === 'plans' && project?.iframe3d) return true;
      return sectionImages[key]?.length > 0;
    });
  }, [sectionImages, project]);

  // Current images for active section
  const currentImages = useMemo(
    () => sectionImages[activeSection] ?? [],
    [sectionImages, activeSection],
  );

  // Reset image index on section or project change
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [activeSection, slug]);

  // Set initial active section to first available
  useEffect(() => {
    if (availableSections.length > 0 && !availableSections.includes(activeSection)) {
      setActiveSection(availableSections[0]);
    }
  }, [availableSections, activeSection]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailRef.current) return;
    const active = thumbnailRef.current.querySelector('[data-active="true"]');
    active?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedImageIndex]);

  const handleSectionChange = useCallback((section: GallerySection) => {
    setActiveSection(section);
  }, []);

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

  const categoryLabel = (project.subcategory ?? project.category)[locale];

  const metadataCards = [
    { label: t('project.details.year'), value: String(project.year) },
    { label: t('project.details.location'), value: project.location },
    { label: t('project.details.category'), value: project.category[locale] },
    { label: t('project.details.status'), value: project.status[locale] },
  ];

  const sectionLabels: Record<GallerySection, string> = {
    renders: t('project.gallery.renders'),
    construction: t('project.gallery.construction'),
    completed: t('project.gallery.completed'),
    plans: t('project.gallery.plans'),
  };

  const showPlans3D = activeSection === 'plans' && project.iframe3d;

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
          {project.builtBy && (
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-charcoal font-heading">{t('project.details.builtBy')}:</span>
              <span className="font-heading font-medium text-charcoal-darker">{project.builtBy[locale]}</span>
            </div>
          )}
        </div>
      </section>

      {/* Gallery filter buttons */}
      {availableSections.length > 1 && (
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0 border-b-2 border-gray-100">
            {availableSections.map((section) => {
              const imgCount = sectionImages[section]?.length ?? 0;
              const has3D = section === 'plans' && project.iframe3d;
              const badge = imgCount > 0 ? String(imgCount) : has3D ? '3D' : '0';
              return (
                <button
                  key={section}
                  type="button"
                  onClick={() => handleSectionChange(section)}
                  className={`px-5 sm:px-8 py-3 font-heading text-xs sm:text-sm uppercase tracking-wider transition-colors relative cursor-pointer ${
                    activeSection === section
                      ? 'text-charcoal-darker'
                      : 'text-charcoal/40 hover:text-charcoal/70'
                  }`}
                >
                  {sectionLabels[section]}
                  <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
                    activeSection === section
                      ? 'bg-charcoal-darker text-white'
                      : 'bg-gray-100 text-charcoal/50'
                  }`}>
                    {badge}
                  </span>
                  {activeSection === section && (
                    <span className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-charcoal-darker" />
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Gallery slider — for non-plans sections, or plans with images */}
      {!showPlans3D && currentImages.length > 0 && (
        <section className="px-4 md:px-6 bg-white mt-1">
          <div className="flex flex-col md:flex-row gap-4 md:h-[70vh]">
            {/* Main image */}
            <div className="flex-[4] min-h-[50vh] md:min-h-0 bg-offwhite flex items-center justify-center">
              <img
                src={currentImages[selectedImageIndex]}
                alt={`${project.title} — ${activeSection} ${selectedImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div
              ref={thumbnailRef}
              className="flex md:flex-col flex-row flex-[1] gap-2 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden md:h-full scrollbar-hide"
            >
              {currentImages.map((img, index) => (
                <button
                  key={`${activeSection}-${index}`}
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
      )}

      {/* Empty gallery state */}
      {!showPlans3D && currentImages.length === 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="border-2 border-dashed border-gray-200 flex items-center justify-center py-20">
            <p className="text-charcoal/30 font-heading uppercase tracking-wider text-sm">
              {t('project.gallery.comingSoon')}
            </p>
          </div>
        </section>
      )}

      {/* 3D Viewer — shown when Plans section is active */}
      {showPlans3D && (
        <section className="max-w-7xl mx-auto px-6 py-8">
          {/* Plan images above 3D if any */}
          {sectionImages.plans.length > 0 && (
            <div className="flex flex-col md:flex-row gap-4 md:h-[50vh] mb-8">
              <div className="flex-[4] min-h-[40vh] md:min-h-0 bg-offwhite flex items-center justify-center">
                <img
                  src={sectionImages.plans[selectedImageIndex < sectionImages.plans.length ? selectedImageIndex : 0]}
                  alt={`${project.title} — plan`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div
                className="flex md:flex-col flex-row flex-[1] gap-2 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden md:h-full scrollbar-hide"
              >
                {sectionImages.plans.map((img, index) => (
                  <button
                    key={`plans-${index}`}
                    data-active={index === selectedImageIndex}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 aspect-square w-16 md:w-auto md:h-[calc((100%-2rem)/4.5)] border-2 transition-opacity ${
                      index === selectedImageIndex
                        ? 'border-charcoal-darker opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <ScrollReveal>
            <h2 className="text-sm uppercase tracking-widest text-charcoal font-heading mb-4">
              {t('project.viewer3d')}
            </h2>
            <div className="relative w-full bg-offwhite" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={project.iframe3d}
                title={`${project.title} — 3D Model`}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                allow="fullscreen"
              />
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Description */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <p className="text-charcoal leading-relaxed">
          {project.fullDescription[locale]}
        </p>
      </section>

      {/* Info */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-widest text-charcoal font-heading mb-4">
            {categoryLabel}
          </p>
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
