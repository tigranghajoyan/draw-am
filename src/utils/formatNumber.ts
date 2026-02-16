import type { Locale } from '@/i18n/types';

const localeMap: Record<Locale, string> = {
  hy: 'hy-AM',
  ru: 'ru-RU',
  en: 'en-US',
};

const cache = new Map<string, Intl.NumberFormat>();

export function formatNumber(value: number, locale: Locale): string {
  const tag = localeMap[locale];
  let fmt = cache.get(tag);
  if (!fmt) {
    fmt = new Intl.NumberFormat(tag);
    cache.set(tag, fmt);
  }
  return fmt.format(value);
}
