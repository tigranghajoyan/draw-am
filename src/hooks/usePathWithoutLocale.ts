import { useLocation } from 'react-router-dom';

export function usePathWithoutLocale(): string {
  const { pathname } = useLocation();
  return pathname.replace(/^\/[a-z]{2}/, '') || '/';
}
