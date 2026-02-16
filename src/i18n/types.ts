export type Locale = 'hy' | 'en' | 'ru';
export const LOCALES: Locale[] = ['hy', 'en', 'ru'];
export const DEFAULT_LOCALE: Locale = 'hy';
export const LOCALE_NAMES: Record<Locale, string> = { hy: 'Հայ', en: 'Eng', ru: 'Рус' };
export type L<T = string> = Record<Locale, T>;
