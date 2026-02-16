import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import LocaleLink from '@/components/ui/LocaleLink';
import { useT } from '@/i18n/context';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { navItems } from '@/data/navigation';
import { usePathWithoutLocale } from '@/hooks/usePathWithoutLocale';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useT();
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathWithoutLocale = usePathWithoutLocale();

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={`fixed inset-0 z-40 bg-charcoal-darker transition-all duration-300 ${
        isOpen
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      {/* Close Button */}
      <button
        ref={closeRef}
        type="button"
        className="absolute top-6 right-6 text-white p-2"
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <X className="h-7 w-7" />
      </button>

      {/* Navigation Links */}
      <nav className="flex h-full flex-col items-center justify-center gap-8">
        {navItems.map((link) => {
          const isActive = pathWithoutLocale === link.path;

          return (
            <LocaleLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={`font-heading text-2xl uppercase tracking-widest transition-colors duration-200 ${
                isActive
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {t(link.key)}
            </LocaleLink>
          );
        })}
        <LanguageSwitcher />
      </nav>
    </div>
  );
}
