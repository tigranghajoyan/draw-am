import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import type { Locale, L } from './types';
import { DEFAULT_LOCALE } from './types';
import { en } from './translations/en';
import { hy } from './translations/hy';
import { ru } from './translations/ru';

const dictionaries: Record<Locale, Record<string, string>> = { en, hy, ru };

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LanguageContext).locale;
}

export function useSetLocale() {
  return useContext(LanguageContext).setLocale;
}

export function useL<T>(field: L<T>): T {
  const locale = useLocale();
  return field[locale];
}

export function useT() {
  const locale = useLocale();
  const dict = dictionaries[locale];
  return useCallback(
    (key: string): string => dict[key] ?? key,
    [dict],
  );
}

