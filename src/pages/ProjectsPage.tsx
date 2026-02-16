import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import LocaleLink from '@/components/ui/LocaleLink';
import { useT, useLocale } from '@/i18n/context';
import { projects } from '@/data/projects';
import { company } from '@/data/company';
import { platformIcons } from '@/utils/platformIcons';
import type { Locale } from '@/i18n/types';

type FilterKey = 'year' | 'location' | 'category' | 'status' | 'visualization';

interface Filters {
  year: string | null;
  location: string | null;
  category: string | null;
  status: string | null;
  visualization: string | null;
}

function getFilterValues(locale: Locale) {
  return {
    year: [...new Set(projects.map((p) => String(p.year)))].sort().reverse(),
    location: [...new Set(projects.map((p) => p.location))].sort(),
    category: [...new Set(projects.map((p) => p.category[locale]))].sort(),
    status: [...new Set(projects.map((p) => p.status[locale]))].sort(),
    visualization: [
      ...new Set(
        projects
          .map((p) => p.visualization)
          .filter((v): v is string => Boolean(v)),
      ),
    ].sort(),
  };
}

export default function ProjectsPage() {
  const t = useT();
  const locale = useLocale();

  const [filters, setFilters] = useState<Filters>({
    year: null,
    location: null,
    category: null,
    status: null,
    visualization: null,
  });
  const [openDropdown, setOpenDropdown] = useState<FilterKey | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const didDrag = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const filterValues = useMemo(() => getFilterValues(locale), [locale]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (filters.year && String(p.year) !== filters.year) return false;
      if (filters.location && p.location !== filters.location) return false;
      if (filters.category && p.category[locale] !== filters.category)
        return false;
      if (filters.status && p.status[locale] !== filters.status) return false;
      if (filters.visualization && p.visualization !== filters.visualization)
        return false;
      return true;
    });
  }, [filters, locale]);

  const handleFilterSelect = useCallback(
    (key: FilterKey, value: string | null) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setOpenDropdown(null);
    },
    [],
  );

  const toggleDropdown = useCallback(
    (key: FilterKey) => {
      setOpenDropdown((prev) => (prev === key ? null : key));
    },
    [],
  );

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    const handleClick = () => setOpenDropdown(null);
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [openDropdown]);

  // Drag-to-scroll handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    didDrag.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 5) didDrag.current = true;
    el.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    const el = scrollRef.current;
    if (el) el.style.cursor = 'grab';
  }, []);

  const onCardClick = useCallback((e: React.MouseEvent) => {
    if (didDrag.current) {
      e.preventDefault();
    }
  }, []);

  const filterKeys: FilterKey[] = [
    'year',
    'location',
    'category',
    'status',
    'visualization',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black pt-20">
      {/* Cards Area */}
      <div
        ref={scrollRef}
        className="flex-1 flex gap-2 px-2 overflow-x-auto cursor-grab select-none scrollbar-hide"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {filteredProjects.map((project) => (
          <LocaleLink
            key={project.slug}
            to={`/projects/${project.slug}`}
            onClick={onCardClick}
            className="relative flex-shrink-0 w-[85vw] md:w-[50vw] lg:w-[33vw] overflow-hidden group"
            draggable={false}
          >
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-white font-heading font-bold text-lg lg:text-xl uppercase tracking-wider">
                {project.title}
              </h3>
              <span className="inline-block mt-2 text-white/70 text-xs uppercase tracking-widest">
                {t('projects.card.read')}
              </span>
            </div>
          </LocaleLink>
        ))}

        {filteredProjects.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-white/40 text-sm uppercase tracking-wider">
            {t('projects.noResults')}
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3 border-t border-white/10">
        <div className="flex items-center gap-4 md:gap-6 flex-wrap">
          {filterKeys.map((key) => (
            <div key={key} className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(key);
                }}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition-colors ${
                  filters[key]
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {t(`projects.filters.${key}`)}
                <ChevronUp
                  className={`h-3 w-3 transition-transform ${
                    openDropdown === key ? '' : 'rotate-180'
                  }`}
                />
              </button>

              {openDropdown === key && (
                <div
                  className="absolute bottom-full left-0 mb-2 min-w-[160px] max-h-60 overflow-y-auto bg-charcoal-darker border border-white/10 shadow-xl z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleFilterSelect(key, null)}
                    className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                      !filters[key]
                        ? 'text-white bg-white/10'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {t('projects.filters.all')}
                  </button>
                  {filterValues[key].map((value) => (
                    <button
                      key={value}
                      onClick={() => handleFilterSelect(key, value)}
                      className={`block w-full text-left px-4 py-2 text-xs uppercase tracking-wider transition-colors ${
                        filters[key] === value
                          ? 'text-white bg-white/10'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {company.socialLinks.map((social) => {
            const Icon = platformIcons[social.platform];
            return (
              <a
                key={social.label}
                href={social.url}
                aria-label={social.label}
                className="text-white/50 hover:text-white transition-colors"
              >
                {Icon && <Icon className="h-4 w-4" />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
