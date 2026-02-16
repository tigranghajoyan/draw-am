import { useNavigate, useLocation } from 'react-router-dom';
import { useLocale, useSetLocale } from '@/i18n/context';
import { LOCALES, LOCALE_NAMES } from '@/i18n/types';
import type { Locale } from '@/i18n/types';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSwitch(newLocale: Locale) {
    if (newLocale === locale) return;
    setLocale(newLocale);
    // Replace /:lang prefix in current path
    const rest = location.pathname.replace(/^\/[a-z]{2}/, '') || '';
    navigate(`/${newLocale}${rest}${location.search}${location.hash}`, { replace: true });
  }

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-white/30 mx-1">|</span>}
          <button
            type="button"
            onClick={() => handleSwitch(l)}
            className={`font-heading text-xs uppercase tracking-wider transition-colors ${
              l === locale ? 'text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            {LOCALE_NAMES[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
