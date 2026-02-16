import { useEffect } from 'react';
import { useParams, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useSetLocale } from '@/i18n/context';
import { LOCALES, DEFAULT_LOCALE } from '@/i18n/types';
import type { Locale } from '@/i18n/types';

export default function LanguageRoute() {
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const setLocale = useSetLocale();

  const isValidLocale = LOCALES.includes(lang as Locale);

  useEffect(() => {
    if (isValidLocale) {
      setLocale(lang as Locale);
    }
  }, [lang, isValidLocale, setLocale]);

  if (!isValidLocale) {
    const rest = location.pathname.replace(/^\/[^/]+/, '');
    return <Navigate to={`/${DEFAULT_LOCALE}${rest}`} replace />;
  }

  return <Outlet />;
}
