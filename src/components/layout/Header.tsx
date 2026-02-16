import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import LocaleLink from '@/components/ui/LocaleLink';
import { useT } from '@/i18n/context';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { navItems } from '@/data/navigation';
import { usePathWithoutLocale } from '@/hooks/usePathWithoutLocale';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useT();
  const pathWithoutLocale = usePathWithoutLocale();

  // Pages without a dark hero need an always-opaque header
  const needsSolidBg = /^\/projects/.test(pathWithoutLocale);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || needsSolidBg
          ? 'bg-charcoal-darker shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <LocaleLink to="/">
            <img
              src="/images/logo.png"
              alt="The Drawing Company"
              className="h-10 w-auto"
            />
          </LocaleLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((link) => {
              const isActive = pathWithoutLocale === link.path;

              return (
                <LocaleLink
                  key={link.path}
                  to={link.path}
                  className={`font-heading text-sm uppercase tracking-wider transition-colors duration-200 ${
                    isActive
                      ? 'text-white after:block after:h-0.5 after:w-full after:bg-white after:mt-0.5'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t(link.key)}
                </LocaleLink>
              );
            })}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
