import LocaleLink from '@/components/ui/LocaleLink';
import HomeHero from '@/components/home/HomeHero';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { projects } from '@/data/projects';
import { useT } from '@/i18n/context';

const featuredProjects = projects.slice(0, 3);

export default function HomePage() {
  const t = useT();

  return (
    <>
      <HomeHero />

      {/* Who We Are */}
      <section className="bg-white py-20 px-6">
        <SectionHeading
          label={t('home.whoWeAre.label')}
          title={t('home.whoWeAre.title')}
          centered
        />
        <p className="max-w-3xl mx-auto text-center text-charcoal leading-relaxed mt-6">
          {t('home.whoWeAre.body')}
        </p>
        <div className="text-center mt-8">
          <LocaleLink
            to="/about"
            className="inline-block uppercase tracking-wider font-heading font-medium text-sm px-6 py-3 bg-charcoal-darker text-white hover:bg-charcoal-dark transition-colors duration-300"
          >
            {t('home.whoWeAre.cta')}
          </LocaleLink>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-offwhite py-20 px-6">
        <SectionHeading
          label={t('home.featured.label')}
          title={t('home.featured.title')}
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {featuredProjects.map((project) => (
            <LocaleLink
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="relative group overflow-hidden block"
            >
              <img
                src={project.image}
                alt={project.title}
                className="aspect-[4/3] object-cover w-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white font-heading font-bold text-lg uppercase tracking-wider">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  {project.location}
                </p>
              </div>
            </LocaleLink>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" href="/projects" className="border-charcoal-darker text-charcoal-darker hover:bg-charcoal-darker hover:text-white">
            {t('home.featured.cta')}
          </Button>
        </div>
      </section>
    </>
  );
}
