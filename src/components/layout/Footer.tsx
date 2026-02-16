import LocaleLink from '@/components/ui/LocaleLink';
import { useT } from '@/i18n/context';
import { company } from '@/data/company';
import { navItems } from '@/data/navigation';
import { platformIcons } from '@/utils/platformIcons';

export default function Footer() {
  const t = useT();

  return (
    <footer className="bg-charcoal-darker text-white/70">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Column 1: Brand */}
          <div>
            <LocaleLink to="/">
              <img
                src="/images/logo.png"
                alt="The Drawing Company"
                className="h-10 w-auto"
              />
            </LocaleLink>
            <p className="mt-4 leading-relaxed font-body">
              {t('footer.description')}
            </p>
            <div className="mt-6 flex items-center gap-4">
              {company.socialLinks.map((social) => {
                const Icon = platformIcons[social.platform];
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    aria-label={social.label}
                    className="text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold uppercase tracking-wider text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="mt-4 space-y-3">
              {navItems.map((link) => (
                <li key={link.path}>
                  <LocaleLink
                    to={link.path}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {t(link.key)}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-heading text-lg font-semibold uppercase tracking-wider text-white">
              {t('footer.contact')}
            </h3>
            <address className="mt-4 space-y-3 not-italic">
              <p>
                {company.address.street}
                <br />
                {company.address.city}
              </p>
              <p>
                <a
                  href={`tel:${company.phone.replace(/\s/g, '')}`}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {company.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {company.email}
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-center text-sm">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
